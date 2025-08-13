"use client";
import { useState } from "react";
import LanguageSwitcher, {
  GetLanguageDict,
  GetLanguageFromPath,
} from "./language_switcher";

const DsNavigation = () => {
  const init_t = GetLanguageDict(GetLanguageFromPath());
  const [t, setTranslator] = useState<(key: string) => string>(() => init_t);

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-black text-white">
      <div className="cursor-pointer">
        <img
          src="/images/favicon.png"
          alt="Dulcets Logo"
          className="h-26 w-46"
        />
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden md:flex space-x-6 text-base">
          <a href="#about" className="hover:underline">
            {t("about.title")}
          </a>
          <a href="#releases" className="hover:underline">
            {t("release")}
          </a>
          <a href="#information" className="hover:underline">
            {t("information")}
          </a>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-800 rounded-full px-4 py-2 min-w-[200px]">
          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input 
            type="text" 
            placeholder="Search..."
            className="bg-transparent text-white text-sm placeholder-gray-400 focus:outline-none flex-1"
          />
        </div>

        <LanguageSwitcher setTranslator={setTranslator} />

        {/* Sidebar Button */}
        <button className="flex flex-col space-y-1.5 p-2 hover:bg-gray-800 rounded transition-colors">
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
      </div>
    </nav>
  );
};

export default DsNavigation;
