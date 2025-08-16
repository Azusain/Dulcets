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

        {/* Image-based cards with diagonal separators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0">
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
            
            return (
              <div 
                key={feature}
                className="group relative h-80 overflow-hidden transition-all duration-500 hover:scale-105 hover:z-10"
                style={{
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
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500"></div>
                
                {/* Diagonal separator (except for last item) */}
                {index < 4 && (
                  <div className="absolute -right-6 top-0 bottom-0 w-12 bg-slate-900 transform skew-x-12 z-20"></div>
                )}
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  {/* Number badge */}
                  <div className="absolute top-6 left-6">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-sm font-bold border border-white/30">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="text-xl font-bold text-white mb-3 leading-tight drop-shadow-lg">
                      {t(`about.why_choose_us.features.${feature}.title`)}
                    </h3>
                    
                    {/* Simple white line */}
                    <div className="w-12 h-0.5 bg-white/60 mb-3"></div>
                    
                    <p className="text-white/90 text-sm leading-relaxed drop-shadow-md">
                      {t(`about.why_choose_us.features.${feature}.description`)}
                    </p>
                  </div>
                  
                  {/* Bottom gradient fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                </div>
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
