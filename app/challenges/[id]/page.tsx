"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { UtilityBar } from "@/components/shell/utility-bar";
import { AppNavbar } from "@/components/shell/app-navbar";
import { PathBadge } from "@/components/patterns/path-badge";
import { ArrowLeft, Construction } from "lucide-react";

export default function ChallengeDetailPage() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const params = useParams();
  const challengeId = params.id as string;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* Utility Bar + Navbar */}
      <UtilityBar currentLang={lang} onLanguageChange={setLang} />
      <AppNavbar
        currentRole="citizen"
        isPublic
        currentLang={lang}
        onLanguageChange={setLang}
        onSignInClick={() => {}}
      />

      <main
        id="main-content"
        className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      >
        {/* Back link */}
        <Link
          href="/challenges"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-innovation)] hover:underline underline-offset-4 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          {lang === "en"
            ? "Back to Challenges"
            : "चुनौतियों पर वापस जाएं"}
        </Link>

        {/* Coming Soon */}
        <div className="rounded-xl border border-[var(--border-default)] bg-white p-10 sm:p-14 text-center space-y-4">
          <Construction className="h-10 w-10 text-[var(--accent-innovation)] mx-auto" />
          <div className="flex items-center justify-center gap-2">
            <PathBadge path="C" />
            <span className="text-sm font-mono text-[var(--text-muted)]">
              {challengeId}
            </span>
          </div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">
            {lang === "en"
              ? "Challenge Passport Detail"
              : "चैलेंज पासपोर्ट विवरण"}
          </h1>
          <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
            {lang === "en"
              ? "The full Challenge Passport detail view is under construction. This page will use the shared detail-tabs pattern to show overview, timeline, measurements, evidence, commitments, evaluation, and audit data."
              : "चैलेंज पासपोर्ट विवरण पृष्ठ निर्माणाधीन है। यह पृष्ठ अवलोकन, समयरेखा, माप, साक्ष्य, प्रतिबद्धताएं, मूल्यांकन, और ऑडिट डेटा दिखाएगा।"}
          </p>
        </div>
      </main>
    </div>
  );
}
