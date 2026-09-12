import React from "react";
import { LucideIcon, Inbox } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = "No records found",
  description,
  icon: Icon = Inbox,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-[#E2E5EA] bg-white ${className}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F8FA] border border-[#E2E5EA] text-text-muted mb-3">
        <Icon className="h-6 w-6 text-text-muted" aria-hidden="true" />
      </div>
      <h3 className="text-sm font-semibold text-text-primary mb-1">{title}</h3>
      <p className="text-xs text-text-muted max-w-sm mb-4 leading-relaxed">
        {description}
      </p>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
