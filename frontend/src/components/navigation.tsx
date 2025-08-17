"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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
  const [showNav, setShowNav] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Check if on a sub-page (not the main page)
  const isSubPage = pathname.includes('/pricing') || 
                   (pathname !== '/' && pathname !== '/en' && pathname !== '/jp' && pathname !== '/zh');

  useEffect(() => {
    const handleScroll = () => {
      if (isSubPage) {
        // Always show black background on sub-pages
        setIsScrolled(true);
      } else {
        // On the main page, check if scrolled beyond the video hero area height (approximately 100vh)
        const heroHeight = window.innerHeight;
        const scrollPosition = window.scrollY;
        // Start turning black after 80% of the viewport height
        setIsScrolled(scrollPosition > heroHeight * 0.8);
      }
    };

    // Set initial state immediately for sub-pages
    if (isSubPage) {
      setIsScrolled(true);
    }

    // Check once on initialization
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSubPage]);

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
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 16px",
    color: "white",
    backgroundColor: isScrolled ? "rgba(0, 0, 0, 0.95)" : "transparent",
    backdropFilter: isScrolled ? "blur(10px)" : "blur(5px)",
    WebkitBackdropFilter: isScrolled ? "blur(10px)" : "blur(5px)",
    boxShadow: isScrolled
      ? "0 4px 32px rgba(0, 0, 0, 0.3), 0 8px 64px rgba(0, 0, 0, 0.2)"
      : "none",
    borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.3)" : "none",
    opacity: isLoading ? 0 : showNav ? 1 : 0,
    transform: isLoading
      ? "translateY(0)"
      : showNav
      ? "translateY(0)"
      : "translateY(-100%)",
    transition: isLoading
      ? "opacity 0s"
      : "all 0.3s ease-in-out, opacity 0.6s ease-out 0.2s, transform 0.8s ease-out 0.3s",
    zIndex: 1000,
  };

  return (
    <div className="drawer">
      <input id="drawer-toggle" type="checkbox" className="drawer-toggle" checked={isMenuOpen} onChange={() => setIsMenuOpen(!isMenuOpen)} />
      <div className="drawer-content flex flex-col">
        {/* Navigation Bar */}
        <nav style={navStyle}>
          <div 
            className="cursor-pointer" 
            onClick={() => {
              // Handle home navigation for GitHub Pages
              if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
                window.location.href = '/Dulcets/';
              } else {
                window.location.href = '/';
              }
            }}
          >
            <img
              src={getAssetPath("/images/favicon.png")}
              alt="Dulcets Logo"
              className="h-20 w-auto hover:opacity-80 transition-opacity duration-200"
            />
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-6 text-base">
              <a href="#about" className="hover:underline">
                {t("about.title")}
              </a>
              <a href="#works" className="hover:underline">
                {t("works.title")}
              </a>
              <a href="#services" className="hover:underline">
                {t("services.title")}
              </a>
            </div>

            <LanguageSwitcher setTranslator={setTranslator} />

            {/* Contact Us Button */}
            <a 
              href="#contact"
              className="hidden md:block text-white px-4 py-2 transition-colors duration-300 font-medium ml-4"
              style={{
                backgroundColor: '#5865F2',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4752C4';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#5865F2';
              }}
            >
              Contact Us
            </a>

            {/* Hamburger Menu Button - keeping the same style */}
            <label htmlFor="drawer-toggle" className="relative w-10 h-10 flex flex-col justify-center items-center cursor-pointer" style={{ zIndex: 100 }}>
              {/* Top line */}
              <div 
                className="w-6 h-0.5 bg-white mb-1 transition-all duration-300 origin-center"
                style={{
                  transform: isMenuOpen ? 'rotate(45deg) translateY(6px)' : 'rotate(0deg) translateY(0px)'
                }}
              />
              {/* Middle line */}
              <div 
                className="w-6 h-0.5 bg-white mb-1 transition-all duration-300"
                style={{
                  opacity: isMenuOpen ? 0 : 1
                }}
              />
              {/* Bottom line */}
              <div 
                className="w-6 h-0.5 bg-white transition-all duration-300 origin-center"
                style={{
                  transform: isMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'rotate(0deg) translateY(0px)'
                }}
              />
            </label>
          </div>
        </nav>
      </div>
      
      {/* DaisyUI Drawer Sidebar - RK Music Style */}
      <div className="drawer-side">
        <label htmlFor="drawer-toggle" aria-label="close sidebar" className="drawer-overlay"></label>
        <aside className="bg-black text-white min-h-full w-full">
          <div className="flex flex-col h-full max-w-md mx-auto px-8 py-12" style={{ maxHeight: '100vh' }}>
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white hover:text-gray-300 transition-colors duration-300"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Follow Section */}
            <div className="mb-12">
              <p className="text-sm text-gray-400 mb-6 uppercase tracking-wider font-light">Follow us</p>
              <div className="flex space-x-6">
                <a 
                  href="https://www.youtube.com/@Dulcets" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 opacity-70 hover:opacity-100 transition-opacity duration-300"
                >
                  <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a 
                  href="https://x.com/Dulcets_staff" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 opacity-70 hover:opacity-100 transition-opacity duration-300"
                >
                  <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Main Navigation */}
            <nav className="mb-12">
              <ul className="space-y-6">
                <li>
                  <a 
                    href="#about" 
                    className="block text-2xl text-white hover:text-gray-300 transition-colors duration-300 font-light"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("about.title")}
                  </a>
                </li>
                <li>
                  <a 
                    href="#works" 
                    className="block text-2xl text-white hover:text-gray-300 transition-colors duration-300 font-light"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("works.title")}
                  </a>
                </li>
                <li>
                  <a 
                    href="#services" 
                    className="block text-2xl text-white hover:text-gray-300 transition-colors duration-300 font-light"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("services.title")}
                  </a>
                </li>
              </ul>
            </nav>

            {/* Artists Section */}
            <div className="mb-12">
              <p className="text-lg text-white mb-6 font-light">Artists</p>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="https://www.youtube.com/@shintou_official" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg text-gray-300 hover:text-white transition-colors duration-300 flex items-center font-light"
                  >
                    Shintou
                    <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.youtube.com/@sakuma_haruka" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg text-gray-300 hover:text-white transition-colors duration-300 flex items-center font-light"
                  >
                    Sakuma遙
                    <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.youtube.com/@seina_koyaka" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg text-gray-300 hover:text-white transition-colors duration-300 flex items-center font-light"
                  >
                    星奈こやか
                    <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            {/* Bottom Buttons */}
            <div className="mt-auto space-y-4">
              <a 
                href="#contact" 
                className="block w-full bg-white text-black text-center py-4 px-6 rounded-sm hover:bg-gray-100 transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center justify-center text-lg">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Contact
                </span>
              </a>
              <a 
                href="mailto:info@dulcets.com" 
                className="block w-full border border-gray-600 text-white text-center py-4 px-6 rounded-sm hover:bg-gray-900 transition-colors duration-300 font-medium"
              >
                <span className="text-sm text-gray-400 block mb-1">お問い合わせ受付中</span>
                <span className="flex items-center justify-center text-lg">
                  Inquiry
                  <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DsNavigation;
