"use client";

import { useAssetPath } from "@/hooks/useAssetPath";
import { useEffect, useState } from "react";

export default function VideoBackground() {
  const { getAssetPath } = useAssetPath();
  const [videoSources, setVideoSources] = useState({
    mp4: "/videos/hero-background.mp4",
    webm: "/videos/hero-background.webm"
  });
  
  useEffect(() => {
    // Direct detection as backup
    const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
    const directBasePath = isGitHubPages ? '/Dulcets' : '';
    
    const sources = {
      mp4: getAssetPath("/videos/hero-background.mp4"),
      webm: getAssetPath("/videos/hero-background.webm")
    };
    
    // Double-check with direct method
    const backupSources = {
      mp4: `${directBasePath}/videos/hero-background.mp4`,
      webm: `${directBasePath}/videos/hero-background.webm`
    };
    
    console.log('VideoBackground sources comparison:');
    console.log('Hook method:', sources);
    console.log('Direct method:', backupSources);
    console.log('Using hook method');
    
    setVideoSources(sources);
  }, [getAssetPath]);

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
