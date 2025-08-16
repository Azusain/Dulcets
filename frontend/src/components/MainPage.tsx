"use client";
import HeroSection from "@/components/HeroSection";
import UnifiedServicesSection from "@/components/UnifiedServicesSection";
import ContactSection from "@/components/ContactSection";
import AboutSection from "@/components/AboutSection";
import { ServiceCard } from "@/components/ServiceCard";
import LoadingManager from "@/components/LoadingManager";
import works from "../../public/service/works.json";
export interface HomePageInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translations: Record<string, any>;
}

export interface ComponentWithTranslation {
  t: (key: string) => string;
}

// Helper function to get translation value from translations object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getTranslation(
  translations: Record<string, any>,
  key: string
): string {
  const keys = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations;

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      return key; // Return the key if path doesn't exist
    }
  }

  return typeof value === "string" ? value : key;
}

export function MainPage({ translations }: HomePageInterface) {
  // Create a local t function for this component
  const t = (key: string) => getTranslation(translations, key);
  return (
    <LoadingManager loadingText={t("loading")}>
      {/* Hero Section with Video Background */}
      <HeroSection t={t} />

      {/* Section Separator Wave */}
      <div className="h-24 bg-gradient-to-b from-black to-gray-50 relative">
        <svg
          className="absolute bottom-0 w-full h-16"
          viewBox="0 0 1440 64"
          fill="none"
        >
          <path
            d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,37.3C960,32,1056,32,1152,37.3C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            fill="#f9fafb"
          />
        </svg>
      </div>

      {/* About Us Section */}
      <AboutSection t={t} />

      {/* Our Works Section */}
      <section id="works" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm font-medium uppercase tracking-wider text-gray-500 bg-white px-4 py-2 rounded-full">
                Our Works
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {t("works.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t("works.lead_description") ||
                "私たちがこれまでに手がけた音楽作品・映像コンテンツをご紹介します。オリジナル楽曲からカバー作品まで、多様なジャンルの作品をお楽しみください。"}
            </p>
          </div>

          {/* Works Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((post, index) => {
              // Get localized title and excerpt based on current language
              const getLocalizedContent = () => {
                const currentLang =
                  t("nav.home") === "Home"
                    ? "en"
                    : t("nav.home") === "ホーム"
                    ? "jp"
                    : "zh";

                return {
                  title:
                    currentLang === "en"
                      ? post.titleEn
                      : currentLang === "jp"
                      ? post.titleJp
                      : post.title,
                  excerpt:
                    currentLang === "en"
                      ? post.excerptEn
                      : currentLang === "jp"
                      ? post.excerptJp
                      : post.excerpt,
                };
              };

              const content = getLocalizedContent();

              return (
                <ServiceCard
                  key={index}
                  image={post.image}
                  title={content.title}
                  description={content.excerpt}
                  href={post.videoUrl}
                  delay={index * 100}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 main services */}
      <UnifiedServicesSection translations={translations} />

      {/* Contact Section */}
      <ContactSection t={t} />

      {/* Footer with Follow Us section */}
      <footer className="bg-black text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h3 className="text-xl font-medium text-white mb-3">{t("contact.follow_us")}</h3>
            <p className="text-gray-400 mb-8">
              {t("contact.follow_description")}
            </p>
            
            {/* Social Media Icons - Larger with hover effects */}
            <div className="flex justify-center items-center gap-2 mb-8 group-hover-parent">
              {/* Ko-fi (replacing Gmail) */}
              <a 
                href="https://ko-fi.com/dulcets_official"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-all duration-300 hover:scale-125 hover:z-10 group hover:mx-2"
                aria-label="Ko-fi"
              >
                <svg className="w-8 h-8 text-blue-600 group-hover:text-blue-800 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.033 11.596c.049 4.271 3.468 4.669 3.468 4.669s11.62.006 13.043.013c1.422.006 3.468.017 3.468.017s3.701-.594 4.316-2.251c.615-1.657.865-9.584.865-9.584s.064-.537-.389-.665zm-17.444 8.58s-2.907-.009-3.621-2.998c-.714-2.989-.714-7.24-.714-7.24H2.78s-.045 3.649.01 5.83c.056 2.181 1.030 2.824 1.30 2.824h1.347zm12.35-2.953s-1.424 2.606-4.75 2.606H8.047V9.36h5.99s2.906 0 4.32 2.606c1.414 2.606 0 2.607 0 2.609z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a 
                href="https://www.youtube.com/@Dulcets"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-100 transition-all duration-300 hover:scale-125 hover:z-10 group hover:mx-2"
                aria-label="YouTube"
              >
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* X (Twitter) - Updated URL */}
              <a 
                href="https://x.com/Dulcets_staff"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-300 hover:scale-125 hover:z-10 group hover:mx-2"
                aria-label="X (Twitter)"
              >
                <svg className="w-7 h-7 text-gray-700 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                </svg>
              </a>

              {/* Bilibili */}
              <a 
                href="https://space.bilibili.com/3546744298146784"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-all duration-300 hover:scale-125 hover:z-10 group hover:mx-2"
                aria-label="Bilibili"
              >
                <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .356-.124.657-.373.906zM6.745 14.747V10.96c.018-.267.126-.474.32-.622.196-.148.41-.222.645-.222h8.58c.235 0 .449.074.645.222.194.148.302.355.32.622v3.787c-.018.267-.126.474-.32.622-.196.148-.41.222-.645.222h-8.58c-.235 0-.449-.074-.645-.222-.194-.148-.302-.355-.32-.622zm2.4-1.067v-.533h5.688v.533z"/>
                </svg>
              </a>

              {/* NicoVideo */}
              <a 
                href="https://www.nicovideo.jp/user/134411796"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-orange-100 transition-all duration-300 hover:scale-125 hover:z-10 group hover:mx-2"
                aria-label="NicoVideo"
              >
                <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 16.704c-.72 1.152-1.728 2.016-3.024 2.592-1.296.576-2.688.864-4.176.864s-2.88-.288-4.176-.864c-1.296-.576-2.304-1.44-3.024-2.592C2.736 15.552 2.304 14.304 2.304 12.96s.432-2.592 1.296-3.744c.72-1.152 1.728-2.016 3.024-2.592C7.92 6.048 9.312 5.76 10.8 5.76s2.88.288 4.176.864c1.296.576 2.304 1.44 3.024 2.592.864 1.152 1.296 2.4 1.296 3.744s-.432 2.592-1.296 3.744z"/>
                </svg>
              </a>
            </div>
            
            <div className="text-center text-gray-500 text-sm">
              <p>{t("footer.copyright")}</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        id="back-to-top"
        className="fixed bottom-8 right-8 bg-purple-600/80 hover:bg-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 opacity-0 invisible"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 15l7-7 7 7"
          ></path>
        </svg>
      </button>
    </LoadingManager>
  );
}
