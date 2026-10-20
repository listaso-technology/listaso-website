import { Icon, type IconName } from "@/components/icons/Icon";
import { cx } from "@/lib/utils/cx";
import styles from "./Marquee.module.css";

export type MarqueeItem = { label: string; icon?: IconName };

type MarqueeProps = {
  items: readonly MarqueeItem[];
  /** Accessible name of the list, from the page copy. */
  label: string;
  /** `display` for large outlined words, `pill` for chips. */
  variant?: "pill" | "display";
  /** Two rows moving in opposite directions. */
  rows?: 1 | 2;
  tone?: "page" | "alt" | "band";
  className?: string;
};

function Item({ item, variant }: { item: MarqueeItem; variant: "pill" | "display" }) {
  if (variant === "display") {
    return (
      <span className="flex items-center gap-6 pr-6 text-h1 font-bold whitespace-nowrap text-fg-heading">
        {item.label}
        <span aria-hidden="true" className="size-3 rounded-full bg-icon-accent" />
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2 rounded-full border border-line-subtle bg-surface-raised px-5 py-3 text-body font-semibold whitespace-nowrap text-fg-heading">
      {item.icon ? <Icon name={item.icon} size={20} className="text-icon-accent" /> : null}
      {item.label}
    </span>
  );
}

/**
 * Marquee of labels (Stavros Symeonidis, Good Fella). One accessible list;
 * the moving copies are decorative.
 */
export function Marquee({ items, label, variant = "pill", rows = 1, tone = "page", className }: MarqueeProps) {
  const rowItems = rows === 2 ? [items, [...items].reverse()] : [items];

  return (
    <div
      data-story-section
      {...(tone === "band" ? { "data-surface": "band" } : null)}
      className={cx(
        "flex flex-col gap-4 py-12 lg:py-16",
        tone === "alt" && "bg-surface-alt",
        className,
      )}
    >
      {rowItems.map((row, rowIndex) => (
        // The reversed row only exists while it moves; static fallbacks show one list.
        <div key={rowIndex} className={cx(styles.marquee, rowIndex === 1 && styles.secondRow)}>
          <div className={cx(styles.track, rowIndex === 1 && styles.reverse, "px-4 md:px-6 lg:px-8")}>
            <ul
              aria-label={rowIndex === 0 ? label : undefined}
              aria-hidden={rowIndex === 0 ? undefined : true}
              className="flex flex-wrap gap-3"
            >
              {row.map((item) => (
                <li key={item.label}>
                  <Item item={item} variant={variant} />
                </li>
              ))}
            </ul>
            <div aria-hidden="true" className={cx(styles.copy, "gap-3")}>
              {row.map((item) => (
                <Item key={item.label} item={item} variant={variant} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
