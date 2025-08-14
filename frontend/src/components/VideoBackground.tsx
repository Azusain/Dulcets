"use client";

import { useEffect, useState } from "react";

export default function VideoBackground() {
  const [videoSources, setVideoSources] = useState({
    mp4: "/videos/hero-background.mp4",
    webm: "/videos/hero-background.webm"
  });
  
  useEffect(() => {
    // Direct detection - no hooks, no dependencies
    const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
    const basePath = isGitHubPages ? '/Dulcets' : '';
    
    const sources = {
      mp4: `${basePath}/videos/hero-background.mp4`,
      webm: `${basePath}/videos/hero-background.webm`
    };
    
    console.log('VideoBackground - GitHub Pages:', isGitHubPages);
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
