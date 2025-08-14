"use client";

import { ImageLightbox, useLightbox } from './ImageLightbox';

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

// Scattered photos client component
export const ArtworkPhotos = () => {
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
          theme="light"
        />
      )}
      
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
    </>
  );
};
