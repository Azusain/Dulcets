"use client";

import { useEffect, useState } from 'react';

export default function MouseCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Hide cursor when hovering over buttons or links
      const target = e.target as HTMLElement;
      const isButton = target.tagName === 'BUTTON' || target.tagName === 'A' || 
                       target.closest('button') || target.closest('a');
      setIsVisible(!isButton);
    };

    const handleMouseEnter = () => {
      const target = event?.target as HTMLElement;
      const isButton = target?.tagName === 'BUTTON' || target?.tagName === 'A' || 
                       target?.closest('button') || target?.closest('a');
      setIsVisible(!isButton);
    };
    
    const handleMouseLeave = () => setIsVisible(false);

    // Get hero section
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', handleMouseEnter);
      heroSection.addEventListener('mouseleave', handleMouseLeave);
      heroSection.addEventListener('mousemove', updateMousePosition);
    }

    return () => {
      if (heroSection) {
        heroSection.removeEventListener('mouseenter', handleMouseEnter);
        heroSection.removeEventListener('mouseleave', handleMouseLeave);
        heroSection.removeEventListener('mousemove', updateMousePosition);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] mix-blend-difference"
      style={{
        left: mousePosition.x - 30,
        top: mousePosition.y - 30,
        width: '60px',
        height: '60px',
      }}
    >
      <div
        className="w-full h-full border-2 border-white rounded-full transition-transform duration-150 ease-out relative flex items-center justify-center"
        style={{
          transform: 'scale(1)',
          animation: 'cursor-scale 2s ease-in-out infinite',
        }}
      >
        {/* Play button icon in center */}
        <svg 
          className="w-5 h-5 text-white ml-0.5" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>
      <style jsx>{`
        @keyframes cursor-scale {
          0% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
