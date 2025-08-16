"use client";
import React, { useState, useEffect } from "react";
import AudioPlayer from "./AudioPlayer";

interface AboutSectionProps {
  t: (key: string) => string;
}

interface GenreContent {
  title: string;
  subtitle: string;
  content: string;
}

interface GenreConfig {
  id: string;
  fileName: string;
  displayName: string;
  artist: string;
  duration: string;
  genre: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ t }) => {
  const [selectedGenre, setSelectedGenre] = useState<string>("jrock");
  const [audioConfig, setAudioConfig] = useState<Record<string, GenreConfig>>({});
  const [contentKey, setContentKey] = useState(0); // 用于强制重新渲染以触发动画

  // Define genre content for each music type
  const genreContents: Record<string, GenreContent> = {
    jrock: {
      title: "J-ROCK",
      subtitle: "Japanese Rock",
      content: "私たちは、独自性があり、魅力的な日本のロック音楽制作を専門としています。エキサイティングなテーマソングから心に響く挿入歌まで、私たちのチームはすべての音符を丁寧に磨き上げます。私たちの作曲家、編曲家、そしてミキシングエンジニアは、これらの音楽スタイルに精通しているだけでなく、絶対にも非凡にこだわっています。"
    },
    jpop: {
      title: "J-POP",
      subtitle: "Japanese Pop",
      content: "キャッチーなメロディーと現代的なサウンドを融合した日本のポップミュージック制作に特化しています。アイドル楽曲からアーティスト向けの楽曲まで、時代に合った魅力的な楽曲を制作します。ポップスの持つエネルギーと日本独特の美しさを組み合わせ、聴く人の心に残る作品を創り出します。"
    },
    idol: {
      title: "IDOL",
      subtitle: "Idol Music",
      content: "アイドルグループやソロアーティスト向けの楽曲制作において豊富な経験を持ちます。可愛らしさとパフォーマンス性を兼ね備えた楽曲から、成長を表現する深みのある楽曲まで、アーティストの魅力を最大限に引き出す音楽を制作します。ダンサブルなビートと印象的なフックで、ファンの心を掴む楽曲を創造します。"
    },
    orchestra: {
      title: "ORCHESTRA",
      subtitle: "Orchestral Music",
      content: "クラシックオーケストラの壮大さと現代音楽の革新性を融合させた楽曲制作を行います。映画音楽、ゲームサウンドトラック、アニメBGMなど、感情豊かで印象深いオーケストラ楽曲を制作します。各楽器の特性を活かした精密なアレンジで、聴く人の心に深く響く音楽体験を提供します。"
    },
    edm: {
      title: "EDM",
      subtitle: "Electronic Dance Music",
      content: "最新のエレクトロニック・ダンス・ミュージックトレンドを取り入れた楽曲制作を専門としています。クラブシーンで映えるハードなビートから、リスニング用の洗練されたエレクトロニカまで幅広く対応します。革新的なサウンドデザインと日本独特の音楽性を組み合わせ、国際的にも通用する楽曲を制作します。"
    }
  };

  // Load audio configuration on component mount
  useEffect(() => {
    const loadAudioConfig = async () => {
      try {
        // 检查是否在生产环境中，如果是则需要加上 basePath
        const basePath = process.env.NODE_ENV === 'production' ? '/Dulcets' : '';
        const configUrl = `${basePath}/audio/audio-config.json`;
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
        // 临时回退方案 - 使用硬编码配置
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
  }, []);

  const genres = [
    { id: "jrock", name: "J-ROCK", subtitle: "Japanese Rock" },
    { id: "jpop", name: "J-POP", subtitle: "Japanese Pop" },
    { id: "idol", name: "IDOL", subtitle: "Idol Music" },
    { id: "orchestra", name: "ORCHESTRA", subtitle: "Orchestral Music" },
    { id: "edm", name: "EDM", subtitle: "Electronic Dance Music" }
  ];

  const currentContent = genreContents[selectedGenre];
  const currentAudioConfig = audioConfig[selectedGenre as keyof typeof audioConfig] as GenreConfig;

  // 切换内容时触发重新渲染动画
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
                {currentContent.content}
              </div>
            </div>
            
            {/* AudioPlayer at the bottom */}
            <div className="mt-6 pl-8">
              {currentAudioConfig && (
                <AudioPlayer
                  title={currentAudioConfig.displayName}
                  description={currentAudioConfig.artist}
                  audioUrl={`${process.env.NODE_ENV === 'production' ? '/Dulcets' : ''}/audio/${currentAudioConfig.fileName}`}
                  className="shadow-sm"
                  t={t} // 传递翻译函数给 AudioPlayer
                />
              )}
            </div>
          </div>

          {/* Right: Interactive Music Genres */}
          <div className="relative">
            {/* Vertical accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300"></div>

            <div className="pl-12 space-y-8">
              {genres.map((genre) => (
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
                      {genre.name}
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
                      {genre.subtitle}
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
