import 'dotenv/config';
import { resolve } from 'node:path';
import { createApp } from './app.mjs';
const production = process.env.NODE_ENV === 'production';
if (production && !process.env.APP_ORIGIN) throw new Error('Set APP_ORIGIN to the HTTPS public website origin.');
const { app, db } = createApp({ dataDir: resolve(process.env.DATA_DIR || 'data'), origin: process.env.APP_ORIGIN || 'http://127.0.0.1:3000', production });
const server = app.listen(Number(process.env.API_PORT || (production ? 3000 : 3002)), process.env.API_HOST || '127.0.0.1', () => console.log('Blue Wave Lodge server is ready.'));
for (const signal of ['SIGINT','SIGTERM']) process.on(signal, () => server.close(() => { db.close(); process.exit(0); }));
