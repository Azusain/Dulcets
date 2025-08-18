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
  const [isClosing, setIsClosing] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const pathname = usePathname();

  // Check if on a sub-page (not the main page)
  const isSubPage =
    pathname.includes("/pricing") ||
    (pathname !== "/" &&
      pathname !== "/en" &&
      pathname !== "/jp" &&
      pathname !== "/zh");

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

  // Handle ESC key to close sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeSidebar();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  // Function to handle sidebar closing with animation
  const closeSidebar = () => {
    setIsClosing(true);
    // Start hamburger button animation immediately
    setShowHamburger(false);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 300); // Match animation duration
  };

  // Handle hamburger button state changes
  useEffect(() => {
    if (isMenuOpen && !isClosing) {
      setShowHamburger(true);
    } else if (!isMenuOpen) {
      setShowHamburger(false);
    }
  }, [isMenuOpen, isClosing]);

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
    backgroundColor:
      isScrolled || isMenuOpen ? "rgba(0, 0, 0, 0.95)" : "transparent",
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
    zIndex: 10001, // Higher than sidebar to ensure hamburger button is always visible
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav style={navStyle}>
        <div
          className="cursor-pointer"
          onClick={() => {
            // Handle home navigation for GitHub Pages
            if (
              typeof window !== "undefined" &&
              window.location.hostname.includes("github.io")
            ) {
              window.location.href = "/Dulcets/";
            } else {
              window.location.href = "/";
            }
          }}
        >
          <img
            src={getAssetPath("/images/logo_no_background.png")}
            alt="Dulcets Logo"
            className="h-22 w-auto hover:opacity-80 transition-opacity duration-200"
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
              backgroundColor: "#5865F2",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#4752C4";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#5865F2";
            }}
          >
            Contact Us
          </a>

          {/* Placeholder for hamburger button positioning */}
          <div className="w-10 h-10" />
        </div>
      </nav>

      {/* Hamburger Menu Button - Always on absolute top */}
      <button
        onClick={() => {
          if (isMenuOpen) {
            closeSidebar();
          } else {
            setIsMenuOpen(true);
          }
        }}
        className="fixed top-[26px] right-[16px] w-10 h-10 flex items-center justify-center cursor-pointer"
        style={{ zIndex: 99999 }}
      >
        <div className="relative w-6 h-6 flex flex-col justify-center">
          {/* Top line */}
          <div
            className="absolute w-6 h-0.5 bg-white transition-all duration-300 ease-in-out"
            style={{
              top: "25%",
              transform: showHamburger
                ? "translateY(-50%) translateY(6px) rotate(45deg)"
                : "translateY(-50%) rotate(0deg)",
            }}
          />
          {/* Middle line */}
          <div
            className="absolute w-6 h-0.5 bg-white transition-all duration-300 ease-in-out"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              opacity: showHamburger ? 0 : 1,
            }}
          />
          {/* Bottom line */}
          <div
            className="absolute w-6 h-0.5 bg-white transition-all duration-300 ease-in-out"
            style={{
              top: "75%",
              transform: showHamburger
                ? "translateY(-50%) translateY(-6px) rotate(-45deg)"
                : "translateY(-50%) rotate(0deg)",
            }}
          />
        </div>
      </button>

      {/* Custom Sidebar - No DaisyUI */}
      {(isMenuOpen || isClosing) && (
        <>
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 ${
              isClosing ? "animate-fade-out" : "animate-fade-in"
            }`}
            style={{ zIndex: 9000 }}
            onClick={() => closeSidebar()}
          />
          {/* Sidebar */}
          <div
            className={`fixed inset-0 bg-black text-white ${
              isClosing ? "animate-slide-out-right" : "animate-slide-in-right"
            }`}
            style={{ zIndex: 9500 }}
          >
            {/* Centered Search Box */}
            <div className="flex items-center justify-center h-full">
              <div
                className="w-3/5"
                style={{ transform: "translateY(-16.67vh)" }}
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-transparent border-0 border-b border-gray-600 text-white placeholder-gray-400 px-0 py-6 focus:outline-none focus:border-gray-400 transition-all duration-200"
                    style={{
                      borderRadius: "0px",
                      fontSize: "48px",
                      letterSpacing: "0.05em",
                      fontFamily:
                        '"Inter", "Helvetica Neue", "Arial", sans-serif',
                      fontWeight: "100",
                    }}
                    onChange={(e) => {
                      // TODO: Implement search functionality
                      console.log("Search:", e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        closeSidebar();
                      }
                    }}
                    autoFocus={!isClosing}
                  />

                  {/* Search Results Area */}
                  <div className="mt-6">
                    {/* This will show search results when typing */}
                    <div className="text-sm text-gray-500 px-0 py-2">
                      Start typing to search...
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple bottom hint */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
              <div className="text-xs text-gray-500">
                Press{" "}
                <kbd className="px-1 py-0.5 text-xs bg-gray-700 border border-gray-600 rounded text-gray-400">
                  ESC
                </kbd>{" "}
                to close
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DsNavigation;
