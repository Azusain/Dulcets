# YouTube Integration Enhancement

This document describes the enhanced YouTube integration features that automatically fetch video metadata and display them on the frontend.

## New Features

### 📊 Enhanced Video Metadata
- **View Count**: Displays actual YouTube view counts
- **Like Count**: Shows YouTube like counts
- **Comment Count**: Captures comment counts (stored in data but not currently displayed)
- **Video Duration**: Full duration information
- **Description**: Complete video descriptions
- **Shorts Detection**: Automatically filters out YouTube Shorts (optional)

### 🎨 Frontend Display
- **Hover Stats**: View and like counts appear with icons when hovering over video cards
- **White Icons**: Eye icon for views, heart icon for likes
- **Number Formatting**: Automatically formats large numbers (1K, 2.8K, etc.)
- **Multilingual Support**: Stats display in Chinese, English, and Japanese

### 🤖 Automation
- **Full Data Fetching**: Go program now fetches comprehensive metadata with `-full-data` flag
- **Frontend Sync**: Automatic synchronization from `work.json` to frontend `works.json`
- **GitHub Actions**: Updated workflow includes frontend sync step
- **Dual File System**: Backend data in `work.json`, frontend display data in `frontend/public/service/works.json`

## Technical Implementation

### Go YouTube Fetcher Enhancements
```bash
# Fetch with full metadata including likes and comments
go run tools/youtube-fetcher.go -full-data -verbose

# Filter out shorts (default behavior)
go run tools/youtube-fetcher.go -full-data

# Include shorts if needed
go run tools/youtube-fetcher.go -full-data -include-shorts
```

### Data Synchronization Script
```bash
# Convert work.json to frontend format
node tools/sync-works.js

# Or use npm scripts
npm run sync-works
npm run update-all  # Fetch + sync in one command
```

### Frontend Components
- **ServiceCard**: Enhanced with view/like count display
- **OurWorksSection**: Passes new metadata to cards
- **Hover Animation**: Smooth transitions for stats display

## Data Flow

```
YouTube API
    ↓
Go Fetcher (-full-data)
    ↓
work.json (backend format)
    ↓
sync-works.js script
    ↓
works.json (frontend format)
    ↓
Frontend Components
    ↓
User Interface
```

## GitHub Actions Workflow

The automated workflow now:
1. Fetches YouTube data with full metadata
2. Syncs data to frontend format
3. Commits both files to repository
4. Runs twice daily (12:00 PM and 12:00 AM JST)

## Usage

### Manual Updates
```bash
# Update everything
npm run update-all

# Just fetch YouTube data
npm run fetch-youtube

# Just sync to frontend
npm run sync-works
```

### Automated Updates
- Runs automatically via GitHub Actions
- Manual trigger available in GitHub Actions tab
- Uses YouTube API key from GitHub Secrets
- Bypasses branch protection with PAT token

## File Structure

```
├── work.json                              # Backend data format
├── frontend/public/service/works.json     # Frontend display format
├── tools/
│   ├── youtube-fetcher.go                 # Enhanced Go fetcher
│   └── sync-works.js                      # Sync script
├── package.json                           # npm scripts
└── .github/workflows/fetch-youtube-videos.yml  # Updated workflow
```

## Display Examples

When users hover over video cards, they will see:
- 👁️ 294 (view count with eye icon)
- ❤️ 16 (like count with heart icon)

Numbers are automatically formatted:
- 1,001 → 1K
- 2,839 → 2.8K
- 10,000+ → 1萬 (for Chinese interface)

## Future Enhancements

Potential improvements:
- Comment count display
- Video duration badges
- Upload date indicators
- Trending indicators
- View growth metrics
- Social sharing stats
