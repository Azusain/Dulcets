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
}

export interface SearchResult {
  categories: SearchCategory[];
  totalResults: number;
  query: string;
}

// Static content index - pages and navigation
export const staticContentIndex: SearchItem[] = [
  // Main navigation items
  {
    id: 'nav-home',
    title: 'Home',
    description: 'Main page featuring Dulcets music production studio',
    category: 'navigation',
    url: '#hero',
    keywords: ['home', '主页', 'ホーム', 'main', 'hero', 'dulcets'],
    content: 'Home page Dulcets music production studio professional services'
  },
  {
    id: 'nav-about',
    title: 'About Us',
    description: 'Learn about Dulcets music production team',
    category: 'navigation',
    url: '#about',
    keywords: ['about', '关于', 'について', 'team', 'company', 'dulcets', 'music production'],
    content: 'About Dulcets professional music production team specializing in Japanese music'
  },
  {
    id: 'nav-works',
    title: 'Our Works',
    description: 'Explore our music productions and portfolio',
    category: 'navigation',
    url: '#works',
    keywords: ['works', '作品', '作品集', 'portfolio', 'music', 'songs', 'productions'],
    content: 'Music works portfolio songs productions albums releases'
  },
  {
    id: 'nav-services',
    title: 'Services',
    description: 'Music production and creative services',
    category: 'navigation',
    url: '#services',
    keywords: ['services', '服务', 'サービス', 'music production', 'recording', 'mixing'],
    content: 'Music production services recording mixing mastering composition arrangement'
  },
  {
    id: 'nav-contact',
    title: 'Contact Us',
    description: 'Get in touch for music production inquiries',
    category: 'navigation',
    url: '#contact',
    keywords: ['contact', '联系', '連絡', 'inquiry', 'quote', 'consultation'],
    content: 'Contact information inquiry consultation quote music production services'
  },
  
  // Service items
  {
    id: 'service-music-production',
    title: 'Music Production',
    description: 'Professional music composition, arrangement, and production',
    category: 'service',
    url: '#services',
    keywords: ['music production', '音乐制作', '音楽制作', 'composition', 'arrangement', 'recording'],
    content: 'Professional music production composition arrangement recording mixing mastering'
  },
  {
    id: 'service-jpop',
    title: 'J-Pop Music',
    description: 'Japanese pop music production and arrangement',
    category: 'service',
    url: '#services',
    keywords: ['jpop', 'j-pop', 'japanese pop', '日本流行音乐', 'ジェイポップ', 'pop music'],
    content: 'Japanese pop music J-Pop production arrangement modern catchy melodies'
  },
  {
    id: 'service-anime-song',
    title: 'Anime Songs',
    description: 'Anime opening, ending, and insert song production',
    category: 'service',
    url: '#services',
    keywords: ['anime', 'アニメソング', '动漫歌曲', 'opening', 'ending', 'insert song', 'theme'],
    content: 'Anime songs opening ending theme insert songs animation music'
  },
  {
    id: 'service-jrock',
    title: 'J-Rock Music',
    description: 'Japanese rock music production with modern sound',
    category: 'service',
    url: '#services',
    keywords: ['jrock', 'j-rock', 'japanese rock', '日本摇滚', 'ジェイロック', 'rock'],
    content: 'Japanese rock music J-Rock production heavy guitars modern sound'
  },
  {
    id: 'service-orchestral',
    title: 'Orchestral Music',
    description: 'Classical orchestral arrangements and compositions',
    category: 'service',
    url: '#services',
    keywords: ['orchestral', 'orchestra', '管弦乐', 'オーケストラ', 'classical', 'symphonic'],
    content: 'Orchestral music classical arrangements symphonic compositions'
  },
  {
    id: 'service-edm',
    title: 'Electronic Dance Music',
    description: 'Modern EDM production and electronic arrangements',
    category: 'service',
    url: '#services',
    keywords: ['edm', 'electronic', 'dance', '电子音乐', '電子ダンス', 'techno', 'house'],
    content: 'Electronic dance music EDM production techno house electronic arrangements'
  },
  {
    id: 'service-bgm',
    title: 'Background Music',
    description: 'Background music for games, videos, and media',
    category: 'service',
    url: '#services',
    keywords: ['bgm', 'background music', '背景音乐', 'バックグラウンド', 'game music', 'media'],
    content: 'Background music BGM game music video music media soundtrack ambient'
  },
  {
    id: 'service-artwork',
    title: 'Artwork Design',
    description: 'Digital artwork and illustration services',
    category: 'service',
    url: '#artworks',
    keywords: ['artwork', 'illustration', '艺术作品', 'アートワーク', 'design', 'digital art'],
    content: 'Digital artwork illustration design character art album covers'
  },
  {
    id: 'service-3d-modeling',
    title: '3D Modeling',
    description: 'Professional 3D modeling and animation services',
    category: 'service',
    url: '#modeling',
    keywords: ['3d modeling', '3d', 'modeling', '三维建模', '3Dモデリング', 'animation'],
    content: '3D modeling animation character modeling scene construction rendering'
  }
];

// Simple fuzzy search implementation
export function fuzzySearch(query: string, text: string): number {
  query = query.toLowerCase();
  text = text.toLowerCase();
  
  // Exact match gets highest score
  if (text.includes(query)) {
    const position = text.indexOf(query);
    return 100 - position; // Earlier matches get higher scores
  }
  
  // Character-by-character fuzzy matching
  let score = 0;
  let queryIndex = 0;
  
  for (let i = 0; i < text.length && queryIndex < query.length; i++) {
    if (text[i] === query[queryIndex]) {
      score += 2;
      queryIndex++;
    }
  }
  
  // Bonus for matching all characters
  if (queryIndex === query.length) {
    score += 20;
  }
  
  return score;
}

// Search function
export function searchContent(query: string, customItems: SearchItem[] = []): SearchResult {
  if (!query.trim()) {
    return {
      categories: [],
      totalResults: 0,
      query
    };
  }

  const allItems = [...staticContentIndex, ...customItems];
  const results: SearchItem[] = [];
  
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
    
    if (maxScore > 0) {
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
  
  // Define category order and names
  const categoryOrder = [
    { key: 'navigation', name: 'Navigation', icon: '🧭' },
    { key: 'page', name: 'Pages', icon: '📄' },
    { key: 'work', name: 'Music Works', icon: '🎵' },
    { key: 'service', name: 'Services', icon: '🛠️' },
    { key: 'artwork', name: 'Artworks', icon: '🎨' },
    { key: 'modeling', name: '3D Models', icon: '🎭' }
  ];
  
  for (const { key, name, icon } of categoryOrder) {
    const items = categoryMap.get(key);
    if (items && items.length > 0) {
      categories.push({
        name,
        icon,
        items: items.slice(0, 5) // Limit results per category
      });
    }
  }
  
  return {
    categories,
    totalResults: results.length,
    query
  };
}

// Build dynamic search index from JSON data
export function buildDynamicSearchIndex(
  works: any[] = [],
  artworks: any[] = [],
  modelings: any[] = [],
  currentLanguage: string = 'ja'
): SearchItem[] {
  const dynamicItems: SearchItem[] = [];
  
  // Add music works with language-specific content
  for (const work of works) {
    let title, description;
    
    // Select appropriate language version
    if (currentLanguage === 'en') {
      title = work.titleEn || work.title || 'Untitled Work';
      description = work.excerptEn || work.excerpt || 'Music production by Dulcets';
    } else if (currentLanguage === 'zh') {
      title = work.titleZh || work.title || work.titleEn || 'Untitled Work';
      description = work.excerptZh || work.excerpt || work.excerptEn || 'Music production by Dulcets';
    } else { // Default to Japanese
      title = work.titleJp || work.title || 'Untitled Work';
      description = work.excerptJp || work.excerpt || 'Dulcetsによる音楽制作';
    }
    
    dynamicItems.push({
      id: `work-${work.title?.replace(/\s+/g, '-').toLowerCase() || 'unknown'}`,
      title,
      description,
      category: 'work',
      url: work.videoUrl || '#works',
      keywords: [
        ...(work.title?.split(/\s+/) || []),
        ...(work.titleEn?.split(/\s+/) || []),
        ...(work.titleJp?.split(/\s+/) || []),
        'music', 'song', 'original', 'dulcets'
      ],
      content: `${work.title || ''} ${work.titleEn || ''} ${work.excerpt || ''} ${work.excerptEn || ''}`,
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
    dynamicItems.push({
      id: `artwork-${artwork.id}`,
      title: artwork.title || `Artwork ${artwork.id}`,
      description: `Digital artwork piece by Dulcets`,
      category: 'artwork',
      url: '#artworks',
      keywords: ['artwork', 'illustration', 'digital art', 'design', '绘画', '艺术作品'],
      content: `${artwork.title || ''} artwork illustration digital art 绘画作品 艺术`,
      metadata: {
        imagePath: artwork.imagePath,
        pos: artwork.pos
      }
    });
  }
  
  // Add 3D models
  for (const model of modelings) {
    dynamicItems.push({
      id: `modeling-${model.id}`,
      title: model.title || `3D Model ${model.id}`,
      description: `3D modeling work by Dulcets`,
      category: 'modeling',
      url: '#modeling',
      keywords: ['3d', 'modeling', 'model', 'animation', '3d modeling'],
      content: `${model.title || ''} 3d modeling animation`,
      metadata: {
        imagePath: model.imagePath,
        pos: model.pos
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
