import { ComponentWithTranslation } from "@/components/MainPage";
import { ArtworkPhotos } from "./ArtworksSectionWithLightbox";

export default function ArtworksSection({ t }: ComponentWithTranslation) {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 text-black relative">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-pink-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-300 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-12 md:grid-cols-none gap-x-8">
            {/* Text Content - Left Side */}
            <div className="col-start-1 col-end-5 py-24 xl:col-end-6 md:col-auto md:pb-0 md:pt-16">
              <div className="w-fit rounded-full py-2 px-4 text-xs font-medium uppercase leading-none tracking-wider text-pink-700 bg-white/70 backdrop-blur-sm border border-pink-200">
                ✨ Artwork
              </div>
              <h2 className="mt-6 text-9xl font-bold leading-none xl:text-8xl md:text-7xl sm:text-6xl relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 relative">
                  绘画作品
                  <span className="absolute inset-0 text-pink-300 -z-10 translate-x-3 translate-y-3 opacity-40">绘画作品</span>
                </span><br />
                <span className="text-gray-800">展示</span>
              </h2>
              <p className="mr-12 mt-8 text-lg leading-relaxed xl:mr-0 xl:text-base md:mt-6 md:max-w-xl text-gray-700">
                精选二次元风格绘画作品，融合传统艺术与现代数字创作技术，展现独特的艺术视觉魅力和创意表达。
              </p>
              <div className="mt-8 space-y-4 xl:mt-6 md:mt-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">角色设计与概念艺术</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">场景插画与环境设计</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">数字绘画与传统艺术</span>
                </div>
              </div>
              <a className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium rounded-full transition-all duration-300 hover:from-pink-600 hover:to-purple-600 hover:shadow-lg hover:scale-105 mt-8 xl:mt-6 md:mt-4" href="#">
                查看作品集
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            
            {/* Scattered Polaroid Photos - Right Side */}
            <div className="col-start-5 col-end-13 py-12 xl:col-start-6 md:col-auto md:py-8">
              <ArtworkPhotos />
            </div>
          </div>
        </div>
    </section>
  );
}
