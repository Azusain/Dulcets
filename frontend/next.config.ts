import type { NextConfig } from "next";
import fs from 'fs';
import path from 'path';

// Load deployment configuration from package.json
function loadPackageConfig() {
  try {
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageJson = require(packagePath);
    return packageJson.deployment || null;
  } catch (error) {
    console.warn('Could not load package.json deployment config, using defaults');
    return null;
  }
}

// Get deployment configuration
function getDeploymentConfig() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const packageConfig = loadPackageConfig();
  
  let baseUrl: string, basePath: string;
  
  if (isDevelopment) {
    if (packageConfig?.development) {
      baseUrl = packageConfig.development.domain;
      basePath = packageConfig.development.basePath || '';
    } else {
      baseUrl = 'http://localhost:3000';
      basePath = '';
    }
  } else {
    const customDomain = process.env.NEXT_PUBLIC_DOMAIN;
    const customBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
    
    if (customDomain) {
      baseUrl = customDomain.startsWith('http') ? customDomain : `https://${customDomain}`;
      basePath = customBasePath || '';
    } else if (packageConfig?.production) {
      baseUrl = packageConfig.production.domain;
      basePath = packageConfig.production.basePath || '';
    } else {
      baseUrl = 'https://azusain.github.io';
      basePath = '/Dulcets';
    }
  }
  
  return { baseUrl, basePath };
}

function getBasePath(): string {
  const config = getDeploymentConfig();
  return config.basePath;
}

function generateCanonicalUrl(path: string = ''): string {
  const config = getDeploymentConfig();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${config.baseUrl}${config.basePath}${cleanPath}`;
}

const nextConfig: NextConfig = {
  output: "export",
  // Use deployment-aware base path
  basePath: getBasePath(),
  // Ensure assets work correctly with base path
  assetPrefix: getBasePath(),
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes are handled correctly
  trailingSlash: true,
  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Generate SEO files during build
  webpack: (config, { buildId, dev, isServer }) => {
    // Ignore HLS .ts files (TypeScript segments) from being processed as TypeScript
    config.module.rules.push({
      test: /\/hls\/.*\.ts$/,
      type: 'asset/resource',
    });
    
    if (!dev && isServer) {
      // Create out directory if it doesn't exist
      const outDir = path.join(process.cwd(), 'out');
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }
      
      const baseUrl = generateCanonicalUrl();
      
      // Generate sitemap.xml
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/?lang=ja</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/?lang=en</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/?lang=zh</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;
      
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);
      
      // Generate robots.txt
      const robots = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml`;
      fs.writeFileSync(path.join(outDir, 'robots.txt'), robots);
      
      console.log('Generated SEO files: sitemap.xml and robots.txt');
    }
    
    return config;
  }
};

export default nextConfig;
