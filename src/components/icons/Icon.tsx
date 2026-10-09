import { iconData, type IconName } from "./icon-data";

export type { IconName };

export const iconSizes = [16, 20, 24, 32, 40, 48] as const;
export type IconSize = (typeof iconSizes)[number];

type IconProps = {
  name: IconName;
  /** Rendered size in px, on the 8-point icon scale. */
  size?: IconSize;
  /**
   * Accessible name for a meaningful standalone icon. Omit it for decorative
   * icons or when visible text already names the control; the icon is then
   * hidden from assistive technology.
   */
  label?: string;
  className?: string;
};

/**
 * Semantic icon. Consumers use meaning-based names; the source glyph (Listaso
 * first, Material Symbols as fallback) lives in assets/icons/icon-map.json and
 * can change without touching consumers. Color follows currentColor.
 */
export function Icon({ name, size = 24, label, className }: IconProps) {
  const glyph = iconData[name];
  const a11y = label
    ? ({ role: "img", "aria-label": label } as const)
    : ({ "aria-hidden": true } as const);

  return (
    <svg
      viewBox={glyph.viewBox}
      width={size}
      height={size}
      fill="currentColor"
      focusable="false"
      className={className}
      {...a11y}
    >
      {glyph.paths.map((d, index) => (
        <path key={index} d={d} />
      ))}
    </svg>
  );
}
