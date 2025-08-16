"use client";

import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "../styles/lightbox.css";
import { getAssetPath } from "../utils/assetPath";
import modelsJson from "../../public/service/3d_modeling.json";
import { PolaroidPosition } from "./ArtworksSection";

interface ModelingSectionProps {
  translations?: Record<string, any>;
}

interface Model {
  id: number;
  title: string;
  image: string;
  pos: PolaroidPosition;
}

// Generate models with proper paths
const models: Model[] = modelsJson.map((item) => ({
  ...item,
  image: getAssetPath("/images/modeling/" + item.imagePath),
}));

// Helper function to get translation value from translations object
function getTranslation(
  translations: Record<string, any> | undefined,
  key: string
): string {
  if (!translations) return key;

  const keys = key.split(".");
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

export default function ModelingSectionWithLightbox({
  translations,
}: ModelingSectionProps = {}) {
  const t = (key: string) => getTranslation(translations, key);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Determine language for shadow positioning
  const getCurrentLanguage = () => {
    if (!translations) return "zh";

    // Check translation content directly
    const titleMain = getTranslation(translations, "modeling.title_main");
    const homeText = getTranslation(translations, "nav.home");

    // Japanese: 3Dモデリング
    if (titleMain === "3Dモデリング" || homeText === "ホーム") {
      return "jp";
    }
    // English would contain "3D Modeling" or similar
    if (
      (titleMain && titleMain.toLowerCase().includes("modeling")) ||
      homeText === "Home"
    ) {
      return "en";
    }
    // Default to Chinese
    return "zh";
  };

  const currentLang = getCurrentLanguage();

  // Dynamic shadow offset based on language - use NO shadow for Japanese
  const getShadowOffset = () => {
    switch (currentLang) {
      case "jp": // Japanese text is longer, hide shadow completely
        return "opacity-0";
      case "en": // English text is medium length, increase offset for better visibility
        return "translate-x-4 translate-y-4 opacity-30";
      default: // Chinese is short
        return "translate-x-3 translate-y-3 opacity-30";
    }
  };

  const lightboxImages = models.map((model) => ({
    src: model.image,
    alt: model.title,
  }));

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="modeling-section">
      <div className="container max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 py-20">
          {/* Left Side - Photo Wall (shifted left, 5 columns) */}
          <div className="lg:col-span-5 relative lg:-ml-8">
            <div className="scattered-photos relative w-full h-[800px]">
              {models.slice(0, 7).map((model, index) => {
                const pos = model.pos;

                return (
                  <div
                    key={model.id}
                    className="polaroid-photo-large"
                    style={{
                      position: "absolute",
                      left: pos.left,
                      top: pos.top,
                      transform: `rotate(${pos.rotation}deg) scale(${pos.scale})`,
                      animationDelay: `${index * 0.15}s`,
                    }}
                    onClick={() => openLightbox(index)}
                  >
                    <div className="polaroid-frame-large">
                      <img src={model.image} alt={model.title} />
                    </div>
                  </div>
                );
              })}

              {/* Decorative elements */}
              <div className="absolute top-12 right-8 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <div
                className="absolute bottom-24 left-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.7s" }}
              ></div>
              <div
                className="absolute top-1/3 right-12 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse"
                style={{ animationDelay: "1.2s" }}
              ></div>

              {/* Tech grid overlay */}
              <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none"></div>
            </div>
          </div>

          {/* Right Side - Title and Description (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8 lg:pl-8">
            <div>
              <div className="inline-block mb-4">
                <span className="text-sm font-medium uppercase tracking-wider text-cyan-600 bg-cyan-50 px-4 py-2 rounded-full">
                  {t("footer.modeling")}
                </span>
              </div>

              <h2 className="text-7xl lg:text-8xl font-black leading-tight text-white mb-6">
                <span className="relative whitespace-nowrap">
                  {t("modeling.title_main")}
                  <span
                    className={`absolute inset-0 text-cyan-400 -z-10 ${getShadowOffset()}`}
                  >
                    {t("modeling.title_main")}
                  </span>
                </span>
                <br />
                <span className="text-6xl lg:text-7xl text-gray-300 whitespace-nowrap">
                  {t("modeling.title_sub")}
                </span>
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-gray-300">
              <p>
                {t("modeling.description")}
              </p>

              <p>
                {t("modeling.expertise_description")}
                <span className="text-cyan-400 font-medium">
                  {t("modeling.specialties")}
                </span>
                {t("modeling.applications_description")}
              </p>

              <p>
                {t("modeling.technology_description")}
                <span className="text-purple-400 font-medium">
                  {t("modeling.lifelike_world")}
                </span>
                。
              </p>
            </div>

            <div className="flex items-center space-x-4 pt-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
              <span className="text-sm text-gray-400 font-medium">
                {t("modeling.click_to_view")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxImages}
          index={currentImageIndex}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
          }}
        />
      )}

      <style jsx>{`
        .modeling-section {
          background: linear-gradient(
            135deg,
            #0f172a 0%,
            #1e293b 50%,
            #0f172a 100%
          );
          position: relative;
          overflow: hidden;
          padding: 80px 0;
        }

        .modeling-section::before {
          content: "";
          position: absolute;
          top: 15%;
          left: -5%;
          width: 250px;
          height: 250px;
          background: radial-gradient(
            circle,
            rgba(6, 182, 212, 0.08) 0%,
            transparent 70%
          );
          border-radius: 50%;
          filter: blur(45px);
        }

        .modeling-section::after {
          content: "";
          position: absolute;
          bottom: 15%;
          right: -5%;
          width: 180px;
          height: 180px;
          background: radial-gradient(
            circle,
            rgba(168, 85, 247, 0.08) 0%,
            transparent 70%
          );
          border-radius: 50%;
          filter: blur(35px);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }

        .section-title {
          font-size: 4rem;
          font-weight: 900;
          text-align: center;
          margin-bottom: 30px;
          color: #000000;
          text-shadow: 8px 8px 0px #06b6d4, 16px 16px 0px #a855f7;
          letter-spacing: 2px;
        }

        .polaroid-container {
          display: flex;
          justify-content: center;
          width: 100%;
          overflow-x: auto;
          padding: 20px 0;
        }

        .polaroid-scroll {
          display: flex;
          gap: 30px;
          padding: 0 20px;
          align-items: center;
          min-width: max-content;
        }

        .polaroid-container::-webkit-scrollbar {
          height: 8px;
        }

        .polaroid-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .polaroid-container::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.6);
          border-radius: 4px;
        }

        .polaroid-container::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.8);
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2.5rem;
            text-shadow: 4px 4px 0px #06b6d4, 8px 8px 0px #a855f7;
          }

          .modeling-section {
            min-height: 35vh;
            padding: 30px 0;
          }
        }
      `}</style>
    </section>
  );
}
