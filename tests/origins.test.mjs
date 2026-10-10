import assert from 'node:assert/strict';
import test from 'node:test';
import { trustedOrigins } from '../server/origins.mjs';

const env = { VERCEL: '1', VERCEL_URL: 'lodge-deploy.vercel.app', VERCEL_PROJECT_PRODUCTION_URL: 'lodge.example', VERCEL_BRANCH_URL: 'lodge-main.vercel.app' };
test('exact configured and platform origins are trusted, never wildcard domains', () => {
  const origins = trustedOrigins({ origin: 'https://www.lodge.example/', production: true, env });
  for (const host of ['www.lodge.example', 'lodge-deploy.vercel.app', 'lodge.example', 'lodge-main.vercel.app']) assert.ok(origins.has(`https://${host}`));
  for (const origin of [undefined, 'null', 'http://lodge.example', 'https://evil.vercel.app', 'https://lodge.example.evil.test', 'https://lodge.example:444', 'https://lodge.example/']) assert.ok(!origins.has(origin));
});
test('Vercel origins require the platform flag; production requires HTTPS', () => {
  assert.deepEqual([...trustedOrigins({ origin: 'https://lodge.example', production: true, env: { ...env, VERCEL: undefined } })], ['https://lodge.example']);
  assert.throws(() => trustedOrigins({ production: true, env: {} }), /HTTPS/);
  assert.throws(() => trustedOrigins({ origin: 'http://localhost:3000', production: true, env }), /HTTPS/);
  assert.ok(trustedOrigins({ production: true, env }).has('https://lodge-deploy.vercel.app'));
  for (const host of ['evil.test/path', 'user@evil.test', 'evil.test?x=1', 'https://evil.test']) assert.throws(() => trustedOrigins({ env: { VERCEL: '1', VERCEL_URL: host } }));
});
