"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TricolorLine } from "@/components/patterns/tricolor-line";
import {
  PanelLeftOpen,
  PanelLeftClose,
  LogIn,
  LogOut,
  UserCheck,
  ChevronDown,
} from "lucide-react";

export type UserRole =
  | "citizen"
  | "assisted_operator"
  | "reviewer"
  | "department_officer"
  | "government"
  | "university"
  | "industry_csr"
  | "admin";

export interface NavbarUser {
  name: string;
  role: UserRole;
  email?: string;
  avatarUrl?: string;
}

export interface AppNavbarProps {
  currentRole?: UserRole;
  isPublic?: boolean;
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
  currentLang?: "en" | "hi";
  onLanguageChange?: (lang: "en" | "hi") => void;
  user?: NavbarUser | null;
  onSignInClick?: () => void;
  onSignOutClick?: () => void;
  onRoleChange?: (role: UserRole) => void;
  pageTitle?: React.ReactNode;
  className?: string;
}

const ROLE_DISPLAY_NAMES: Record<UserRole, { en: string; hi: string }> = {
  citizen: { en: "Citizen", hi: "नागरिक" },
  assisted_operator: { en: "Assisted Operator", hi: "सहायक ऑपरेटर" },
  reviewer: { en: "Reviewer", hi: "समीक्षक" },
  department_officer: { en: "Department Officer", hi: "विभागीय अधिकारी" },
  government: { en: "Government", hi: "सरकार" },
  university: { en: "University", hi: "विश्वविद्यालय" },
  industry_csr: { en: "Industry & CSR", hi: "उद्योग व सीएसआर" },
  admin: { en: "Admin", hi: "प्रशासक" },
};

export function isInternalRole(role?: UserRole): boolean {
  if (!role) return false;
  return [
    "reviewer",
    "department_officer",
    "government",
    "university",
    "industry_csr",
    "admin",
  ].includes(role);
}

export function AppNavbar({
  currentRole = "citizen",
  isPublic,
  sidebarOpen = false,
  onToggleSidebar,
  currentLang = "en",
  onLanguageChange,
  user,
  onSignInClick,
  onSignOutClick,
  onRoleChange,
  pageTitle,
  className = "",
}: AppNavbarProps) {
  const [lang, setLang] = useState<"en" | "hi">(currentLang);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  // Derive whether this is an internal role requiring the sidebar toggle
  const showSidebarToggle =
    isPublic !== undefined ? !isPublic : isInternalRole(currentRole);

  const handleLangToggle = (selected: "en" | "hi") => {
    setLang(selected);
    onLanguageChange?.(selected);
  };

  const handleSelectRole = (role: UserRole) => {
    onRoleChange?.(role);
    setRoleMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-40 w-full bg-white border-b border-[#E2E5EA] ${className}`}>
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Left Section: Sidebar Toggle (internal roles only) + Logo / Emblem + Bilingual Title */}
        <div className="flex items-center gap-3 shrink-0">
          {showSidebarToggle && (
            <button
              type="button"
              onClick={onToggleSidebar}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E2E5EA] text-[#111827] hover:bg-[#F7F8FA] hover:text-[#0F62B4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F62B4]"
              aria-label={sidebarOpen ? "Close role sidebar" : "Open role sidebar"}
              title={sidebarOpen ? "Close role navigation" : "Open role navigation"}
            >
              {sidebarOpen ? (
                <PanelLeftClose className="h-5 w-5 text-[#0F62B4]" />
              ) : (
                <PanelLeftOpen className="h-5 w-5 text-[#6B7280]" />
              )}
            </button>
          )}

          <Link
            href="/"
            className="flex items-center gap-3 text-[#111827] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F62B4] rounded-md p-0.5"
            aria-label="JharSetu Jharkhand Home"
          >
            {/* Circular Emblem / Logo slot */}
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
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-lg leading-tight tracking-tight text-[#111827]">
                  JharSetu
                </span>
                <span className="font-normal text-sm text-[#6B7280]">
                  झारसेतु
                </span>
              </div>
              <span className="text-[11px] text-[#6B7280] font-medium tracking-wide">
                Government of Jharkhand • झारखंड सरकार
              </span>
            </div>
          </Link>
        </div>

        {/* Center Section: Reserved for page title or breadcrumb in later chapters */}
        <div className="flex-1 flex justify-center items-center px-2 min-w-0">
          {pageTitle ? (
            <div className="text-sm font-semibold text-[#111827] truncate max-w-md">
              {pageTitle}
            </div>
          ) : null}
        </div>

        {/* Right Section: Language toggle + Sign in / Role menu */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Toggle (English / हिंदी segmented control) */}
          <div
            className="flex items-center rounded-md border border-[#E2E5EA] bg-[#F7F8FA] p-0.5 text-xs"
            role="group"
            aria-label="Select language / भाषा चुनें"
          >
            <button
              type="button"
              onClick={() => handleLangToggle("en")}
              className={`min-h-[32px] px-2.5 py-1 rounded text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F62B4] ${
                lang === "en"
                  ? "bg-white text-[#0F62B4] shadow-xs font-semibold"
                  : "text-[#6B7280] hover:text-[#111827]"
              }`}
              aria-pressed={lang === "en"}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => handleLangToggle("hi")}
              className={`min-h-[32px] px-2.5 py-1 rounded text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F62B4] ${
                lang === "hi"
                  ? "bg-white text-[#0F62B4] shadow-xs font-semibold"
                  : "text-[#6B7280] hover:text-[#111827]"
              }`}
              aria-pressed={lang === "hi"}
            >
              हिंदी
            </button>
          </div>

          {/* User / Sign In control: Outline style, becomes user/role menu once authenticated */}
          {user ? (
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="min-h-[36px] border-[#E2E5EA] text-[#111827] hover:bg-[#F7F8FA] font-medium text-xs px-3 gap-2"
                aria-expanded={roleMenuOpen}
                aria-haspopup="menu"
              >
                <UserCheck className="h-3.5 w-3.5 text-[#0F62B4]" />
                <span className="font-semibold text-xs">
                  {ROLE_DISPLAY_NAMES[user.role]?.en || user.role}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-[#6B7280]" />
              </Button>

              {roleMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-50 bg-transparent"
                    onClick={() => setRoleMenuOpen(false)}
                    aria-hidden="true"
                  />
                  <div
                    role="menu"
                    className="absolute right-0 mt-1.5 w-56 rounded-xl border border-[#E2E5EA] bg-white p-1.5 shadow-lg z-50 focus:outline-none"
                  >
                    <div className="px-3 py-2 border-b border-[#E2E5EA] mb-1">
                      <p className="text-xs font-semibold text-[#111827] truncate">
                        {user.name}
                      </p>
                      {user.email && (
                        <p className="text-[11px] text-[#6B7280] truncate">
                          {user.email}
                        </p>
                      )}
                      <p className="text-[10px] text-[#0F62B4] font-medium mt-0.5 uppercase tracking-wider">
                        Role: {ROLE_DISPLAY_NAMES[user.role]?.en}
                      </p>
                    </div>

                    <div className="py-1">
                      <p className="px-3 py-1 text-[11px] font-semibold text-[#6B7280]">
                        Switch Role (Demo Mode):
                      </p>
                      {(
                        [
                          "citizen",
                          "reviewer",
                          "department_officer",
                          "government",
                          "university",
                          "industry_csr",
                          "admin",
                        ] as UserRole[]
                      ).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => handleSelectRole(r)}
                          className={`w-full text-left px-3 py-1.5 text-xs rounded-md flex items-center justify-between transition-colors ${
                            user.role === r
                              ? "bg-[#0F62B4]/10 text-[#0F62B4] font-semibold"
                              : "text-[#111827] hover:bg-[#F7F8FA]"
                          }`}
                        >
                          <span>{ROLE_DISPLAY_NAMES[r]?.en}</span>
                          <span className="text-[11px] text-[#6B7280]">
                            {ROLE_DISPLAY_NAMES[r]?.hi}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-1 border-t border-[#E2E5EA] mt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setRoleMenuOpen(false);
                          onSignOutClick?.();
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs rounded-md text-[#DC2626] hover:bg-red-50 flex items-center gap-1.5 transition-colors"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Sign out / प्रस्थान</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={onSignInClick}
              className="min-h-[36px] border-[#E2E5EA] text-[#111827] hover:bg-[#F7F8FA] hover:text-[#0F62B4] font-medium text-xs px-3"
            >
              <LogIn className="h-3.5 w-3.5 mr-1 text-[#0F62B4]" />
              Sign in / प्रवेश
            </Button>
          )}
        </div>
      </div>

      {/* 3px Tricolor Accent Line: Saffron / White / Green directly under navbar, rendered here once only */}
      <TricolorLine />
    </header>
  );
}
