// Environment configuration for deployment
export interface DeploymentConfig {
  baseUrl: string;
  basePath: string;
  isDevelopment: boolean;
  isGitHubPages: boolean;
}

// Deployment configuration - this will be replaced at build time
// Default configuration for client-side fallback
const DEFAULT_CONFIG = {
  "production": {
    "domain": "https://www.dulcets.co.jp",
    "basePath": ""
  },
  "github": {
    "domain": "https://azusain.github.io",
    "basePath": "/Dulcets"
  },
  "development": {
    "domain": "http://localhost:3000",
    "basePath": ""
  }
};

// Get deployment configuration based on environment
export function getDeploymentConfig(): DeploymentConfig {
  // Check if we're in development
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Check if we're on GitHub Pages (only works in browser)
  const isGitHubPages = typeof window !== 'undefined' && 
    window.location.hostname.includes('github.io');

  let baseUrl: string;
  let basePath: string;

  if (isDevelopment) {
    // Use development config
    baseUrl = DEFAULT_CONFIG.development.domain;
    basePath = DEFAULT_CONFIG.development.basePath || '';
  } else {
    // Production configuration - prioritize env vars, then defaults
    const customDomain = process.env.NEXT_PUBLIC_DOMAIN;
    const customBasePath = process.env.NEXT_PUBLIC_BASE_PATH;

    if (customDomain) {
      // Use environment variables if specified
      baseUrl = customDomain.startsWith('http') ? customDomain : `https://${customDomain}`;
      basePath = customBasePath || '';
    } else {
      // Use default production config
      baseUrl = DEFAULT_CONFIG.production.domain;
      basePath = DEFAULT_CONFIG.production.basePath || '';
    }
  }

  return {
    baseUrl,
    basePath,
    isDevelopment,
    isGitHubPages
  };
}

// Generate canonical URL with environment awareness
export function generateCanonicalUrl(path: string = ""): string {
  const config = getDeploymentConfig();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${config.baseUrl}${config.basePath}${cleanPath}`;
}

// Generate hreflang URLs with environment awareness
export function generateHreflangUrls(path: string = ""): { [key: string]: string } {
  const config = getDeploymentConfig();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const baseUrl = `${config.baseUrl}${config.basePath}${cleanPath}`;
  
  return {
    "ja": `${baseUrl}?lang=ja`,
    "en": `${baseUrl}?lang=en`, 
    "zh": `${baseUrl}?lang=zh`,
    "x-default": baseUrl
  };
}

// Get asset URL with environment awareness
export function getAssetUrl(assetPath: string): string {
  const config = getDeploymentConfig();
  const cleanPath = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
  return `${config.baseUrl}${config.basePath}${cleanPath}`;
}

// Get base path for Next.js configuration
export function getBasePath(): string {
  const config = getDeploymentConfig();
  return config.basePath;
}
