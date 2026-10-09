import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { openStore, hashPassword } from '../server/store.mjs';
for (const file of ['.next/server/pages/api/[...path].js.nft.json', '.next/server/pages/index.js.nft.json']) {
  const paths = JSON.parse(readFileSync(file, 'utf8')).files;
  assert.ok(!paths.some(path => path.includes('.sqlite') || /\/\.env/.test(path)), 'Deployment traces must exclude local credentials and databases');
}
const directory = mkdtempSync(join(tmpdir(), 'lodge-next-production-'));
const dataDir = join(directory, 'data');
const db = openStore(dataDir);
const password = randomUUID() + '-test-only';
const email = 'production@example.test';
db.prepare('INSERT INTO owners VALUES (?,?)').run(email, await hashPassword(password));
db.close();
const base = 'http://127.0.0.1:3013';
const origin = 'https://lodge.example';
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', '3013'], { env: { ...process.env, NODE_ENV: 'production', APP_ORIGIN: origin, DATA_DIR: dataDir, DATABASE_URL: '', BLOB_READ_WRITE_TOKEN: '' }, stdio: ['ignore','ignore','pipe'] });
child.stderr.on('data', chunk => process.stderr.write(chunk));
try {
  let ready = false;
  for (let i=0;i<150;i++) {
    try { if ((await fetch(base)).ok) { ready=true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve,100));
  }
  assert.ok(ready, 'Production Next server must start');
  const home = await fetch(base), policy = home.headers.get('content-security-policy');
  const html = await home.text();
  assert.ok(html.includes('Stay by the Ocean.'));
  const nonce = policy.match(/'nonce-([^']+)'/)[1];
  assert.ok(html.includes(`nonce="${nonce}"`));
  assert.ok(!policy.includes("script-src 'self' 'unsafe-inline'"));
  assert.notEqual(policy, (await fetch(base)).headers.get('content-security-policy'));
  const loginPage = await fetch(base + '/admin');
  assert.ok((await loginPage.text()).includes('Opening owner dashboard'));
  assert.equal(loginPage.headers.get('x-robots-tag'), 'noindex, nofollow');
  const response = await fetch(base + '/api/admin/login', { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify({ email, password }) });
  assert.equal(response.status,200);
  const cookie = response.headers.get('set-cookie');
  assert.match(cookie,/^__Host-lodge_session=/); assert.match(cookie,/Secure/); assert.match(cookie,/HttpOnly/);
  const session = await response.json();
  const owner = await fetch(base + '/api/admin/site', { headers: { cookie: cookie.split(';')[0] } });
  assert.equal(owner.status,200);
  const data = await owner.json();
  for (const room of data.rooms) {
    const detail = await fetch(base + '/rooms/' + room.id);
    assert.equal(detail.status,200); assert.ok((await detail.text()).includes(room.name));
    assert.equal((await fetch(base + room.image)).status,200);
  }
  const invalid = await fetch(base + '/api/admin/logout', { method: 'POST', headers: { origin: 'https://other.example', cookie: cookie.split(';')[0], 'content-type':'application/json', 'x-csrf-token':session.csrf }, body:'{}' });
  assert.equal(invalid.status,403);
  for (const path of ['/data/lodge.sqlite','/.env','/server/owner.mjs','/rooms/not-a-room']) assert.equal((await fetch(base + path)).status,404);
  console.log('PASS production: SSR pages, fresh CSP nonces, private owner login, secure session cookie, origin protection, all room URLs and cover photos.');
} finally {
  child.kill('SIGTERM');
  if (child.exitCode === null) await new Promise(resolve => child.once('exit',resolve));
  rmSync(directory,{recursive:true,force:true});
}
