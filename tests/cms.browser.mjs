// Isolated end-to-end test. Never uses the real DATA_DIR or sends a reservation.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { createApp } from '../server/app.mjs';
import { hashPassword, readSite } from '../server/store.mjs';
const directory = mkdtempSync(join(tmpdir(), 'lodge-admin-browser-'));
const origin = 'http://127.0.0.1:3011';
const password = randomUUID() + '-test-only';
const { app, db } = createApp({ dataDir: join(directory, 'data'), origin });
db.prepare('INSERT INTO owners VALUES (?,?)').run('browser@example.test', await hashPassword(password));
const backend = app.listen(0, '127.0.0.1'); await new Promise(resolve => backend.once('listening', resolve));
const children = [];
const privateFixture = resolve('tests/private-cms-fixture.sqlite');
writeFileSync(privateFixture, 'private-test-data');
let socket;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function until(fn, message) { for (let i = 0; i < 100; i++) { if (await fn()) return; await delay(100); } throw new Error(message); }
try {
  children.push(spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', '3011', '--strictPort'], { env: { ...process.env, CMS_API_TARGET: `http://127.0.0.1:${backend.address().port}` }, stdio: 'ignore' }));
  children.push(spawn('chromium', ['--headless', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--remote-debugging-port=9223', `--user-data-dir=${join(directory, 'browser')}`, 'about:blank'], { stdio: 'ignore' }));
  await until(async () => { try { return (await fetch(origin)).ok && (await fetch('http://127.0.0.1:9223/json/version')).ok; } catch { return false; } }, 'Preview or browser did not start');
  assert.equal((await fetch(`${origin}/tests/private-cms-fixture.sqlite`)).status, 403, 'Vite must not serve SQLite files');
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
  const admin = await page(`${origin}/admin`);
  await until(() => admin.evaluate(`!!document.querySelector('input[name="email"]')`), 'Login did not load');
  async function input(selector, value) { await admin.evaluate(`(() => { const node = document.querySelector(${JSON.stringify(selector)}); if (!node) throw new Error('Missing input'); Object.getOwnPropertyDescriptor(node instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype, 'value').set.call(node, ${JSON.stringify(value)}); node.dispatchEvent(new Event('input', { bubbles: true })); })()`); }
  async function click(text) { await admin.evaluate(`(() => { const button = [...document.querySelectorAll('button')].find(b => b.textContent.trim() === ${JSON.stringify(text)}); if (!button) throw new Error('Missing button: ' + ${JSON.stringify(text)}); button.click(); })()`); await delay(80); }
  async function field(label, value) { await admin.evaluate(`(() => { const node = [...document.querySelectorAll('label')].find(l => l.querySelector('span')?.textContent === ${JSON.stringify(label)})?.querySelector('input,textarea'); if (!node) throw new Error('Missing field: ' + ${JSON.stringify(label)}); Object.getOwnPropertyDescriptor(node instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype, 'value').set.call(node, ${JSON.stringify(value)}); node.dispatchEvent(new Event('input', { bubbles: true })); })()`); await delay(30); }
  async function save() { await click('Save changes'); await until(() => admin.evaluate(`document.body.textContent.includes('Saved. Published content')`), 'Save failed'); }
  async function upload(label, files) { const { root } = await admin.command('DOM.getDocument'); const { nodeId } = await admin.command('DOM.querySelector', { nodeId: root.nodeId, selector: `input[aria-label="${label}"]` }); await admin.command('DOM.setFileInputFiles', { nodeId, files }); await until(() => admin.evaluate(`!document.querySelector('fieldset')?.disabled`), 'Upload did not finish'); await delay(100); }
  await input('input[name="email"]', 'browser@example.test'); await input('input[name="password"]', password); await click('Sign in');
  await until(() => admin.evaluate(`document.body.textContent.includes('Make your lodge feel up to date')`), 'Login failed');
  assert.equal(await admin.evaluate(`document.cookie.includes('lodge_session')`), false);
  const publicPage = await page(`${origin}/#stay`);
  await until(() => publicPage.evaluate(`document.querySelectorAll('main article').length === 10`), 'Published rooms did not load');
  await click('Rooms & apartments'); await click('Add room');
  await field('Room name', 'Browser suite'); await field('Short description', 'An owner-managed ocean escape.'); await field('Price (leave blank for price on request)', '125'); await field('Capacity label', '2 Guests'); await field('Maximum guests (optional)', '2'); await field('Bed type', 'King bed'); await field('Bathroom', 'Private bathroom'); await field('Amenities (one per line)', 'Wi-Fi\nAir conditioning');
  const seed = readSite(db).rooms[0];
  const filenames = seed.gallery.slice(0, 2).map(photo => resolve('src/images', decodeURIComponent(photo.src.slice('/media/seed/'.length))));
  await upload('Upload photos', filenames);
  await until(() => admin.evaluate(`document.querySelectorAll('.admin-photo-grid article').length === 2`), 'Photos not attached');
  const before = await admin.evaluate(`document.querySelector('.admin-photo-grid img').src`);
  await admin.evaluate(`document.querySelector('button[aria-label="Move photo 2 earlier"]').click()`); await delay(100);
  assert.notEqual(await admin.evaluate(`document.querySelector('.admin-photo-grid img').src`), before);
  await save();
  const draft = readSite(db).rooms.find(r => r.name === 'Browser suite'); assert.ok(draft); assert.equal(draft.published, false);
  assert.ok(!(await (await fetch(origin + '/api/site')).json()).rooms.some(r => r.id === draft.id));
  await admin.evaluate(`document.querySelector('.admin-switch input').click()`); await save();
  await until(() => publicPage.evaluate(`document.querySelector('main').textContent.includes('Browser suite')`), 'Existing public tab did not refresh');
  await publicPage.evaluate(`location.hash = '#rooms/${draft.id}'`); await delay(200);
  assert.equal(await publicPage.evaluate(`document.querySelector('main h1').textContent`), 'Browser suite');
  assert.ok(await publicPage.evaluate(`document.querySelector('main').textContent.includes('€125')`));
  await publicPage.evaluate(`document.querySelector('main aside button').click()`); await delay(150);
  assert.equal(await publicPage.evaluate(`document.querySelector('input[name="roomId"]:checked').value`), draft.id);
  await click('Website content'); await field('Find website text', 'Stay by the Ocean.');
  await input('textarea[aria-label="Translation: Stay by the Ocean."]', 'A new coastal welcome'); await save();
  await publicPage.evaluate(`location.hash = '#home'`); await until(() => publicPage.evaluate(`document.querySelector('main h1')?.textContent.includes('A new coastal welcome')`), 'Public wording did not update');
  await click('Offers & promotions'); await click('Add offer'); await field('Offer title', 'Browser winter escape'); await field('Description', 'Four nights by the ocean.'); await field('Inclusions and conditions', 'Accommodation only. Surf optional.'); await field('Number of nights', '4'); await field('Price (leave blank for price on request)', '400'); await admin.evaluate(`document.querySelector('.admin-switch input').click()`); await save();
  await publicPage.evaluate(`location.hash = '#offers'`); await until(() => publicPage.evaluate(`document.querySelector('main').textContent.includes('Browser winter escape')`), 'New offer not published');
  await publicPage.evaluate(`([...document.querySelectorAll('main article')].find(a => a.textContent.includes('Browser winter escape'))).querySelector('button').click()`); await delay(150);
  assert.ok(await publicPage.evaluate(`document.querySelector('form').textContent.includes('Browser winter escape')`));
  await click('Rooms & apartments'); await admin.evaluate(`([...document.querySelectorAll('.admin-room-card')].find(a => a.textContent.includes('Browser suite'))).querySelector('button').click()`); await delay(100);
  await admin.evaluate(`document.querySelector('.admin-switch input').click()`); await save();
  await publicPage.evaluate(`location.hash = '#rooms/${draft.id}'`); await until(() => publicPage.evaluate(`document.querySelector('main').textContent.includes('Accommodation not found')`), 'Unpublished room is still visible');
  await click('← All rooms');
  writeFileSync('/tmp/bluewave-admin-desktop.png', Buffer.from((await admin.command('Page.captureScreenshot')).data, 'base64'));
  await admin.command('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await delay(200); assert.ok(await admin.evaluate(`document.body.scrollWidth <= innerWidth + 1`), 'Dashboard overflows on mobile');
  writeFileSync('/tmp/bluewave-admin-mobile.png', Buffer.from((await admin.command('Page.captureScreenshot')).data, 'base64'));
  console.log('PASS browser: login, private cookie, room creation, photo upload/reorder, drafts, publish/unpublish, live public refresh, booking selection, content edits, offers and responsive dashboard.');
} finally {
  socket?.close();
  for (const child of children) child.kill('SIGTERM');
  await Promise.all(children.map(child => new Promise(resolve => { if (child.exitCode !== null) resolve(); else child.once('exit', resolve); })));
  await new Promise(resolve => backend.close(resolve)); db.close();
  rmSync(privateFixture, { force: true });
  rmSync(directory, { recursive: true, force: true });
}
