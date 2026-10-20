"use client";

import { useEffect } from "react";

const SELECTOR = "details[data-nav-disclosure][open]";

/**
 * Progressive enhancement for the header menus. The menus are native
 * <details> disclosures and work without JavaScript; this adds the expected
 * desktop behavior: Escape closes the open menu and returns focus to its
 * toggle, and a click outside closes it. Renders nothing.
 */
export function NavDisclosures() {
  useEffect(() => {
    function closeAll(except?: Element | null) {
      document.querySelectorAll<HTMLDetailsElement>(SELECTOR).forEach((details) => {
        if (!except || !details.contains(except)) details.open = false;
      });
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      const open = [...document.querySelectorAll<HTMLDetailsElement>(SELECTOR)];
      if (open.length === 0) return;
      // Close the innermost menu first and return focus to its toggle.
      const innermost = open[open.length - 1];
      innermost.open = false;
      innermost.querySelector<HTMLElement>(":scope > summary")?.focus();
    }

    function onPointerDown(event: PointerEvent) {
      closeAll(event.target instanceof Element ? event.target : null);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return null;
}
