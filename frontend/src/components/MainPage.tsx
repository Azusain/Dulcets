import HeroSection from "@/components/HeroSection";
import UnifiedServicesSection from "@/components/UnifiedServicesSection";
import ContactSection from "@/components/ContactSection";
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
      <section
        id="about"
        className="py-24 bg-gray-50 text-black relative overflow-hidden"
      >
        {/* Subtle Japanese-inspired background pattern */}
        <div className="absolute inset-0 opacity-20">
          {/* Geometric grid pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(156, 163, 175, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(156, 163, 175, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          ></div>

          {/* Scattered minimal elements */}
          <div className="absolute top-20 left-10 w-1 h-32 bg-gray-300 transform rotate-12"></div>
          <div className="absolute top-40 right-20 w-1 h-24 bg-gray-300 transform -rotate-12"></div>
          <div className="absolute bottom-32 left-1/4 w-1 h-28 bg-gray-300 transform rotate-45"></div>
          <div className="absolute bottom-20 right-1/3 w-1 h-20 bg-gray-300 transform -rotate-30"></div>

          {/* Subtle circles for accent */}
          <div className="absolute top-1/3 left-1/5 w-2 h-2 bg-gray-300 rounded-full opacity-40"></div>
          <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-gray-300 rounded-full opacity-30"></div>
          <div className="absolute bottom-1/4 left-2/3 w-1.5 h-1.5 bg-gray-400 rounded-full opacity-50"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <header className="mb-20 text-center">
            <div className="mb-12">
              {/* Decorative line with center accent */}
              <div className="flex items-center justify-center mb-8">
                <div className="h-px bg-gray-300 w-16 opacity-60"></div>
                <div className="mx-4 w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="h-px bg-gray-300 w-16 opacity-60"></div>
              </div>

              <h2 className="text-5xl font-light mb-4 text-black tracking-wide">
                {t("about.title")}
              </h2>

              {/* Subtle animated underline */}
              <div className="mx-auto w-32 h-px bg-gray-400 relative overflow-hidden">
                <div className="absolute inset-0 bg-black w-0 animate-pulse"></div>
              </div>

              <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500 mt-6">
                ABOUT US
              </p>
            </div>

            {/* Description with subtle border frame */}
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-gray-300 opacity-40"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-gray-300 opacity-40"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-gray-300 opacity-40"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-gray-300 opacity-40"></div>

              <p className="text-lg text-gray-700 leading-relaxed py-8 px-12">
                {t("about.lead_description")}
              </p>
            </div>
          </header>

          {/* Main Content Area: Text on left, Genres on right */}
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            {/* Left: About Content */}
            <div className="prose prose-lg max-w-none relative">
              {/* Subtle decorative element */}
              <div className="absolute -left-4 top-0 w-1 h-full bg-gray-200 opacity-50"></div>
              <p className="text-lg leading-relaxed text-gray-700 pl-8">
                {t("about.content")}
              </p>
            </div>

            {/* Right: Music Genres with Japanese-inspired design */}
            <div className="relative">
              {/* Vertical accent line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300"></div>

              <div className="pl-12 space-y-10">
                {/* Genre entries with hover animations */}
                <div className="group relative">
                  <div className="absolute -left-12 top-4 w-2 h-2 bg-gray-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-center transform group-hover:translate-x-2 transition-transform duration-300">
                    <h3 className="text-2xl font-light mb-2 text-gray-800 tracking-wide">
                      {t("about.genres.anime_song.title")}
                    </h3>
                    <div className="w-16 h-px bg-gray-300 mx-auto mb-3 group-hover:w-24 transition-all duration-500"></div>
                    <p className="text-gray-600 text-sm font-light">
                      {t("about.genres.anime_song.subtitle")}
                    </p>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute -left-12 top-4 w-2 h-2 bg-gray-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-center transform group-hover:translate-x-2 transition-transform duration-300">
                    <h3 className="text-2xl font-light mb-2 text-gray-800 tracking-wide">
                      {t("about.genres.jrock.title")}
                    </h3>
                    <div className="w-16 h-px bg-gray-300 mx-auto mb-3 group-hover:w-24 transition-all duration-500"></div>
                    <p className="text-gray-600 text-sm font-light">
                      Japanese Rock
                    </p>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute -left-12 top-4 w-2 h-2 bg-gray-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-center transform group-hover:translate-x-2 transition-transform duration-300">
                    <h3 className="text-2xl font-light mb-2 text-gray-800 tracking-wide">
                      {t("about.genres.jpop.title")}
                    </h3>
                    <div className="w-16 h-px bg-gray-300 mx-auto mb-3 group-hover:w-24 transition-all duration-500"></div>
                    <p className="text-gray-600 text-sm font-light">
                      Japanese Pop
                    </p>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute -left-12 top-4 w-2 h-2 bg-gray-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-center transform group-hover:translate-x-2 transition-transform duration-300">
                    <h3 className="text-2xl font-light mb-2 text-gray-800 tracking-wide">
                      {t("about.genres.bgm.title")}
                    </h3>
                    <div className="w-16 h-px bg-gray-300 mx-auto mb-3 group-hover:w-24 transition-all duration-500"></div>
                    <p className="text-gray-600 text-sm font-light">
                      Background Music
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold font-orbitron tracking-wider mb-4">
                <span className="text-gray-300">D</span>
                <span className="text-white">ulcets</span>
              </div>
              <p className="text-gray-400 mb-4">{t("footer.company_desc")}</p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-pink-600 transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-purple-600 transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-white">
                {t("footer.quick_links")}
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 footer-link"
                  >
                    {t("nav.about")}
                  </a>
                </li>
                <li>
                  <a
                    href="#releases"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 footer-link"
                  >
                    {t("nav.releases")}
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 footer-link"
                  >
                    {t("footer.pricing")}
                  </a>
                </li>
                <li>
                  <a
                    href="#artworks"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 footer-link"
                  >
                    {t("footer.artworks")}
                  </a>
                </li>
                <li>
                  <a
                    href="#modeling"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 footer-link"
                  >
                    {t("footer.modeling")}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-white">
                {t("footer.services")}
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#pricing"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 footer-link"
                  >
                    {t("footer.music_production")}
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 footer-link"
                  >
                    {t("footer.mixing_mastering")}
                  </a>
                </li>
                <li>
                  <a
                    href="#artworks"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 footer-link"
                  >
                    {t("footer.artwork_design")}
                  </a>
                </li>
                <li>
                  <a
                    href="#modeling"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 footer-link"
                  >
                    {t("footer.modeling")}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-white">
                {t("footer.subscribe_title")}
              </h3>
              <p className="text-gray-400 mb-4">{t("footer.subscribe_desc")}</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder={t("footer.email_placeholder")}
                  className="px-4 py-2 bg-gray-800/50 border border-white/20 rounded-l-lg focus:outline-none focus:border-blue-500 text-white w-full"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 transition-colors duration-300 rounded-r-lg"
                >
                  {t("footer.subscribe_button")}
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
            <p>{t("footer.copyright")}</p>
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
