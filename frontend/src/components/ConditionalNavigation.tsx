"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import DsNavigation from "@/components/navigation";

export default function ConditionalNavigation() {
  const [showNavigation, setShowNavigation] = useState(true); // Start with true
  const pathname = usePathname();

  // No need for useEffect anymore - just always show navigation
  return <DsNavigation />;
}
