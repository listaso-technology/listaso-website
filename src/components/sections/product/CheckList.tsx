import { Icon } from "@/components/icons/Icon";
import { cx } from "@/lib/utils/cx";

type CheckListProps = {
  items: readonly string[];
  /** Two columns from `md` for longer lists. */
  columns?: 1 | 2;
  className?: string;
};

/** Benefit list with check marks (start-version `checks`). */
export function CheckList({ items, columns = 1, className }: CheckListProps) {
  return (
    <ul
      data-reveal="group"
      className={cx("grid gap-x-8 gap-y-4", columns === 2 && "md:grid-cols-2", className)}
    >
      {items.map((item) => (
        <li data-reveal-item key={item} className="flex gap-3 text-body text-fg-default">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-soft text-icon-accent">
            <Icon name="check" size={16} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
