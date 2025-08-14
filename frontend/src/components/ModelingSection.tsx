import { ComponentWithTranslation } from "@/components/MainPage";
import { ModelingPhotos } from "./ModelingSectionWithLightbox";

export default function ModelingSection({ t }: ComponentWithTranslation) {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white relative">
        {/* Tech grid background */}
        <div className="absolute inset-0 tech-grid opacity-30"></div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-32 h-32 bg-cyan-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-blue-400 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex items-center justify-center min-h-screen">
            <div className="grid grid-cols-12 gap-x-16 w-full max-w-7xl">
              {/* Scattered Polaroid Photos - Left Side */}
              <div className="col-start-1 col-end-7 flex items-center justify-center">
                <ModelingPhotos />
              </div>
              
              {/* Text Content - Right Side */}
              <div className="col-start-8 col-end-13 flex flex-col justify-center">
                <h2 className="text-[clamp(4rem,12vw,8rem)] font-bold leading-none text-center">
                  <span className="text-blue-500 relative">
                    3D建模服务
                    <span className="absolute inset-0 text-blue-400 -z-10 translate-x-4 translate-y-4 opacity-60">3D建模服务</span>
                  </span>
                </h2>
                <p className="mt-8 text-lg leading-relaxed text-gray-300 text-center max-w-lg mx-auto">
                  专业的3D建模团队，提供高质量虚拟角色与场景建模服务，从概念设计到完整３Ｄ模型制作，满足动画、游戏和虚拟演出需求。我们的技术团队掌握先进的3D建模技术和工作流程，能够为您提供从角色设计、环境建模到动画绑定的全方位解决方案。无论是精细的角色建模、复杂的场景环境还是精美的材质贴图，都能以最高的标准为您呈现。
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
    </section>
  );
}
