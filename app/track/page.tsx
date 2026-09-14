"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UtilityBar } from "@/components/shell/utility-bar";
import { AppNavbar } from "@/components/shell/app-navbar";
import { CitizenLeftRail } from "@/components/patterns/citizen-left-rail";
import { StatusBadge, StatusCode } from "@/components/patterns/status-badge";
import { PathBadge } from "@/components/patterns/path-badge";
import { ActionDialog } from "@/components/patterns/action-dialog";
import {
  Search,
  AlertCircle,
  MessageCircle,
  Plus,
} from "lucide-react";

/** Demo timeline step */
interface TimelineStep {
  status: StatusCode;
  label: string;
  hindiLabel: string;
  description: string;
  date: string;
  isActive: boolean;
  isPast: boolean;
}

const DEMO_TIMELINE: TimelineStep[] = [
  {
    status: "SUBMITTED",
    label: "Received",
    hindiLabel: "प्राप्त हुआ",
    description: "Your report has been registered in the system.",
    date: "12 Sep 2026, 10:32 AM",
    isActive: false,
    isPast: true,
  },
  {
    status: "AI_PROCESSED",
    label: "Being prepared for review",
    hindiLabel: "समीक्षा हेतु तैयार हो रहा है",
    description: "AI has processed your report for structured extraction.",
    date: "12 Sep 2026, 10:34 AM",
    isActive: false,
    isPast: true,
  },
  {
    status: "NEEDS_HUMAN_REVIEW",
    label: "Under human review",
    hindiLabel: "मानव समीक्षा में",
    description:
      "A trained reviewer is examining your report to determine the right path.",
    date: "12 Sep 2026, 11:15 AM",
    isActive: true,
    isPast: false,
  },
  {
    status: "PATH_B_ROUTED",
    label: "Referred / Joined / Needs info / Closed",
    hindiLabel: "संदर्भित / जोड़ा गया / जानकारी चाहिए / बंद",
    description: "Awaiting reviewer decision.",
    date: "—",
    isActive: false,
    isPast: false,
  },
];

export default function TrackReportPage() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [caseId, setCaseId] = useState("");
  const [recoveryPhrase, setRecoveryPhrase] = useState("");
  const [lookupDone, setLookupDone] = useState(false);
  const [lookupError, setLookupError] = useState(false);
  const [addInfoOpen, setAddInfoOpen] = useState(false);

  const handleLookup = () => {
    // Demo: any input with "JH" prefix succeeds, others fail
    if (caseId.trim().toUpperCase().startsWith("JH")) {
      setLookupDone(true);
      setLookupError(false);
    } else if (caseId.trim().length > 0) {
      setLookupDone(false);
      setLookupError(true);
    }
  };

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

      {/* ───── Two-Column Layout ───── */}
      <div className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* ── LEFT RAIL (shared component) ── */}
          <CitizenLeftRail activePage="track" lang={lang} />

          {/* ── MAIN CONTENT ── */}
          <main id="main-content" className="flex-1 min-w-0 space-y-8">
            {/* Eyebrow + Heading */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--action-track)] mb-2">
                TRACK REPORT / अपनी शिकायत देखें
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] leading-tight">
                {lang === "en" ? "Track My Report" : "मेरी शिकायत देखें"}
              </h1>
            </div>

            {/* ── Lookup Form ── */}
            <div className="space-y-4">
              {/* Case ID input */}
              <div className="space-y-2">
                <label
                  htmlFor="case-id"
                  className="text-sm font-semibold text-[var(--text-primary)]"
                >
                  {lang === "en" ? "Case ID" : "केस आईडी"}
                </label>
                <div className="flex gap-2">
                  <input
                    id="case-id"
                    type="text"
                    value={caseId}
                    onChange={(e) => {
                      setCaseId(e.target.value);
                      setLookupError(false);
                      setLookupDone(false);
                    }}
                    placeholder="JH-2026-09-0012"
                    className="flex-1 rounded-xl border border-[var(--border-default)] bg-white px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleLookup}
                    disabled={!caseId.trim()}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      caseId.trim()
                        ? "bg-[var(--action-track)] text-white shadow-sm hover:shadow-md"
                        : "bg-[var(--border-default)] text-[var(--text-muted)] cursor-not-allowed"
                    }`}
                  >
                    <Search className="h-4 w-4" />
                    {lang === "en" ? "Look Up" : "खोजें"}
                  </button>
                </div>
              </div>

              {/* Recovery phrase (anonymous option) */}
              <div className="space-y-2">
                <label
                  htmlFor="recovery-phrase"
                  className="text-sm font-medium text-[var(--text-muted)]"
                >
                  {lang === "en"
                    ? "Recovery Phrase (anonymous reports)"
                    : "रिकवरी वाक्य (अनाम शिकायतें)"}
                </label>
                <input
                  id="recovery-phrase"
                  type="text"
                  value={recoveryPhrase}
                  onChange={(e) => setRecoveryPhrase(e.target.value)}
                  placeholder={
                    lang === "en"
                      ? "Enter your recovery phrase…"
                      : "अपना रिकवरी वाक्य दर्ज करें…"
                  }
                  className="w-full rounded-xl border border-[var(--border-default)] bg-white px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent"
                />
              </div>

              {/* Sign in option */}
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <span>
                  {lang === "en" ? "or" : "या"}
                </span>
                <Link
                  href="#"
                  className="text-[var(--accent-primary)] font-semibold hover:underline underline-offset-2"
                >
                  {lang === "en"
                    ? "Sign in to see all your reports"
                    : "सभी शिकायतें देखने के लिए साइन इन करें"}
                </Link>
              </div>
            </div>

            {/* ── Error State ── */}
            {lookupError && (
              <div className="rounded-xl border border-[var(--state-error)]/30 bg-[var(--state-error)]/5 p-5 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-[var(--state-error)] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[var(--state-error)]">
                    {lang === "en"
                      ? "We couldn't find a report with that ID."
                      : "इस आईडी से कोई शिकायत नहीं मिली।"}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    {lang === "en"
                      ? "Check the case ID and try again, or use "
                      : "केस आईडी जाँचें और पुनः प्रयास करें, या "}
                    <Link
                      href="#"
                      className="text-[var(--accent-primary)] font-semibold hover:underline"
                    >
                      {lang === "en"
                        ? "Get Help Submitting"
                        : "सहायता प्राप्त करें"}
                    </Link>
                    .
                  </p>
                </div>
              </div>
            )}

            {/* ── Lookup Result: Status Timeline + Summary ── */}
            {lookupDone && (
              <div className="space-y-6">
                {/* Status Timeline */}
                <div className="rounded-xl border border-[var(--border-default)] bg-white p-5 sm:p-6">
                  <h2 className="text-sm font-bold text-[var(--text-primary)] mb-5">
                    {lang === "en" ? "Report Status" : "शिकायत स्थिति"}
                  </h2>

                  <div className="relative space-y-0">
                    {DEMO_TIMELINE.map((step, i) => (
                      <div
                        key={step.status}
                        className="flex gap-4 items-start relative"
                      >
                        {/* Vertical line connector */}
                        <div className="flex flex-col items-center shrink-0">
                          <div
                            className={`h-3 w-3 rounded-full border-2 shrink-0 ${
                              step.isPast
                                ? "bg-[var(--state-success)] border-[var(--state-success)]"
                                : step.isActive
                                ? "bg-[var(--accent-primary)] border-[var(--accent-primary)] ring-4 ring-[var(--accent-primary)]/20"
                                : "bg-[var(--border-default)] border-[var(--border-default)]"
                            }`}
                          />
                          {i < DEMO_TIMELINE.length - 1 && (
                            <div
                              className={`w-0.5 h-12 ${
                                step.isPast
                                  ? "bg-[var(--state-success)]"
                                  : "bg-[var(--border-default)]"
                              }`}
                            />
                          )}
                        </div>

                        {/* Step content */}
                        <div className="pb-6 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`text-sm font-semibold ${
                                step.isActive
                                  ? "text-[var(--accent-primary)]"
                                  : step.isPast
                                  ? "text-[var(--text-primary)]"
                                  : "text-[var(--text-muted)]"
                              }`}
                            >
                              {lang === "en" ? step.label : step.hindiLabel}
                            </span>
                            {(step.isPast || step.isActive) && (
                              <StatusBadge status={step.status} />
                            )}
                          </div>
                          <p className="text-xs text-[var(--text-muted)] mt-0.5">
                            {step.description}
                          </p>
                          <p className="text-[11px] text-[var(--text-muted)] mt-1 font-mono">
                            {step.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Redacted Summary Card */}
                <div className="rounded-xl border border-[var(--border-default)] bg-white divide-y divide-[var(--border-default)]">
                  <div className="px-5 py-3.5 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                      Case ID
                    </span>
                    <span className="text-sm font-mono font-semibold text-[var(--accent-primary)]">
                      {caseId.toUpperCase()}
                    </span>
                  </div>
                  <div className="px-5 py-3.5 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                      Category
                    </span>
                    <span className="text-sm text-[var(--text-primary)] font-medium">
                      Water
                    </span>
                  </div>
                  <div className="px-5 py-3.5 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                      Location
                    </span>
                    <span className="text-sm text-[var(--text-primary)]">
                      Sahibganj District
                    </span>
                  </div>
                  <div className="px-5 py-3.5 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                      Submitted
                    </span>
                    <span className="text-sm text-[var(--text-primary)]">
                      12 Sep 2026
                    </span>
                  </div>
                  <div className="px-5 py-3.5 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                      Current Path
                    </span>
                    <PathBadge path="B" />
                  </div>
                </div>

                {/* Add Information button */}
                <button
                  type="button"
                  onClick={() => setAddInfoOpen(true)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--border-default)] bg-white text-[var(--text-primary)] text-sm font-semibold hover:bg-[var(--bg-base)] transition-colors"
                >
                  <Plus className="h-4 w-4 text-[var(--accent-primary)]" />
                  {lang === "en"
                    ? "Add Information"
                    : "जानकारी जोड़ें"}
                </button>

                {/* Add Information Dialog */}
                <ActionDialog
                  open={addInfoOpen}
                  onOpenChange={setAddInfoOpen}
                  title={
                    lang === "en"
                      ? "Add Information to Your Report"
                      : "अपनी शिकायत में जानकारी जोड़ें"
                  }
                  description={
                    lang === "en"
                      ? "Provide additional details, photos, or updates about your report. This information will be reviewed by the assigned officer."
                      : "अपनी शिकायत के बारे में अतिरिक्त विवरण, फोटो, या अपडेट दें। इस जानकारी की समीक्षा नियुक्त अधिकारी द्वारा की जाएगी।"
                  }
                  confirmLabel={
                    lang === "en" ? "Submit Information" : "जानकारी जमा करें"
                  }
                  cancelLabel={lang === "en" ? "Cancel" : "रद्द करें"}
                  onConfirm={() => setAddInfoOpen(false)}
                  onCancel={() => setAddInfoOpen(false)}
                >
                  <div className="space-y-3">
                    <textarea
                      rows={3}
                      placeholder={
                        lang === "en"
                          ? "Describe the additional information…"
                          : "अतिरिक्त जानकारी का वर्णन करें…"
                      }
                      className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent resize-none"
                    />
                    <p className="text-[11px] text-[var(--text-muted)] italic">
                      {lang === "en"
                        ? "No backend wiring yet — this is a UI demonstration."
                        : "अभी कोई बैकएंड कनेक्शन नहीं — यह UI प्रदर्शन है।"}
                    </p>
                  </div>
                </ActionDialog>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
