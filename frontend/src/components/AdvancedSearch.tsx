import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  searchContent, 
  buildDynamicSearchIndex, 
  saveSearchHistory, 
  getSearchHistory,
  SearchResult,
  SearchItem 
} from '@/utils/searchIndex';

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (url: string) => void;
  currentLanguage?: string; // Add language support
}

export default function AdvancedSearch({ isOpen, onClose, onNavigate, currentLanguage }: AdvancedSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [dynamicIndex, setDynamicIndex] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Global ESC key listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleGlobalKeyDown, true);
    }

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown, true);
    };
  }, [isOpen, onClose]);

  // Load search history and dynamic data when component mounts
  useEffect(() => {
    if (isOpen) {
      setSearchHistory(getSearchHistory());
      loadDynamicData();
      
      // Reset search state when opening
      setQuery('');
      setResults(null);
      setSelectedIndex(-1);
      
      // Focus input after a small delay to ensure it's rendered
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Load dynamic content from JSON files
  const loadDynamicData = useCallback(async () => {
    try {
      const [worksRes, artworksRes, modelingRes] = await Promise.all([
        fetch('/service/works.json').catch(() => ({ json: () => [] })),
        fetch('/service/artworks.json').catch(() => ({ json: () => [] })),
        fetch('/service/3d_modeling.json').catch(() => ({ json: () => [] }))
      ]);

      const [works, artworks, modeling] = await Promise.all([
        worksRes.json?.() || [],
        artworksRes.json?.() || [],
        modelingRes.json?.() || []
      ]);

      // Pass current language to build language-specific index
      const dynamicItems = buildDynamicSearchIndex(works, artworks, modeling, currentLanguage || 'ja');
      setDynamicIndex(dynamicItems);
    } catch (error) {
      console.warn('Failed to load dynamic search data:', error);
    }
  }, [currentLanguage]);

  // Perform search
  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults(null);
      setSelectedIndex(-1);
      return;
    }

    setIsLoading(true);
    
    // Simulate slight delay for better UX
    setTimeout(() => {
      const searchResults = searchContent(searchQuery, dynamicIndex);
      setResults(searchResults);
      setSelectedIndex(-1);
      setIsLoading(false);
    }, 150);
  }, [dynamicIndex]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    performSearch(newQuery);
  };

  // Get all result items for keyboard navigation
  const getAllResultItems = (): SearchItem[] => {
    if (!results) return [];
    return results.categories.flatMap(category => category.items);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const allItems = getAllResultItems();

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
        
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < allItems.length - 1 ? prev + 1 : 0
        );
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : allItems.length - 1
        );
        break;
        
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && allItems[selectedIndex]) {
          handleResultClick(allItems[selectedIndex]);
        } else if (query.trim()) {
          // Search for the current query
          performSearch(query);
          saveSearchHistory(query);
          setSearchHistory(getSearchHistory());
        }
        break;
    }
  };

  // Handle result item click
  const handleResultClick = (item: SearchItem) => {
    saveSearchHistory(query);
    setSearchHistory(getSearchHistory());
    
    if (item.url.startsWith('#')) {
      // Internal navigation
      onNavigate(item.url);
      onClose();
    } else if (item.url.startsWith('http')) {
      // External link
      window.open(item.url, '_blank');
      onClose();
    } else {
      // Default navigation
      onNavigate(item.url);
      onClose();
    }
  };

  // Handle history item click
  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery);
    performSearch(historyQuery);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div className="w-full h-full flex items-start justify-center pt-[10vh]">
      {/* Main search container */}
      <div className="w-full max-w-2xl mx-4">
        {/* Search input */}
        <div className="relative">
          <div className="flex items-center">
            <div className="w-full relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search music, services, artworks..."
                className="w-full bg-transparent border-0 border-b-2 border-gray-600 text-white placeholder-gray-400 px-0 py-4 focus:outline-none focus:border-blue-400 transition-all duration-200"
                style={{
                  fontSize: '28px',
                  letterSpacing: '0.02em',
                  fontFamily: '"Inter", "Helvetica Neue", "Arial", sans-serif',
                  fontWeight: '300',
                }}
              />
              {isLoading && (
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                  <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search results */}
        <div ref={resultsRef} className="mt-8">
          {!query.trim() && searchHistory.length > 0 && (
            <div className="mb-8">
              <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-3">Recent Searches</h3>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((historyItem, index) => (
                  <button
                    key={index}
                    onClick={() => handleHistoryClick(historyItem)}
                    className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-full transition-colors"
                  >
                    {historyItem}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results && results.categories.length > 0 && (
            <div className="space-y-6">
              {results.categories.map((category, categoryIndex) => (
                <div key={category.name} className="space-y-2">
                  <h3 className="text-gray-400 text-sm uppercase tracking-wide flex items-center gap-2">
                    {category.icon && <span>{category.icon}</span>}
                    {category.name} ({category.items.length})
                  </h3>
                  
                  <div className="space-y-1">
                    {category.items.map((item, itemIndex) => {
                      // Calculate global index for keyboard navigation
                      const globalIndex = results.categories
                        .slice(0, categoryIndex)
                        .reduce((acc, cat) => acc + cat.items.length, 0) + itemIndex;
                      
                      const isSelected = globalIndex === selectedIndex;
                      
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleResultClick(item)}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            isSelected 
                              ? 'bg-blue-600 text-white' 
                              : 'hover:bg-gray-800 text-gray-200'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="font-medium text-sm mb-1">{item.title}</div>
                              <div className={`text-xs ${
                                isSelected ? 'text-blue-100' : 'text-gray-400'
                              }`}>
                                {item.description}
                              </div>
                              {item.metadata?.duration && (
                                <div className={`text-xs mt-1 ${
                                  isSelected ? 'text-blue-200' : 'text-gray-500'
                                }`}>
                                  Duration: {item.metadata.duration}
                                </div>
                              )}
                            </div>
                            <div className={`text-xs ${
                              isSelected ? 'text-blue-200' : 'text-gray-500'
                            }`}>
                              {item.category}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              
              {results.totalResults > results.categories.reduce((sum, cat) => sum + cat.items.length, 0) && (
                <div className="text-center text-gray-400 text-sm">
                  ... and {results.totalResults - results.categories.reduce((sum, cat) => sum + cat.items.length, 0)} more results
                </div>
              )}
            </div>
          )}

          {results && results.categories.length === 0 && query.trim() && !isLoading && (
            <div className="text-center py-8">
              <div className="text-gray-400 text-lg mb-2">No results found</div>
              <div className="text-gray-500 text-sm">
                Try searching for "music", "jpop", "artwork", or "3d"
              </div>
            </div>
          )}

          {!query.trim() && searchHistory.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 text-lg mb-2">Start typing to search</div>
              <div className="text-gray-500 text-sm">
                Search through our music works, services, artworks, and more
              </div>
            </div>
          )}
        </div>

        {/* Shortcuts hint */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-700 border border-gray-600 rounded text-gray-400">
                ↑↓
              </kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-700 border border-gray-600 rounded text-gray-400">
                Enter
              </kbd>
              Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-700 border border-gray-600 rounded text-gray-400">
                ESC
              </kbd>
              Close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
