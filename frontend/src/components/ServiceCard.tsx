"use client";

import { useState } from "react";
import { getAssetPath } from "../utils/assetPath";

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  href?: string;
  delay?: number;
}

export const ServiceCard = ({
  image,
  title,
  description,
  href = "#",
  delay = 0,
}: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Process image path to handle both external URLs and local paths
  const processedImage = image.startsWith("http") ? image : getAssetPath(image);

  return (
    <div
      className="service-card group relative overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={href}
        className="block relative w-full h-full"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* Image Container */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <img
            src={processedImage}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
              isHovered ? "blur-[2px]" : "blur-none"
            }`}
          />

          {/* Dark overlay for better text readability */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-700 ease-out ${
              isHovered ? "opacity-50" : "opacity-0"
            }`}
          />

          <div
            className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-700 ease-out ${
              isHovered
                ? "transform translate-y-0 opacity-100"
                : "transform translate-y-full opacity-0"
            }`}
          >
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white leading-tight drop-shadow-lg">
                {title}
              </h3>
              <p className="text-sm text-white/90 leading-relaxed drop-shadow-md">
                {description}
              </p>
            </div>
          </div>

          {/* Arrow Icon - appears on hover */}
          <div
            className={`absolute top-4 right-4 w-8 h-8 bg-none  flex items-center justify-center shadow-sm transition-all duration-500 ${
              isHovered
                ? "opacity-100 transform scale-100"
                : "opacity-0 transform scale-75"
            }`}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </a>
    </div>
  );
};
