// YouTube API response types
export interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    publishedAt: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
      standard?: { url: string };
      maxres?: { url: string };
    };
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
}

export interface YouTubeChannelResponse {
  items: {
    id: string;
    contentDetails: {
      relatedPlaylists: {
        uploads: string;
      };
    };
  }[];
}

export interface YouTubePlaylistResponse {
  items: {
    snippet: {
      resourceId: {
        videoId: string;
      };
    };
  }[];
  nextPageToken?: string;
}

export interface YouTubeVideoResponse {
  items: YouTubeVideo[];
}

// work.json structure
export interface VideoMetadata {
  title: string;
  date: string;
  viewCount: number;
  url: string;
  thumbnail?: string;
}

export interface WorkData {
  videos: VideoMetadata[];
  lastUpdated: string;
}
