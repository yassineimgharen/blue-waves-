import type { NextApiRequest, NextApiResponse } from 'next';
import { getStore } from '../../../../server/database.mjs';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
export default async function media(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Security-Policy', "default-src 'none'; sandbox");
  if (!['GET', 'HEAD'].includes(req.method || '')) { res.status(405).end(); return; }
  const id = req.query.id;
  if (typeof id !== 'string' || !/^[a-f0-9-]{36}\.(jpg|png|webp)$/.test(id)) { res.status(404).end(); return; }
  try {
    const db = await getStore();
    const upload = await db.prepare('SELECT * FROM uploads WHERE id=?').get(id);
    if (!upload) { res.status(404).end(); return; }
    const blob = await db.prepare('SELECT url FROM blob_uploads WHERE id=?').get(id);
    if (blob) { res.redirect(307, blob.url); return; }
    const bytes = await readFile(resolve(process.env.DATA_DIR || 'data', 'uploads', id));
    res.setHeader('Content-Type', upload.mime);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.status(200).send(bytes);
  } catch (error) {
    if (error.code === 'ENOENT') { res.status(404).end(); return; }
    res.status(503).end();
  }
}
