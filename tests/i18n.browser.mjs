// Run with the dev server and a Chromium debugging session already started:
// I18N_BASE_URL=http://127.0.0.1:3001 node --import tsx tests/i18n.browser.mjs
// chromium --headless --remote-debugging-port=9222 --user-data-dir=/tmp/bluewave-browser
import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
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
async function click(label, scope = 'body') {
  await evaluate(`(async () => {
    const button = [...document.querySelector(${JSON.stringify(scope)}).querySelectorAll('button')].find(element => {
      const copy = element.cloneNode(true);
      copy.querySelectorAll('.material-symbols-outlined').forEach(icon => icon.remove());
      return copy.textContent.trim() === ${JSON.stringify(label)};
    });
    if (!button) throw new Error('Missing button: ' + ${JSON.stringify(label)});
    const router = window.next.router;
    await new Promise(resolve => {
      let timer;
      const done = () => { clearTimeout(timer); router.events.off('routeChangeStart', start); router.events.off('routeChangeComplete', done); router.events.off('routeChangeError', done); resolve(); };
      const start = () => { clearTimeout(timer); timer = setTimeout(done, 20000); };
      router.events.on('routeChangeStart', start); router.events.on('routeChangeComplete', done); router.events.on('routeChangeError', done);
      timer = setTimeout(done, 150); button.click();
    });
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
async function checkLocalizedText(language = 'ar') {
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
  const localizedValues = new Set(Object.values(translations[language]));
  const untranslated = texts.filter(text => Object.hasOwn(translations.en, text) && !localizedValues.has(text));
  assert.deepEqual([...new Set(untranslated)], [], `English catalog text remains in the ${language} page`);
}
try {
  await command('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await command('Page.navigate', { url: baseUrl });
  await new Promise(resolve => setTimeout(resolve, 500));
  for (let attempt = 0; attempt < 100; attempt++) {
    if (await evaluate('!!document.querySelector("header")')) break;
    await tick();
  }
  assert.ok(await evaluate('!!document.querySelector("header")'), 'App did not load');
  assert.ok(await evaluate(`document.fonts.load('24px "Material Symbols Outlined"', 'south equalizer')
    .then(fonts => fonts.length > 0 && fonts.every(font => font.status === 'loaded'))`));
  for (const language of ['ar', 'fr', 'en']) {
    const t = getTranslator(language);
    await click(language.toUpperCase());
    assert.equal(await evaluate('document.documentElement.lang'), language);
    assert.equal(await evaluate('document.documentElement.dir'), language === 'ar' ? 'rtl' : 'ltr');
    for (const page of ['Home', 'Rooms & Apartments', 'Offers', 'Rooftop & Restaurant', 'Book Now']) {
      await click(t(page));
      await checkIcons();
      if (language !== 'en') await checkLocalizedText(language);
      if (page === 'Rooftop & Restaurant') {
        await click(t('Rooftop Terrace'), 'main');
        assert.ok(await evaluate(`document.querySelector('main').textContent.includes(${JSON.stringify(t('Panoramic Views'))})`));
        await click(t('Restaurant'), 'main');
        assert.ok(await evaluate(`document.querySelector('main').textContent.includes(${JSON.stringify(t('Fresh & Local'))})`));
        if (language !== 'en') await checkLocalizedText(language);
      }
      console.log(`PASS ${language}: ${page}`);
    }
  }
  // Card -> unique room URL -> booking. Room selection survives navigation and language changes.
  await click('Rooms & Apartments');
  const roomLinks = await evaluate(`Array.from(document.querySelectorAll('main article h3 a'), link => link.getAttribute('href'))`);
  assert.equal(roomLinks.length, 10);
  assert.equal(new Set(roomLinks).size, roomLinks.length);
  for (const href of roomLinks) {
    await evaluate(`window.next.router.push(${JSON.stringify(href)})`); await tick();
    assert.ok(await evaluate('!!document.querySelector("main h1")'));
    assert.ok(await evaluate(`document.querySelector('main').textContent.includes('Bed Configuration')`));
    assert.ok(await evaluate(`Promise.all([...document.querySelectorAll('main img')].map(img => { img.loading = 'eager'; return img.decode(); })).then(() => true)`), 'Room photos must load');
    await click('Book Now', 'main aside');
    assert.equal(await evaluate(`document.querySelector('input[name="roomId"]:checked').value`), href.split('/').pop());
    await evaluate(`window.next.router.push(${JSON.stringify(href)})`); await tick();
  }
  await click('Book Now', 'main aside');
  const selectedRoom = await evaluate(`document.querySelector('input[name="roomId"]:checked').value`);
  assert.equal(selectedRoom, 'amlal');
  assert.equal(await evaluate(`document.querySelector('select[name="surfAddon"]').value`), 'none');
  await click('AR');
  assert.equal(await evaluate(`document.querySelector('input[name="roomId"]:checked').value`), selectedRoom);
  await checkLocalizedText();
  await click('EN');
  // An offer requests its duration without selecting a paid surf service.
  await click('Offers');
  await click('Request this offer');
  assert.ok(await evaluate(`document.querySelector('form').textContent.includes('3 Nights + Surf')`));
  assert.equal(await evaluate(`document.querySelector('select[name="surfAddon"]').value`), 'none');
  await evaluate(`(() => {
    const input = document.querySelector('input[name="checkIn"]');
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(input, '2027-11-08');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  })()`); await tick();
  assert.equal(await evaluate(`document.querySelector('input[name="checkOut"]').value`), '2027-11-11');
  await click('Home'); await click('Book Now');
  assert.equal(await evaluate(`document.querySelector('input[name="checkIn"]').value`), '2027-11-08');
  assert.equal(await evaluate(`document.querySelector('input[name="roomId"]:checked').value`), 'amlal');
  // Mobile navigation retains every accommodation-first destination.
  await command('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await click('AR');
  await evaluate(`[...document.querySelectorAll('button')].find(button => button.querySelector('.material-symbols-outlined')?.textContent.trim() === 'menu').click()`); await tick();
  await checkIcons(); await checkLocalizedText();
  assert.ok(await evaluate(`document.body.scrollWidth <= innerWidth + 1`), 'Unexpected horizontal page overflow');
  console.log('PASS room details, room selection, stay-only default, offers, persistence and mobile navigation');

  await evaluate(`[...document.querySelectorAll('header button')].find(button => button.querySelector('.material-symbols-outlined')?.textContent.trim() === 'close')?.click()`); await tick();
  // Room layouts stay within the viewport in both themes and directions.
  await evaluate(`window.next.router.push('/rooms/amlal')`); await tick();
  await evaluate(`window.scrollTo(0, 0)`); await tick();
  await checkLocalizedText();
  assert.ok(await evaluate(`document.body.scrollWidth <= innerWidth + 1`), 'Room page overflows on mobile');
  writeFileSync('/tmp/bluewave-room-mobile.png', Buffer.from((await command('Page.captureScreenshot')).data, 'base64'));
  await click('EN');
  await command('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await evaluate(`document.documentElement.classList.add('dark'); window.scrollTo(0, 0)`); await tick();
  assert.ok(await evaluate(`document.body.scrollWidth <= innerWidth + 1`));
  writeFileSync('/tmp/bluewave-room-desktop.png', Buffer.from((await command('Page.captureScreenshot')).data, 'base64'));
  await command('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });

  // Exercise the real room gallery on the Next.js detail page.
  const album = await evaluate(`Array.from(document.querySelectorAll('button[aria-label^="View photo "] img'), img => img.src)`);
  await evaluate(`window.scrollTo(0, 0)`); await tick();
  await evaluate(`document.querySelector('button[aria-label="View photo 2"]').click()`); await tick();
  assert.equal(await evaluate(`document.querySelector('main img').src`), album[1]);
  await click('Fullscreen');
  assert.equal(await evaluate('document.querySelector("dialog").open'), true);
  assert.equal(await evaluate('document.body.style.overflow'), 'hidden');
  await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowRight', code: 'ArrowRight' }); await tick();
  assert.equal(await evaluate(`document.querySelector('dialog img').src`), album[2]);
  await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' }); await tick();
  assert.equal(await evaluate('document.querySelector("dialog").open'), false);
  assert.notEqual(await evaluate('document.body.style.overflow'), 'hidden');
  const point = await evaluate(`(() => { const r = document.querySelector('main img').getBoundingClientRect(); return { x: r.x + r.width * .75, y: r.y + r.height * .5 }; })()`);
  await command('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: point.x, y: point.y }] });
  await command('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: point.x - 120, y: point.y }] });
  await command('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await tick();
  assert.equal(await evaluate(`document.querySelector('main img').src`), album[3]);
  console.log('PASS gallery thumbnails, fullscreen, keyboard, Escape and mobile swipe');
} finally {
  await send('Target.closeTarget', { targetId });
  socket.close();
}
