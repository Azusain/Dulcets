"use client";
import React from "react";
import { useAssetPath } from "@/hooks/useAssetPath";

interface AboutSectionProps {
  t: (key: string) => string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ t }) => {
  const { getAssetPath } = useAssetPath();

  return (
    <section id="about" className="relative overflow-hidden bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header section with Tokyo night background */}
        <header className="mb-8 text-center relative">
          {/* Tokyo Night Background - Extended to full width */}
          <div
            className="absolute inset-0 left-[-100vw] right-[-100vw] w-[200vw] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${getAssetPath(
                "/images/backgrounds/tokyo.png"
              )}')`,
            }}
          >
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/70"></div>

            {/* Tokyo cityscape atmospheric effects */}
            <div className="absolute inset-0">
              {/* Floating light particles - simulating city lights and distant fireworks */}
              <div
                className="absolute top-20 left-1/4 w-2 h-2 bg-yellow-400 rounded-full opacity-80 animate-pulse"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="absolute top-32 right-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-70 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-48 left-1/2 w-1 h-1 bg-cyan-400 rounded-full opacity-90 animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>
              <div
                className="absolute bottom-40 left-1/5 w-2.5 h-2.5 bg-orange-400 rounded-full opacity-60 animate-pulse"
                style={{ animationDelay: "1.5s" }}
              ></div>
              <div
                className="absolute bottom-60 right-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-75 animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>

              {/* Subtle gradient overlays for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-purple-900/10"></div>
            </div>
          </div>

          {/* Header content with white text */}
          <div className="relative z-10 py-16">
            <div className="mb-12">
              {/* Simple white decorative line */}
              <div className="flex items-center justify-center mb-8">
                <div className="h-px bg-white/60 w-16"></div>
                <div className="mx-4 w-2 h-2 bg-white/80 rounded-full"></div>
                <div className="h-px bg-white/60 w-16"></div>
              </div>

              <h2 className="text-5xl font-light mb-4 text-white tracking-wide drop-shadow-lg">
                {t("about.title")}
              </h2>

              {/* Simple white underline */}
              <div className="mx-auto w-32 h-px bg-white/60"></div>

              <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-200 mt-6">
                ABOUT US
              </p>
            </div>

            {/* Description with simple white border frame */}
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-white/40"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-white/40"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-white/40"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-white/40"></div>

              <p className="text-lg text-white leading-relaxed py-8 px-12 drop-shadow-md">
                {t("about.lead_description")}
              </p>
            </div>
          </div>
        </header>
      </div>
    </section>
  );
};

export default AboutSection;
