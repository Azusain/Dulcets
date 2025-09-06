"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

// 使用模块级变量跟踪是否为初始访问
let isInitialVisit = true;

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (isInitialVisit) {
      // 初始访问：显示完整加载动画
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        isInitialVisit = false; // 标记已经完成初始加载
      }, 1800);
      return () => clearTimeout(timer);
    }
    // 页面间导航：不做任何操作，保持 isLoading 为 false
  }, [pathname]);

  // 监听页面刷新重置状态
  useEffect(() => {
    const handleBeforeUnload = () => {
      isInitialVisit = true;
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}
