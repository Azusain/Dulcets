import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import AudioManager from "../utils/audioManager";

interface AudioPlayerProps {
  title?: string;
  description?: string;
  audioUrl: string;
  className?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  title = "音频播放器",
  description = "点击播放按钮开始播放",
  audioUrl,
  className = "",
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [waveformReady, setWaveformReady] = useState(false);
  const audioManager = AudioManager.getInstance();

  useEffect(() => {
    let isComponentMounted = true;
    let wavesurferInstance: WaveSurfer | null = null;

    const initializeWaveSurfer = async () => {
      if (!waveformRef.current || !isComponentMounted) return;

      try {
        // 销毁之前的实例
        if (wavesurfer.current) {
          try {
            wavesurfer.current.destroy();
          } catch (error) {
            console.warn("Error destroying previous wavesurfer:", error);
          }
        }

        // 创建新实例
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
          wavesurferInstance.destroy();
          return;
        }

        wavesurfer.current = wavesurferInstance;

        // 事件监听
        const handleReady = () => {
          if (!isComponentMounted) return;
          setIsLoading(false);
          setDuration(wavesurferInstance?.getDuration() || 0);
          // 添加渐入动画
          setTimeout(() => {
            if (isComponentMounted) {
              setWaveformReady(true);
            }
          }, 100);
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

        wavesurferInstance.on("ready", handleReady);
        wavesurferInstance.on("play", handlePlay);
        wavesurferInstance.on("pause", handlePause);
        wavesurferInstance.on("audioprocess", handleAudioProcess);
        wavesurferInstance.on("seek" as any, handleSeek);
        wavesurferInstance.on("finish", handleFinish);

        // 加载音频文件
        if (isComponentMounted) {
          wavesurferInstance.load(audioUrl);
        }
      } catch (error) {
        console.warn("Error initializing WaveSurfer:", error);
        if (isComponentMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeWaveSurfer();

    return () => {
      isComponentMounted = false;
      
      if (wavesurferInstance) {
        try {
          // 先停止播放
          if (typeof wavesurferInstance.pause === 'function') {
            wavesurferInstance.pause();
          }
          // 如果这个播放器是当前活跃的，清除管理器状态
          if (audioManager.isCurrentPlayer(wavesurferInstance)) {
            audioManager.stopCurrentPlayer();
          }
          // 延迟销毁以避免 AbortError
          setTimeout(() => {
            try {
              if (wavesurferInstance && typeof wavesurferInstance.destroy === 'function') {
                wavesurferInstance.destroy();
              }
            } catch (destroyError) {
              console.warn('Error during delayed destroy:', destroyError);
            }
          }, 50);
        } catch (error) {
          console.warn('Error during wavesurfer cleanup:', error);
        }
      }
      
      wavesurfer.current = null;
      setWaveformReady(false);
    };
  }, [audioUrl]);

  // 监听其他播放器的状态 - 简化逻辑减少错误
  useEffect(() => {
    if (!isPlaying) return;

    const checkInterval = setInterval(() => {
      try {
        const currentWavesurfer = wavesurfer.current;
        if (currentWavesurfer && !audioManager.isCurrentPlayer(currentWavesurfer)) {
          setIsPlaying(false);
        }
      } catch (error) {
        // 静默处理错误
      }
    }, 500); // 进一步增加间隔时间

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
        // 停止其他正在播放的音频
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
    >
      {/* 标题、作者、时间和播放按钮 - 在同一行 */}
      <div className="flex items-start gap-4 mb-4">
        {/* 播放/暂停按钮 - 优化动画和鼠标样式 */}
        <button
          onClick={togglePlayPause}
          disabled={isLoading}
          className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center transition-all duration-150 ease-in-out disabled:bg-gray-400 flex-shrink-0 cursor-pointer hover:scale-105 hover:bg-gray-800 active:scale-95 active:bg-gray-700"
          aria-label={isPlaying ? "暂停" : "播放"}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <div className="flex gap-1.5">
              <div className="w-1.5 h-6 bg-white rounded-sm"></div>
              <div className="w-1.5 h-6 bg-white rounded-sm"></div>
            </div>
          ) : (
            // 播放图标 - 增大到 70-80% 的空间
            <div className="w-0 h-0 border-l-[10px] border-l-white border-t-[8px] border-b-[8px] border-t-transparent border-b-transparent ml-1"></div>
          )}
        </button>

        {/* 标题和作者 */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-black leading-tight">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-tight">{description}</p>
        </div>

        {/* 时间显示 - 与播放按钮上沿对齐 */}
        <div className="text-sm text-gray-500 font-mono min-w-[80px] text-right">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* 波形显示区域 */}
      <div className="w-full relative">
        <div
          ref={waveformRef}
          className={`w-full rounded transition-opacity duration-500 ${
            waveformReady ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ minHeight: "60px" }}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <div className="mr-2">加载中...</div>
            <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
