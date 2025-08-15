"use client";

import React from "react";
import MusicProductionSection from "./PricingEntry";
import ArtworksSection from "./ArtworksSectionWithLightbox";
import ModelingSectionWithLightbox from "./ModelingSectionWithLightbox";

interface UnifiedServicesSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translations?: Record<string, any>;
}

export default function UnifiedServicesSection({
  translations,
}: UnifiedServicesSectionProps) {
  return (
    <div className="unified-services-container relative bg-gray-50">
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

      {/* Our Service Title */}
      <div className="relative z-20 pt-20 pb-8">
        <div className="pl-8">
          <h1 className="text-6xl lg:text-7xl font-bold text-gray-800 mb-4">
            Our Service
          </h1>
          <div className="w-24 h-1 bg-gray-400 mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl">
            {translations
              ? translations.services?.subtitle ||
                "私たちが提供する3つの主要サービス：音楽制作、アートワーク、3Dモデリング"
              : "私たちが提供する3つの主要サービス：音楽制作、アートワーク、3Dモデリング"}
          </p>
        </div>
      </div>

      {/* Service Sections */}
      <div className="relative z-10">
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
