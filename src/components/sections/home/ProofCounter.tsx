"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function parseValue(value: string) {
  const match = value.match(/^(.*?)(\d[\d,.]*)(.*)$/);
  if (!match) return null;

  const numericPart = match[2];
  const decimalPart = numericPart.split(".")[1];
  return {
    prefix: match[1],
    numeric: numericPart,
    target: Number(numericPart.replaceAll(",", "")),
    suffix: match[3],
    decimals: decimalPart?.length ?? 0,
    grouped: numericPart.includes(","),
  };
}

type ProofCounterProps = {
  value: string;
  className?: string;
  /** Optional class for the prefix and suffix ("$", "+", "Since "). */
  affixClassName?: string;
};

/**
 * Counts a figure up once when it enters the viewport. Inside an element with
 * `data-counter-host`, a mouse hover on that host replays the count. The
 * accessible name is always the final value; reduced motion shows it directly.
 */
export function ProofCounter({ value, className, affixClassName }: ProofCounterProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const parsed = useMemo(() => parseValue(value), [value]);
  const [display, setDisplay] = useState(parsed?.numeric ?? value);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !parsed) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      const finalFrame = window.requestAnimationFrame(() => setDisplay(parsed.numeric));
      return () => window.cancelAnimationFrame(finalFrame);
    }

    let frame = 0;
    let running = false;

    const run = (duration: number) => {
      window.cancelAnimationFrame(frame);
      running = true;
      setDisplay((0).toFixed(parsed.decimals));
      const start = performance.now();

      const tick = (now: number) => {
        // rAF can hand over a timestamp slightly before `start`: never go negative.
        const progress = Math.max(0, Math.min(1, (now - start) / duration));
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = parsed.target * eased;
        setDisplay(
          parsed.grouped ? Math.round(current).toLocaleString("en-US") : current.toFixed(parsed.decimals),
        );
        if (progress < 1) frame = window.requestAnimationFrame(tick);
        else running = false;
      };

      frame = window.requestAnimationFrame(tick);
    };

    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();
        run(850);
      },
      { threshold: 0.45 },
    );
    observer.observe(root);

    const host = root.closest<HTMLElement>("[data-counter-host]");
    const replay = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !started || running) return;
      run(650);
    };
    host?.addEventListener("pointerenter", replay);

    return () => {
      observer.disconnect();
      host?.removeEventListener("pointerenter", replay);
      window.cancelAnimationFrame(frame);
    };
  }, [parsed]);

  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={rootRef} className={className} aria-label={value}>
      <span aria-hidden="true">
        {parsed.prefix ? <span className={affixClassName}>{parsed.prefix}</span> : null}
        {display}
        {parsed.suffix ? <span className={affixClassName}>{parsed.suffix}</span> : null}
      </span>
    </span>
  );
}
