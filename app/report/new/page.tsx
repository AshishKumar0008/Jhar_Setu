"use client";

import React, { useState, useCallback } from "react";
import { UtilityBar } from "@/components/shell/utility-bar";
import { AppNavbar } from "@/components/shell/app-navbar";
import { CitizenLeftRail } from "@/components/patterns/citizen-left-rail";
import { Progress } from "@/components/ui/progress";
import {
  Mic,
  PenLine,
  MapPin,
  Map,
  Home,
  Upload,
  Phone,
  ArrowRight,
  Check,
} from "lucide-react";

const CATEGORIES = [
  "Water",
  "Roads",
  "Health",
  "Agriculture",
  "Education",
  "Environment",
  "Other",
  "Not sure",
] as const;

export default function ReportWizardPage() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;
  const progressPercent = (currentStep / totalSteps) * 100;

  // Form state
  const [inputMode, setInputMode] = useState<"voice" | "text" | null>(null);
  const [description, setDescription] = useState("");
  const [locationMethod, setLocationMethod] = useState<
    "gps" | "map" | "village" | null
  >(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mobileNumber, setMobileNumber] = useState("");

  const isStep1Complete =
    description.trim().length > 0 &&
    selectedCategory !== null &&
    locationMethod !== null;

  const handleSubmit = useCallback(() => {
    // Future: submit to API
  }, []);

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
          <CitizenLeftRail activePage="report" lang={lang} />

          {/* ── MAIN CONTENT ── */}
          <main id="main-content" className="flex-1 min-w-0">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Primary form column */}
              <div className="flex-1 min-w-0 space-y-8">
                {/* Eyebrow + Heading */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--action-report)] mb-2">
                    NEW REPORT / नयी शिकायत दर्ज करें
                  </p>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] leading-tight">
                    {lang === "en"
                      ? "Submit a Local Problem"
                      : "स्थानीय समस्या दर्ज करें"}
                  </h1>
                  <p className="text-sm text-[var(--accent-primary)] font-medium mt-1">
                    {lang === "en"
                      ? "स्थानीय समस्या दर्ज करें"
                      : "Submit a Local Problem"}
                  </p>
                </div>

                {/* Step indicator + Progress bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[var(--text-primary)]">
                      {currentStep === 1
                        ? "Step 1 of 2: Report Details (चरण 1: रिपोर्ट विवरण)"
                        : "Step 2 of 2: Review & Submit (चरण 2: समीक्षा और प्रस्तुत करें)"}
                    </span>
                    <span className="text-[var(--text-muted)]">
                      {Math.round(progressPercent)}%
                    </span>
                  </div>
                  <Progress
                    value={progressPercent}
                    className="h-2 bg-[var(--border-default)]"
                  />
                </div>

                {/* ── STEP 1: Report Details ── */}
                {currentStep === 1 && (
                  <div className="space-y-8">
                    {/* Input mode toggle */}
                    <fieldset>
                      <legend className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                        {lang === "en"
                          ? "How would you like to report?"
                          : "आप कैसे शिकायत दर्ज करना चाहते हैं?"}
                      </legend>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setInputMode("voice")}
                          className={`flex flex-col items-center gap-2 p-5 rounded-xl border-2 text-sm font-semibold transition-all ${
                            inputMode === "voice"
                              ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-white shadow-md"
                              : "border-[var(--border-default)] bg-white text-[var(--text-primary)] hover:border-[var(--accent-primary)]/50"
                          }`}
                        >
                          <Mic className="h-6 w-6" />
                          <span>
                            {lang === "en" ? "Hold to Speak" : "बोलने के लिए दबाएं"}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setInputMode("text")}
                          className={`flex flex-col items-center gap-2 p-5 rounded-xl border-2 text-sm font-semibold transition-all ${
                            inputMode === "text"
                              ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-white shadow-md"
                              : "border-[var(--border-default)] bg-white text-[var(--text-primary)] hover:border-[var(--accent-primary)]/50"
                          }`}
                        >
                          <PenLine className="h-6 w-6" />
                          <span>
                            {lang === "en"
                              ? "Type Your Problem"
                              : "समस्या लिखें"}
                          </span>
                        </button>
                      </div>
                    </fieldset>

                    {/* Voice recording area (placeholder) */}
                    {inputMode === "voice" && (
                      <div className="flex flex-col items-center gap-3 p-8 rounded-xl border-2 border-dashed border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/5">
                        <div className="h-16 w-16 rounded-full bg-[var(--accent-primary)] flex items-center justify-center shadow-lg animate-pulse">
                          <Mic className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-sm font-medium text-[var(--accent-primary)]">
                          {lang === "en"
                            ? "Tap and hold to record your problem"
                            : "अपनी समस्या रिकॉर्ड करने के लिए दबाकर रखें"}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          {lang === "en"
                            ? "Your voice will be transcribed automatically"
                            : "आपकी आवाज़ स्वचालित रूप से लिखित होगी"}
                        </p>
                      </div>
                    )}

                    {/* What happened? (textarea) */}
                    <div className="space-y-2">
                      <label
                        htmlFor="description"
                        className="text-sm font-semibold text-[var(--text-primary)]"
                      >
                        {lang === "en" ? "What happened?" : "क्या हुआ?"}
                      </label>
                      <textarea
                        id="description"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={
                          lang === "en"
                            ? "Describe the problem you are facing… / आप जिस समस्या का सामना कर रहे हैं उसका वर्णन करें…"
                            : "आप जिस समस्या का सामना कर रहे हैं उसका वर्णन करें… / Describe the problem you are facing…"
                        }
                        className="w-full rounded-xl border border-[var(--border-default)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent resize-none"
                      />
                    </div>

                    {/* Where did this happen? */}
                    <fieldset>
                      <legend className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                        {lang === "en"
                          ? "Where did this happen?"
                          : "यह कहाँ हुआ?"}
                      </legend>
                      <div className="flex flex-wrap gap-2.5">
                        {[
                          {
                            id: "gps" as const,
                            icon: MapPin,
                            label:
                              lang === "en"
                                ? "Use My Location"
                                : "मेरा स्थान उपयोग करें",
                          },
                          {
                            id: "map" as const,
                            icon: Map,
                            label:
                              lang === "en"
                                ? "Choose on Map"
                                : "मानचित्र पर चुनें",
                          },
                          {
                            id: "village" as const,
                            icon: Home,
                            label:
                              lang === "en"
                                ? "Use Village Name Only"
                                : "केवल गाँव का नाम",
                          },
                        ].map((loc) => (
                          <button
                            key={loc.id}
                            type="button"
                            onClick={() => setLocationMethod(loc.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                              locationMethod === loc.id
                                ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-semibold"
                                : "border-[var(--border-default)] bg-white text-[var(--text-primary)] hover:border-[var(--accent-primary)]/40"
                            }`}
                          >
                            <loc.icon className="h-4 w-4 shrink-0" />
                            {loc.label}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    {/* Category chip group */}
                    <fieldset>
                      <legend className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                        {lang === "en" ? "Category" : "श्रेणी"}
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3.5 py-2 rounded-full border text-sm font-medium transition-all ${
                              selectedCategory === cat
                                ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-white shadow-sm"
                                : "border-[var(--border-default)] bg-white text-[var(--text-primary)] hover:border-[var(--accent-primary)]/40"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    {/* Attach Photo */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[var(--text-primary)]">
                        {lang === "en"
                          ? "Attach Photo (Optional)"
                          : "फोटो संलग्न करें (वैकल्पिक)"}
                      </label>
                      <div className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-dashed border-[var(--border-default)] bg-[var(--bg-base)] hover:border-[var(--accent-primary)]/40 transition-colors cursor-pointer">
                        <Upload className="h-8 w-8 text-[var(--text-muted)]" />
                        <p className="text-sm text-[var(--text-muted)]">
                          {lang === "en"
                            ? "Drag & drop or tap to upload"
                            : "खींचें और छोड़ें या अपलोड करने के लिए टैप करें"}
                        </p>
                        <p className="text-[11px] text-[var(--text-muted)]">
                          JPG, PNG up to 10 MB
                        </p>
                      </div>
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-2">
                      <label
                        htmlFor="mobile"
                        className="text-sm font-semibold text-[var(--text-primary)]"
                      >
                        {lang === "en"
                          ? "Mobile Number for SMS Tracking"
                          : "SMS ट्रैकिंग के लिए मोबाइल नंबर"}
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center px-3 py-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] text-sm text-[var(--text-muted)] font-medium shrink-0">
                          +91
                        </span>
                        <input
                          id="mobile"
                          type="tel"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          placeholder="9876543210"
                          maxLength={10}
                          className="flex-1 rounded-xl border border-[var(--border-default)] bg-white px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent"
                        />
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)]">
                        {lang === "en"
                          ? "You'll receive SMS updates on your report status. No spam, ever."
                          : "आपको अपनी शिकायत की स्थिति पर SMS अपडेट मिलेंगे। कोई स्पैम नहीं।"}
                      </p>
                    </div>

                    {/* Next step button */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (isStep1Complete) setCurrentStep(2);
                        }}
                        disabled={!isStep1Complete}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                          isStep1Complete
                            ? "bg-[var(--action-report)] text-white shadow-md hover:shadow-lg"
                            : "bg-[var(--border-default)] text-[var(--text-muted)] cursor-not-allowed"
                        }`}
                      >
                        {lang === "en" ? "Continue to Review" : "समीक्षा के लिए आगे बढ़ें"}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: Review & Submit ── */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-bold text-[var(--text-primary)]">
                      {lang === "en"
                        ? "Check your report"
                        : "अपनी शिकायत की जाँच करें"}
                    </h2>

                    {/* Read-only summary */}
                    <div className="rounded-xl border border-[var(--border-default)] bg-white divide-y divide-[var(--border-default)]">
                      <div className="px-5 py-3.5 flex items-center justify-between">
                        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                          Problem Summary
                        </span>
                        <span className="text-sm text-[var(--text-primary)]">
                          {description.slice(0, 80)}
                          {description.length > 80 ? "…" : ""}
                        </span>
                      </div>
                      <div className="px-5 py-3.5 flex items-center justify-between">
                        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                          Category
                        </span>
                        <span className="text-sm text-[var(--text-primary)] font-medium">
                          {selectedCategory || "—"}
                        </span>
                      </div>
                      <div className="px-5 py-3.5 flex items-center justify-between">
                        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                          Location
                        </span>
                        <span className="text-sm text-[var(--text-primary)] capitalize">
                          {locationMethod === "gps"
                            ? "GPS Location"
                            : locationMethod === "map"
                            ? "Map Selection"
                            : locationMethod === "village"
                            ? "Village Name"
                            : "—"}
                        </span>
                      </div>
                      <div className="px-5 py-3.5 flex items-center justify-between">
                        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                          Contact
                        </span>
                        <span className="text-sm text-[var(--text-primary)]">
                          +91 {mobileNumber || "—"}
                        </span>
                      </div>
                      <div className="px-5 py-3.5 flex items-center justify-between">
                        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                          Evidence
                        </span>
                        <span className="text-sm text-[var(--text-muted)] italic">
                          No photo attached
                        </span>
                      </div>
                    </div>

                    {/* Footer actions */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--action-report)] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                      >
                        <Check className="h-4 w-4" />
                        {lang === "en"
                          ? "Submit Report"
                          : "शिकायत दर्ज करें"}
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--border-default)] bg-white text-[var(--text-primary)] text-sm font-medium hover:bg-[var(--bg-base)] transition-colors"
                      >
                        {lang === "en" ? "Save Draft" : "ड्राफ्ट सहेजें"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] underline underline-offset-4 ml-2"
                      >
                        {lang === "en" ? "← Back to edit" : "← वापस संपादित करें"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* ── SIDE PANEL (desktop) — Grievance Resolution Rules ── */}
              <aside className="hidden lg:block w-72 xl:w-80 shrink-0">
                <div className="sticky top-24 rounded-xl border border-[var(--border-default)] bg-white p-5 space-y-4">
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">
                    {lang === "en"
                      ? "Grievance Resolution Rules"
                      : "शिकायत निवारण नियम"}
                  </h3>
                  <ul className="space-y-3 text-xs text-[var(--text-muted)] leading-relaxed">
                    <li className="flex gap-2">
                      <span className="text-[var(--accent-primary)] font-bold shrink-0">
                        •
                      </span>
                      <span>
                        {lang === "en"
                          ? "Bilingual support: All reports are accepted in Hindi and English."
                          : "द्विभाषी सहायता: सभी शिकायतें हिंदी और अंग्रेजी में स्वीकार की जाती हैं।"}
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[var(--accent-primary)] font-bold shrink-0">
                        •
                      </span>
                      <span>
                        {lang === "en"
                          ? "BDO assignment: Reports are automatically routed to the responsible Block Development Officer."
                          : "BDO नियुक्ति: शिकायतें स्वचालित रूप से जिम्मेदार खंड विकास पदाधिकारी को भेजी जाती हैं।"}
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[var(--accent-primary)] font-bold shrink-0">
                        •
                      </span>
                      <span>
                        {lang === "en"
                          ? "Official redressal SLA: Government commits to initial response within 7 working days."
                          : "आधिकारिक निवारण SLA: सरकार 7 कार्य दिवसों में प्रारंभिक प्रतिक्रिया देने के लिए प्रतिबद्ध है।"}
                      </span>
                    </li>
                  </ul>
                  <div className="pt-3 border-t border-[var(--border-default)]">
                    <p className="text-[11px] text-[var(--text-muted)]">
                      {lang === "en"
                        ? "For administrative support, contact the JharSetu helpdesk."
                        : "प्रशासनिक सहायता के लिए, झारसेतु हेल्पडेस्क से संपर्क करें।"}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-[var(--text-muted)]">
                      <Phone className="h-3.5 w-3.5 shrink-0" />
                      <span>
                        <strong className="text-[var(--text-primary)]">
                          181
                        </strong>{" "}
                        — Public Grievance
                      </span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
