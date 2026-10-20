import { Icon } from "@/components/icons/Icon";
import { cx } from "@/lib/utils/cx";

export type ChronologyItem = {
  title: string;
  text: string;
  /** Right-hand meta: a step number, a date or a link label. */
  meta?: string;
  /** Uppercase subtitle under the title. */
  subtitle?: string;
  /** Optional external link for the whole entry (opens in a new tab). */
  href?: string;
  linkLabel?: string;
};

type ChronologyProps = {
  /** Small uppercase label above the list (optional). */
  label?: string;
  items: readonly ChronologyItem[];
  /** How many leading entries carry the accent line. */
  highlight?: number;
  newTabLabel?: string;
};

/**
 * Timeline list (ddark.dev's "Chronology"): ruled entries with a display
 * title, right-aligned meta and an accent line on the leading entries.
 */
export function Chronology({ label, items, highlight = items.length, newTabLabel = "(opens in a new tab)" }: ChronologyProps) {
  return (
    <div className="flex flex-col gap-4">
      {label ? <p className="text-small font-bold tracking-widest text-fg-muted uppercase">{label}</p> : null}
      <ol data-reveal="group" className="border-t-2 border-fg-heading">
        {items.map((item, index) => (
          <li
            data-reveal-item
            key={item.title}
            className={cx(
              "grid gap-3 border-b border-line-subtle py-8 pl-4 sm:pl-6",
              index < highlight ? "border-l-2 border-l-action-primary" : "border-l-2 border-l-transparent",
            )}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="text-h3 font-bold text-fg-heading">{item.title}</h3>
              {item.meta ? (
                <span className="text-small font-semibold tracking-widest text-fg-accent uppercase">{item.meta}</span>
              ) : null}
            </div>
            {item.subtitle ? (
              <p className="text-small font-semibold tracking-widest text-fg-muted uppercase">{item.subtitle}</p>
            ) : null}
            <p className="max-w-2xl text-body-lg text-fg-default">{item.text}</p>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 w-fit items-center gap-2 text-body font-semibold text-link underline decoration-1 underline-offset-4 hover:text-link-hover hover:decoration-2"
              >
                {item.linkLabel}
                <Icon name="external-link" size={16} />
                <span className="sr-only">{newTabLabel}</span>
              </a>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
