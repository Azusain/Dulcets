"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Import service images
import vocalMixingImg from "../../public/images/music_production/vocal-mixing.jpg";
import mixingMasteringImg from "../../public/images/music_production/mixing-mastering.jpg";
import musicProductionImg from "../../public/images/music_production/music-production.jpg";

interface MusicProductionSectionProps {
  t: (key: string) => string;
}

const MusicProductionSection: React.FC<MusicProductionSectionProps> = ({ t }) => {
  const router = useRouter();

  // Service cards data - 3 main services from pricing table
  const services = [
    {
      id: 0,
      key: "vocal_mixing",
      image: vocalMixingImg,
    },
    {
      id: 1,
      key: "mixing_mastering",
      image: mixingMasteringImg,
    },
    {
      id: 2,
      key: "music_production",
      image: musicProductionImg,
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleViewDetails = () => {
    // Get current language from URL path
    const currentPath = window?.location?.pathname || "/";
    let targetPath = "/pricing";

    if (currentPath.startsWith("/en")) {
      targetPath = "/en/pricing";
    } else if (currentPath.startsWith("/jp")) {
      targetPath = "/jp/pricing";
    } else if (currentPath.startsWith("/zh")) {
      targetPath = "/zh/pricing";
    }

    router.push(targetPath);
  };

  return (
    <div
      className="w-full py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      style={{ minHeight: "900px" }}
    >
      <div className="max-w-7xl mx-auto px-8 h-full flex flex-col justify-center">
        {/* Title and Description Section - reduced since main title is above */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            {t("music_production_section.title")}
          </h2>
          <p className="text-lg text-gray-200 leading-relaxed max-w-2xl drop-shadow" style={{ whiteSpace: 'pre-line' }}>
            {t("music_production_section.subtitle")}
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
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="h-px bg-white/20 flex-1 group-hover:bg-white/40 transition-colors duration-500"></div>
              </div>

              {/* Service Content */}
              <div className="space-y-6">
                {/* Title Section */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-white/90 transition-colors duration-300">
                    {t(`music_production_section.services.${service.key}.title`)}
                  </h3>
                  <p className="text-white/60 text-sm font-light tracking-wide">
                    {t(`music_production_section.services.${service.key}.subtitle`)}
                  </p>
                </div>

                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-500"></div>
                  <Image
                    src={service.image}
                    alt={t(`music_production_section.services.${service.key}.title`)}
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
                      {t(`music_production_section.services.${service.key}.price`)}
                    </span>
                    <div className="text-white/40 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {t("music_production_section.view_details")}
                    </div>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed font-light">
                    {t(`music_production_section.services.${service.key}.description`)}
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
            className="px-8 py-3 border-2 border-white border-opacity-60 text-white bg-transparent hover:bg-white/10 hover:border-opacity-100 cursor-pointer transition-all duration-300 font-medium"
          >
            {t("music_production_section.view_pricing")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicProductionSection;
