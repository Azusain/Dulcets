"use client";
import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import AudioManager from "../utils/audioManager";
import { useAssetPath } from "@/hooks/useAssetPath";

interface Track {
  id: string;
  fileName: string;
  displayName: string;
  artist: string;
  duration: string;
}

interface Genre {
  id: string;
  genreName: string;
  albumCover: string;
  tracks: Track[];
}

interface AlbumPlayerProps {
  className?: string;
  t?: (key: string) => string;
}

const AlbumPlayer: React.FC<AlbumPlayerProps> = ({ className = "", t }) => {
  const [genres, setGenres] = useState<Record<string, Genre>>({});
  const [selectedGenre, setSelectedGenre] = useState<string>("idol");
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const audioManager = AudioManager.getInstance();
  const { getAssetPath } = useAssetPath();

  const GENRE_OPTIONS = [
    { id: "idol", name: "IDOL" },
    { id: "jrock", name: "J-ROCK" },
    { id: "jpop", name: "J-POP" },
    { id: "orchestra", name: "ORCHESTRA" },
    { id: "edm", name: "EDM" },
    { id: "bgm", name: "BGM" },
  ];

  // Load audio configuration
  useEffect(() => {
    const loadAudioConfig = async () => {
      try {
        const configUrl = getAssetPath("/audio/audio-config.json");
        const response = await fetch(configUrl);
        
        if (response.ok) {
          const config = await response.json();
          setGenres(config);
          
          // Set first track of selected genre as current
          const selectedGenreData = config[selectedGenre];
          if (selectedGenreData && selectedGenreData.tracks.length > 0) {
            setCurrentTrack(selectedGenreData.tracks[0]);
          }
        }
      } catch (error) {
        console.error("Failed to load audio config:", error);
      }
    };

    loadAudioConfig();
  }, [getAssetPath, selectedGenre]);

  // Initialize WaveSurfer when current track changes
  useEffect(() => {
    if (!currentTrack || !waveformRef.current) return;

    const initWaveSurfer = () => {
      // Destroy previous instance
      if (wavesurfer.current) {
        try {
          wavesurfer.current.destroy();
        } catch (e) {}
        wavesurfer.current = null;
      }

      // Create new instance
      const ws = WaveSurfer.create({
        container: waveformRef.current!,
        waveColor: "#94a3b8",
        progressColor: "#5865f2",
        cursorColor: "#5865f2",
        barWidth: 2,
        barRadius: 1,
        height: 60,
        normalize: true,
        backend: "WebAudio",
      });

      wavesurfer.current = ws;

      // Event listeners
      ws.on("ready", () => {
        setIsLoading(false);
        setDuration(ws.getDuration());
      });

      ws.on("play", () => {
        setIsPlaying(true);
        audioManager.setCurrentPlayer(ws, getAssetPath(`/audio/${currentTrack.fileName}`));
      });

      ws.on("pause", () => {
        setIsPlaying(false);
      });

      ws.on("audioprocess", () => {
        setCurrentTime(ws.getCurrentTime());
      });

      ws.on("finish", () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });

      // Load audio
      const audioUrl = getAssetPath(`/audio/${currentTrack.fileName}`);
      setIsLoading(true);
      ws.load(audioUrl);
    };

    initWaveSurfer();

    return () => {
      if (wavesurfer.current) {
        try {
          wavesurfer.current.destroy();
        } catch (e) {}
      }
    };
  }, [currentTrack, getAssetPath]);

  // Handle genre change
  const handleGenreChange = (genreId: string) => {
    setSelectedGenre(genreId);
    const genreData = genres[genreId];
    if (genreData && genreData.tracks.length > 0) {
      setCurrentTrack(genreData.tracks[0]);
    }
  };

  // Handle track selection
  const handleTrackSelect = (track: Track) => {
    if (isPlaying && wavesurfer.current) {
      wavesurfer.current.pause();
    }
    setCurrentTrack(track);
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (!wavesurfer.current) return;

    if (isPlaying) {
      wavesurfer.current.pause();
    } else {
      audioManager.stopCurrentPlayer();
      wavesurfer.current.play();
    }
  };

  // Format time
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Get current genre data
  const currentGenre = genres[selectedGenre];
  
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {/* Genre Selection Tabs */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
        <div className="flex flex-wrap gap-2">
          {GENRE_OPTIONS.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreChange(genre.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedGenre === genre.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-6 p-6">
        {/* Left: Album Cover */}
        <div className="md:col-span-2">
          <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-4">
            {currentGenre?.albumCover ? (
              <img
                src={getAssetPath(currentGenre.albumCover)}
                alt={currentGenre.genreName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to gradient background if image fails to load
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                <div className="text-white text-4xl font-bold">
                  {currentGenre?.genreName || "MUSIC"}
                </div>
              </div>
            )}
          </div>
          
          {/* Album Info */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {currentGenre?.genreName || "ALTERNΔTE"}
            </h3>
            <p className="text-gray-600 mb-4">Naked Identity Created by King</p>
            <p className="text-sm text-gray-500">
              {new Date().getFullYear()}.{String(new Date().getMonth() + 1).padStart(2, '0')}.{String(new Date().getDate()).padStart(2, '0')} • いいね3
            </p>
          </div>
        </div>

        {/* Right: Track List */}
        <div className="md:col-span-3">
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {currentGenre?.tracks.map((track, index) => (
              <div
                key={track.id}
                onClick={() => handleTrackSelect(track)}
                className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                  currentTrack?.id === track.id ? "bg-blue-50 border border-blue-200" : ""
                }`}
              >
                {/* Track Number / Play Button */}
                <div className="w-8 flex items-center justify-center">
                  {currentTrack?.id === track.id && isPlaying ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlayPause();
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ⏸
                    </button>
                  ) : currentTrack?.id === track.id ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlayPause();
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ▶
                    </button>
                  ) : (
                    <span className="text-gray-400 text-sm">{index + 1}</span>
                  )}
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium truncate ${
                    currentTrack?.id === track.id ? "text-blue-600" : "text-gray-900"
                  }`}>
                    {track.displayName}
                  </h4>
                  <p className="text-sm text-gray-600 truncate">
                    {track.artist}
                  </p>
                </div>

                {/* Duration */}
                <div className="text-sm text-gray-500">
                  {track.duration}
                </div>
              </div>
            ))}
          </div>

          {/* Current Track Waveform */}
          {currentTrack && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="mb-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {currentTrack.displayName}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
              </div>
              
              {/* Waveform */}
              <div 
                ref={waveformRef}
                className="w-full mb-3"
                style={{ height: "60px" }}
              />
              
              {isLoading && (
                <div className="text-center text-sm text-gray-500">
                  {t ? t("loading") : "Loading..."}
                </div>
              )}
              
              {/* Controls */}
              <div className="flex justify-center">
                <button
                  onClick={togglePlayPause}
                  disabled={isLoading}
                  className="w-12 h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlbumPlayer;
