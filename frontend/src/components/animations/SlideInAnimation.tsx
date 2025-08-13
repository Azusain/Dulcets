'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface SlideInAnimationProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  coverColor?: string;
}

export default function SlideInAnimation({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = '',
  coverColor = '#f29600' // G-angle orange color
}: SlideInAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();
  const [isAnimated, setIsAnimated] = useState(false);

  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { x: -100, y: 0 };
      case 'right':
        return { x: 100, y: 0 };
      case 'up':
        return { x: 0, y: 100 };
      case 'down':
        return { x: 0, y: -100 };
      default:
        return { x: 0, y: 100 };
    }
  };

  const getCoverInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { x: '-100%' };
      case 'right':
        return { x: '100%' };
      case 'up':
        return { y: '-100%' };
      case 'down':
        return { y: '100%' };
      default:
        return { y: '-100%' };
    }
  };

  const getCoverFinalPosition = () => {
    switch (direction) {
      case 'left':
        return { x: '100%' };
      case 'right':
        return { x: '-100%' };
      case 'up':
        return { y: '100%' };
      case 'down':
        return { y: '-100%' };
      default:
        return { y: '100%' };
    }
  };

  useEffect(() => {
    if (isInView && !isAnimated) {
      setIsAnimated(true);
      controls.start('visible');
    }
  }, [isInView, isAnimated, controls]);

  const containerVariants = {
    hidden: {
      ...getInitialPosition(),
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Smooth easing
      },
    },
  };

  const coverVariants = {
    hidden: getCoverInitialPosition(),
    visible: {
      ...getCoverFinalPosition(),
      transition: {
        duration: duration * 0.6,
        delay: delay + duration * 0.2,
        ease: [0.76, 0, 0.24, 1], // Sharp easing for cover
      },
    },
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="relative z-10"
      >
        {children}
      </motion.div>
      
      {/* Sliding cover */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={coverVariants}
        className="absolute inset-0 z-20"
        style={{
          backgroundColor: coverColor,
          backgroundImage: `linear-gradient(135deg, ${coverColor} 0%, ${coverColor}CC 100%)`,
        }}
      />
    </div>
  );
}
