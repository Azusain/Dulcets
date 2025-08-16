"use client";
import React from "react";

interface WhyChooseUsSectionProps {
  t: (key: string) => string;
}

const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ t }) => {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Night sky gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
      
      {/* Subtle stars */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-1 h-1 bg-cyan-300 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-20 right-20 w-0.5 h-0.5 bg-blue-200 rounded-full animate-pulse delay-1000 opacity-60"></div>
        <div className="absolute bottom-20 left-1/4 w-0.5 h-0.5 bg-indigo-200 rounded-full animate-pulse delay-500 opacity-50"></div>
        <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-cyan-200 rounded-full animate-pulse delay-700 opacity-60"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="text-sm font-medium uppercase tracking-wider text-cyan-300 bg-slate-800/50 backdrop-blur-sm px-6 py-2 rounded-full border border-cyan-300/30">
              {t("about.why_choose_us.subtitle")}
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-6 tracking-wide">
            {t("about.why_choose_us.title")}
          </h2>
          
          <div className="mx-auto w-16 h-0.5 bg-cyan-400 mb-4 shadow-sm shadow-cyan-400/50"></div>
        </div>

        {/* Vibrant Color Block Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            'custom_music',
            'comprehensive_support', 
            'diverse_vocals',
            'multilingual',
            'cross_media'
          ].map((feature, index) => {
            const colorSchemes = [
              {
                bg: 'from-cyan-500 to-blue-600',
                accent: 'bg-cyan-400',
                text: 'text-cyan-100',
                border: 'border-cyan-400/30'
              },
              {
                bg: 'from-indigo-500 to-purple-600', 
                accent: 'bg-indigo-400',
                text: 'text-indigo-100',
                border: 'border-indigo-400/30'
              },
              {
                bg: 'from-purple-500 to-pink-600',
                accent: 'bg-purple-400',
                text: 'text-purple-100',
                border: 'border-purple-400/30'
              },
              {
                bg: 'from-blue-500 to-cyan-600',
                accent: 'bg-blue-400',
                text: 'text-blue-100',
                border: 'border-blue-400/30'
              },
              {
                bg: 'from-teal-500 to-cyan-600',
                accent: 'bg-teal-400',
                text: 'text-teal-100',
                border: 'border-teal-400/30'
              }
            ][index];
            
            return (
              <div 
                key={feature}
                className={`group relative bg-gradient-to-br ${colorSchemes.bg} p-6 rounded-xl border ${colorSchemes.border} hover:scale-105 hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-2xl`}
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Glowing effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colorSchemes.bg} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl blur-xl`}></div>
                
                {/* Star accent */}
                <div className={`absolute -top-2 -right-2 w-4 h-4 ${colorSchemes.accent} rounded-full flex items-center justify-center`}>
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                </div>
                
                {/* Number badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-10 h-10 ${colorSchemes.accent} rounded-lg flex items-center justify-center text-slate-900 text-lg font-bold shadow-lg`}>
                    {index + 1}
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-white mb-4 leading-tight">
                    {t(`about.why_choose_us.features.${feature}.title`)}
                  </h3>
                  
                  {/* Accent line */}
                  <div className={`w-12 h-1 ${colorSchemes.accent} rounded-full mb-4 shadow-sm`}></div>
                  
                  <p className={`${colorSchemes.text} text-sm leading-relaxed opacity-90`}>
                    {t(`about.why_choose_us.features.${feature}.description`)}
                  </p>
                </div>
                
                {/* Bottom glow effect */}
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 ${colorSchemes.accent} opacity-50 blur-sm group-hover:opacity-100 transition-opacity duration-500`}></div>
              </div>
            );
          })}
        </div>
        
        {/* Bottom accent */}
        <div className="flex justify-center mt-16">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-600"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
