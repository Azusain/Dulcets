"use client";
import React from "react";
import { useAssetPath } from "@/hooks/useAssetPath";

interface WhyChooseUsSectionProps {
  t: (key: string) => string;
}

const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ t }) => {
  const { getAssetPath } = useAssetPath();

  return (
    <>
      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-block mb-6">
              <span className="text-sm font-medium uppercase tracking-wider text-gray-500 bg-white px-6 py-2 rounded-full shadow-sm border border-gray-200">
                {t("services.title")}
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-6 tracking-wide">
              {t("services.our_service")}
            </h2>
            <div className="mx-auto w-24 h-px bg-gray-400 mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t("services.subtitle")}
            </p>
          </div>
        </div>
      </div>

      <section className="h-[30vh] bg-white relative overflow-hidden group">
        <div className="max-w-7xl mx-auto px-6 h-[80%]">
          <div className="grid grid-cols-5 h-full w-full">
            {[
              "custom_music",
              "comprehensive_support",
              "diverse_vocals",
              "multilingual",
              "cross_media",
            ].map((feature, index) => {
              const images = [
                "custom-music.jpg",
                "comprehensive-support.jpg",
                "diverse-vocals.jpg",
                "multilingual.jpg",
                "cross-media.jpg",
              ];

              return (
                <div
                  key={feature}
                  className="group/item relative overflow-hidden cursor-pointer transition-all duration-500 hover:z-10"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`,
                  }}
                  onMouseEnter={() => {
                    // Trigger the parent group hover effect for title fade
                    const section = document.querySelector(".group");
                    section?.classList.add("hover");
                  }}
                  onMouseLeave={() => {
                    // Remove the parent group hover effect
                    const section = document.querySelector(".group");
                    section?.classList.remove("hover");
                  }}
                >
                  {/* Background image with transparency effect */}
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 opacity-50 group-hover/item:opacity-100"
                    style={{
                      backgroundImage: `url('${getAssetPath(
                        `/images/advantages/${images[index]}`
                      )}')`,
                    }}
                  ></div>

                  {/* Overlay that gets darker on hover to enhance contrast */}
                  <div className="absolute inset-0 bg-black/40 group-hover/item:bg-black/20 transition-colors duration-500"></div>

                  {/* Content with text movement effects */}
                  <div className="relative z-10 h-full flex flex-col justify-center items-center p-6 text-center">
                    <div className="transform transition-all duration-500 group-hover/item:-translate-y-3">
                      <h3 className="text-xl font-bold text-white mb-3 leading-tight drop-shadow-xl transition-all duration-500 group-hover/item:scale-110">
                        {t(`about.why_choose_us.features.${feature}.title`)}
                      </h3>

                      {/* Animated accent line */}
                      <div className="w-12 h-0.5 bg-white/70 mb-4 mx-auto transition-all duration-500 group-hover/item:w-16 group-hover/item:bg-white"></div>

                      <p className="text-white/90 text-sm leading-relaxed drop-shadow-lg transition-all duration-500 group-hover/item:text-white group-hover/item:translate-y-1">
                        {t(
                          `about.why_choose_us.features.${feature}.description`
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Subtle hover highlight */}
                  <div className="absolute inset-0 bg-white/0 group-hover/item:bg-white/10 transition-colors duration-500 pointer-events-none"></div>
                </div>
              );
            })}
          </div>

          {/* Simple bottom accent with container - positioned absolutely */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="w-16 h-0.5 bg-white/30"></div>
          </div>
        </div>
      </section>

      {/* White spacer to avoid dark background showing through */}
      <div className="bg-white py-10"></div>
    </>
  );
};

export default WhyChooseUsSection;
