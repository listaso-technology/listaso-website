import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons/Icon";
import { cx } from "@/lib/utils/cx";

type Status = "success" | "warning" | "error";

const statusStyles: Record<Status, { icon: IconName; badge: string }> = {
  success: { icon: "success", badge: "bg-status-success text-fg-on-status" },
  warning: { icon: "warning", badge: "bg-status-warning text-fg-on-status" },
  error: { icon: "error", badge: "bg-status-error text-fg-on-error" },
};

type StatusMessageProps = {
  status: Status;
  /** Visible title. It should name the state in words, e.g. "Saved". */
  title: string;
  children?: ReactNode;
  className?: string;
};

/**
 * Static status message. Meaning never relies on color: each state has its
 * own icon shape and a visible title. For messages that appear after an
 * action, wrap the region in a live region where it is rendered.
 */
export function StatusMessage({ status, title, children, className }: StatusMessageProps) {
  const { icon, badge } = statusStyles[status];

  return (
    <div
      className={cx(
        "flex items-start gap-4 rounded-md border border-line-subtle bg-surface-raised p-4",
        className,
      )}
    >
      <span
        className={cx(
          "flex size-10 shrink-0 items-center justify-center rounded-full",
          "forced-colors:border forced-colors:border-[CanvasText]",
          badge,
        )}
      >
        <Icon name={icon} size={24} />
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-body font-semibold text-fg-default">{title}</p>
        {children ? <div className="text-small text-fg-muted">{children}</div> : null}
      </div>
    </div>
  );
}
