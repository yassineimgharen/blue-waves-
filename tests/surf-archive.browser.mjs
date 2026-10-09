// Isolated end-to-end test. Never uses the real DATA_DIR or sends a reservation.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { createApp } from '../server/app.mjs';
const directory = mkdtempSync(join(tmpdir(), 'lodge-surf-browser-'));
const origin = 'http://127.0.0.1:3011';
const { app, db } = createApp({ dataDir: join(directory, 'data'), origin });
const backend = app.listen(0, '127.0.0.1'); await new Promise(resolve => backend.once('listening', resolve));
const children = [];
let socket;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function until(fn, message) { for (let i = 0; i < 200; i++) { if (await fn()) return; await delay(100); } throw new Error(message); }
try {
  children.push(spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', '3011', '--strictPort'], { env: { ...process.env, CMS_API_TARGET: `http://127.0.0.1:${backend.address().port}` }, stdio: ['ignore', 'ignore', 'pipe'] }));
  children.push(spawn('chromium', ['--headless', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--remote-debugging-port=9223', `--user-data-dir=${join(directory, 'browser')}`, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] }));
  for (const child of children) child.stderr.on('data', chunk => process.stderr.write(chunk));
  await until(async () => { try { return (await fetch(origin)).ok && (await fetch('http://127.0.0.1:9223/json/version')).ok; } catch { return false; } }, 'Preview or browser did not start');
  const version = await (await fetch('http://127.0.0.1:9223/json/version')).json();
  socket = new WebSocket(version.webSocketDebuggerUrl); await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
  let sequence = 0; const pending = new Map();
  socket.addEventListener('message', event => { const message = JSON.parse(event.data); const request = pending.get(message.id); if (!request) return; pending.delete(message.id); clearTimeout(request.timer); if (message.error) request.reject(new Error(JSON.stringify(message.error))); else request.resolve(message.result); });
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => { const id = ++sequence; const timer = setTimeout(() => { pending.delete(id); reject(new Error(`Timeout: ${method}`)); }, 15000); pending.set(id, { resolve, reject, timer }); socket.send(JSON.stringify({ id, method, params, sessionId })); });
  async function page(url) {
    const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
    const command = (method, params) => send(method, params, sessionId);
    const evaluate = async expression => { const result = await command('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails)); return result.result.value; };
    await command('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
    await command('Page.navigate', { url });
    return { command, evaluate };
  }
  const archive = await page(`${origin}/#offers`);
  const evaluate = archive.evaluate;
  const command = archive.command;
  await until(() => evaluate(`!!document.querySelector('#surf-archive button')`), 'Archive did not load');
  assert.equal(await evaluate(`document.querySelector('#stay-offers').nextElementSibling.id`), 'surf-archive');
  assert.equal(await evaluate(`document.querySelectorAll('#surf-archive > div button img').length`), 12);
  assert.equal(await evaluate(`performance.getEntriesByType('resource').filter(r => r.initiatorType === 'img' && r.name.includes('/images/surf/')).length`), 0, 'Originals must wait for the lightbox');
  await evaluate(`document.querySelector('#surf-archive').scrollIntoView({block:'start'});`); await delay(300);
  await evaluate(`Promise.all([...document.querySelectorAll('#surf-archive img')].map(img => { img.loading = 'eager'; return img.decode(); }))`);
  writeFileSync('/tmp/surf-archive-desktop.png', Buffer.from((await command('Page.captureScreenshot')).data, 'base64'));
  await evaluate(`document.documentElement.classList.add('dark')`); await delay(100);
  writeFileSync('/tmp/surf-archive-dark.png', Buffer.from((await command('Page.captureScreenshot')).data, 'base64'));
  await evaluate(`document.querySelector('#surf-archive > div button').click()`); await delay(100);
  assert.ok(await evaluate(`document.querySelector('#surf-archive dialog').open`));
  assert.equal(await evaluate(`document.body.style.overflow`), 'hidden');
  const first = await evaluate(`document.querySelector('#surf-archive dialog img').src`);
  await command('Input.dispatchKeyEvent', { type:'keyDown', key:'ArrowRight', code:'ArrowRight' }); await delay(100);
  assert.notEqual(await evaluate(`document.querySelector('#surf-archive dialog img').src`), first);
  await command('Input.dispatchKeyEvent', { type:'keyDown', key:'ArrowLeft', code:'ArrowLeft' }); await delay(100);
  assert.equal(await evaluate(`document.querySelector('#surf-archive dialog img').src`), first);
  await command('Input.dispatchKeyEvent', { type:'keyDown', key:'Escape', code:'Escape' }); await delay(100);
  assert.equal(await evaluate(`document.querySelector('#surf-archive dialog').open`), false);
  assert.notEqual(await evaluate(`document.body.style.overflow`), 'hidden');
  assert.ok(await evaluate(`document.activeElement === document.querySelector('#surf-archive > div button')`), 'Focus must return to the tapped photo');
  await command('Emulation.setDeviceMetricsOverride', { width:390, height:844, deviceScaleFactor:1, mobile:true });
  await evaluate(`document.documentElement.classList.remove('dark'); document.querySelector('#surf-archive').scrollIntoView({block:'start'})`); await delay(250);
  assert.ok(await evaluate(`document.body.scrollWidth <= innerWidth + 1`));
  writeFileSync('/tmp/surf-archive-mobile.png', Buffer.from((await command('Page.captureScreenshot')).data, 'base64'));
  await evaluate(`document.querySelector('#surf-archive > div button').click()`); await delay(100);
  const point = await evaluate(`(() => { const r=document.querySelector('#surf-archive dialog img').getBoundingClientRect(); return {x:r.x+r.width*.8,y:r.y+r.height*.5}; })()`);
  await command('Input.dispatchTouchEvent', {type:'touchStart',touchPoints:[point]});
  await command('Input.dispatchTouchEvent', {type:'touchMove',touchPoints:[{x:point.x-130,y:point.y}]});
  await command('Input.dispatchTouchEvent', {type:'touchEnd',touchPoints:[]}); await delay(150);
  assert.notEqual(await evaluate(`document.querySelector('#surf-archive dialog img').src`), first);
  writeFileSync('/tmp/surf-archive-lightbox.png', Buffer.from((await command('Page.captureScreenshot')).data, 'base64'));
  await evaluate(`document.querySelector('#surf-archive button[aria-label="Close gallery"]').click()`); await delay(100);
  assert.equal(await evaluate(`document.querySelector('#surf-archive dialog').open`), false);
  for (let batch=0; batch<4; batch++) { await evaluate(`Array.from(document.querySelectorAll('#surf-archive button')).find(b=>b.textContent==='Explore more moments')?.click()`); await delay(80); }
  assert.equal(await evaluate(`document.querySelectorAll('#surf-archive > div button img').length`), 50);
  await evaluate(`Promise.all([...document.querySelectorAll('#surf-archive > div button img')].map(img => { img.loading='eager'; return img.decode(); }))`);
  // Validate every original through the real lightbox, including the final image.
  for (let i=0; i<50; i++) {
    await evaluate(`document.querySelectorAll('#surf-archive > div button')[${i}].click()`);
    await delay(20);
    await evaluate(`document.querySelector('#surf-archive dialog img').decode()`);
    await evaluate(`document.querySelector('#surf-archive button[aria-label="Close gallery"]').click()`);
    await delay(20);
  }
  await evaluate(`location.hash='#home'`);
  await until(() => evaluate(`document.querySelector('#stay-offers')?.nextElementSibling.id === 'surf-archive'`), 'Archive missing below homepage offers');
  await evaluate(`[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='AR').click()`); await delay(100);
  assert.equal(await evaluate(`document.querySelector('#surf-archive-title').textContent`), 'أرشيف ركوب الأمواج');
  console.log('PASS surf archive: placement, 50 previews and originals, lazy original loading, desktop/mobile, dark/light, keyboard, focus restoration, close button, Escape, swipe, pagination and Arabic.');

} finally {
  socket?.close();
  for (const child of children) child.kill('SIGTERM');
  await Promise.all(children.map(child => new Promise(resolve => { if (child.exitCode !== null) resolve(); else child.once('exit', resolve); })));
  await new Promise(resolve => backend.close(resolve)); db.close();
  rmSync(directory, { recursive: true, force: true });
}
