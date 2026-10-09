import 'dotenv/config';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';

async function availablePort(preferred, host, excluded = new Set()) {
  for (let port = preferred; port < Math.min(preferred + 100, 65536); port++) {
    if (excluded.has(port)) continue;
    const available = await new Promise((resolve, reject) => {
      const probe = createServer();
      probe.once('error', error => error.code === 'EADDRINUSE' ? resolve(false) : reject(error));
      probe.listen(port, host, () => probe.close(() => resolve(true)));
    });
    if (available) return port;
  }
  throw new Error('No available development port. Stop an unused preview and try again.');
}

const args = process.argv.slice(2);
function option(name, fallback) {
  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1] && !args[index + 1].startsWith('--')) return args[index + 1];
  return args.find(arg => arg.startsWith(`${name}=`))?.slice(name.length + 1) || fallback;
}
const preferredPort = Number(option('--port', '3000'));
if (!Number.isInteger(preferredPort) || preferredPort < 1 || preferredPort > 65535) throw new Error('Choose a valid development port.');
const host = option('--host', '127.0.0.1');
const port = await availablePort(preferredPort, host);
const origin = new URL(process.env.APP_ORIGIN || 'http://127.0.0.1:3000');
origin.port = String(port);
const env = { ...process.env, NODE_ENV: 'development', APP_ORIGIN: origin.origin };
if (port !== preferredPort) console.log(`Port ${preferredPort} is in use; using ${port}. Existing processes are left running.`);
console.log(`Owner dashboard: ${origin.origin}/admin`);
const children = [spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', '--webpack', '--port', String(port), '--hostname', host], { env, stdio: 'inherit' })];
let closing = false;
function close(code = 0) { if (closing) return; closing = true; for (const child of children) child.kill('SIGTERM'); process.exitCode = code; }
for (const child of children) { child.on('error', error => { console.error(error.message); close(1); }); child.on('exit', code => close(code ?? 0)); }
for (const signal of ['SIGINT','SIGTERM']) process.on(signal, () => close());
