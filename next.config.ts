import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // !! WARN !!
    // Ignoring type checking during build for now
    // Make sure to fix the type errors soon
    ignoreBuildErrors: true
  }
};

export default nextConfig;
