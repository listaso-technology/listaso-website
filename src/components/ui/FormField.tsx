import type { InputHTMLAttributes } from "react";
import { Icon } from "@/components/icons/Icon";
import { cx } from "@/lib/utils/cx";

type FormFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  /** Required: links the label, hint and error to the input. */
  id: string;
  label: string;
  hint?: string;
  /** When set, the field is marked invalid and the message is announced with it. */
  error?: string;
  /** Visible marker appended to the label of required fields, in the page language. */
  requiredLabel?: string;
};

/** Labelled text input with hint and error states. */
export function FormField({
  id,
  label,
  hint,
  error,
  required,
  requiredLabel = "(required)",
  className,
  ...rest
}: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-small font-semibold text-fg-default">
        {label}
        {required ? <span className="font-normal text-fg-muted"> {requiredLabel}</span> : null}
      </label>
      {hint ? (
        <p id={hintId} className="text-small text-fg-muted">
          {hint}
        </p>
      ) : null}
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cx(
          "min-h-12 w-full rounded-sm bg-surface-raised px-4 text-body text-fg-default",
          "placeholder:text-fg-muted",
          "transition-colors duration-(--listaso-duration-fast) ease-(--listaso-ease-standard)",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-2 border-status-error"
            : "border border-line-control hover:border-fg-default disabled:hover:border-line-control",
        )}
        {...rest}
      />
      {error ? (
        <p id={errorId} className="flex items-start gap-2 text-small text-status-error">
          <Icon name="error" size={20} className="shrink-0" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}
