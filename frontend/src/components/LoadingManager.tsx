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
        <div className="loading-screen fixed inset-0 z-[998] flex items-center justify-center bg-gray-900">
          <div className="text-center">
            <div className="text-6xl font-bold text-white mb-4">
              <span className="text-gray-300">D</span>
              <span className="text-white">ulcets</span>
            </div>
            <div className="text-2xl text-gray-300 mb-4">{loadingText}</div>
            <div className="loading-spinner">
              <div className="spinner-ring"></div>
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
