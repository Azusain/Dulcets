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
    <div className="fixed inset-0 z-[60000] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative z-10 max-w-[90vw] max-h-[90vh] p-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-20"
          aria-label="Close image"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Image */}
        <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="max-w-full max-h-[80vh] object-contain"
            onError={(e) => {
              e.currentTarget.src = '/images/logo_no_background.png';
            }}
          />
          
          {/* Image title */}
          {title && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-3">
              <h3 className="text-lg font-medium">{title}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
