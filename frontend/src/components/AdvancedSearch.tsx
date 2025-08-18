import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  searchContent, 
  buildDynamicSearchIndex, 
  saveSearchHistory, 
  getSearchHistory,
  SearchResult,
  SearchItem 
} from '@/utils/searchIndex';
import ImageModal from './ImageModal';

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (url: string) => void;
  currentLanguage?: string; // Add language support
  t?: (key: string) => string; // Add translator function
}

export default function AdvancedSearch({ isOpen, onClose, onNavigate, currentLanguage, t }: AdvancedSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [dynamicIndex, setDynamicIndex] = useState<any[]>([]);
  const [imageModalState, setImageModalState] = useState({ isOpen: false, imageUrl: '', title: '' });
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  // Fallback translator function if not provided
  const translate = t || ((key: string) => key);

  // Global Ctrl+Q/Cmd+Q key listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'q' && (e.ctrlKey || e.metaKey)) {
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

  // Scroll selected item into view
  const scrollToSelectedItem = (index: number) => {
    // Small delay to ensure DOM update
    setTimeout(() => {
      const container = resultsRef.current;
      if (!container) return;
      
      // Find the selected element by data attribute or by calculating position
      const resultItems = container.querySelectorAll('[data-result-index]');
      const selectedElement = resultItems[index] as HTMLElement;
      
      if (selectedElement) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = selectedElement.getBoundingClientRect();
        
        // Check if element is out of view
        const isAbove = elementRect.top < containerRect.top;
        const isBelow = elementRect.bottom > containerRect.bottom;
        
        if (isAbove || isBelow) {
          selectedElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
          });
        }
      }
    }, 50);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const allItems = getAllResultItems();

    switch (e.key) {
      // ESC key disabled - use Ctrl+Q/Cmd+Q to close
        
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => {
          const newIndex = prev < allItems.length - 1 ? prev + 1 : 0;
          scrollToSelectedItem(newIndex);
          return newIndex;
        });
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => {
          const newIndex = prev > 0 ? prev - 1 : allItems.length - 1;
          scrollToSelectedItem(newIndex);
          return newIndex;
        });
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
      // Check if it's a genre URL with parameters
      if (item.url.includes('?genre=') && item.metadata?.isGenre) {
        // Extract genre ID and navigate to works section with genre selection
        const genreId = item.metadata.genreId;
        
        // First navigate to works section
        const worksElement = document.querySelector('#works');
        if (worksElement) {
          worksElement.scrollIntoView({ behavior: 'smooth' });
          
          // Then trigger genre selection after a short delay
          setTimeout(() => {
            // Dispatch a custom event to set the genre
            window.dispatchEvent(new CustomEvent('setGenre', { 
              detail: { genreId } 
            }));
          }, 500);
        }
        onClose();
      } else {
        // Regular internal navigation
        onNavigate(item.url);
        onClose();
      }
    } else if (item.url.startsWith('http')) {
      // External link (YouTube videos, etc.)
      window.open(item.url, '_blank');
      onClose();
    } else if (item.metadata?.isImage) {
      // Image files - open in modal
      setImageModalState({
        isOpen: true,
        imageUrl: item.url,
        title: item.title
      });
      // Don't close search - let user keep browsing images
    } else {
      // Default navigation
      onNavigate(item.url);
      onClose();
    }
  };

  // Handle closing image modal
  const closeImageModal = () => {
    setImageModalState({ isOpen: false, imageUrl: '', title: '' });
  };

  // Handle expanding category to show more results
  const toggleCategoryExpansion = (categoryName: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  // Handle history item click
  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery);
    performSearch(historyQuery);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <>
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
                  placeholder={translate('search.placeholder')}
                  className="w-full bg-transparent border-0 border-b-2 border-gray-600 text-white placeholder-gray-400 px-0 py-4 focus:outline-none focus:border-white transition-all duration-200"
                  style={{
                    fontSize: '36px',
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

        {/* Search results - scrollable container */}
        <div ref={resultsRef} className="mt-8 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {!query.trim() && searchHistory.length > 0 && (
            <div className="mb-8">
              <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-3">{translate('search.recent_searches')}</h3>
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
              {results.categories.map((category, categoryIndex) => {
                const isExpanded = expandedCategories.has(category.name);
                const totalItemsInCategory = category.totalItems || category.items.length;
                const displayedItems = isExpanded ? category.items : category.items.slice(0, 5);
                const hasMoreItems = totalItemsInCategory > 5;
                
                return (
                  <div key={category.name} className="space-y-2">
                    <h3 className="text-gray-400 text-sm uppercase tracking-wide flex items-center gap-2">
                      {category.icon && <span>{category.icon}</span>}
                      {category.name} ({totalItemsInCategory})
                    </h3>
                    
                    <div className="space-y-1">
                      {displayedItems.map((item, itemIndex) => {
                        // Calculate global index for keyboard navigation
                        const globalIndex = results.categories
                          .slice(0, categoryIndex)
                          .reduce((acc, cat) => acc + cat.items.length, 0) + itemIndex;
                        
                        const isSelected = globalIndex === selectedIndex;
                        
                        return (
                          <div
                            key={item.id}
                            data-result-index={globalIndex}
                            onClick={() => handleResultClick(item)}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              isSelected 
                                ? 'bg-gray-800 text-gray-200' 
                                : 'hover:bg-gray-800 text-gray-200'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="font-medium text-sm mb-1">{item.title}</div>
                                <div className="text-xs text-gray-400">
                                  {item.description}
                                </div>
                                {item.metadata?.duration && (
                                  <div className="text-xs mt-1 text-gray-500">
                                    Duration: {item.metadata.duration}
                                  </div>
                                )}
                              </div>
                              <div className="text-xs text-gray-500">
                                {item.category}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Show more/less button */}
                    {hasMoreItems && (
                      <div className="text-center pt-2">
                        <button
                          onClick={() => toggleCategoryExpansion(category.name)}
                          className="text-blue-400 hover:text-blue-300 text-sm transition-colors flex items-center gap-1 mx-auto"
                        >
                          {isExpanded ? (
                            <>
                              <span>显示更少</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            </>
                          ) : (
                            <>
                              <span>显示更多 ({totalItemsInCategory - displayedItems.length} 个)</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
              
              {/* Total results summary */}
              <div className="text-center text-gray-400 text-sm pt-4 border-t border-gray-700">
                <span>共找到 {results.totalResults} 个结果</span>
                {results.categories.length > 1 && (
                  <span className="ml-2">• {results.categories.length} 个类别</span>
                )}
              </div>
            </div>
          )}

          {results && results.categories.length === 0 && query.trim() && !isLoading && (
            <div className="text-center py-8">
              <div className="text-gray-400 text-lg mb-2">{translate('search.no_results')}</div>
              <div className="text-gray-500 text-sm">
                {translate('search.no_results_suggestion')}
              </div>
            </div>
          )}

          {!query.trim() && searchHistory.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 text-lg mb-2">{translate('search.start_typing')}</div>
              <div className="text-gray-500 text-sm">
                {translate('search.search_description')}
              </div>
            </div>
          )}
        </div>

        </div>
      </div>
      
      {/* Image Modal */}
      <ImageModal
        isOpen={imageModalState.isOpen}
        imageUrl={imageModalState.imageUrl}
        title={imageModalState.title}
        onClose={closeImageModal}
      />
    </>
  );
}
