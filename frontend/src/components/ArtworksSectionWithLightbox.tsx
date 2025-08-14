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
  const { lightboxState, openLightbox, closeLightbox } = useLightbox();

  return (
    <>
      {/* Lightbox Modal */}
      <ImageLightbox 
        lightboxState={lightboxState}
        onClose={closeLightbox}
        theme="light"
      />
      
      <div className="scattered-photos relative w-full h-[500px]">
        {/* Photo 1 - Top Left */}
        <PolaroidPhoto
          src="/images/artworks/artwork1.jpg"
          alt="绘画作品 1"
          className="absolute top-4 left-8 w-72 md:w-56 sm:w-48"
          style={{ transform: 'rotate(-8deg)' }}
          delay={100}
          onClick={() => openLightbox("/images/artworks/artwork1.jpg", "绘画作品 1")}
        />
        
        {/* Photo 2 - Top Right */}
        <PolaroidPhoto
          src="/images/artworks/artwork2.jpg"
          alt="绘画作品 2"
          className="absolute top-12 right-8 w-76 md:w-60 sm:w-52"
          style={{ transform: 'rotate(12deg)' }}
          delay={300}
          onClick={() => openLightbox("/images/artworks/artwork2.jpg", "绘画作品 2")}
        />
        
        {/* Photo 3 - Middle Left */}
        <PolaroidPhoto
          src="/images/artworks/artwork3.jpg"
          alt="绘画作品 3"
          className="absolute top-60 left-12 w-68 md:w-54 sm:w-46"
          style={{ transform: 'rotate(3deg)' }}
          delay={500}
          onClick={() => openLightbox("/images/artworks/artwork3.jpg", "绘画作品 3")}
        />
        
        {/* Photo 4 - Bottom Right */}
        <PolaroidPhoto
          src="/images/artworks/artwork4.jpg"
          alt="绘画作品 4"
          className="absolute bottom-16 right-12 w-64 md:w-52 sm:w-44"
          style={{ transform: 'rotate(-15deg)' }}
          delay={700}
          onClick={() => openLightbox("/images/artworks/artwork4.jpg", "绘画作品 4")}
        />
        
        {/* Photo 5 - Center (partially hidden) */}
        <PolaroidPhoto
          src="/images/artworks/artwork5.jpg"
          alt="绘画作品 5"
          className="absolute top-36 left-1/2 transform -translate-x-1/2 w-60 md:w-48 sm:w-40 opacity-75"
          style={{ transform: 'translateX(-50%) rotate(-2deg)', zIndex: -1 }}
          delay={900}
          onClick={() => openLightbox("/images/artworks/artwork5.jpg", "绘画作品 5")}
        />
      </div>
    </>
  );
};
