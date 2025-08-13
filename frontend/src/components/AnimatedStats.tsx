"use client";

import React, { useState, useEffect, useRef } from 'react';

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

      setCounters(stats.map(stat => 
        Math.floor(stat.target * easeOutQuart)
      ));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, stats]);

  const formatNumber = (num: number, target: number, suffix: string) => {
    if (suffix === 'M+') {
      // For millions, show decimal places during animation
      const millions = num / 1000000;
      return num === target ? `${target / 1000000}M+` : `${millions.toFixed(1)}M+`;
    }
    return `${num}${suffix}`;
  };

  return (
    <div ref={statsRef} className="grid grid-cols-3 gap-8 text-center border-t border-gray-200 pt-12">
      {stats.map((stat, index) => (
        <div key={index}>
          <div className="text-4xl font-light mb-2 transition-all duration-300">
            {formatNumber(counters[index], stat.target, stat.suffix)}
          </div>
          <div className="text-sm text-gray-600">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedStats;
