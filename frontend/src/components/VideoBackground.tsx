"use client";

import { useEffect, useState } from "react";
import { getAssetPath } from "../utils/assetPath";

export default function VideoBackground() {
  const [videoSources, setVideoSources] = useState({
    mp4: getAssetPath("/videos/hero-background.mp4"),
    webm: getAssetPath("/videos/hero-background.webm")
  });
  
  useEffect(() => {
    const sources = {
      mp4: getAssetPath("/videos/hero-background.mp4"),
      webm: getAssetPath("/videos/hero-background.webm")
    };
    
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
