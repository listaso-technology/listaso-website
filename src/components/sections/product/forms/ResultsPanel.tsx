import { Icon } from "@/components/icons/Icon";

/* Fixed positions (percent) for the illustrative answer pins on the map. */
const PINS = [
  [22, 34],
  [38, 58],
  [55, 28],
  [64, 66],
  [78, 42],
  [30, 76],
] as const;

const BARS = [46, 72, 58, 90, 64] as const;

/**
 * Illustration of "See the results": answers on a map and in a chart.
 * Decorative (used inside the sticky story media, which is aria-hidden).
 */
export function ResultsPanel() {
  return (
    <div data-theme="light" className="absolute inset-0 grid grid-rows-[1.4fr_1fr] gap-3 bg-surface-alt p-6 pt-14">
      <div className="relative overflow-hidden rounded-md border border-line-subtle bg-surface-soft">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full text-line-control" fill="none">
          <path d="M0 40 C 20 30, 35 55, 55 45 S 85 30, 100 42" stroke="currentColor" strokeWidth="0.6" />
          <path d="M0 70 C 25 62, 45 82, 70 70 S 90 60, 100 66" stroke="currentColor" strokeWidth="0.6" />
          <path d="M35 0 C 40 30, 30 60, 42 100" stroke="currentColor" strokeWidth="0.6" />
          <path d="M72 0 C 68 35, 80 65, 74 100" stroke="currentColor" strokeWidth="0.6" />
        </svg>
        {PINS.map(([x, y]) => (
          <span
            key={`${x}-${y}`}
            className="absolute flex size-7 -translate-x-1/2 -translate-y-full items-center justify-center rounded-full bg-action-primary text-fg-on-action shadow-e2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <Icon name="forms" size={16} />
          </span>
        ))}
      </div>
      <div className="flex items-end gap-3 rounded-md border border-line-subtle bg-surface-raised p-4">
        {BARS.map((value, index) => (
          <span key={index} className="flex-1 rounded-t-xs bg-fg-heading" style={{ height: `${value}%` }} />
        ))}
      </div>
    </div>
  );
}
