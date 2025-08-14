"use client";

import { getAssetPath } from "../utils/assetPath";

export default function VideoBackground() {
  // Get video source - only MP4 since webm doesn't exist
  const videoSrc = getAssetPath("/videos/hero-background.mp4");
  
  console.log('VideoBackground - Source:', videoSrc);

  return (
    <>
      <video
        className="absolute inset-0 w-full h-full object-cover z-10"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={(e) => {
          console.error('Video failed to load:', e.currentTarget.error);
        }}
        onCanPlay={() => {
          console.log('Video can play');
        }}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Debug info will be in console */}
    </>
  );
}
