"use client";

import { useState, useEffect } from 'react';

// Generic Image Lightbox Component
export const ImageLightbox = ({ src, alt, isOpen, onClose, theme = 'light' }: {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
  theme?: 'light' | 'dark';
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isDark = theme === 'dark';

  return (
    <div 
      className={`fixed inset-0 z-[999999] ${isDark ? 'bg-gray-900/95' : 'bg-black/90'} backdrop-blur-sm flex items-center justify-center p-4`}
      onClick={onClose}
    >
      <div className="relative max-w-7xl max-h-[90vh] w-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute -top-12 right-0 ${isDark ? 'text-cyan-300 hover:text-cyan-400' : 'text-white hover:text-pink-400'} transition-colors duration-200 z-10`}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {isDark ? (
          /* 3D Tech Style */
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
        ) : (
          /* Light Style */
          <img 
            src={src}
            alt={alt}
            className="w-full h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        )}
        
        {/* Image Caption */}
        <div className="absolute -bottom-12 left-0 right-0 text-center">
          <p className={`text-lg font-medium ${isDark ? 'text-cyan-300 font-mono font-semibold tracking-wide' : 'text-white/80'}`}>
            {alt}
          </p>
        </div>
      </div>
    </div>
  );
};

// Hook for managing lightbox state
export const useLightbox = () => {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  
  const openLightbox = (src: string, alt: string) => {
    setLightbox({ src, alt });
  };
  
  const closeLightbox = () => {
    setLightbox(null);
  };

  return { lightbox, openLightbox, closeLightbox };
};
