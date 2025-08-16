"use client";

import React from "react";
import MusicProductionSection from "./PricingEntry";
import ArtworksSection from "./ArtworksSection";
import ModelingSectionWithLightbox from "./ModelingSection";
import DiagonalDivider from "./DiagonalDivider";

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
  const t = (key: string) =>
    translations ? getTranslation(translations, key) : key;

  return (
    <>
      {/* Poster-style Services Container */}
      <div className="w-full py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="w-[90%] mx-auto px-4">
          {/* Poster Container with clean corner triangles */}
          <div className="relative bg-gradient-to-br from-slate-50 via-white to-gray-100 shadow-2xl overflow-visible">
            
            {/* Solid Triangle - Top Left (extends beyond poster) - Discord Blue-Purple */}
            <div className="absolute -top-8 -left-8 w-80 h-80 z-20">
              <div className="w-0 h-0" style={{
                borderLeft: '320px solid #5865f2',
                borderBottom: '320px solid transparent'
              }}></div>
            </div>

            {/* Solid Triangle - Bottom Right (extends beyond poster) - Discord Blue-Purple */}
            <div className="absolute -bottom-8 -right-8 w-80 h-80 z-20">
              <div className="w-0 h-0" style={{
                borderRight: '320px solid #5865f2',
                borderTop: '320px solid transparent'
              }}></div>
            </div>

            
            {/* Content sections with diagonal edges */}
            <div className="relative z-5">
              <MusicProductionSection t={t} />
              <ArtworksSection translations={translations} />
              <ModelingSectionWithLightbox translations={translations} />
            </div>
          </div>
        </div>
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

        /* Light subtle grid pattern */
        .unified-services-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: linear-gradient(
              rgba(0, 0, 0, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
          background-size: 80px 80px, 80px 80px, 20px 20px, 20px 20px;
          background-position: 0 0, 0 0, 0 0, 0 0;
          pointer-events: none;
          z-index: 1;
        }

        /* Subtle light texture overlay */
        .unified-services-container::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
              circle at 20% 80%,
              rgba(0, 0, 0, 0.03) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 20%,
              rgba(0, 0, 0, 0.02) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 40% 40%,
              rgba(0, 0, 0, 0.04) 0%,
              transparent 50%
            );
          pointer-events: none;
          z-index: 2;
        }
      `}</style>
    </>
  );
}
