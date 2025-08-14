// Utility function to handle asset paths with basePath for GitHub Pages
export function getAssetPath(path: string): string {
  // Only add basePath in production (GitHub Pages)
  const isProd = process.env.NODE_ENV === 'production';
  const basePath = isProd ? '/Dulcets' : '';
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${basePath}${normalizedPath}`;
}
