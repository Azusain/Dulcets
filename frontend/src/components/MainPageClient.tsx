"use client";

import { useActiveSection } from '@/hooks/useActiveSection';
import AnimatedStats from '@/components/AnimatedStats';
import BackgroundMusic from '@/components/BackgroundMusic';
import ServiceSection from '@/components/sections/ServiceSection';

// Helper function to get translation value from translations object
function getTranslation(translations: Record<string, any>, key: string): string {
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return the key if path doesn't exist
    }
  }
  
  return typeof value === 'string' ? value : key;
}

interface MainPageClientProps {
  translations: Record<string, any>;
}

export function MainPageClient({ translations }: MainPageClientProps) {
  const activeSection = useActiveSection();

  return (
    <>
      {/* Background Music for Different Sections - 精美但是不做作 */}
      {activeSection && (
        <BackgroundMusic 
          section={activeSection} 
          isActive={true}
        />
      )}
    </>
  );
}

interface AnimatedStatsWrapperProps {
  translations: Record<string, any>;
}

export function AnimatedStatsWrapper({ translations }: AnimatedStatsWrapperProps) {
  // Create a local t function for this component
  const t = (key: string) => getTranslation(translations, key);
  return (
    <AnimatedStats 
      stats={[
        {
          target: 250,
          suffix: '+',
          label: t("about.stats.artists")
        },
        {
          target: 1500,
          suffix: '+',
          label: t("about.stats.releases")
        },
        {
          target: 25000000,
          suffix: 'M+',
          label: t("about.stats.fans")
        }
      ]}
    />
  );
}

interface AnimatedServiceWrapperProps {
  translations: Record<string, any>;
}

export function AnimatedServiceWrapper({ translations }: AnimatedServiceWrapperProps) {
  // Create a local t function for this component
  const t = (key: string) => getTranslation(translations, key);
  
  const services = [
    {
      title: t("services.music.title"),
      description: t("services.music.description"),
      icon: "🎵",
      color: "#3B82F6" // Blue
    },
    {
      title: t("services.artist.title"),
      description: t("services.artist.description"),
      icon: "🎤",
      color: "#EF4444" // Red
    },
    {
      title: t("services.production.title"),
      description: t("services.production.description"),
      icon: "🎧",
      color: "#000000" // Pure Black - Sharp Edge Mode
    },
    {
      title: t("services.distribution.title"),
      description: t("services.distribution.description"),
      icon: "🌐",
      color: "#8B5CF6" // Purple
    },
    {
      title: t("services.marketing.title"),
      description: t("services.marketing.description"),
      icon: "📈",
      color: "#F59E0B" // Orange
    },
    {
      title: t("services.events.title"),
      description: t("services.events.description"),
      icon: "🎪",
      color: "#EC4899" // Pink
    }
  ];

  return (
    <ServiceSection 
      services={services}
      title={t("services.title")}
      subtitle={t("services.subtitle")}
    />
  );
}
