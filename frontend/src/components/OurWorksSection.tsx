"use client";
import React, { useState, useEffect } from "react";
import AudioPlayer from "./AudioPlayer";
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
  duration: string;
  genre: string;
}

interface GenreInfo {
  id: string;
  name: string;
  subtitle: string;
}

const MUSIC_GENRES: GenreInfo[] = [
  { id: "jrock", name: "J-ROCK", subtitle: "Japanese Rock" },
  { id: "jpop", name: "J-POP", subtitle: "Japanese Pop" },
  { id: "idol", name: "IDOL", subtitle: "Idol Music" },
  { id: "orchestra", name: "ORCHESTRA", subtitle: "Orchestral Music" },
  { id: "edm", name: "EDM", subtitle: "Electronic Dance Music" },
];

const OurWorksSection: React.FC<OurWorksSectionProps> = ({ t }) => {
  const [selectedGenre, setSelectedGenre] = useState<string>("jrock");
  const [audioConfig, setAudioConfig] = useState<Record<string, GenreConfig>>(
    {}
  );
  const { getAssetPath } = useAssetPath();

  // Load audio configuration on component mount
  useEffect(() => {
    const loadAudioConfig = async () => {
      try {
        // Use getAssetPath to handle different deployment paths
        const configUrl = getAssetPath("/audio/audio-config.json");
        console.log("Attempting to load audio config from:", configUrl);
        const response = await fetch(configUrl);
        console.log(
          "Audio config response status:",
          response.status,
          response.statusText
        );

        if (response.ok) {
          const config = await response.json();
          console.log("Audio config loaded successfully:", config);
          setAudioConfig(config);
        } else {
          console.error("Failed to fetch audio config. Response:", {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
          });
        }
      } catch (error) {
        console.error("Failed to load audio config:", error);
        // Fallback configuration with hardcoded values
        const fallbackConfig = {
          jrock: {
            id: "jrock",
            fileName: "yumehanabi_demo_03.mp3",
            displayName: "夢花火",
            artist: "Shintou",
            duration: "2:15",
            genre: "J-Rock",
          },
          jpop: {
            id: "jpop",
            fileName: "夏の音がした_Demo_01.mp3",
            displayName: "夏の音がした",
            artist: "Shintou",
            duration: "3:20",
            genre: "J-Pop",
          },
          idol: {
            id: "idol",
            fileName: "星空のプレッジ_Kuri_Full_4.mp3",
            displayName: "星空のプレッジ",
            artist: "Shintou",
            duration: "3:45",
            genre: "Idol",
          },
          orchestra: {
            id: "orchestra",
            fileName: "船に託して.mp3",
            displayName: "船に託して",
            artist: "Sakuma遙",
            duration: "4:12",
            genre: "Orchestra",
          },
          edm: {
            id: "edm",
            fileName: "星奈こやかの曲.mp3",
            displayName: "星奈こやかの曲",
            artist: "星奈",
            duration: "3:30",
            genre: "EDM",
          },
        };
        setAudioConfig(fallbackConfig);
      }
    };
    loadAudioConfig();
  }, [getAssetPath]);

  const currentAudioConfig = audioConfig[
    selectedGenre as keyof typeof audioConfig
  ] as GenreConfig;

  return (
    <section
      id="works"
      className="relative bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <span className="text-sm font-medium uppercase tracking-wider text-gray-500 bg-white px-6 py-2 rounded-full shadow-sm border border-gray-200">
              {t("works.title")}
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-6 tracking-wide">
            {t("works.title")}
          </h2>
          <div className="mx-auto w-24 h-px bg-gray-400 mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("works.lead_description")}
          </p>
        </div>

        {/* Audio Player Section with Content */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: About Content with dynamic text */}
            <div className="relative flex flex-col h-full">
              {/* Simple dark decorative line */}
              <div className="absolute -left-4 top-0 w-px h-full bg-gray-400"></div>

              {/* Content text */}
              <div className="prose prose-lg max-w-none relative flex-1 pl-8">
                <div
                  className="animate-fadeIn text-lg leading-relaxed text-gray-700"
                  style={{
                    animation: "fadeIn 0.5s ease-in-out",
                  }}
                >
                  {t(`about.genres.${selectedGenre}.content`)}
                </div>
              </div>

              {/* AudioPlayer at the bottom */}
              <div className="mt-6 pl-8">
                {currentAudioConfig && (
                  <AudioPlayer
                    title={currentAudioConfig.displayName}
                    description={currentAudioConfig.artist}
                    audioUrl={getAssetPath(
                      `/audio/${currentAudioConfig.fileName}`
                    )}
                    className="shadow-sm"
                    t={t}
                  />
                )}
              </div>
            </div>

            {/* Right: Interactive Music Genres - Clean Style */}
            <div className="relative">
              <div className="p-8 space-y-6">
                {MUSIC_GENRES.map((genre) => {
                  return (
                    <div
                      key={genre.id}
                      className={`group relative cursor-pointer transition-all duration-300 ${
                        selectedGenre === genre.id
                          ? "transform translate-x-2"
                          : "hover:translate-x-1"
                      }`}
                      onClick={() => setSelectedGenre(genre.id)}
                    >
                      {/* Simple dark dot indicator */}
                      <div
                        className={`absolute -left-12 top-4 w-3 h-3 rounded-full transition-all duration-300 ${
                          selectedGenre === genre.id
                            ? "bg-gray-800 scale-125"
                            : "bg-gray-500 opacity-60 group-hover:opacity-100 group-hover:bg-gray-600"
                        }`}
                      ></div>

                      {/* Content */}
                      <div className="flex items-center space-x-4">
                        {/* Text Content - Dark theme for light background */}
                        <div className="flex-1 text-left">
                          <h3
                            className={`text-2xl font-light mb-1 tracking-wide transition-colors duration-300 ${
                              selectedGenre === genre.id
                                ? "text-gray-900 font-medium"
                                : "text-gray-700 group-hover:text-gray-900"
                            }`}
                          >
                            {t(`about.genres.${genre.id}.title`)}
                          </h3>

                          {/* Animated underline */}
                          <div
                            className={`mb-2 transition-all duration-500 ${
                              selectedGenre === genre.id
                                ? "w-20 h-0.5 bg-gray-700"
                                : "w-12 h-px bg-gray-400 group-hover:w-16 group-hover:bg-gray-600"
                            }`}
                          ></div>

                          <p
                            className={`text-sm font-light transition-colors duration-300 ${
                              selectedGenre === genre.id
                                ? "text-gray-600"
                                : "text-gray-500 group-hover:text-gray-600"
                            }`}
                          >
                            {t(`about.genres.${genre.id}.subtitle`)}
                          </p>
                        </div>
                      </div>

                      {/* Selected background effect */}
                      {selectedGenre === genre.id && (
                        <div className="absolute inset-0 -mx-4 -my-2 bg-gray-600 rounded-lg opacity-10 -z-10"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
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
