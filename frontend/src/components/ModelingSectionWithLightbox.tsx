'use client';

import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import '../styles/lightbox.css';
import { getAssetPath } from '../utils/assetPath';

interface Model {
  id: number;
  title: string;
  image: string;
}

const modelsData = [
  { id: 1, title: '3D作品 1', imagePath: '/images/modeling/model1.jpg' },
  { id: 2, title: '3D作品 2', imagePath: '/images/modeling/model2.jpg' },
  { id: 3, title: '3D作品 3', imagePath: '/images/modeling/model3.jpg' },
  { id: 4, title: '3D作品 4', imagePath: '/images/modeling/model4.jpg' },
  { id: 5, title: '3D作品 5', imagePath: '/images/modeling/model5.jpg' },
  { id: 6, title: '3D作品 6', imagePath: '/images/modeling/model6.jpg' },
  { id: 7, title: '3D作品 7', imagePath: '/images/modeling/model7.jpg' },
  { id: 8, title: '3D作品 8', imagePath: '/images/modeling/model8.jpg' },
];

// Generate models with proper paths
const models: Model[] = modelsData.map(item => ({
  ...item,
  image: getAssetPath(item.imagePath)
}));

const PolaroidPhoto = ({ model, onClick, index }: { model: Model; onClick: () => void; index: number }) => {
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
        <img src={model.image} alt={model.title} />
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

export default function ModelingSectionWithLightbox() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const lightboxImages = models.map(model => ({
    src: model.image,
    alt: model.title,
  }));

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="modeling-section">
      <div className="container">
        <div className="grid grid-cols-12 gap-x-16 w-full max-w-7xl mx-auto items-center min-h-screen">
          {/* Text Content - Left Side */}
          <div className="col-start-1 col-end-6 flex flex-col justify-center">
            <h2 className="text-[clamp(4rem,12vw,8rem)] font-bold leading-none text-center">
              <span className="text-black relative">
                3D建模服务
                <span className="absolute inset-0 text-cyan-400 -z-10 translate-x-4 translate-y-4 opacity-60">3D建模服务</span>
              </span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-gray-700 text-center max-w-lg mx-auto">
              专业的3D建模团队，将电脑商品与场景建模服务，从概念设计到游戏和动画制作，我们提供不同类型的创新。我们致力于不同类型和规模的创作，能够提供无论是传统的艺术设计、复杂的场景环境建模还是高品质的材质。
            </p>
          </div>
          
          {/* Scattered Polaroid Photos - Right Side */}
          <div className="col-start-7 col-end-13 flex items-center justify-center">
            <div className="scattered-photos relative w-full h-[500px]">
              {models.slice(0, 5).map((model, index) => {
                const positions = [
                  { left: '8%', top: '8%', rotation: 8 },
                  { left: '16%', top: '16%', rotation: -12 },
                  { left: '64%', top: '8%', rotation: -5 },
                  { left: '12%', top: '40%', rotation: 15 },
                  { left: '33%', top: '40%', rotation: 2 },
                ];
                const pos = positions[index];
                
                return (
                  <div
                    key={model.id}
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
                      <img src={model.image} alt={model.title} />
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
        .modeling-section {
          min-height: 40vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
          position: relative;
          overflow: hidden;
          padding: 50px 0;
        }

        .modeling-section::before {
          content: '';
          position: absolute;
          top: 20%;
          left: -10%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(40px);
        }

        .modeling-section::after {
          content: '';
          position: absolute;
          bottom: 10%;
          right: -5%;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%);
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
            8px 8px 0px #06b6d4,
            16px 16px 0px #a855f7;
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
          background: rgba(6, 182, 212, 0.6);
          border-radius: 4px;
        }

        .polaroid-container::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.8);
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2.5rem;
            text-shadow: 
              4px 4px 0px #06b6d4,
              8px 8px 0px #a855f7;
          }
          
          .modeling-section {
            min-height: 35vh;
            padding: 30px 0;
          }
        }
      `}</style>
    </section>
  );
}
