import React from "react";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  id,
  label,
  required = false,
  hint,
  error,
  children,
  className = "",
}: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-baseline justify-between">
        <label
          htmlFor={id}
          className="text-xs font-semibold text-text-primary flex items-center gap-1"
        >
          <span>{label}</span>
          {required ? (
            <span className="text-[11px] font-medium text-[#DC2626]">
              (required)
            </span>
          ) : (
            <span className="text-[11px] font-normal text-text-muted">
              (optional)
            </span>
          )}
        </label>
      </div>

      {children}

      {hint && !error && (
        <p id={`${id}-hint`} className="text-[11px] text-text-muted">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-[11px] font-medium text-[#DC2626]"
        >
          {error}
        </p>
      )}
    </div>
  );
}
