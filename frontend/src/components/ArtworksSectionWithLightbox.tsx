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
        '--initial-rotation': `${rotations[index % rotations.length]}deg`,
        transform: `rotate(${rotations[index % rotations.length]}deg)`,
        animationDelay: `${index * 0.1}s`,
      } as React.CSSProperties}
      onClick={onClick}
    >
      <div className="polaroid-frame">
        <img src={artwork.image} alt={artwork.title} />
      </div>
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
      <div className="container max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-20">
          {/* Left Side - Title and Description */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <div className="inline-block mb-4">
                <span className="text-sm font-medium uppercase tracking-wider text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                  ✨ Artwork Gallery
                </span>
              </div>
              
              <h2 className="text-7xl lg:text-8xl font-black leading-tight text-black mb-6">
                <span className="relative">
                  绘画作品
                  <span className="absolute inset-0 text-blue-400 -z-10 translate-x-3 translate-y-3 opacity-30">绘画作品</span>
                </span>
                <br />
                <span className="text-6xl lg:text-7xl text-gray-600">展示</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-lg leading-relaxed text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">精选二次元风格绘画作品</span>，融合传统艺术与现代数字创作技术，展现独特的艺术视觉魅力和创意表达。
              </p>
              
              <p>
                我们专业的绘画团队致力于<span className="text-blue-600 font-medium">角色设计、场景插画和数字艺术创作</span>，每一幅作品都蕴含着丰富的情感和故事。
              </p>
              
              <p>
                从概念草图到最终渲染，我们用心雕琢每一个细节，为您带来<span className="text-purple-600 font-medium">视觉盛宴</span>。
              </p>
            </div>
            
            <div className="flex items-center space-x-4 pt-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <span className="text-sm text-gray-500 font-medium">点击照片查看大图</span>
            </div>
          </div>
          
          {/* Right Side - Photo Wall */}
          <div className="relative">
            <div className="scattered-photos relative w-full h-[800px]">
              {artworks.slice(0, 6).map((artwork, index) => {
                const positions = [
                  { left: '5%', top: '5%', rotation: -8, scale: 0.9 },
                  { left: '40%', top: '0%', rotation: 12, scale: 1.0 },
                  { left: '70%', top: '15%', rotation: -5, scale: 0.85 },
                  { left: '10%', top: '40%', rotation: 15, scale: 1.1 },
                  { left: '45%', top: '45%', rotation: -10, scale: 0.95 },
                  { left: '75%', top: '60%', rotation: 8, scale: 1.0 },
                ];
                const pos = positions[index];
                
                return (
                  <div
                    key={artwork.id}
                    className="polaroid-photo-large"
                    style={{
                      position: 'absolute',
                      left: pos.left,
                      top: pos.top,
                      transform: `rotate(${pos.rotation}deg) scale(${pos.scale})`,
                      animationDelay: `${index * 0.15}s`,
                    }}
                    onClick={() => openLightbox(index)}
                  >
                    <div className="polaroid-frame-large">
                      <img src={artwork.image} alt={artwork.title} />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                  </div>
                );
              })}
              
              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-20 left-5 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/2 right-5 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
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
          background: #ffffff;
          position: relative;
          overflow: hidden;
          padding: 80px 0;
        }

        .artworks-section::before {
          content: '';
          position: absolute;
          top: 10%;
          left: -5%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(50px);
        }

        .artworks-section::after {
          content: '';
          position: absolute;
          bottom: 10%;
          right: -5%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(139, 69, 196, 0.05) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(40px);
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
