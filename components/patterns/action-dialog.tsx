"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface ActionDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  isConfirmLoading?: boolean;
  confirmVariant?: "default" | "destructive" | "outline";
  footerActions?: React.ReactNode;
  className?: string;
  maxWidthClass?: string;
}

/**
 * Reusable Civic Action Dialog Pattern.
 * Follows context/ui-context.md styling:
 * - rounded-2xl overlay
 * - high-contrast civic tokens
 * - one primary action button per dialog
 * - reusable shape for confirmation flows (e.g., Submit decision, Issue certificate, Pilot readiness approval)
 */
export function ActionDialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  confirmLabel = "Confirm / पुष्टि करें",
  cancelLabel = "Cancel / रद्द करें",
  onConfirm,
  onCancel,
  isConfirmLoading = false,
  confirmVariant = "default",
  footerActions,
  className = "",
  maxWidthClass = "sm:max-w-lg",
}: ActionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger render={trigger as React.ReactElement} />}

      <DialogContent
        className={`rounded-2xl border border-[#E2E5EA] bg-white p-6 shadow-xl ${maxWidthClass} ${className}`}
      >
        <DialogHeader className="space-y-2 text-left">
          <DialogTitle className="text-lg font-bold tracking-tight text-[#111827]">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-sm text-[#6B7280] leading-relaxed">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {children && <div className="py-2 text-sm text-[#111827]">{children}</div>}

        <DialogFooter className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 pt-4 border-t border-[#E2E5EA] bg-transparent -mx-6 -mb-6 px-6 pb-6">
          {footerActions ? (
            footerActions
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="min-h-[36px] border-[#E2E5EA] text-[#111827] hover:bg-[#F7F8FA] font-medium text-xs px-4"
              >
                {cancelLabel}
              </Button>

              <Button
                type="button"
                variant={confirmVariant === "destructive" ? "destructive" : "default"}
                onClick={onConfirm}
                disabled={isConfirmLoading}
                className={`min-h-[36px] font-semibold text-xs px-4 ${
                  confirmVariant === "default"
                    ? "bg-[#0F62B4] hover:bg-[#0D5299] text-white"
                    : confirmVariant === "destructive"
                    ? "bg-[#DC2626] hover:bg-[#B91C1C] text-white"
                    : "border-[#E2E5EA] text-[#111827]"
                }`}
              >
                {isConfirmLoading ? "Processing..." : confirmLabel}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { ActionDialog as ConfirmDialog };
