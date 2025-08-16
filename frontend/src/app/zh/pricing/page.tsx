import PricingSection from "@/components/PricingSection";
import zh from "../../../../public/locales/zh.json";

export default function ZhPricingPage() {
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = zh;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 pt-32">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            <span className="relative">
              {t('pricing_page.title')}
              <span className="absolute inset-0 text-blue-400 -z-10 translate-x-2 translate-y-2 opacity-20">{t('pricing_page.title')}</span>
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('pricing_page.subtitle')}
          </p>
        </div>
      </section>

      {/* Detailed Pricing Table */}
      <PricingSection translations={zh} />

      {/* Contact Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">{t('pricing_page.contact.title')}</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            {t('pricing_page.contact.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:Dulcets.info@gmail.com"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t('pricing_page.contact.email_consultation')}
            </a>
            <a 
              href="#contact"
              className="inline-flex items-center px-8 py-3 border border-gray-600 text-gray-300 rounded-full hover:border-gray-500 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {t('pricing_page.contact.chat_consultation')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
