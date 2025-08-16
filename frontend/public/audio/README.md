# Audio Files

This directory contains audio files and their configuration for the AboutSection component.

## Configuration File

`audio-config.json` - Contains metadata for all audio files including:
- File names and paths
- Display names (shown in the UI)
- Artist names (displayed as description)
- Duration information
- Genre classifications

## Required Audio Files

Based on the current configuration, please add these MP3 files:

- `yumehanabi_demo_03.mp3` - 夢花火 (Shinto)
- `jpop-melody.mp3` - 甜美旋律 (Dulcets Studio)
- `idol-energy.mp3` - 闪耀之星 (Dulcets Studio)
- `orchestra-epic.mp3` - 史诗交响 (Dulcets Orchestra)
- `edm-future.mp3` - 未来节拍 (Dulcets Electronic)

## File Requirements

- **Format**: MP3
- **Duration**: 30-90 seconds for preview
- **Quality**: 128kbps or higher
- **Size**: Keep under 5MB each for better loading performance
- **Naming**: Must match the `fileName` field in `audio-config.json`

## How to Add New Audio Files

1. Add your MP3 file to this directory
2. Update `audio-config.json` with the new file information:
   ```json
   "newgenre": {
     "id": "newgenre",
     "fileName": "your-audio-file.mp3",
     "displayName": "显示名称",
     "artist": "艺术家名称",
     "duration": "时长",
     "genre": "音乐类型"
   }
   ```
3. Update the genre list in `AboutSection.tsx` if needed

## Current Status

⚠️ **Audio files are not yet added** - The AudioPlayer will show loading/error states until actual MP3 files are placed in this directory with the correct filenames.
