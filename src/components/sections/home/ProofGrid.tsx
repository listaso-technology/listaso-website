"use client";

import type { HTMLAttributes, PointerEvent, ReactNode } from "react";

type ProofGridProps = HTMLAttributes<HTMLUListElement> & {
  /** Selector of the cards that react to the pointer. */
  cardSelector?: string;
  children: ReactNode;
};

/**
 * List of cards that passes the mouse position to the hovered card: `--mx` /
 * `--my` in px (spotlight, border glow) and `--px` / `--py` from 0 to 1
 * (tilt, parallax). Used by the Homepage figures and the feature bento. Pure
 * decoration: touch and keyboard users get the same content without it.
 */
export function ProofGrid({ cardSelector = "[data-counter-host]", children, ...rest }: ProofGridProps) {
  const track = (event: PointerEvent<HTMLUListElement>) => {
    if (event.pointerType !== "mouse") return;
    const card = (event.target as HTMLElement).closest<HTMLElement>(cardSelector);
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
    card.style.setProperty("--px", (x / bounds.width).toFixed(3));
    card.style.setProperty("--py", (y / bounds.height).toFixed(3));
  };

  const reset = (event: PointerEvent<HTMLUListElement>) => {
    const card = (event.target as HTMLElement).closest<HTMLElement>(cardSelector);
    // Only when the pointer actually leaves the card, not when it crosses its children.
    if (!card || card.contains(event.relatedTarget as Node | null)) return;
    card.style.setProperty("--px", "0.5");
    card.style.setProperty("--py", "0.5");
  };

  return (
    <ul onPointerMove={track} onPointerOut={reset} {...rest}>
      {children}
    </ul>
  );
}
