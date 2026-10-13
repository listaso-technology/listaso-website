"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./SamiLogoMark.module.css";

export function SamiLogoMark({ alt }: { alt: string }) {
  const markRef = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const mark = markRef.current;
    const image = imageRef.current;
    if (!mark || !image) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let angle = 0;
    let velocity = 0;
    let last = 0;
    let hovered = false;
    let returning: { start: number; angle: number; velocity: number; target: number } | null = null;

    const draw = (now: number) => {
      const elapsed = last ? Math.min(40, now - last) : 0;
      last = now;

      if (hovered) {
        velocity += (360 / 28_000 - velocity) * Math.min(1, elapsed / 500);
        angle += velocity * elapsed;
      } else if (returning) {
        const progress = Math.min(1, (now - returning.start) / 1_200);
        const squared = progress * progress;
        const cubed = squared * progress;
        angle =
          (2 * cubed - 3 * squared + 1) * returning.angle +
          (cubed - 2 * squared + progress) * returning.velocity * 1_200 +
          (-2 * cubed + 3 * squared) * returning.target;

        if (progress === 1) {
          angle = returning.target;
          velocity = 0;
          returning = null;
        }
      }

      image.style.transform = `rotate(${angle}deg)`;
      if (hovered || returning) {
        frame = window.requestAnimationFrame(draw);
      } else {
        last = 0;
        frame = 0;
      }
    };

    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "touch" || reducedMotion.matches) return;
      hovered = true;
      returning = null;
      mark.classList.add(styles.active);
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    const onPointerLeave = () => {
      if (!hovered) return;
      hovered = false;
      mark.classList.remove(styles.active);
      returning = {
        start: performance.now(),
        angle,
        velocity,
        target: Math.round(angle / 360) * 360,
      };
    };

    const resetMotion = () => {
      if (!reducedMotion.matches) return;
      hovered = false;
      returning = null;
      window.cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      angle = 0;
      velocity = 0;
      mark.classList.remove(styles.active);
      image.style.transform = "rotate(0deg)";
    };

    mark.addEventListener("pointerenter", onPointerEnter);
    mark.addEventListener("pointerleave", onPointerLeave);
    reducedMotion.addEventListener("change", resetMotion);

    return () => {
      window.cancelAnimationFrame(frame);
      mark.removeEventListener("pointerenter", onPointerEnter);
      mark.removeEventListener("pointerleave", onPointerLeave);
      reducedMotion.removeEventListener("change", resetMotion);
    };
  }, []);

  return (
    <span ref={markRef} className={styles.mark}>
      <Image
        ref={imageRef}
        className={styles.image}
        src="/brand/sami/sami-logo.webp"
        alt={alt}
        width={72}
        height={72}
      />
    </span>
  );
}
