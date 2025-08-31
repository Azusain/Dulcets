"use client";
import HeroSection from "@/components/HeroSection";
import UnifiedServicesSection from "@/components/UnifiedServicesSection";
import ContactSection from "@/components/ContactSection";
import AboutSection from "@/components/AboutSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import OurWorksSection from "@/components/OurWorksSection";
import LoadingManager from "@/components/LoadingManager";
import FollowUsIcons from "./FollowUs";
export interface HomePageInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translations: Record<string, any>;
}

export interface ComponentWithTranslation {
  t: (key: string) => string;
}

// Helper function to get translation value from translations object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getTranslation(
  translations: Record<string, any>,
  key: string
): string {
  const keys = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations;

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      return key; // Return the key if path doesn't exist
    }
  }

  return typeof value === "string" ? value : key;
}

export function MainPage({ translations }: HomePageInterface) {
  // Create a local t function for this component
  const t = (key: string) => getTranslation(translations, key);
  return (
    <LoadingManager loadingText={t("loading")}>
      <HeroSection t={t} />

      <div className="-mt-12">
        <AboutSection t={t} />
      </div>

      <OurWorksSection t={t} />

      <WhyChooseUsSection t={t} />

      <div className="z-0">
        <UnifiedServicesSection translations={translations} />
      </div>

      <ContactSection t={t} />

      {/* Footer with Follow Us section */}
      <footer className="bg-black text-white py-12 border-t border-white/10">
        <FollowUsIcons t={t} />
      </footer>
    </LoadingManager>
  );
}
