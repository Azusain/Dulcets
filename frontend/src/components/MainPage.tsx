import HeroSection from '@/components/HeroSection';
import PricingSection from '@/components/PricingSection';
import ArtworksSection from '@/components/ArtworksSection';
import ModelingSection from '@/components/ModelingSection';
import ContactSection from '@/components/ContactSection';
import { MainPageClient, AnimatedStatsWrapper } from '@/components/MainPageClient';
import SlideCoverAnimation from '@/components/animations/SlideCoverAnimation';

export interface HomePageInterface {
  translations: Record<string, any>;
}

// Helper function to get translation value from translations object
function getTranslation(translations: Record<string, any>, key: string): string {
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return the key if path doesn't exist
    }
  }
  
  return typeof value === 'string' ? value : key;
}

export function MainPage({ translations }: HomePageInterface) {
  // Create a local t function for this component
  const t = (key: string) => getTranslation(translations, key);
  return (
    <div className="min-h-screen bg-black text-white">
      {/* CSS-Only Loading Animation */}
      <div className="loading-screen fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="text-6xl font-bold text-white mb-4">
            <span className="text-gray-300">D</span>
            <span className="text-white">ulcets</span>
          </div>
          <div className="text-2xl text-gray-300 mb-4">{t("loading")}</div>
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="main-content" className="main-content">
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
        <section id="about" className="py-24 bg-gray-50 text-black">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-4xl font-light mb-12 text-center">
                {t("about.title")}
              </h2>
            </div>

            {/* Main Content Area: Text on left, Genres on right */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Left: About Content */}
              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed">{t("about.content")}</p>
              </div>

              {/* Right: Music Genres */}
              <div className="border-l border-gray-200 pl-12">
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-3xl font-light mb-2">
                      {t("about.genres.anime_song.title")}
                    </h3>
                    <p className="text-gray-600">
                      {t("about.genres.anime_song.subtitle")}
                    </p>
                  </div>
                  <div className="border-t border-gray-200 pt-8">
                    <div className="text-center">
                      <h3 className="text-3xl font-light mb-2">
                        {t("about.genres.jrock.title")}
                      </h3>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-8">
                    <div className="text-center">
                      <h3 className="text-3xl font-light mb-2">
                        {t("about.genres.jpop.title")}
                      </h3>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-8">
                    <div className="text-center">
                      <h3 className="text-3xl font-light mb-2">
                        {t("about.genres.bgm.title")}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Stats at bottom */}
            <AnimatedStatsWrapper translations={translations} />
          </div>
        </section>

        {/* Our Works Section */}
        <section id="works" className="py-24 bg-gray-50 text-black">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-4xl font-normal mb-12 text-center">
                {t("works.title")}
              </h2>
            </div>

            {/* Works Grid Layout */}
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  title: "【オリジナル曲】Dulcets - Aquamarine piano ver.",
                  titleEn: "【Original Song】Dulcets - Aquamarine piano ver.",
                  titleJp: "【オリジナル曲】Dulcets - Aquamarine piano ver.",
                  excerpt:
                    "Dulcets原創作品《Aquamarine》鋼琴版本！純淨的鋼琴旋律演繹，展現歌曲不同層次的情感深度，189次觀看...",
                  excerptEn:
                    "Dulcets original work 'Aquamarine' piano version! Pure piano melody interpretation, showcasing different emotional depths of the song, 189 views...",
                  excerptJp:
                    "Dulcetsオリジナル作品『Aquamarine』ピアノバージョン！純粋なピアノメロディで楽曲の異なる感情の深さを表現、189回視聴...",
                  date: "1個月前",
                  duration: "3:20",
                  image: "https://i.ytimg.com/vi/IpEJkpp1GM4/hqdefault.jpg",
                  videoUrl: "https://www.youtube.com/watch?v=IpEJkpp1GM4",
                },
                {
                  title: "【MV】【歌ってみた】クリスマスソング（covered by Dulcets）",
                  titleEn: "【MV】【Cover】Christmas Song (covered by Dulcets)",
                  titleJp: "【MV】【歌ってみた】クリスマスソング（covered by Dulcets）",
                  excerpt:
                    "Dulcets翻唱經典聖誕歌曲！溫暖的聲線與精美的MV製作，為您帶來不一樣的節日音樂體驗，519次觀看...",
                  excerptEn:
                    "Dulcets covers classic Christmas songs! Warm vocals and beautiful MV production bring you a different holiday music experience, 519 views...",
                  excerptJp:
                    "Dulcetsがクラシックなクリスマスソングをカバー！暖かい歌声と美しいMV制作で、異なるホリデーミュージック体験をお届け、519回視聴...",
                  date: "7個月前",
                  duration: "5:44",
                  image: "https://i.ytimg.com/vi/C81j_2dgwh0/hqdefault.jpg",
                  videoUrl: "https://www.youtube.com/watch?v=C81j_2dgwh0",
                },
                {
                  title: "【オリジナル曲】Dulcets - 君と奏でる歌 feat.若草 Short Ver.",
                  titleEn: "【Original Song】Dulcets - Song to Play with You feat.Wakakusa Short Ver.",
                  titleJp: "【オリジナル曲】Dulcets - 君と奏でる歌 feat.若草 Short Ver.",
                  excerpt:
                    "Dulcets與若草合作的原創作品短版！溫柔的旋律與動人的歌聲，訴說著與你共同演奏的美好時光，655次觀看...",
                  excerptEn:
                    "Short version of Dulcets collaboration with Wakakusa! Gentle melodies and moving vocals tell the story of beautiful moments playing together, 655 views...",
                  excerptJp:
                    "Dulcetsと若草のコラボレーション作品のショートバージョン！優しいメロディーと心動かす歌声で、一緒に奏でる美しい時間を歌います、655回視聴...",
                  date: "8個月前",
                  duration: "2:11",
                  image: "https://i.ytimg.com/vi/tL7TZv6vq-U/hqdefault.jpg",
                  videoUrl: "https://www.youtube.com/watch?v=tL7TZv6vq-U",
                },
                {
                  title: "【オリジナルMV】Dulcets x Kuri - 星空のプレッジ feat. Kuri",
                  titleEn: "【Original MV】Dulcets x Kuri - Starry Sky Pledge feat. Kuri",
                  titleJp: "【オリジナルMV】Dulcets x Kuri - 星空のプレッジ feat. Kuri",
                  excerpt:
                    "Dulcets與Kuri合作的原創MV！在星空下許下的誓言，配上精美的視覺效果與感人的旋律，2784次觀看...",
                  excerptEn:
                    "Original MV collaboration between Dulcets and Kuri! A pledge made under the starry sky, with beautiful visuals and touching melodies, 2784 views...",
                  excerptJp:
                    "DulcetsとKuriのコラボレーションによるオリジナルMV！星空の下で交わす誓いを、美しい映像と感動的なメロディーで表現、2784回視聴...",
                  date: "9個月前",
                  duration: "5:59",
                  image: "https://i.ytimg.com/vi/iuhEOhyqo8g/hqdefault.jpg",
                  videoUrl: "https://www.youtube.com/watch?v=iuhEOhyqo8g",
                },
                {
                  title: "【オリジナル曲】Dulcets - 星空のプレッジ feat. GUMI",
                  titleEn: "【Original Song】Dulcets - Starry Sky Pledge feat. GUMI",
                  titleJp: "【オリジナル曲】Dulcets - 星空のプレッジ feat. GUMI",
                  excerpt:
                    "Dulcets與虛擬歌姬GUMI合作的原創作品！星空下的誓言主題，結合電子音樂與溫暖人聲，717次觀看...",
                  excerptEn:
                    "Dulcets collaboration with virtual singer GUMI! Starry sky pledge theme combining electronic music with warm vocals, 717 views...",
                  excerptJp:
                    "Dulcetsとバーチャルシンガー・GUMIのコラボレーション！星空の誓いをテーマに、エレクトロニックミュージックと温かいボーカルを融合、717回視聴...",
                  date: "9個月前",
                  duration: "3:45",
                  image: "https://i.ytimg.com/vi/Udq_uBulCfU/hqdefault.jpg",
                  videoUrl: "https://www.youtube.com/watch?v=Udq_uBulCfU",
                },
                {
                  title: "【オリジナルMV】Dulcets x Kuri - Aquamarine feat. Kuri",
                  titleEn: "【Original MV】Dulcets x Kuri - Aquamarine feat. Kuri",
                  titleJp: "【オリジナルMV】Dulcets x Kuri - Aquamarine feat. Kuri",
                  excerpt:
                    "Dulcets與Kuri再度攜手創作的《Aquamarine》完整MV版本！海洋般的清澈旋律與夢幻視覺效果，988次觀看...",
                  excerptEn:
                    "Full MV version of 'Aquamarine' - another collaboration between Dulcets and Kuri! Ocean-like clear melodies with dreamy visual effects, 988 views...",
                  excerptJp:
                    "DulcetsとKuriの再度のコラボレーション『Aquamarine』のフルMVバージョン！海のように澄んだメロディーと夢幻的な映像効果、988回視聴...",
                  date: "10個月前",
                  duration: "4:39",
                  image: "https://i.ytimg.com/vi/kU0SVmVSrz4/hqdefault.jpg",
                  videoUrl: "https://www.youtube.com/watch?v=kU0SVmVSrz4",
                },
              ].map((post, index) => {
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
                  <article key={index} className="group overflow-hidden">
                    {/* Image */}
                    <div className="aspect-[16/9] overflow-hidden mb-5">
                      <img
                        src={post.image}
                        alt={content.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <div className="text-sm text-gray-500 mb-2">
                        {post.date}
                      </div>
                      <h3 className="text-xl font-normal mb-3 text-black">
                        <a
                          href="#"
                          className="hover:text-gray-600 transition-colors duration-200"
                        >
                          {content.title}
                        </a>
                      </h3>

                      <p className="text-gray-700 text-base mb-4">
                        {content.excerpt}
                      </p>

                      <a
                        className="text-sm text-gray-500 hover:text-black transition-colors duration-200"
                        href="#"
                      >
                        {t("works.read_more")} →
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <PricingSection t={t} />

        {/* Artworks Section */}
        <ArtworksSection t={t} />

        {/* 3D Modeling Section */}
        <ModelingSection t={t} />

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
                <p className="text-gray-400 mb-4">
                  {t("footer.subscribe_desc")}
                </p>
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
        
        {/* Client-side functionality (Background Music, etc.) */}
        <MainPageClient translations={translations} />
      </div>
    </div>
  );
}
