"use client";
import { ComponentWithTranslation } from "@/components/MainPage";
import { useState } from "react";

// Lightbox Modal Component
const ImageLightbox = ({ src, alt, isOpen, onClose }: {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-7xl max-h-[90vh] w-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-pink-400 transition-colors duration-200 z-10"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Image */}
        <img 
          src={src}
          alt={alt}
          className="w-full h-full object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
        
        {/* Image Caption */}
        <div className="absolute -bottom-12 left-0 right-0 text-center">
          <p className="text-white/80 text-lg font-medium">{alt}</p>
        </div>
      </div>
    </div>
  );
};

// Clean Polaroid component - no text, just image
const PolaroidPhoto = ({ src, alt, className, style, delay = 0, onClick }: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  onClick: () => void;
}) => {
  return (
    <div 
      className={`polaroid-photo group cursor-pointer ${className}`} 
      style={{
        ...style,
        animationDelay: `${delay}ms`
      }}
      onClick={onClick}
    >
      <div className="polaroid-frame bg-white shadow-xl transform transition-all duration-300 group-hover:scale-105 group-hover:rotate-0 group-hover:shadow-2xl group-hover:z-20 relative overflow-hidden">
        <div className="polaroid-image-container p-2 pb-8">
          <img 
            src={src}
            alt={alt}
            loading="lazy"
            className="w-full h-full object-cover rounded-sm"
          />
        </div>
        
        {/* Hover overlay with zoom icon */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ArtworksSection({ t }: ComponentWithTranslation) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  
  const openLightbox = (src: string, alt: string) => {
    setLightbox({ src, alt });
  };
  
  const closeLightbox = () => {
    setLightbox(null);
  };

  return (
    <>
      {/* Lightbox Modal */}
      {lightbox && (
        <ImageLightbox 
          src={lightbox.src} 
          alt={lightbox.alt} 
          isOpen={!!lightbox} 
          onClose={closeLightbox} 
        />
      )}
      
      <section className="overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 text-black relative">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-pink-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-300 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-12 md:grid-cols-none gap-x-8">
            {/* Text Content - Left Side */}
            <div className="col-start-1 col-end-5 py-24 xl:col-end-6 md:col-auto md:pb-0 md:pt-16">
              <div className="w-fit rounded-full py-2 px-4 text-xs font-medium uppercase leading-none tracking-wider text-pink-700 bg-white/70 backdrop-blur-sm border border-pink-200">
                ✨ Artwork
              </div>
              <h2 className="mt-6 text-9xl font-bold leading-none xl:text-8xl md:text-7xl sm:text-6xl relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 relative">
                  绘画作品
                  <span className="absolute inset-0 text-pink-300 -z-10 translate-x-3 translate-y-3 opacity-40">绘画作品</span>
                </span><br />
                <span className="text-gray-800">展示</span>
              </h2>
              <p className="mr-12 mt-8 text-lg leading-relaxed xl:mr-0 xl:text-base md:mt-6 md:max-w-xl text-gray-700">
                精选二次元风格绘画作品，融合传统艺术与现代数字创作技术，展现独特的艺术视觉魅力和创意表达。
              </p>
              <div className="mt-8 space-y-4 xl:mt-6 md:mt-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">角色设计与概念艺术</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">场景插画与环境设计</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">数字绘画与传统艺术</span>
                </div>
              </div>
              <a className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium rounded-full transition-all duration-300 hover:from-pink-600 hover:to-purple-600 hover:shadow-lg hover:scale-105 mt-8 xl:mt-6 md:mt-4" href="#">
                查看作品集
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            
            {/* Scattered Polaroid Photos - Right Side */}
            <div className="col-start-5 col-end-13 py-12 xl:col-start-6 md:col-auto md:py-8">
              <div className="scattered-photos relative">
                {/* Photo 1 - Top Left */}
                <PolaroidPhoto
                  src="https://www.dmoe.cc/random.php?1"
                  alt="角色设计"
                  className="absolute top-0 left-0 w-48 md:w-36 sm:w-32"
                  style={{ transform: 'rotate(-8deg)' }}
                  delay={100}
                  onClick={() => openLightbox("https://www.dmoe.cc/random.php?1", "角色设计")}
                />
                
                {/* Photo 2 - Top Right */}
                <PolaroidPhoto
                  src="https://www.dmoe.cc/random.php?2"
                  alt="场景插画"
                  className="absolute top-12 right-8 w-56 md:w-40 sm:w-36"
                  style={{ transform: 'rotate(12deg)' }}
                  delay={300}
                  onClick={() => openLightbox("https://www.dmoe.cc/random.php?2", "场景插画")}
                />
                
                {/* Photo 3 - Middle Left */}
                <PolaroidPhoto
                  src="https://www.dmoe.cc/random.php?3"
                  alt="概念艺术"
                  className="absolute top-48 left-16 w-52 md:w-38 sm:w-34"
                  style={{ transform: 'rotate(3deg)' }}
                  delay={500}
                  onClick={() => openLightbox("https://www.dmoe.cc/random.php?3", "概念艺术")}
                />
                
                {/* Photo 4 - Bottom Right */}
                <PolaroidPhoto
                  src="https://www.dmoe.cc/random.php?4"
                  alt="数字绘画"
                  className="absolute bottom-8 right-0 w-44 md:w-34 sm:w-30"
                  style={{ transform: 'rotate(-15deg)' }}
                  delay={700}
                  onClick={() => openLightbox("https://www.dmoe.cc/random.php?4", "数字绘画")}
                />
                
                {/* Photo 5 - Center (partially hidden) */}
                <PolaroidPhoto
                  src="https://www.dmoe.cc/random.php?11"
                  alt="环境设计"
                  className="absolute top-32 left-1/2 transform -translate-x-1/2 w-40 md:w-32 sm:w-28 opacity-80"
                  style={{ transform: 'translateX(-50%) rotate(-2deg)', zIndex: -1 }}
                  delay={900}
                  onClick={() => openLightbox("https://www.dmoe.cc/random.php?11", "环境设计")}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
