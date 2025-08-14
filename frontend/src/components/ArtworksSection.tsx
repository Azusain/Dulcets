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
              <h2 className="mt-6 text-[clamp(6rem,16vw,12rem)] font-bold leading-none relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500 relative">
                  绘画作品
                  <span className="absolute inset-0 text-blue-400 -z-10 translate-x-4 translate-y-4 opacity-60">绘画作品</span>
                </span><br />
                <span className="text-gray-800">展示</span>
              </h2>
              <p className="mr-12 mt-10 text-lg leading-relaxed xl:mr-0 xl:text-base md:mt-8 md:max-w-xl text-gray-700 mb-8">
                精选二次元风格绘画作品，融合传统艺术与现代数字创作技术，展现独特的艺术视觉魅力和创意表达。我们专业的绘画团队致力于角色设计、场景插画和数字艺术创作，为您提供高品质的视觉艺术解决方案。从概念艺术到完整的视觉呈现，我们用精湛的技艺将您的创意想法转化为令人惊叹的艺术作品。
              </p>
              <a className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium transition-all duration-300 hover:from-pink-600 hover:to-purple-600 hover:shadow-lg hover:scale-105 mt-8 xl:mt-6 md:mt-4" href="#">
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
