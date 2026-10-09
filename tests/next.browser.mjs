// Isolated Next.js integration runner. No real credentials or reservation emails.
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import assert from 'node:assert/strict';
const directory = mkdtempSync(join(tmpdir(), 'lodge-next-browser-'));
const origin = 'http://127.0.0.1:3012';
const children = [];
const production = process.env.NEXT_TEST_PRODUCTION === '1';
try {
  children.push(spawn(process.execPath, ['node_modules/next/dist/bin/next', ...(production ? ['start'] : ['dev', '--webpack']), '--hostname', '127.0.0.1', '--port', '3012'], { env: { ...process.env, NODE_ENV: production ? 'production' : 'development', APP_ORIGIN: production ? 'https://lodge.example' : origin, DATA_DIR: join(directory, 'data'), DATABASE_URL: '', BLOB_READ_WRITE_TOKEN: '' }, stdio: ['ignore','ignore','pipe'] }));
  children.push(spawn('chromium', ['--headless', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--remote-debugging-port=9222', `--user-data-dir=${join(directory, 'browser')}`, 'about:blank'], { stdio: 'ignore' }));
  children[0].stderr.on('data', chunk => process.stderr.write(chunk));
  let ready = false;
  for (let i=0;i<300;i++) {
    try { if ((await fetch(origin)).ok && (await fetch('http://127.0.0.1:9222/json/version')).ok) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve,100));
  }
  assert.ok(ready, 'Next.js and Chromium must start');
  const home = await (await fetch(origin)).text();
  assert.ok(home.includes('Stay by the Ocean.'), 'Public content must be server-rendered, not a loading screen');
  assert.ok(home.includes('__NEXT_DATA__'));
  assert.equal((await fetch(origin + '/rooms/nonexistent')).status, 404);
  for (const path of ['/data/lodge.sqlite', '/server/owner.mjs', '/.env']) assert.equal((await fetch(origin + path)).status, 404);
  const test = spawn(process.execPath, ['--import', 'tsx', 'tests/i18n.browser.mjs'], { env: { ...process.env, I18N_BASE_URL: origin }, stdio: 'inherit' });
  children.push(test);
  assert.equal(await new Promise(resolve => test.on('exit', resolve)), 0, 'Browser integration checks must pass');
} finally {
  for (const child of children) if (child.exitCode === null) child.kill('SIGTERM');
  await Promise.all(children.map(child => child.exitCode !== null ? Promise.resolve() : new Promise(resolve => child.once('exit', resolve))));
  rmSync(directory, { recursive: true, force: true });
}
