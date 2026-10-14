"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function parseValue(value: string) {
  const match = value.match(/^(.*?)(\d[\d,.]*)(.*)$/);
  if (!match) return null;

  const numericPart = match[2];
  const decimalPart = numericPart.split(".")[1];
  return {
    prefix: match[1],
    target: Number(numericPart.replaceAll(",", "")),
    suffix: match[3],
    decimals: decimalPart?.length ?? 0,
    grouped: numericPart.includes(","),
  };
}

export function ProofCounter({ value, className }: { value: string; className?: string }) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const parsed = useMemo(() => parseValue(value), [value]);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !parsed) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      const finalFrame = window.requestAnimationFrame(() => setDisplay(value));
      return () => window.cancelAnimationFrame(finalFrame);
    }

    let frame = 0;
    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();
        setDisplay(`${parsed.prefix}${(0).toFixed(parsed.decimals)}${parsed.suffix}`);
        const start = performance.now();
        const duration = 850;

        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = parsed.target * eased;
          const formatted = parsed.grouped
            ? Math.round(current).toLocaleString("en-US")
            : current.toFixed(parsed.decimals);
          setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
          if (progress < 1) frame = window.requestAnimationFrame(tick);
        };

        frame = window.requestAnimationFrame(tick);
      },
      { threshold: 0.45 },
    );

    observer.observe(root);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [parsed, value]);

  return (
    <span ref={rootRef} className={className} aria-label={value}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
