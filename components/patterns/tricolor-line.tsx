import React from "react";

/**
 * Official Indian Tricolor Accent Line.
 * 3px high strip: Saffron (#FF9933), White (#FFFFFF), Green (#138808).
 * Per specification: Sits directly under the header bar, used once,
 * never repeated as a decorative element elsewhere.
 */
export function TricolorLine({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`h-[3px] w-full flex select-none ${className}`}
    >
      <div className="flex-1 bg-[#FF9933]" />
      <div className="flex-1 bg-white border-y border-[#E2E5EA]/60" />
      <div className="flex-1 bg-[#138808]" />
    </div>
  );
}
