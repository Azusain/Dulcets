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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Tokyo Night Background - Full Screen */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/backgrounds/tokyo-fireworks-night.jpg')`,
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Fireworks festival atmospheric effects */}
        <div className="absolute inset-0">
          {/* Floating light particles - simulating distant fireworks */}
          <div className="absolute top-20 left-1/4 w-2 h-2 bg-yellow-400 rounded-full opacity-80 animate-pulse" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-32 right-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-70 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-48 left-1/2 w-1 h-1 bg-cyan-400 rounded-full opacity-90 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 left-1/5 w-2.5 h-2.5 bg-orange-400 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-60 right-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-75 animate-pulse" style={{animationDelay: '0.5s'}}></div>
          
          {/* Subtle gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-purple-900/10"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <header className="mb-20 text-center">
          <div className="mb-12">
            {/* Decorative line with center accent - Festival Theme */}
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-yellow-400/60 w-16 shadow-[0_0_4px_rgba(255,193,7,0.4)]"></div>
              <div className="mx-4 w-2 h-2 bg-pink-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(236,72,153,0.6)]"></div>
              <div className="h-px bg-yellow-400/60 w-16 shadow-[0_0_4px_rgba(255,193,7,0.4)]"></div>
            </div>

            <h2 className="text-5xl font-light mb-4 text-white tracking-wide drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
              {t("about.title")}
            </h2>

            {/* Fireworks-inspired animated underline */}
            <div className="mx-auto w-32 h-0.5 bg-gradient-to-r from-pink-400 via-yellow-400 to-cyan-400 relative overflow-hidden shadow-[0_0_8px_rgba(255,193,7,0.4)]">
              <div className="absolute inset-0 bg-white w-0 animate-pulse"></div>
            </div>

            <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-300 mt-6">
              花火大会 • FIREWORKS FESTIVAL
            </p>
          </div>

          {/* Description with festival border frame */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-yellow-400/40"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-pink-400/40"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-400/40"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-purple-400/40"></div>

            <p className="text-lg text-gray-200 leading-relaxed py-8 px-12 drop-shadow-[0_0_4px_rgba(0,0,0,0.5)]">
              {t("about.lead_description")}
            </p>
          </div>
        </header>

        {/* Main Content Area: Text on left, Genres on right */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Left: About Content with AudioPlayer */}
          <div className="relative flex flex-col h-full">
            {/* Festival decorative element */}
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-yellow-400/60 via-pink-400/60 to-cyan-400/60 shadow-[0_0_4px_rgba(255,193,7,0.3)]"></div>
            
            {/* Content text */}
            <div className="prose prose-lg max-w-none relative flex-1 pl-8">
              <div 
                key={contentKey}
                className="animate-fadeIn text-lg leading-relaxed text-gray-200 drop-shadow-[0_0_4px_rgba(0,0,0,0.5)] backdrop-blur-sm bg-black/20 rounded-lg p-6"
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

          {/* Right: Interactive Music Genres - Festival Style */}
          <div className="relative">
            {/* Elegant glass panel background */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
              {/* Subtle festival glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-pink-400/5 to-cyan-400/5 rounded-2xl"></div>
            </div>

            <div className="relative z-10 p-8 space-y-6">
              {MUSIC_GENRES.map((genre) => {
                // Define icons for each genre
                const genreIcons = {
                  jrock: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                      <path d="M4 9h3l3.5-3.5L9 4 4 9z"/>
                      <path d="M20 15h-3l-3.5 3.5L15 20l5-5z"/>
                    </svg>
                  ),
                  jpop: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  ),
                  idol: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      <circle cx="12" cy="8" r="2" fill="none" stroke="white" strokeWidth="1"/>
                    </svg>
                  ),
                  orchestra: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 5v4H7V5c0-1.1.9-2 2-2s2 .9 2 2zM6.5 11.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zM12 1l.94 3.06L16 5l-2.06.94L13 9l-.94-3.06L9 5l3.06-.94L12 1zm7 11.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5z"/>
                      <path d="M12 19v-3.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V19h-3zm4-8.5V7c0-1.1.9-2 2-2s2 .9 2 2v3.5h-4z"/>
                    </svg>
                  ),
                  edm: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      <polygon points="1,1 3,3 1,5" fill="none" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                  )
                };
                
                return (
                  <div 
                    key={genre.id}
                    className={`group relative cursor-pointer transition-all duration-300 ${
                      selectedGenre === genre.id ? 'transform translate-x-2' : 'hover:translate-x-1'
                    }`}
                    onClick={() => setSelectedGenre(genre.id)}
                  >
                    {/* Festival dot indicator */}
                    <div 
                      className={`absolute -left-12 top-4 w-3 h-3 rounded-full transition-all duration-300 shadow-[0_0_6px_rgba(255,193,7,0.4)] ${
                        selectedGenre === genre.id 
                          ? 'bg-yellow-400 scale-125 animate-pulse' 
                          : 'bg-pink-400/60 opacity-60 group-hover:opacity-100 group-hover:bg-pink-400'
                      }`}
                    ></div>
                    
                    {/* Content */}
                    <div className="flex items-center space-x-4">
                      {/* Genre Icon with night sky colors */}
                      <div className={`flex-shrink-0 p-3 rounded-lg transition-all duration-300 ${
                        selectedGenre === genre.id 
                          ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-cyan-400 shadow-lg' 
                          : 'bg-gradient-to-br from-slate-100 to-gray-200 text-slate-600 group-hover:from-slate-200 group-hover:to-gray-300'
                      }`}>
                        {genreIcons[genre.id as keyof typeof genreIcons]}
                      </div>
                      
                      {/* Text Content - Crystal White Tokyo Theme */}
                      <div className="flex-1 text-left">
                        <h3 className={`text-2xl font-light mb-1 tracking-wide transition-colors duration-300 ${
                          selectedGenre === genre.id 
                            ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] font-medium' 
                            : 'text-gray-200 group-hover:text-white group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]'
                        }`}>
                          {t(`about.genres.${genre.id}.title`)}
                        </h3>
                        
                        {/* Animated underline with neon glow */}
                        <div 
                          className={`mb-2 transition-all duration-500 ${
                            selectedGenre === genre.id 
                              ? 'w-20 h-0.5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]' 
                              : 'w-12 h-px bg-gray-300 group-hover:w-16 group-hover:bg-cyan-300 group-hover:shadow-[0_0_4px_rgba(34,211,238,0.4)]'
                          }`}
                        ></div>
                        
                        <p className={`text-sm font-light transition-colors duration-300 ${
                          selectedGenre === genre.id 
                            ? 'text-gray-200 opacity-90' 
                            : 'text-gray-400 group-hover:text-gray-300'
                        }`}>
                          {t(`about.genres.${genre.id}.subtitle`)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Selected background effect */}
                    {selectedGenre === genre.id && (
                      <div className="absolute inset-0 -mx-4 -my-2 bg-gray-100 rounded-lg opacity-20 -z-10"></div>
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
