"use client";

import { useState, useEffect } from "react";
import DsNavigation from "@/components/navigation";

export default function ConditionalNavigation() {
  const [showNavigation, setShowNavigation] = useState(false);

  useEffect(() => {
    // Show navigation after loading animation completes (3 seconds)
    const timer = setTimeout(() => {
      setShowNavigation(true);
    }, 3000); // Match the loading animation duration

    return () => clearTimeout(timer);
  }, []);

  if (!showNavigation) {
    return null; // Don't render navigation during loading
  }

  return <DsNavigation />;
}
