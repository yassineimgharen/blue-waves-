import 'dotenv/config';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { put, head } from '@vercel/blob';
import { connectStore } from './database.mjs';
import { seedBody } from './environment.mjs';

// Explicit, one-time transfer. The source database is opened read-only; sessions are not copied.
if (!process.env.DATABASE_URL || !process.env.BLOB_READ_WRITE_TOKEN) throw new Error('Set DATABASE_URL and BLOB_READ_WRITE_TOKEN in your local environment first.');
const dataDir = resolve(process.env.DATA_DIR || 'data');
const source = new DatabaseSync(resolve(dataDir, 'lodge.sqlite'), { readOnly: true });
try {
  const site = source.prepare('SELECT * FROM site WHERE id=1').get();
  const owners = source.prepare('SELECT * FROM owners').all();
  const uploads = source.prepare('SELECT * FROM uploads').all();
  const target = await connectStore();
  const seed = seedBody();
  const check = await target.prepare('SELECT * FROM site WHERE id=1').get();
  if (check.revision !== 1 || check.body !== seed || (await target.prepare('SELECT * FROM owners').all()).length || (await target.prepare('SELECT * FROM uploads').all()).length) throw new Error('The cloud database already contains content or owners. Migration refuses to overwrite it.');
  const blobs = [];
  for (const upload of uploads) {
    if (!/^[a-f0-9-]{36}\.(jpg|png|webp)$/.test(upload.id)) throw new Error('Unexpected local upload filename.');
    const filename = resolve(dataDir, 'uploads', upload.id);
    if (!existsSync(filename)) throw new Error(`Missing local photo: ${upload.id}`);
    const bytes = readFileSync(filename);
    let blob;
    try { blob = await head(`uploads/${upload.id}`); }
    catch (error) { if (error.name !== 'BlobNotFoundError') throw error; }
    if (blob) {
      const remote = Buffer.from(await (await fetch(blob.url)).arrayBuffer());
      if (!remote.equals(bytes)) throw new Error('An existing cloud photo differs from the local photo; refusing to overwrite.');
    } else blob = await put(`uploads/${upload.id}`, bytes, { access: 'public', contentType: upload.mime, addRandomSuffix: false, allowOverwrite: false });
    blobs.push({ id: upload.id, url: blob.url });
  }
  const sql = target.sql;
  // Lock and repeat the emptiness checks inside the atomic import transaction.
  await sql.transaction([
    sql.query('LOCK TABLE site, owners, uploads IN EXCLUSIVE MODE'),
    sql.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM owners) OR EXISTS (SELECT 1 FROM uploads) OR EXISTS (SELECT 1 FROM site WHERE revision <> 1) THEN RAISE EXCEPTION 'Cloud database is no longer empty'; END IF; END $$`),
    sql.query('UPDATE site SET revision=$1, body=$2 WHERE id=1', [site.revision, site.body]),
    ...owners.map(owner => sql.query('INSERT INTO owners VALUES ($1,$2)', [owner.email, owner.password])),
    ...uploads.map(upload => sql.query('INSERT INTO uploads VALUES ($1,$2,$3,$4)', [upload.id, upload.name, upload.mime, upload.created])),
    ...blobs.map(blob => sql.query('INSERT INTO blob_uploads VALUES ($1,$2)', [blob.id, blob.url])),
  ]);
  console.log(`Migration complete: ${owners.length} owner account(s), ${uploads.length} photos, and all website content. Sign in with your existing password. Local data was not changed.`);
} finally { source.close(); }
