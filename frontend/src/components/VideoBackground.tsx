"use client";

import { useEffect, useState } from "react";

export default function VideoBackground() {
  const [videoSources, setVideoSources] = useState({
    mp4: "/videos/hero-background.mp4",
    webm: "/videos/hero-background.webm"
  });

  useEffect(() => {
    // Check if we're in production (GitHub Pages) and need basePath
    const isGitHubPages = window.location.hostname === 'azusain.github.io';
    const basePath = isGitHubPages ? '/Dulcets' : '';
    
    setVideoSources({
      mp4: `${basePath}/videos/hero-background.mp4`,
      webm: `${basePath}/videos/hero-background.webm`
    });
  }, []);

  return (
    <video
      className="absolute inset-0 w-full h-full object-cover z-10"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    >
      <source src={videoSources.mp4} type="video/mp4" />
      <source src={videoSources.webm} type="video/webm" />
    </video>
  );
}
