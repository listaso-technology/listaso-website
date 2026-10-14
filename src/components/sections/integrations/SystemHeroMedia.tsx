import type { ReactNode } from "react";
import { BrandAsset } from "@/components/brand/BrandAsset";
import { Icon } from "@/components/icons/Icon";
import { systemPageCopy, type IntegrationSystem } from "@/content/integrations/systems";
import { Direction } from "./SyncTable";

/** Short rows read better in the hero; the full list is in the sync table. */
const HERO_ROW_LIMIT = 4;
const HERO_ROW_MAX_LENGTH = 48;

/**
 * Illustrative sync panel: Listaso and the accounting system with the first
 * rows of the sync table. Product UI in light over the brand band. The
 * system name is text, not a third-party logo.
 */
export function SystemHeroMedia({ system, children }: { system: IntegrationSystem; children?: ReactNode }) {
  const rows = system.sync.filter((row) => row.item.length <= HERO_ROW_MAX_LENGTH).slice(0, HERO_ROW_LIMIT);

  return (
    <div data-reveal="media" className="relative mx-auto w-full max-w-lg pb-12 lg:mr-0">
      <div
        role="img"
        aria-label={systemPageCopy.exampleLabel(system.name)}
        data-theme="light"
        className="rounded-lg border border-line-subtle bg-surface-page p-4 shadow-e3 sm:p-6"
      >
        <div aria-hidden="true" className="flex flex-col gap-6">
          <span className="flex items-center gap-2 sm:gap-3">
            <BrandAsset id="listaso-symbol-multicolor" height={48} alt="" className="rounded-md" />
            <span className="h-px flex-1 border-t border-dashed border-line-control" />
            <span className="flex size-10 items-center justify-center rounded-full bg-fg-heading text-fg-on-action">
              <Icon name="sync" size={20} />
            </span>
            <span className="h-px flex-1 border-t border-dashed border-line-control" />
            <span className="flex h-12 items-center rounded-md border border-line-subtle bg-surface-alt px-3 text-small font-bold text-fg-heading sm:px-4 sm:text-body">
              {system.name}
            </span>
          </span>
          <span className="flex items-center justify-between gap-4">
            <span className="text-caption font-semibold uppercase text-fg-muted">{systemPageCopy.exampleTitle}</span>
            <span className="flex items-center gap-1 rounded-full bg-surface-soft px-3 py-1 text-caption font-bold text-fg-accent">
              <Icon name="check" size={16} />
              {systemPageCopy.exampleStatus}
            </span>
          </span>
          <span className="flex flex-col divide-y divide-line-subtle text-small">
            {rows.map((row) => (
              <span key={row.item} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3">
                <span className="text-fg-default">{row.item}</span>
                <span className="text-small">
                  <Direction direction={row.direction} name={system.name} />
                </span>
              </span>
            ))}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}
