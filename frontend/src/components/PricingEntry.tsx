"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Import service images
import vocalMixingImg from "../img/services/vocal-mixing.jpg";
import mixingMasteringImg from "../img/services/mixing-mastering.jpg";
import musicProductionImg from "../img/services/music-production.jpg";

const PricingEntry: React.FC = () => {
  const router = useRouter();
  
  // Service cards data - 3 main services from pricing table
  const services = [
    {
      id: 0,
      title: "歌ってみた Mix & Mastering",
      subtitle: "Vocal Mix & Mastering",
      price: "¥8,000~",
      description: "歌ってみた音源のミックス・マスタリング",
      image: vocalMixingImg
    },
    {
      id: 1,
      title: "Mix & Mastering",
      subtitle: "Instrumental Mix & Mastering", 
      price: "¥30,000~",
      description: "楽器トラックのミックス・マスタリング",
      image: mixingMasteringImg
    },
    {
      id: 2,
      title: "楽曲制作",
      subtitle: "Music Production",
      price: "¥50,000~",
      description: "オリジナル楽曲・BGM・アレンジ制作",
      image: musicProductionImg
    }
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleViewDetails = () => {
    // Get current language from URL path
    const currentPath = window?.location?.pathname || '/';
    let targetPath = '/pricing';
    
    if (currentPath.startsWith('/en')) {
      targetPath = '/en/pricing';
    } else if (currentPath.startsWith('/jp')) {
      targetPath = '/jp/pricing';
    } else if (currentPath.startsWith('/zh')) {
      targetPath = '/zh/pricing';
    }
    
    router.push(targetPath);
  };

  return (
    <div className="w-full py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-8">
        {/* Title and Description Section */}
        <div className="mb-16">
          <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">音楽制作サービス</h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl drop-shadow">
            プロフェッショナルな音楽制作から歌ってみたまで、<br />
            あらゆるニーズにお応えします。ホバーして詳細をご確認ください。
          </p>
        </div>
        
        {/* Japanese-inspired Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={handleViewDetails}
            >
              {/* Service Number Badge */}
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white/60 text-sm font-mono mr-3">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="h-px bg-white/20 flex-1 group-hover:bg-white/40 transition-colors duration-500"></div>
              </div>
              
              {/* Service Content */}
              <div className="space-y-6">
                {/* Title Section */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-white/90 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/60 text-sm font-light tracking-wide">
                    {service.subtitle}
                  </p>
                </div>
                
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-500"></div>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                  />
                  
                  {/* Subtle frame */}
                  <div className="absolute inset-0 border border-white/10 group-hover:border-white/20 transition-colors duration-500"></div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Price and Description */}
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-light text-white tracking-tight">
                      {service.price}
                    </span>
                    <div className="text-white/40 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      詳細を見る →
                    </div>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>
              </div>
              
              {/* Subtle bottom line animation */}
              <div className="mt-6 h-px bg-white/10">
                <div className="h-full bg-white/30 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Simple Transparent Button */}
        <div className="flex justify-center">
          <button
            onClick={handleViewDetails}
            className="px-8 py-3 border-2 border-white border-opacity-60 text-white bg-transparent hover:bg-white hover:bg-opacity-10 hover:border-opacity-100 transition-all duration-300 font-medium"
          >
            詳細料金表を見る
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingEntry;
