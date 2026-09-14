"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  Search,
  MessageCircle,
  Phone,
} from "lucide-react";

export type ActivePage = "report" | "track" | "help";

export interface CitizenLeftRailProps {
  activePage?: ActivePage;
  lang?: "en" | "hi";
  className?: string;
}

/**
 * Shared left rail for citizen-facing two-column pages.
 * Used by Report Wizard and Track Report to maintain consistent navigation.
 */
export function CitizenLeftRail({
  activePage,
  lang = "en",
  className = "",
}: CitizenLeftRailProps) {
  const navItems: {
    id: ActivePage;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    activeColor: string;
    iconColor: string;
  }[] = [
    {
      id: "report",
      href: "/report/new",
      icon: FileText,
      label: "Report a Problem",
      activeColor: "bg-[var(--action-report)] text-white font-semibold shadow-sm",
      iconColor: "text-[var(--action-report)]",
    },
    {
      id: "track",
      href: "/track",
      icon: Search,
      label: "Track My Report",
      activeColor: "bg-[var(--action-track)] text-white font-semibold shadow-sm",
      iconColor: "text-[var(--action-track)]",
    },
    {
      id: "help",
      href: "#",
      icon: MessageCircle,
      label: "Get Help Submitting",
      activeColor: "bg-[var(--action-help)] text-white font-semibold shadow-sm",
      iconColor: "text-[var(--action-help)]",
    },
  ];

  return (
    <aside className={`w-full lg:w-72 xl:w-80 shrink-0 space-y-6 ${className}`}>
      {/* Nav action buttons */}
      <nav className="space-y-2" aria-label="Quick actions">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                isActive
                  ? item.activeColor
                  : "border border-[var(--border-default)] bg-white text-[var(--text-primary)] font-medium hover:bg-[var(--bg-base)]"
              }`}
            >
              <Icon
                className={`h-5 w-5 shrink-0 ${isActive ? "" : item.iconColor}`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Reassurance note */}
      <div className="rounded-xl border border-[var(--state-success)]/30 bg-[var(--state-success)]/5 p-4 text-xs text-[var(--text-muted)] leading-relaxed">
        <p className="font-semibold text-[var(--state-success)] mb-1">
          🔒{" "}
          {lang === "en"
            ? "Your report is registered securely."
            : "आपकी शिकायत सुरक्षित रूप से दर्ज की जाती है।"}
        </p>
        <p>
          {lang === "en"
            ? "You will receive an SMS update automatically."
            : "आपको स्वचालित SMS अपडेट मिलेगा।"}
        </p>
      </div>

      {/* Platform identity */}
      <div className="rounded-xl border border-[var(--border-default)] bg-white p-4 space-y-2">
        <h3 className="text-sm font-bold text-[var(--text-primary)]">
          JharSetu{" "}
          <span className="font-normal text-[var(--text-muted)]">
            | झारसेतु
          </span>
        </h3>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          {lang === "en"
            ? "A privacy-preserving, human-governed platform turning citizen problem reports into accountable civic outcomes."
            : "नागरिक समस्याओं को जवाबदेह नागरिक परिणामों में बदलने वाला मानव-नियंत्रित मंच।"}
        </p>
        <p className="text-[11px] text-[var(--text-muted)]">
          Government of Jharkhand • झारखंड सरकार
        </p>
      </div>

      {/* Helplines */}
      <div className="rounded-xl border border-[var(--border-default)] bg-white p-4 space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          {lang === "en" ? "Official Helplines" : "आधिकारिक हेल्पलाइन"}
        </h4>
        <div className="space-y-1.5 text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 shrink-0" />
            <span>
              <strong className="text-[var(--text-primary)]">181</strong> —
              General Public Grievance
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 shrink-0" />
            <span>
              <strong className="text-[var(--text-primary)]">1912</strong>{" "}
              — Electricity Complaint Desk
            </span>
          </div>
        </div>
      </div>

      {/* Footer attribution */}
      <p className="text-[10px] text-[var(--text-muted)] text-center lg:text-left">
        Designed for SIH 26043 • Privacy-Preserving Civic Exchange
      </p>
    </aside>
  );
}
