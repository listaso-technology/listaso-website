"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { homeHeroVideo } from "@/content/media/placeholders";

/** Decorative stock footage in the existing hero frame; the poster is the fallback. */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    let disposed = false;
    const sync = () => {
      if (motion.matches || document.hidden || !inView || userPaused.current) {
        video.pause();
        return;
      }
      if (!video.getAttribute("src")) video.src = homeHeroVideo.src;
      void video.play().catch(() => {
        if (!disposed) setPlaying(false);
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    }, { threshold: 0.1 });
    observer.observe(video);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      observer.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    userPaused.current = !video.paused;
    if (userPaused.current) video.pause();
    else {
      if (!video.getAttribute("src")) video.src = homeHeroVideo.src;
      void video.play().catch(() => setPlaying(false));
    }
  }

  return (
    <>
      <Image
        src={homeHeroVideo.poster}
        alt={homeHeroVideo.alt}
        fill
        priority
        sizes="(max-width: 1023px) 92vw, 44vw"
        className="object-cover"
      />
      <video
        ref={videoRef}
        width={1280}
        height={720}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onPlaying={() => { setPlaying(true); setReady(true); }}
        onPause={() => setPlaying(false)}
        onError={() => { setFailed(true); setReady(false); }}
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover motion-reduce:hidden ${ready ? "opacity-100" : "opacity-0"}`}
      />
      {!failed && (
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={playing ? "Pause background video" : "Play background video"}
          className="absolute top-4 left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-line-subtle bg-surface-page text-fg-heading shadow-e2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg-accent motion-reduce:hidden"
        >
          <span aria-hidden="true" className="text-body font-bold">{playing ? "Ⅱ" : "▶"}</span>
        </button>
      )}
    </>
  );
}
