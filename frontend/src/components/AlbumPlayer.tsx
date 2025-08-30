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
  isHit?: boolean;
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
        console.log("Loading config from:", configUrl);
        const response = await fetch(configUrl);
        
        if (response.ok) {
          const config = await response.json();
          console.log("Config loaded:", config);
          setGenres(config);
          
          // Set first track of selected genre as current only if we don't have a current track
          if (!currentTrack) {
            const selectedGenreData = config[selectedGenre];
            if (selectedGenreData && selectedGenreData.tracks.length > 0) {
              setCurrentTrack(selectedGenreData.tracks[0]);
            }
          }
        } else {
          console.error("Failed to load config, status:", response.status);
        }
      } catch (error) {
        console.error("Failed to load audio config:", error);
      }
    };

    // Only load config once on mount
    if (Object.keys(genres).length === 0) {
      loadAudioConfig();
    }
  }, [getAssetPath]); // Remove selectedGenre dependency to prevent infinite loop

  // Initialize WaveSurfer when current track changes
  useEffect(() => {
    if (!currentTrack || !waveformRef.current) return;

    let isComponentMounted = true;
    let wavesurferInstance: WaveSurfer | null = null;

    const initWaveSurfer = async () => {
      try {
        // Destroy previous instance
        if (wavesurfer.current) {
          try {
            if (typeof wavesurfer.current.pause === 'function') {
              wavesurfer.current.pause();
            }
            wavesurfer.current.destroy();
          } catch (e) {
            console.warn('Error destroying previous wavesurfer:', e);
          }
          wavesurfer.current = null;
        }

        if (!isComponentMounted || !waveformRef.current) return;

        // Create new instance
        wavesurferInstance = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: "#94a3b8",
          progressColor: "#5865f2",
          cursorColor: "#5865f2",
          barWidth: 2,
          barRadius: 1,
          height: 60,
          normalize: true,
          backend: "WebAudio",
          mediaControls: false,
        } as any);

        if (!isComponentMounted) {
          wavesurferInstance.destroy();
          return;
        }

        wavesurfer.current = wavesurferInstance;

        // Event listeners
        const handleReady = () => {
          if (!isComponentMounted) return;
          console.log('WaveSurfer ready');
          setIsLoading(false);
          setDuration(wavesurferInstance?.getDuration() || 0);
        };

        const handlePlay = () => {
          if (!isComponentMounted) return;
          setIsPlaying(true);
          // Use currentTrack.fileName directly to avoid dependency issues
          const audioUrl = getAssetPath(`/audio/${currentTrack.fileName}`);
          audioManager.setCurrentPlayer(wavesurferInstance, audioUrl);
        };

        const handlePause = () => {
          if (!isComponentMounted) return;
          setIsPlaying(false);
        };

        const handleAudioProcess = () => {
          if (!isComponentMounted) return;
          setCurrentTime(wavesurferInstance?.getCurrentTime() || 0);
        };

        const handleSeek = () => {
          if (!isComponentMounted) return;
          setCurrentTime(wavesurferInstance?.getCurrentTime() || 0);
        };

        const handleFinish = () => {
          if (!isComponentMounted) return;
          setIsPlaying(false);
          setCurrentTime(0);
        };

        const handleError = (error: any) => {
          if (!isComponentMounted) return;
          console.error('WaveSurfer error:', error);
          setIsLoading(false);
        };

        wavesurferInstance.on("ready", handleReady);
        wavesurferInstance.on("play", handlePlay);
        wavesurferInstance.on("pause", handlePause);
        wavesurferInstance.on("audioprocess", handleAudioProcess);
        wavesurferInstance.on("seek" as any, handleSeek);
        wavesurferInstance.on("finish", handleFinish);
        wavesurferInstance.on("error", handleError);

        // Load audio
        const audioUrl = getAssetPath(`/audio/${currentTrack.fileName}`);
        console.log('Loading audio:', audioUrl);
        setIsLoading(true);
        
        if (isComponentMounted) {
          wavesurferInstance.load(audioUrl);
        }
      } catch (error) {
        console.error('Error initializing WaveSurfer:', error);
        if (isComponentMounted) {
          setIsLoading(false);
        }
      }
    };

    initWaveSurfer();

    return () => {
      isComponentMounted = false;
      
      if (wavesurferInstance) {
        try {
          if (typeof wavesurferInstance.pause === 'function') {
            wavesurferInstance.pause();
          }
          
          if (audioManager.isCurrentPlayer(wavesurferInstance)) {
            audioManager.stopCurrentPlayer();
          }
          
          setTimeout(() => {
            try {
              if (wavesurferInstance && typeof wavesurferInstance.destroy === 'function') {
                wavesurferInstance.destroy();
              }
            } catch (e) {
              console.warn('Error during cleanup:', e);
            }
          }, 100);
        } catch (error) {
          console.warn('Error during cleanup:', error);
        }
      }
      
      wavesurfer.current = null;
    };
  }, [currentTrack?.id]); // Depend on track ID to ensure switching works

  // Listen to other player status
  useEffect(() => {
    if (!isPlaying) return;

    const checkInterval = setInterval(() => {
      try {
        const currentWavesurfer = wavesurfer.current;
        if (currentWavesurfer && !audioManager.isCurrentPlayer(currentWavesurfer)) {
          setIsPlaying(false);
        }
      } catch (error) {
        // Handle errors silently
      }
    }, 500);

    return () => {
      clearInterval(checkInterval);
    };
  }, [isPlaying]); // Remove audioManager dependency as it's a singleton

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
    // Stop current audio and reset states
    if (wavesurfer.current) {
      try {
        wavesurfer.current.pause();
        audioManager.stopCurrentPlayer();
      } catch (error) {
        console.warn('Error stopping current track:', error);
      }
    }
    setIsPlaying(false);
    setCurrentTime(0);
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
    <div className={className}>
      {/* Genre Selection Tabs */}
      <div className="relative border-b border-gray-200 mb-8">
        <div className="flex gap-8">
          {GENRE_OPTIONS.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreChange(genre.id)}
              className={`pb-3 text-sm font-medium transition-colors relative z-10 ${
                selectedGenre === genre.id
                  ? "text-black"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
        {/* Sliding underline */}
        <div 
          className="absolute bottom-0 h-0.5 bg-black transition-all duration-300 ease-out"
          style={(() => {
            const currentGenre = GENRE_OPTIONS.find(g => g.id === selectedGenre);
            const currentIndex = GENRE_OPTIONS.findIndex(g => g.id === selectedGenre);
            
            return {
              width: `${(currentGenre?.name.length || 0) * 8 + 16}px`,
              transform: `translateX(${GENRE_OPTIONS.slice(0, currentIndex).reduce((acc, genre) => acc + genre.name.length * 8 + 32 + 16, 0)}px)`,
              left: '0px'
            };
          })()}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Left: Album Cover */}
        <div className="md:col-span-1">
          <div className="aspect-square bg-gray-100 mb-6">
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
          <div>
            <h3 className="text-2xl font-bold text-black mb-2">
              {currentGenre?.genreName || "ALTERNΔTE"}
            </h3>
            <p className="text-gray-600 mb-4">Naked Identity Created by King</p>
            <p className="text-sm text-gray-500">
              {new Date().getFullYear()}.{String(new Date().getMonth() + 1).padStart(2, '0')}.{String(new Date().getDate()).padStart(2, '0')} • いいね3
            </p>
          </div>
        </div>

        {/* Right: Track List */}
        <div className="md:col-span-2">
          <div className="space-y-1">
            {currentGenre?.tracks.map((track, index) => (
              <div
                key={track.id}
                onClick={() => handleTrackSelect(track)}
                className={`flex items-center gap-4 py-3 px-2 cursor-pointer transition-colors ${
                  currentTrack?.id === track.id 
                    ? "bg-gray-100" 
                    : "hover:bg-gray-50"
                }`}
              >
                {/* Track Number / Play Button */}
                <div className="w-8 flex items-center justify-center text-sm">
                  {currentTrack?.id === track.id && isPlaying ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlayPause();
                      }}
                      className="text-black hover:text-gray-600 transition-colors p-1"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                        <rect x="2" y="1" width="2" height="10" />
                        <rect x="8" y="1" width="2" height="10" />
                      </svg>
                    </button>
                  ) : currentTrack?.id === track.id ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlayPause();
                      }}
                      className="text-black hover:text-gray-600 transition-colors p-1"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M2 1v10l8-5z" />
                      </svg>
                    </button>
                  ) : (
                    <span className="text-gray-400 font-medium">{index + 1}</span>
                  )}
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate text-black">
                    {track.displayName}
                    {track.isHit && <span className="ml-2 px-2 py-1 bg-gray-200 text-xs rounded font-medium">HIT</span>}
                  </h4>
                </div>

                {/* Artist */}
                <div className="text-gray-500 text-sm min-w-0 flex-shrink-0">
                  Naked Identity Created by King
                </div>

                {/* Duration */}
                <div className="text-gray-400 text-sm font-mono w-12 text-right">
                  {track.duration}
                </div>
              </div>
            ))}
          </div>

          {/* Current Track Player */}
          {currentTrack && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="mb-4">
                <div className="text-lg font-medium text-black mb-1">
                  {currentTrack.displayName}
                </div>
                <div className="text-sm text-gray-500 mb-3">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
              
              {/* Waveform */}
              <div 
                ref={waveformRef}
                className="w-full mb-4 bg-gray-50"
                style={{ height: "60px" }}
              />
              
              {isLoading && (
                <div className="text-center text-sm text-gray-500 py-4">
                  {t ? t("loading") : "読み込み中"}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlbumPlayer;
