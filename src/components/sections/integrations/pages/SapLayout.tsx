import { systemPageCopy } from "@/content/integrations/systems";
import { HeroCtas } from "../../variants/HeroParts";
import { HeroDossier } from "../../variants/HeroDossier";
import { DossierBox } from "../../variants/DossierBox";
import { SapFeatureGrid } from "../sap/SapFeatureGrid";
import { systemSummary } from "../syncData";
import type { SystemLayoutProps } from "../SystemPage";

/**
 * SAP, "sales and stock in real time", in the dossier language: uppercase
 * display hero whose fact box carries the whole sync (title, "No double
 * entry", every row with its direction, the summary), then the features as
 * an inverting ruled grid beside a halftone photo.
 */
export function SapLayout({ system, photo }: SystemLayoutProps) {
  const copy = systemPageCopy.sync(system.name);
  const direction = (value: "in" | "out" | "both") =>
    value === "both"
      ? systemPageCopy.table.both
      : value === "in"
        ? `${system.name} → Listaso`
        : `Listaso → ${system.name}`;

  return (
    <>
      <HeroDossier
        content={system.hero}
        trail={systemPageCopy.trail}
        actions={<HeroCtas location={`${system.slug}-hero`} />}
        aside={
          <DossierBox
            title={`${copy.title.emphasis} ${copy.title.rest}`}
            status={systemPageCopy.exampleStatus}
            asDescriptionList
            rows={system.sync.map((row) => ({ label: row.item, tag: direction(row.direction) }))}
          >
            <p className="border-t border-line-subtle pt-4 text-small text-fg-muted">
              <span className="font-bold tracking-wide text-fg-accent uppercase">{copy.eyebrow}</span> · {system.hero.eyebrow}:{" "}
              {systemSummary(system)}
            </p>
          </DossierBox>
        }
      />
      <SapFeatureGrid id="features-title" section={{ ...systemPageCopy.features(system.name), items: system.features }} photo={photo} />
    </>
  );
}
