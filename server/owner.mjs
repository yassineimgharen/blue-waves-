import 'dotenv/config';
import { createInterface } from 'node:readline/promises';
import { Writable } from 'node:stream';
import { hashPassword } from './store.mjs';
import { connectStore, recordAudit } from './database.mjs';
// Console-only provisioning and recovery. There is no public signup or default password.
let muted = false;
const output = new Writable({ write(chunk, encoding, done) { if (!muted) process.stdout.write(chunk, encoding); done(); } });
const rl = createInterface({ input: process.stdin, output, terminal: !!process.stdin.isTTY });
try {
  const fromEnvironment = process.argv.includes('--from-env');
  if (fromEnvironment && (!process.env.OWNER_EMAIL || !process.env.OWNER_PASSWORD)) throw new Error('Set OWNER_EMAIL and OWNER_PASSWORD in .env before using --from-env.');
  const email = (fromEnvironment ? process.env.OWNER_EMAIL : await rl.question('Owner email: ')).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) throw new Error('Enter a valid email.');
  let hash = fromEnvironment ? await hashPassword(process.env.OWNER_PASSWORD) : undefined;
  while (!hash) {
    process.stdout.write('Password (14–256 characters, hidden): '); muted = true;
    const password = await rl.question(''); muted = false; process.stdout.write('\n');
    if (password.length < 14 || password.length > 256) {
      console.error('Password must contain 14–256 characters. Try again; nothing is saved yet.');
      continue;
    }
    process.stdout.write('Confirm password (hidden): '); muted = true;
    const confirmation = await rl.question(''); muted = false; process.stdout.write('\n');
    if (password !== confirmation) { console.error('Passwords do not match. Please try again.'); continue; }
    hash = await hashPassword(password);
  }
  const db = await connectStore();
  await db.prepare('INSERT INTO owners VALUES (?,?) ON CONFLICT(email) DO UPDATE SET password=excluded.password').run(email, hash);
  await db.prepare('DELETE FROM sessions WHERE email=?').run(email);
  await recordAudit(db, email, 'owner credential set from server console'); db.close();
  console.log('Owner account is ready. Sign in at /admin.');
} catch (error) { console.error(error.message); process.exitCode = 1; } finally { muted = false; rl.close(); }
