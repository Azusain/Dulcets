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
    description: 'Japanese pop music production and arrangement - Listen to samples',
    category: 'service',
    url: '#works?genre=jpop',
    keywords: ['jpop', 'j-pop', 'japanese pop', '日本流行音乐', 'ジェイポップ', 'pop music'],
    content: 'Japanese pop music J-Pop production arrangement modern catchy melodies',
    metadata: { isGenre: true, genreId: 'jpop' }
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
    description: 'Japanese rock music production with modern sound - Listen to samples',
    category: 'service',
    url: '#works?genre=jrock',
    keywords: ['jrock', 'j-rock', 'japanese rock', '日本摇滚', 'ジェイロック', 'rock'],
    content: 'Japanese rock music J-Rock production heavy guitars modern sound',
    metadata: { isGenre: true, genreId: 'jrock' }
  },
  {
    id: 'service-orchestral',
    title: 'Orchestral Music',
    description: 'Classical orchestral arrangements and compositions - Listen to samples',
    category: 'service',
    url: '#works?genre=orchestra',
    keywords: ['orchestral', 'orchestra', '管弦乐', 'オーケストラ', 'classical', 'symphonic'],
    content: 'Orchestral music classical arrangements symphonic compositions',
    metadata: { isGenre: true, genreId: 'orchestra' }
  },
  {
    id: 'service-edm',
    title: 'Electronic Dance Music',
    description: 'Modern EDM production and electronic arrangements - Listen to samples',
    category: 'service',
    url: '#works?genre=edm',
    keywords: ['edm', 'electronic', 'dance', '电子音乐', '電子ダンス', 'techno', 'house'],
    content: 'Electronic dance music EDM production techno house electronic arrangements',
    metadata: { isGenre: true, genreId: 'edm' }
  },
  {
    id: 'service-bgm',
    title: 'Background Music',
    description: 'Background music for games, videos, and media - Listen to samples',
    category: 'service',
    url: '#works?genre=bgm',
    keywords: ['bgm', 'background music', '背景音乐', 'バックグラウンド', 'game music', 'media'],
    content: 'Background music BGM game music video music media soundtrack ambient',
    metadata: { isGenre: true, genreId: 'bgm' }
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

// Improved search implementation with better precision
export function fuzzySearch(query: string, text: string): number {
  query = query.toLowerCase();
  text = text.toLowerCase();
  
  // Exact match gets highest score
  if (text.includes(query)) {
    const position = text.indexOf(query);
    return 100 - position; // Earlier matches get higher scores
  }
  
  // Word boundary matching (higher priority)
  const words = text.split(/\s+/);
  for (const word of words) {
    if (word.startsWith(query)) {
      return 80 - query.length; // Prefix match gets high score
    }
  }
  
  // For queries longer than 3 characters, require more strict matching
  if (query.length > 3) {
    // Require at least 70% of characters to match in sequence
    const requiredMatches = Math.ceil(query.length * 0.7);
    let consecutiveMatches = 0;
    let maxConsecutive = 0;
    let queryIndex = 0;
    
    for (let i = 0; i < text.length && queryIndex < query.length; i++) {
      if (text[i] === query[queryIndex]) {
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
    
    return maxConsecutive * 2;
  }
  
  // For short queries (3 chars or less), use character matching
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
  
  // Define category order and names
  const categoryOrder = [
    { key: 'work', name: 'Music Works', icon: '🎵' },
    { key: 'artwork', name: 'Artworks', icon: '🎨' },
    { key: 'modeling', name: '3D Models', icon: '🎭' },
    { key: 'service', name: 'Services', icon: '🛠️' },
    { key: 'navigation', name: 'Navigation', icon: '🧭' },
    { key: 'page', name: 'Pages', icon: '📄' }
  ];
  
  for (const { key, name, icon } of categoryOrder) {
    const items = categoryMap.get(key);
    if (items && items.length > 0) {
      categories.push({
        name,
        icon,
        items: items.slice(0, 3) // Reduce results per category to 3
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
    // Construct full image URL
    const imageUrl = artwork.imagePath ? `/images/artworks/${artwork.imagePath}` : '#artworks';
    
    // Get localized description
    let description;
    if (currentLanguage === 'en') {
      description = 'Digital artwork piece by Dulcets - Click to view image';
    } else if (currentLanguage === 'zh') {
      description = 'Dulcets数字艺术作品 - 点击查看图片';
    } else { // Japanese
      description = 'Dulcetsによるデジタルアートワーク - クリックして画像を表示';
    }
    
    dynamicItems.push({
      id: `artwork-${artwork.id}`,
      title: artwork.title || `绘画作品 ${artwork.id}`,
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
    let description;
    if (currentLanguage === 'en') {
      description = '3D modeling work by Dulcets - Click to view image';
    } else if (currentLanguage === 'zh') {
      description = 'Dulcets三维建模作品 - 点击查看图片';
    } else { // Japanese
      description = 'Dulcetsによる3Dモデリング作品 - クリックして画像を表示';
    }
    
    dynamicItems.push({
      id: `modeling-${model.id}`,
      title: model.title || `Modeling ${model.id}`,
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
