"use client";

import { type HTMLAttributes, type ReactNode, useEffect, useRef } from "react";

/**
 * Stepper list for NextPage. When the row scrolls sideways (narrow screens),
 * it starts with the current step in view; it moves the row only, never the
 * page.
 */
export function NextPageSteps({ children, ...rest }: HTMLAttributes<HTMLOListElement> & { children: ReactNode }) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const current = list?.querySelector<HTMLElement>('[aria-current="page"]')?.closest("li");
    if (!list || !current || list.scrollWidth <= list.clientWidth) return;
    const offset = current.getBoundingClientRect().left - list.getBoundingClientRect().left;
    list.scrollLeft += offset - 24;
  }, []);

  return (
    <ol ref={listRef} {...rest}>
      {children}
    </ol>
  );
}
