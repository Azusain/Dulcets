"use client";

import React, { useState, useEffect, useRef } from "react";

interface StatItem {
  target: number;
  suffix: string;
  label: string;
}

interface AnimatedStatsProps {
  stats: StatItem[];
}

const AnimatedStats: React.FC<AnimatedStatsProps> = ({ stats }) => {
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const animationDuration = 2000; // 2 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCounters(stats.map((stat) => Math.floor(stat.target * easeOutQuart)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, stats]);

  const formatNumber = (num: number, target: number, suffix: string) => {
    if (suffix === "M+") {
      // For millions, show decimal places during animation
      const millions = num / 1000000;
      return num === target
        ? `${target / 1000000}M+`
        : `${millions.toFixed(1)}M+`;
    }
    return `${num}${suffix}`;
  };

  return (
    <div ref={statsRef} className="relative">
      {/* Japanese-inspired decorative separator */}
      <div className="flex items-center justify-center mb-12">
        <div className="h-px bg-gray-300 w-24 opacity-50"></div>
        <div className="mx-6 space-x-2 flex">
          <div className="w-1 h-1 bg-gray-400 rounded-full opacity-60"></div>
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full opacity-80"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full opacity-60"></div>
        </div>
        <div className="h-px bg-gray-300 w-24 opacity-50"></div>
      </div>

      {/* Enhanced stats grid */}
      <div className="grid grid-cols-3 gap-12 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="group relative">
            {/* Subtle background frame */}
            <div className="absolute inset-0 bg-white bg-opacity-30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Number with enhanced typography */}
            <div className="relative z-10 py-6">
              <div className="text-5xl font-light mb-3 text-gray-800 tracking-tight transition-all duration-300 group-hover:text-gray-900">
                <span className="font-mono">
                  {formatNumber(counters[index], stat.target, stat.suffix)}
                </span>
              </div>

              {/* Minimalist underline */}
              <div className="w-8 h-px bg-gray-300 mx-auto mb-4 group-hover:w-16 transition-all duration-500"></div>

              {/* Label with refined styling */}
              <div className="text-sm text-gray-600 font-light tracking-wide uppercase group-hover:text-gray-700 transition-colors duration-300">
                {stat.label}
              </div>

              {/* Subtle accent dot */}
              <div className="w-2 h-2 bg-gray-300 rounded-full mx-auto mt-3 opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedStats;
