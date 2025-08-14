"use client";

import React, { useEffect, useRef, useState } from 'react';

interface BackgroundMusicProps {
  section: 'hero' | 'about' | 'works' | 'pricing';
  isActive: boolean;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ section, isActive }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userHasInteracted, setUserHasInteracted] = useState(false);

  // Music sources for different sections - subtle and elegant
  const musicSources = {
    hero: '/audio/hero-ambient.mp3', // Gentle ambient sound
    about: '/audio/about-piano.mp3', // Soft piano melody
    works: '/audio/works-minimal.mp3', // Minimal electronic
    pricing: '/audio/pricing-zen.mp3' // Zen-like atmosphere
  };

  useEffect(() => {
    const handleUserInteraction = () => {
      setUserHasInteracted(true);
      // Remove listeners after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
    };

    // Listen for any user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !userHasInteracted) return;

    // Set volume via ref
    audio.volume = 0.15;

    if (isActive && !isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            // Handle autoplay restrictions gracefully
            console.log('Audio autoplay prevented:', error);
          });
      }
    } else if (!isActive && isPlaying) {
      audio.pause();
      setIsPlaying(false);
    }
  }, [isActive, userHasInteracted, isPlaying]);

  // Temporarily disabled - missing audio files
  return null;
};

export default BackgroundMusic;
