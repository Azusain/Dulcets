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
      {/* Clean dark background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800"></div>
      
      {/* Simple title section */}
      <div className="relative z-20 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
              {t('services.our_service')}
            </h1>
            <div className="w-20 h-1 bg-white/30 mx-auto mb-6"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>
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
