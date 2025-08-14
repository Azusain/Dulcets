"use client";
import { ComponentWithTranslation } from "@/components/MainPage";
import { useState } from "react";

// Lightbox Modal Component for 3D theme
const ImageLightbox3D = ({ src, alt, isOpen, onClose }: {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-gray-900/95 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-7xl max-h-[90vh] w-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-cyan-300 hover:text-cyan-400 transition-colors duration-200 z-10"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Image with tech border */}
        <div className="relative bg-gray-900 border-2 border-cyan-400/50 rounded-lg p-2 shadow-2xl shadow-cyan-500/20">
          <img 
            src={src}
            alt={alt}
            className="w-full h-full object-contain rounded"
            onClick={(e) => e.stopPropagation()}
          />
          {/* Tech corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-400"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-400"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400"></div>
        </div>
        
        {/* Image Caption */}
        <div className="absolute -bottom-12 left-0 right-0 text-center">
          <p className="text-cyan-300 text-lg font-mono font-semibold tracking-wide">{alt}</p>
        </div>
      </div>
    </div>
  );
};

// Clean 3D Polaroid component - no text, just image
const PolaroidPhoto3D = ({ src, alt, className, style, delay = 0, onClick }: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  onClick: () => void;
}) => {
  return (
    <div 
      className={`polaroid-photo-3d group cursor-pointer ${className}`} 
      style={{
        ...style,
        animationDelay: `${delay}ms`
      }}
      onClick={onClick}
    >
      <div className="polaroid-frame-3d bg-gray-900 border-2 border-cyan-400/30 shadow-xl shadow-cyan-500/20 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-0 group-hover:shadow-2xl group-hover:shadow-cyan-400/40 group-hover:z-20 group-hover:border-cyan-400/60 relative overflow-hidden">
        <div className="polaroid-image-container-3d p-2 pb-6">
          <img 
            src={src}
            alt={alt}
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110 rounded-sm"
          />
        </div>
        
        {/* Hover overlay with zoom icon */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-cyan-400/90 rounded-full p-2">
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
        
        {/* Tech glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default function ModelingSection({ t }: ComponentWithTranslation) {
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
        <ImageLightbox3D 
          src={lightbox.src} 
          alt={lightbox.alt} 
          isOpen={!!lightbox} 
          onClose={closeLightbox} 
        />
      )}
      
      <section className="overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white relative">
        {/* Tech grid background */}
        <div className="absolute inset-0 tech-grid opacity-30"></div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-32 h-32 bg-cyan-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-blue-400 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-12 md:grid-cols-none gap-x-8">
            {/* Scattered Polaroid Photos - Left Side */}
            <div className="col-start-1 col-end-8 py-12 xl:col-end-7 md:col-auto md:py-8">
              <div className="scattered-photos-3d relative">
                {/* Photo 1 - Top Left */}
                <PolaroidPhoto3D
                  src="https://www.dmoe.cc/random.php?5"
                  alt="角色建模"
                  className="absolute top-4 left-8 w-48 md:w-36 sm:w-32"
                  style={{ transform: 'rotate(8deg)' }}
                  delay={200}
                  onClick={() => openLightbox("https://www.dmoe.cc/random.php?5", "角色建模")}
                />
                
                {/* Photo 2 - Top Right */}
                <PolaroidPhoto3D
                  src="https://www.dmoe.cc/random.php?6"
                  alt="场景渲染"
                  className="absolute top-16 right-4 w-52 md:w-38 sm:w-34"
                  style={{ transform: 'rotate(-12deg)' }}
                  delay={400}
                  onClick={() => openLightbox("https://www.dmoe.cc/random.php?6", "场景渲染")}
                />
                
                {/* Photo 3 - Middle Left */}
                <PolaroidPhoto3D
                  src="https://www.dmoe.cc/random.php?7"
                  alt="材质贴图"
                  className="absolute top-56 left-4 w-44 md:w-34 sm:w-30"
                  style={{ transform: 'rotate(-5deg)' }}
                  delay={600}
                  onClick={() => openLightbox("https://www.dmoe.cc/random.php?7", "材质贴图")}
                />
                
                {/* Photo 4 - Bottom Center */}
                <PolaroidPhoto3D
                  src="https://www.dmoe.cc/random.php?8"
                  alt="动画绑定"
                  className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-56 md:w-40 sm:w-36"
                  style={{ transform: 'translateX(-50%) rotate(15deg)' }}
                  delay={800}
                  onClick={() => openLightbox("https://www.dmoe.cc/random.php?8", "动画绑定")}
                />
                
                {/* Photo 5 - Center Background */}
                <PolaroidPhoto3D
                  src="https://www.dmoe.cc/random.php?12"
                  alt="环境设计"
                  className="absolute top-40 left-1/3 w-36 md:w-28 sm:w-24 opacity-70"
                  style={{ transform: 'rotate(2deg)', zIndex: -1 }}
                  delay={1000}
                  onClick={() => openLightbox("https://www.dmoe.cc/random.php?12", "环境设计")}
                />
              </div>
            </div>
            
            {/* Text Content - Right Side */}
            <div className="col-start-8 col-end-13 py-24 xl:col-start-7 md:col-auto md:pb-0 md:pt-16">
              <div className="w-fit rounded-full py-2 px-4 text-xs font-medium uppercase leading-none tracking-wider text-cyan-300 bg-cyan-400/10 backdrop-blur-sm border border-cyan-400/30">
                🚀 3D Modeling
              </div>
              <h2 className="mt-6 text-9xl font-bold leading-none xl:text-8xl md:text-7xl sm:text-6xl relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 relative">
                  3D 建模
                  <span className="absolute inset-0 text-cyan-300 -z-10 translate-x-3 translate-y-3 opacity-30">3D 建模</span>
                </span><br />
                <span className="text-gray-200">服务</span>
              </h2>
              <p className="mt-8 text-lg leading-relaxed xl:text-base md:mt-6 text-gray-300">
                专业的3D建模团队，提供高质量虚拟角色与场景建模服务，从概念设计到完整3D模型制作，满足动画、游戏和虚拟演出需求。
              </p>
              <div className="mt-8 space-y-4 xl:mt-6 md:mt-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 shadow-sm shadow-cyan-400/50"></div>
                  <span className="text-gray-300">虚拟角色建模与绑定</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 shadow-sm shadow-blue-400/50"></div>
                  <span className="text-gray-300">场景环境与道具制作</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 shadow-sm shadow-purple-400/50"></div>
                  <span className="text-gray-300">纹理材质与光照设置</span>
                </div>
              </div>
              <a className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-full transition-all duration-300 hover:from-cyan-600 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 mt-8 xl:mt-6 md:mt-4" href="#">
                了解建模服务
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
      </section>
    </>
  );
}
