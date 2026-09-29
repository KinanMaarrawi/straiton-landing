import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // ~16KB of CSS for a single landing page mostly seen by first-time
    // visitors: inlining removes three render-blocking requests (mobile LCP).
    inlineCss: true,
  },
};

export default nextConfig;
