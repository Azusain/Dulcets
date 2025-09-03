"use client";

import { useLoading } from "@/contexts/LoadingContext";
import { useAssetPath } from "@/hooks/useAssetPath";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface LoadingManagerProps {
  children: React.ReactNode;
  loadingText: string;
}

// 使用模块级变量跟踪首次加载状态
let isInitialLoad = true;

export default function LoadingManager({
  children,
  loadingText,
}: LoadingManagerProps) {
  const { isLoading } = useLoading();
  const { getAssetPath } = useAssetPath();
  const router = useRouter();
  const [shouldShowLoading, setShouldShowLoading] = useState(false);

  useEffect(() => {
    // 只在初始加载时显示loading动画
    if (isInitialLoad && isLoading) {
      setShouldShowLoading(true);
      // 标记已经完成初始加载
      isInitialLoad = false;
    } else {
      setShouldShowLoading(false);
    }
  }, [isLoading]);

  // 监听页面刷新 - 重置初始加载状态
  useEffect(() => {
    const handleBeforeUnload = () => {
      // 页面刷新时重置状态
      isInitialLoad = true;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "#000000", minHeight: "100vh" }}
    >
      {/* Loading Animation - 只在首次访问时显示 */}
      {shouldShowLoading && (
        <div className="loading-screen fixed inset-0 z-[99999] flex items-center justify-center">
          <div className="text-center relative z-10">
            <div className="loading-animation -translate-56">
              {/* Portal mask for left logo */}
              <div className="portal-mask-left">
                <div className="logo-right">
                  <img
                    src={getAssetPath("/images/logo_right.png")}
                    alt="Logo Right"
                    className="logo-image"
                  />
                </div>
              </div>
              {/* Two Lines - extending upward and downward */}
              <div className="vertical-line-up"></div>
              <div className="vertical-line-down"></div>
              {/* Portal mask for right logo */}
              <div className="portal-mask-right">
                <div className="logo-left">
                  <img
                    src={getAssetPath("/images/logo_left.png")}
                    alt="Logo Left"
                    className="logo-image"
                  />
                </div>
              </div>
            </div>
            <div
              className="text-xl text-gray-300"
              style={{
                position: "relative",
                transform: "translateY(400px)",
                marginTop: "32px",
                display: "flex",
                alignItems: "baseline",
                justifyContent: "center",
                whiteSpace: "nowrap",
                zIndex: 999999999,
              }}
            >
              <span>
                {loadingText}
                <span className="loading-dots"></span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        id="main-content"
        className="main-content-react"
        style={{
          opacity: shouldShowLoading ? 0 : 1,
          visibility: "visible",
          transition: shouldShowLoading ? "none" : "opacity 0.8s ease-out 0.2s",
          backgroundColor: "transparent",
          zIndex: shouldShowLoading ? 1 : "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}
