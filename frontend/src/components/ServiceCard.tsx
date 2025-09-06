"use client";

import { useState } from "react";
import { getAssetPath } from "../utils/assetPath";

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  href?: string;
  delay?: number;
  viewCount?: number;
  likeCount?: number;
}

export const ServiceCard = ({
  image,
  title,
  description,
  href = "#",
  delay = 0,
  viewCount = 0,
  likeCount = 0,
}: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Process image path to handle both external URLs and local paths
  const processedImage = image.startsWith("http") ? image : getAssetPath(image);

  // Format numbers with appropriate units
  const formatCount = (count: number) => {
    if (count >= 10000) {
      return (count / 10000).toFixed(1).replace(/\.0$/, '') + '萬';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return count.toString();
  };

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
              
              {/* Stats Display */}
              {(viewCount > 0 || likeCount > 0) && (
                <div className="flex items-center space-x-4 pt-2">
                  {/* View Count */}
                  {viewCount > 0 && (
                    <div className="flex items-center space-x-1">
                      <svg 
                        className="w-4 h-4 text-white/80" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={1.5} 
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                        />
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={1.5} 
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                        />
                      </svg>
                      <span className="text-xs text-white/80 font-medium drop-shadow-sm">
                        {formatCount(viewCount)}
                      </span>
                    </div>
                  )}
                  
                  {/* Like Count */}
                  {likeCount > 0 && (
                    <div className="flex items-center space-x-1">
                      <svg 
                        className="w-4 h-4 text-white/80" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={1.5} 
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                        />
                      </svg>
                      <span className="text-xs text-white/80 font-medium drop-shadow-sm">
                        {formatCount(likeCount)}
                      </span>
                    </div>
                  )}
                </div>
              )}
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
