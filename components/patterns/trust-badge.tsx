import React from "react";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export type TrustCueType =
  | "jharkhand-pilot"
  | "verified-institution"
  | "official-handoff"
  | "ai-suggestion"
  | "pending"
  | "confirmed";

interface TrustBadgeProps {
  type: TrustCueType;
  label?: string;
  className?: string;
}

export function TrustBadge({ type, label, className = "" }: TrustBadgeProps) {
  switch (type) {
    case "jharkhand-pilot":
      return (
        <Badge
          variant="outline"
          className={`inline-flex items-center gap-1.5 border-[#0F62B4]/30 bg-[#0F62B4]/5 text-[#0F62B4] font-medium text-xs px-2 py-0.5 rounded-md ${className}`}
        >
          <ShieldCheck className="h-3.5 w-3.5 text-[#0F62B4]" />
          <span>{label || "Government of Jharkhand pilot"}</span>
        </Badge>
      );

    case "verified-institution":
      return (
        <Badge
          variant="outline"
          className={`inline-flex items-center gap-1.5 border-[#16A34A]/30 bg-[#16A34A]/5 text-[#16A34A] font-medium text-xs px-2 py-0.5 rounded-md ${className}`}
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" />
          <span>{label || "Verified institution"}</span>
        </Badge>
      );

    case "official-handoff":
      return (
        <Badge
          variant="outline"
          className={`inline-flex items-center gap-1.5 border-[#E2E5EA] bg-[#F7F8FA] text-text-primary font-medium text-xs px-2 py-0.5 rounded-md ${className}`}
        >
          <ShieldCheck className="h-3.5 w-3.5 text-text-muted" />
          <span>{label || "Official hand-off"}</span>
        </Badge>
      );

    case "ai-suggestion":
      return (
        <Badge
          variant="outline"
          className={`inline-flex items-center gap-1.5 border-[#E2E5EA] bg-white text-text-muted font-medium text-xs px-2 py-0.5 rounded-md ${className}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#D97706]" />
          <span>{label || "AI suggestion (Requires human verification)"}</span>
        </Badge>
      );

    case "pending":
      return (
        <Badge
          variant="outline"
          className={`inline-flex items-center gap-1 border-[#D97706]/40 bg-[#D97706]/10 text-[#D97706] font-semibold text-xs px-2 py-0.5 rounded-md ${className}`}
        >
          <Clock className="h-3 w-3" />
          <span>{label || "PENDING"}</span>
        </Badge>
      );

    case "confirmed":
      return (
        <Badge
          variant="outline"
          className={`inline-flex items-center gap-1 border-[#16A34A]/40 bg-[#16A34A]/10 text-[#16A34A] font-semibold text-xs px-2 py-0.5 rounded-md ${className}`}
        >
          <CheckCircle2 className="h-3 w-3" />
          <span>{label || "CONFIRMED"}</span>
        </Badge>
      );

    default:
      return null;
  }
}
