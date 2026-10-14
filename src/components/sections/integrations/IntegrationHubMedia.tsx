import { BrandAsset } from "@/components/brand/BrandAsset";
import { hubExample } from "@/content/integrations/hub";
import { accountingSystems } from "@/content/products/shared";

/** Centers of the eight outer cells of a 3×3 grid, in a 300×300 box. */
const CELL_CENTERS = [
  [50, 50],
  [150, 50],
  [250, 50],
  [50, 150],
  [250, 150],
  [50, 250],
  [150, 250],
  [250, 250],
] as const;

/**
 * Hub diagram: the Listaso symbol in the center, connected to the eight
 * accounting systems. Names are text, never third-party logos (see
 * docs/INTEGRATIONS_CONTENT_CONTRACT.md). One image to assistive technology.
 */
export function IntegrationHubMedia() {
  const outer = accountingSystems.slice(0, 8);
  const before = outer.slice(0, 4);
  const after = outer.slice(4);

  return (
    <div data-reveal="media" className="mx-auto w-full max-w-lg">
      <div role="img" aria-label={hubExample.label} className="relative aspect-square">
        <svg
          aria-hidden="true"
          viewBox="0 0 300 300"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full text-fg-accent opacity-50"
          fill="none"
        >
          {CELL_CENTERS.map(([x, y]) => (
            <line
              key={`${x}-${y}`}
              x1="150"
              y1="150"
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 6"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        <ul aria-hidden="true" className="relative grid size-full grid-cols-3 grid-rows-3 gap-3 sm:gap-4">
          {before.map((system) => (
            <SystemCell key={system.href} label={system.label} />
          ))}
          <li className="flex items-center justify-center">
            <span className="rounded-xl shadow-e3 ring-4 ring-line-subtle">
              <BrandAsset id="listaso-symbol-multicolor" height={88} alt="" className="block rounded-xl" />
            </span>
          </li>
          {after.map((system) => (
            <SystemCell key={system.href} label={system.label} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function SystemCell({ label }: { label: string }) {
  return (
    <li className="flex items-center justify-center rounded-lg border border-line-subtle bg-surface-band p-2 text-center text-small font-semibold text-fg-heading shadow-e2 sm:text-body">
      {label}
    </li>
  );
}
