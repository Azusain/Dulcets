"use client";

import { useEffect, useState } from "react";

export default function VideoBackground() {
  const [videoSources, setVideoSources] = useState({
    mp4: "/videos/hero-background.mp4",
    webm: "/videos/hero-background.webm"
  });
  
  useEffect(() => {
    // Multiple detection methods for GitHub Pages
    const isGitHubPages = typeof window !== 'undefined' && (
      window.location.hostname.includes('github.io') ||
      window.location.pathname.startsWith('/Dulcets/')
    );
    
    // Also check if we're in production and not localhost
    const isProduction = typeof window !== 'undefined' && 
      !window.location.hostname.includes('localhost') && 
      !window.location.hostname.includes('127.0.0.1');
    
    // Use basePath if we're on GitHub Pages or in production (excluding local dev)
    const shouldUseBasePath = isGitHubPages || isProduction;
    const basePath = shouldUseBasePath ? '/Dulcets' : '';
    
    const sources = {
      mp4: `${basePath}/videos/hero-background.mp4`,
      webm: `${basePath}/videos/hero-background.webm`
    };
    
    console.log('VideoBackground - Hostname:', window.location?.hostname);
    console.log('VideoBackground - Pathname:', window.location?.pathname);
    console.log('VideoBackground - GitHub Pages:', isGitHubPages);
    console.log('VideoBackground - Production:', isProduction);
    console.log('VideoBackground - Should use base path:', shouldUseBasePath);
    console.log('VideoBackground - Base path:', basePath);
    console.log('VideoBackground - Final sources:', sources);
    
    setVideoSources(sources);
  }, []); // Only run once on mount

  return (
    <>
      <video
        className="absolute inset-0 w-full h-full object-cover z-10"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onError={(e) => {
          console.error('Video failed to load:', e);
          console.error('Video sources:', videoSources);
        }}
        onLoadStart={() => {
          console.log('Video loading started:', videoSources);
        }}
        onLoadedData={() => {
          console.log('Video loaded successfully!');
        }}
      >
        <source src={videoSources.mp4} type="video/mp4" />
        <source src={videoSources.webm} type="video/webm" />
      </video>
      
      {/* Debug info will be in console */}
    </>
  );
}
