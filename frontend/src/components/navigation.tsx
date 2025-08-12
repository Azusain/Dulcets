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
        <div className="hidden md:flex space-x-6 text-sm">
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

        <LanguageSwitcher setTranslator={setTranslator} />

        <button className="md:hidden flex flex-col space-y-1.5">
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
      </div>
    </nav>
  );
};

export default DsNavigation;
