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

// Multilingual titles configuration
export const multilingualTitles = {
  ja: {
    base: "Dulcets - プロフェッショナル音楽制作&クリエイティブサービス",
    home: "Dulcets - プロフェッショナル音楽制作スタジオ",
    about: "Dulcetsについて - 音楽制作チーム",
    services: "音楽制作サービス - Dulcets",
    works: "私たちの作品 - Dulcets音楽ポートフォリオ",
    contact: "お問い合わせ - Dulcets音楽制作依頼"
  },
  en: {
    base: "Dulcets - Professional Music Production & Creative Services",
    home: "Dulcets - Professional Music Production Studio",
    about: "About Dulcets - Music Production Team",
    services: "Music Production Services - Dulcets",
    works: "Our Works - Dulcets Music Portfolio",
    contact: "Contact Dulcets - Music Production Inquiry"
  },
  zh: {
    base: "Dulcets - 专业音乐制作与创意服务",
    home: "Dulcets - 专业音乐制作工作室",
    about: "关于 Dulcets - 音乐制作团队",
    services: "音乐制作服务 - Dulcets",
    works: "我们的作品 - Dulcets 音乐作品集",
    contact: "联系 Dulcets - 音乐制作咨询"
  }
};

// Base SEO configuration
export const baseSEO: SEOData = {
  title: multilingualTitles.ja.base, // Default to Japanese
  description: "Dulcets specializes in Japanese Anime Songs, J-Pop, J-Rock, and BGM production. We offer comprehensive music production, artwork, and 3D modeling services with multilingual support.",
  keywords: [
    "music production",
    "anime song",
    "J-Pop",
    "J-Rock", 
    "BGM",
    "Japanese music",
    "idol music",
    "orchestral music",
    "EDM",
    "音楽制作",
    "アニメソング",
    "アイドル",
    "オーケストラ",
    "3D modeling",
    "artwork",
    "creative services"
  ],
  ogType: "website",
  twitterCard: "summary_large_image",
  ogImage: "/images/logo_full.png"
};

// Page-specific SEO data
export const pageSEO = {
  home: {
    ...baseSEO,
    ogTitle: "Dulcets - Professional Music Production Studio",
    ogDescription: "Creating unique and captivating Japanese music with comprehensive creative services. From concept to completion.",
  },
  about: {
    ...baseSEO,
    title: "About Dulcets - Music Production Team",
    description: "Learn about Dulcets, a professional music production team specializing in anime songs, J-Pop, J-Rock, and comprehensive creative services.",
    keywords: [...baseSEO.keywords, "about", "team", "company", "music studio"],
  },
  services: {
    ...baseSEO,
    title: "Music Production Services - Dulcets",
    description: "Professional music production services including composition, arrangement, recording, mixing, mastering, and creative content production.",
    keywords: [...baseSEO.keywords, "services", "recording", "mixing", "mastering", "composition"],
  },
  works: {
    ...baseSEO,
    title: "Our Works - Dulcets Music Portfolio",
    description: "Explore our portfolio of music productions, artworks, and 3D modeling projects. Discover the quality and creativity of Dulcets.",
    keywords: [...baseSEO.keywords, "portfolio", "works", "showcase", "examples"],
  },
  contact: {
    ...baseSEO,
    title: "Contact Dulcets - Music Production Inquiry",
    description: "Get in touch with Dulcets for your music production needs. We offer multilingual support in Japanese, English, and Chinese.",
    keywords: [...baseSEO.keywords, "contact", "inquiry", "quote", "consultation"],
  }
};

// Structured data schemas
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Dulcets",
  "description": "Professional music production and creative services specializing in Japanese music",
  "url": "https://azusain.github.io/Dulcets",
  "logo": "https://azusain.github.io/Dulcets/images/logo_black.png",
  "sameAs": [
    "https://www.youtube.com/@Dulcets",
    "https://x.com/Dulcets_staff", 
    "https://space.bilibili.com/3546744298146784",
    "https://www.nicovideo.jp/user/134411796",
    "https://ko-fi.com/dulcets_official"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "availableLanguage": ["Japanese", "English", "Chinese"]
  }
};

export const musicGroupSchema = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  "name": "Dulcets",
  "description": "Music production team specializing in anime songs, J-Pop, J-Rock, and orchestral music",
  "genre": ["J-Pop", "J-Rock", "Anime Music", "Instrumental", "Electronic"],
  "url": "https://azusain.github.io/Dulcets"
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Dulcets",
  "description": "Music production and creative services studio",
  "url": "https://azusain.github.io/Dulcets",
  "serviceArea": {
    "@type": "Place",
    "name": "Global"
  },
  "offers": {
    "@type": "Offer",
    "description": "Music production, artwork, and 3D modeling services"
  }
};

// Generate canonical URL
export function generateCanonicalUrl(path: string = ""): string {
  const baseUrl = "https://azusain.github.io/Dulcets";
  return `${baseUrl}${path}`;
}

// Generate hreflang URLs for multilingual support
export function generateHreflangUrls(path: string = ""): { [key: string]: string } {
  const baseUrl = "https://azusain.github.io/Dulcets";
  return {
    "ja": `${baseUrl}${path}?lang=ja`,
    "en": `${baseUrl}${path}?lang=en`, 
    "zh": `${baseUrl}${path}?lang=zh`,
    "x-default": `${baseUrl}${path}`
  };
}

// Get localized title based on language
export function getLocalizedTitle(page: keyof typeof multilingualTitles.ja, language: 'ja' | 'en' | 'zh' = 'ja'): string {
  return multilingualTitles[language][page] || multilingualTitles.ja[page];
}

// Update page SEO with localized titles
export function getLocalizedPageSEO(page: 'home' | 'about' | 'services' | 'works' | 'contact', language: 'ja' | 'en' | 'zh' = 'ja') {
  const localizedTitle = getLocalizedTitle(page, language);
  const seoData = pageSEO[page];
  
  return {
    ...seoData,
    title: localizedTitle,
    ogTitle: localizedTitle
  };
}
