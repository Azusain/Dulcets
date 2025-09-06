# YouTube Videos Auto-Fetching System

This system automatically fetches video information from a YouTube channel and updates the `work.json` file.

## Tech Stack

- **Go Program**: `tools/youtube-fetcher.go` - Main data fetching program
- **GitHub Actions**: Automated execution and scheduled updates  
- **YouTube Data API v3**: Video data retrieval

## Setup Instructions

### 1. Get YouTube API Key

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable YouTube Data API v3
4. Create an API key (restrict to YouTube Data API v3)

### 2. Set up GitHub Secrets

Add the following secrets to your GitHub repository:

#### YOUTUBE_API_KEY
- Go to GitHub repository → Settings → Secrets and variables → Actions
- Click "New repository secret"
- Name: `YOUTUBE_API_KEY`
- Value: Your API key from Google Cloud Console

#### PAT_TOKEN (Bypass branch protection)
- Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Click "Generate new token (classic)"
- Set expiration and required permissions:
  - `repo` (Full control)
  - `workflow` (If you need to modify workflow files)
- Copy the generated token
- Add to repository secrets:
  - Name: `PAT_TOKEN`
  - Value: Your personal access token

### 3. Manual Testing

After setup, you can:

1. Run GitHub Action manually (Actions → fetch YouTube videos → Run workflow)
2. Or test locally:
   ```bash
   cd tools
   go run youtube-fetcher.go -api-key="your_key" -output="../work.json" -verbose
   ```

### 4. Automatic Schedule

GitHub Action runs automatically at (Japan Time):
- Daily at 12:00 PM (UTC 3:00)
- Daily at 12:00 AM (UTC 15:00)

## File Structure

- `tools/youtube-fetcher.go` - Main Go program for fetching YouTube data
- `tools/go.mod` - Go module file
- `.github/workflows/fetch-youtube-videos.yml` - GitHub Actions workflow
- `work.json` - Output file (generated in project root)

## CLI Usage

The Go program supports various command-line options:

```bash
# Basic usage with API key
go run youtube-fetcher.go -api-key="your_key"

# Custom output path and verbose logging
go run youtube-fetcher.go -api-key="your_key" -output="../work.json" -verbose

# Using environment variable
YOUTUBE_API_KEY="your_key" go run youtube-fetcher.go -verbose

# Different channel ID
go run youtube-fetcher.go -api-key="your_key" -channel-id="CHANNEL_ID"

# Show help
go run youtube-fetcher.go -help
```

## work.json Structure

```json
{
  "videos": [
    {
      "title": "Video Title",
      "date": "2025-01-06",
      "viewCount": 12345,
      "url": "https://www.youtube.com/watch?v=VIDEO_ID",
      "thumbnail": "https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg"
    }
  ],
  "lastUpdated": "2025-01-06T09:30:00.000Z"
}
```

## API Features

The `YouTubeFetcher` struct provides reusable methods:

- `GetChannelUploadsPlaylistID()` - Get channel's uploads playlist
- `GetVideoIDsFromPlaylist(playlistID)` - Get all video IDs from playlist
- `GetVideoDetails(videoIDs)` - Get detailed info for video IDs
- `FetchAllVideos()` - Complete workflow to fetch all channel videos
- `SaveToFile(workData)` - Save data to JSON file

## Troubleshooting

If you encounter issues:

1. Check GitHub Actions logs
2. Verify API key is valid and has sufficient quota
3. Confirm channel ID is correct
4. Check PAT token has sufficient permissions
