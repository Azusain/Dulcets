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
      className="py-24 bg-gray-50 text-black relative overflow-hidden"
    >
      {/* Subtle Japanese-inspired background pattern */}
      <div className="absolute inset-0 opacity-20">
        {/* Geometric grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
                linear-gradient(rgba(156, 163, 175, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(156, 163, 175, 0.1) 1px, transparent 1px)
              `,
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Scattered minimal elements */}
        <div className="absolute top-20 left-10 w-1 h-32 bg-gray-300 transform rotate-12"></div>
        <div className="absolute top-40 right-20 w-1 h-24 bg-gray-300 transform -rotate-12"></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-28 bg-gray-300 transform rotate-45"></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-20 bg-gray-300 transform -rotate-30"></div>

        {/* Subtle circles for accent */}
        <div className="absolute top-1/3 left-1/5 w-2 h-2 bg-gray-300 rounded-full opacity-40"></div>
        <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-gray-300 rounded-full opacity-30"></div>
        <div className="absolute bottom-1/4 left-2/3 w-1.5 h-1.5 bg-gray-400 rounded-full opacity-50"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <header className="mb-20 text-center">
          <div className="mb-12">
            {/* Decorative line with center accent */}
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-gray-300 w-16 opacity-60"></div>
              <div className="mx-4 w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="h-px bg-gray-300 w-16 opacity-60"></div>
            </div>

            <h2 className="text-5xl font-light mb-4 text-black tracking-wide">
              {t("about.title")}
            </h2>

            {/* Subtle animated underline */}
            <div className="mx-auto w-32 h-px bg-gray-400 relative overflow-hidden">
              <div className="absolute inset-0 bg-black w-0 animate-pulse"></div>
            </div>

            <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500 mt-6">
              ABOUT US
            </p>
          </div>

          {/* Description with subtle border frame */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-gray-300 opacity-40"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-gray-300 opacity-40"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-gray-300 opacity-40"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-gray-300 opacity-40"></div>

            <p className="text-lg text-gray-700 leading-relaxed py-8 px-12">
              {t("about.lead_description")}
            </p>
          </div>
        </header>

        {/* Main Content Area: Text on left, Genres on right */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Left: About Content with AudioPlayer */}
          <div className="relative flex flex-col h-full">
            {/* Subtle decorative element */}
            <div className="absolute -left-4 top-0 w-1 h-full bg-gray-200 opacity-50"></div>
            
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

          {/* Right: Interactive Music Genres - Tokyo Night Cityscape */}
          <div className="relative">
            {/* Tokyo night cityscape background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-black rounded-2xl overflow-hidden">
              {/* City lights simulation */}
              <div className="absolute inset-0">
                {/* Building silhouettes */}
                <div className="absolute bottom-0 left-0 w-12 h-32 bg-slate-700 opacity-60"></div>
                <div className="absolute bottom-0 left-10 w-8 h-40 bg-slate-600 opacity-70"></div>
                <div className="absolute bottom-0 left-16 w-10 h-28 bg-slate-700 opacity-65"></div>
                <div className="absolute bottom-0 left-24 w-14 h-44 bg-slate-600 opacity-75"></div>
                <div className="absolute bottom-0 right-20 w-16 h-36 bg-slate-700 opacity-65"></div>
                <div className="absolute bottom-0 right-8 w-12 h-32 bg-slate-600 opacity-70"></div>
                <div className="absolute bottom-0 right-0 w-10 h-28 bg-slate-700 opacity-60"></div>
                
                {/* Window lights */}
                <div className="absolute bottom-16 left-2 w-1 h-1 bg-cyan-300 opacity-80 animate-pulse"></div>
                <div className="absolute bottom-20 left-4 w-1 h-1 bg-blue-200 opacity-70"></div>
                <div className="absolute bottom-24 left-6 w-1 h-1 bg-cyan-400 opacity-90 animate-pulse delay-500"></div>
                <div className="absolute bottom-28 left-12 w-1 h-1 bg-blue-300 opacity-75"></div>
                <div className="absolute bottom-32 left-14 w-1 h-1 bg-cyan-200 opacity-80 animate-pulse delay-1000"></div>
                <div className="absolute bottom-18 left-18 w-1 h-1 bg-blue-400 opacity-85"></div>
                <div className="absolute bottom-22 left-20 w-1 h-1 bg-cyan-300 opacity-75 animate-pulse delay-700"></div>
                <div className="absolute bottom-26 left-22 w-1 h-1 bg-blue-200 opacity-70"></div>
                
                <div className="absolute bottom-14 right-16 w-1 h-1 bg-cyan-400 opacity-90 animate-pulse"></div>
                <div className="absolute bottom-18 right-12 w-1 h-1 bg-blue-300 opacity-80"></div>
                <div className="absolute bottom-22 right-10 w-1 h-1 bg-cyan-200 opacity-75 animate-pulse delay-300"></div>
                <div className="absolute bottom-26 right-6 w-1 h-1 bg-blue-400 opacity-85"></div>
                <div className="absolute bottom-30 right-4 w-1 h-1 bg-cyan-300 opacity-80 animate-pulse delay-800"></div>
                
                {/* Neon glow effects */}
                <div className="absolute top-10 left-1/4 w-32 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
                <div className="absolute top-20 right-1/4 w-24 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
                
                {/* Distant city lights blur */}
                <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-cyan-300 opacity-20 blur-sm"></div>
                <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-blue-300 opacity-25 blur-sm"></div>
                <div className="absolute top-2/3 left-1/2 w-1 h-1 bg-cyan-400 opacity-30 blur-sm"></div>
                
                {/* Traffic flow simulation - moving lights */}
                <div className="absolute bottom-8 left-0 w-full h-1 overflow-hidden">
                  {/* Moving car lights */}
                  <div className="absolute w-2 h-px bg-white opacity-60 animate-[moveRight_8s_linear_infinite]" style={{animationDelay: '0s'}}></div>
                  <div className="absolute w-1.5 h-px bg-red-400 opacity-50 animate-[moveLeft_10s_linear_infinite]" style={{animationDelay: '2s'}}></div>
                  <div className="absolute w-2 h-px bg-yellow-200 opacity-70 animate-[moveRight_12s_linear_infinite]" style={{animationDelay: '4s'}}></div>
                  <div className="absolute w-1 h-px bg-blue-200 opacity-40 animate-[moveLeft_15s_linear_infinite]" style={{animationDelay: '6s'}}></div>
                </div>
                
                <div className="absolute bottom-12 left-0 w-full h-1 overflow-hidden">
                  <div className="absolute w-1.5 h-px bg-cyan-300 opacity-50 animate-[moveRight_14s_linear_infinite]" style={{animationDelay: '1s'}}></div>
                  <div className="absolute w-2 h-px bg-white opacity-40 animate-[moveLeft_9s_linear_infinite]" style={{animationDelay: '3s'}}></div>
                </div>
              </div>
              
              {/* Fog/haze overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-slate-900/40"></div>
            </div>

            <div className="relative z-10 p-8 space-y-8">
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
                    {/* Dot indicator */}
                    <div 
                      className={`absolute -left-12 top-4 w-3 h-3 rounded-full transition-all duration-300 ${
                        selectedGenre === genre.id 
                          ? 'bg-black scale-125' 
                          : 'bg-gray-400 opacity-60 group-hover:opacity-100'
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
