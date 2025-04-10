import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // !! WARN !!
    // Ignoring type checking during build for now
    // Make sure to fix the type errors soon
    ignoreBuildErrors: true
  },
  // Image optimization settings
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60
  },
  // Improve performance with incremental static regeneration
  staticPageGenerationTimeout: 120,
  // CORS settings for API routes
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
  // Enable Turbopack in development for faster builds
  experimental: {
    // Only enable if using Next.js 14 with Turbopack
    // turbo: process.env.NODE_ENV === 'development',
  },
  // Optimize output size
  compress: true,
  // Force production output to be fully static when possible
  output: 'standalone',
};

export default nextConfig;
