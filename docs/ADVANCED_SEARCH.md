# Advanced Search Feature Documentation

## Overview

The Dulcets website now features a comprehensive advanced search system that allows users to quickly find content across music works, services, artworks, and site navigation.

## Features

### 🔍 **Comprehensive Search Index**
- **Music Works**: Search through all music productions including titles, descriptions, and metadata
- **Services**: Find music production services (J-Pop, J-Rock, Anime, Orchestral, EDM, BGM)
- **Artworks**: Browse digital artwork and illustrations 
- **3D Models**: Discover 3D modeling works
- **Navigation**: Quick access to site sections

### ⌨️ **Multiple Access Methods**
- **Ctrl+Q**: Global hotkey to open search (primary)
- **Ctrl+K**: Alternative hotkey for search
- **/** key: Quick search access
- **Menu Button**: Opens search through navigation menu

### 🎯 **Smart Search Algorithm**
- **Fuzzy Matching**: Handles typos and partial matches
- **Weighted Scoring**: Title matches rank higher than content matches
- **Multi-language Support**: Searches in Japanese, English, and Chinese
- **Category Organization**: Results grouped by content type with icons

### 📱 **User Experience**
- **Real-time Results**: Search as you type with 150ms debounce
- **Keyboard Navigation**: Arrow keys to navigate, Enter to select, ESC to close
- **Search History**: Stores last 10 searches locally
- **Loading States**: Visual feedback during search operations
- **Responsive Design**: Works on desktop and mobile

## Technical Implementation

### Architecture

```
frontend/src/
├── components/
│   ├── AdvancedSearch.tsx      # Main search component
│   └── navigation.tsx          # Integrated search access
├── hooks/
│   └── useGlobalHotkeys.tsx    # Hotkey management
└── utils/
    └── searchIndex.ts          # Search logic and indexing
```

### Search Index Structure

The search system builds a comprehensive index from:

1. **Static Content**: Navigation items, services, page content
2. **Dynamic Content**: Loaded from JSON files (works, artworks, 3D models)
3. **Multilingual Keywords**: Supports Japanese, English, Chinese terms

### Search Algorithm

```typescript
// Weighted scoring system
- Title matches: 3x weight
- Keywords matches: 2.5x weight  
- Description matches: 2x weight
- Content matches: 1.5x weight
```

### Data Sources

- `public/service/works.json` - Music production portfolio
- `public/service/artworks.json` - Digital artwork gallery
- `public/service/3d_modeling.json` - 3D modeling showcase
- Static content defined in `searchIndex.ts`

## Usage Examples

### Basic Search
- Type "jpop" → Shows J-Pop related services and content
- Type "aquamarine" → Finds the Aquamarine music work
- Type "3d" → Shows 3D modeling services and works

### Navigation Search
- Type "about" → Quick jump to About section
- Type "contact" → Direct navigation to Contact section
- Type "services" → Navigate to Services section

### Multilingual Search
- Type "音楽制作" (Japanese) → Finds music production content
- Type "艺术作品" (Chinese) → Shows artwork content
- Type "アニメソング" (Japanese) → Finds anime song services

## Hotkey Reference

| Hotkey | Action | Context |
|--------|--------|---------|
| `Ctrl+Q` | Open search | Global (primary) |
| `Ctrl+K` | Open search | Global (alternative) |
| `/` | Open search | Global (quick access) |
| `↑↓` | Navigate results | In search |
| `Enter` | Select result | In search |
| `ESC` | Close search | In search |

## Search Categories

### 🧭 Navigation
- Home, About, Works, Services, Contact sections
- Quick site navigation with smooth scrolling

### 🎵 Music Works  
- Original songs and collaborations
- Video links and metadata (duration, date)
- Multi-language titles and descriptions

### 🛠️ Services
- Music production services
- Genre specializations (J-Pop, J-Rock, Anime, etc.)
- Service descriptions and capabilities

### 🎨 Artworks
- Digital artwork portfolio
- Illustration and design works
- Visual art showcase

### 🎭 3D Models
- 3D modeling projects
- Character and scene modeling
- Animation and rendering work

## Performance Features

- **Debounced Search**: 150ms delay prevents excessive API calls
- **Result Limiting**: Max 5 results per category for performance
- **Local Storage**: Search history cached locally
- **Memory Efficient**: Lazy loading of dynamic content

## Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Friendly**: Proper ARIA labels and roles
- **High Contrast**: Clear visual indicators for selection
- **Focus Management**: Proper focus handling and restoration

## Future Enhancements

Potential improvements for future versions:

- **Search Analytics**: Track popular search terms
- **Advanced Filters**: Filter by date, category, language
- **Autocomplete**: Suggested completions as you type  
- **Recent Searches**: Quick access to recent queries
- **Bookmarked Results**: Save favorite search results
- **Search Shortcuts**: Custom user-defined shortcuts

## Browser Support

- **Chrome**: Full support (recommended)
- **Firefox**: Full support
- **Safari**: Full support  
- **Edge**: Full support
- **Mobile Browsers**: Responsive design supported

## Development Notes

The search system is designed to be:
- **Non-destructive**: Doesn't modify existing functionality
- **Modular**: Easy to extend with new content types
- **Performant**: Efficient indexing and search algorithms
- **Maintainable**: Clean separation of concerns

Built following user rules:
- No use of "use client" or "use server" directives
- Maintains existing functionality integrity
- Simple, focused implementation without unnecessary complexity
