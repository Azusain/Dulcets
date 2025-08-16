"use client";
import React from "react";
import { useAssetPath } from "@/hooks/useAssetPath";

interface WhyChooseUsSectionProps {
  t: (key: string) => string;
}

const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ t }) => {
  const { getAssetPath } = useAssetPath();
  
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Clean dark background */}
      <div className="absolute inset-0 bg-slate-900"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="text-sm font-medium uppercase tracking-wider text-white/60 px-6 py-2">
              {t("about.why_choose_us.subtitle")}
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-6 tracking-wide">
            {t("about.why_choose_us.title")}
          </h2>
          
          <div className="mx-auto w-16 h-0.5 bg-white/30 mb-4"></div>
        </div>

        {/* Manga-style diagonal panel layout */}
        <div className="relative h-96 w-full overflow-hidden">
          {[
            'custom_music',
            'comprehensive_support', 
            'diverse_vocals',
            'multilingual',
            'cross_media'
          ].map((feature, index) => {
            const images = [
              'custom-music.jpg',
              'comprehensive-support.jpg',
              'diverse-vocals.jpg',
              'multilingual.jpg',
              'cross-media.jpg'
            ];
            
            // Define manga-style panel shapes using clip-path
            const panelShapes = [
              'polygon(0% 0%, 25% 0%, 30% 100%, 0% 100%)', // Panel 1 - left trapezoid
              'polygon(25% 0%, 45% 0%, 55% 100%, 30% 100%)', // Panel 2 - narrow middle
              'polygon(45% 0%, 65% 0%, 70% 100%, 55% 100%)', // Panel 3 - center
              'polygon(65% 0%, 85% 0%, 90% 100%, 70% 100%)', // Panel 4 - right middle
              'polygon(85% 0%, 100% 0%, 100% 100%, 90% 100%)' // Panel 5 - right trapezoid
            ];
            
            return (
              <div 
                key={feature}
                className="group absolute inset-0 transition-all duration-500 hover:z-10"
                style={{
                  clipPath: panelShapes[index],
                  animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Background image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('${getAssetPath(`/images/advantages/${images[index]}`)}')`,
                  }}
                ></div>
                
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-colors duration-500"></div>
                
                {/* White diagonal separators */}
                {index < 4 && (
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-white/30 z-20"
                    style={{
                      right: index === 0 ? '75%' : index === 1 ? '55%' : index === 2 ? '35%' : '15%'
                    }}
                  ></div>
                )}
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-center items-center p-4 text-center">
                  <div className="transform transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105">
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight drop-shadow-lg">
                      {t(`about.why_choose_us.features.${feature}.title`)}
                    </h3>
                    
                    {/* Simple white accent line */}
                    <div className="w-8 h-0.5 bg-white/60 mb-2 mx-auto"></div>
                    
                    <p className="text-white/90 text-xs leading-relaxed drop-shadow-md max-w-24">
                      {t(`about.why_choose_us.features.${feature}.description`)}
                    </p>
                  </div>
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
        
        {/* Simple bottom accent */}
        <div className="flex justify-center mt-16">
          <div className="w-16 h-0.5 bg-white/30"></div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
