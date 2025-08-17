"use client";

import { useLoading } from "@/contexts/LoadingContext";

interface LoadingManagerProps {
  children: React.ReactNode;
  loadingText: string;
}

export default function LoadingManager({ children, loadingText }: LoadingManagerProps) {
  const { isLoading } = useLoading();

  return (
    <div className="min-h-screen text-white" style={{ background: 'transparent' }}>
      {/* Loading Animation - Below Navigation */}
      {isLoading && (
        <div className="loading-screen fixed inset-0 z-[998] flex items-center justify-center">
          <div className="text-center relative z-10">
            <div className="loading-animation">
              <div className="vertical-line"></div>
              <div className="square square-left"></div>
              <div className="square square-right"></div>
            </div>
            <div className="text-xl text-gray-300 mt-6">
              {loadingText}
              <span className="loading-dots"></span>
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
          visibility: isLoading ? 'hidden' : 'visible',
          transition: isLoading ? 'none' : 'opacity 0.8s ease-out 0.2s, visibility 0s 0.2s',
          backgroundColor: 'transparent'
        }}
      >
        {children}
      </div>
    </div>
  );
}
