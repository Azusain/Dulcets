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
        '--initial-rotation': `${rotations[index % rotations.length]}deg`,
        transform: `rotate(${rotations[index % rotations.length]}deg)`,
        animationDelay: `${index * 0.1}s`,
      } as React.CSSProperties}
      onClick={onClick}
    >
      <div className="polaroid-frame">
        <img src={model.image} alt={model.title} />
      </div>
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
      <div className="container max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-20">
          {/* Left Side - Title and Description */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <div className="inline-block mb-4">
                <span className="text-sm font-medium uppercase tracking-wider text-cyan-600 bg-cyan-50 px-4 py-2 rounded-full">
                  🎯 3D Studio
                </span>
              </div>
              
              <h2 className="text-7xl lg:text-8xl font-black leading-tight text-black mb-6">
                <span className="relative">
                  3D建模
                  <span className="absolute inset-0 text-cyan-400 -z-10 translate-x-3 translate-y-3 opacity-30">3D建模</span>
                </span>
                <br />
                <span className="text-6xl lg:text-7xl text-gray-600">服务</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-lg leading-relaxed text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">专业的3D建模团队</span>，从概念设计到游戏动画制作，为您提供全方位的三维内容创作解决方案。
              </p>
              
              <p>
                我们精通<span className="text-cyan-600 font-medium">角色建模、场景构建、材质渲染和动画制作</span>，无论是游戏资产、建筑可视化还是产品展示，都能为您带来震撼的视觉效果。
              </p>
              
              <p>
                运用最新的3D技术和工具，我们将您的创意转化为<span className="text-purple-600 font-medium">栩栩如生的三维世界</span>。
              </p>
            </div>
            
            <div className="flex items-center space-x-4 pt-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
              <span className="text-sm text-gray-500 font-medium">点击作品浏览详情</span>
            </div>
          </div>
          
          {/* Right Side - Photo Wall */}
          <div className="relative">
            <div className="scattered-photos relative w-full h-[800px]">
              {models.slice(0, 6).map((model, index) => {
                const positions = [
                  { left: '8%', top: '8%', rotation: 10, scale: 0.95 },
                  { left: '42%', top: '2%', rotation: -8, scale: 1.05 },
                  { left: '72%', top: '18%', rotation: 12, scale: 0.9 },
                  { left: '12%', top: '45%', rotation: -12, scale: 1.1 },
                  { left: '48%', top: '50%', rotation: 6, scale: 0.85 },
                  { left: '75%', top: '65%', rotation: -9, scale: 1.0 },
                ];
                const pos = positions[index];
                
                return (
                  <div
                    key={model.id}
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
                      <img src={model.image} alt={model.title} />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                  </div>
                );
              })}
              
              {/* Decorative elements */}
              <div className="absolute top-12 right-8 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-24 left-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }}></div>
              <div className="absolute top-1/3 right-12 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1.2s' }}></div>
              
              {/* Tech grid overlay */}
              <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none"></div>
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
          background: #f8f9fa;
          position: relative;
          overflow: hidden;
          padding: 80px 0;
        }

        .modeling-section::before {
          content: '';
          position: absolute;
          top: 15%;
          left: -5%;
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(45px);
        }

        .modeling-section::after {
          content: '';
          position: absolute;
          bottom: 15%;
          right: -5%;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(35px);
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
