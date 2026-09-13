import {
  TrustBadge as BaseTrustBadge,
  AISuggestionBadge,
  StatusBadge,
} from "./status-badge";

export type TrustCueType =
  | "jharkhand-pilot"
  | "verified-institution"
  | "official-handoff"
  | "ai-suggestion"
  | "pending"
  | "confirmed";

interface LegacyTrustBadgeProps {
  type: TrustCueType;
  label?: string;
  className?: string;
}

/**
 * Trust and Verification Badge wrapper maintained for backwards-compatibility.
 * Internally utilizes the unified status-badge token system.
 */
export function TrustBadge({ type, label, className = "" }: LegacyTrustBadgeProps) {
  if (type === "ai-suggestion") {
    return <AISuggestionBadge label={label} className={className} />;
  }

  if (type === "pending") {
    return <StatusBadge status="PILOT_PENDING" label={label || "PENDING"} className={className} />;
  }

  if (type === "confirmed") {
    return <StatusBadge status="CONFIRMED" label={label || "CONFIRMED"} className={className} />;
  }

  return <BaseTrustBadge type={type} label={label} className={className} />;
}

export { AISuggestionBadge, BaseTrustBadge };
