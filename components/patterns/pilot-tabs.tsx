"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

/**
 * Blueprint Section 11 Exact Tab Labels:
 * Overview, Timeline, Measurements, Evidence, Risks & issues, Commitments, Evaluation, Audit.
 * Positioned full width on mobile, left-aligned on desktop, directly under page heading.
 */
export const PILOT_TAB_LABELS = [
  { value: "overview", label: "Overview" },
  { value: "timeline", label: "Timeline" },
  { value: "measurements", label: "Measurements" },
  { value: "evidence", label: "Evidence" },
  { value: "risks-issues", label: "Risks & issues" },
  { value: "commitments", label: "Commitments" },
  { value: "evaluation", label: "Evaluation" },
  { value: "audit", label: "Audit" },
] as const;

export type PilotTabValue = (typeof PILOT_TAB_LABELS)[number]["value"];

interface PilotTabsProps {
  defaultValue?: PilotTabValue;
  value?: PilotTabValue;
  onValueChange?: (value: PilotTabValue) => void;
  children?: React.ReactNode;
  className?: string;
}

export function PilotTabs({
  defaultValue = "overview",
  value,
  onValueChange,
  children,
  className = "",
}: PilotTabsProps) {
  return (
    <Tabs
      defaultValue={defaultValue}
      value={value}
      onValueChange={(val) => onValueChange?.(val as PilotTabValue)}
      className={`w-full ${className}`}
    >
      <div className="w-full border-b border-[#E2E5EA] overflow-x-auto scrollbar-none">
        <TabsList
          variant="line"
          className="flex h-11 w-full justify-start gap-1 p-0 bg-transparent text-text-muted"
        >
          {PILOT_TAB_LABELS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="h-11 px-3.5 py-2 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-[#0F62B4] data-[state=active]:text-[#0F62B4] hover:text-text-primary rounded-none transition-colors whitespace-nowrap"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {children}
    </Tabs>
  );
}

export { TabsContent as PilotTabContent };
