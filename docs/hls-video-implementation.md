# HLS Video Streaming Implementation

This document describes the implementation of HTTP Live Streaming (HLS) for video content in the Dulcets frontend project.

## Overview

The project uses HLS technology to provide adaptive video streaming with better performance and compatibility across different browsers and devices.

## Components

### 1. Video Conversion

Videos are converted to HLS format using FFmpeg with optimized parameters:

```bash
ffmpeg -i input.mp4 \
  -c:v libx264 \
  -crf 23 \
  -preset medium \
  -c:a aac \
  -b:a 128k \
  -hls_time 6 \
  -hls_list_size 0 \
  -f hls \
  output.m3u8
```

**Parameters:**
- `libx264`: H.264 video codec for maximum compatibility
- `crf 23`: Constant Rate Factor for good quality/size balance
- `preset medium`: Encoding speed/compression balance
- `aac`: Audio codec
- `hls_time 6`: 6-second segments for stable playback
- `hls_list_size 0`: Keep all segments in playlist

### 2. File Structure

```
public/
└── hls/
    ├── hero-background.m3u8    # Playlist file
    ├── hero-background0.ts     # Video segments
    ├── hero-background1.ts
    └── ...
```

### 3. React Components

#### VideoBackground Component
- **Location:** `src/components/VideoBackground.tsx`
- **Purpose:** Provides HLS video background for hero section
- **Features:**
  - Auto-play, muted, looped playback
  - HLS.js integration with fallback to native Safari support
  - Error recovery mechanisms

#### VideoPlayer Component
- **Location:** `src/components/VideoPlayer.tsx`
- **Purpose:** Interactive video player with controls
- **Features:**
  - Play/pause controls
  - Seek functionality
  - Fullscreen support
  - Custom progress bar
  - Loading and error states

### 4. HLS.js Configuration

Optimized configuration for stable playback:

```javascript
const hls = new Hls({
  enableWorker: true,
  lowLatencyMode: false,
  debug: false,
  maxLoadingDelay: 4,
  maxBufferLength: 30,
  maxBufferSize: 60 * 1000 * 1000,
  maxBufferHole: 0.5,
  highBufferWatchdogPeriod: 2,
  nudgeOffset: 0.1,
  nudgeMaxRetry: 3,
  maxFragLookUpTolerance: 0.25,
  manifestLoadingTimeOut: 10000,
  fragLoadingTimeOut: 20000,
  fragLoadingMaxRetry: 3,
  startFragPrefetch: true,
  testBandwidth: false,
});
```

### 5. Build Configuration

#### Next.js Configuration
- **File:** `next.config.ts`
- Webpack rules to ignore `.ts` segment files from TypeScript compilation

#### TypeScript Configuration  
- **File:** `tsconfig.json`
- Excludes HLS segment files: `"exclude": ["node_modules", "public/hls/**/*.ts", "out/**/*.ts"]`

## Browser Support

- **Modern browsers:** Uses HLS.js library
- **Safari:** Uses native HLS support
- **Fallback:** Error message for unsupported browsers

## Error Handling

The implementation includes automatic recovery for:
- Network errors (automatic retry)
- Media errors (codec recovery)
- Fragment loading failures
- Manifest parsing errors

## Performance Benefits

1. **Adaptive Streaming:** Automatically adjusts quality based on network conditions
2. **Progressive Loading:** Only loads segments as needed
3. **Browser Optimization:** Uses native support when available
4. **Efficient Buffering:** Optimized buffer management prevents stalls

## Usage

### Background Video
The hero section automatically loads and plays the HLS video background.

### Interactive Player
Located in the "Our Works" section, allows users to:
- Control playback
- Seek through video
- Enter fullscreen mode
- View progress and duration

## Troubleshooting

### Common Issues
1. **Segment 404 errors:** Ensure file naming matches m3u8 playlist
2. **Playback stalls:** Check HLS configuration parameters
3. **Browser compatibility:** Verify HLS.js is loaded correctly

### Debug Mode
Enable debug mode in HLS configuration for detailed logging:
```javascript
const hls = new Hls({ debug: true });
```

## Future Enhancements

- Multiple quality levels (adaptive bitrate)
- Subtitle support
- Analytics integration
- CDN optimization
