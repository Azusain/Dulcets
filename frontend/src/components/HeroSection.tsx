import { ComponentWithTranslation } from "@/components/MainPage";
import VideoBackground from "@/components/VideoBackground";

// Pre-generated particles for static rendering
const staticParticles = Array.from({ length: 50 }, (_, i) => ({
  left: `${(i * 17 + 23) % 100}%`, // Pseudo-random but deterministic
  top: `${(i * 31 + 41) % 100}%`,
  delay: `${(i % 3) + 0.5}s`,
  duration: `${2 + (i % 3)}s`,
}));

export default function HeroSection({ t }: ComponentWithTranslation) {
  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Main video background */}
        <VideoBackground />

        {/* CSS Fallback Background - shows when video fails */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 z-0">
          {/* Static particles/stars effect */}
          <div className="absolute inset-0 opacity-30">
            {staticParticles.map((particle, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: particle.left,
                  top: particle.top,
                  animationDelay: particle.delay,
                  animationDuration: particle.duration,
                }}
              />
            ))}
          </div>
          {/* Moving gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse"
            style={{ animation: "float 8s ease-in-out infinite" }}
          />
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black z-10"></div>

      {/* Hero Content - Repositioned to left-middle-upper with adjusted sizes */}
      <div className="container mx-auto px-6 h-full flex flex-col justify-center items-start relative z-20 text-left" style={{marginTop: '-8vh'}}>
        <h1 className="text-[clamp(6rem,16vw,12rem)] leading-tight mb-6 animate-float" style={{ fontFamily: "'Great Vibes', 'Alex Brush', 'Pinyon Script', cursive", fontWeight: 400, letterSpacing: '0.02em', color: 'white', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)' }}>
          Dulcets
        </h1>
        <p className="text-[clamp(1.2rem,3.5vw,2rem)] text-gray-200 max-w-4xl mb-10 animate-fade-in opacity-75 font-japanese-soft">
          {t("hero.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#artists"
            className="px-10 py-4 text-white font-medium transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
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
            <span className="relative z-10">{t("hero.explore_artists")}</span>
            <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
          <a
            href="#releases"
            className="px-10 py-4 bg-transparent text-white font-medium transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
            style={{
              border: '2px solid #5865F2',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(88, 101, 242, 0.2)';
              e.currentTarget.style.borderColor = '#4752C4';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = '#5865F2';
            }}
          >
            <span className="relative z-10">{t("hero.latest_releases")}</span>
            <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
