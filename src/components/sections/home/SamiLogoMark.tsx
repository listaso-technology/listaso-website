"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { cx } from "@/lib/utils/cx";
import styles from "./SamiLogoMark.module.css";

const VIDEO_TYPE = 'video/webm; codecs="vp9"';

/** The entrance and rotating mark share one fixed visual slot. */
export function SamiLogoMark({ alt, size = "default" }: { alt: string; size?: "default" | "hero" | "lockup" }) {
  const markRef = useRef<HTMLSpanElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mark = markRef.current;
    const poster = posterRef.current;
    const video = videoRef.current;
    if (!mark || !poster || !video) return;

    const scope = mark.closest<HTMLElement>("[data-sami-motion-scope]") ?? mark;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fineHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)");
    const compactViewport = window.matchMedia("(max-width: 47.999rem)");
    let inView = false;
    let hovered = false;
    let playing = false;
    let unavailable = !video.canPlayType(VIDEO_TYPE);
    let introComplete = unavailable;
    let disposed = false;
    let frame = 0;
    let introFallback = 0;
    let last = 0;
    let angle = 0;
    let velocity = 0;
    let autoRotationTarget: number | null = unavailable ? 360 : null;
    let returning: { start: number; angle: number; velocity: number; target: number } | null = null;

    const revealText = () => {
      window.clearTimeout(introFallback);
      mark.dataset.intro = "complete";
    };
    if (!unavailable && !reducedMotion.matches) {
      mark.dataset.intro = "pending";
      introFallback = window.setTimeout(revealText, 6_000);
    }

    const canPlay = () => !unavailable && !reducedMotion.matches && !document.hidden && inView;
    const shouldRotate = () =>
      introComplete && !playing && !reducedMotion.matches && !document.hidden && inView &&
      (autoRotationTarget !== null || coarsePointer.matches || compactViewport.matches || hovered);

    const draw = (now: number) => {
      const elapsed = last ? Math.min(40, now - last) : 0;
      last = now;

      if (shouldRotate()) {
        const revolutionDuration = coarsePointer.matches || compactViewport.matches ? 12_000 : 8_500;
        velocity += (360 / revolutionDuration - velocity) * Math.min(1, elapsed / 500);
        angle += (velocity * elapsed) * -1;
        if (autoRotationTarget !== null && angle >= autoRotationTarget) {
          if (!coarsePointer.matches && !compactViewport.matches && !hovered) {
            angle = autoRotationTarget;
            velocity = 0;
          }
          autoRotationTarget = null;
        }
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

      poster.style.transform = `rotate(${angle}deg)`;
      if (shouldRotate() || returning) {
        frame = window.requestAnimationFrame(draw);
      } else {
        frame = 0;
        last = 0;
        mark.dataset.rotating = "false";
      }
    };

    const syncRotation = () => {
      if (reducedMotion.matches) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        last = 0;
        angle = 0;
        velocity = 0;
        autoRotationTarget = null;
        returning = null;
        poster.style.transform = "rotate(0deg)";
        mark.dataset.rotating = "false";
        return;
      }
      if (!inView || document.hidden) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        last = 0;
        returning = null;
        mark.dataset.rotating = "false";
        return;
      }
      if (shouldRotate()) {
        returning = null;
        mark.dataset.rotating = "true";
        if (!frame) frame = window.requestAnimationFrame(draw);
        return;
      }
      const target = Math.round(angle / 360) * 360;
      if (!returning && Math.abs(target - angle) > 0.01) {
        returning = { start: performance.now(), angle, velocity, target };
      }
      if (returning) {
        mark.dataset.rotating = "true";
        if (!frame) frame = window.requestAnimationFrame(draw);
      } else {
        mark.dataset.rotating = "false";
      }
    };

    const settle = (completed = false) => {
      video.pause();
      playing = false;
      if (completed) {
        revealText();
        introComplete = true;
        autoRotationTarget = Math.round(angle / 360) * 360 + 360;
      }
      mark.dataset.playing = "false";
      syncRotation();
    };
    const playOnce = () => {
      if (playing || !canPlay()) return;
      playing = true;
      try {
        video.currentTime = 0;
        void video.play().catch((error: unknown) => {
          if (disposed) return;
          const aborted = error instanceof DOMException && error.name === "AbortError";
          if (!aborted) unavailable = true;
          settle(!aborted);
        });
      } catch {
        unavailable = true;
        settle(true);
      }
    };
    const onPlaying = () => {
      if (!canPlay()) {
        settle();
        return;
      }
      mark.dataset.playing = "true";
      syncRotation();
    };
    const onEnded = () => settle(true);
    const onError = () => {
      unavailable = true;
      settle(true);
    };
    const onPointerEnter = (event: PointerEvent) => {
      if (!fineHover.matches || event.pointerType === "touch") return;
      hovered = true;
      if (introComplete) playOnce();
      syncRotation();
    };
    const onPointerLeave = () => {
      hovered = false;
      syncRotation();
    };
    const updateMotion = () => {
      if (!canPlay() && playing) settle();
      if (canPlay() && !introComplete && !playing) playOnce();
      syncRotation();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        updateMotion();
      },
      { threshold: 0.25 },
    );
    observer.observe(mark);

    video.addEventListener("playing", onPlaying);
    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);
    scope.addEventListener("pointerenter", onPointerEnter);
    scope.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", updateMotion);
    reducedMotion.addEventListener("change", updateMotion);
    coarsePointer.addEventListener("change", updateMotion);
    compactViewport.addEventListener("change", updateMotion);

    return () => {
      disposed = true;
      window.clearTimeout(introFallback);
      observer.disconnect();
      video.pause();
      window.cancelAnimationFrame(frame);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
      scope.removeEventListener("pointerenter", onPointerEnter);
      scope.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", updateMotion);
      reducedMotion.removeEventListener("change", updateMotion);
      coarsePointer.removeEventListener("change", updateMotion);
      compactViewport.removeEventListener("change", updateMotion);
    };
  }, []);

  return (
    <span ref={markRef} data-playing="false" data-rotating="false" className={cx(styles.mark, size === "hero" && styles.hero, size === "lockup" && styles.lockup)}>
      <span className={styles.visual}>
        <span className={styles.posterLayer}>
          <Image
            ref={posterRef}
            className={styles.poster}
            src="/brand/sami/sami-poster.png"
            alt={alt}
            width={1080}
            height={1080}
            sizes={size === "default" ? "102px" : "280px"}
            priority={size !== "default"}
          />
        </span>
        <span className={styles.videoLayer} aria-hidden="true">
          <video ref={videoRef} className={styles.video} width={1080} height={1080} muted playsInline preload="none" tabIndex={-1}>
            <source src="/brand/sami/sami-animation.webm" type={VIDEO_TYPE} />
          </video>
        </span>
      </span>
    </span>
  );
}
