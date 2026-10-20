import type { ReactNode } from "react";
import { Icon } from "@/components/icons/Icon";
import { cx } from "@/lib/utils/cx";
import dossier from "./dossier.module.css";

export type DossierRow = {
  label: string;
  /** Right-hand status in brackets, e.g. the response time. */
  tag?: string;
  /** Show a check mark instead of a tag. */
  check?: boolean;
};

type DossierBoxProps = {
  title: string;
  /** Header status in brackets. */
  status?: string;
  rows?: readonly DossierRow[];
  /** Free content instead of (or after) rows. */
  children?: ReactNode;
  /** Render the rows as a description list (label and value pairs). */
  asDescriptionList?: boolean;
  className?: string;
};

/**
 * Framed fact box (ddark.dev's "Arsenal"): title and bracketed status, rows
 * with bracketed tags, and an accent bar that fills once when revealed.
 * Uses tokens, so it reads the same in light and dark themes.
 */
export function DossierBox({ title, status, rows = [], children, asDescriptionList = false, className }: DossierBoxProps) {
  const rowClass = "flex items-start justify-between gap-6 py-2 text-small font-semibold tracking-wide text-fg-default uppercase";

  return (
    <div data-reveal="fade" className={cx("border-2 border-fg-heading bg-surface-page p-5 sm:p-6", className)}>
      <div className="flex items-center justify-between gap-4 border-b border-line-subtle pb-4">
        <p className="text-small font-bold tracking-widest text-fg-heading uppercase">{title}</p>
        {status ? <p className={cx(dossier.bracket, "text-small font-semibold text-fg-accent")}>{status}</p> : null}
      </div>
      {rows.length ? (
        asDescriptionList ? (
          <dl className="flex flex-col py-3">
            {rows.map((row) => (
              <div key={row.label} className={rowClass}>
                <dt>{row.label}</dt>
                <dd className={cx(dossier.bracket, "shrink-0 text-right font-normal tracking-normal text-fg-muted normal-case")}>
                  {row.tag}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <ul className="flex flex-col py-3">
            {rows.map((row) => (
              <li key={row.label} className={rowClass}>
                <span>{row.label}</span>
                {row.check ? (
                  <Icon name="check" size={16} className="shrink-0 text-icon-accent" />
                ) : row.tag ? (
                  <span className={cx(dossier.bracket, "shrink-0 font-normal tracking-normal text-fg-muted normal-case")}>
                    {row.tag}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        )
      ) : null}
      {children}
      <div aria-hidden="true" className="mt-3 h-1 overflow-hidden bg-surface-soft">
        <div className={cx(dossier.bar, "h-full bg-action-primary")} />
      </div>
    </div>
  );
}
