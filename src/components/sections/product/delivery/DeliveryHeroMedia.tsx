import { Icon } from "@/components/icons/Icon";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { stopExample } from "@/content/products/delivery";
import { cx } from "@/lib/utils/cx";

/** Illustrative completed stop: signature and payment. One glass surface. */
export function StopPanel({ className }: { className?: string }) {
  const example = stopExample;

  return (
    <GlassPanel role="img" aria-label={example.label} className={cx("flex w-[min(100%,23rem)] flex-col gap-4 p-4", className)}>
      <span aria-hidden="true" className="flex items-center justify-between gap-4">
        <span className="flex flex-col gap-1">
          <span className="text-caption font-semibold uppercase text-fg-muted">{example.stop}</span>
          <span className="text-h4 font-semibold text-fg-heading">{example.customer}</span>
        </span>
        <span className="text-h4 font-bold text-fg-heading">{example.invoice}</span>
      </span>
      <span aria-hidden="true" className="flex flex-col gap-2 rounded-md border border-line-subtle bg-surface-raised p-3">
        {/* Decorative signature stroke. */}
        <svg viewBox="0 0 220 48" className="h-12 w-full text-fg-heading" fill="none">
          <path
            d="M6 34c14-22 22-26 26-18s-6 20 4 18 16-26 24-22-2 22 8 20 14-18 22-16 4 14 14 12 18-10 28-10 22 6 34 4 24-8 42-10"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="flex items-center gap-2 border-t border-line-subtle pt-2 text-small font-semibold">
          <Icon name="signature" size={16} className="text-icon-accent" />
          {example.signed}
        </span>
      </span>
      <span aria-hidden="true" className="flex items-center gap-2 text-small font-semibold">
        <Icon name="payments" size={16} className="text-icon-accent" />
        {example.payment}
      </span>
    </GlassPanel>
  );
}
