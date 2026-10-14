import { Icon } from "@/components/icons/Icon";
import { receiptExample } from "@/content/products/direct-sales";
import { cx } from "@/lib/utils/cx";

/**
 * Printed invoice illustration (Bluetooth printer). It stays light in both
 * themes, and on the brand band, because it represents paper. One image to
 * assistive technology.
 */
export function PrintedReceipt({ className }: { className?: string }) {
  const example = receiptExample;

  return (
    <div data-reveal="media" className={cx("flex justify-center lg:justify-end", className)}>
      <div
        role="img"
        aria-label={example.label}
        data-theme="light"
        className="w-full max-w-sm rounded-sm bg-surface-raised p-6 font-mono text-small text-fg-default shadow-e3 lg:-rotate-2"
      >
        <div aria-hidden="true" className="flex flex-col gap-4">
          <span className="flex items-center justify-between border-b border-dashed border-line-control pb-4">
            <span className="text-body font-bold uppercase tracking-widest">{example.heading}</span>
            <Icon name="print" size={20} className="text-icon-accent" />
          </span>
          <span className="font-semibold">{example.customer}</span>
          <span className="flex flex-col gap-3">
            {example.lines.map((line) => (
              <span key={line.product} className="grid grid-cols-[1fr_auto] gap-x-4">
                <span>{line.product}</span>
                <span>{line.total}</span>
                <span className="text-fg-muted">{line.detail}</span>
              </span>
            ))}
          </span>
          <span className="flex items-center justify-between border-t border-dashed border-line-control pt-4 text-body font-bold">
            <span>{example.totalLabel}</span>
            <span>{example.total}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
