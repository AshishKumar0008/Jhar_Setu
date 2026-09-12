"use client";

import React, { useState } from "react";
import { Header } from "@/components/patterns/header";
import { PathBadge } from "@/components/patterns/path-badge";
import { TrustBadge } from "@/components/patterns/trust-badge";
import { PilotTabs, PilotTabContent } from "@/components/patterns/pilot-tabs";
import { EmptyState } from "@/components/patterns/empty-state";
import { FormField } from "@/components/patterns/form-field";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

import {
  CheckCircle2,
  FileText,
  HelpCircle,
  Layers,
  MapPin,
  SlidersHorizontal,
} from "lucide-react";

export default function HomePage() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [showToast, setShowToast] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [progressVal] = useState(65);

  const triggerCivicToast = () => {
    toast.success("Acknowledgement Receipt Generated", {
      description: "Case ID #JH-2026-09-0012 has been recorded in audit ledger.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA] text-[#111827]">
      {/* Official Government Header with 3px Tricolor Accent Line */}
      <Header currentLang={lang} onLanguageChange={setLang} />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
        {/* Hero Notice / Civic Introduction */}
        <section
          className="rounded-xl border border-[#E2E5EA] bg-white p-6 sm:p-8"
          aria-labelledby="hero-title"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <TrustBadge type="jharkhand-pilot" />
                <TrustBadge type="verified-institution" />
                <TrustBadge type="ai-suggestion" />
              </div>
              <h1
                id="hero-title"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111827]"
              >
                {lang === "en"
                  ? "JharSetu — Innovation Gap Exchange for Jharkhand"
                  : "झारसेतु — झारखंड नवाचार अंतर विनिमय मंच"}
              </h1>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                {lang === "en"
                  ? "A privacy-preserving, human-governed platform turning citizen problem reports into accountable civic outcomes: Existing Service Referral (Path A), Grievance Routing (Path B), or an Innovation Gap Certificate for field pilots (Path C)."
                  : "नागरिक समस्याओं को जवाबदेह परिणामों में बदलने वाला मानव-नियंत्रित मंच: सेवा रेफरल (पथ A), शिकायत निवारण (पथ B), अथवा नवाचार अंतर प्रमाण पत्र (पथ C)।"}
              </p>
            </div>

            {/* ONLY ONE Solid-filled Primary Button per view */}
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Button
                variant="default"
                size="lg"
                onClick={triggerCivicToast}
                className="min-h-[44px] bg-[#0F62B4] hover:bg-[#0F62B4]/90 text-white font-semibold text-sm px-6 shadow-xs rounded-md"
              >
                <FileText className="h-4 w-4 mr-2" />
                {lang === "en" ? "Report a Problem" : "समस्या दर्ज करें"}
              </Button>
            </div>
          </div>

          <Separator className="my-6 bg-[#E2E5EA]" />

          {/* Tri-path visual routing tokens */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-[#E2E5EA] bg-[#F7F8FA]">
              <div className="flex items-center justify-between mb-2">
                <PathBadge path="A" />
                <span className="text-[11px] font-mono text-[#6B7280]">JharSewa</span>
              </div>
              <h2 className="text-sm font-semibold text-[#111827]">
                Existing Service Referral
              </h2>
              <p className="text-xs text-[#6B7280] mt-1">
                Direct hand-off to pre-existing state programs and certified welfare schemes.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-[#E2E5EA] bg-[#F7F8FA]">
              <div className="flex items-center justify-between mb-2">
                <PathBadge path="B" />
                <span className="text-[11px] font-mono text-[#6B7280]">RCD / DWSD</span>
              </div>
              <h2 className="text-sm font-semibold text-[#111827]">
                Grievance Routing
              </h2>
              <p className="text-xs text-[#6B7280] mt-1">
                Accountable authority routing for infrastructure and standard departmental repairs.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-[#E2E5EA] bg-[#F7F8FA]">
              <div className="flex items-center justify-between mb-2">
                <PathBadge path="C" />
                <span className="text-[11px] font-mono text-[#6B7280]">IGC Certified</span>
              </div>
              <h2 className="text-sm font-semibold text-[#111827]">
                Innovation Gap Certificate
              </h2>
              <p className="text-xs text-[#6B7280] mt-1">
                Evidence-verified structural gaps activating university and industry pilot trials.
              </p>
            </div>
          </div>
        </section>

        {/* Blueprint Section 11 Exact Tab Integration */}
        <section
          className="rounded-xl border border-[#E2E5EA] bg-white p-6"
          aria-labelledby="pilot-heading"
        >
          <div className="mb-4">
            <h2 id="pilot-heading" className="text-lg font-bold text-[#111827]">
              Government Validation & Pilot Tracking (Screen 11 Blueprint)
            </h2>
            <p className="text-xs text-[#6B7280]">
              Tabs directly under page heading, full width on mobile, left-aligned on desktop.
            </p>
          </div>

          <PilotTabs defaultValue="overview">
            <PilotTabContent value="overview" className="pt-6 space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Decision / Intake Card */}
                <Card className="border-[#E2E5EA] shadow-none">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <PathBadge path="C" />
                      <TrustBadge type="pending" label="PILOT_PENDING" />
                    </div>
                    <CardTitle className="text-base font-semibold text-[#111827] mt-2">
                      Water Arsenic Remediation in Sahebganj
                    </CardTitle>
                    <CardDescription className="text-xs text-[#6B7280]">
                      Case ID: JH-2026-09-0012 • Sahibganj District
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs">
                    <div className="p-2.5 rounded bg-[#F7F8FA] border border-[#E2E5EA] space-y-1">
                      <div className="font-semibold text-[#111827]">
                        Verified Baseline
                      </div>
                      <div className="text-[#6B7280]">
                        0.08 mg/L arsenic concentration (WHO limit: 0.01 mg/L).
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-[#111827] mb-1">
                        Pilot Progress
                      </div>
                      <Progress value={progressVal} className="h-2" />
                      <div className="flex justify-between text-[11px] text-[#6B7280] mt-1">
                        <span>Milestone 2 of 4 complete</span>
                        <span>{progressVal}%</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 border-t border-[#E2E5EA] flex gap-2">
                    {/* Outline button only */}
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger
                        render={
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-[#E2E5EA] text-[#111827] hover:bg-[#F7F8FA] text-xs font-medium"
                          >
                            Inspect Decision Card
                          </Button>
                        }
                      />
                      <DialogContent className="sm:max-w-lg border-[#E2E5EA] rounded-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-base font-bold text-[#111827]">
                            Reviewer Decision Confirmation
                          </DialogTitle>
                          <DialogDescription className="text-xs text-[#6B7280]">
                            Verify evidence before issuing the Innovation Gap Certificate.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-3 py-2 text-xs">
                          <FormField
                            id="reason-code"
                            label="Mandatory Reason Code"
                            required
                            hint="Document why Path C was chosen over standard Path B repair."
                          >
                            <Input
                              id="reason-code"
                              defaultValue="NO_KNOWN_STATE_TECH_SOL"
                              className="border-[#E2E5EA] text-xs"
                            />
                          </FormField>
                          <FormField
                            id="decision-rationale"
                            label="Reviewer Rationale"
                            required
                          >
                            <Textarea
                              id="decision-rationale"
                              placeholder="Describe lab test corroboration and geographic clusters..."
                              className="border-[#E2E5EA] text-xs min-h-[80px]"
                            />
                          </FormField>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDialogOpen(false)}
                            className="border-[#E2E5EA]"
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => {
                              setDialogOpen(false);
                              toast.success("Decision recorded with audit hash");
                            }}
                            className="bg-[#0F62B4] text-white"
                          >
                            Confirm Decision
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>

                {/* Verification Queue Table */}
                <Card className="lg:col-span-2 border-[#E2E5EA] shadow-none">
                  <CardHeader className="pb-3 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-semibold text-[#111827]">
                        Active Case Queue
                      </CardTitle>
                      <CardDescription className="text-xs text-[#6B7280]">
                        Seeded demonstration cases with role and audit trail
                      </CardDescription>
                    </div>
                    {/* Outline button only */}
                    <Sheet>
                      <SheetTrigger
                        render={
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#E2E5EA] text-xs font-medium"
                          >
                            <SlidersHorizontal className="h-3.5 w-3.5 mr-1 text-[#0F62B4]" />
                            Filters
                          </Button>
                        }
                      />
                      <SheetContent className="border-l-[#E2E5EA] bg-white">
                        <SheetHeader>
                          <SheetTitle className="text-base font-bold text-[#111827]">
                            Queue Filters
                          </SheetTitle>
                          <SheetDescription className="text-xs text-[#6B7280]">
                            Filter reports by district, path, or severity.
                          </SheetDescription>
                        </SheetHeader>
                        <div className="space-y-4 py-6 text-xs">
                          <FormField id="district-select" label="District" required={false}>
                            <Select defaultValue="sahibganj">
                              <SelectTrigger className="border-[#E2E5EA] text-xs">
                                <SelectValue placeholder="Select district" />
                              </SelectTrigger>
                              <SelectContent className="border-[#E2E5EA]">
                                <SelectItem value="sahibganj">Sahibganj</SelectItem>
                                <SelectItem value="ranchi">Ranchi</SelectItem>
                                <SelectItem value="dhanbad">Dhanbad</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormField>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-b-[#E2E5EA] bg-[#F7F8FA]">
                          <TableHead className="text-xs font-semibold text-[#111827]">Case ID</TableHead>
                          <TableHead className="text-xs font-semibold text-[#111827]">Location</TableHead>
                          <TableHead className="text-xs font-semibold text-[#111827]">Path</TableHead>
                          <TableHead className="text-xs font-semibold text-[#111827]">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="border-b-[#E2E5EA] hover:bg-[#F7F8FA]">
                          <TableCell className="font-mono text-xs font-medium">JH-2026-09-0012</TableCell>
                          <TableCell className="text-xs">Sahibganj (Barharwa)</TableCell>
                          <TableCell><PathBadge path="C" /></TableCell>
                          <TableCell><TrustBadge type="pending" label="PILOT_PENDING" /></TableCell>
                        </TableRow>
                        <TableRow className="border-b-[#E2E5EA] hover:bg-[#F7F8FA]">
                          <TableCell className="font-mono text-xs font-medium">JH-2026-09-0044</TableCell>
                          <TableCell className="text-xs">Ranchi (Ring Road)</TableCell>
                          <TableCell><PathBadge path="B" /></TableCell>
                          <TableCell><TrustBadge type="confirmed" label="RESOLVED" /></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </PilotTabContent>

            <PilotTabContent value="timeline" className="pt-6">
              <div className="p-6 rounded-lg border border-[#E2E5EA] bg-white space-y-4">
                <h3 className="text-sm font-bold text-[#111827]">State Transition Audit Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-xs">
                    <div className="h-6 w-6 rounded-full bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center font-bold">✓</div>
                    <div>
                      <div className="font-semibold text-[#111827]">REPORT_SUBMITTED → AI_PROCESSED</div>
                      <div className="text-[#6B7280]">Whisper transcription and PII redaction verified without errors.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-xs">
                    <div className="h-6 w-6 rounded-full bg-[#0F62B4]/10 text-[#0F62B4] flex items-center justify-center font-bold">2</div>
                    <div>
                      <div className="font-semibold text-[#111827]">REVIEWER_SIGN_OFF</div>
                      <div className="text-[#6B7280]">Two human reviewers recorded IGC eligibility sign-off with reason code.</div>
                    </div>
                  </div>
                </div>
              </div>
            </PilotTabContent>

            <PilotTabContent value="measurements" className="pt-6">
              <div className="p-4 rounded-lg border border-[#E2E5EA] bg-white">
                <h3 className="text-sm font-semibold text-[#111827] mb-2">Field Sensor Measurements</h3>
                <p className="text-xs text-[#6B7280] mb-4">Baseline: 0.08 mg/L arsenic. Current pilot reading: 0.008 mg/L.</p>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4 bg-[#E2E5EA]" />
                  <Skeleton className="h-4 w-1/2 bg-[#E2E5EA]" />
                </div>
              </div>
            </PilotTabContent>

            <PilotTabContent value="evidence" className="pt-6">
              <ScrollArea className="h-32 rounded-md border border-[#E2E5EA] p-4 bg-white">
                <div className="text-xs space-y-2 text-[#6B7280]">
                  <p className="font-medium text-[#111827]">Uploaded Lab Reports (Signed Object Storage):</p>
                  <p>1. sahibganj_water_test_batch_01.pdf (SHA-256: 7f83b165...)</p>
                  <p>2. field_filter_installation_photo_01.jpg (Exif Geotag: 25.042°N, 87.831°E)</p>
                </div>
              </ScrollArea>
            </PilotTabContent>

            <PilotTabContent value="risks-issues" className="pt-6">
              <Accordion className="w-full bg-white border border-[#E2E5EA] rounded-md px-4">
                <AccordionItem value="item-1" className="border-b-[#E2E5EA]">
                  <AccordionTrigger className="text-xs font-semibold text-[#111827]">
                    Seasonal Monsoon Silt Clogging
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-[#6B7280]">
                    Pre-filtration mesh cleanout protocol scheduled bi-weekly by BIT Mesra pilot team.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </PilotTabContent>

            <PilotTabContent value="commitments" className="pt-6">
              <div className="p-4 rounded-lg border border-[#E2E5EA] bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#111827]">Tata Steel Foundation (CSR)</span>
                  <TrustBadge type="confirmed" label="CONFIRMED: ₹15,00,000" />
                </div>
                <p className="text-xs text-[#6B7280]">
                  Direct commitment ledger entry locked with irrevocable audit token.
                </p>
              </div>
            </PilotTabContent>

            <PilotTabContent value="evaluation" className="pt-6">
              <div className="p-4 rounded-lg border border-[#E2E5EA] bg-white">
                <h3 className="text-xs font-semibold text-[#111827] mb-1">State Evaluation Matrix</h3>
                <p className="text-xs text-[#6B7280]">
                  Target cost: &lt;₹0.15 / liter. Pilot achieved: ₹0.09 / liter with 99.2% uptime.
                </p>
              </div>
            </PilotTabContent>

            <PilotTabContent value="audit" className="pt-6">
              <EmptyState
                title="Immutable Audit Ledger"
                description="All state transitions, AI suggested confidence scores, and reviewer signatures are cryptographically bound."
              />
            </PilotTabContent>
          </PilotTabs>
        </section>
      </main>

      {/* Official Government Footer */}
      <footer className="border-t border-[#E2E5EA] bg-white py-6 mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#111827]">JharSetu</span>
            <span>• Guidelines for Indian Government Websites (GIGW 3.0) Baseline</span>
          </div>
          <p>
            Designed for SIH 26043 Selection Round • Privacy-Preserving Civic & Innovation Exchange
          </p>
        </div>
      </footer>
    </div>
  );
}
