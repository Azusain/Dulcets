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
          <div className="flex items-center justify-center min-h-screen">
            <div className="grid grid-cols-12 gap-x-16 w-full max-w-7xl">
              {/* Text Content - Left Side */}
              <div className="col-start-1 col-end-6 flex flex-col justify-center">
                <h2 className="text-[clamp(4rem,12vw,8rem)] font-bold leading-none text-center">
                  <span className="text-blue-500 relative">
                    绘画作品展示
                    <span className="absolute inset-0 text-blue-400 -z-10 translate-x-4 translate-y-4 opacity-60">绘画作品展示</span>
                  </span>
                </h2>
                <p className="mt-8 text-lg leading-relaxed text-gray-700 text-center max-w-lg mx-auto">
                  精选二次元风格绘画作品，融合传统艺术与现代数字创作技术，展现独特的艺术视觉魅力和创意表达。我们专业的绘画团队致力于角色设计、场景插画和数字艺术创作，为您提供高品质的视觉艺术解决方案。从概念艺术到完整的视觉呈现，我们用精湛的技艺将您的创意想法转化为令人惊叹的艺术作品。
                </p>
              </div>
              
              {/* Scattered Polaroid Photos - Right Side */}
              <div className="col-start-7 col-end-13 flex items-center justify-center">
                <ArtworkPhotos />
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
