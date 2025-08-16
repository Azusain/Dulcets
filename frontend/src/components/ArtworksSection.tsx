"use client";

import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "../styles/lightbox.css";
import { getAssetPath } from "../utils/assetPath";
import artworksJson from "../../public/service/artworks.json";
interface ArtworksSectionProps {
  translations?: Record<string, any>;
}

export interface PolaroidPosition {
  left: string;
  top: string;
  rotation: number;
  scale: number;
  zindex: number;
}

interface Artwork {
  id: number;
  title: string;
  image: string;
  pos: PolaroidPosition;
}

const artworks: Artwork[] = artworksJson.map((item) => ({
  ...item,
  // Generate proper asset path for artwork image
  image: getAssetPath("/images/artworks/" + item.imagePath),
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

export default function ArtworksSection({
  translations,
}: ArtworksSectionProps = {}) {
  const t = (key: string) => getTranslation(translations, key);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Determine language for shadow positioning
  const getCurrentLanguage = () => {
    if (!translations) return "zh";

    // Check translation content directly
    const titleMain = getTranslation(translations, "artworks.title_main");
    const homeText = getTranslation(translations, "nav.home");

    // Japanese: アートワーク
    if (titleMain === "アートワーク" || homeText === "ホーム") {
      return "jp";
    }
    // English would contain "Artwork" or similar
    if (
      (titleMain && titleMain.toLowerCase().includes("artwork")) ||
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

  const lightboxImages = artworks.map((artwork) => ({
    src: artwork.image,
    alt: artwork.title,
  }));

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="artworks-section">
      <div className="container max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-20">
          {/* Left Side - Title and Description */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <div className="inline-block mb-4">
                <span className="text-sm font-medium uppercase tracking-wider text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                  {t("footer.artworks")}
                </span>
              </div>

              <h2 className="text-7xl lg:text-8xl font-black leading-tight text-black mb-6">
                <span className="relative whitespace-nowrap">
                  {t("artworks.title_main")}
                  <span
                    className={`absolute inset-0 text-blue-400 -z-10 ${getShadowOffset()}`}
                  >
                    {t("artworks.title_main")}
                  </span>
                </span>
                <br />
                <span className="text-6xl lg:text-7xl text-gray-600 whitespace-nowrap">
                  {t("artworks.title_sub")}
                </span>
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-gray-700">
              <p>{t("artworks.description")}</p>

              <p>
                {translations
                  ? t("artworks.team_description")
                  : "我们专业的绘画团队致力于"}
                <span className="text-blue-600 font-medium">
                  {translations
                    ? t("artworks.specialties")
                    : "角色设计、场景插画和数字艺术创作"}
                </span>
                {translations
                  ? t("artworks.story_description")
                  : "，每一幅作品都蕴含着丰富的情感和故事。"}
              </p>

              <p>
                {translations
                  ? t("artworks.detail_description")
                  : "从概念草图到最终渲染，我们用心雕琢每一个细节，为您带来"}
                <span className="text-purple-600 font-medium">
                  {translations ? t("artworks.visual_feast") : "视觉盛宴"}
                </span>
                。
              </p>
            </div>

            <div className="flex items-center space-x-4 pt-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <span className="text-sm text-gray-500 font-medium">
                {translations
                  ? t("artworks.click_to_view")
                  : "点击照片查看大图"}
              </span>
            </div>
          </div>

          {/* Right Side - Photo Wall */}
          <div className="relative">
            <div className="scattered-photos relative w-full h-[800px]">
              {/* Artwork gallery using position data from JSON */}
              {artworks.map((artwork, index) => {
                const pos = artwork.pos;

                return (
                  <div
                    key={artwork.id}
                    className="polaroid-photo-large"
                    style={{
                      position: "absolute",
                      left: pos.left,
                      top: pos.top,
                      transform: `rotate(${pos.rotation}deg) scale(${pos.scale})`,
                      animationDelay: `${index * 0.15}s`,
                      zIndex: pos.zindex,
                    }}
                    onClick={() => openLightbox(index)}
                  >
                    <div className="polaroid-frame-large">
                      <img src={artwork.image} alt={artwork.title} />
                    </div>
                  </div>
                );
              })}

              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div
                className="absolute bottom-20 left-5 w-1 h-1 bg-purple-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute top-1/2 right-5 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
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
        .artworks-section {
          background: #f8fafc;
          position: relative;
          overflow: hidden;
          padding: 80px 0;
        }

        .artworks-section::before {
          content: "";
          position: absolute;
          top: 10%;
          left: -5%;
          width: 300px;
          height: 300px;
          background: radial-gradient(
            circle,
            rgba(59, 130, 246, 0.05) 0%,
            transparent 70%
          );
          border-radius: 50%;
          filter: blur(50px);
        }

        .artworks-section::after {
          content: "";
          position: absolute;
          bottom: 10%;
          right: -5%;
          width: 200px;
          height: 200px;
          background: radial-gradient(
            circle,
            rgba(139, 69, 196, 0.05) 0%,
            transparent 70%
          );
          border-radius: 50%;
          filter: blur(40px);
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
          text-shadow: 8px 8px 0px #3b82f6, 16px 16px 0px #8b45c4;
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
          background: rgba(59, 130, 246, 0.6);
          border-radius: 4px;
        }

        .polaroid-container::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.8);
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2.5rem;
            text-shadow: 4px 4px 0px #3b82f6, 8px 8px 0px #8b45c4;
          }

          .artworks-section {
            min-height: 35vh;
            padding: 30px 0;
          }
        }
      `}</style>
    </section>
  );
}
