import { cx } from "@/lib/utils/cx";

/*
 * Fixed pseudo-random pattern (so the markup is stable between builds): each
 * number is how many cells, from the bottom, are filled in that column.
 */
const COLUMNS = [3, 1, 4, 2, 5, 2, 1, 3, 4, 1, 2, 5, 3, 2, 4, 1, 3, 5, 2, 1, 4, 3, 2, 5, 1, 3, 2, 4];
const ROWS = 5;

type PixelDividerProps = {
  /** Fill of the cells: the surface of the section that follows. */
  to?: "page" | "alt" | "band";
  /** Background behind the cells: the surface of the section above. */
  from?: "page" | "alt" | "band";
  className?: string;
};

const fill = {
  page: "var(--listaso-surface-page)",
  alt: "var(--listaso-surface-alt)",
  band: "var(--listaso-surface-band)",
} as const;

/**
 * Pixel stair transition between two surfaces (Symboolic). Decorative SVG,
 * static, no motion; it follows the theme through the surface tokens.
 */
export function PixelDivider({ to = "alt", from = "page", className }: PixelDividerProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${COLUMNS.length} ${ROWS}`}
      preserveAspectRatio="none"
      className={cx("block h-12 w-full lg:h-20", className)}
      style={{ background: fill[from] }}
    >
      {COLUMNS.flatMap((filled, x) =>
        Array.from({ length: filled }, (_, step) => (
          <rect key={`${x}-${step}`} x={x} y={ROWS - 1 - step} width="1.02" height="1.02" fill={fill[to]} />
        )),
      )}
    </svg>
  );
}
