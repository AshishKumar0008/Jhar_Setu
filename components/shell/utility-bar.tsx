"use client";

import React from "react";

export interface UtilityBarProps {
  currentLang?: "en" | "hi";
  onLanguageChange?: (lang: "en" | "hi") => void;
  className?: string;
}

/**
 * GIGW-standard thin utility bar above the main navbar.
 * Dark navy background, government identity left, skip-link + language toggle right.
 */
export function UtilityBar({
  currentLang = "en",
  onLanguageChange,
  className = "",
}: UtilityBarProps) {
  const handleLangToggle = (lang: "en" | "hi") => {
    onLanguageChange?.(lang);
  };

  return (
    <div
      className={`w-full bg-[var(--brand-navy)] text-white text-xs ${className}`}
      role="banner"
    >
      <div className="mx-auto flex h-8 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Government identity */}
        <span className="font-medium tracking-wide text-[11px] sm:text-xs text-white/90">
          GOVERNMENT OF JHARKHAND{" "}
          <span className="text-white/60 mx-1">|</span>{" "}
          <span className="font-normal">झारखण्ड सरकार</span>
        </span>

        {/* Right: Skip link + Language toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Skip to Main Content — keyboard-focusable, visually hidden until focused */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-4 focus:z-[100] focus:bg-white focus:text-[var(--brand-navy)] focus:px-3 focus:py-1.5 focus:rounded-md focus:text-xs focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
          >
            Skip to Main Content
          </a>

          {/* Language Toggle — minimal inline style */}
          <div className="flex items-center gap-0.5" role="group" aria-label="Select language / भाषा चुनें">
            <button
              type="button"
              onClick={() => handleLangToggle("en")}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                currentLang === "en"
                  ? "bg-white/20 text-white font-semibold"
                  : "text-white/60 hover:text-white/90"
              }`}
              aria-pressed={currentLang === "en"}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => handleLangToggle("hi")}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                currentLang === "hi"
                  ? "bg-white/20 text-white font-semibold"
                  : "text-white/60 hover:text-white/90"
              }`}
              aria-pressed={currentLang === "hi"}
            >
              हिंदी
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
