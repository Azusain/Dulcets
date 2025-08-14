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
  const { lightboxState, openLightbox, closeLightbox } = useLightbox();

  return (
    <>
      {/* Lightbox Modal */}
      <ImageLightbox 
        lightboxState={lightboxState}
        onClose={closeLightbox}
        theme="dark"
      />
      
      <div className="scattered-photos-3d relative w-full h-[500px]">
        {/* Photo 1 - Top Left */}
        <PolaroidPhoto3D
          src="/images/modeling/model1.jpg"
          alt="3D作品 1"
          className="absolute top-8 left-12 w-72 md:w-56 sm:w-48"
          style={{ transform: 'rotate(8deg)' }}
          delay={200}
          onClick={() => openLightbox("/images/modeling/model1.jpg", "3D作品 1")}
        />
        
        {/* Photo 2 - Top Right */}
        <PolaroidPhoto3D
          src="/images/modeling/model2.jpg"
          alt="3D作品 2"
          className="absolute top-16 right-12 w-76 md:w-60 sm:w-52"
          style={{ transform: 'rotate(-12deg)' }}
          delay={400}
          onClick={() => openLightbox("/images/modeling/model2.jpg", "3D作品 2")}
        />
        
        {/* Photo 3 - Middle Left */}
        <PolaroidPhoto3D
          src="/images/modeling/model3.jpg"
          alt="3D作品 3"
          className="absolute top-64 left-8 w-68 md:w-54 sm:w-46"
          style={{ transform: 'rotate(-5deg)' }}
          delay={600}
          onClick={() => openLightbox("/images/modeling/model3.jpg", "3D作品 3")}
        />
        
        {/* Photo 4 - Bottom Center */}
        <PolaroidPhoto3D
          src="/images/modeling/model4.jpg"
          alt="3D作品 4"
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-80 md:w-64 sm:w-52"
          style={{ transform: 'translateX(-50%) rotate(15deg)' }}
          delay={800}
          onClick={() => openLightbox("/images/modeling/model4.jpg", "3D作品 4")}
        />
        
        {/* Photo 5 - Center Background */}
        <PolaroidPhoto3D
          src="/images/modeling/model5.jpg"
          alt="3D作品 5"
          className="absolute top-40 left-1/3 w-60 md:w-48 sm:w-40 opacity-75"
          style={{ transform: 'rotate(2deg)', zIndex: -1 }}
          delay={1000}
          onClick={() => openLightbox("/images/modeling/model5.jpg", "3D作品 5")}
        />
      </div>
    </>
  );
};
