import effects from "./effects.module.css";

/**
 * Label that rolls to a copy of itself when its link or button is hovered or
 * focused (Good Fella). The copy is hidden from assistive technology.
 */
export function TextRoll({ children }: { children: string }) {
  return (
    <span className={effects.roll}>
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}
