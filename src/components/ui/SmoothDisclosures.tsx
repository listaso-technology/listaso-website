"use client";

import { useEffect, useRef, type ReactNode } from "react";

const DURATION = 380;
const EASING = "cubic-bezier(0.32, 0.72, 0, 1)";

/**
 * Wraps native `<details>` disclosures and animates their height when they
 * open and close (Web Animations API), with the answer fading in. Without
 * JavaScript, or with reduced motion, the disclosures toggle instantly as
 * usual. Renders a plain `div` around its children.
 */
export function SmoothDisclosures({ children, className }: { children: ReactNode; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const running = new WeakMap<HTMLDetailsElement, Animation>();

    const onClick = (event: MouseEvent) => {
      const summary = (event.target as Element | null)?.closest("summary");
      const details = summary?.parentElement;
      if (!summary || !(details instanceof HTMLDetailsElement) || !root.contains(details) || reduce.matches) return;
      event.preventDefault();

      const from = details.offsetHeight;
      running.get(details)?.cancel();
      const closing = details.open;
      // Lets toggle icons turn back right away instead of when the close ends.
      details.toggleAttribute("data-closing", closing);
      details.style.overflow = "hidden";
      if (!closing) details.open = true;
      const to = closing ? summary.offsetHeight : details.scrollHeight;

      const body = summary.nextElementSibling as HTMLElement | null;
      body?.animate(closing ? [{ opacity: 1 }, { opacity: 0 }] : [{ opacity: 0, transform: "translateY(-6px)" }, { opacity: 1, transform: "none" }], {
        duration: closing ? DURATION * 0.6 : DURATION,
        easing: EASING,
        delay: closing ? 0 : DURATION * 0.2,
        fill: "backwards",
      });

      const animation = details.animate({ height: [`${from}px`, `${to}px`] }, { duration: DURATION, easing: EASING });
      running.set(details, animation);
      animation.onfinish = () => {
        if (closing) details.open = false;
        details.removeAttribute("data-closing");
        details.style.overflow = "";
        running.delete(details);
      };
      animation.oncancel = () => {
        details.removeAttribute("data-closing");
        details.style.overflow = "";
      };
    };

    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, []);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
