"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { CreateTranslator } from "@/utils/translator";
import jp from "../../public/locales/jp.json";
import en from "../../public/locales/en.json";
import zh from "../../public/locales/zh.json";

const languages = [
  { code: "jp", label: "JP" },
  { code: "en", label: "EN" },
  { code: "zh", label: "ZH" },
];

export function GetLanguageFromPath() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const langSegment = segments[1];
  if (["zh", "en", "jp"].includes(langSegment)) {
    return langSegment;
  }
  return "jp";
}

export function GetLanguageDict(key: string | undefined) {
  switch (key) {
    case "en":
      return CreateTranslator(en);
    case "zh":
      return CreateTranslator(zh);
    default:
      return CreateTranslator(jp);
  }
}

const ITEM_WIDTH = 20;

interface LanguageSwitcherInterface {
  setTranslator: React.Dispatch<React.SetStateAction<(key: string) => string>>;
}

export default function LanguageSwitcher({
  setTranslator,
}: LanguageSwitcherInterface) {
  const router = useRouter();
  const pathname = usePathname();

  const [currentLang, setCurrentLang] = useState(GetLanguageFromPath());

  const selectedIndex = languages.findIndex(
    (lang) => lang.code === currentLang
  );

  const handleClick = (code: string) => {
    if (code === currentLang) return;

    const segments = pathname.split("/");
    if (segments.length > 1 && languages.some((l) => l.code === segments[1])) {
      segments[1] = code;
    } else {
      segments.splice(1, 0, code);
    }
    const newPath = segments.join("/") || "/";
    setTranslator(() => GetLanguageDict(code));

    setCurrentLang(code);
    router.push(newPath);
  };

  return (
    <div
      className="relative inline-block select-none cursor-pointer"
      style={{
        width: ITEM_WIDTH * languages.length + (languages.length - 1),
      }}
    >
      <div className="flex items-center">
        {languages.map(({ code, label }, idx) => {
          const isActive = code === currentLang;
          return (
            <React.Fragment key={code}>
              <div
                className={`relative text-center transition-colors duration-300 ${
                  isActive ? "text-white" : "text-gray-400"
                }`}
                style={{
                  width: ITEM_WIDTH,
                  userSelect: "none",
                  lineHeight: "1.5rem",
                }}
                onClick={() => {
                  handleClick(code);
                }}
              >
                {label}
              </div>
              {idx < languages.length - 1 && (
                <div className="mx-1 text-gray-500 select-none ">|</div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* underline */}
      <span
        className="absolute bottom-0 h-[2px] bg-white ease-in-out"
        style={{
          left: selectedIndex * (ITEM_WIDTH + 12),
          width: 16,
          transition: "left 0.3s",
        }}
      />
    </div>
  );
}
