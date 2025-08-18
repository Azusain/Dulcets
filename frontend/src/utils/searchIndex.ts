// Search index system for Dulcets website

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: 'page' | 'work' | 'artwork' | 'modeling' | 'service' | 'navigation';
  url: string;
  keywords: string[];
  content: string;
  score?: number;
  metadata?: any;
}

export interface SearchCategory {
  name: string;
  items: SearchItem[];
  icon?: string;
  totalItems?: number; // Total items in this category before limiting
}

export interface SearchResult {
  categories: SearchCategory[];
  totalResults: number;
  query: string;
}

// Static content index - now empty, all content is generated dynamically for i18n support
export const staticContentIndex: SearchItem[] = [
  // Note: All navigation and service items are now generated dynamically in searchContent function to support i18n
];

// Improved search implementation with better precision and bracket handling
export function fuzzySearch(query: string, text: string): number {
  query = query.toLowerCase();
  text = text.toLowerCase();
  
  // Remove common brackets and symbols for better matching
  const cleanText = text.replace(/[【】\[\]（）()｛｝{}]/g, ' ');
  const cleanQuery = query.replace(/[【】\[\]（）()｛｝{}]/g, ' ');
  
  // Exact match gets highest score (check both original and cleaned versions)
  if (text.includes(query) || cleanText.includes(cleanQuery)) {
    const position = Math.min(
      text.indexOf(query) >= 0 ? text.indexOf(query) : Infinity,
      cleanText.indexOf(cleanQuery) >= 0 ? cleanText.indexOf(cleanQuery) : Infinity
    );
    return 100 - Math.min(position, 50); // Cap position penalty at 50
  }
  
  // Word boundary matching (higher priority) - check both versions
  const words = cleanText.split(/\s+/).filter(w => w.length > 0);
  const queryWords = cleanQuery.split(/\s+/).filter(w => w.length > 0);
  
  // Check if all query words are found as prefixes in text words
  let wordMatches = 0;
  for (const queryWord of queryWords) {
    for (const word of words) {
      if (word.startsWith(queryWord) && queryWord.length > 1) {
        wordMatches++;
        break;
      }
    }
  }
  
  if (wordMatches === queryWords.length && queryWords.length > 0) {
    return 85 - query.length; // High score for complete word prefix match
  }
  
  // Partial word matching
  if (wordMatches > 0) {
    return 60 + (wordMatches * 10) - query.length;
  }
  
  // For queries longer than 3 characters, require more strict matching
  if (query.length > 3) {
    // Use cleaned text for better matching
    const targetText = cleanText.replace(/\s+/g, ' ').trim();
    const searchQuery = cleanQuery.replace(/\s+/g, ' ').trim();
    
    // Require at least 70% of characters to match in sequence
    const requiredMatches = Math.ceil(searchQuery.length * 0.7);
    let consecutiveMatches = 0;
    let maxConsecutive = 0;
    let queryIndex = 0;
    
    for (let i = 0; i < targetText.length && queryIndex < searchQuery.length; i++) {
      if (targetText[i] === searchQuery[queryIndex]) {
        consecutiveMatches++;
        queryIndex++;
        maxConsecutive = Math.max(maxConsecutive, consecutiveMatches);
      } else {
        consecutiveMatches = 0;
      }
    }
    
    if (maxConsecutive < requiredMatches) {
      return 0; // Not enough consecutive matches
    }
    
    return Math.min(maxConsecutive * 2, 50);
  }
  
  // For short queries (3 chars or less), use character matching on cleaned text
  let score = 0;
  let queryIndex = 0;
  const searchTarget = cleanText.replace(/\s+/g, '');
  const searchQuery = cleanQuery.replace(/\s+/g, '');
  
  for (let i = 0; i < searchTarget.length && queryIndex < searchQuery.length; i++) {
    if (searchTarget[i] === searchQuery[queryIndex]) {
      score += 2;
      queryIndex++;
    }
  }
  
  // Bonus for matching all characters
  if (queryIndex === searchQuery.length && searchQuery.length > 0) {
    score += 20;
  }
  
  return score;
}

// Search function
export function searchContent(query: string, customItems: SearchItem[] = [], t?: (key: string) => string): SearchResult {
  if (!query.trim()) {
    return {
      categories: [],
      totalResults: 0,
      query
    };
  }

  // Generate dynamic service items based on current language
  const translate = t || ((key: string) => key);
  const dynamicServiceItems: SearchItem[] = [
    {
      id: 'service-jpop',
      title: translate('about.genres.jpop.title'),
      description: getServiceDescription('jpop', translate),
      category: 'service',
      url: '#works?genre=jpop',
      keywords: ['jpop', 'j-pop', 'japanese pop', '日本流行音乐', 'ジェイポップ', 'pop music'],
      content: getServiceDescription('jpop', translate),
      metadata: { isGenre: true, genreId: 'jpop' }
    },
    {
      id: 'service-jrock',
      title: translate('about.genres.jrock.title'),
      description: getServiceDescription('jrock', translate),
      category: 'service',
      url: '#works?genre=jrock',
      keywords: ['jrock', 'j-rock', 'japanese rock', '日本摇滚', 'ジェイロック', 'rock'],
      content: getServiceDescription('jrock', translate),
      metadata: { isGenre: true, genreId: 'jrock' }
    },
    {
      id: 'service-orchestral',
      title: translate('about.genres.orchestra.title'),
      description: getServiceDescription('orchestra', translate),
      category: 'service',
      url: '#works?genre=orchestra',
      keywords: ['orchestral', 'orchestra', '管弦乐', 'オーケストラ', 'classical', 'symphonic'],
      content: getServiceDescription('orchestra', translate),
      metadata: { isGenre: true, genreId: 'orchestra' }
    },
    {
      id: 'service-edm',
      title: translate('about.genres.edm.title'),
      description: getServiceDescription('edm', translate),
      category: 'service',
      url: '#works?genre=edm',
      keywords: ['edm', 'electronic', 'dance', '电子音乐', '電子ダンス', 'techno', 'house'],
      content: getServiceDescription('edm', translate),
      metadata: { isGenre: true, genreId: 'edm' }
    },
    {
      id: 'service-bgm',
      title: translate('about.genres.bgm.title'),
      description: getServiceDescription('bgm', translate),
      category: 'service',
      url: '#works?genre=bgm',
      keywords: ['bgm', 'background music', '背景音乐', 'バックグラウンド', 'game music', 'media'],
      content: getServiceDescription('bgm', translate),
      metadata: { isGenre: true, genreId: 'bgm' }
    },
    {
      id: 'service-anime-song',
      title: translate('about.genres.anime_song.title'),
      description: getServiceDescription('anime_song', translate),
      category: 'service',
      url: '#services',
      keywords: ['anime', 'アニメソング', '动漫歌曲', 'opening', 'ending', 'insert song', 'theme'],
      content: getServiceDescription('anime_song', translate)
    },
    {
      id: 'service-music-production',
      title: translate('services.music.title'),
      description: translate('services.music.description'),
      category: 'service',
      url: '#services',
      keywords: ['music production', '音乐制作', '音楽制作', 'composition', 'arrangement', 'recording', 'mixing', 'mastering'],
      content: translate('services.music.description')
    }
  ];

  // Generate dynamic navigation items based on current language
  const dynamicNavigationItems: SearchItem[] = [
    {
      id: 'nav-home',
      title: translate('nav.home'),
      description: translate('hero.subtitle'),
      category: 'navigation',
      url: '#hero',
      keywords: ['home', '主页', 'ホーム', 'main', 'hero', 'dulcets'],
      content: translate('hero.subtitle')
    },
    {
      id: 'nav-about',
      title: translate('nav.about'),
      description: translate('about.lead_description'),
      category: 'navigation',
      url: '#about',
      keywords: ['about', '关于', 'について', 'team', 'company', 'dulcets', 'music production'],
      content: translate('about.lead_description')
    },
    {
      id: 'nav-works',
      title: translate('works.title'),
      description: translate('works.lead_description'),
      category: 'navigation',
      url: '#works',
      keywords: ['works', '作品', '作品集', 'portfolio', 'music', 'songs', 'productions'],
      content: translate('works.lead_description')
    },
    {
      id: 'nav-services',
      title: translate('services.title'),
      description: translate('services.subtitle'),
      category: 'navigation',
      url: '#services',
      keywords: ['services', '服务', 'サービス', 'music production', 'recording', 'mixing'],
      content: translate('services.subtitle')
    },
    {
      id: 'nav-contact',
      title: translate('contact.title'),
      description: translate('contact.description'),
      category: 'navigation',
      url: '#contact',
      keywords: ['contact', '联系', '連絡', 'inquiry', 'quote', 'consultation'],
      content: translate('contact.description')
    }
  ];

  const allItems = [...staticContentIndex, ...dynamicServiceItems, ...dynamicNavigationItems, ...customItems];
  const results: SearchItem[] = [];
  
  // Set minimum score threshold to filter out weak matches
  const MIN_SCORE_THRESHOLD = 15;
  
  for (const item of allItems) {
    let maxScore = 0;
    
    // Search in title (highest weight)
    maxScore = Math.max(maxScore, fuzzySearch(query, item.title) * 3);
    
    // Search in description
    maxScore = Math.max(maxScore, fuzzySearch(query, item.description) * 2);
    
    // Search in keywords
    for (const keyword of item.keywords) {
      maxScore = Math.max(maxScore, fuzzySearch(query, keyword) * 2.5);
    }
    
    // Search in content
    maxScore = Math.max(maxScore, fuzzySearch(query, item.content) * 1.5);
    
    // Only include results above threshold
    if (maxScore > MIN_SCORE_THRESHOLD) {
      results.push({
        ...item,
        score: maxScore
      });
    }
  }
  
  // Sort by score (highest first)
  results.sort((a, b) => (b.score || 0) - (a.score || 0));
  
  // Group by category
  const categoryMap = new Map<string, SearchItem[]>();
  
  for (const item of results) {
    if (!categoryMap.has(item.category)) {
      categoryMap.set(item.category, []);
    }
    categoryMap.get(item.category)!.push(item);
  }
  
  const categories: SearchCategory[] = [];
  
  // Define category order and names (use translation function if provided)
  const categoryOrder = [
    { key: 'work', name: translate('search.category.music_works'), icon: 'music' },
    { key: 'artwork', name: translate('search.category.artworks'), icon: 'palette' },
    { key: 'modeling', name: translate('search.category.models'), icon: 'cube' },
    { key: 'service', name: translate('search.category.services'), icon: 'cog' },
    { key: 'navigation', name: translate('search.category.navigation'), icon: 'map' },
    { key: 'page', name: translate('search.category.pages'), icon: 'document' }
  ];
  
  for (const { key, name, icon } of categoryOrder) {
    const items = categoryMap.get(key);
    if (items && items.length > 0) {
      categories.push({
        name,
        icon,
        items: items.slice(0, 8), // Show up to 8 results per category initially
        totalItems: items.length
      });
    }
  }
  
  return {
    categories,
    totalResults: results.length,
    query
  };
}

// Get localized service description with truncation
function getServiceDescription(serviceKey: string, t: (key: string) => string): string {
  const fullDescription = t(`about.genres.${serviceKey}.content`) || t(`services.${serviceKey}.description`) || '';
  // Truncate to approximately one line (about 100 characters)
  if (fullDescription.length > 100) {
    return fullDescription.substring(0, 100).trim() + '...';
  }
  return fullDescription;
}

// Build dynamic search index from JSON data
export function buildDynamicSearchIndex(
  works: any[] = [],
  artworks: any[] = [],
  modelings: any[] = [],
  currentLanguage: string = 'ja',
  t?: (key: string) => string
): SearchItem[] {
  const dynamicItems: SearchItem[] = [];
  
  // Add music works with language-specific content
  for (const work of works) {
    let title, description;
    
    // Select appropriate language version
    const translate = t || ((key: string) => key);
    if (currentLanguage === 'en') {
      title = work.titleEn || work.title || translate('search.untitled_work');
      description = work.excerptEn || work.excerpt || translate('search.music_production_by_dulcets');
    } else if (currentLanguage === 'zh') {
      title = work.titleZh || work.title || work.titleEn || translate('search.untitled_work');
      description = work.excerptZh || work.excerpt || work.excerptEn || translate('search.music_production_by_dulcets');
    } else { // Default to Japanese
      title = work.titleJp || work.title || translate('search.untitled_work');
      description = work.excerptJp || work.excerpt || translate('search.music_production_by_dulcets');
    }
    
    // Create enhanced keywords for better searchability
    const enhancedKeywords = [
      ...(work.title?.split(/\s+/) || []),
      ...(work.titleEn?.split(/\s+/) || []),
      ...(work.titleJp?.split(/\s+/) || []),
      'music', 'song', 'dulcets'
    ];
    
    // Add specific keywords for original songs
    if (work.title?.includes('オリジナル曲') || work.titleEn?.includes('Original Song') || work.titleJp?.includes('オリジナル曲')) {
      enhancedKeywords.push('original', 'original song', 'オリジナル曲', 'オリジナル', '原创', '原创歌曲');
    }
    
    // Add collaboration keywords if present
    if (work.title?.includes('feat.') || work.title?.includes('×') || work.title?.includes('x ')) {
      enhancedKeywords.push('collaboration', 'feat', 'feature', 'コラボ', 'コラボレーション');
    }
    
    // Enhanced content for better search matching
    const enhancedContent = [
      work.title || '',
      work.titleEn || '',
      work.titleJp || '',
      work.excerpt || '',
      work.excerptEn || '',
      work.excerptJp || '',
      // Add cleaned versions without brackets for better matching
      (work.title || '').replace(/[【】\[\]（）()｛｝{}]/g, ' '),
      (work.titleEn || '').replace(/[【】\[\]（）()｛｝{}]/g, ' ')
    ].join(' ');
    
    dynamicItems.push({
      id: `work-${work.title?.replace(/\s+/g, '-').toLowerCase() || 'unknown'}`,
      title,
      description,
      category: 'work',
      url: work.videoUrl || '#works',
      keywords: enhancedKeywords,
      content: enhancedContent,
      metadata: {
        duration: work.duration,
        date: work.date,
        image: work.image,
        originalTitles: {
          ja: work.titleJp || work.title,
          en: work.titleEn || work.title,
          zh: work.titleZh || work.title
        }
      }
    });
  }
  
  // Add artworks
  for (const artwork of artworks) {
    // Construct full image URL
    const imageUrl = artwork.imagePath ? `/images/artworks/${artwork.imagePath}` : '#artworks';
    
    // Get localized description
    const translate = t || ((key: string) => key);
    const description = translate('search.artwork_description');
    
    dynamicItems.push({
      id: `artwork-${artwork.id}`,
      title: artwork.title || translate('search.artwork_fallback_title').replace('{{id}}', artwork.id),
      description,
      category: 'artwork',
      url: imageUrl,
      keywords: ['artwork', 'illustration', 'digital art', 'design', '绘画', '艺术作品', 'アートワーク', 'イラスト'],
      content: `${artwork.title || ''} artwork illustration digital art 绘画作品 艺术 アートワーク イラスト`,
      metadata: {
        imagePath: artwork.imagePath,
        pos: artwork.pos,
        isImage: true
      }
    });
  }
  
  // Add 3D models
  for (const model of modelings) {
    // Construct full image URL
    const imageUrl = model.imagePath ? `/images/modeling/${model.imagePath}` : '#modeling';
    
    // Get localized description
    const translate = t || ((key: string) => key);
    const description = translate('search.modeling_description');
    
    dynamicItems.push({
      id: `modeling-${model.id}`,
      title: model.title || translate('search.modeling_fallback_title').replace('{{id}}', model.id),
      description,
      category: 'modeling',
      url: imageUrl,
      keywords: ['3d', 'modeling', 'model', 'animation', '3d modeling', '三维建模', '3D模型', '3Dモデリング', 'モデリング'],
      content: `${model.title || ''} 3d modeling animation 三维建模 3D模型 3Dモデリング モデリング`,
      metadata: {
        imagePath: model.imagePath,
        pos: model.pos,
        isImage: true
      }
    });
  }
  
  return dynamicItems;
}

// Local storage for search history
export function saveSearchHistory(query: string) {
  if (!query.trim()) return;
  
  const history = getSearchHistory();
  const updatedHistory = [query, ...history.filter(h => h !== query)].slice(0, 10);
  
  localStorage.setItem('dulcets-search-history', JSON.stringify(updatedHistory));
}

export function getSearchHistory(): string[] {
  try {
    const history = localStorage.getItem('dulcets-search-history');
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
}

export function clearSearchHistory() {
  localStorage.removeItem('dulcets-search-history');
}
