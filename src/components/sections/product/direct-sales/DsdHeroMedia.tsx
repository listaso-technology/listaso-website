import { Icon } from "@/components/icons/Icon";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { truckExample } from "@/content/products/direct-sales";
import { cx } from "@/lib/utils/cx";

/**
 * Live truck stock after a sale, plus the invoice printed at the store. One
 * accessible description; one glass surface.
 */
export function TruckStockPanel({ className }: { className?: string }) {
  const example = truckExample;

  return (
    <GlassPanel role="img" aria-label={example.label} className={cx("flex w-[min(100%,26rem)] flex-col gap-3 p-4", className)}>
      <span aria-hidden="true" className="flex items-center gap-2 text-caption font-semibold uppercase text-fg-muted">
        <Icon name="truck" size={16} className="text-icon-accent" />
        {example.title}
      </span>
      <span aria-hidden="true" className="flex flex-col divide-y divide-line-subtle text-small">
        {example.rows.map((row) => (
          <span key={row.product} className="flex items-center justify-between gap-4 py-2">
            <span className="font-semibold">{row.product}</span>
            <span className="flex shrink-0 items-center gap-2">
              <span className="text-fg-muted line-through">{row.before}</span>
              <Icon name="arrow-right" size={16} className="text-fg-muted" />
              <span className="font-bold text-fg-heading">
                {row.after} {example.unit}
              </span>
            </span>
          </span>
        ))}
      </span>
      <span aria-hidden="true" className="flex items-center justify-between gap-4 border-t border-line-subtle pt-3 text-small">
        <span className="flex items-center gap-2 font-semibold">
          <Icon name="print" size={16} className="text-icon-accent" />
          {example.invoice.title}
        </span>
        <span className="text-h4 font-bold text-fg-heading">{example.invoice.total}</span>
      </span>
    </GlassPanel>
  );
}
