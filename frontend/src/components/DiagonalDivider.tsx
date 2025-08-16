"use client";

import React from "react";

interface DiagonalDividerProps {
  /** 分割线的方向，默认为从左上到右下 */
  direction?: "left-to-right" | "right-to-left";
  /** 分割线的高度，默认为 80px */
  height?: number;
  /** 线条颜色 */
  lineColor?: string;
  /** 线条粗细 */
  lineWidth?: number;
  /** 自定义类名 */
  className?: string;
}

export default function DiagonalDivider({
  direction = "left-to-right",
  height = 60,
  lineColor = "#9ca3af",
  lineWidth = 2,
  className = "",
}: DiagonalDividerProps) {
  
  return (
    <div 
      className={`w-full ${className}`}
      style={{ height: `${height}px` }}
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <line 
          x1={direction === "left-to-right" ? "0" : "1200"}
          y1={direction === "left-to-right" ? "0" : "60"}
          x2={direction === "left-to-right" ? "1200" : "0"}
          y2={direction === "left-to-right" ? "60" : "0"}
          stroke={lineColor}
          strokeWidth={lineWidth}
        />
      </svg>
    </div>
  );
}
