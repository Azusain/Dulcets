'use client';

import { useEffect } from 'react';
import { getLocalizedTitle } from '@/utils/seo';

interface DynamicTitleProps {
  page: 'home' | 'about' | 'services' | 'works' | 'contact';
}

export default function DynamicTitle({ page }: DynamicTitleProps) {
  useEffect(() => {
    const detectLanguage = (): 'ja' | 'en' | 'zh' => {
      // Check URL parameters first
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang');
      if (langParam === 'ja' || langParam === 'en' || langParam === 'zh') {
        return langParam;
      }
      
      // Check localStorage for saved preference
      const savedLang = localStorage.getItem('preferred-language');
      if (savedLang === 'ja' || savedLang === 'en' || savedLang === 'zh') {
        return savedLang;
      }
      
      // Detect browser language
      const browserLang = navigator.language.toLowerCase();
      
      if (browserLang.startsWith('ja')) {
        return 'ja';
      } else if (browserLang.startsWith('zh')) {
        return 'zh';
      } else if (browserLang.startsWith('en')) {
        return 'en';
      }
      
      // Default to Japanese as the main language
      return 'ja';
    };

    const language = detectLanguage();
    const localizedTitle = getLocalizedTitle(page, language);
    
    // Update the document title
    document.title = localizedTitle;
    
    // Update meta tags
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
    
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', localizedTitle);
    }
    
    if (twitterTitleMeta) {
      twitterTitleMeta.setAttribute('content', localizedTitle);
    }
    
    // Save the detected/selected language
    localStorage.setItem('preferred-language', language);
    
  }, [page]);

  return null; // This component doesn't render anything
}
