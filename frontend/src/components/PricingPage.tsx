import LoadingManager from "@/components/LoadingManager";
import PricingSection from "@/components/PricingSection";

interface PricingPageProps {
  translations: any;
  showTitle?: boolean;
}

export default function PricingPage({ translations, showTitle = true }: PricingPageProps) {
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LoadingManager loadingText={t("loading")}>
      <div className="min-h-screen">
        {/* Hero Section - simplified */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 pt-32">
          <div className="max-w-4xl mx-auto px-8 text-center">
            {showTitle && (
              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
                <span className="relative">
                  {t('pricing_page.title')}
                  <span className="absolute inset-0 text-blue-400 -z-10 translate-x-2 translate-y-2 opacity-20">{t('pricing_page.title')}</span>
                </span>
              </h1>
            )}
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('pricing_page.subtitle')}
            </p>
          </div>
        </section>

        {/* Detailed Pricing Table */}
        <PricingSection translations={translations} />
      </div>
    </LoadingManager>
  );
}
