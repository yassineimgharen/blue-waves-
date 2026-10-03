import express from 'express';
import { randomBytes, randomUUID } from 'node:crypto';
import { mkdirSync, writeFileSync, unlinkSync, existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { openStore, readSite, digest, verifyPassword, hashPassword, audit } from './store.mjs';
import { HttpError, validateSite } from './validation.mjs';
const project = fileURLToPath(new URL('../', import.meta.url));
const asyncRoute = fn => (req, res, next) => Promise.resolve(fn(req, res)).catch(next);

export function createApp({ dataDir = resolve(project, 'data'), origin = 'http://localhost:3000', production = false } = {}) {
  const originUrl = new URL(origin);
  if (production && originUrl.protocol !== 'https:') throw new Error('Production APP_ORIGIN must use HTTPS.');
  const allowedOrigin = originUrl.origin;
  const db = openStore(dataDir);
  const uploadDir = resolve(dataDir, 'uploads'); mkdirSync(uploadDir, { recursive: true, mode: 0o700 });
  const app = express();
  app.disable('x-powered-by');
  // Leave proxy trust disabled: configure the reverse proxy without trusting client-supplied IP headers.
  const cookieName = production ? '__Host-lodge_session' : 'lodge_session';
  const cookieOptions = { httpOnly: true, sameSite: 'strict', secure: production, path: '/', maxAge: 8 * 60 * 60 * 1000 };
  app.use((req, res, next) => {
    res.set({ 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY', 'Referrer-Policy': 'strict-origin-when-cross-origin', 'Permissions-Policy': 'camera=(), microphone=(), geolocation=()' });
    if (production) res.set('Strict-Transport-Security', 'max-age=31536000');
    if (req.path.startsWith('/api/')) res.set('Cache-Control', 'no-store');
    if (req.path.startsWith('/api/') && !['GET', 'HEAD'].includes(req.method)) {
      if (req.get('origin') !== allowedOrigin || req.get('sec-fetch-site') === 'cross-site') return res.status(403).json({ error: 'Request origin is not allowed.' });
      if (!req.is('application/json')) return res.status(415).json({ error: 'JSON requests are required.' });
    }
    next();
  });
  // Authentication is checked before parsing large request bodies on protected endpoints.
  const authenticate = (req, res, next) => {
    const token = (req.headers.cookie ?? '').split(';').map(v => v.trim()).find(v => v.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1);
    const session = token && /^[a-f0-9]{64}$/.test(token) ? db.prepare('SELECT * FROM sessions WHERE token=? AND expires>?').get(digest(token), Date.now()) : null;
    if (!session) return res.status(401).json({ error: 'Please sign in to continue.' });
    req.owner = session;
    if (!['GET', 'HEAD'].includes(req.method) && req.get('x-csrf-token') !== session.csrf) return res.status(403).json({ error: 'Security token is missing or expired. Reload and sign in again.' });
    next();
  };
  function limit(key, max, interval) {
    const now = Date.now();
    db.prepare('DELETE FROM attempts WHERE expires<=?').run(now);
    db.prepare('INSERT INTO attempts VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1').run(key, now + interval);
    if (db.prepare('SELECT count FROM attempts WHERE key=?').get(key).count > max) throw new HttpError(429, 'Too many attempts. Please try again later.');
  }
  app.get('/api/site', (req, res) => {
    const site = readSite(db);
    const rooms = site.rooms.filter(r => r.published);
    const offers = site.offers.filter(o => o.published && (!o.roomIds.length || o.roomIds.some(id => rooms.some(r => r.id === id)))).map(o => ({ ...o, roomIds: o.roomIds.filter(id => rooms.some(r => r.id === id)) }));
    const tag = `"site-${site.revision}"`; res.set('ETag', tag);
    if (req.get('if-none-match') === tag) return res.status(304).end();
    res.json({ ...site, rooms, offers });
  });
  app.post('/api/admin/login', express.json({ limit: '4kb' }), asyncRoute(async (req, res) => {
    limit(`login-ip:${digest(req.ip ?? '')}`, 30, 15 * 60 * 1000);
    const { email, password } = req.body ?? {};
    if (typeof email !== 'string' || email.length > 200 || typeof password !== 'string' || password.length > 256) throw new HttpError(400, 'Enter your email and password.');
    const normalized = email.toLowerCase().trim();
    limit(`login-email:${digest(normalized)}`, 10, 15 * 60 * 1000);
    const owner = db.prepare('SELECT * FROM owners WHERE email=?').get(normalized);
    // Use the same expensive derivation for an unknown account.
    const fakeHash = '0'.repeat(32) + ':' + '0'.repeat(128);
    const valid = await verifyPassword(password, owner?.password ?? fakeHash);
    if (!owner || !valid) throw new HttpError(401, 'Email or password is incorrect.');
    const token = randomBytes(32).toString('hex'); const csrf = randomBytes(32).toString('hex');
    db.prepare('DELETE FROM sessions WHERE expires<=?').run(Date.now());
    db.prepare('INSERT INTO sessions VALUES (?,?,?,?)').run(digest(token), owner.email, csrf, Date.now() + cookieOptions.maxAge);
    audit(db, owner.email, 'login');
    res.cookie(cookieName, token, cookieOptions).json({ email: owner.email, csrf });
  }));
  app.use('/api/admin', authenticate);
  app.post('/api/admin/uploads', express.json({ limit: '8mb' }), (req, res, next) => {
    try {
      limit(`upload:${req.owner.email}`, 100, 60 * 60 * 1000);
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
      writeFileSync(resolve(uploadDir, id), bytes, { flag: 'wx', mode: 0o600 });
      db.prepare('INSERT INTO uploads VALUES (?,?,?,?)').run(id, typeof name === 'string' ? basename(name).slice(0,200) : id, mime, Date.now());
      audit(db, req.owner.email, 'upload image');
      res.status(201).json({ id, src: `/media/uploads/${id}`, name });
    } catch (error) { next(error); }
  });
  app.use('/api/admin', express.json({ limit: '4mb' }));
  app.get('/api/admin/session', (req, res) => res.json({ email: req.owner.email, csrf: req.owner.csrf }));
  app.post('/api/admin/logout', (req, res) => { db.prepare('DELETE FROM sessions WHERE token=?').run(req.owner.token); res.clearCookie(cookieName, { ...cookieOptions, maxAge: undefined }).json({ ok: true }); });
  app.post('/api/admin/password', asyncRoute(async (req, res) => {
    limit(`password:${req.owner.email}`, 10, 15 * 60 * 1000);
    const { currentPassword, newPassword } = req.body ?? {};
    if (typeof currentPassword !== 'string' || currentPassword.length > 256) throw new HttpError(400, 'Enter your current password.');
    const owner = db.prepare('SELECT password FROM owners WHERE email=?').get(req.owner.email);
    if (!await verifyPassword(currentPassword, owner.password)) throw new HttpError(401, 'Current password is incorrect.');
    let hash; try { hash = await hashPassword(newPassword); } catch (error) { throw new HttpError(400, error.message); }
    db.prepare('UPDATE owners SET password=? WHERE email=?').run(hash, req.owner.email);
    db.prepare('DELETE FROM sessions WHERE email=?').run(req.owner.email);
    audit(db, req.owner.email, 'password changed; sessions revoked');
    res.clearCookie(cookieName, { ...cookieOptions, maxAge: undefined }).json({ ok: true });
  }));
  app.get('/api/admin/site', (req, res) => res.json(readSite(db)));
  app.put('/api/admin/site', (req, res, next) => {
    try {
      const site = validateSite(req.body);
      const references = [...site.rooms.flatMap(r => r.gallery.map(p => p.src)), ...site.offers.map(o => o.image), ...Object.values(site.images)].filter(Boolean);
      for (const src of references) {
        if (src.startsWith('/media/uploads/') && !db.prepare('SELECT id FROM uploads WHERE id=?').get(src.slice('/media/uploads/'.length))) throw new HttpError(400, 'An uploaded photo no longer exists. Choose another image.');
        if (src.startsWith('/media/seed/')) {
          let path; try { path = decodeURIComponent(src.slice('/media/seed/'.length)); } catch { throw new HttpError(400, 'Invalid image path.'); }
          if (path.includes('..') || path.startsWith('/') || !existsSync(resolve(project, 'src/images', path))) throw new HttpError(400, 'An original image could not be found.');
        }
      }
      const revision = req.body.revision;
      if (!Number.isInteger(revision)) throw new HttpError(400, 'Missing version. Reload this page.');
      const result = db.prepare('UPDATE site SET body=?,revision=revision+1 WHERE id=1 AND revision=?').run(JSON.stringify(site), revision);
      if (!result.changes) throw new HttpError(409, 'Another editor saved changes. Reload the dashboard before saving again. Your current edits have not been applied.');
      audit(db, req.owner.email, `saved site revision ${revision + 1}`);
      res.json(readSite(db));
    } catch (error) { next(error); }
  });
  app.get('/api/admin/uploads', (req, res) => res.json(db.prepare('SELECT * FROM uploads ORDER BY created DESC').all().map(u => ({ ...u, src: `/media/uploads/${u.id}` }))));
  app.delete('/api/admin/uploads/:id', (req, res, next) => {
    try {
      const row = db.prepare('SELECT * FROM uploads WHERE id=?').get(req.params.id);
      if (!row) throw new HttpError(404, 'Image not found.');
      const src = `/media/uploads/${row.id}`;
      if (JSON.stringify(readSite(db)).includes(src)) throw new HttpError(409, 'This image is still used. Remove it from rooms, offers or website images and save first.');
      if (existsSync(resolve(uploadDir, row.id))) unlinkSync(resolve(uploadDir, row.id));
      db.prepare('DELETE FROM uploads WHERE id=?').run(row.id); audit(db, req.owner.email, 'deleted unused image');
      res.json({ ok: true });
    } catch (error) { next(error); }
  });
  app.get('/api/admin/assets', (req, res) => {
    // Images elsewhere on the site can be replaced without changing the page layout.
    const root = resolve(project, 'src/images');
    const folders = ['', 'rooftop-restau'];
    res.json([...JSON.parse(readFileSync(new URL('./assets.json', import.meta.url), 'utf8')), { key: 'bluewave-white.png', name: 'Lodge logo', src: '/media/branding/bluewave-white.png' }, ...folders.flatMap(folder => {
      const path = resolve(root, folder); if (!existsSync(path)) return [];
      return readdirSync(path).filter(name => /\.(jpe?g|png|webp)$/i.test(name)).map(name => ({ key: name, name: folder ? `${folder} / ${name}` : name, src: '/media/seed/' + [folder,name].filter(Boolean).map(encodeURIComponent).join('/') }));
    })]);
  });
  app.use('/api', (req, res) => res.status(404).json({ error: 'Not found.' }));
  app.use('/media', (req, res, next) => { res.set('Content-Security-Policy', "default-src 'none'; sandbox"); next(); });
  app.get('/media/branding/bluewave-white.png', (req, res) => res.sendFile(resolve(project, 'src/bluewave-white.png')));
  app.use('/media/uploads', express.static(uploadDir, { dotfiles: 'deny', maxAge: '1y', immutable: true }));
  app.use('/media/seed', express.static(resolve(project, 'src/images'), { dotfiles: 'deny', maxAge: '1d' }));
  if (production) {
    app.use((req, res, next) => { res.set('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://api.emailjs.com; frame-src https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'"); next(); });
    app.use(express.static(resolve(project, 'dist')));
    app.get('*', (req, res) => res.sendFile(resolve(project, 'dist/index.html')));
  }
  app.use((error, req, res, next) => {
    const status = error.status ?? (error.type === 'entity.too.large' ? 413 : 500);
    if (status >= 500) console.error('CMS request failed:', error.message);
    res.status(status).json({ error: status >= 500 ? 'The server could not complete this request.' : error.message });
  });
  return { app, db };
}
