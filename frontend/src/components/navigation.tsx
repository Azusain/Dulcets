"use client";
import { useState, useEffect } from "react";
import { useAssetPath } from "@/hooks/useAssetPath";
import { useLoading } from "@/contexts/LoadingContext";
import LanguageSwitcher, {
  GetLanguageDict,
  GetLanguageFromPath,
} from "./language_switcher";

const DsNavigation = () => {
  const { getAssetPath } = useAssetPath();
  const init_t = GetLanguageDict(GetLanguageFromPath());
  const [t, setTranslator] = useState<(key: string) => string>(() => init_t);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoading } = useLoading();
  const [faviconPath, setFaviconPath] = useState("/images/favicon.png");
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 检查是否滚动超过视频英雄区域的高度（大约100vh）
      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > heroHeight * 0.8); // 80%的视窗高度后开始变黑
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation visibility based on loading state
  useEffect(() => {
    if (isLoading) {
      // Hide navigation immediately when loading starts
      setShowNav(false);
    } else {
      // Show navigation with delay after loading completes (to sync with hero video)
      const timer = setTimeout(() => {
        setShowNav(true);
      }, 300); // Small delay to allow hero content to start appearing
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const navStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    color: 'white',
    backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.95)' : 'transparent',
    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
    WebkitBackdropFilter: isScrolled ? 'blur(10px)' : 'none',
    boxShadow: isScrolled 
      ? '0 4px 32px rgba(0, 0, 0, 0.3), 0 8px 64px rgba(0, 0, 0, 0.2)' 
      : 'none',
    borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',
    opacity: showNav ? 1 : 0,
    transform: showNav ? 'translateY(0)' : 'translateY(-100%)',
    transition: isLoading 
      ? 'none' 
      : 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.6s ease-out 0.2s, transform 0.8s ease-out',
  };

  return (
    <nav style={navStyle}>
      <div className="cursor-pointer">
        <img
          src={getAssetPath("/images/favicon.png")}
          alt="Dulcets Logo"
          className="h-26 w-46"
        />
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden md:flex space-x-6 text-base">
          <a href="#about" className="hover:underline">
            {t("about.title")}
          </a>
          <a href="#releases" className="hover:underline">
            {t("release")}
          </a>
          <a href="#information" className="hover:underline">
            {t("information")}
          </a>
        </div>

        {/* Search Bar */}
        <div 
          className="hidden md:flex items-center rounded-full px-4 py-2 min-w-[200px]"
          style={{
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            backdropFilter: isScrolled ? 'blur(10px)' : 'none',
            border: isScrolled ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <svg className="w-4 h-4 text-gray-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input 
            type="text" 
            placeholder="Search..."
            className="bg-transparent text-white text-sm placeholder-gray-300 focus:outline-none flex-1"
          />
        </div>

        <LanguageSwitcher setTranslator={setTranslator} />

        {/* Sidebar Button */}
        <button 
          className="flex flex-col space-y-1.5 p-2 rounded transition-colors"
          style={{
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.backdropFilter = 'blur(10px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.backdropFilter = 'none';
          }}
        >
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
      </div>
    </nav>
  );
};

export default DsNavigation;
