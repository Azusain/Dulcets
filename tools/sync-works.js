#!/usr/bin/env node
/**
 * Sync script to convert work.json to frontend works.json format
 * Maintains multilingual descriptions and adds view/like counts
 */

const fs = require('fs');
const path = require('path');

// Paths
const workJsonPath = path.join(__dirname, '..', 'work.json');
const frontendWorksJsonPath = path.join(__dirname, '..', 'frontend', 'public', 'service', 'works.json');

// Helper function to generate multilingual descriptions
function generateDescriptions(video, language) {
  const baseDescription = video.description || '';
  const viewText = formatViewCount(video.viewCount);
  const likeText = formatLikeCount(video.likeCount);
  
  // Extract first line of description for context, limit to 80 chars
  let contextText = baseDescription.split('\n')[0].substring(0, 80);
  if (baseDescription.length > 80) {
    contextText += '...';
  }
  
  // Remove hashtags and clean up
  contextText = contextText.replace(/#\w+/g, '').trim();
  
  switch (language) {
    case 'zh':
      return `${contextText ? contextText + '，' : ''}${viewText}次觀看，${likeText}個讚...`;
    case 'en':
      return `${contextText ? contextText + ', ' : ''}${viewText} views, ${likeText} likes...`;
    case 'jp':
      return `${contextText ? contextText + '、' : ''}${viewText}回視聴、${likeText}いいね...`;
    default:
      return `${contextText ? contextText + '，' : ''}${viewText}次觀看，${likeText}個讚...`;
  }
}

// Format view count with appropriate units
function formatViewCount(count) {
  if (count >= 10000) {
    return (count / 10000).toFixed(1).replace(/\.0$/, '') + '萬';
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return count.toString();
}

// Format like count 
function formatLikeCount(count) {
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return count.toString();
}

// Calculate relative time
function getRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  
  if (diffDays < 1) {
    return { zh: '今天', en: 'Today', jp: '今日' };
  } else if (diffDays < 2) {
    return { zh: '1天前', en: '1 day ago', jp: '1日前' };
  } else if (diffDays < 30) {
    return { zh: `${diffDays}天前`, en: `${diffDays} days ago`, jp: `${diffDays}日前` };
  } else if (diffMonths < 12) {
    return { zh: `${diffMonths}個月前`, en: `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`, jp: `${diffMonths}ヶ月前` };
  } else {
    const diffYears = Math.floor(diffMonths / 12);
    return { zh: `${diffYears}年前`, en: `${diffYears} year${diffYears > 1 ? 's' : ''} ago`, jp: `${diffYears}年前` };
  }
}

// Convert ISO duration to readable format
function formatDuration(isoDuration) {
  if (!isoDuration) return '0:00';
  
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';
  
  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

async function syncWorks() {
  try {
    // Read work.json
    console.log('reading work.json...');
    const workData = JSON.parse(fs.readFileSync(workJsonPath, 'utf8'));
    
    // Convert to frontend format
    console.log('converting to frontend format...');
    const frontendWorks = workData.videos.map(video => {
      const relativeTime = getRelativeTime(video.date);
      const duration = formatDuration(video.duration);
      
      return {
        title: video.title,
        titleEn: video.title, // Keep original title for EN
        titleJp: video.title, // Keep original title for JP
        excerpt: generateDescriptions(video, 'zh'),
        excerptEn: generateDescriptions(video, 'en'),
        excerptJp: generateDescriptions(video, 'jp'),
        date: relativeTime.zh,
        dateEn: relativeTime.en,
        dateJp: relativeTime.jp,
        duration: duration,
        image: video.thumbnail,
        videoUrl: video.url,
        // Add the new data fields
        viewCount: video.viewCount,
        likeCount: video.likeCount || 0,
        commentCount: video.commentCount || 0
      };
    });
    
    // Write to frontend works.json
    console.log('writing to frontend works.json...');
    fs.writeFileSync(frontendWorksJsonPath, JSON.stringify(frontendWorks, null, 2));
    
    console.log(`successfully synchronized ${frontendWorks.length} videos to works.json`);
    console.log('last updated:', workData.lastUpdated);
    
  } catch (error) {
    console.error('error synchronizing works:', error);
    process.exit(1);
  }
}

// Run the sync
syncWorks();
