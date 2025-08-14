import { ComponentWithTranslation } from "@/components/MainPage";

export default function ArtworksSection({ t }: ComponentWithTranslation) {
  return (
    <section className="overflow-x-hidden bg-white text-black">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 md:grid-cols-none gap-x-8">
          {/* Text Content - Left Side */}
          <div className="col-start-1 col-end-5 py-24 xl:col-end-6 md:col-auto md:pb-0 md:pt-16">
            <div className="w-fit rounded-md py-1 px-3 text-xs font-medium uppercase leading-none tracking-wider text-gray-600 bg-gray-100">
              Artwork
            </div>
            <h2 className="mt-4 text-8xl font-light leading-none xl:text-7xl md:text-6xl sm:text-5xl relative">
              <span className="text-black relative">
                绘画作品
                <span className="absolute inset-0 text-blue-500 -z-10 translate-x-2 translate-y-2 opacity-30">绘画作品</span>
              </span><br />展示
            </h2>
            <p className="mr-12 mt-8 text-lg leading-relaxed xl:mr-0 xl:text-base md:mt-6 md:max-w-xl">
              精选二次元风格绘画作品，融合传统艺术与现代数字创作技术，展现独特的艺术视觉魅力和创意表达。
            </p>
            <div className="mt-8 space-y-4 xl:mt-6 md:mt-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                <span className="text-gray-700">角色设计与概念艺术</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                <span className="text-gray-700">场景插画与环境设计</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                <span className="text-gray-700">数字绘画与传统艺术</span>
              </div>
            </div>
            <a className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-medium transition-colors duration-200 hover:bg-gray-800 mt-8 xl:mt-6 md:mt-4" href="#">
              查看作品集
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          
          {/* Images - Right Side */}
          <div className="col-start-5 col-end-13 py-12 xl:col-start-6 md:col-auto md:-mx-7 md:py-8 sm:-mx-4">
            <div className="grid grid-cols-2 gap-4 md:gap-3">
              <div className="space-y-4 md:space-y-3">
                <img 
                  alt="绘画作品1" 
                  loading="lazy" 
                  className="w-full rounded-lg object-cover aspect-[4/5]" 
                  src="https://www.dmoe.cc/random.php?1" 
                />
                <img 
                  alt="绘画作品2" 
                  loading="lazy" 
                  className="w-full rounded-lg object-cover aspect-[4/3]" 
                  src="https://www.dmoe.cc/random.php?2" 
                />
              </div>
              <div className="space-y-4 pt-8 md:space-y-3 md:pt-6">
                <img 
                  alt="绘画作品3" 
                  loading="lazy" 
                  className="w-full rounded-lg object-cover aspect-[4/3]" 
                  src="https://www.dmoe.cc/random.php?3" 
                />
                <img 
                  alt="绘画作品4" 
                  loading="lazy" 
                  className="w-full rounded-lg object-cover aspect-[4/5]" 
                  src="https://www.dmoe.cc/random.php?4" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
