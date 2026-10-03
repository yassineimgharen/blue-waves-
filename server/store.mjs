import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, readFileSync, chmodSync } from 'node:fs';
import { resolve } from 'node:path';
import { randomBytes, scrypt, timingSafeEqual, createHash } from 'node:crypto';
import { promisify } from 'node:util';
const derive = promisify(scrypt);
export const digest = value => createHash('sha256').update(value).digest('hex');
export async function hashPassword(password) {
  if (typeof password !== 'string' || password.length < 14 || password.length > 256) throw new Error('Use a password between 14 and 256 characters.');
  const salt = randomBytes(16).toString('hex');
  const key = await derive(password, salt, 64, { N: 131072, r: 8, p: 1, maxmem: 256 * 1024 * 1024 });
  return `${salt}:${key.toString('hex')}`;
}
export async function verifyPassword(password, stored) {
  const [salt, key] = stored.split(':');
  const actual = await derive(password, salt, 64, { N: 131072, r: 8, p: 1, maxmem: 256 * 1024 * 1024 });
  return timingSafeEqual(actual, Buffer.from(key, 'hex'));
}
export function openStore(dataDir) {
  mkdirSync(dataDir, { recursive: true, mode: 0o700 });
  const filename = resolve(dataDir, 'lodge.sqlite');
  const db = new DatabaseSync(filename);
  chmodSync(filename, 0o600);
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS site (id INTEGER PRIMARY KEY CHECK(id=1), revision INTEGER NOT NULL, body TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS owners (email TEXT PRIMARY KEY, password TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, email TEXT NOT NULL, csrf TEXT NOT NULL, expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS attempts (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS uploads (id TEXT PRIMARY KEY, name TEXT NOT NULL, mime TEXT NOT NULL, created INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS audit (id INTEGER PRIMARY KEY, email TEXT NOT NULL, action TEXT NOT NULL, created INTEGER NOT NULL);`);
  const seed = JSON.parse(readFileSync(new URL('./seed.json', import.meta.url), 'utf8'));
  db.prepare('INSERT OR IGNORE INTO site VALUES (1, ?, ?)').run(1, JSON.stringify(seed));
  return db;
}
export function readSite(db) {
  const row = db.prepare('SELECT * FROM site WHERE id=1').get();
  return { ...JSON.parse(row.body), revision: row.revision };
}
export function audit(db, email, action) { db.prepare('INSERT INTO audit(email,action,created) VALUES (?,?,?)').run(email, action, Date.now()); }
