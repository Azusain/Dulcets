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

        {/* Hamburger Menu Button */}
        <button
          className="relative w-10 h-10 flex flex-col justify-center items-center cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ zIndex: 100 }}
        >
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
        </button>
      </div>

      {/* Background Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Sidebar Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-96 bg-black transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          boxShadow: isMenuOpen ? '-8px 0 32px rgba(0, 0, 0, 0.5)' : 'none',
        }}
      >
        <div className="flex flex-col h-full p-8 pt-20">
          {/* Follow Section */}
          <div className="mb-10">
            <p className="text-sm text-gray-400 mb-4 uppercase tracking-wider">Follow us</p>
            <div className="flex space-x-4">
              <a 
                href="https://www.youtube.com/@Dulcets" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a 
                href="https://x.com/Dulcets_staff" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors duration-300"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                </svg>
              </a>
              <a 
                href="https://space.bilibili.com/3546744298146784" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors duration-300"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .356-.124.657-.373.906zM6.745 14.747V10.96c.018-.267.126-.474.32-.622.196-.148.41-.222.645-.222h8.58c.235 0 .449.074.645.222.194.148.302.355.32.622v3.787c-.018.267-.126.474-.32.622-.196.148-.41.222-.645.222h-8.58c-.235 0-.449-.074-.645-.222-.194-.148-.302-.355-.32-.622zm2.4-1.067v-.533h5.688v.533z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1">
            <ul className="space-y-6">
              <li>
                <a 
                  href="#about" 
                  className="block text-2xl text-white hover:text-gray-300 transition-colors duration-300 font-light tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("about.title")}
                </a>
              </li>
              <li>
                <a 
                  href="#works" 
                  className="block text-2xl text-white hover:text-gray-300 transition-colors duration-300 font-light tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("works.title")}
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  className="block text-2xl text-white hover:text-gray-300 transition-colors duration-300 font-light tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("services.title")}
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="block text-2xl text-white hover:text-gray-300 transition-colors duration-300 font-light tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("contact.title")}
                </a>
              </li>
            </ul>

            {/* Artists */}
            <div className="mt-12">
              <p className="text-lg text-gray-300 mb-6 font-light tracking-wide">Artists</p>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="https://www.youtube.com/@shintou_official" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center font-light"
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
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center font-light"
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
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center font-light"
                  >
                    星奈こやか
                    <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Bottom Buttons */}
          <div className="space-y-4 mt-auto pt-8">
            <a 
              href="#contact" 
              className="block w-full bg-white text-black text-center py-4 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Contact
              </span>
            </a>
            <a 
              href="mailto:info@dulcets.com" 
              className="block w-full border border-gray-600 text-white text-center py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-300 font-medium"
            >
              <span className="text-sm text-gray-400 block">お問い合わせ受付中</span>
              <span className="flex items-center justify-center mt-1">
                Inquiry
                <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DsNavigation;
