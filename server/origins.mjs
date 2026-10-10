// Only configuration supplied by the operator/platform can extend this list.
// Never derive trusted origins from request Host or forwarded headers.
export function trustedOrigins({ origin, production = false, env = process.env } = {}) {
  const origins = new Set();
  if (origin) {
    const url = new URL(origin);
    if (!['http:', 'https:'].includes(url.protocol) || (production && url.protocol !== 'https:')) {
      throw new Error('Production APP_ORIGIN must use HTTPS.');
    }
    origins.add(url.origin);
  }
  if (env.VERCEL === '1') {
    for (const key of ['VERCEL_URL', 'VERCEL_PROJECT_PRODUCTION_URL', 'VERCEL_BRANCH_URL']) {
      const host = env[key];
      if (!host) continue;
      const url = new URL(`https://${host}`);
      if (url.host !== host || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
        throw new Error(`Invalid ${key} hostname.`);
      }
      origins.add(url.origin);
    }
  }
  if (!origins.size) {
    if (production) throw new Error('Production APP_ORIGIN must use HTTPS.');
    origins.add('http://127.0.0.1:3000');
  }
  return origins;
}
