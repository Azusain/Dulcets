"use client";

import { useLoading } from "@/contexts/LoadingContext";
import { useAssetPath } from "@/hooks/useAssetPath";

interface LoadingManagerProps {
  children: React.ReactNode;
  loadingText: string;
}

export default function LoadingManager({
  children,
  loadingText,
}: LoadingManagerProps) {
  const { isLoading } = useLoading();
  const { getAssetPath } = useAssetPath();

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "#000000", minHeight: "100vh" }}
    >
      {/* Loading Animation - Below Navigation */}
      {isLoading && (
        <div className="loading-screen fixed inset-0 z-[99999] flex items-center justify-center">
          <div className="text-center relative z-10">
            <div className="loading-animation -translate-40">
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
                zIndex: 999999999, 
                position: 'relative',
                transform: 'translateY(400px)', /* Move down 400px */
                marginTop: '32px',
                display: 'flex',
                alignItems: 'center', /* This will center everything horizontally */
                justifyContent: 'center',
                gap: '16px',
                height: 'auto' /* Let height adjust naturally */
              }}
            >
              {/* Left horizontal line */}
              <div 
                style={{
                  width: '80px',
                  height: '1px',
                  backgroundColor: '#ffffff',
                  opacity: 0.6,
                  flexShrink: 0 /* Prevent line from shrinking */
                }}
              ></div>
              
              {/* Text and dots container */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', /* Center text and dots vertically within this container */
                whiteSpace: 'nowrap',
                flexShrink: 0 /* Prevent text from shrinking */
              }}>
                <span style={{ lineHeight: '1.2' }}>{loadingText}</span>
                <span 
                  className="loading-dots"
                  style={{ zIndex: 999999999, position: 'relative' }}
                ></span>
              </div>
              
              {/* Right horizontal line */}
              <div 
                style={{
                  width: '80px',
                  height: '1px',
                  backgroundColor: '#ffffff',
                  opacity: 0.6,
                  flexShrink: 0 /* Prevent line from shrinking */
                }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        id="main-content"
        className="main-content-react"
        style={{
          opacity: isLoading ? 0 : 1,
          visibility: "visible", // 总是可见，让背景透过加载屏幕
          transition: isLoading ? "none" : "opacity 0.8s ease-out 0.2s",
          backgroundColor: "transparent",
          zIndex: isLoading ? 1 : "auto", // 在加载时保持在最底层
        }}
      >
        {children}
      </div>
    </div>
  );
}
