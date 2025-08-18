import { getAssetPath } from "@/utils/assetPath";
import { SEOData, organizationSchema, musicGroupSchema, localBusinessSchema } from "@/utils/seo";

interface SEOHeadProps {
  seoData: SEOData;
  currentPath?: string;
}

export default function SEOHead({ seoData, currentPath = "" }: SEOHeadProps) {
  const {
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogType,
    twitterCard,
    canonicalUrl,
    hreflangUrls
  } = seoData;

  const fullOgImage = ogImage ? getAssetPath(ogImage) : getAssetPath("/images/logo_black.png");
  const fullCanonicalUrl = canonicalUrl || `https://azusain.github.io/Dulcets${currentPath}`;

  return (
    <>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="author" content="Dulcets" />
      <meta name="robots" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:type" content={ogType || "website"} />
      <meta property="og:site_name" content="Dulcets" />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="zh_CN" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard || "summary_large_image"} />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:site" content="@Dulcets_staff" />
      <meta name="twitter:creator" content="@Dulcets_staff" />
      
      {/* Hreflang Tags for Multilingual Support */}
      {hreflangUrls && Object.entries(hreflangUrls).map(([lang, url]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      
      {/* Performance and DNS Optimization */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.youtube.com" />
      <link rel="dns-prefetch" href="https://x.com" />
      <link rel="dns-prefetch" href="https://ko-fi.com" />
      
      {/* Structured Data - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      
      {/* Structured Data - Music Group */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(musicGroupSchema)
        }}
      />
      
      {/* Structured Data - Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema)
        }}
      />
      
      {/* Progressive Web App */}
      <link rel="manifest" href={getAssetPath("/manifest.json")} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#5865F2" />
      <meta name="msapplication-TileColor" content="#5865F2" />
      <meta name="msapplication-TileImage" content={getAssetPath("/images/logo_black.png")} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Dulcets" />
      
      {/* Language and Content Type */}
      <meta httpEquiv="Content-Language" content="ja, en, zh" />
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="generator" content="Next.js" />
      <meta name="application-name" content="Dulcets" />
      <meta name="referrer" content="origin-when-cross-origin" />
      <meta name="color-scheme" content="dark light" />
      <meta name="creator" content="Dulcets" />
    </>
  );
}
