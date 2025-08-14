'use client';

import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import '../styles/lightbox.css';
import { getAssetPath } from '../utils/assetPath';

interface Artwork {
  id: number;
  title: string;
  image: string;
}

const artworksData = [
  { id: 1, title: '绘画作品 1', imagePath: '/images/artworks/artwork1.jpg' },
  { id: 2, title: '绘画作品 2', imagePath: '/images/artworks/artwork2.jpg' },
  { id: 3, title: '绘画作品 3', imagePath: '/images/artworks/artwork3.jpg' },
  { id: 4, title: '绘画作品 4', imagePath: '/images/artworks/artwork4.jpg' },
  { id: 5, title: '绘画作品 5', imagePath: '/images/artworks/artwork5.jpg' },
  { id: 6, title: '绘画作品 6', imagePath: '/images/artworks/artwork6.jpg' },
  { id: 7, title: '绘画作品 7', imagePath: '/images/artworks/artwork7.jpg' },
  { id: 8, title: '绘画作品 8', imagePath: '/images/artworks/artwork8.jpg' },
];

// Generate artworks with proper paths
const artworks: Artwork[] = artworksData.map(item => ({
  ...item,
  image: getAssetPath(item.imagePath)
}));

const PolaroidPhoto = ({ artwork, onClick, index }: { artwork: Artwork; onClick: () => void; index: number }) => {
  const rotations = [-8, 5, -3, 12, -5, 8, -10, 3];
  
  return (
    <div
      className="polaroid-photo"
      style={{
        transform: `rotate(${rotations[index % rotations.length]}deg)`,
        animationDelay: `${index * 0.1}s`,
      }}
      onClick={onClick}
    >
      <div className="polaroid-frame">
        <img src={artwork.image} alt={artwork.title} />
      </div>

      <style jsx>{`
        .polaroid-photo {
          width: 200px;
          height: 240px;
          background: white;
          padding: 15px 15px 45px 15px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
          transform-origin: center;
          flex-shrink: 0;
        }

        .polaroid-photo:hover {
          transform: rotate(0deg) scale(1.05);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
          z-index: 10;
        }

        .polaroid-frame {
          width: 100%;
          height: 170px;
          overflow: hidden;
          background: #f8f8f8;
        }

        .polaroid-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) rotate(var(--initial-rotation));
          }
          to {
            opacity: 1;
            transform: translateY(0) rotate(var(--initial-rotation));
          }
        }
      `}</style>
    </div>
  );
};

export default function ArtworksSectionWithLightbox() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const lightboxImages = artworks.map(artwork => ({
    src: artwork.image,
    alt: artwork.title,
  }));

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="artworks-section">
      <div className="container">
        <div className="grid grid-cols-12 gap-x-16 w-full max-w-7xl mx-auto items-center min-h-screen">
          {/* Text Content - Left Side */}
          <div className="col-start-1 col-end-6 flex flex-col justify-center">
            <h2 className="text-[clamp(4rem,12vw,8rem)] font-bold leading-none text-center">
              <span className="text-black relative">
                绘画作品展示
                <span className="absolute inset-0 text-blue-400 -z-10 translate-x-4 translate-y-4 opacity-60">绘画作品展示</span>
              </span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-gray-700 text-center max-w-lg mx-auto">
              精选二次元风格绘画作品，融合传统艺术与现代数字创作技术，展现独特的艺术视觉魅力和创意表达。我们专业的绘画团队致力于角色设计、场景插画和数字艺术创作。
            </p>
          </div>
          
          {/* Scattered Polaroid Photos - Right Side */}
          <div className="col-start-7 col-end-13 flex items-center justify-center">
            <div className="scattered-photos relative w-full h-[500px]">
              {artworks.slice(0, 5).map((artwork, index) => {
                const positions = [
                  { left: '5%', top: '20%', rotation: -8 },
                  { left: '25%', top: '40%', rotation: 5 },
                  { left: '45%', top: '15%', rotation: -3 },
                  { left: '65%', top: '35%', rotation: 12 },
                  { left: '80%', top: '25%', rotation: -5 },
                ];
                const pos = positions[index];
                
                return (
                  <div
                    key={artwork.id}
                    className="polaroid-photo"
                    style={{
                      position: 'absolute',
                      left: pos.left,
                      top: pos.top,
                      transform: `rotate(${pos.rotation}deg)`,
                      animationDelay: `${index * 0.2}s`,
                    }}
                    onClick={() => openLightbox(index)}
                  >
                    <div className="polaroid-frame">
                      <img src={artwork.image} alt={artwork.title} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxImages}
          index={currentImageIndex}
          styles={{
            container: { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
          }}
        />
      )}

      <style jsx>{`
        .artworks-section {
          min-height: 40vh;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f4c75 100%);
          position: relative;
          overflow: hidden;
          padding: 50px 0;
        }

        .artworks-section::before {
          content: '';
          position: absolute;
          top: 20%;
          left: -10%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(139, 69, 196, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(40px);
        }

        .artworks-section::after {
          content: '';
          position: absolute;
          bottom: 10%;
          right: -5%;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(30px);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }

        .section-title {
          font-size: 4rem;
          font-weight: 900;
          text-align: center;
          margin-bottom: 30px;
          color: #000000;
          text-shadow: 
            8px 8px 0px #3b82f6,
            16px 16px 0px #8b45c4;
          letter-spacing: 2px;
        }

        .polaroid-container {
          display: flex;
          justify-content: center;
          width: 100%;
          overflow-x: auto;
          padding: 20px 0;
        }

        .polaroid-scroll {
          display: flex;
          gap: 30px;
          padding: 0 20px;
          align-items: center;
          min-width: max-content;
        }

        .polaroid-container::-webkit-scrollbar {
          height: 8px;
        }

        .polaroid-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .polaroid-container::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.6);
          border-radius: 4px;
        }

        .polaroid-container::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.8);
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2.5rem;
            text-shadow: 
              4px 4px 0px #3b82f6,
              8px 8px 0px #8b45c4;
          }
          
          .artworks-section {
            min-height: 35vh;
            padding: 30px 0;
          }
        }
      `}</style>
    </section>
  );
}
