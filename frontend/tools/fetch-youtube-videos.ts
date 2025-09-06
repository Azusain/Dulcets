#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import {
  YouTubeChannelResponse,
  YouTubePlaylistResponse,
  YouTubeVideoResponse,
  VideoMetadata,
  WorkData
} from './types';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
const CHANNEL_HANDLE = '@Dulcets';
const CHANNEL_ID = 'UCfM3zsQsOnfWNUppiycmBuw'; // you may need to update this
const MAX_RESULTS = 50; // maximum videos to fetch per request

class YouTubeFetcher {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('youtube API key is required. Set YOUTUBE_API_KEY environment variable.');
    }
  }

  private async makeRequest(url: string): Promise<any> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`http error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('api request failed:', error);
      throw error;
    }
  }

  private async getChannelUploadsPlaylistId(): Promise<string> {
    const url = `${YOUTUBE_API_BASE}/channels?part=contentDetails&id=${CHANNEL_ID}&key=${this.apiKey}`;
    
    const response: YouTubeChannelResponse = await this.makeRequest(url);
    
    if (!response.items || response.items.length === 0) {
      throw new Error('channel not found');
    }

    return response.items[0].contentDetails.relatedPlaylists.uploads;
  }

  private async getVideoIdsFromPlaylist(playlistId: string): Promise<string[]> {
    const videoIds: string[] = [];
    let nextPageToken = '';

    do {
      const url = `${YOUTUBE_API_BASE}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${MAX_RESULTS}&key=${this.apiKey}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
      
      const response: YouTubePlaylistResponse = await this.makeRequest(url);
      
      if (response.items) {
        for (const item of response.items) {
          videoIds.push(item.snippet.resourceId.videoId);
        }
      }

      nextPageToken = response.nextPageToken || '';
    } while (nextPageToken);

    return videoIds;
  }

  private async getVideoDetails(videoIds: string[]): Promise<VideoMetadata[]> {
    const videos: VideoMetadata[] = [];
    
    // process videos in batches of 50 (YouTube API limit)
    for (let i = 0; i < videoIds.length; i += 50) {
      const batch = videoIds.slice(i, i + 50);
      const url = `${YOUTUBE_API_BASE}/videos?part=snippet,statistics&id=${batch.join(',')}&key=${this.apiKey}`;
      
      const response: YouTubeVideoResponse = await this.makeRequest(url);
      
      if (response.items) {
        for (const video of response.items) {
          videos.push({
            title: video.snippet.title,
            date: new Date(video.snippet.publishedAt).toISOString().split('T')[0],
            viewCount: parseInt(video.statistics.viewCount, 10),
            url: `https://www.youtube.com/watch?v=${video.id}`,
            thumbnail: video.snippet.thumbnails.high.url
          });
        }
      }
    }

    return videos;
  }

  async fetchAllVideos(): Promise<WorkData> {
    console.log('fetching channel upload playlist...');
    const uploadsPlaylistId = await this.getChannelUploadsPlaylistId();
    
    console.log('fetching video IDs from playlist...');
    const videoIds = await this.getVideoIdsFromPlaylist(uploadsPlaylistId);
    console.log(`found ${videoIds.length} videos`);
    
    console.log('fetching video details...');
    const videos = await this.getVideoDetails(videoIds);
    
    // sort videos by date (newest first)
    videos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return {
      videos,
      lastUpdated: new Date().toISOString()
    };
  }
}

async function main() {
  try {
    const fetcher = new YouTubeFetcher();
    const workData = await fetcher.fetchAllVideos();
    
    // determine the output path (project root)
    const outputPath = path.join(process.cwd(), '..', 'work.json');
    
    // write to work.json
    fs.writeFileSync(outputPath, JSON.stringify(workData, null, 2));
    
    console.log(`successfully updated work.json with ${workData.videos.length} videos`);
    console.log(`file saved to: ${outputPath}`);
    
  } catch (error) {
    console.error('error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export default YouTubeFetcher;
