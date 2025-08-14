"use client";

import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "../styles/lightbox.css";

// Hook for managing lightbox state with yet-another-react-lightbox
export const useLightbox = () => {
  const [lightboxState, setLightboxState] = useState({
    open: false,
    index: 0,
    slides: [] as Array<{ src: string; alt?: string }>
  });
  
  const openLightbox = (src: string, alt: string = '') => {
    setLightboxState({
      open: true,
      index: 0,
      slides: [{ src, alt }]
    });
  };
  
  const closeLightbox = () => {
    setLightboxState(prev => ({ ...prev, open: false }));
  };

  return { lightboxState, openLightbox, closeLightbox };
};

// Loading spinner component
const LoadingSpinner = ({ theme }: { theme: 'light' | 'dark' }) => (
  <div className="flex items-center justify-center h-full">
    <div className="relative">
      <div className={`w-12 h-12 border-4 border-solid rounded-full animate-spin ${
        theme === 'dark' 
          ? 'border-cyan-400/30 border-t-cyan-400' 
          : 'border-white/30 border-t-white'
      }`}></div>
      <div className={`absolute inset-0 flex items-center justify-center text-sm font-medium ${
        theme === 'dark' ? 'text-cyan-300' : 'text-white/80'
      }`}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </div>
    <p className={`ml-4 text-lg ${
      theme === 'dark' 
        ? 'text-cyan-300 font-mono' 
        : 'text-white/80'
    }`}>
      Loading image...
    </p>
  </div>
);

// Custom image component with loading state
const LightboxImage = ({ src, alt, theme }: { src: string; alt?: string; theme: 'light' | 'dark' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0">
          <LoadingSpinner theme={theme} />
        </div>
      )}
      
      {hasError ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className={`p-8 rounded-lg border-2 border-dashed ${
            theme === 'dark' 
              ? 'border-cyan-400/50 bg-gray-800/50' 
              : 'border-white/50 bg-black/50'
          }`}>
            <svg className={`w-16 h-16 mx-auto mb-4 ${
              theme === 'dark' ? 'text-cyan-300' : 'text-white/60'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className={`text-lg font-medium ${
              theme === 'dark' ? 'text-cyan-300' : 'text-white/80'
            }`}>
              Failed to load image
            </p>
            <p className={`text-sm mt-2 ${
              theme === 'dark' ? 'text-cyan-200/70' : 'text-white/60'
            }`}>
              The image could not be loaded
            </p>
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt || ''}
          className={`max-w-full max-h-[85vh] object-contain transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${
            theme === 'dark' 
              ? 'border-2 border-cyan-400/50 rounded-lg shadow-2xl shadow-cyan-500/20' 
              : 'rounded-lg shadow-2xl'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(false);
          }}
        />
      )}
      
      {isLoaded && alt && (
        <p className={`mt-4 text-lg font-medium ${
          theme === 'dark' 
            ? 'text-cyan-300 font-mono font-semibold tracking-wide' 
            : 'text-white/80'
        }`}>
          {alt}
        </p>
      )}
    </div>
  );
};

// Lightbox component wrapper
export const ImageLightbox = ({ 
  lightboxState, 
  onClose, 
  theme = 'light' 
}: {
  lightboxState: { open: boolean; index: number; slides: Array<{ src: string; alt?: string }> };
  onClose: () => void;
  theme?: 'light' | 'dark';
}) => {
  return (
    <Lightbox
      open={lightboxState.open}
      close={onClose}
      slides={lightboxState.slides}
      index={lightboxState.index}
      styles={{
        container: {
          backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.95)' : 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(8px)'
        }
      }}
      render={{
        slide: ({ slide }) => (
          <LightboxImage 
            src={slide.src} 
            alt={slide.alt} 
            theme={theme}
          />
        )
      }}
    />
  );
};
