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
      {/* Background - light section only */}
      <div className="absolute inset-0 bg-gray-50 z-0"></div>
      
      {/* Simple Corner L-shaped Design */}
      <div className="absolute top-0 left-0 w-24 h-24 overflow-hidden pointer-events-none z-30">
        {/* Top-left L-shape */}
        <div className="absolute top-0 left-0 w-20 h-3 bg-purple-400"></div>
        <div className="absolute top-0 left-0 w-3 h-20 bg-purple-400"></div>
      </div>

      <div className="absolute bottom-0 right-0 w-24 h-24 overflow-hidden pointer-events-none z-30">
        {/* Bottom-right L-shape */}
        <div className="absolute bottom-0 right-0 w-20 h-3 bg-pink-400"></div>
        <div className="absolute bottom-0 right-0 w-3 h-20 bg-pink-400"></div>
      </div>

      {/* Overlapping Title Design */}
      <div className="relative z-20 pt-20 pb-0">
        <div className="relative pl-4">
          {/* Title with overlapping design elements */}
          <div className="relative">
            {/* Background geometric shape */}
            <div className="absolute -top-4 -left-2 w-96 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 transform -rotate-1 rounded-lg"></div>
            
            {/* Accent line */}
            <div className="absolute top-1/2 -left-8 w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-400 transform -translate-y-1/2"></div>
            
            {/* Main title - positioned to overlap with music section */}
            <h1 className="relative text-6xl lg:text-7xl font-bold text-gray-800 mb-4 transform translate-y-8">
              {t('services.our_service')}
            </h1>
            
            {/* Decorative dot pattern */}
            <div className="absolute -top-2 right-4 flex gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full opacity-60"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full opacity-60"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
            </div>
          </div>
          
          <div className="w-24 h-1 bg-gray-400 mb-6 ml-0"></div>
          <p className="text-lg text-gray-600 max-w-2xl">
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

        /* Subtle background pattern for the entire container */
        .unified-services-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: linear-gradient(
              rgba(156, 163, 175, 0.03) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(156, 163, 175, 0.03) 1px,
              transparent 1px
            );
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 1;
        }
      `}</style>
    </div>
  );
}
