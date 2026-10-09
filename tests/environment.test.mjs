import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { openStore, verifyPassword, readSite } from '../server/store.mjs';

test('environment owner setup and explicit contact sync preserve existing room content', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'lodge-env-'));
  const password = randomUUID() + '-test-only';
  const env = { ...process.env, DATA_DIR: directory, DATABASE_URL: '', VERCEL: '', OWNER_EMAIL: 'env-owner@example.test', OWNER_PASSWORD: password, RESERVATION_EMAIL: 'reservations@example.test', CONTACT_EMAIL: 'contact@example.test', CONTACT_PHONE: '+212 600000001', CONTACT_SECOND_PHONE: '+212 600000002' };
  try {
    execFileSync(process.execPath, ['server/owner.mjs', '--from-env'], { env, stdio: 'pipe' });
    const db = openStore(directory);
    const owner = db.prepare('SELECT password FROM owners WHERE email=?').get(env.OWNER_EMAIL);
    assert.notEqual(owner.password, password);
    assert.ok(await verifyPassword(password, owner.password));
    const before = readSite(db);
    assert.equal(before.contacts.reservationEmail, env.RESERVATION_EMAIL);
    execFileSync(process.execPath, ['server/sync-config.mjs'], { env: { ...env, CONTACT_EMAIL: 'updated@example.test' }, stdio: 'pipe' });
    const after = readSite(db);
    assert.equal(after.contacts.contactEmail, 'updated@example.test');
    assert.equal(after.revision, before.revision + 1);
    assert.deepEqual(after.rooms, before.rooms);
    assert.throws(() => execFileSync(process.execPath, ['server/owner.mjs', '--from-env'], { env: { ...env, OWNER_PASSWORD: '' }, stdio: 'pipe' }));
    assert.equal(db.prepare('SELECT password FROM owners WHERE email=?').get(env.OWNER_EMAIL).password, owner.password);
    db.close();
  } finally { rmSync(directory, { recursive: true, force: true }); }
});
