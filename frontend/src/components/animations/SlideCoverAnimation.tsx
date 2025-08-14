'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface SlideCoverAnimationProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  coverColor?: string;
  className?: string;
}

export default function SlideCoverAnimation({
  children,
  delay = 0,
  direction = 'up',
  coverColor = '#f29600', // G-angle orange
  className = ''
}: SlideCoverAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  // Get initial and final positions for the cover
  const getCoverTransform = (phase: 'initial' | 'exit') => {
    const transforms = {
      left: {
        initial: { x: '-100%' },
        exit: { x: '100%' }
      },
      right: {
        initial: { x: '100%' },
        exit: { x: '-100%' }
      },
      up: {
        initial: { y: '-100%' },
        exit: { y: '100%' }
      },
      down: {
        initial: { y: '100%' },
        exit: { y: '-100%' }
      }
    };
    return transforms[direction][phase];
  };

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      controls.start('visible');
    }
  }, [isInView, hasAnimated, controls]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.01 // Almost instant for container
      }
    }
  };

  const coverVariants = {
    hidden: getCoverTransform('initial'),
    visible: {
      ...getCoverTransform('initial'),
      transition: {
        duration: 0.8,
        delay: delay
      }
    },
    exit: {
      ...getCoverTransform('exit'),
      transition: {
        duration: 0.6,
        delay: delay + 0.3
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: delay + 0.5
      }
    }
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Content */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={contentVariants}
        className="relative z-10"
      >
        {children}
      </motion.div>
      
      {/* Slide Cover */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={coverVariants}
        onAnimationComplete={(definition) => {
          if (definition === 'visible') {
            // Trigger exit animation
            controls.start('exit');
          }
        }}
        className="absolute inset-0 z-20"
        style={{
          backgroundColor: coverColor,
          backgroundImage: `linear-gradient(135deg, ${coverColor} 0%, ${coverColor}DD 100%)`
        }}
      />
    </div>
  );
}
