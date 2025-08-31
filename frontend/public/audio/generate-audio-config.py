#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Auto Audio Config Generator with Normalization
Scans audio folders, normalizes files, and generates audio-config.json
"""

import os
import json
import subprocess
import re
import shutil
from pathlib import Path
from typing import Dict, List, Tuple, Optional
import mutagen
from mutagen.mp3 import MP3
from mutagen.wave import WAVE
from mutagen.flac import FLAC
from mutagen.oggvorbis import OggVorbis

class AudioConfigGenerator:
    def __init__(self, audio_dir: str = None):
        self.audio_dir = Path(audio_dir) if audio_dir else Path(__file__).parent
        self.config_file = self.audio_dir / "audio-config.json"
        self.backup_config = self.audio_dir / "audio-config.json.backup"
        self.normalizer_path = Path(r"C:\Users\azusaing\Desktop\Code\audio_normalizer\build\Release\audio_normalizer.exe")
        
        # Genre mapping: folder name -> (id, display_name)
        self.genre_mapping = {
            "idol": ("idol", "IDOL"),
            "pop": ("jpop", "J-POP"),
            "rock": ("jrock", "J-ROCK"),
            "orchestra": ("orchestra", "ORCHESTRA"),
            "edm": ("edm", "EDM"),
            "game music - bgm": ("bgm", "BGM"),
        }
        
        # Supported audio formats
        self.audio_extensions = {'.mp3', '.wav', '.flac', '.ogg', '.m4a', '.aiff', '.au'}
        
    def get_audio_duration(self, file_path: Path) -> str:
        """Get audio duration using mutagen library"""
        try:
            audio = mutagen.File(file_path)
            if audio is not None and hasattr(audio, 'info') and hasattr(audio.info, 'length'):
                seconds = int(audio.info.length)
                minutes = seconds // 60
                seconds = seconds % 60
                return f"{minutes}:{seconds:02d}"
        except Exception as e:
            print(f"    Warning: Could not get duration for {file_path.name}: {e}")
        
        return "3:30"  # Default fallback
    
    def clean_display_name(self, filename: str) -> str:
        """Clean filename to create a nice display name"""
        name = filename
        
        # Remove common prefixes and suffixes
        patterns_to_remove = [
            r'【[^】]*】',  # Remove anything in 【】
            r'\([^)]*\)',   # Remove anything in ()
            r'（[^）]*）',   # Remove anything in （）
            r'_Full_\d+_Mastered',
            r'_Kuri_Full_\d+',
            r'_demo\d*',
            r'_Demo_\d+',
            r'_piano_\d+',
            r'_\d+$',       # Remove trailing numbers
            r'\(\d+\)$',    # Remove trailing (2), (3) etc
            r'-\d+LUFS',    # Remove LUFS indicators
        ]
        
        for pattern in patterns_to_remove:
            name = re.sub(pattern, '', name, flags=re.IGNORECASE)
        
        # Clean up extra spaces and underscores
        name = re.sub(r'[_\-]+', ' ', name)
        name = re.sub(r'\s+', ' ', name)
        name = name.strip()
        
        return name if name else filename
    
    def extract_artist(self, filename: str, genre_id: str) -> str:
        """Extract artist name from filename or use default based on genre"""
        filename_lower = filename.lower()
        
        if 'shintou' in filename_lower:
            return 'Shintou'
        elif 'koyaka' in filename_lower:
            return 'Koyaka'
        elif 'sn0w' in filename_lower:
            return 'sn0w'
        elif genre_id == 'orchestra':
            return 'Sakuma遙'
        else:
            return 'Dulcets'
    
    def normalize_audio(self, input_path: Path, output_path: Path) -> bool:
        """Normalize audio file to -14 LUFS"""
        if not self.normalizer_path.exists():
            print(f"    Warning: Normalizer not found at {self.normalizer_path}")
            return False
        
        try:
            cmd = [
                str(self.normalizer_path),
                "-l", "-14",
                str(input_path),
                str(output_path)
            ]
            
            result = subprocess.run(cmd, capture_output=True, text=True)
            return result.returncode == 0
        
        except Exception as e:
            print(f"    Error normalizing {input_path.name}: {e}")
            return False
    
    def process_audio_files(self, genre_folder: Path, genre_id: str) -> List[Dict]:
        """Process all audio files in a genre folder"""
        tracks = []
        track_count = 0
        
        # Get all audio files in the folder
        audio_files = []
        for ext in self.audio_extensions:
            audio_files.extend(genre_folder.glob(f"*{ext}"))
        
        # Sort files for consistent ordering
        audio_files.sort(key=lambda x: x.name.lower())
        
        for audio_file in audio_files:
            # Skip already normalized files
            if audio_file.name.startswith('normalized_'):
                continue
            
            track_count += 1
            print(f"    Processing: {audio_file.name}")
            
            # Determine final file path
            relative_path = f"{genre_folder.name}/{audio_file.name}"
            
            # Try to normalize the file
            if self.normalizer_path.exists():
                normalized_file = genre_folder / f"normalized_{audio_file.stem}.mp3"
                
                if not normalized_file.exists():
                    print(f"      → Normalizing to -14 LUFS...")
                    if self.normalize_audio(audio_file, normalized_file):
                        relative_path = f"{genre_folder.name}/{normalized_file.name}"
                        print(f"      ✓ Normalized successfully")
                        # Get duration from normalized file
                        duration = self.get_audio_duration(normalized_file)
                    else:
                        print(f"      ✗ Normalization failed, using original")
                        duration = self.get_audio_duration(audio_file)
                else:
                    relative_path = f"{genre_folder.name}/{normalized_file.name}"
                    duration = self.get_audio_duration(normalized_file)
                    print(f"      → Using existing normalized file")
            else:
                duration = self.get_audio_duration(audio_file)
                print(f"      → Using original file (no normalizer)")
            
            # Generate track metadata
            display_name = self.clean_display_name(audio_file.stem)
            artist = self.extract_artist(audio_file.name, genre_id)
            
            track = {
                "id": f"{genre_id}-{track_count}",
                "fileName": relative_path,
                "displayName": display_name,
                "artist": artist,
                "duration": duration
            }
            
            # Add hit flag for certain tracks (you can customize this logic)
            if any(word in display_name.lower() for word in ['hit', '人気', 'popular', 'best']):
                track["isHit"] = True
            
            tracks.append(track)
            print(f"      ✓ Added: {display_name} by {artist} ({duration})")
        
        return tracks
    
    def generate_config(self) -> Dict:
        """Generate the complete audio configuration"""
        print("=" * 50)
        print("  Auto Audio Config Generator with Normalization")
        print("=" * 50)
        print()
        
        print(f"Target directory: {self.audio_dir}")
        print(f"Config file: {self.config_file}")
        
        # Check normalizer
        if self.normalizer_path.exists():
            print("✓ Audio normalizer found")
        else:
            print("⚠ Audio normalizer not found - skipping normalization")
        
        print()
        
        # Backup existing config
        if self.config_file.exists():
            shutil.copy2(self.config_file, self.backup_config)
            print("✓ Backed up existing config")
        
        config = {}
        
        # Process each genre folder
        for folder in self.audio_dir.iterdir():
            if not folder.is_dir():
                continue
            
            folder_name = folder.name.lower()
            if folder_name not in self.genre_mapping:
                continue
            
            genre_id, genre_name = self.genre_mapping[folder_name]
            print(f"\nProcessing genre: {genre_name} ({folder.name})")
            
            # Process audio files
            tracks = self.process_audio_files(folder, genre_id)
            
            if tracks:
                config[genre_id] = {
                    "id": genre_id,
                    "genreName": genre_name,
                    "albumCover": f"/images/music/{genre_id}-cover.svg",
                    "tracks": tracks
                }
                print(f"  → Added {len(tracks)} tracks")
            else:
                print(f"  → No audio files found")
        
        return config
    
    def save_config(self, config: Dict):
        """Save the configuration to JSON file"""
        try:
            with open(self.config_file, 'w', encoding='utf-8') as f:
                json.dump(config, f, ensure_ascii=False, indent=2)
            
            print(f"\n✓ Configuration saved to {self.config_file}")
            
            # Validate JSON
            try:
                with open(self.config_file, 'r', encoding='utf-8') as f:
                    json.load(f)
                print("✓ JSON validation passed")
            except json.JSONDecodeError as e:
                print(f"✗ JSON validation failed: {e}")
                
        except Exception as e:
            print(f"✗ Error saving config: {e}")
    
    def run(self):
        """Main execution function"""
        try:
            config = self.generate_config()
            
            if config:
                self.save_config(config)
                
                print("\n" + "=" * 50)
                print("AUDIO CONFIG GENERATION COMPLETE")
                print("=" * 50)
                print(f"✓ Generated config with {len(config)} genres")
                total_tracks = sum(len(genre['tracks']) for genre in config.values())
                print(f"✓ Total tracks: {total_tracks}")
                print(f"✓ Config file: {self.config_file}")
                print(f"✓ Backup: {self.backup_config}")
                
                print("\nNext steps:")
                print("1. Review the generated audio-config.json")
                print("2. Test the music player functionality")
                print("3. Adjust display names and artists as needed")
                print("4. Add album covers to /images/music/ folder")
                
            else:
                print("\n✗ No audio files found or processed")
                
        except Exception as e:
            print(f"\n✗ Error during execution: {e}")
            raise

def main():
    """Entry point"""
    generator = AudioConfigGenerator()
    generator.run()

if __name__ == "__main__":
    main()
