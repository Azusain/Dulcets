"use client";

import { ImageLightbox, useLightbox } from './ImageLightbox';

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

// Scattered 3D photos client component
export const ModelingPhotos = () => {
  const { lightbox, openLightbox, closeLightbox } = useLightbox();

  return (
    <>
      {/* Lightbox Modal */}
      {lightbox && (
        <ImageLightbox 
          src={lightbox.src} 
          alt={lightbox.alt} 
          isOpen={!!lightbox} 
          onClose={closeLightbox}
          theme="dark"
        />
      )}
      
      <div className="scattered-photos-3d relative">
        {/* Photo 1 - Top Left */}
        <PolaroidPhoto3D
          src="https://www.dmoe.cc/random.php?5"
          alt="角色建模"
          className="absolute top-8 left-12 w-64 md:w-48 sm:w-40"
          style={{ transform: 'rotate(8deg)' }}
          delay={200}
          onClick={() => openLightbox("https://www.dmoe.cc/random.php?5", "角色建模")}
        />
        
        {/* Photo 2 - Top Right */}
        <PolaroidPhoto3D
          src="https://www.dmoe.cc/random.php?6"
          alt="场景渲染"
          className="absolute top-20 right-8 w-68 md:w-50 sm:w-42"
          style={{ transform: 'rotate(-12deg)' }}
          delay={400}
          onClick={() => openLightbox("https://www.dmoe.cc/random.php?6", "场景渲染")}
        />
        
        {/* Photo 3 - Middle Left */}
        <PolaroidPhoto3D
          src="https://www.dmoe.cc/random.php?7"
          alt="材质贴图"
          className="absolute top-64 left-8 w-60 md:w-44 sm:w-38"
          style={{ transform: 'rotate(-5deg)' }}
          delay={600}
          onClick={() => openLightbox("https://www.dmoe.cc/random.php?7", "材质贴图")}
        />
        
        {/* Photo 4 - Bottom Center */}
        <PolaroidPhoto3D
          src="https://www.dmoe.cc/random.php?8"
          alt="动画绑定"
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-72 md:w-52 sm:w-44"
          style={{ transform: 'translateX(-50%) rotate(15deg)' }}
          delay={800}
          onClick={() => openLightbox("https://www.dmoe.cc/random.php?8", "动画绑定")}
        />
        
        {/* Photo 5 - Center Background */}
        <PolaroidPhoto3D
          src="https://www.dmoe.cc/random.php?12"
          alt="环境设计"
          className="absolute top-44 left-1/3 w-52 md:w-38 sm:w-32 opacity-70"
          style={{ transform: 'rotate(2deg)', zIndex: -1 }}
          delay={1000}
          onClick={() => openLightbox("https://www.dmoe.cc/random.php?12", "环境设计")}
        />
      </div>
    </>
  );
};
