import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import AudioManager from "../utils/audioManager";

interface AudioPlayerProps {
  title?: string;
  description?: string;
  audioUrl: string;
  className?: string;
  t?: (key: string) => string; // Add i18n translation function
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  title = "Audio Player",
  description = "Click play button to start",
  audioUrl,
  className = "",
  t, // Translation function passed in
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [waveformReady, setWaveformReady] = useState(false);
  const audioManager = AudioManager.getInstance();

  // Reset state when audioUrl changes
  useEffect(() => {
    setIsLoading(true);
    setIsPlaying(false);
    setDuration(0);
    setCurrentTime(0);
    setWaveformReady(false); // Hide waveform immediately, no fade-out animation needed
  }, [audioUrl]);

  useEffect(() => {
    let isComponentMounted = true;
    let wavesurferInstance: WaveSurfer | null = null;
    let abortController = new AbortController();

    const initializeWaveSurfer = () => {
      if (!waveformRef.current || !isComponentMounted) return;

      try {
        // Immediately destroy previous instance without waiting
        if (wavesurfer.current) {
          try {
            if (typeof wavesurfer.current.pause === 'function') {
              try {
                wavesurfer.current.pause();
              } catch (e) {}
            }
            wavesurfer.current.destroy(); // Remove delay, destroy immediately
          } catch (error) {
            // Handle silently
          }
          wavesurfer.current = null;
        }

        if (!isComponentMounted) return;

        // Create new instance
        wavesurferInstance = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: "#666666",
          progressColor: "#000000",
          cursorColor: "#000000",
          barWidth: 2,
          barRadius: 1,
          height: 60,
          normalize: true,
          backend: "WebAudio",
          mediaControls: false,
        } as any);

        if (!isComponentMounted) {
          try {
            wavesurferInstance.destroy();
          } catch (e) {}
          return;
        }

        wavesurfer.current = wavesurferInstance;

        // Event listeners
        const handleReady = () => {
          if (!isComponentMounted) return;
          setIsLoading(false); // Set loading complete immediately, make button clickable
          setDuration(wavesurferInstance?.getDuration() || 0);
          // Show waveform immediately after loading and trigger fade-in animation
          setTimeout(() => {
            if (isComponentMounted) {
              setWaveformReady(true);
            }
          }, 10); // Further reduce delay time
        };

        const handlePlay = () => {
          if (!isComponentMounted) return;
          setIsPlaying(true);
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
          console.warn('WaveSurfer error:', error);
          setIsLoading(false); // Make button clickable even if error occurs
        };

        wavesurferInstance.on("ready", handleReady);
        wavesurferInstance.on("play", handlePlay);
        wavesurferInstance.on("pause", handlePause);
        wavesurferInstance.on("audioprocess", handleAudioProcess);
        wavesurferInstance.on("seek" as any, handleSeek);
        wavesurferInstance.on("finish", handleFinish);
        wavesurferInstance.on("error", handleError);

        // Load audio file - using AbortController
        if (isComponentMounted) {
          try {
            wavesurferInstance.load(audioUrl);
          } catch (loadError) {
            if (!abortController.signal.aborted) {
              console.warn('Error loading audio:', loadError);
              setIsLoading(false);
            }
          }
        }
      } catch (error) {
        if (!abortController.signal.aborted && isComponentMounted) {
          console.warn("Error initializing WaveSurfer:", error);
          setIsLoading(false);
        }
      }
    };

    initializeWaveSurfer();

    return () => {
      isComponentMounted = false;
      abortController.abort(); // Abort all requests
      
      if (wavesurferInstance) {
        try {
          // Stop playback first
          if (typeof wavesurferInstance.pause === 'function') {
            try {
              wavesurferInstance.pause();
            } catch (e) {}
          }
          
          // Clean up manager state
          if (audioManager.isCurrentPlayer(wavesurferInstance)) {
            audioManager.stopCurrentPlayer();
          }
          
          // Delay destruction to give enough time for ongoing requests to complete
          setTimeout(() => {
            try {
              if (wavesurferInstance && typeof wavesurferInstance.destroy === 'function') {
                wavesurferInstance.destroy();
              }
            } catch (destroyError) {
              // Handle silently
            }
          }, 200); // Increase delay time
        } catch (error) {
          // Handle silently
        }
      }
      
      wavesurfer.current = null;
      setWaveformReady(false);
    };
  }, [audioUrl]);

  // Listen to other player status - simplified logic to reduce errors
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
    }, 500); // Further increase interval time

    return () => {
      clearInterval(checkInterval);
    };
  }, [isPlaying]);

  const togglePlayPause = () => {
    const currentWavesurfer = wavesurfer.current;
    if (!currentWavesurfer) return;

    try {
      if (isPlaying) {
        currentWavesurfer.pause();
      } else {
        // Stop other playing audio
        audioManager.stopCurrentPlayer();
        currentWavesurfer.play();
      }
    } catch (error) {
      console.warn("Error toggling play/pause:", error);
      setIsLoading(false);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-6 shadow-sm ${className}`}
      style={{ minHeight: "180px" }} // Fixed minimum height to prevent size changes
    >
      {/* Title, author, time and play button - on the same row */}
      <div className="flex items-start gap-4 mb-4" style={{ minHeight: "48px" }}>
        {/* Play/pause button - YouTube red theme */}
        <button
          onClick={togglePlayPause}
          disabled={isLoading}
          className="w-12 h-12 rounded-full text-white flex items-center justify-center transition-all duration-150 ease-in-out disabled:bg-gray-400 flex-shrink-0 cursor-pointer hover:scale-105 active:scale-95"
          style={{
            backgroundColor: isLoading ? '#9CA3AF' : '#5865f2',
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = '#4752c4';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = '#5865f2';
            }
          }}
          onMouseDown={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = '#3c45a5';
            }
          }}
          onMouseUp={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = '#4752c4';
            }
          }}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <div className="flex gap-1.5">
              <div className="w-1.5 h-6 bg-white rounded-sm"></div>
              <div className="w-1.5 h-6 bg-white rounded-sm"></div>
            </div>
          ) : (
            // Play icon - enlarged to 70-80% of space
            <div className="w-0 h-0 border-l-[10px] border-l-white border-t-[8px] border-b-[8px] border-t-transparent border-b-transparent ml-1"></div>
          )}
        </button>

        {/* Title and author */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-black leading-tight">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-tight">{description}</p>
        </div>

        {/* Time display - aligned with play button top edge */}
        <div className="text-sm text-gray-500 font-mono min-w-[80px] text-right">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* Waveform display area - fixed height */}
      <div className="w-full relative" style={{ height: "80px" }}>
        <div
          ref={waveformRef}
          className={`w-full h-full rounded ${
            waveformReady 
              ? 'opacity-100 transition-opacity duration-500 ease-in' // Fade in animation
              : 'opacity-0' // Hide immediately, no transition
          }`}
          style={{ height: "60px", margin: "10px 0" }}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <div className="mr-2">{t ? t("loading") : "Loading..."}</div>
            <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
