import { Icon } from "@/components/icons/Icon";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { orderExample } from "@/content/products/pre-sales";
import { cx } from "@/lib/utils/cx";

/**
 * Illustrative order with the customer's prices and a promotion. One image to
 * assistive technology; its sample data is decorative. One glass surface.
 */
export function OrderPanel({ className }: { className?: string }) {
  const example = orderExample;

  return (
    <GlassPanel role="img" aria-label={example.label} className={cx("flex w-[min(100%,24rem)] flex-col gap-3 p-4", className)}>
      <span aria-hidden="true" className="flex items-start justify-between gap-4">
        <span className="flex flex-col gap-1">
          <span className="text-caption font-semibold uppercase text-fg-muted">{example.title}</span>
          <span className="text-h4 font-semibold text-fg-heading">{example.customer}</span>
        </span>
        <span className="flex items-center gap-1 rounded-full bg-surface-soft px-3 py-1 text-caption font-bold text-fg-accent">
          <Icon name="sync" size={16} />
          {example.offline}
        </span>
      </span>
      <span aria-hidden="true" className="flex flex-col divide-y divide-line-subtle text-small">
        {example.lines.map((line) => (
          <span key={line.product} className="grid grid-cols-[1fr_auto] gap-x-4 py-2">
            <span className="font-semibold">{line.product}</span>
            <span className="font-semibold">{line.total}</span>
            <span className="text-fg-muted">{line.detail}</span>
          </span>
        ))}
      </span>
      <span aria-hidden="true" className="flex items-center justify-between border-t border-line-subtle pt-3">
        <span className="text-body font-semibold">{example.totalLabel}</span>
        <span className="text-h4 font-bold text-fg-heading">{example.total}</span>
      </span>
      <span aria-hidden="true" className="flex items-center gap-2 text-small font-semibold">
        <Icon name="check" size={16} className="text-icon-accent" />
        {example.status}
      </span>
    </GlassPanel>
  );
}
