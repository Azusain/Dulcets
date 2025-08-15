'use client';

import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import '../styles/lightbox.css';
import { getAssetPath } from '../utils/assetPath';

interface ModelingSectionProps {
  translations?: Record<string, any>;
}

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

// Helper function to get translation value from translations object
function getTranslation(translations: Record<string, any> | undefined, key: string): string {
  if (!translations) return key;
  
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return the key if path doesn't exist
    }
  }
  
  return typeof value === 'string' ? value : key;
}

export default function ModelingSectionWithLightbox({ translations }: ModelingSectionProps = {}) {
  const t = (key: string) => getTranslation(translations, key);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Determine language for shadow positioning
  const getCurrentLanguage = () => {
    if (!translations) return 'zh';
    
    // Check translation content directly
    const titleMain = getTranslation(translations, 'modeling.title_main');
    const homeText = getTranslation(translations, 'nav.home');
    
    // Japanese: 3Dモデリング
    if (titleMain === '3Dモデリング' || homeText === 'ホーム') {
      return 'jp';
    }
    // English would contain "3D Modeling" or similar
    if ((titleMain && titleMain.toLowerCase().includes('modeling')) || homeText === 'Home') {
      return 'en';
    }
    // Default to Chinese
    return 'zh';
  };
  
  const currentLang = getCurrentLanguage();
  
  // Dynamic shadow offset based on language - use NO shadow for Japanese
  const getShadowOffset = () => {
    switch (currentLang) {
      case 'jp': // Japanese text is longer, hide shadow completely
        return 'opacity-0';
      case 'en': // English text is medium length, increase offset for better visibility
        return 'translate-x-4 translate-y-4 opacity-30';
      default: // Chinese is short
        return 'translate-x-3 translate-y-3 opacity-30';
    }
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 py-20">
          {/* Left Side - Photo Wall (shifted left, 5 columns) */}
          <div className="lg:col-span-5 relative lg:-ml-8">
            <div className="scattered-photos relative w-full h-[800px]">
              {models.slice(0, 6).map((model, index) => {
                const positions = [
                  { left: '0%', top: '8%', rotation: 10, scale: 0.95 },
                  { left: '28%', top: '2%', rotation: -8, scale: 1.05 },
                  { left: '58%', top: '18%', rotation: 12, scale: 0.9 },
                  { left: '3%', top: '45%', rotation: -12, scale: 1.1 },
                  { left: '32%', top: '50%', rotation: 6, scale: 0.85 },
                  { left: '60%', top: '65%', rotation: -9, scale: 1.0 },
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
          
          {/* Right Side - Title and Description (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8 lg:pl-8">
            <div>
              <div className="inline-block mb-4">
                <span className="text-sm font-medium uppercase tracking-wider text-cyan-600 bg-cyan-50 px-4 py-2 rounded-full">
                  {translations ? t("footer.modeling") : "🎯 3D Studio"}
                </span>
              </div>
              
              <h2 className="text-7xl lg:text-8xl font-black leading-tight text-white mb-6">
                <span className="relative">
                  {translations ? t("modeling.title_main") : "3D建模"}
                  <span className={`absolute inset-0 text-cyan-400 -z-10 ${getShadowOffset()}`}>{translations ? t("modeling.title_main") : "3D建模"}</span>
                </span>
                <br />
                <span className="text-6xl lg:text-7xl text-gray-300">{translations ? t("modeling.title_sub") : "服务"}</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-lg leading-relaxed text-gray-300">
              <p>
                {translations ? t("modeling.description") : "专业的3D建模团队，从概念设计到游戏动画制作，为您提供全方位的三维内容创作解决方案。"}
              </p>
              
              <p>
                {translations ? t("modeling.expertise_description") : "我们精通"}<span className="text-cyan-400 font-medium">{translations ? t("modeling.specialties") : "角色建模、场景构建、材质渲染和动画制作"}</span>{translations ? t("modeling.applications_description") : "，无论是游戏资产、建筑可视化还是产品展示，都能为您带来震撼的视觉效果。"}
              </p>
              
              <p>
                {translations ? t("modeling.technology_description") : "运用最新的3D技术和工具，我们将您的创意转化为"}<span className="text-purple-400 font-medium">{translations ? t("modeling.lifelike_world") : "栩栩如生的三维世界"}</span>。
              </p>
            </div>
            
            <div className="flex items-center space-x-4 pt-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
              <span className="text-sm text-gray-400 font-medium">{translations ? t("modeling.click_to_view") : "点击作品浏览详情"}</span>
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
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
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
