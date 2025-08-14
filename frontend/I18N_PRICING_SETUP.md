# Internationalization (i18n) Pricing Pages Setup

## Problem Fixed
Previously, the pricing page was only available at `/pricing` and visiting `/zh/pricing` or `/jp/pricing` would result in 404 errors.

## Solution Implemented

### 1. **Added Pricing Page Translations**
Extended all locale files with pricing page specific translations:

**Files Updated:**
- `public/locales/en.json` - Added `pricing_page` section
- `public/locales/jp.json` - Added `pricing_page` section  
- `public/locales/zh.json` - Added `pricing_page` section

**New Translation Keys:**
```json
"pricing_page": {
  "title": "Detailed Pricing / 詳細料金表 / 详细价格表",
  "subtitle": "Service description...",
  "back_to_home": "Back to Home / ホームに戻る / 返回主页",
  "vocal_mix_mastering": { ... },
  "mix_mastering": { ... },
  "music_production": { ... },
  "contact": { ... }
}
```

### 2. **Created Localized Pricing Pages**
Added pricing pages for each supported language:

- **`/src/app/en/pricing/page.tsx`** - English pricing page
- **`/src/app/jp/pricing/page.tsx`** - Japanese pricing page
- **`/src/app/zh/pricing/page.tsx`** - Chinese pricing page

### 3. **Updated Main Pricing Page**
- **`/src/app/pricing/page.tsx`** - Updated to use translation keys instead of hardcoded text

### 4. **Enhanced PricingEntry Component**
Updated the PricingEntry component to intelligently route to the correct language-specific pricing page:

```typescript
const handleViewDetails = () => {
  const currentPath = window?.location?.pathname || '/';
  let targetPath = '/pricing';
  
  if (currentPath.startsWith('/en')) {
    targetPath = '/en/pricing';
  } else if (currentPath.startsWith('/jp')) {
    targetPath = '/jp/pricing';
  } else if (currentPath.startsWith('/zh')) {
    targetPath = '/zh/pricing';
  }
  
  router.push(targetPath);
};
```

## Available Routes

### Pricing Pages
- **`/pricing`** - Default (Japanese)
- **`/en/pricing`** - English
- **`/jp/pricing`** - Japanese
- **`/zh/pricing`** - Chinese (Simplified)

### Main Pages
- **`/`** - Default (Japanese)
- **`/en`** - English
- **`/jp`** - Japanese
- **`/zh`** - Chinese (Simplified)

## How It Works

1. **Language Detection**: The PricingEntry component detects the current language from the URL path
2. **Smart Routing**: Automatically routes to the appropriate language-specific pricing page
3. **Consistent UX**: Users stay within their selected language throughout the site
4. **Fallback**: Default routing to `/pricing` (Japanese) if no language is detected

## Translation Coverage

All pricing page content is now fully translated:
- Page titles and descriptions
- Service categories (Vocal Mix & Mastering, Mix & Mastering, Music Production)
- Pricing details and options
- Contact section
- Navigation elements

## Build Output
```
✓ Generating static pages (11/11)
Route (app)                          Size  First Load JS    
├ ○ /en/pricing                      133 B         100 kB
├ ○ /jp/pricing                      133 B         100 kB
├ ○ /pricing                         133 B         100 kB
└ ○ /zh/pricing                      133 B         100 kB
```

All routes are now properly generated and accessible!
