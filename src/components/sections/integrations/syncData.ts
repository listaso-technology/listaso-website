import { howSync } from "@/content/integrations/hub";
import { systemPageCopy, type IntegrationSystem, type SyncDirection, type SyncRow } from "@/content/integrations/systems";

export type SyncGroup = { direction: SyncDirection; label: string; rows: readonly SyncRow[] };

/** Label for one direction, as the integration pages word it. */
export function directionLabel(direction: SyncDirection, system: IntegrationSystem): string {
  if (direction === "both") return systemPageCopy.table.both;
  const title = direction === "in" ? howSync.toListaso.title : howSync.fromListaso.title;
  return title.replace("your accounting system", system.name);
}

/** The sync rows grouped by direction (system → Listaso, Listaso → system, both), empty groups left out. */
export function syncGroups(system: IntegrationSystem): SyncGroup[] {
  const order: SyncDirection[] = ["in", "out", "both"];
  return order
    .map((direction) => ({
      direction,
      label: directionLabel(direction, system),
      rows: system.sync.filter((row) => row.direction === direction),
    }))
    .filter((group) => group.rows.length > 0);
}

/** The one-line summary shown under the integration eyebrow. */
export function systemSummary(system: IntegrationSystem): string {
  return system.hero.plan ?? system.summary;
}
