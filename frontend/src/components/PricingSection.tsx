import { ComponentWithTranslation } from "@/components/MainPage";

export default function PricingSection({ t }: ComponentWithTranslation) {
  return (
    <section id="pricing" className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-8">
        {/* Simple Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-6 text-black tracking-wide">{t('pricing_section.title')}</h2>
          <div className="w-20 h-px bg-gray-300 mx-auto mb-8"></div>
          <p className="text-base text-gray-600 leading-relaxed">
            {t('pricing_section.subtitle')}
          </p>
        </div>

        {/* Clean Table-Style Layout */}
        <div className="space-y-12">
          
          {/* Vocal Mix & Mastering */}
          <div className="">
            <h3 className="text-2xl font-light text-black mb-6 pb-2 border-b border-gray-200">{t('pricing_section.vocal_mix_mastering.title')}</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-700">{t('pricing_section.vocal_mix_mastering.one_chorus')}</span>
                <span className="font-medium text-black">{t('pricing_section.vocal_mix_mastering.one_chorus_price')}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">{t('pricing_section.vocal_mix_mastering.full_chorus')}</span>
                <span className="font-medium text-black">{t('pricing_section.vocal_mix_mastering.full_chorus_price')}</span>
              </div>
              <div className="pt-4">
                <p className="text-sm text-gray-600 mb-3">{t('pricing_section.vocal_mix_mastering.options')}</p>
                <div className="pl-4 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{t('pricing_section.vocal_mix_mastering.one_chorus')}</span>
                    <span className="text-gray-700">{t('pricing_section.vocal_mix_mastering.one_chorus_option_price')}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{t('pricing_section.vocal_mix_mastering.full_chorus')}</span>
                    <span className="text-gray-700">{t('pricing_section.vocal_mix_mastering.full_chorus_option_price')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mix & Mastering */}
          <div className="">
            <h3 className="text-2xl font-light text-black mb-6 pb-2 border-b border-gray-200">{t('pricing_section.mix_mastering.title')}</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-700">{t('pricing_section.mix_mastering.tracks_1_20')}</span>
                <span className="font-medium text-black">{t('pricing_section.mix_mastering.tracks_1_20_price')}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-700">{t('pricing_section.mix_mastering.tracks_21_40')}</span>
                <span className="font-medium text-black">{t('pricing_section.mix_mastering.tracks_21_40_price')}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">{t('pricing_section.mix_mastering.tracks_40_plus')}</span>
                <span className="font-medium text-black">{t('pricing_section.mix_mastering.tracks_40_plus_price')}</span>
              </div>
              <div className="pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{t('pricing_section.mix_mastering.vocal_tuning')}</span>
                    <span className="text-gray-700">{t('pricing_section.mix_mastering.vocal_tuning_price')}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{t('pricing_section.mix_mastering.mastering_only')}</span>
                    <span className="text-gray-700">{t('pricing_section.mix_mastering.mastering_only_price')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BGM & Original */}
          <div className="">
            <h3 className="text-2xl font-light text-black mb-6 pb-2 border-b border-gray-200">{t('pricing_section.music_production.title')}</h3>
            <div className="space-y-6">
              <div className="">
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">{t('pricing_section.music_production.intro_bgm')}</span>
                  <span className="font-medium text-black">{t('pricing_section.music_production.intro_bgm_price')}</span>
                </div>
                <p className="text-sm text-gray-500 pl-0 mt-1">{t('pricing_section.music_production.intro_bgm_desc')}</p>
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">{t('pricing_section.music_production.original_arrangement')}</span>
                  <span className="font-medium text-black">{t('pricing_section.music_production.original_arrangement_price')}</span>
                </div>
                <p className="text-sm text-gray-500 pl-0 mt-1">{t('pricing_section.music_production.original_arrangement_desc')}</p>
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">{t('pricing_section.music_production.original_song')}</span>
                  <span className="font-medium text-black">{t('pricing_section.music_production.original_song_price')}</span>
                </div>
                <p className="text-sm text-gray-500 pl-0 mt-1">{t('pricing_section.music_production.original_song_desc')}</p>
              </div>
            </div>
          </div>

          {/* Genres */}
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">{t('pricing_section.genres')}</p>
          </div>

        </div>

        {/* Simple Contact */}
        <div className="text-center mt-16">
          <a 
            href="#contact" 
            className="inline-flex items-center px-8 py-3 text-black border border-gray-300 hover:bg-gray-50 transition-colors duration-200 font-light tracking-wide"
          >
            {t('pricing_section.quote_request')}
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
