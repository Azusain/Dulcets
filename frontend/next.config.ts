import type { NextConfig } from "next";

// Only use basePath for production builds (GitHub Pages)
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: "export",
  // Set base path for GitHub Pages only in production
  basePath: isProd ? '/Dulcets' : '',
  // Ensure assets work correctly in production
  assetPrefix: isProd ? '/Dulcets' : '',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes are handled correctly
  trailingSlash: true,
};

export default nextConfig;
