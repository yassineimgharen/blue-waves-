import { randomBytes, randomUUID } from 'node:crypto';
import { mkdirSync, writeFileSync, unlinkSync, existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { digest, verifyPassword, hashPassword } from './store.mjs';
import { getStore, connectStore, loadSite, publicSite, recordAudit } from './database.mjs';
import { HttpError, validateSite } from './validation.mjs';
import { del, head } from '@vercel/blob';
import { generateClientTokenFromReadWriteToken } from '@vercel/blob/client';
const project = process.cwd();
const header = (req, name) => req.headers[name.toLowerCase()];

export async function createHandler({ dataDir = resolve(process.env.DATA_DIR || 'data'), origin = process.env.APP_ORIGIN, production = process.env.NODE_ENV === 'production', database } = {}) {
  if (production && (!origin || new URL(origin).protocol !== 'https:')) throw new Error('Production APP_ORIGIN must use HTTPS.');
  const allowedOrigin = new URL(origin || 'http://127.0.0.1:3000').origin;
  const db = database || await connectStore({ dataDir });
  const uploadDir = resolve(dataDir, 'uploads');
  const cookieName = production ? '__Host-lodge_session' : 'lodge_session';
  const cookieOptions = { maxAge: 8 * 60 * 60 * 1000 };
  function setCookie(res, token, clear = false) {
    res.setHeader('Set-Cookie', `${cookieName}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${clear ? 0 : 28800}${production ? '; Secure' : ''}`);
    return res;
  }
  async function limit(key, max, interval) {
    const now = Date.now();
    await db.prepare('DELETE FROM attempts WHERE expires<=?').run(now);
    await db.prepare('INSERT INTO attempts VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1').run(key, now + interval);
    if ((await db.prepare('SELECT count FROM attempts WHERE key=?').get(key)).count > max) throw new HttpError(429, 'Too many attempts. Please try again later.');
  }
  const routes = [];
  const route = (method, path, handler) => routes.push({ method, path, handler });
  route('GET', '/api/site', async (req, res) => {
    const site = await loadSite(db);
    const tag = `"site-${site.revision}"`; res.setHeader('ETag', tag);
    if (header(req, 'if-none-match') === tag) return res.status(304).end();
    res.json(publicSite(site));
  });
  route('POST', '/api/admin/login', async (req, res) => {
    await limit(`login-ip:${digest((process.env.VERCEL ? req.headers['x-vercel-forwarded-for'] : req.socket?.remoteAddress) ?? '')}`, 30, 15 * 60 * 1000);
    const { email, password } = req.body ?? {};
    if (typeof email !== 'string' || email.length > 200 || typeof password !== 'string' || password.length > 256) throw new HttpError(400, 'Enter your email and password.');
    const normalized = email.toLowerCase().trim();
    await limit(`login-email:${digest(normalized)}`, 10, 15 * 60 * 1000);
    const owner = await db.prepare('SELECT * FROM owners WHERE email=?').get(normalized);
    // Use the same expensive derivation for an unknown account.
    const fakeHash = '0'.repeat(32) + ':' + '0'.repeat(128);
    const valid = await verifyPassword(password, owner?.password ?? fakeHash);
    if (!owner || !valid) throw new HttpError(401, 'Email or password is incorrect.');
    const token = randomBytes(32).toString('hex'); const csrf = randomBytes(32).toString('hex');
    await db.prepare('DELETE FROM sessions WHERE expires<=?').run(Date.now());
    await db.prepare('INSERT INTO sessions VALUES (?,?,?,?)').run(digest(token), owner.email, csrf, Date.now() + cookieOptions.maxAge);
    await recordAudit(db, owner.email, 'login');
    setCookie(res, token).json({ email: owner.email, csrf });
  });
  route('POST', '/api/admin/uploads', async (req, res) => {
    try {
      await limit(`upload:${req.owner.email}`, 100, 60 * 60 * 1000);
      const { name, data } = req.body ?? {};
      if (typeof data !== 'string' || !/^[A-Za-z0-9+/]+={0,2}$/.test(data)) throw new HttpError(400, 'Invalid image data.');
      const bytes = Buffer.from(data, 'base64');
      if (bytes.length < 12 || bytes.length > 5 * 1024 * 1024) throw new HttpError(400, 'Images must be at most 5 MB.');
      let ext, mime;
      if (bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) { ext = 'png'; mime = 'image/png'; }
      else if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) { ext = 'jpg'; mime = 'image/jpeg'; }
      else if (bytes.toString('ascii',0,4) === 'RIFF' && bytes.toString('ascii',8,12) === 'WEBP') { ext = 'webp'; mime = 'image/webp'; }
      else throw new HttpError(400, 'Only JPEG, PNG and WebP images are accepted.');
      const id = `${randomUUID()}.${ext}`;
      if (process.env.VERCEL) throw new HttpError(400, 'Use direct photo upload on Vercel.');
      mkdirSync(uploadDir, { recursive: true, mode: 0o700 });
      writeFileSync(resolve(uploadDir, id), bytes, { flag: 'wx', mode: 0o600 });
      await db.prepare('INSERT INTO uploads VALUES (?,?,?,?)').run(id, typeof name === 'string' ? basename(name).slice(0,200) : id, mime, Date.now());
      await recordAudit(db, req.owner.email, 'upload image');
      res.status(201).json({ id, src: `/media/uploads/${id}`, name });
    } catch (error) { throw error; }
  });
  route('GET', '/api/admin/session', async (req, res) => res.json({ email: req.owner.email, csrf: req.owner.csrf }));
  route('POST', '/api/admin/logout', async (req, res) => { await db.prepare('DELETE FROM sessions WHERE token=?').run(req.owner.token); setCookie(res, '', true).json({ ok: true }); });
  route('POST', '/api/admin/password', async (req, res) => {
    await limit(`password:${req.owner.email}`, 10, 15 * 60 * 1000);
    const { currentPassword, newPassword } = req.body ?? {};
    if (typeof currentPassword !== 'string' || currentPassword.length > 256) throw new HttpError(400, 'Enter your current password.');
    const owner = await db.prepare('SELECT password FROM owners WHERE email=?').get(req.owner.email);
    if (!await verifyPassword(currentPassword, owner.password)) throw new HttpError(401, 'Current password is incorrect.');
    let hash; try { hash = await hashPassword(newPassword); } catch (error) { throw new HttpError(400, error.message); }
    await db.prepare('UPDATE owners SET password=? WHERE email=?').run(hash, req.owner.email);
    await db.prepare('DELETE FROM sessions WHERE email=?').run(req.owner.email);
    await recordAudit(db, req.owner.email, 'password changed; sessions revoked');
    setCookie(res, '', true).json({ ok: true });
  });
  route('GET', '/api/admin/site', async (req, res) => res.json(await loadSite(db)));
  route('PUT', '/api/admin/site', async (req, res) => {
    try {
      const site = validateSite(req.body);
      const references = [...site.rooms.flatMap(r => r.gallery.map(p => p.src)), ...site.offers.map(o => o.image), ...Object.values(site.images)].filter(Boolean);
      for (const src of references) {
        if (src.startsWith('/media/uploads/') && !await db.prepare('SELECT id FROM uploads WHERE id=?').get(src.slice('/media/uploads/'.length))) throw new HttpError(400, 'An uploaded photo no longer exists. Choose another image.');
        if (src.startsWith('/media/seed/') && !JSON.parse(readFileSync(resolve(project, 'server/media.json'), 'utf8')).paths.some(path => decodeURIComponent(path) === decodeURIComponent(src))) throw new HttpError(400, 'An original image could not be found.');
      }
      const revision = req.body.revision;
      if (!Number.isInteger(revision)) throw new HttpError(400, 'Missing version. Reload this page.');
      const result = await db.prepare('UPDATE site SET body=?,revision=revision+1 WHERE id=1 AND revision=?').run(JSON.stringify(site), revision);
      if (!result.changes) throw new HttpError(409, 'Another editor saved changes. Reload the dashboard before saving again. Your current edits have not been applied.');
      await recordAudit(db, req.owner.email, `saved site revision ${revision + 1}`);
      res.json(await loadSite(db));
    } catch (error) { throw error; }
  });
  route('GET', '/api/admin/uploads', async (req, res) => res.json((await db.prepare('SELECT * FROM uploads ORDER BY created DESC').all()).map(u => ({ ...u, src: `/media/uploads/${u.id}` }))));
  route('DELETE', '/api/admin/uploads/:id', async (req, res) => {
    try {
      const row = await db.prepare('SELECT * FROM uploads WHERE id=?').get(req.params.id);
      if (!row) throw new HttpError(404, 'Image not found.');
      const src = `/media/uploads/${row.id}`;
      if (JSON.stringify(await loadSite(db)).includes(src)) throw new HttpError(409, 'This image is still used. Remove it from rooms, offers or website images and save first.');
      const blob = await db.prepare('SELECT url FROM blob_uploads WHERE id=?').get(row.id);
      if (blob) { await del(blob.url); await db.prepare('DELETE FROM blob_uploads WHERE id=?').run(row.id); }
      if (existsSync(resolve(uploadDir, row.id))) unlinkSync(resolve(uploadDir, row.id));
      await db.prepare('DELETE FROM uploads WHERE id=?').run(row.id); await recordAudit(db, req.owner.email, 'deleted unused image');
      res.json({ ok: true });
    } catch (error) { throw error; }
  });
  route('GET', '/api/admin/assets', async (req, res) => {
    res.json([...JSON.parse(readFileSync(resolve(project, 'server/assets.json'), 'utf8')), { key: 'bluewave-white.png', name: 'Lodge logo', src: '/media/branding/bluewave-white.png' }, ...JSON.parse(readFileSync(resolve(project, 'server/media.json'), 'utf8')).catalog]);
  });

  route('GET', '/api/admin/upload-mode', async (req, res) => {
    if (process.env.VERCEL && !process.env.BLOB_READ_WRITE_TOKEN) throw new HttpError(503, 'Configure Vercel Blob before uploading photos.');
    res.json({ direct: !!process.env.BLOB_READ_WRITE_TOKEN });
  });
  route('POST', '/api/admin/upload-token', async (req, res) => {
    if (!process.env.BLOB_READ_WRITE_TOKEN) throw new HttpError(503, 'Photo storage is not configured.');
    await limit(`upload:${req.owner.email}`, 100, 60 * 60 * 1000);
    const types = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
    const { name, mime } = req.body;
    if (!Object.hasOwn(types, mime) || typeof name !== 'string') throw new HttpError(400, 'Choose a JPEG, PNG or WebP photo.');
    const id = `${randomUUID()}.${types[mime]}`;
    const pathname = `uploads/${id}`;
    const expires = Date.now() + 10 * 60 * 1000;
    await db.prepare('INSERT INTO pending_uploads VALUES (?,?,?,?,?)').run(id, req.owner.email, basename(name).slice(0, 200), mime, expires);
    const token = await generateClientTokenFromReadWriteToken({
      token: process.env.BLOB_READ_WRITE_TOKEN, pathname,
      allowedContentTypes: [mime], maximumSizeInBytes: 5 * 1024 * 1024,
      validUntil: expires, addRandomSuffix: false, allowOverwrite: false,
    });
    res.json({ id, pathname, token });
  });
  route('POST', '/api/admin/upload-complete', async (req, res) => {
    const { id } = req.body;
    if (typeof id !== 'string' || !/^[a-f0-9-]{36}\.(jpg|png|webp)$/.test(id)) throw new HttpError(400, 'Invalid upload.');
    const pending = await db.prepare('SELECT * FROM pending_uploads WHERE id=? AND email=? AND expires>?').get(id, req.owner.email, Date.now());
    if (!pending) throw new HttpError(400, 'Upload expired. Please upload this photo again.');
    const blob = await head(`uploads/${id}`);
    if (blob.size < 12 || blob.size > 5 * 1024 * 1024 || blob.contentType !== pending.mime) throw new HttpError(400, 'Invalid photo size or type.');
    // The URL comes from the storage SDK, never from user input. Inspect the signature.
    const response = await fetch(blob.url, { headers: { Range: 'bytes=0-11' } });
    if (!response.ok || !response.body) throw new HttpError(400, 'Unable to verify this photo.');
    const reader = response.body.getReader();
    let bytes = Buffer.alloc(0);
    try { while (bytes.length < 12) { const part = await reader.read(); if (part.done) break; bytes = Buffer.concat([bytes, Buffer.from(part.value).subarray(0, 12 - bytes.length)]); } } finally { await reader.cancel(); }
    const detected = bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])) ? 'image/png' : bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255 ? 'image/jpeg' : bytes.toString('ascii',0,4) === 'RIFF' && bytes.toString('ascii',8,12) === 'WEBP' ? 'image/webp' : '';
    if (detected !== pending.mime) { await del(blob.url); throw new HttpError(400, 'Only valid JPEG, PNG and WebP photos are accepted.'); }
    await db.prepare('INSERT INTO blob_uploads VALUES (?,?) ON CONFLICT(id) DO NOTHING').run(id, blob.url);
    await db.prepare('INSERT INTO uploads VALUES (?,?,?,?) ON CONFLICT(id) DO NOTHING').run(id, pending.name, pending.mime, Date.now());
    await db.prepare('DELETE FROM pending_uploads WHERE id=?').run(id);
    await recordAudit(db, req.owner.email, 'upload image');
    res.status(201).json({ id, src: `/media/uploads/${id}`, name: pending.name });
  });

  async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    if (production) res.setHeader('Strict-Transport-Security', 'max-age=31536000');
    try {
      const path = new URL(req.url, allowedOrigin).pathname;
      if (!['GET', 'HEAD'].includes(req.method)) {
        if (header(req, 'origin') !== allowedOrigin || header(req, 'sec-fetch-site') === 'cross-site') throw new HttpError(403, 'Request origin is not allowed.');
        if (!/^application\/json(?:;|$)/i.test(header(req, 'content-type') || '')) throw new HttpError(415, 'JSON requests are required.');
      }
      if (path.startsWith('/api/admin/') && path !== '/api/admin/login') {
        const token = (req.headers.cookie ?? '').split(';').map(v => v.trim()).find(v => v.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1);
        const session = token && /^[a-f0-9]{64}$/.test(token) ? await db.prepare('SELECT * FROM sessions WHERE token=? AND expires>?').get(digest(token), Date.now()) : null;
        if (!session) throw new HttpError(401, 'Please sign in to continue.');
        req.owner = session;
        if (!['GET', 'HEAD'].includes(req.method) && header(req, 'x-csrf-token') !== session.csrf) throw new HttpError(403, 'Security token is missing or expired. Reload and sign in again.');
      }
      if (!['GET', 'HEAD'].includes(req.method)) {
        const max = path === '/api/admin/login' ? 4096 : path === '/api/admin/uploads' ? 8 * 1024 * 1024 : 4 * 1024 * 1024;
        if (Number(header(req, 'content-length')) > max) throw new HttpError(413, 'Request is too large.');
        let size = 0; const chunks = [];
        for await (const chunk of req) { size += chunk.length; if (size > max) throw new HttpError(413, 'Request is too large.'); chunks.push(chunk); }
        try { req.body = JSON.parse(Buffer.concat(chunks).toString() || '{}'); } catch { throw new HttpError(400, 'Invalid JSON request.'); }
        if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) throw new HttpError(400, 'A JSON object is required.');
      }
      const match = routes.find(route => route.method === req.method && (route.path === path || route.path.endsWith('/:id') && path.startsWith(route.path.slice(0, -3)) && !path.slice(route.path.length - 3).includes('/')));
      if (!match) throw new HttpError(404, 'Not found.');
      req.params = { id: decodeURIComponent(path.split('/').pop()) };
      return await match.handler(req, res);
    } catch (error) {
      const status = error.status || 500;
      if (status >= 500) console.error('CMS request failed:', error.message);
      return res.status(status).json({ error: status >= 500 ? 'The server could not complete this request.' : error.message });
    }
  }
  return { handler, db };
}
let pending;
export default async function handler(req, res) {
  try {
    pending ??= getStore().then(database => createHandler({ database })).catch(error => { pending = undefined; throw error; });
    await (await pending).handler(req, res);
  } catch (error) {
    console.error('CMS initialization failed:', error.message);
    res.status(503).json({ error: 'Website storage is not configured. Please contact the owner.' });
  }
}
