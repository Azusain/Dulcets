import LoadingManager from "@/components/LoadingManager";
import PricingSection from "@/components/PricingSection";

interface PricingPageProps {
  translations: any;
  showTitle?: boolean;
}

export default function PricingPage({
  translations,
  showTitle = true,
}: PricingPageProps) {
  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = translations;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <div className="min-h-screen">
      <PricingSection translations={translations} />
    </div>
  );
}
