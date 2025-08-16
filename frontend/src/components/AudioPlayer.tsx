import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import AudioManager from "../utils/audioManager";

interface AudioPlayerProps {
  title?: string;
  description?: string;
  audioUrl: string;
  className?: string;
  t?: (key: string) => string; // 添加 i18n 翻译函数
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  title = "音频播放器",
  description = "点击播放按钮开始播放",
  audioUrl,
  className = "",
  t, // 传入的翻译函数
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [waveformReady, setWaveformReady] = useState(false);
  const audioManager = AudioManager.getInstance();

  // 重置状态当 audioUrl 改变时
  useEffect(() => {
    setIsLoading(true);
    setIsPlaying(false);
    setDuration(0);
    setCurrentTime(0);
    setWaveformReady(false); // 立即隐藏波形，不需要淡出动画
  }, [audioUrl]);

  useEffect(() => {
    let isComponentMounted = true;
    let wavesurferInstance: WaveSurfer | null = null;
    let abortController = new AbortController();

    const initializeWaveSurfer = async () => {
      if (!waveformRef.current || !isComponentMounted) return;

      try {
        // 销毁之前的实例
        if (wavesurfer.current) {
          try {
            // 先停止播放再销毁
            if (typeof wavesurfer.current.pause === 'function') {
              try {
                wavesurfer.current.pause();
              } catch (e) {}
            }
            await new Promise(resolve => setTimeout(resolve, 20)); // 等待一下
            wavesurfer.current.destroy();
          } catch (error) {
            // 静默处理
          }
        }

        if (!isComponentMounted) return;

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
          try {
            wavesurferInstance.destroy();
          } catch (e) {}
          return;
        }

        wavesurfer.current = wavesurferInstance;

        // 事件监听
        const handleReady = () => {
          if (!isComponentMounted) return;
          setIsLoading(false); // 立即设置加载完成，让按钮变为可点击状态
          setDuration(wavesurferInstance?.getDuration() || 0);
          // 加载完成后立即显示波形并触发淡入动画
          setTimeout(() => {
            if (isComponentMounted) {
              setWaveformReady(true);
            }
          }, 10); // 进一步减少延迟时间
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
          setIsLoading(false); // 即使出错也要让按钮可点击
        };

        wavesurferInstance.on("ready", handleReady);
        wavesurferInstance.on("play", handlePlay);
        wavesurferInstance.on("pause", handlePause);
        wavesurferInstance.on("audioprocess", handleAudioProcess);
        wavesurferInstance.on("seek" as any, handleSeek);
        wavesurferInstance.on("finish", handleFinish);
        wavesurferInstance.on("error", handleError);

        // 加载音频文件 - 使用 AbortController
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
      abortController.abort(); // 终止所有请求
      
      if (wavesurferInstance) {
        try {
          // 先停止播放
          if (typeof wavesurferInstance.pause === 'function') {
            try {
              wavesurferInstance.pause();
            } catch (e) {}
          }
          
          // 清理管理器状态
          if (audioManager.isCurrentPlayer(wavesurferInstance)) {
            audioManager.stopCurrentPlayer();
          }
          
          // 延迟销毁，给足够时间让正在进行的请求结束
          setTimeout(() => {
            try {
              if (wavesurferInstance && typeof wavesurferInstance.destroy === 'function') {
                wavesurferInstance.destroy();
              }
            } catch (destroyError) {
              // 静默处理
            }
          }, 200); // 增加延迟时间
        } catch (error) {
          // 静默处理
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
      style={{ minHeight: "180px" }} // 固定最小高度防止尺寸变化
    >
      {/* 标题、作者、时间和播放按钮 - 在同一行 */}
      <div className="flex items-start gap-4 mb-4" style={{ minHeight: "48px" }}>
        {/* 播放/暂停按钮 - 优化动画和鼠标样式 */}
        <button
          onClick={togglePlayPause}
          disabled={isLoading}
          className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center transition-all duration-150 ease-in-out disabled:bg-gray-400 flex-shrink-0 cursor-pointer hover:scale-105 hover:bg-gray-800 active:scale-95 active:bg-gray-700"
          aria-label={isPlaying ? "暂停" : "播放"}
        >
          {isPlaying ? (
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

      {/* 波形显示区域 - 固定高度 */}
      <div className="w-full relative" style={{ height: "80px" }}>
        <div
          ref={waveformRef}
          className={`w-full h-full rounded ${
            waveformReady 
              ? 'opacity-100 transition-opacity duration-500 ease-in' // 淡入动画
              : 'opacity-0' // 立即隐藏，无过渡
          }`}
          style={{ height: "60px", margin: "10px 0" }}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <div className="mr-2">{t ? t("loading") : "加载中..."}</div>
            <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
