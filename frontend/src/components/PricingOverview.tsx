"use client";

import { useRouter } from "next/navigation";

export default function PricingOverview() {
  const router = useRouter();

  const handleViewDetails = () => {
    // Get current language from URL path
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    let targetPath = '/jp/pricing'; // Default to Japanese version

    if (currentPath.startsWith('/en')) {
      targetPath = '/en/pricing';
    } else if (currentPath.startsWith('/jp')) {
      targetPath = '/jp/pricing';
    } else if (currentPath.startsWith('/zh')) {
      targetPath = '/zh/pricing';
    }

    // For GitHub Pages, use window.location to ensure proper navigation
    if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
      const basePath = '/Dulcets';
      window.location.href = basePath + targetPath;
    } else {
      router.push(targetPath);
    }
  };

  return (
    <section id="pricing" className="relative bg-gray-50 py-24">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-30"></div>
        <div className="absolute bottom-20 right-16 w-24 h-24 bg-gradient-to-tl from-purple-100 to-transparent rounded-full opacity-40"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-sm font-medium uppercase tracking-wider text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
              💰 Pricing
            </span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black leading-tight text-gray-900 mb-6">
            <span className="relative">
              料金プラン
              <span className="absolute inset-0 text-blue-400 -z-10 translate-x-2 translate-y-2 opacity-20">料金プラン</span>
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            透明性のある料金体系で、お客様のニーズに合わせた音楽制作サービスを提供いたします
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Vocal Mix Card */}
          <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">歌ってみた</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                ボーカルミックス・マスタリング専門プラン
              </p>
              
              <div className="space-y-3 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">ワンコーラス</span>
                  <span className="font-semibold text-blue-600">￥8,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">フルコーラス</span>
                  <span className="font-semibold text-blue-600">￥12,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full Production Card */}
          <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">楽曲制作</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                オリジナル楽曲・BGM制作サービス
              </p>
              
              <div className="space-y-3 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">BGMアレンジ</span>
                  <span className="font-semibold text-purple-600">￥50,000〜</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">オリジナル楽曲</span>
                  <span className="font-semibold text-purple-600">￥150,000〜</span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Mix Card */}
          <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v3M7 4H5a1 1 0 00-1 1v3m0 0v8a1 1 0 001 1h3m0 0h8m0 0h3a1 1 0 001-1V8m0 0V5a1 1 0 00-1-1h-2" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">ミックス</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                プロフェッショナルミックス・マスタリング
              </p>
              
              <div className="space-y-3 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">1〜20 tracks</span>
                  <span className="font-semibold text-green-600">￥30,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">21〜40 tracks</span>
                  <span className="font-semibold text-green-600">￥35,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-8 bg-white rounded-full px-8 py-4 shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">J-Pop・J-Rock</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">アニメソング</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">BGM制作</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={handleViewDetails}
            className="group inline-flex items-center px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>詳細料金表を見る</span>
            <svg className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          
          <p className="mt-4 text-sm text-gray-500">
            お見積もり・ご相談はお気軽にお問い合わせください
          </p>
        </div>
      </div>
    </section>
  );
}
