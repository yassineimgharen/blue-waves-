/** @type {import('next').NextConfig} */
const config = {
  poweredByHeader: false,
  devIndicators: false,
  reactStrictMode: true,
  serverExternalPackages: ['@neondatabase/serverless', '@vercel/blob'],
  outputFileTracingExcludes: { '/*': ['./data/**/*', './**/*.sqlite*', './.env*', './tests/**/*'] },
  outputFileTracingIncludes: { '/api/**/*': ['./server/*.json'], '/*': ['./server/seed.json'] },
  async rewrites() { return [{ source: '/media/uploads/:id', destination: '/api/media/:id' }]; },
  async headers() {
    const headers = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'Content-Security-Policy', value: "object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'" },
    ];
    if (process.env.NODE_ENV === 'production') headers.push({ key: 'Strict-Transport-Security', value: 'max-age=31536000' });
    return [{ source: '/:path*', headers }, { source: '/media/:path*', headers: [{ key: 'Content-Security-Policy', value: "default-src 'none'; sandbox" }] }];
  },
};
export default config;
