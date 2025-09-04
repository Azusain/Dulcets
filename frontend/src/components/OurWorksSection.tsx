"use client";
import React, { useState, useEffect } from "react";
import AlbumPlayer from "./AlbumPlayer";
import VideoPlayer from "./VideoPlayer";
import { ServiceCard } from "./ServiceCard";
import { useAssetPath } from "@/hooks/useAssetPath";
import works from "../../public/service/works.json";

interface OurWorksSectionProps {
  t: (key: string) => string;
}

interface GenreConfig {
  id: string;
  fileName: string;
  displayName: string;
  artist: string;
  genre: string;
}

interface GenreInfo {
  id: string;
  name: string;
  subtitle: string;
}

const MUSIC_GENRES: GenreInfo[] = [
  { id: "idol", name: "IDOL", subtitle: "Idol Music" },
  { id: "jrock", name: "J-ROCK", subtitle: "Japanese Rock" },
  { id: "jpop", name: "J-POP", subtitle: "Japanese Pop" },
  { id: "orchestra", name: "ORCHESTRA", subtitle: "Orchestral Music" },
  { id: "edm", name: "EDM", subtitle: "Electronic Dance Music" },
  { id: "bgm", name: "BGM", subtitle: "Background Music" },
];

const OurWorksSection: React.FC<OurWorksSectionProps> = ({ t }) => {
  const [selectedGenre, setSelectedGenre] = useState<string>("idol");
  const [audioConfig, setAudioConfig] = useState<Record<string, GenreConfig>>(
    {}
  );
  const { getAssetPath } = useAssetPath();

  // Listen for genre selection events from search
  useEffect(() => {
    const handleSetGenre = (event: CustomEvent) => {
      const { genreId } = event.detail;
      if (genreId && MUSIC_GENRES.some((g) => g.id === genreId)) {
        setSelectedGenre(genreId);
      }
    };

    window.addEventListener("setGenre", handleSetGenre as EventListener);

    return () => {
      window.removeEventListener("setGenre", handleSetGenre as EventListener);
    };
  }, []);

  // Load audio configuration on component mount
  useEffect(() => {
    let isMounted = true;

    const loadAudioConfig = async () => {
      try {
        // Use getAssetPath to handle different deployment paths
        const configUrl = getAssetPath("/audio/audio-config.json");
        const response = await fetch(configUrl);

        if (response.ok && isMounted) {
          const config = await response.json();
          setAudioConfig(config);
        } else if (!response.ok) {
          console.error("Failed to fetch audio config. Response:", {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
          });
        }
      } catch (error) {
        console.error("Failed to load audio config:", error);
        // No fallback options.
      }
    };

    loadAudioConfig();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="works"
      className="relative bg-gradient-to-b from-gray-50 to-gray-50"
      style={{ scrollMarginTop: "120px" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-6 tracking-wide">
            {t("works.title")}
          </h2>
          <div className="mx-auto w-24 h-px bg-gray-400 mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("works.lead_description")}
          </p>
        </div>

        {/* Music Player Section */}
        <div className="mb-16">
          <AlbumPlayer t={t} className="mx-auto max-w-6xl" />
        </div>

        {/* YouTube Video Links Grid */}
        <div className="border-t border-gray-200 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((post, index) => {
              // Get localized title and excerpt based on current language
              const getLocalizedContent = () => {
                const currentLang =
                  t("nav.home") === "Home"
                    ? "en"
                    : t("nav.home") === "ホーム"
                    ? "jp"
                    : "zh";

                return {
                  title:
                    currentLang === "en"
                      ? post.titleEn
                      : currentLang === "jp"
                      ? post.titleJp
                      : post.title,
                  excerpt:
                    currentLang === "en"
                      ? post.excerptEn
                      : currentLang === "jp"
                      ? post.excerptJp
                      : post.excerpt,
                };
              };

              const content = getLocalizedContent();

              return (
                <ServiceCard
                  key={index}
                  image={post.image}
                  title={content.title}
                  description={content.excerpt}
                  href={post.videoUrl}
                  delay={index * 100}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurWorksSection;
