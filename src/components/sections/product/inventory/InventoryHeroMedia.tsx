import { Icon } from "@/components/icons/Icon";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { productMedia } from "@/content/media/products";
import { pickExample } from "@/content/products/inventory";
import { cx } from "@/lib/utils/cx";
import { PhotoStage } from "../PhotoStage";

/** Photo with an illustrative pick list grouped by warehouse location. */
export function InventoryHeroMedia() {
  const example = pickExample;

  return (
    <PhotoStage photo={productMedia.inventoryFloor} priority>
      <GlassPanel
        role="img"
        aria-label={example.label}
        className="absolute -bottom-8 left-4 flex w-[min(88%,24rem)] flex-col gap-3 p-4 sm:left-8 lg:-left-16 lg:bottom-12"
      >
        <span aria-hidden="true" className="flex items-center justify-between gap-4">
          <span className="flex flex-col gap-1">
            <span className="text-caption font-semibold uppercase text-fg-muted">{example.title}</span>
            <span className="text-h4 font-semibold text-fg-heading">{example.customer}</span>
          </span>
          <Icon name="checklist" size={24} className="text-icon-accent" />
        </span>
        <span aria-hidden="true" className="flex flex-col divide-y divide-line-subtle text-small">
          {example.rows.map((row) => (
            <span key={row.product} className="grid grid-cols-[1.5rem_1fr_auto] items-center gap-x-3 py-2">
              <span
                className={cx(
                  "flex size-6 items-center justify-center rounded-full border",
                  row.done ? "border-transparent bg-fg-heading text-fg-on-action" : "border-line-control",
                )}
              >
                {row.done ? <Icon name="check" size={16} /> : null}
              </span>
              <span className="flex flex-col">
                <span className="font-semibold">{row.product}</span>
                <span className="text-fg-muted">{row.location}</span>
              </span>
              <span className="font-bold text-fg-heading">× {row.qty}</span>
            </span>
          ))}
        </span>
        <span aria-hidden="true" className="flex flex-col gap-2">
          <span className="h-2 overflow-hidden rounded-full bg-surface-soft">
            <span className="block h-full w-2/3 rounded-full bg-fg-heading" />
          </span>
          <span className="text-small font-semibold">{example.progress}</span>
        </span>
      </GlassPanel>
    </PhotoStage>
  );
}
