"use client";

import { useEffect, useState } from "react";

export default function VideoBackground() {
  const [videoSources, setVideoSources] = useState({
    mp4: "/videos/hero-background.mp4",
    webm: "/videos/hero-background.webm"
  });
  const [debugInfo, setDebugInfo] = useState<string>("");

  useEffect(() => {
    // Multiple ways to detect GitHub Pages environment
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    const isGitHubPages = hostname === 'azusain.github.io' || hostname.includes('github.io');
    const isInDulcetsPath = pathname.startsWith('/Dulcets');
    
    // Use basePath if we're on GitHub Pages or already in the Dulcets path
    const needsBasePath = isGitHubPages || isInDulcetsPath;
    const basePath = needsBasePath ? '/Dulcets' : '';
    
    const newSources = {
      mp4: `${basePath}/videos/hero-background.mp4`,
      webm: `${basePath}/videos/hero-background.webm`
    };
    
    setVideoSources(newSources);
    
    // Debug info (remove in production)
    setDebugInfo(`Hostname: ${hostname}, Path: ${pathname}, BasePath: ${basePath}, MP4: ${newSources.mp4}`);
    console.log('VideoBackground Debug:', {
      hostname,
      pathname,
      isGitHubPages,
      isInDulcetsPath,
      needsBasePath,
      basePath,
      videoSources: newSources
    });
  }, []);

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
      
      {/* Temporary debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 left-4 bg-black/80 text-white p-2 text-xs z-50 max-w-md">
          Debug: {debugInfo}
        </div>
      )}
    </>
  );
}
