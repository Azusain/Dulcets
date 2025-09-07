// SEO metadata configuration and utilities

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  canonicalUrl?: string;
  hreflangUrls?: { [key: string]: string };
}

// type definitions for SEO config
type LanguageCode = "ja" | "en" | "zh";
type PageType = "base" | "home" | "about" | "services" | "works" | "contact";

interface SEOConfig {
  titles: Record<LanguageCode, Record<PageType, string>>;
  descriptions: Record<LanguageCode, Record<PageType, string>>;
  base: {
    keywords: string[];
    ogType: string;
    twitterCard: string;
    ogImage: string;
  };
  pages: Record<Exclude<PageType, "base">, {
    keywords: string[];
    ogTitle: Record<LanguageCode, string>;
  }>;
  schemas: {
    organization: any;
    musicGroup: any;
    localBusiness: any;
  };
}

// cached config
let seoConfig: SEOConfig | null = null;

// detect language from route
export function detectLanguageFromRoute(pathname: string): LanguageCode {
  if (pathname.startsWith("/jp") || pathname.startsWith("/jp/")) {
    return "ja";
  }
  if (pathname.startsWith("/en") || pathname.startsWith("/en/")) {
    return "en";
  }
  if (pathname.startsWith("/zh") || pathname.startsWith("/zh/")) {
    return "zh";
  }
  // default to japanese for routes without language prefix
  return "ja";
}

// load SEO config from JSON
export async function loadSEOConfig(): Promise<SEOConfig> {
  if (seoConfig) {
    return seoConfig;
  }

  const response = await fetch("/seo/config.json");
  if (!response.ok) {
    throw new Error(`failed to load SEO config: ${response.status} ${response.statusText}`);
  }
  
  seoConfig = await response.json();
  return seoConfig!;
}

import { generateCanonicalUrl, getAssetUrl } from "./deployment";

// get structured data schemas from config with language support
export async function getOrganizationSchema(language: LanguageCode = "ja") {
  const config = await loadSEOConfig();
  const schema = config.schemas.organization;
  return {
    ...schema,
    description: schema.description[language] || schema.description.ja,
    url: generateCanonicalUrl(),
    logo: getAssetUrl(schema.logo),
  };
}

export async function getMusicGroupSchema(language: LanguageCode = "ja") {
  const config = await loadSEOConfig();
  const schema = config.schemas.musicGroup;
  return {
    ...schema,
    description: schema.description[language] || schema.description.ja,
    url: generateCanonicalUrl(),
  };
}

export async function getLocalBusinessSchema(language: LanguageCode = "ja") {
  const config = await loadSEOConfig();
  const schema = config.schemas.localBusiness;
  return {
    ...schema,
    description: schema.description[language] || schema.description.ja,
    url: generateCanonicalUrl(),
    offers: {
      ...schema.offers,
      description: schema.offers.description[language] || schema.offers.description.ja,
    },
  };
}

// legacy exports - these return promises
export const organizationSchema = getOrganizationSchema();
export const musicGroupSchema = getMusicGroupSchema();
export const localBusinessSchema = getLocalBusinessSchema();

// generate hreflang URLs for multilingual support
export function generateHreflangUrls(path: string = ""): {
  [key: string]: string;
} {
  const baseUrl = generateCanonicalUrl();
  return {
    ja: `${baseUrl}/jp${path}`,
    en: `${baseUrl}/en${path}`,
    zh: `${baseUrl}/zh${path}`,
    "x-default": `${baseUrl}${path}`,
  };
}

// get localized title based on language and route
export async function getLocalizedTitle(
  page: Exclude<PageType, "base">,
  language: LanguageCode = "ja"
): Promise<string> {
  const config = await loadSEOConfig();
  return config.titles[language][page] || config.titles.ja[page];
}

// get localized description
export async function getLocalizedDescription(
  page: Exclude<PageType, "base">,
  language: LanguageCode = "ja"
): Promise<string> {
  const config = await loadSEOConfig();
  return config.descriptions[language][page] || config.descriptions.ja[page];
}

// get localized page SEO data with route-based language detection
export async function getLocalizedPageSEO(
  page: Exclude<PageType, "base">,
  language: LanguageCode = "ja",
  pathname?: string
): Promise<SEOData> {
  const config = await loadSEOConfig();
  const detectedLanguage = pathname ? detectLanguageFromRoute(pathname) : language;
  
  const title = config.titles[detectedLanguage][page] || config.titles.ja[page];
  const description = config.descriptions[detectedLanguage][page] || config.descriptions.ja[page];
  const ogTitle = config.pages[page].ogTitle[detectedLanguage] || config.pages[page].ogTitle.ja;
  
  const keywords = [...config.base.keywords, ...config.pages[page].keywords];
  
  return {
    title,
    description,
    keywords,
    ogTitle,
    ogDescription: description,
    ogImage: config.base.ogImage,
    ogType: config.base.ogType,
    twitterCard: config.base.twitterCard,
    hreflangUrls: generateHreflangUrls(pathname || ""),
  };
}

// get base SEO data for any language
export async function getBaseSEO(language: LanguageCode = "ja"): Promise<SEOData> {
  const config = await loadSEOConfig();
  
  return {
    title: config.titles[language].base,
    description: config.descriptions[language].base,
    keywords: config.base.keywords,
    ogTitle: config.titles[language].base,
    ogDescription: config.descriptions[language].base,
    ogImage: config.base.ogImage,
    ogType: config.base.ogType,
    twitterCard: config.base.twitterCard,
  };
}

// import fallback SEO data
import fallbackSEO from '../../public/seo/fallback.json';

// sync version for react components - uses cached config or fallback
export function getLocalizedPageSEOSync(
  page: Exclude<PageType, "base">,
  language: LanguageCode = "ja",
  pathname?: string
): SEOData {
  // if config is not loaded yet, use fallback
  if (!seoConfig) {
    return {
      ...fallbackSEO,
      hreflangUrls: generateHreflangUrls(pathname || ""),
    };
  }

  const detectedLanguage = pathname ? detectLanguageFromRoute(pathname) : language;
  
  const title = seoConfig.titles[detectedLanguage][page] || seoConfig.titles.ja[page];
  const description = seoConfig.descriptions[detectedLanguage][page] || seoConfig.descriptions.ja[page];
  const ogTitle = seoConfig.pages[page].ogTitle[detectedLanguage] || seoConfig.pages[page].ogTitle.ja;
  
  const keywords = [...seoConfig.base.keywords, ...seoConfig.pages[page].keywords];
  
  return {
    title,
    description,
    keywords,
    ogTitle,
    ogDescription: description,
    ogImage: seoConfig.base.ogImage,
    ogType: seoConfig.base.ogType,
    twitterCard: seoConfig.base.twitterCard,
    hreflangUrls: generateHreflangUrls(pathname || ""),
  };
}

// simple title updater for client-side use
export function updatePageTitle(page: Exclude<PageType, "base">) {
  if (typeof window === 'undefined') return;
  
  const pathname = window.location.pathname;
  let language: LanguageCode = 'ja';
  
  if (pathname.startsWith('/en')) language = 'en';
  else if (pathname.startsWith('/zh')) language = 'zh';
  else if (pathname.startsWith('/jp')) language = 'ja';
  
  getLocalizedTitle(page, language).then(title => {
    document.title = title;
  }).catch(() => {
    // fallback to sync version if async fails
    const seoData = getLocalizedPageSEOSync(page, language, pathname);
    document.title = seoData.title;
  });
}
