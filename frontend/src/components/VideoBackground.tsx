"use client";

import { useAssetPath } from "@/hooks/useAssetPath";

export default function VideoBackground() {
  const { getAssetPath } = useAssetPath();
  
  const videoSources = {
    mp4: getAssetPath("/videos/hero-background.mp4"),
    webm: getAssetPath("/videos/hero-background.webm")
  };

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
