"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TricolorLine } from "@/components/patterns/tricolor-line";
import { Globe, LogIn } from "lucide-react";

interface HeaderProps {
  onLanguageChange?: (lang: "hi" | "en") => void;
  currentLang?: "hi" | "en";
  showSignIn?: boolean;
  onSignInClick?: () => void;
}

export function Header({
  onLanguageChange,
  currentLang = "en",
  showSignIn = true,
  onSignInClick,
}: HeaderProps) {
  const [lang, setLang] = useState<"hi" | "en">(currentLang);

  const toggleLang = (selected: "hi" | "en") => {
    setLang(selected);
    if (onLanguageChange) {
      onLanguageChange(selected);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#E2E5EA]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Emblem / Logo Slot + Platform Title */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-3 text-text-primary hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded-md p-1"
            aria-label="JharSetu Jharkhand Home"
          >
            {/* Government Emblem / Seal Slot */}
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F8FA] border border-[#E2E5EA] text-[#0F62B4] font-semibold text-xs text-center leading-tight shadow-none"
              aria-hidden="true"
            >
              <svg
                className="h-6 w-6 text-[#0F62B4]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Government pillar / civic emblem representation */}
                <path d="M4 22h16" />
                <path d="M6 18v4" />
                <path d="M18 18v4" />
                <path d="M5 6h14" />
                <path d="M7 6v12" />
                <path d="M12 6v12" />
                <path d="M17 6v12" />
                <path d="M12 2l8 4H4l8-4z" />
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg leading-tight tracking-tight text-text-primary">
                  JharSetu
                </span>
                <span className="text-text-muted font-normal text-sm">|</span>
                <span className="font-semibold text-base leading-tight text-text-primary">
                  झारसेतु
                </span>
              </div>
              <span className="text-[11px] text-text-muted font-medium tracking-wide">
                Government of Jharkhand • झारखंड सरकार
              </span>
            </div>
          </Link>
        </div>

        {/* Right: Language toggle (हिंदी / English) + Sign-in */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <div
            className="flex items-center rounded-md border border-[#E2E5EA] bg-[#F7F8FA] p-0.5 text-xs"
            role="group"
            aria-label="Select language / भाषा चुनें"
          >
            <button
              type="button"
              onClick={() => toggleLang("en")}
              className={`min-h-[36px] px-2.5 py-1 rounded text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${
                lang === "en"
                  ? "bg-white text-[#0F62B4] shadow-xs font-semibold"
                  : "text-text-muted hover:text-text-primary"
              }`}
              aria-pressed={lang === "en"}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => toggleLang("hi")}
              className={`min-h-[36px] px-2.5 py-1 rounded text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${
                lang === "hi"
                  ? "bg-white text-[#0F62B4] shadow-xs font-semibold"
                  : "text-text-muted hover:text-text-primary"
              }`}
              aria-pressed={lang === "hi"}
            >
              हिंदी
            </button>
          </div>

          {/* Sign In Button: Outline only (per rule: only one solid primary button per screen) */}
          {showSignIn && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSignInClick}
              className="min-h-[36px] border-[#E2E5EA] text-text-primary hover:bg-[#F7F8FA] hover:text-[#0F62B4] font-medium text-xs px-3"
            >
              <LogIn className="h-3.5 w-3.5 mr-1 text-[#0F62B4]" />
              Sign in / प्रवेश
            </Button>
          )}
        </div>
      </div>

      {/* Tricolor accent line: exactly 3px, rendered directly under header, used once */}
      <TricolorLine />
    </header>
  );
}
