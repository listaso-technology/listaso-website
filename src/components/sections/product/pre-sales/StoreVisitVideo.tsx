"use client";

import { useEffect, useRef, useState } from "react";

/** Decorative warehouse clip for the final visit step. */
export function StoreVisitVideo({ src, step }: { src: string; step: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const root = video?.closest<HTMLElement>("[data-story-root]");
    if (!video || !root) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const sync = () => {
      const active = root.dataset.active === String(step);
      if (!active || !inView || document.hidden || motion.matches || video.error) {
        video.pause();
        setPlaying(false);
        return;
      }
      if (!video.getAttribute("src")) video.src = src;
      void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };

    const selection = new MutationObserver(sync);
    selection.observe(root, { attributes: true, attributeFilter: ["data-active"] });
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    }, { threshold: 0.1 });
    visibility.observe(video);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);

    return () => {
      visibility.disconnect();
      selection.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, [src, step]);

  return (
    <video
      ref={videoRef}
      width={960}
      height={540}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 motion-reduce:hidden ${playing ? "opacity-100" : "opacity-0"}`}
    />
  );
}
