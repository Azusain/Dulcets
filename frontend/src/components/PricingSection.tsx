"use client";
import { HomePageInterface } from "@/components/MainPage";

export default function PricingSection({ t }: HomePageInterface) {
  return (
    <section id="pricing" className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-bold font-orbitron mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-500">服务价位</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-yellow-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">透明合理的价格体系，满足不同音乐制作需求</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">基础制作</h3>
              <div className="text-3xl font-bold text-white">¥8,800<span className="text-sm font-normal text-gray-400">/首</span></div>
            </div>
            <div className="p-6">
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">3小时录音时间</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">基础混音与母带处理</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">1名录音师服务</span>
                </li>
                <li className="flex items-start text-gray-500">
                  <svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span>乐手与歌手指导</span>
                </li>
                <li className="flex items-start text-gray-500">
                  <svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span>著作权让渡</span>
                </li>
              </ul>
              <a href="#" className="block w-full py-3 bg-purple-600/80 hover:bg-purple-500 transition-colors duration-300 rounded-lg text-center font-medium">选择此方案</a>
            </div>
          </div>

          {/* Professional Plan (Featured) */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border-2 border-purple-500 transform transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] relative">
            <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1">推荐</div>
            <div className="p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">专业制作</h3>
              <div className="text-3xl font-bold text-white">¥18,800<span className="text-sm font-normal text-gray-400">/首</span></div>
            </div>
            <div className="p-6">
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">8小时录音时间</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">高级混音与母带处理</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">1名录音师+1名制作人</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">基础乐手与歌手指导</span>
                </li>
                <li className="flex items-start text-gray-500">
                  <svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span>著作权让渡</span>
                </li>
              </ul>
              <a href="#" className="block w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity duration-300 rounded-lg text-center font-medium">选择此方案</a>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">全能制作</h3>
              <div className="text-3xl font-bold text-white">¥38,800<span className="text-sm font-normal text-gray-400">/首</span></div>
            </div>
            <div className="p-6">
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">无限录音时间</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">顶级混音与母带处理</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">全套制作团队服务</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">专业乐手与歌手指导</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">完整著作权让渡</span>
                </li>
              </ul>
              <a href="#" className="block w-full py-3 bg-purple-600/80 hover:bg-purple-500 transition-colors duration-300 rounded-lg text-center font-medium">选择此方案</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
