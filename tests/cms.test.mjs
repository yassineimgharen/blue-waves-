import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtempSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createApp } from '../server/app.mjs';
import { hashPassword, readSite, digest } from '../server/store.mjs';
const origin = 'http://localhost:3000';
const password = 'A test-only long random passphrase 8275!';
const email = 'owner@example.test';
const image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j4B8AAAAASUVORK5CYII=';

test('CMS authentication, authorization, publishing, media and persistence', async t => {
  const dir = mkdtempSync(join(tmpdir(), 'lodge-cms-test-'));
  const { app, db } = createApp({ dataDir: dir, origin });
  const server = app.listen(0, '127.0.0.1'); await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  let cookie = '', csrf = '', revision;
  const request = (path, method = 'GET', body, headers = {}) => fetch(base + path, { method, headers: { ...(cookie ? { cookie } : {}), ...(method === 'GET' ? {} : { origin, 'content-type': 'application/json', 'x-csrf-token': csrf }), ...headers }, body: body === undefined ? undefined : JSON.stringify(body) });
  try {
    await t.test('public inventory is seeded and management is private before provisioning', async () => {
      assert.equal((await request('/api/site')).status, 200);
      for (const path of ['/api/admin/site', '/api/admin/session', '/api/admin/uploads', '/api/admin/assets']) assert.equal((await request(path)).status, 401);
      assert.equal((await request('/api/admin/site', 'PUT', {})).status, 401);
      assert.equal((await request('/api/admin/uploads', 'POST', { data: image })).status, 401);
      assert.equal((await request('/api/admin/login', 'POST', { email, password })).status, 401);
      const hash = await hashPassword(password); assert.ok(!hash.includes(password));
      db.prepare('INSERT INTO owners VALUES (?,?)').run(email, hash);
    });
    await t.test('login rotates to an opaque HttpOnly session and enforces origins', async () => {
      assert.equal((await request('/api/admin/login', 'POST', { email, password }, { origin: 'https://evil.example' })).status, 403);
      assert.equal((await request('/api/admin/login', 'POST', { email, password: 'wrong' })).status, 401);
      const response = await request('/api/admin/login', 'POST', { email, password }); assert.equal(response.status, 200);
      assert.match(response.headers.get('set-cookie'), /HttpOnly/); assert.match(response.headers.get('set-cookie'), /SameSite=Strict/);
      cookie = response.headers.get('set-cookie').split(';')[0]; csrf = (await response.json()).csrf;
      const rawToken = cookie.split('=')[1]; assert.ok(db.prepare('SELECT token FROM sessions WHERE token=?').get(digest(rawToken))); assert.ok(!db.prepare('SELECT token FROM sessions WHERE token=?').get(rawToken));
      const response2 = await request('/api/admin/session'); assert.equal((await response2.json()).email, email);
    });
    await t.test('CSRF, malformed values, negative prices and unsafe media are rejected', async () => {
      const data = readSite(db);
      assert.equal((await request('/api/admin/site', 'PUT', data, { 'x-csrf-token': '' })).status, 403);
      assert.equal((await request('/api/admin/site', 'PUT', data, { origin: 'https://evil.example' })).status, 403);
      for (const mutate of [s => { s.rooms[0].pricePerNight = -1; }, s => { s.rooms[0].currency = 'evil'; }, s => { s.rooms[0].gallery[0].src = 'javascript:alert(1)'; }, s => { s.categories = [null]; }, s => { s.offers = [null]; }, s => { s.rooms[0].gallery = [null]; }, s => { s.rooms[0].published = 'true'; }]) {
        const bad = structuredClone(data); mutate(bad); assert.equal((await request('/api/admin/site', 'PUT', bad)).status, 400);
      }
      assert.equal(readSite(db).revision, data.revision);
    });
    await t.test('save, hide, edit and delete update only the published public inventory', async () => {
      const data = readSite(db); revision = data.revision;
      data.rooms[0].published = false; data.offers[0].published = false;
      data.rooms[1].name = 'Updated owner room'; data.rooms[1].pricePerNight = 125;
      data.content['Stay by the Ocean.'].en = 'Your coastal home';
      let response = await request('/api/admin/site', 'PUT', data); assert.equal(response.status, 200);
      const saved = await response.json(); assert.equal(saved.revision, revision + 1);
      const publicSite = await (await request('/api/site')).json();
      assert.ok(!publicSite.rooms.some(r => r.id === data.rooms[0].id)); assert.ok(!publicSite.offers.some(o => o.id === data.offers[0].id));
      assert.equal(publicSite.rooms[0].name, 'Updated owner room'); assert.equal(publicSite.rooms[0].pricePerNight, 125); assert.equal(publicSite.content['Stay by the Ocean.'].en, 'Your coastal home');
      assert.equal((await request('/api/admin/site', 'PUT', data)).status, 409, 'stale editors must not overwrite changes');
      assert.equal((await request('/api/site', 'GET', undefined, { 'if-none-match': `"site-${saved.revision}"` })).status, 304);
      saved.categories.push({ id: 'suite', label: 'Premium suites' }); const newRoom = { ...saved.rooms[0], id: 'new-suite', name: 'New suite', tag: 'Premium suites', published: true }; saved.rooms.push(newRoom);
      assert.equal((await request('/api/admin/site', 'PUT', saved)).status, 200);
      assert.ok((await (await request('/api/site')).json()).rooms.some(r => r.id === newRoom.id));
      const next = readSite(db); next.rooms = next.rooms.filter(r => r.id !== 'new-suite');
      assert.equal((await request('/api/admin/site', 'PUT', next)).status, 200);
      assert.ok(!(await (await request('/api/site')).json()).rooms.some(r => r.id === 'new-suite'));
    });
    await t.test('images use server-assigned filenames; active images cannot be deleted', async () => {
      assert.equal((await request('/api/admin/uploads', 'POST', { name: 'x.svg', data: Buffer.from('<svg onload="alert(1)"></svg>').toString('base64') })).status, 400);
      const response = await request('/api/admin/uploads', 'POST', { name: '../../test.png', data: image }); assert.equal(response.status, 201);
      const photo = await response.json(); assert.match(photo.id, /^[\da-f-]+\.png$/); assert.ok(existsSync(join(dir, 'uploads', photo.id)));
      const media = await request(photo.src); assert.equal(media.headers.get('content-type'), 'image/png'); assert.equal(media.headers.get('x-content-type-options'), 'nosniff');
      const data = readSite(db); data.rooms[1].gallery.unshift({ src: photo.src, caption: 'New cover' });
      assert.equal((await request('/api/admin/site', 'PUT', data)).status, 200);
      assert.equal(readSite(db).rooms[1].image, photo.src);
      assert.equal((await request(`/api/admin/uploads/${photo.id}`, 'DELETE', {})).status, 409);
      const next = readSite(db); next.rooms[1].gallery.shift(); assert.equal((await request('/api/admin/site', 'PUT', next)).status, 200);
      assert.equal((await request(`/api/admin/uploads/${photo.id}`, 'DELETE', {})).status, 200); assert.ok(!existsSync(join(dir, 'uploads', photo.id)));
      assert.equal((await request('/api/admin/site', 'PUT', { ...data, revision: readSite(db).revision })).status, 400, 'deleted uploads cannot be reintroduced');
    });
    await t.test('changing the password revokes sessions; logout and expiry enforce access', async () => {
      const response = await request('/api/admin/password', 'POST', { currentPassword: password, newPassword: password + '-new' }); assert.equal(response.status, 200);
      assert.equal((await request('/api/admin/site')).status, 401); cookie = '';
      const login = await request('/api/admin/login', 'POST', { email, password: password + '-new' }); cookie = login.headers.get('set-cookie').split(';')[0]; csrf = (await login.json()).csrf;
      db.prepare('UPDATE sessions SET expires=0').run(); assert.equal((await request('/api/admin/site')).status, 401);
      cookie = ''; const login2 = await request('/api/admin/login', 'POST', { email, password: password + '-new' }); cookie = login2.headers.get('set-cookie').split(';')[0]; csrf = (await login2.json()).csrf;
      assert.equal((await request('/api/admin/logout', 'POST', {})).status, 200); assert.equal((await request('/api/admin/site')).status, 401);
    });
    await t.test('login throttling blocks repeated password guessing', async () => {
      cookie = '';
      db.prepare('INSERT OR REPLACE INTO attempts VALUES (?,?,?)').run(`login-email:${digest(email)}`, 10, Date.now() + 900000);
      assert.equal((await request('/api/admin/login', 'POST', { email, password: 'wrong' })).status, 429);
    });
    await t.test('content persists across database reopen and production requires HTTPS', () => {
      const before = readSite(db); const reopened = createApp({ dataDir: dir, origin }); assert.deepEqual(readSite(reopened.db), before); reopened.db.close();
      assert.throws(() => createApp({ dataDir: dir, origin, production: true }), /HTTPS/);
    });
  } finally { await new Promise(resolve => server.close(resolve)); db.close(); rmSync(dir, { recursive: true, force: true }); }
});

test('production serves the built dashboard with HTTPS cookie and security headers', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'lodge-production-test-'));
  const { app, db } = createApp({ dataDir: directory, origin: 'https://lodge.example', production: true });
  db.prepare('INSERT INTO owners VALUES (?,?)').run(email, await hashPassword(password));
  const server = app.listen(0, '127.0.0.1'); await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const response = await fetch(`${base}/api/admin/login`, { method: 'POST', headers: { origin: 'https://lodge.example', 'content-type': 'application/json' }, body: JSON.stringify({ email, password }) });
    assert.equal(response.status, 200);
    assert.match(response.headers.get('set-cookie'), /^__Host-lodge_session=/);
    assert.match(response.headers.get('set-cookie'), /Secure/);
    assert.match(response.headers.get('set-cookie'), /HttpOnly/);
    assert.match(response.headers.get('set-cookie'), /SameSite=Strict/);
    const dashboard = await fetch(`${base}/admin`); assert.equal(dashboard.status, 200);
    assert.match(dashboard.headers.get('content-security-policy'), /frame-ancestors 'none'/);
    assert.equal(dashboard.headers.get('x-frame-options'), 'DENY');
    assert.match(dashboard.headers.get('strict-transport-security'), /max-age=/);
    assert.ok(!(await (await fetch(`${base}/data/lodge.sqlite`)).text()).startsWith('SQLite format'));
  } finally { await new Promise(resolve => server.close(resolve)); db.close(); rmSync(directory, { recursive: true, force: true }); }
});
