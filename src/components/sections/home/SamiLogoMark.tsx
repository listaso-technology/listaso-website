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
    const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)");
    const compactViewport = window.matchMedia("(max-width: 47.999rem)");
    const scope = mark.closest<HTMLElement>("[data-sami-motion-scope]") ?? mark;
    let frame = 0;
    let angle = 0;
    let velocity = 0;
    let last = 0;
    let inView = false;
    let hovered = false;
    let userPaused = false;
    let returning: { start: number; angle: number; velocity: number; target: number } | null = null;

    const shouldLoop = () =>
      !reducedMotion.matches &&
      !userPaused &&
      !document.hidden &&
      inView &&
      (coarsePointer.matches || compactViewport.matches || hovered);

    const draw = (now: number) => {
      const elapsed = last ? Math.min(40, now - last) : 0;
      last = now;

      if (shouldLoop()) {
        const revolutionDuration = coarsePointer.matches || compactViewport.matches ? 12_000 : 8_500;
        velocity += (360 / revolutionDuration - velocity) * Math.min(1, elapsed / 500);
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
      if (shouldLoop() || returning) {
        frame = window.requestAnimationFrame(draw);
      } else {
        last = 0;
        frame = 0;
      }
    };

    const startIfNeeded = () => {
      if (shouldLoop()) {
        returning = null;
        mark.classList.add(styles.active);
        if (!frame) frame = window.requestAnimationFrame(draw);
      } else if (!coarsePointer.matches && !compactViewport.matches) {
        mark.classList.remove(styles.active);
      }
    };

    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "touch" || reducedMotion.matches) return;
      hovered = true;
      startIfNeeded();
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
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    const updateMotion = () => {
      if (reducedMotion.matches) {
        hovered = false;
        returning = null;
        window.cancelAnimationFrame(frame);
        frame = 0;
        last = 0;
        angle = 0;
        velocity = 0;
        mark.classList.remove(styles.active);
        image.style.transform = "rotate(0deg)";
        return;
      }
      startIfNeeded();
    };

    const onMotionControl = (event: Event) => {
      userPaused = Boolean((event as CustomEvent<{ paused?: boolean }>).detail?.paused);
      updateMotion();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        updateMotion();
      },
      { threshold: 0.25 },
    );
    observer.observe(mark);

    scope.addEventListener("pointerenter", onPointerEnter);
    scope.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", updateMotion);
    window.addEventListener("listaso:sami-motion", onMotionControl);
    reducedMotion.addEventListener("change", updateMotion);
    coarsePointer.addEventListener("change", updateMotion);
    compactViewport.addEventListener("change", updateMotion);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      scope.removeEventListener("pointerenter", onPointerEnter);
      scope.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", updateMotion);
      window.removeEventListener("listaso:sami-motion", onMotionControl);
      reducedMotion.removeEventListener("change", updateMotion);
      coarsePointer.removeEventListener("change", updateMotion);
      compactViewport.removeEventListener("change", updateMotion);
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
