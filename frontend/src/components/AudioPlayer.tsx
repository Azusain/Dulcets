import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";

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

  useEffect(() => {
    if (waveformRef.current) {
      // 初始化 WaveSurfer
      wavesurfer.current = WaveSurfer.create({
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

      // 加载音频文件
      wavesurfer.current.load(audioUrl);

      // 事件监听
      wavesurfer.current.on("ready", () => {
        setIsLoading(false);
        setDuration(wavesurfer.current?.getDuration() || 0);
      });

      wavesurfer.current.on("play", () => {
        setIsPlaying(true);
      });

      wavesurfer.current.on("pause", () => {
        setIsPlaying(false);
      });

      wavesurfer.current.on("audioprocess", () => {
        setCurrentTime(wavesurfer.current?.getCurrentTime() || 0);
      });

      wavesurfer.current.on("seek" as any, () => {
        setCurrentTime(wavesurfer.current?.getCurrentTime() || 0);
      });

      // 播放完成时重置
      wavesurfer.current.on("finish", () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
    }

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (wavesurfer.current) {
      if (isPlaying) {
        wavesurfer.current.pause();
      } else {
        wavesurfer.current.play();
      }
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
      {/* 标题和描述 */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-black mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>

      {/* 播放控制区域 */}
      <div className="flex items-center gap-4 mb-4">
        {/* 播放/暂停按钮 */}
        <button
          onClick={togglePlayPause}
          disabled={isLoading}
          className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          aria-label={isPlaying ? "暂停" : "播放"}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            // 暂停图标
            <div className="flex gap-1">
              <div className="w-1 h-4 bg-white"></div>
              <div className="w-1 h-4 bg-white"></div>
            </div>
          ) : (
            // 播放图标
            <div className="w-0 h-0 border-l-4 border-l-white border-y-4 border-y-transparent ml-0.5"></div>
          )}
        </button>

        {/* 时间显示 */}
        <div className="text-sm text-gray-500 font-mono">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* 波形显示区域 */}
      <div className="w-full">
        <div
          ref={waveformRef}
          className="w-full bg-gray-50 rounded"
          style={{ minHeight: "60px" }}
        />
        {isLoading && (
          <div className="flex items-center justify-center py-4 text-gray-500">
            <div className="mr-2">加载中...</div>
            <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
