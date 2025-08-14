import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Set base path for GitHub Pages (repository name)
  basePath: '/Dulcets',
  // Ensure assets work correctly
  assetPrefix: '/Dulcets',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes are handled correctly
  trailingSlash: true,
};

export default nextConfig;
