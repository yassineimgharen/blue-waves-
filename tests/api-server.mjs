import { createServer } from 'node:http';
import { createHandler } from '../server/api.mjs';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
export async function createApp(options = {}) {
  const { handler, db } = await createHandler(options);
  return { db, app: { listen(...args) { return createServer((req, res) => {
    res.status = code => { res.statusCode = code; return res; };
    res.json = body => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(body)); return res; };
    if (req.url.startsWith('/media/uploads/')) {
      const id = req.url.split('/').pop();
      const row = /^[a-f0-9-]+\.(jpg|png|webp)$/.test(id) && db.prepare('SELECT * FROM uploads WHERE id=?').get(id);
      if (!row) return res.status(404).end();
      res.setHeader('Content-Type', row.mime); res.setHeader('X-Content-Type-Options', 'nosniff');
      return res.end(readFileSync(resolve(options.dataDir, 'uploads', id)));
    }
    void handler(req, res);
  }).listen(...args); } } };
}
