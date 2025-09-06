"use client";

import { useRef, useEffect } from "react";
import { getAssetPath } from "../utils/assetPath";
import Hls from "hls.js";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  // Get HLS video source
  const videoSrc = getAssetPath("/hls/hero-background.m3u8");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const initializeHLS = () => {
      // Cleanup previous instance
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: false,
          debug: false,
          capLevelToPlayerSize: false,
          maxLoadingDelay: 4,
          maxBufferLength: 30,
          maxBufferSize: 60 * 1000 * 1000,
          maxBufferHole: 0.5,
          highBufferWatchdogPeriod: 2,
          nudgeOffset: 0.1,
          nudgeMaxRetry: 3,
          maxFragLookUpTolerance: 0.25,
          liveSyncDurationCount: 3,
          liveMaxLatencyDurationCount: Infinity,
          manifestLoadingTimeOut: 10000,
          manifestLoadingMaxRetry: 1,
          manifestLoadingRetryDelay: 1000,
          levelLoadingTimeOut: 10000,
          levelLoadingMaxRetry: 2,
          fragLoadingTimeOut: 20000,
          fragLoadingMaxRetry: 3,
          fragLoadingRetryDelay: 1000,
          startFragPrefetch: true,
          testBandwidth: false,
        });

        hlsRef.current = hls;
        hls.loadSource(videoSrc);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(console.error);
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          // 只记录严重错误，减少控制台噪音
          if (data.fatal) {
            console.warn("HLS fatal error:", data.type, data.details);
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                // 网络错误时静默重试
                try {
                  hls.startLoad();
                } catch (e) {
                  // 忽略重试失败
                }
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                // 媒体错误时尝试恢复
                try {
                  hls.recoverMediaError();
                } catch (e) {
                  // 忽略恢复失败
                }
                break;
              default:
                // 其他错误静默销毁
                try {
                  hls.destroy();
                } catch (e) {
                  // 忽略销毁失败
                }
                break;
            }
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari native HLS support
        video.src = videoSrc;
        video.addEventListener("loadedmetadata", () => {
          video.play().catch(console.error);
        });
      } else {
        console.error("HLS is not supported in this browser");
      }
    };

    initializeHLS();

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [videoSrc]);

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-10"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={(e) => {
          console.error("Video failed to load:", e.currentTarget.error);
        }}
        onCanPlay={() => {}}
      >
        Your browser does not support HLS video streaming.
      </video>

      {/* Debug info will be in console */}
    </>
  );
}
