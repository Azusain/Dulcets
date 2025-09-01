"use client";
import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import AudioManager from "../utils/audioManager";
import { useAssetPath } from "@/hooks/useAssetPath";

// Add CSS animations for waveform bars
const waveformStyles = `
  @keyframes waveform1 {
    0% { height: 20%; }
    100% { height: 80%; }
  }
  @keyframes waveform2 {
    0% { height: 40%; }
    100% { height: 100%; }
  }
  @keyframes waveform3 {
    0% { height: 60%; }
    100% { height: 90%; }
  }
  @keyframes waveform4 {
    0% { height: 15%; }
    100% { height: 60%; }
  }
`;

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
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);

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
  }, [getAssetPath]);

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
            if (typeof wavesurfer.current.pause === "function") {
              wavesurfer.current.pause();
            }
            wavesurfer.current.destroy();
          } catch (e) {
            console.warn("Error destroying previous wavesurfer:", e);
          }
          wavesurfer.current = null;
        }

        if (!isComponentMounted || !waveformRef.current) return;

        // Create new instance
        wavesurferInstance = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: "#94a3b8",
          progressColor: "#000000",
          cursorColor: "#000000",
          barWidth: 2,
          barRadius: 1,
          height: 44,
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
          console.log("WaveSurfer ready");
          setIsLoading(false);
          setDuration(wavesurferInstance?.getDuration() || 0);

          // Auto-play if flag is set
          if (shouldAutoPlay) {
            setShouldAutoPlay(false);
            audioManager.stopCurrentPlayer();
            wavesurferInstance?.play();
          }
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
          console.error("WaveSurfer error:", error);
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
        console.log("Loading audio:", audioUrl);
        setIsLoading(true);

        if (isComponentMounted) {
          wavesurferInstance.load(audioUrl);
        }
      } catch (error) {
        console.error("Error initializing WaveSurfer:", error);
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
          if (typeof wavesurferInstance.pause === "function") {
            wavesurferInstance.pause();
          }

          if (audioManager.isCurrentPlayer(wavesurferInstance)) {
            audioManager.stopCurrentPlayer();
          }

          setTimeout(() => {
            try {
              if (
                wavesurferInstance &&
                typeof wavesurferInstance.destroy === "function"
              ) {
                wavesurferInstance.destroy();
              }
            } catch (e) {
              console.warn("Error during cleanup:", e);
            }
          }, 100);
        } catch (error) {
          console.warn("Error during cleanup:", error);
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
        if (
          currentWavesurfer &&
          !audioManager.isCurrentPlayer(currentWavesurfer)
        ) {
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

  // Handle track selection and play
  const handleTrackSelect = (track: Track) => {
    if (currentTrack?.id === track.id) {
      // If clicking the same track, toggle play/pause
      togglePlayPause();
    } else {
      // If clicking a different track, switch and play
      // Stop current audio and reset states
      if (wavesurfer.current) {
        try {
          wavesurfer.current.pause();
          audioManager.stopCurrentPlayer();
        } catch (error) {
          console.warn("Error stopping current track:", error);
        }
      }
      setIsPlaying(false);
      setCurrentTime(0);
      setShouldAutoPlay(true); // Set auto-play flag
      setCurrentTrack(track);
    }
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
      {/* Add dynamic styles for waveform animation */}
      <style dangerouslySetInnerHTML={{ __html: waveformStyles }} />

      {/* Waveform Visualization - Centered above tabs */}
      {currentTrack && (
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-full max-w-4xl">
            <div
              ref={waveformRef}
              className="w-full bg-gray-50 rounded-lg"
              style={{ height: "44px" }}
            />

            {/* Loading overlay - positioned absolutely to not affect layout */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-lg">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                {t ? t("loading") : "読み込み中"}
              </div>
            )}
          </div>
        </div>
      )}

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
              }  hover:cursor-pointer`}
            >
              {genre.name}
            </button>
          ))}
        </div>
        {/* Sliding underline */}
        <div
          className="absolute bottom-0 h-0.5 bg-black transition-all duration-300 ease-out"
          style={(() => {
            const currentGenre = GENRE_OPTIONS.find(
              (g) => g.id === selectedGenre
            );
            const currentIndex = GENRE_OPTIONS.findIndex(
              (g) => g.id === selectedGenre
            );

            // Precise calculation using specific measurements for each text
            const measurements: Record<
              string,
              { width: number; offset: number }
            > = {
              IDOL: { width: 35, offset: 0 },
              "J-ROCK": { width: 54, offset: 64 },
              "J-POP": { width: 46, offset: 147 },
              ORCHESTRA: { width: 74, offset: 225 },
              EDM: { width: 32, offset: 335 },
              BGM: { width: 32, offset: 400 },
            };

            const current = currentGenre?.name || "IDOL";
            const measurement = measurements[current] || {
              width: 40,
              offset: 0,
            };

            return {
              width: `${measurement.width}px`,
              transform: `translateX(${measurement.offset}px)`,
              left: "0px",
            };
          })()}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-12 items-start">
        {/* Left: Album Cover and Info */}
        <div className="md:col-span-1 flex flex-col">
          <div className="aspect-square bg-gray-100 mb-6">
            {currentGenre?.albumCover ? (
              <img
                src={getAssetPath(currentGenre.albumCover)}
                alt={currentGenre.genreName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to gradient background if image fails to load
                  (e.target as HTMLImageElement).style.display = "none";
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

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-8">
            {/* Previous Track */}
            <button
              onClick={() => {
                const currentGenreData = genres[selectedGenre];
                if (currentGenreData && currentTrack) {
                  const currentIndex = currentGenreData.tracks.findIndex(
                    (t) => t.id === currentTrack.id
                  );
                  const prevIndex =
                    currentIndex > 0
                      ? currentIndex - 1
                      : currentGenreData.tracks.length - 1;
                  handleTrackSelect(currentGenreData.tracks[prevIndex]);
                }
              }}
              className="cursor-pointer hover:opacity-60 transition-opacity"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="black">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePlayPause}
              className="cursor-pointer hover:opacity-60 transition-opacity"
            >
              {isPlaying ? (
                <svg width="44" height="44" viewBox="0 0 24 24" fill="black">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg width="44" height="44" viewBox="0 0 24 24" fill="black">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Next Track */}
            <button
              onClick={() => {
                const currentGenreData = genres[selectedGenre];
                if (currentGenreData && currentTrack) {
                  const currentIndex = currentGenreData.tracks.findIndex(
                    (t) => t.id === currentTrack.id
                  );
                  const nextIndex =
                    currentIndex < currentGenreData.tracks.length - 1
                      ? currentIndex + 1
                      : 0;
                  handleTrackSelect(currentGenreData.tracks[nextIndex]);
                }
              }}
              className="cursor-pointer hover:opacity-60 transition-opacity"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="black">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right: Track List - Fixed height to match album cover */}
        <div className="md:col-span-2 flex flex-col">
          {/* Track List - Fixed height to match album cover */}
          <div className="overflow-y-auto h-96">
            <div className="space-y-1 pr-2">
              {currentGenre?.tracks.map((track, index) => (
                <div
                  key={track.id}
                  onClick={() => handleTrackSelect(track)}
                  className={`flex items-center gap-4 py-3 px-2 cursor-pointer transition-colors ${
                    currentTrack?.id === track.id
                      ? "bg-gray-200"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {/* Track Number */}
                  <div className="w-8 flex items-center justify-center text-sm">
                    {currentTrack?.id === track.id && isPlaying ? (
                      <div className="text-black flex items-center justify-center">
                        {/* Animated waveform bars */}
                        <div className="flex items-end gap-0.5 h-3">
                          <div
                            className="w-0.5 bg-current animate-pulse"
                            style={{
                              animation:
                                "waveform1 0.4s ease-in-out infinite alternate",
                              height: "60%",
                            }}
                          ></div>
                          <div
                            className="w-0.5 bg-current animate-pulse"
                            style={{
                              animation:
                                "waveform2 0.45s ease-in-out infinite alternate",
                              height: "100%",
                            }}
                          ></div>
                          <div
                            className="w-0.5 bg-current animate-pulse"
                            style={{
                              animation:
                                "waveform3 0.35s ease-in-out infinite alternate",
                              height: "80%",
                            }}
                          ></div>
                          <div
                            className="w-0.5 bg-current animate-pulse"
                            style={{
                              animation:
                                "waveform4 0.55s ease-in-out infinite alternate",
                              height: "40%",
                            }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <span
                        className={`font-medium ${
                          currentTrack?.id === track.id
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      >
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate text-black">
                      {track.displayName}
                      {track.isHit && (
                        <span className="ml-2 px-2 py-1 bg-gray-200 text-xs rounded font-medium">
                          HIT
                        </span>
                      )}
                    </h4>
                  </div>

                  {/* Artist */}
                  <div className="text-gray-500 text-sm min-w-0 flex-shrink-0">
                    Dulcets
                  </div>

                  {/* Duration - show current time when playing this track */}
                  <div className="text-gray-400 text-sm font-mono w-24 text-right whitespace-nowrap">
                    {currentTrack?.id === track.id && isPlaying ? (
                      <span className="inline-flex items-center justify-end gap-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>/</span>
                        <span>{track.duration}</span>
                      </span>
                    ) : (
                      <span>{track.duration}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPlayer;
