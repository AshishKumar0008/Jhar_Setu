"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export interface TabDefinition {
  value: string;
  label: string;
  count?: number | string;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
}

/**
 * Default tab set for the government pilot screen (Section 11 of blueprint):
 * Overview, Timeline, Measurements, Evidence, Risks & issues, Commitments, Evaluation, Audit.
 */
export const PILOT_DETAIL_TABS: TabDefinition[] = [
  { value: "overview", label: "Overview" },
  { value: "timeline", label: "Timeline" },
  { value: "measurements", label: "Measurements" },
  { value: "evidence", label: "Evidence" },
  { value: "risks-issues", label: "Risks & issues" },
  { value: "commitments", label: "Commitments" },
  { value: "evaluation", label: "Evaluation" },
  { value: "audit", label: "Audit" },
];

export interface DetailTabsProps {
  tabs?: TabDefinition[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
  listClassName?: string;
}

/**
 * Reusable Detail Tabs Pattern wrapping shadcn Tabs.
 * Sits directly under a page heading: full width on mobile, left-aligned on desktop (never centered).
 * Accepts dynamic tabs list for reuse across pilots, case details, verification queues, etc.
 */
export function DetailTabs({
  tabs = PILOT_DETAIL_TABS,
  defaultValue,
  value,
  onValueChange,
  children,
  className = "",
  listClassName = "",
}: DetailTabsProps) {
  const initialValue = defaultValue || (tabs.length > 0 ? tabs[0].value : "");

  return (
    <Tabs
      defaultValue={initialValue}
      value={value}
      onValueChange={onValueChange}
      className={`w-full ${className}`}
    >
      <div className="w-full border-b border-[#E2E5EA] overflow-x-auto scrollbar-none">
        <TabsList
          variant="line"
          className={`flex h-11 w-full justify-start gap-1 p-0 bg-transparent text-[#6B7280] ${listClassName}`}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                disabled={tab.disabled}
                className="group/tab h-11 px-3.5 py-2 text-sm font-medium border-b-2 border-transparent data-active:border-[#0F62B4] data-active:text-[#0F62B4] data-active:font-semibold hover:text-[#111827] rounded-none transition-colors whitespace-nowrap flex items-center gap-2"
              >
                {Icon && <Icon className="h-4 w-4 shrink-0" />}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="ml-1 rounded-full bg-[#E2E5EA] px-1.5 py-0.5 text-[10px] font-bold text-[#111827] group-data-active/tab:bg-[#0F62B4]/10 group-data-active/tab:text-[#0F62B4]">
                    {tab.count}
                  </span>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>
      {children}
    </Tabs>
  );
}

export { TabsContent as DetailTabContent };
