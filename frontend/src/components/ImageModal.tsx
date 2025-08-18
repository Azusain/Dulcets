'use client';

import { useEffect } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  title: string;
  onClose: () => void;
}

export default function ImageModal({ isOpen, imageUrl, title, onClose }: ImageModalProps) {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60000] flex items-center justify-center bg-black bg-opacity-80">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative z-10 max-w-[90vw] max-h-[90vh] p-4 flex flex-col items-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-20 bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
          aria-label="Close image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Image container */}
        <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden max-w-full max-h-full">
          <img
            src={imageUrl}
            alt={title}
            className="max-w-full max-h-[80vh] object-contain block"
            onError={(e) => {
              e.currentTarget.src = '/images/logo_no_background.png';
            }}
            style={{ margin: '0 auto' }}
          />
          
          {/* Image title overlay */}
          {title && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent bg-opacity-70 text-white p-4">
              <h3 className="text-lg font-medium text-center">{title}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
