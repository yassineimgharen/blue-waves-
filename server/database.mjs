import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { openStore } from './store.mjs';
import { seedBody } from './environment.mjs';

// Local development keeps the existing owner account and content. Vercel uses Postgres.
export async function connectStore({ dataDir = resolve(process.env.DATA_DIR || 'data'), connectionString = process.env.DATABASE_URL } = {}) {
  if (!connectionString) {
    if (process.env.VERCEL) throw new Error('Configure DATABASE_URL before deploying the CMS to Vercel.');
    const db = openStore(dataDir);
    db.exec('CREATE TABLE IF NOT EXISTS blob_uploads (id TEXT PRIMARY KEY, url TEXT NOT NULL)');
    db.exec('CREATE TABLE IF NOT EXISTS pending_uploads (id TEXT PRIMARY KEY, email TEXT NOT NULL, name TEXT NOT NULL, mime TEXT NOT NULL, expires INTEGER NOT NULL)');
    return db;
  }
  const sql = neon(connectionString);
  await sql.transaction([
    sql.query('CREATE TABLE IF NOT EXISTS site (id INTEGER PRIMARY KEY CHECK(id=1), revision INTEGER NOT NULL, body TEXT NOT NULL)'),
    sql.query('CREATE TABLE IF NOT EXISTS owners (email TEXT PRIMARY KEY, password TEXT NOT NULL)'),
    sql.query('CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, email TEXT NOT NULL, csrf TEXT NOT NULL, expires BIGINT NOT NULL)'),
    sql.query('CREATE TABLE IF NOT EXISTS attempts (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires BIGINT NOT NULL)'),
    sql.query('CREATE TABLE IF NOT EXISTS uploads (id TEXT PRIMARY KEY, name TEXT NOT NULL, mime TEXT NOT NULL, created BIGINT NOT NULL)'),
    sql.query('CREATE TABLE IF NOT EXISTS blob_uploads (id TEXT PRIMARY KEY, url TEXT NOT NULL)'),
    sql.query('CREATE TABLE IF NOT EXISTS pending_uploads (id TEXT PRIMARY KEY, email TEXT NOT NULL, name TEXT NOT NULL, mime TEXT NOT NULL, expires BIGINT NOT NULL)'),
    sql.query('CREATE TABLE IF NOT EXISTS audit (id BIGSERIAL PRIMARY KEY, email TEXT NOT NULL, action TEXT NOT NULL, created BIGINT NOT NULL)'),
  ]);
  const seed = seedBody();
  await sql.query('INSERT INTO site VALUES (1,1,$1) ON CONFLICT(id) DO NOTHING', [seed]);
  return {
    cloud: true,
    sql,
    prepare(statement) {
      let index = 0;
      const query = statement.replaceAll('?', () => `$${++index}`).replace('count=count+1', 'count=attempts.count+1');
      return {
        async get(...params) { return (await sql.query(query, params))[0]; },
        async all(...params) { return sql.query(query, params); },
        async run(...params) { const result = await sql.query(query, params, { fullResults: true }); return { changes: result.rowCount }; },
      };
    },
    close() {},
  };
}
export async function loadSite(db) {
  const row = await db.prepare('SELECT * FROM site WHERE id=1').get();
  return { ...JSON.parse(row.body), revision: row.revision };
}
const defaultContent = JSON.parse(readFileSync(resolve('server/seed.json'), 'utf8')).content;
export function publicSite(site) {
  const rooms = site.rooms.filter(room => room.published);
  const ids = new Set(rooms.map(room => room.id));
  const offers = site.offers.filter(offer => offer.published && (!offer.roomIds.length || offer.roomIds.some(id => ids.has(id)))).map(offer => ({ ...offer, roomIds: offer.roomIds.filter(id => ids.has(id)) }));
  const content = Object.fromEntries(Object.entries(site.content).filter(([key, value]) => JSON.stringify(value) !== JSON.stringify(defaultContent[key])));
  return { ...site, rooms, offers, content };
}
let store;
export function getStore() { return store ??= connectStore().catch(error => { store = undefined; throw error; }); }
export const recordAudit = (db, email, action) => db.prepare('INSERT INTO audit(email,action,created) VALUES (?,?,?)').run(email, action, Date.now());
