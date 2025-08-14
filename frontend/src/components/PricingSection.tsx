import { ComponentWithTranslation } from "@/components/MainPage";

export default function PricingSection({ t }: ComponentWithTranslation) {
  return (
    <section id="pricing" className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-8">
        {/* Simple Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-6 text-black tracking-wide">料金表</h2>
          <div className="w-20 h-px bg-gray-300 mx-auto mb-8"></div>
          <p className="text-base text-gray-600 leading-relaxed">
            音楽制作の各種サービス料金をご案内いたします
          </p>
        </div>

        {/* Clean Table-Style Layout */}
        <div className="space-y-12">
          
          {/* Vocal Mix & Mastering */}
          <div className="">
            <h3 className="text-2xl font-light text-black mb-6 pb-2 border-b border-gray-200">歌ってみた Mix & Mastering</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-700">ワンコーラス</span>
                <span className="font-medium text-black">￥8,000</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">フルコーラス</span>
                <span className="font-medium text-black">￥12,000</span>
              </div>
              <div className="pt-4">
                <p className="text-sm text-gray-600 mb-3">オプション: Vocal Tuning & Timing</p>
                <div className="pl-4 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">ワンコーラス</span>
                    <span className="text-gray-700">+￥5,000</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">フルコーラス</span>
                    <span className="text-gray-700">+￥7,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mix & Mastering */}
          <div className="">
            <h3 className="text-2xl font-light text-black mb-6 pb-2 border-b border-gray-200">Mix & Mastering</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-700">1～20 tracks</span>
                <span className="font-medium text-black">￥30,000</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-700">21～40 tracks</span>
                <span className="font-medium text-black">￥35,000</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">40 tracks 以上</span>
                <span className="font-medium text-black">+￥500 / track</span>
              </div>
              <div className="pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Vocal Tuning & Timing</span>
                    <span className="text-gray-700">+￥7,000</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Mastering のみ</span>
                    <span className="text-gray-700">￥6,000 / track</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BGM & Original */}
          <div className="">
            <h3 className="text-2xl font-light text-black mb-6 pb-2 border-b border-gray-200">楽曲制作</h3>
            <div className="space-y-6">
              <div className="">
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Intro/BGM アレンジ</span>
                  <span className="font-medium text-black">￥50,000 - ￥120,000</span>
                </div>
                <p className="text-sm text-gray-500 pl-0 mt-1">1:30 BGM トラック、Mix、Mastering 込み</p>
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">オリジナルアレンジ</span>
                  <span className="font-medium text-black">￥70,000～</span>
                </div>
                <p className="text-sm text-gray-500 pl-0 mt-1">TV サイズ カスタムカバー楽曲インスト</p>
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">オリジナル楽曲</span>
                  <span className="font-medium text-black">￥150,000～</span>
                </div>
                <p className="text-sm text-gray-500 pl-0 mt-1">メロディ・歌詞制作込み</p>
              </div>
            </div>
          </div>

          {/* Genres */}
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">対応ジャンル: J-Pop・J-Rock・アニメソング・BGM など</p>
          </div>

        </div>

        {/* Simple Contact */}
        <div className="text-center mt-16">
          <a 
            href="#contact" 
            className="inline-flex items-center px-8 py-3 text-black border border-gray-300 hover:bg-gray-50 transition-colors duration-200 font-light tracking-wide"
          >
            お見積もり依頼
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
