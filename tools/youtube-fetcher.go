package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"net/http"
	"os"
	"sort"
	"strconv"
	"strings"
	"time"
)

// VideoMetadata represents video information for work.json
type VideoMetadata struct {
	Title       string `json:"title"`
	Date        string `json:"date"`
	ViewCount   int64  `json:"viewCount"`
	LikeCount   int64  `json:"likeCount,omitempty"`
	CommentCount int64  `json:"commentCount,omitempty"`
	Description string `json:"description,omitempty"`
	Duration    string `json:"duration,omitempty"`
	IsShort     bool   `json:"isShort,omitempty"`
	URL         string `json:"url"`
	Thumbnail   string `json:"thumbnail,omitempty"`
}

// WorkData represents the complete work.json structure
type WorkData struct {
	Videos      []VideoMetadata `json:"videos"`
	LastUpdated string          `json:"lastUpdated"`
}

// YouTube API response structures
type YouTubeChannelResponse struct {
	Items []struct {
		ContentDetails struct {
			RelatedPlaylists struct {
				Uploads string `json:"uploads"`
			} `json:"relatedPlaylists"`
		} `json:"contentDetails"`
	} `json:"items"`
}

type YouTubePlaylistResponse struct {
	Items []struct {
		Snippet struct {
			ResourceID struct {
				VideoID string `json:"videoId"`
			} `json:"resourceId"`
		} `json:"snippet"`
	} `json:"items"`
	NextPageToken string `json:"nextPageToken"`
}

type YouTubeVideoResponse struct {
	Items []struct {
		ID      string `json:"id"`
		Snippet struct {
			Title       string    `json:"title"`
			Description string    `json:"description"`
			PublishedAt time.Time `json:"publishedAt"`
			Thumbnails  struct {
				High struct {
					URL string `json:"url"`
				} `json:"high"`
			} `json:"thumbnails"`
		} `json:"snippet"`
		ContentDetails struct {
			Duration string `json:"duration"`
		} `json:"contentDetails"`
		Statistics struct {
			ViewCount    string `json:"viewCount"`
			LikeCount    string `json:"likeCount"`
			CommentCount string `json:"commentCount"`
		} `json:"statistics"`
	} `json:"items"`
}

// Config holds configuration for the YouTube fetcher
type Config struct {
	APIKey       string
	ChannelID    string
	Output       string
	Verbose      bool
	IncludeShorts bool
	FullData     bool
}

// YouTubeFetcher provides methods to fetch YouTube data
type YouTubeFetcher struct {
	config *Config
	client *http.Client
}

// NewYouTubeFetcher creates a new YouTube fetcher instance
func NewYouTubeFetcher(config *Config) *YouTubeFetcher {
	return &YouTubeFetcher{
		config: config,
		client: &http.Client{Timeout: 30 * time.Second},
	}
}

func (yf *YouTubeFetcher) log(format string, args ...interface{}) {
	if yf.config.Verbose {
		fmt.Printf("[INFO] "+format+"\n", args...)
	}
}

func (yf *YouTubeFetcher) makeRequest(url string) ([]byte, error) {
	yf.log("making request to: %s", url)
	
	resp, err := yf.client.Get(url)
	if err != nil {
		return nil, fmt.Errorf("request failed: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("HTTP error %d: %s", resp.StatusCode, string(body))
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %v", err)
	}

	yf.log("response received, size: %d bytes", len(body))
	return body, nil
}

// GetChannelUploadsPlaylistID retrieves the uploads playlist ID for a channel
func (yf *YouTubeFetcher) GetChannelUploadsPlaylistID() (string, error) {
	const apiBase = "https://www.googleapis.com/youtube/v3"
	url := fmt.Sprintf("%s/channels?part=contentDetails&id=%s&key=%s",
		apiBase, yf.config.ChannelID, yf.config.APIKey)

	data, err := yf.makeRequest(url)
	if err != nil {
		return "", fmt.Errorf("failed to get channel info: %v", err)
	}

	var response YouTubeChannelResponse
	if err := json.Unmarshal(data, &response); err != nil {
		return "", fmt.Errorf("failed to parse channel response: %v", err)
	}

	if len(response.Items) == 0 {
		return "", fmt.Errorf("channel not found: %s", yf.config.ChannelID)
	}

	playlistID := response.Items[0].ContentDetails.RelatedPlaylists.Uploads
	yf.log("found uploads playlist ID: %s", playlistID)
	return playlistID, nil
}

// GetVideoIDsFromPlaylist retrieves all video IDs from a playlist
func (yf *YouTubeFetcher) GetVideoIDsFromPlaylist(playlistID string) ([]string, error) {
	const apiBase = "https://www.googleapis.com/youtube/v3"
	const maxResults = 50

	var videoIDs []string
	nextPageToken := ""

	for {
		url := fmt.Sprintf("%s/playlistItems?part=snippet&playlistId=%s&maxResults=%d&key=%s",
			apiBase, playlistID, maxResults, yf.config.APIKey)

		if nextPageToken != "" {
			url += "&pageToken=" + nextPageToken
		}

		data, err := yf.makeRequest(url)
		if err != nil {
			return nil, fmt.Errorf("failed to get playlist items: %v", err)
		}

		var response YouTubePlaylistResponse
		if err := json.Unmarshal(data, &response); err != nil {
			return nil, fmt.Errorf("failed to parse playlist response: %v", err)
		}

		for _, item := range response.Items {
			videoIDs = append(videoIDs, item.Snippet.ResourceID.VideoID)
		}

		yf.log("fetched %d video IDs from page", len(response.Items))
		nextPageToken = response.NextPageToken
		if nextPageToken == "" {
			break
		}
	}

	yf.log("total video IDs collected: %d", len(videoIDs))
	return videoIDs, nil
}

// isShort determines if a video is a YouTube Short based on duration
func (yf *YouTubeFetcher) isShort(duration string) bool {
	// YouTube Shorts are typically under 60 seconds
	// Duration format: PT4M13S, PT30S, etc.
	if !strings.HasPrefix(duration, "PT") {
		return false
	}
	
	duration = strings.TrimPrefix(duration, "PT")
	
	// If it contains hours, it's definitely not a short
	if strings.Contains(duration, "H") {
		return false
	}
	
	// If it contains minutes, check if it's more than 1 minute
	if strings.Contains(duration, "M") {
		parts := strings.Split(duration, "M")
		if len(parts) > 0 {
			minutes, err := strconv.Atoi(parts[0])
			if err == nil && minutes >= 1 {
				return false
			}
		}
	}
	
	// If only seconds, check if it's 60 or less
	if strings.HasSuffix(duration, "S") {
		secPart := strings.TrimSuffix(duration, "S")
		// Remove minute part if exists
		if strings.Contains(secPart, "M") {
			parts := strings.Split(secPart, "M")
			if len(parts) > 1 {
				secPart = parts[1]
			}
		}
		seconds, err := strconv.Atoi(secPart)
		if err == nil {
			return seconds <= 60
		}
	}
	
	return true // Default to short if duration is very short or unclear
}

// GetVideoDetails fetches detailed information for a list of video IDs
func (yf *YouTubeFetcher) GetVideoDetails(videoIDs []string) ([]VideoMetadata, error) {
	const apiBase = "https://www.googleapis.com/youtube/v3"
	var videos []VideoMetadata
	var filteredCount = 0

	// Process videos in batches of 50 (YouTube API limit)
	for i := 0; i < len(videoIDs); i += 50 {
		end := i + 50
		if end > len(videoIDs) {
			end = len(videoIDs)
		}
		batch := videoIDs[i:end]

		// Include contentDetails to get duration for shorts detection
		parts := "snippet,statistics"
		if yf.config.FullData || !yf.config.IncludeShorts {
			parts += ",contentDetails"
		}

		url := fmt.Sprintf("%s/videos?part=%s&id=%s&key=%s",
			apiBase, parts, strings.Join(batch, ","), yf.config.APIKey)

		data, err := yf.makeRequest(url)
		if err != nil {
			return nil, fmt.Errorf("failed to get video details: %v", err)
		}

		var response YouTubeVideoResponse
		if err := json.Unmarshal(data, &response); err != nil {
			return nil, fmt.Errorf("failed to parse video response: %v", err)
		}

		for _, video := range response.Items {
			// Parse numeric fields
			viewCount, _ := strconv.ParseInt(video.Statistics.ViewCount, 10, 64)
			likeCount, _ := strconv.ParseInt(video.Statistics.LikeCount, 10, 64)
			commentCount, _ := strconv.ParseInt(video.Statistics.CommentCount, 10, 64)

			// Check if this is a short
			isShort := yf.isShort(video.ContentDetails.Duration)

			// Skip shorts if not including them
			if isShort && !yf.config.IncludeShorts {
				filteredCount++
				yf.log("filtered out short: %s (duration: %s)", video.Snippet.Title, video.ContentDetails.Duration)
				continue
			}

			// Create video metadata
			videoMeta := VideoMetadata{
				Title:     video.Snippet.Title,
				Date:      video.Snippet.PublishedAt.Format("2006-01-02"),
				ViewCount: viewCount,
				URL:       fmt.Sprintf("https://www.youtube.com/watch?v=%s", video.ID),
				Thumbnail: video.Snippet.Thumbnails.High.URL,
			}

			// Add full data if requested
			if yf.config.FullData {
				videoMeta.LikeCount = likeCount
				videoMeta.CommentCount = commentCount
				videoMeta.Description = video.Snippet.Description
				videoMeta.Duration = video.ContentDetails.Duration
				videoMeta.IsShort = isShort
			}

			videos = append(videos, videoMeta)
		}

		yf.log("processed batch %d-%d, got %d videos", i+1, end, len(response.Items))
	}

	if filteredCount > 0 {
		yf.log("filtered out %d shorts", filteredCount)
	}

	return videos, nil
}

// FetchAllVideos fetches all videos from the channel and returns WorkData
func (yf *YouTubeFetcher) FetchAllVideos() (*WorkData, error) {
	yf.log("starting to fetch channel videos for: %s", yf.config.ChannelID)

	// Step 1: Get uploads playlist ID
	uploadsPlaylistID, err := yf.GetChannelUploadsPlaylistID()
	if err != nil {
		return nil, err
	}

	// Step 2: Get all video IDs from playlist
	videoIDs, err := yf.GetVideoIDsFromPlaylist(uploadsPlaylistID)
	if err != nil {
		return nil, err
	}

	// Step 3: Get detailed information for all videos
	videos, err := yf.GetVideoDetails(videoIDs)
	if err != nil {
		return nil, err
	}

	// Sort videos by date (newest first)
	sort.Slice(videos, func(i, j int) bool {
		return videos[i].Date > videos[j].Date
	})

	yf.log("successfully fetched %d videos", len(videos))

	return &WorkData{
		Videos:      videos,
		LastUpdated: time.Now().Format(time.RFC3339),
	}, nil
}

// SaveToFile saves WorkData to a JSON file
func (yf *YouTubeFetcher) SaveToFile(workData *WorkData) error {
	jsonData, err := json.MarshalIndent(workData, "", "  ")
	if err != nil {
		return fmt.Errorf("failed to marshal JSON: %v", err)
	}

	if err := os.WriteFile(yf.config.Output, jsonData, 0644); err != nil {
		return fmt.Errorf("failed to write file %s: %v", yf.config.Output, err)
	}

	yf.log("saved work.json to: %s", yf.config.Output)
	return nil
}

func main() {
	// Command line flags
	var (
		apiKey       = flag.String("api-key", "", "YouTube Data API v3 key")
		channelID    = flag.String("channel-id", "UCDmQ1drrmdD-8OULooXEwaw", "YouTube channel ID")
		output       = flag.String("output", "work.json", "Output file path")
		verbose      = flag.Bool("verbose", false, "Enable verbose logging")
		includeShorts = flag.Bool("include-shorts", false, "Include YouTube Shorts in results")
		fullData     = flag.Bool("full-data", false, "Include all available data (description, likes, comments, etc.)")
		help         = flag.Bool("help", false, "Show help message")
	)

	flag.Parse()

	if *help {
		fmt.Println("YouTube Fetcher - Fetch channel videos and generate work.json")
		fmt.Println()
		fmt.Println("Usage:")
		fmt.Printf("  %s [flags]\n", os.Args[0])
		fmt.Println()
		fmt.Println("Flags:")
		flag.PrintDefaults()
		fmt.Println()
		fmt.Println("Environment Variables:")
		fmt.Println("  YOUTUBE_API_KEY    YouTube Data API v3 key (alternative to -api-key)")
		fmt.Println()
		fmt.Println("Examples:")
		fmt.Printf("  %s -api-key=your_key -verbose\n", os.Args[0])
		fmt.Printf("  YOUTUBE_API_KEY=your_key %s -output=../work.json\n", os.Args[0])
		return
	}

	// Get API key from flag or environment variable
	if *apiKey == "" {
		*apiKey = os.Getenv("YOUTUBE_API_KEY")
	}

	if *apiKey == "" {
		fmt.Fprintf(os.Stderr, "error: YouTube API key is required. Use -api-key flag or YOUTUBE_API_KEY environment variable.\n")
		fmt.Fprintf(os.Stderr, "run with -help for usage information.\n")
		os.Exit(1)
	}

	config := &Config{
		APIKey:       *apiKey,
		ChannelID:    *channelID,
		Output:       *output,
		Verbose:      *verbose,
		IncludeShorts: *includeShorts,
		FullData:     *fullData,
	}

	fetcher := NewYouTubeFetcher(config)

	// Fetch videos
	workData, err := fetcher.FetchAllVideos()
	if err != nil {
		fmt.Fprintf(os.Stderr, "error fetching videos: %v\n", err)
		os.Exit(1)
	}

	// Save to file
	if err := fetcher.SaveToFile(workData); err != nil {
		fmt.Fprintf(os.Stderr, "error saving file: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("successfully updated %s with %d videos\n", config.Output, len(workData.Videos))
	if !*verbose {
		fmt.Printf("last updated: %s\n", workData.LastUpdated)
	}
}
