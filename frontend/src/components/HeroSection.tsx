"use client";
import { useState, useEffect } from "react";
import { HomePageInterface } from "@/components/MainPage";

export default function HeroSection({ t }: HomePageInterface) {
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState<Array<{left: string, top: string, delay: string, duration: string}>>([]);

  useEffect(() => {
    setIsClient(true);
    // Generate particles only on client side to avoid hydration mismatch
    const generatedParticles = Array.from({ length: 50 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${2 + Math.random() * 3}s`
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Animated Background - CSS-based fallback */}
      <div className="absolute inset-0 z-0">
        {/* Try to load video, fallback to animated background */}
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          onError={(e) => {
            // Hide video on error and show CSS background
            e.currentTarget.style.display = 'none';
          }}
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
          <source src="/videos/hero-background.webm" type="video/webm" />
        </video>
        {/* Animated CSS Background Fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
          {/* Animated particles/stars effect */}
          <div className="absolute inset-0 opacity-30">
            {isClient && particles.map((particle, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: particle.left,
                  top: particle.top,
                  animationDelay: particle.delay,
                  animationDuration: particle.duration
                }}
              />
            ))}
          </div>
          {/* Moving gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse" 
               style={{animation: 'float 8s ease-in-out infinite'}} />
        </div>
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black z-10"></div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center relative z-20 text-center">
        <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-bold font-orbitron text-white leading-tight mb-6 animate-float">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">Dulcets</span>
        </h1>
        <p className="text-[clamp(1rem,3vw,1.5rem)] text-gray-200 max-w-3xl mb-10 animate-fade-in">
          {t("hero.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="#artists" 
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium hover:opacity-90 transform hover:scale-105 transition-all duration-300"
          >
            {t("hero.explore_artists")}
          </a>
          <a 
            href="#releases" 
            className="px-8 py-3 bg-transparent border-2 border-white/50 rounded-full text-white font-medium hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
          >
            {t("hero.latest_releases")}
          </a>
        </div>
      </div>
      
      {/* Character Navigation */}
      <div id="character-nav" className="absolute bottom-10 left-0 right-0 flex justify-center gap-8 md:gap-16 z-20">
        <div className="character-icon cursor-pointer transform transition-all duration-300 hover:scale-110" data-target="#artists">
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden border-2 border-white/30">
            {isClient && <img src="https://www.dmoe.cc/random.php" alt="艺术家" className="w-full h-full object-cover" />}
          </div>
        </div>
        <div className="character-icon cursor-pointer transform transition-all duration-300 hover:scale-110" data-target="#releases">
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center overflow-hidden border-2 border-white/30">
            {isClient && <img src="https://www.dmoe.cc/random.php" alt="音乐发布" className="w-full h-full object-cover" />}
          </div>
        </div>
        <div className="character-icon cursor-pointer transform transition-all duration-300 hover:scale-110" data-target="#events">
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center overflow-hidden border-2 border-white/30">
            {isClient && <img src="https://www.dmoe.cc/random.php" alt="活动" className="w-full h-full object-cover" />}
          </div>
        </div>
      </div>
    </section>
  );
}
