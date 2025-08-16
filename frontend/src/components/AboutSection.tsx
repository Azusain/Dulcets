"use client";
import React, { useState, useEffect } from "react";
import AudioPlayer from "./AudioPlayer";
import { useAssetPath } from "@/hooks/useAssetPath";

interface AboutSectionProps {
  t: (key: string) => string;
}

interface GenreInfo {
  id: string;
  name: string;
  subtitle: string;
}

interface GenreConfig {
  id: string;
  fileName: string;
  displayName: string;
  artist: string;
  duration: string;
  genre: string;
}

const MUSIC_GENRES: GenreInfo[] = [
  { id: "jrock", name: "J-ROCK", subtitle: "Japanese Rock" },
  { id: "jpop", name: "J-POP", subtitle: "Japanese Pop" },
  { id: "idol", name: "IDOL", subtitle: "Idol Music" },
  { id: "orchestra", name: "ORCHESTRA", subtitle: "Orchestral Music" },
  { id: "edm", name: "EDM", subtitle: "Electronic Dance Music" }
];

const AboutSection: React.FC<AboutSectionProps> = ({ t }) => {
  const [selectedGenre, setSelectedGenre] = useState<string>("jrock");
  const [audioConfig, setAudioConfig] = useState<Record<string, GenreConfig>>({});
  const [contentKey, setContentKey] = useState(0); // Force re-render to trigger animation
  const { getAssetPath } = useAssetPath();

  // Load audio configuration on component mount
  useEffect(() => {
    const loadAudioConfig = async () => {
      try {
        // Use getAssetPath to handle different deployment paths
        const configUrl = getAssetPath('/audio/audio-config.json');
        console.log('Attempting to load audio config from:', configUrl);
        const response = await fetch(configUrl);
        console.log('Audio config response status:', response.status, response.statusText);
        
        if (response.ok) {
          const config = await response.json();
          console.log('Audio config loaded successfully:', config);
          setAudioConfig(config);
        } else {
          console.error('Failed to fetch audio config. Response:', {
            status: response.status,
            statusText: response.statusText,
            url: response.url
          });
        }
      } catch (error) {
        console.error('Failed to load audio config:', error);
        // Fallback configuration with hardcoded values
        const fallbackConfig = {
          "jrock": {
            "id": "jrock",
            "fileName": "yumehanabi_demo_03.mp3",
            "displayName": "夢花火",
            "artist": "Shintou",
            "duration": "2:15",
            "genre": "J-Rock"
          },
          "jpop": {
            "id": "jpop",
            "fileName": "夏の音がした_Demo_01.mp3",
            "displayName": "夏の音がした",
            "artist": "Shintou",
            "duration": "3:20",
            "genre": "J-Pop"
          },
          "idol": {
            "id": "idol",
            "fileName": "星空のプレッジ_Kuri_Full_4.mp3",
            "displayName": "星空のプレッジ",
            "artist": "Shintou",
            "duration": "3:45",
            "genre": "Idol"
          },
          "orchestra": {
            "id": "orchestra",
            "fileName": "船に託して.mp3",
            "displayName": "船に託して",
            "artist": "Sakuma遙",
            "duration": "4:12",
            "genre": "Orchestra"
          },
          "edm": {
            "id": "edm",
            "fileName": "星奈こやかの曲.mp3",
            "displayName": "星奈こやかの曲",
            "artist": "星奈",
            "duration": "3:30",
            "genre": "EDM"
          }
        };
        console.log('Using fallback audio config');
        setAudioConfig(fallbackConfig);
      }
    };
    loadAudioConfig();
  }, [getAssetPath]);

  const currentAudioConfig = audioConfig[selectedGenre as keyof typeof audioConfig] as GenreConfig;

  // Trigger re-render animation when content changes
  useEffect(() => {
    setContentKey(prev => prev + 1);
  }, [selectedGenre]);

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header section with Tokyo night background */}
        <header className="mb-20 text-center relative">
          {/* Tokyo Night Background - Only for header */}
          <div 
            className="absolute inset-0 -mx-6 -my-8 bg-cover bg-center bg-no-repeat rounded-lg"
            style={{
              backgroundImage: `url('${getAssetPath('/images/backgrounds/tokyo-fireworks-night.jpg')}')`,
            }}
          >
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/70 rounded-lg"></div>
            
            {/* Tokyo cityscape atmospheric effects */}
            <div className="absolute inset-0 rounded-lg">
              {/* Floating light particles - simulating city lights and distant fireworks */}
              <div className="absolute top-20 left-1/4 w-2 h-2 bg-yellow-400 rounded-full opacity-80 animate-pulse" style={{animationDelay: '0s'}}></div>
              <div className="absolute top-32 right-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-70 animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-48 left-1/2 w-1 h-1 bg-cyan-400 rounded-full opacity-90 animate-pulse" style={{animationDelay: '2s'}}></div>
              <div className="absolute bottom-40 left-1/5 w-2.5 h-2.5 bg-orange-400 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1.5s'}}></div>
              <div className="absolute bottom-60 right-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-75 animate-pulse" style={{animationDelay: '0.5s'}}></div>
              
              {/* Subtle gradient overlays for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 rounded-lg"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-purple-900/10 rounded-lg"></div>
            </div>
          </div>

          {/* Header content with white text */}
          <div className="relative z-10 py-16">
            <div className="mb-12">
              {/* Simple white decorative line */}
              <div className="flex items-center justify-center mb-8">
                <div className="h-px bg-white/60 w-16"></div>
                <div className="mx-4 w-2 h-2 bg-white/80 rounded-full"></div>
                <div className="h-px bg-white/60 w-16"></div>
              </div>

              <h2 className="text-5xl font-light mb-4 text-white tracking-wide drop-shadow-lg">
                {t("about.title")}
              </h2>

              {/* Simple white underline */}
              <div className="mx-auto w-32 h-px bg-white/60">
              </div>

              <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-200 mt-6">
                ABOUT US
              </p>
            </div>

            {/* Description with simple white border frame */}
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-white/40"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-white/40"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-white/40"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-white/40"></div>

              <p className="text-lg text-white leading-relaxed py-8 px-12 drop-shadow-md">
                {t("about.lead_description")}
              </p>
            </div>
          </div>
        </header>

        {/* Main Content Area: Text on left, Genres on right */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Left: About Content with AudioPlayer */}
          <div className="relative flex flex-col h-full">
            {/* Simple dark decorative line */}
            <div className="absolute -left-4 top-0 w-px h-full bg-gray-400"></div>
            
            {/* Content text */}
            <div className="prose prose-lg max-w-none relative flex-1 pl-8">
              <div 
                key={contentKey}
                className="animate-fadeIn text-lg leading-relaxed text-gray-700"
                style={{
                  animation: "fadeIn 0.5s ease-in-out"
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
                  audioUrl={getAssetPath(`/audio/${currentAudioConfig.fileName}`)}
                  className="shadow-sm"
                  t={t} // Pass translation function to AudioPlayer
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
                      selectedGenre === genre.id ? 'transform translate-x-2' : 'hover:translate-x-1'
                    }`}
                    onClick={() => setSelectedGenre(genre.id)}
                  >
                    {/* Simple dark dot indicator */}
                    <div 
                      className={`absolute -left-12 top-4 w-3 h-3 rounded-full transition-all duration-300 ${
                        selectedGenre === genre.id 
                          ? 'bg-gray-800 scale-125' 
                          : 'bg-gray-500 opacity-60 group-hover:opacity-100 group-hover:bg-gray-600'
                      }`}
                    ></div>
                    
                    {/* Content */}
                    <div className="flex items-center space-x-4">
                      
                      {/* Text Content - Dark theme for light background */}
                      <div className="flex-1 text-left">
                        <h3 className={`text-2xl font-light mb-1 tracking-wide transition-colors duration-300 ${
                          selectedGenre === genre.id 
                            ? 'text-gray-900 font-medium' 
                            : 'text-gray-700 group-hover:text-gray-900'
                        }`}>
                          {t(`about.genres.${genre.id}.title`)}
                        </h3>
                        
                        {/* Animated underline */}
                        <div 
                          className={`mb-2 transition-all duration-500 ${
                            selectedGenre === genre.id 
                              ? 'w-20 h-0.5 bg-blue-500' 
                              : 'w-12 h-px bg-gray-400 group-hover:w-16 group-hover:bg-blue-400'
                          }`}
                        ></div>
                        
                        <p className={`text-sm font-light transition-colors duration-300 ${
                          selectedGenre === genre.id 
                            ? 'text-gray-600' 
                            : 'text-gray-500 group-hover:text-gray-600'
                        }`}>
                          {t(`about.genres.${genre.id}.subtitle`)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Selected background effect */}
                    {selectedGenre === genre.id && (
                      <div className="absolute inset-0 -mx-4 -my-2 bg-blue-50 rounded-lg opacity-50 -z-10"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
