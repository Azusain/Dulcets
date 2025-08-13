import { HomePageInterface } from "@/components/MainPage";

export default function ModelingSection({ t }: HomePageInterface) {
  return (
    <section className="overflow-x-hidden bg-gray-50 text-black">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 md:grid-cols-none gap-x-8">
          {/* Images - Left Side */}
          <div className="col-start-1 col-end-8 py-12 xl:col-end-7 md:col-auto md:-mx-7 md:py-8 sm:-mx-4">
            <div className="grid grid-cols-2 gap-4 md:gap-3">
              <div className="space-y-4 md:space-y-3">
                <img 
                  alt="3D建模作品1" 
                  loading="lazy" 
                  className="w-full rounded-lg object-cover aspect-[4/5]" 
                  src="https://www.dmoe.cc/random.php?5" 
                />
                <img 
                  alt="3D建模作品2" 
                  loading="lazy" 
                  className="w-full rounded-lg object-cover aspect-[16/9]" 
                  src="https://www.dmoe.cc/random.php?6" 
                />
              </div>
              <div className="space-y-4 pt-8 md:space-y-3 md:pt-6">
                <img 
                  alt="3D建模作品3" 
                  loading="lazy" 
                  className="w-full rounded-lg object-cover aspect-[3/4]" 
                  src="https://www.dmoe.cc/random.php?7" 
                />
                <img 
                  alt="3D建模作品4" 
                  loading="lazy" 
                  className="w-full rounded-lg object-cover aspect-[4/3]" 
                  src="https://www.dmoe.cc/random.php?8" 
                />
              </div>
            </div>
          </div>
          
          {/* Text Content - Right Side */}
          <div className="col-start-8 col-end-13 py-24 xl:col-start-7 md:col-auto md:pb-0 md:pt-16">
            <div className="w-fit rounded-md py-1 px-3 text-xs font-medium uppercase leading-none tracking-wider text-gray-600 bg-gray-200">
              3D Modeling
            </div>
            <h2 className="mt-4 text-8xl font-light leading-none xl:text-7xl md:text-6xl sm:text-5xl relative">
              <span className="text-black relative">
                3D 建模
                <span className="absolute inset-0 text-purple-500 -z-10 translate-x-2 translate-y-2 opacity-30">3D 建模</span>
              </span><br />服务
            </h2>
            <p className="mt-8 text-lg leading-relaxed xl:text-base md:mt-6">
              专业的3D建模团队，提供高质量虚拟角色与场景建模服务，从概念设计到完整3D模型制作，满足动画、游戏和虚拟演出需求。
            </p>
            <div className="mt-8 space-y-4 xl:mt-6 md:mt-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                <span className="text-gray-700">虚拟角色建模与绑定</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                <span className="text-gray-700">场景环境与道具制作</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                <span className="text-gray-700">纹理材质与光照设置</span>
              </div>
            </div>
            <a className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-medium transition-colors duration-200 hover:bg-gray-800 mt-8 xl:mt-6 md:mt-4" href="#">
              了解建模服务
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
