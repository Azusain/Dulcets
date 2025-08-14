"use client";

import { useEffect, useState } from "react";

export function useAssetPath() {
  const [basePath, setBasePath] = useState("");

  useEffect(() => {
    // Check if we're on GitHub Pages
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    const isGitHubPages = hostname.includes('github.io');
    const isInDulcetsPath = pathname.startsWith('/Dulcets');
    
    // Use basePath if we're on GitHub Pages or already in the Dulcets path
    const needsBasePath = isGitHubPages || isInDulcetsPath;
    const detectedBasePath = needsBasePath ? '/Dulcets' : '';
    
    setBasePath(detectedBasePath);
    
    console.log('useAssetPath:', {
      hostname,
      pathname,
      isGitHubPages,
      isInDulcetsPath,
      needsBasePath,
      basePath: detectedBasePath
    });
  }, []);

  const getAssetPath = (path: string) => {
    // Ensure path starts with /
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${basePath}${cleanPath}`;
  };

  return { basePath, getAssetPath };
}
