"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UtilityBar } from "@/components/shell/utility-bar";
import { AppNavbar } from "@/components/shell/app-navbar";
import {
  FileText,
  Search,
  MessageCircle,
  ArrowRight,
  Phone,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  const [lang, setLang] = useState<"en" | "hi">("en");

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* Utility Bar (GIGW pattern) */}
      <UtilityBar currentLang={lang} onLanguageChange={setLang} />

      {/* Existing Navbar from Phase 02 */}
      <AppNavbar
        currentRole="citizen"
        isPublic
        currentLang={lang}
        onLanguageChange={setLang}
        onSignInClick={() => {}}
      />

      {/* ───── HERO SECTION ───── */}
      <section
        className="w-full bg-[var(--bg-cream)]"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
          {/* Eyebrow */}
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">
            JHARKHAND PUBLIC SERVICES / लोक सेवाएँ
          </p>

          {/* Main Heading */}
          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-tight max-w-3xl"
          >
            Report a local problem.
            <br />
            Find the right next step.
          </h1>
          <p className="mt-2 text-lg sm:text-xl text-[var(--accent-primary)] font-medium max-w-2xl">
            समस्या दर्ज करें। सही अगला कदम पाएं।
          </p>

          {/* Subtext */}
          <p className="mt-4 text-sm sm:text-base text-[var(--text-muted)] max-w-xl">
            {lang === "en"
              ? "Speak, type, or add a photo."
              : "बोलें, टाइप करें, या फोटो जोड़ें।"}
          </p>
        </div>
      </section>

      {/* ───── MAIN CONTENT ───── */}
      <main id="main-content" className="flex-1">
        {/* ── Three Action Cards ── */}
        <section className="w-full -mt-2" aria-label="Quick Actions">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {/* Report a Problem */}
              <div className="rounded-xl p-6 sm:p-7 flex flex-col justify-between min-h-[200px] bg-[var(--action-report)] text-white shadow-md hover:shadow-lg transition-shadow">
                <div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-md mb-4">
                    STEP 1 / पहला कदम
                  </span>
                  <FileText className="h-8 w-8 mb-3 opacity-90" />
                  <h2 className="text-xl font-bold leading-snug">
                    Report a Problem
                  </h2>
                  <p className="text-sm text-white/80 mt-1.5 leading-relaxed">
                    {lang === "en"
                      ? "Describe your local issue by voice, text, or photo."
                      : "अपनी समस्या बोलकर, लिखकर या फोटो से बताएं।"}
                  </p>
                </div>
                <Link
                  href="/report/new"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white hover:underline underline-offset-4 group"
                >
                  Report Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Track My Report */}
              <div className="rounded-xl p-6 sm:p-7 flex flex-col justify-between min-h-[200px] bg-[var(--action-track)] text-white shadow-md hover:shadow-lg transition-shadow">
                <div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-md mb-4">
                    STATUS / स्थिति
                  </span>
                  <Search className="h-8 w-8 mb-3 opacity-90" />
                  <h2 className="text-xl font-bold leading-snug">
                    Track My Report
                  </h2>
                  <p className="text-sm text-white/80 mt-1.5 leading-relaxed">
                    {lang === "en"
                      ? "Check real-time status with your report ID or mobile number."
                      : "अपनी शिकायत आईडी या मोबाइल नंबर से स्थिति जानें।"}
                  </p>
                </div>
                <Link
                  href="/track"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white hover:underline underline-offset-4 group"
                >
                  Check Status
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Get Help Submitting */}
              <div className="rounded-xl p-6 sm:p-7 flex flex-col justify-between min-h-[200px] bg-[var(--action-help)] text-white shadow-md hover:shadow-lg transition-shadow">
                <div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-md mb-4">
                    SUPPORT / सहायता
                  </span>
                  <MessageCircle className="h-8 w-8 mb-3 opacity-90" />
                  <h2 className="text-xl font-bold leading-snug">
                    Get Help Submitting
                  </h2>
                  <p className="text-sm text-white/80 mt-1.5 leading-relaxed">
                    {lang === "en"
                      ? "Assisted mode for citizens needing language or tech support."
                      : "भाषा या तकनीकी सहायता चाहिए? मदद उपलब्ध है।"}
                  </p>
                </div>
                <button
                  type="button"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white hover:underline underline-offset-4 group cursor-pointer"
                >
                  Get Help
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── How JharSetu Works ── */}
        <section
          className="w-full py-16 sm:py-20"
          aria-labelledby="how-it-works-heading"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2
              id="how-it-works-heading"
              className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] text-center mb-12"
            >
              {lang === "en"
                ? "How JharSetu works for you"
                : "झारसेतु आपके लिए कैसे काम करता है"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
              {/* Step 01 */}
              <div className="text-center md:text-left">
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] text-lg font-bold mb-4">
                  01
                </span>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                  {lang === "en" ? "Report" : "रिपोर्ट"}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3">
                  {lang === "en"
                    ? "Describe your problem by voice, text, or photo. We categorize it automatically."
                    : "समस्या बोलकर, लिखकर या फोटो से बताएं। हम स्वचालित वर्गीकरण करते हैं।"}
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] px-2.5 py-1 rounded-md">
                    Existing Service
                  </span>
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider bg-[var(--state-warning)]/10 text-[var(--state-warning)] px-2.5 py-1 rounded-md">
                    Authority Action
                  </span>
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider bg-[var(--accent-innovation)]/10 text-[var(--accent-innovation)] px-2.5 py-1 rounded-md">
                    Innovation Challenge
                  </span>
                </div>
              </div>

              {/* Step 02 */}
              <div className="text-center md:text-left">
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] text-lg font-bold mb-4">
                  02
                </span>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                  {lang === "en" ? "Review" : "समीक्षा"}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3">
                  {lang === "en"
                    ? "Human reviewers verify AI suggestions and route your case to the right path."
                    : "मानव समीक्षक AI सुझावों को सत्यापित करते हैं और सही मार्ग चुनते हैं।"}
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] px-2.5 py-1 rounded-md">
                    Existing Service
                  </span>
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider bg-[var(--state-warning)]/10 text-[var(--state-warning)] px-2.5 py-1 rounded-md">
                    Authority Action
                  </span>
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider bg-[var(--accent-innovation)]/10 text-[var(--accent-innovation)] px-2.5 py-1 rounded-md">
                    Innovation Challenge
                  </span>
                </div>
              </div>

              {/* Step 03 */}
              <div className="text-center md:text-left">
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] text-lg font-bold mb-4">
                  03
                </span>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                  {lang === "en" ? "Next Step" : "अगला कदम"}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3">
                  {lang === "en"
                    ? "Your problem gets referred to an existing service, routed as a grievance, or elevated as an innovation challenge."
                    : "आपकी समस्या मौजूदा सेवा, शिकायत निवारण, या नवाचार चुनौती के रूप में आगे बढ़ती है।"}
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] px-2.5 py-1 rounded-md">
                    Existing Service
                  </span>
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider bg-[var(--state-warning)]/10 text-[var(--state-warning)] px-2.5 py-1 rounded-md">
                    Authority Action
                  </span>
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider bg-[var(--accent-innovation)]/10 text-[var(--accent-innovation)] px-2.5 py-1 rounded-md">
                    Innovation Challenge
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Innovation Callout ── */}
        <section className="w-full py-14 sm:py-16 bg-[var(--accent-innovation)]/5 border-y border-[var(--border-default)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="h-8 w-8 text-[var(--accent-innovation)] mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3">
              {lang === "en"
                ? "Some problems need a new solution."
                : "कुछ समस्याओं के लिए नया समाधान चाहिए।"}
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl mx-auto mb-6 leading-relaxed">
              {lang === "en"
                ? "Verified recurring problems can become innovation challenges — connecting universities, industry, and government to solve real Jharkhand issues."
                : "सत्यापित बार-बार आने वाली समस्याएं नवाचार चुनौती बन सकती हैं — विश्वविद्यालय, उद्योग और सरकार को जोड़कर समाधान खोजें।"}
            </p>
            <Link
              href="/challenges"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-innovation)] hover:underline underline-offset-4 group"
            >
              {lang === "en"
                ? "View Verified Challenges"
                : "सत्यापित चुनौतियां देखें"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* ── Stats Row ── */}
        <section
          className="w-full py-14 sm:py-16"
          aria-label="Platform Statistics"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              <div className="p-6 rounded-xl border border-[var(--border-default)] bg-white">
                <p className="text-3xl sm:text-4xl font-bold text-[var(--accent-primary)]">
                  1,247
                </p>
                <p className="text-sm text-[var(--text-muted)] mt-1.5 font-medium">
                  {lang === "en"
                    ? "Total Complaints Received"
                    : "कुल प्राप्त शिकायतें"}
                </p>
                <p className="text-[10px] text-[var(--text-muted)] mt-1 italic">
                  Illustrative demo data
                </p>
              </div>
              <div className="p-6 rounded-xl border border-[var(--border-default)] bg-white">
                <p className="text-3xl sm:text-4xl font-bold text-[var(--state-success)]">
                  934
                </p>
                <p className="text-sm text-[var(--text-muted)] mt-1.5 font-medium">
                  {lang === "en"
                    ? "Resolved Gracefully"
                    : "सफलतापूर्वक निवारित"}
                </p>
                <p className="text-[10px] text-[var(--text-muted)] mt-1 italic">
                  Illustrative demo data
                </p>
              </div>
              <div className="p-6 rounded-xl border border-[var(--border-default)] bg-white">
                <p className="text-3xl sm:text-4xl font-bold text-[var(--state-warning)]">
                  4.2 days
                </p>
                <p className="text-sm text-[var(--text-muted)] mt-1.5 font-medium">
                  {lang === "en"
                    ? "Avg. Resolution Time"
                    : "औसत निवारण समय"}
                </p>
                <p className="text-[10px] text-[var(--text-muted)] mt-1 italic">
                  Illustrative demo data
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ───── FOOTER ───── */}
      <footer className="w-full bg-[var(--brand-navy)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Platform Identity */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold">
                JharSetu <span className="font-normal text-white/70">| झारसेतु</span>
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                {lang === "en"
                  ? "Innovation Gap Exchange — turning citizen problem reports into accountable civic and innovation outcomes for Jharkhand."
                  : "इनोवेशन गैप एक्सचेंज — नागरिक समस्या रिपोर्ट को जवाबदेह नागरिक और नवाचार परिणामों में बदलना।"}
              </p>
            </div>

            {/* Helplines */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">
                {lang === "en" ? "Official Helplines" : "आधिकारिक हेल्पलाइन"}
              </h4>
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-white/50 shrink-0" />
                  <span>
                    <strong className="text-white">181</strong> — General Public
                    Grievance
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-white/50 shrink-0" />
                  <span>
                    <strong className="text-white">1912</strong> — Electricity
                    Complaint Desk
                  </span>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">
                {lang === "en" ? "Quick Links" : "त्वरित लिंक"}
              </h4>
              <div className="flex flex-col gap-1.5 text-sm text-white/70">
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Website Policy
                </a>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Help &amp; Accessibility
                </a>
              </div>
            </div>
          </div>

          {/* Attribution */}
          <div className="mt-8 pt-6 border-t border-white/20 text-center text-xs text-white/50">
            <p>
              Designed for SIH 26043 • Government of Jharkhand •
              Privacy-Preserving Civic &amp; Innovation Exchange
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
