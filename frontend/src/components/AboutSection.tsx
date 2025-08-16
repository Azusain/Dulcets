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

        {/* Why Choose Us Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            {/* Decorative elements */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-px bg-gray-300 w-12 opacity-50"></div>
              <div className="mx-3 w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <div className="h-px bg-gray-300 w-12 opacity-50"></div>
            </div>
            
            <h3 className="text-3xl font-light text-black mb-2 tracking-wide">
              {t("about.why_choose_us.title")}
            </h3>
            
            <div className="mx-auto w-20 h-px bg-gray-400 opacity-60"></div>
            
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-4">
              {t("about.why_choose_us.subtitle")}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {[
              'custom_music',
              'comprehensive_support', 
              'diverse_vocals',
              'multilingual',
              'cross_media'
            ].map((feature, index) => (
              <div 
                key={feature}
                className="group relative bg-white p-6 border border-gray-200 hover:border-gray-300 transition-all duration-500 hover:shadow-lg hover:-translate-x-2 hover:scale-105 hover:skew-x-1 overflow-hidden"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  transformOrigin: 'left center'
                }}
              >
                {/* Animated squeeze background */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-transparent opacity-0 group-hover:opacity-60 transition-all duration-500 transform -translate-x-full group-hover:translate-x-0"></div>
                
                {/* Top accent line with squeeze effect */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gray-200 group-hover:bg-gray-400 group-hover:h-1 transition-all duration-300 transform group-hover:scale-x-110"></div>
                
                {/* Corner decorative elements with squeeze animation */}
                <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-gray-300 opacity-30 group-hover:opacity-80 transition-all duration-300 group-hover:scale-125 group-hover:-translate-x-1"></div>
                <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-gray-300 opacity-30 group-hover:opacity-80 transition-all duration-300 group-hover:scale-125 group-hover:translate-x-1"></div>
                
                <div className="relative z-10 transform group-hover:-translate-x-1 transition-transform duration-500">
                  <h4 className="text-lg font-medium text-black mb-3 tracking-wide group-hover:text-gray-800 group-hover:tracking-wider transition-all duration-300 group-hover:scale-105">
                    {t(`about.why_choose_us.features.${feature}.title`)}
                  </h4>
                  
                  <div className="w-8 h-px bg-gray-300 mb-4 group-hover:w-16 group-hover:h-0.5 transition-all duration-300 transform group-hover:translate-x-2"></div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transform group-hover:scale-102 transition-all duration-300">
                    {t(`about.why_choose_us.features.${feature}.description`)}
                  </p>
                </div>
                
                {/* Side squeeze indicator */}
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-gray-300 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                
                {/* Enhanced hover background effect with squeeze */}
                <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-40 transition-opacity duration-500 transform skew-x-2 group-hover:skew-x-0"></div>
              </div>
            ))}
          </div>
        </div>

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

          {/* Right: Interactive Music Genres */}
          <div className="relative">
            {/* Vertical accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300"></div>

            <div className="pl-12 space-y-8">
              {MUSIC_GENRES.map((genre) => (
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
                  <div className="text-center">
                    <h3 className={`text-2xl font-light mb-2 tracking-wide transition-colors duration-300 ${
                      selectedGenre === genre.id ? 'text-black' : 'text-gray-800'
                    }`}>
                      {t(`about.genres.${genre.id}.title`)}
                    </h3>
                    
                    {/* Animated underline */}
                    <div 
                      className={`bg-gray-300 mx-auto mb-3 transition-all duration-500 ${
                        selectedGenre === genre.id 
                          ? 'w-24 h-0.5 bg-black' 
                          : 'w-16 h-px group-hover:w-20'
                      }`}
                    ></div>
                    
                    <p className="text-gray-600 text-sm font-light">
                      {t(`about.genres.${genre.id}.subtitle`)}
                    </p>
                    
                    {/* Selected background effect */}
                    {selectedGenre === genre.id && (
                      <div className="absolute inset-0 -mx-4 -my-2 bg-gray-100 rounded-lg opacity-20 -z-10"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
