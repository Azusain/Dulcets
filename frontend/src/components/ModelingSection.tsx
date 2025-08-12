"use client";
import { HomePageInterface } from "@/components/MainPage";

export default function ModelingSection({ t }: HomePageInterface) {
  return (
    <section id="modeling" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-bold font-orbitron mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">3D建模服务</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-red-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">专业的3D建模团队，打造高质量虚拟角色与场景</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Character Modeling Card */}
          <div className="modeling-card group relative rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            <div className="aspect-video overflow-hidden">
              <img 
                src="https://www.dmoe.cc/random.php" 
                alt="虚拟角色建模" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors duration-300">
                虚拟角色建模
              </h3>
              <p className="text-gray-300 mb-6">
                从概念设计到完整3D模型，我们提供高质量虚拟角色建模服务，可用于动画、游戏和虚拟偶像直播。
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">高精度角色建模与纹理</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">骨骼绑定与动画设置</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">实时渲染优化</span>
                </li>
              </ul>
              <a 
                href="#" 
                className="inline-block px-6 py-3 bg-yellow-600/80 hover:bg-yellow-500 transition-colors duration-300 rounded-lg text-white font-medium"
              >
                了解更多
              </a>
            </div>
          </div>

          {/* Scene Modeling Card */}
          <div className="modeling-card group relative rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]">
            <div className="aspect-video overflow-hidden">
              <img 
                src="https://www.dmoe.cc/random.php" 
                alt="场景建模" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors duration-300">
                场景与道具建模
              </h3>
              <p className="text-gray-300 mb-6">
                打造沉浸式虚拟场景与道具，为音乐MV、游戏和虚拟演出提供高质量3D环境资产。
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">环境场景设计与建模</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">高精度道具建模</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">光照与材质设置</span>
                </li>
              </ul>
              <a 
                href="#" 
                className="inline-block px-6 py-3 bg-red-600/80 hover:bg-red-500 transition-colors duration-300 rounded-lg text-white font-medium"
              >
                了解更多
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
