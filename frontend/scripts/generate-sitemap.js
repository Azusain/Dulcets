const fs = require('fs');
const path = require('path');

// Load deployment configuration from package.json
function loadPackageConfig() {
  try {
    const packagePath = path.join(__dirname, '..', 'package.json');
    const packageJson = require(packagePath);
    return packageJson.deployment || null;
  } catch (error) {
    console.warn('Could not load package.json deployment config, using defaults');
    return null;
  }
}

// Simple deployment configuration for build scripts
function getDeploymentConfig() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const packageConfig = loadPackageConfig();
  
  let baseUrl, basePath;
  
  if (isDevelopment) {
    // Use development config from package.json or defaults
    if (packageConfig?.development) {
      baseUrl = packageConfig.development.domain;
      basePath = packageConfig.development.basePath || '';
    } else {
      baseUrl = 'http://localhost:3000';
      basePath = '';
    }
  } else {
    // Production configuration - prioritize env vars, then package.json, then defaults
    const customDomain = process.env.NEXT_PUBLIC_DOMAIN;
    const customBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
    
    if (customDomain) {
      // Use environment variables if specified
      baseUrl = customDomain.startsWith('http') ? customDomain : `https://${customDomain}`;
      basePath = customBasePath || '';
    } else if (packageConfig?.production) {
      // Use production config from package.json
      baseUrl = packageConfig.production.domain;
      basePath = packageConfig.production.basePath || '';
    } else {
      // Default fallback (GitHub Pages)
      baseUrl = 'https://azusain.github.io';
      basePath = '/Dulcets';
    }
  }
  
  return { baseUrl, basePath };
}

function generateCanonicalUrl(path = '') {
  const config = getDeploymentConfig();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${config.baseUrl}${config.basePath}${cleanPath}`;
}

// Site configuration
const siteUrl = generateCanonicalUrl().replace(/\/$/, ''); // Remove trailing slash
const currentDate = new Date().toISOString().split('T')[0];

// Static pages configuration
const staticPages = [
  {
    url: '',
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: currentDate
  },
  {
    url: '/about',
    changefreq: 'monthly', 
    priority: '0.8',
    lastmod: currentDate
  },
  {
    url: '/services',
    changefreq: 'monthly',
    priority: '0.8', 
    lastmod: currentDate
  },
  {
    url: '/works',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: currentDate
  },
  {
    url: '/contact',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: currentDate
  }
];

// Generate sitemap URLs with language variants
function generateSitemapUrls() {
  const urls = [];
  const languages = ['ja', 'en', 'zh'];
  
  staticPages.forEach(page => {
    // Add default URL (Japanese)
    urls.push({
      loc: `${siteUrl}${page.url}`,
      lastmod: page.lastmod,
      changefreq: page.changefreq,
      priority: page.priority,
      alternates: languages.map(lang => ({
        hreflang: lang,
        href: `${siteUrl}${page.url}?lang=${lang}`
      })).concat([{
        hreflang: 'x-default',
        href: `${siteUrl}${page.url}`
      }])
    });
    
    // Add language-specific URLs
    languages.forEach(lang => {
      if (lang !== 'ja') { // Japanese is the default
        urls.push({
          loc: `${siteUrl}${page.url}?lang=${lang}`,
          lastmod: page.lastmod,
          changefreq: page.changefreq,
          priority: (parseFloat(page.priority) * 0.9).toFixed(1),
          alternates: languages.map(l => ({
            hreflang: l,
            href: `${siteUrl}${page.url}?lang=${l}`
          })).concat([{
            hreflang: 'x-default',
            href: `${siteUrl}${page.url}`
          }])
        });
      }
    });
  });
  
  return urls;
}

// Generate XML sitemap
function generateSitemap() {
  const urls = generateSitemapUrls();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  urls.forEach(url => {
    sitemap += `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
`;
    
    // Add hreflang alternates
    url.alternates.forEach(alternate => {
      sitemap += `    <xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}" />
`;
    });
    
    sitemap += `  </url>
`;
  });

  sitemap += `</urlset>`;
  
  return sitemap;
}

// Generate robots.txt
function generateRobotsTxt() {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow common non-content files
Disallow: /api/
Disallow: /_next/
Disallow: /static/
Disallow: /.well-known/

# Allow specific important files
Allow: /images/
Allow: /fonts/
Allow: /audio/
Allow: /locales/
`;
}

// Main execution
function main() {
  try {
    // Ensure public directory exists
    const publicDir = path.join(__dirname, '..', 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Generate and write sitemap.xml
    const sitemap = generateSitemap();
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
    console.log(`✅ Sitemap generated: ${sitemapPath}`);

    // Generate and write robots.txt
    const robotsTxt = generateRobotsTxt();
    const robotsPath = path.join(publicDir, 'robots.txt');
    fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
    console.log(`✅ Robots.txt generated: ${robotsPath}`);

    console.log('\n🎉 SEO files generated successfully!');
    console.log(`📊 Generated ${generateSitemapUrls().length} sitemap URLs`);
    
  } catch (error) {
    console.error('❌ Error generating SEO files:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { generateSitemap, generateRobotsTxt, generateSitemapUrls };
