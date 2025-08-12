"use client";
import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import ArtworksSection from "@/components/ArtworksSection";
import ModelingSection from "@/components/ModelingSection";

export interface HomePageInterface {
  t: (key: string) => string;
}

export function MainPage({ t }: HomePageInterface) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('MainPage mounted, setting up timer...');
    
    // Hide loader after a delay
    const timer = setTimeout(() => {
      console.log('Timer fired, hiding loader...');
      setIsLoading(false);
    }, 3000); // 3 seconds for testing

    return () => {
      console.log('Cleanup timer');
      clearTimeout(timer);
    };
  }, []);

  console.log('MainPage render, isLoading:', isLoading);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Loading Animation - SIMPLIFIED FOR TESTING */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="text-6xl font-bold text-white mb-4">
              <span className="text-blue-400">D</span><span className="text-pink-500">ulcets</span>
            </div>
            <div className="text-2xl text-white">{t("loading")}</div>
            <div className="text-sm text-gray-400 mt-4">Loading will hide in 3 seconds...</div>
          </div>
        </div>
      )}

      {/* TEST CONTENT - Should be visible after loading */}
      <div id="main-content" className="duration-1000">
        <div className="min-h-screen bg-red-900 text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4">MAIN CONTENT VISIBLE!</h1>
            <p className="text-2xl">This content should appear after loading screen disappears</p>
            <p className="text-lg mt-4">If you see this, the loading mechanism is working correctly</p>
          </div>
        </div>
        
        {/* Hero Section with Video Background */}
        <HeroSection t={t} />

        {/* About Us Section */}
        <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-bold font-orbitron mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{t("about.title")}</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-pink-500 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-r from-blue-500 to-pink-500 rounded-lg blur opacity-30"></div>
                <div className="relative bg-gray-800/50 backdrop-blur-md p-8 rounded-lg border border-white/10">
                  <h3 className="text-2xl font-bold mb-4 text-blue-400">{t("about.story_title")}</h3>
                  <p className="text-gray-300 mb-4">{t("about.story_p1")}</p>
                  <p className="text-gray-300 mb-4">{t("about.story_p2")}</p>
                  <div className="mt-8 flex space-x-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400">20+</div>
                      <div className="text-gray-400 text-sm">{t("about.stats.artists")}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-pink-400">100+</div>
                      <div className="text-gray-400 text-sm">{t("about.stats.releases")}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400">5M+</div>
                      <div className="text-gray-400 text-sm">{t("about.stats.fans")}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-pink-600/20 rounded-2xl transform rotate-3"></div>
                <img src="https://www.dmoe.cc/random.php" alt="Dulcets工作室" className="relative rounded-2xl w-full h-auto shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Latest Releases Section */}
        <section id="releases" className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-bold font-orbitron mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">{t("releases.title")}</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-pink-500 mx-auto mb-6"></div>
              <p className="text-gray-400 max-w-2xl mx-auto">{t("releases.desc")}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Album Cards */}
              {[
                { title: "星际漫游", artist: "星梦", date: "2023-06-15", color: "blue" },
                { title: "破界", artist: "龙刃", date: "2023-05-22", color: "pink" },
                { title: "数字梦境", artist: "星梦", date: "2023-04-10", color: "green" },
                { title: "燃烧的灵魂", artist: "龙刃", date: "2023-03-05", color: "yellow" }
              ].map((album, index) => (
                <div key={index} className={`album-card group relative rounded-lg overflow-hidden bg-gray-800/30 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(${
                  album.color === 'blue' ? '59,130,246' :
                  album.color === 'pink' ? '236,72,153' :
                  album.color === 'green' ? '16,185,129' : '245,158,11'
                },0.3)]`}>
                  <div className="relative aspect-square overflow-hidden">
                    <img src="https://www.dmoe.cc/random.php" alt={album.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button className={`w-16 h-16 rounded-full bg-${album.color}-600 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300`}>
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className={`text-lg font-bold mb-1 text-white group-hover:text-${album.color}-400 transition-colors duration-300`}>{album.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{album.artist}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{album.date}</span>
                      <div className="flex space-x-2">
                        <a href="#" className={`text-gray-400 hover:text-${album.color}-400 transition-colors duration-300`}>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Music Production Services Section */}
        <section id="production" className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-bold font-orbitron mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">{t("music_production")}</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-pink-500 mx-auto mb-6"></div>
              <p className="text-gray-400 max-w-2xl mx-auto">{t("music_production.desc")}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Production & Recording */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <div className="w-16 h-16 bg-blue-600/30 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.12 2-2.5 2S4 20.105 4 19m10 0c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{t("music_production.services.recording.title")}</h3>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">{t("music_production.services.recording.feature1")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">经验丰富的录音师全程指导</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">多轨录音与精细后期处理</span>
                  </li>
                </ul>
              </div>

              {/* Musicians & Singers */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                <div className="w-16 h-16 bg-pink-600/30 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">乐手与歌手准备</h3>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-pink-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">专业乐手团队，涵盖各类乐器</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-pink-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">歌手声乐指导与情感表达训练</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-pink-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">个性化编曲与和声设计</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <PricingSection t={t} />

        {/* Artworks Section */}
        <ArtworksSection t={t} />

        {/* 3D Modeling Section */}
        <ModelingSection t={t} />

        {/* Footer */}
        <footer className="bg-black text-white py-12 border-t border-white/10">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="text-2xl font-bold font-orbitron tracking-wider mb-4">
                  <span className="text-blue-400">D</span><span className="text-pink-500">ulcets</span>
                </div>
                <p className="text-gray-400 mb-4">{t("footer.company_desc")}</p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-pink-600 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-purple-600 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4 text-white">{t("footer.quick_links")}</h3>
                <ul className="space-y-2">
                  <li><a href="#about" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 footer-link">{t("nav.about")}</a></li>
                  <li><a href="#releases" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 footer-link">{t("nav.releases")}</a></li>
                  <li><a href="#pricing" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 footer-link">价格表</a></li>
                  <li><a href="#artworks" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 footer-link">绘画作品</a></li>
                  <li><a href="#modeling" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 footer-link">3D建模</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4 text-white">{t("footer.contact_us")}</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span className="text-gray-400">{t("footer.address")}</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <span className="text-gray-400">{t("footer.email")}</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <span className="text-gray-400">090-3150-4067</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4 text-white">{t("footer.subscribe_title")}</h3>
                <p className="text-gray-400 mb-4">{t("footer.subscribe_desc")}</p>
                <form className="flex">
                  <input type="email" placeholder={t("footer.email_placeholder")} className="px-4 py-2 bg-gray-800/50 border border-white/20 rounded-l-lg focus:outline-none focus:border-blue-500 text-white w-full" />
                  <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 transition-colors duration-300 rounded-r-lg">{t("footer.subscribe_button")}</button>
                </form>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
              <p>{t("footer.copyright")}</p>
            </div>
          </div>
        </footer>

        {/* Back to Top Button */}
        <button id="back-to-top" className="fixed bottom-8 right-8 bg-purple-600/80 hover:bg-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 opacity-0 invisible">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
