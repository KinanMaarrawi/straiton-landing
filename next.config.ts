import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Baseline security headers. There's no backend or third-party content,
  // so these simply close doors the page never uses.
  headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
        ],
      },
    ];
  },
  experimental: {
    // ~16KB of CSS for a single landing page mostly seen by first-time
    // visitors: inlining removes three render-blocking requests (mobile LCP).
    inlineCss: true,
  },
};

export default nextConfig;
