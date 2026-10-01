// Run with the dev server and a Chromium debugging session already started:
// I18N_BASE_URL=http://127.0.0.1:3001 node --import tsx tests/i18n.browser.mjs
// chromium --headless --remote-debugging-port=9222 --user-data-dir=/tmp/bluewave-browser
import assert from 'node:assert/strict';
import { getTranslator, translations } from '../src/i18n/translations.ts';

const baseUrl = process.env.I18N_BASE_URL || 'http://127.0.0.1:3000';
const debugUrl = process.env.I18N_DEBUG_URL || 'http://127.0.0.1:9222';
const version = await (await fetch(`${debugUrl}/json/version`)).json();
const socket = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});
let sequence = 0;
const pending = new Map();
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  const request = pending.get(message.id);
  if (!request) return;
  pending.delete(message.id);
  clearTimeout(request.timer);
  if (message.error) request.reject(new Error(JSON.stringify(message.error)));
  else request.resolve(message.result);
});
function send(method, params = {}, sessionId) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`Timed out: ${method}`));
    }, 15000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params, sessionId }));
  });
}
const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
const command = (method, params) => send(method, params, sessionId);
async function evaluate(expression) {
  const result = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
const tick = () => evaluate('new Promise(resolve => setTimeout(resolve, 100))');
async function click(label) {
  await evaluate(`(() => {
    const button = [...document.querySelectorAll('button')].find(element => {
      const copy = element.cloneNode(true);
      copy.querySelectorAll('.material-symbols-outlined').forEach(icon => icon.remove());
      return copy.textContent.trim() === ${JSON.stringify(label)};
    });
    if (!button) throw new Error('Missing button: ' + ${JSON.stringify(label)});
    button.click();
  })()`);
  await tick();
}
async function checkIcons() {
  const icons = await evaluate(`Array.from(document.querySelectorAll('.material-symbols-outlined'), icon => ({
    name: icon.textContent.trim(),
    font: getComputedStyle(icon).fontFamily,
    direction: getComputedStyle(icon).direction
  }))`);
  assert.ok(icons.length > 0);
  for (const icon of icons) {
    assert.match(icon.font, /^['"]?Material Symbols Outlined['"]?(?:,|$)/, `${icon.name} uses the wrong font`);
    assert.equal(icon.direction, 'ltr', `${icon.name} must keep its ligature direction`);
  }
}
async function checkArabicText() {
  const texts = await evaluate(`(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const texts = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.parentElement.closest('.material-symbols-outlined, script, style')) {
        texts.push(node.textContent.replace(/\\s+/g, ' ').trim());
      }
    }
    return texts;
  })()`);
  const localizedValues = new Set(Object.values(translations.ar));
  const untranslated = texts.filter(text => Object.hasOwn(translations.en, text) && !localizedValues.has(text));
  assert.deepEqual([...new Set(untranslated)], [], 'English catalog text remains in the Arabic page');
}
try {
  await command('Page.navigate', { url: baseUrl });
  for (let attempt = 0; attempt < 100; attempt++) {
    if (await evaluate('!!document.querySelector("header")')) break;
    await tick();
  }
  assert.ok(await evaluate('!!document.querySelector("header")'), 'App did not load');
  assert.ok(await evaluate(`document.fonts.load('24px "Material Symbols Outlined"', 'south equalizer')
    .then(fonts => fonts.length > 0 && fonts.every(font => font.status === 'loaded'))`),
    'The icon font must load so ligature names render as symbols');
  for (const language of ['ar', 'fr', 'en']) {
    const t = getTranslator(language);
    await click(language.toUpperCase());
    assert.equal(await evaluate('document.documentElement.lang'), language);
    assert.equal(await evaluate('document.documentElement.dir'), language === 'ar' ? 'rtl' : 'ltr');
    for (const page of ['1. Home Overview', '2. Stay / Sanctuaries', '3. Surf & Packages', '4. Reserve / Booking Flow']) {
      await click(t(page));
      await checkIcons();
      if (language === 'ar') await checkArabicText();
      console.log(`PASS ${language}: ${page} (text and icon fonts)`);
    }
  }
  const t = getTranslator('ar');
  await click('AR');
  await click(t('Preview Confirmation State'));
  await checkIcons();
  await checkArabicText();
  await click(t('Return to Booking Overview'));
  await click(t('3. Surf & Packages'));
  await click(t('View Package Details'));
  await checkIcons();
  await checkArabicText();
  await click(t('Dismiss'));
  await click(t('Speak with Head Coach'));
  await checkIcons();
  await checkArabicText();
  await evaluate(`document.querySelectorAll('button').forEach(button => {
    if (button.querySelector('.material-symbols-outlined')?.textContent.trim() === 'close') button.click();
  })`);
  await tick();
  await command('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await evaluate(`[...document.querySelectorAll('button')].find(button =>
    button.querySelector('.material-symbols-outlined')?.textContent.trim() === 'menu').click()`);
  await tick();
  await checkIcons();
  await checkArabicText();
  await click(t('Accommodations & Suites'));
  assert.ok(await evaluate(`document.querySelector('h1').textContent.includes(${JSON.stringify(t('Stay Your Way.'))})`));
  console.log('PASS Arabic dialogs and mobile navigation');
} finally {
  await send('Target.closeTarget', { targetId });
  socket.close();
}
