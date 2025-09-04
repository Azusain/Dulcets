"use client";

import { useEffect, useState } from "react";

function detectBasePath(): string {
  // For SSR/build time, check NODE_ENV first
  if (typeof window === "undefined") {
    const isProd = process.env.NODE_ENV === "production";
    return isProd ? "" : "";
  }

  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  const isGitHubPages = hostname.includes("github.io");
  const isInDulcetsPath = pathname.startsWith("/Dulcets");

  // Use basePath if we're on GitHub Pages or already in the Dulcets path
  const needsBasePath = isGitHubPages || isInDulcetsPath;
  // TODO: basepath
  const detectedBasePath = needsBasePath ? "" : "";

  console.log("detectBasePath:", {
    hostname,
    pathname,
    isGitHubPages,
    isInDulcetsPath,
    needsBasePath,
    detectedBasePath,
  });

  return detectedBasePath;
}

export function useAssetPath() {
  // Initialize with immediate detection
  const [basePath, setBasePath] = useState(() => detectBasePath());

  useEffect(() => {
    // Re-detect on mount to ensure accuracy (only run once)
    const detected = detectBasePath();
    setBasePath(detected);
    console.log("useAssetPath: basePath set to:", detected);
  }, []); // Empty dependency array to run only once

  const getAssetPath = (path: string) => {
    // Ensure path starts with /
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const fullPath = `${basePath}${cleanPath}`;

    console.log(`getAssetPath: ${path} -> ${fullPath}`);
    return fullPath;
  };

  return { basePath, getAssetPath };
}
