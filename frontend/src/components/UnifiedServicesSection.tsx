"use client";

import React from "react";
import MusicProductionSection from "./PricingEntry";
import ArtworksSection from "./ArtworksSection";
import ModelingSectionWithLightbox from "./ModelingSection";

interface UnifiedServicesSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translations?: Record<string, any>;
}

// Helper function to get translation value from translations object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getTranslation(
  translations: Record<string, any>,
  key: string
): string {
  const keys = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations;

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      return key; // Return the key if path doesn't exist
    }
  }

  return typeof value === "string" ? value : key;
}

export default function UnifiedServicesSection({
  translations,
}: UnifiedServicesSectionProps) {
  // Create a local t function for this component
  const t = (key: string) => translations ? getTranslation(translations, key) : key;

  return (
    <div className="unified-services-container relative">
      {/* DC-style dark background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 z-0"></div>
      
      {/* Dark geometric overlays for depth */}
      <div className="absolute inset-0 z-1">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-black/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-slate-700/10 rounded-full blur-2xl"></div>
      </div>
      
      {/* Sharp DC-style corner designs */}
      <div className="absolute top-0 left-0 w-32 h-32 overflow-hidden pointer-events-none z-30">
        {/* Top-left sharp corner */}
        <div className="absolute top-0 left-0 w-24 h-2 bg-white shadow-lg shadow-white/20"></div>
        <div className="absolute top-0 left-0 w-2 h-24 bg-white shadow-lg shadow-white/20"></div>
        <div className="absolute top-6 left-6 w-16 h-1 bg-gray-400"></div>
        <div className="absolute top-6 left-6 w-1 h-16 bg-gray-400"></div>
      </div>

      <div className="absolute bottom-0 right-0 w-32 h-32 overflow-hidden pointer-events-none z-30">
        {/* Bottom-right sharp corner */}
        <div className="absolute bottom-0 right-0 w-24 h-2 bg-gray-300 shadow-lg shadow-gray-300/20"></div>
        <div className="absolute bottom-0 right-0 w-2 h-24 bg-gray-300 shadow-lg shadow-gray-300/20"></div>
        <div className="absolute bottom-6 right-6 w-16 h-1 bg-gray-500"></div>
        <div className="absolute bottom-6 right-6 w-1 h-16 bg-gray-500"></div>
      </div>

      {/* DC-style prominent title design */}
      <div className="relative z-20 pt-20 pb-0">
        <div className="relative pl-8">
          {/* Title with DC comic book style */}
          <div className="relative">
            {/* Dark background plate for title */}
            <div className="absolute -top-8 -left-4 w-full max-w-2xl h-40 bg-black/40 transform -skew-x-1 border border-gray-600/30"></div>
            
            {/* Sharp accent lines */}
            <div className="absolute top-1/2 -left-12 w-20 h-1 bg-white transform -translate-y-1/2 shadow-lg shadow-white/30"></div>
            <div className="absolute top-1/2 -left-12 w-16 h-0.5 bg-gray-300 transform -translate-y-1/2 translate-y-2"></div>
            
            {/* Main title - bold and prominent */}
            <h1 className="relative text-6xl lg:text-8xl font-black text-white mb-4 transform translate-y-8 tracking-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-2xl">
                {t('services.our_service')}
              </span>
            </h1>
            
            {/* DC-style geometric accents */}
            <div className="absolute -top-4 right-8 flex gap-3">
              <div className="w-3 h-3 bg-white rotate-45 shadow-lg shadow-white/20"></div>
              <div className="w-2 h-2 bg-gray-300 rotate-45"></div>
              <div className="w-1 h-1 bg-gray-400 rotate-45"></div>
            </div>
            
            {/* Additional sharp design elements */}
            <div className="absolute top-0 right-0 w-24 h-1 bg-gradient-to-r from-transparent to-white/20"></div>
          </div>
          
          <div className="w-32 h-0.5 bg-white mb-6 ml-0 shadow-sm shadow-white/20"></div>
          <p className="text-xl text-gray-300 max-w-3xl font-medium tracking-wide">
            {t('services.subtitle')}
          </p>
        </div>
      </div>

      {/* Service Sections */}
      <div className="relative z-10 -mt-16">
        {/* Music Production Service */}
        <MusicProductionSection />

        {/* Artworks Section */}
        <ArtworksSection translations={translations} />

        {/* 3D Modeling Section */}
        <ModelingSectionWithLightbox translations={translations} />
      </div>

      <style jsx>{`
        .unified-services-container {
          position: relative;
          min-height: 100vh;
        }

        .japanese-spacing {
          letter-spacing: 0.2em;
          font-family: "Noto Sans JP", sans-serif;
        }

        /* DC-style dark grid pattern */
        .unified-services-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(75, 85, 99, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(75, 85, 99, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 80px 80px, 80px 80px, 20px 20px, 20px 20px;
          background-position: 0 0, 0 0, 0 0, 0 0;
          pointer-events: none;
          z-index: 1;
        }
        
        /* Additional DC-style texture overlay */
        .unified-services-container::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 80%, rgba(0, 0, 0, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(75, 85, 99, 0.2) 0%, transparent 50%),
                      radial-gradient(circle at 40% 40%, rgba(15, 23, 42, 0.4) 0%, transparent 50%);
          pointer-events: none;
          z-index: 2;
        }
      `}</style>
    </div>
  );
}
