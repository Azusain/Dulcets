"use client";

import { useState, useEffect } from 'react';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<'hero' | 'about' | 'works' | 'pricing' | null>(null);

  useEffect(() => {
    const sections = [
      { id: 'hero', element: document.querySelector('#hero') },
      { id: 'about', element: document.querySelector('#about') },
      { id: 'works', element: document.querySelector('#works') },
      { id: 'pricing', element: document.querySelector('#pricing') }
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Only trigger when section is well into view
      threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id as 'hero' | 'about' | 'works' | 'pricing';
          setActiveSection(sectionId);
        }
      });
    }, observerOptions);

    sections.forEach(({ element }) => {
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach(({ element }) => {
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return activeSection;
}
