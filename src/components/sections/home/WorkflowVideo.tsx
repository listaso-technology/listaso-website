"use client";

import { useEffect, useRef, useState } from "react";

/** Follow the existing workflow's active-step attribute without changing its behavior. */
export function WorkflowVideo({ src, step }: { src: string; step: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const root = video?.closest<HTMLElement>("[data-flow-root]");
    if (!video || !root) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    let disposed = false;
    const sync = () => {
      const selected = root.dataset.activeStep === String(step);
      setActive(selected && !motion.matches);
      if (!selected || !inView || document.hidden || motion.matches || userPaused.current || video.error) {
        video.pause();
        return;
      }
      if (!video.getAttribute("src")) video.src = src;
      void video.play().catch(() => { if (!disposed) setPlaying(false); });
    };
    const selection = new MutationObserver(sync);
    selection.observe(root, { attributes: true, attributeFilter: ["data-active-step"] });
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    }, { threshold: 0.1 });
    visibility.observe(video);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      visibility.disconnect();
      selection.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, [src, step]);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    userPaused.current = !video.paused;
    if (userPaused.current) video.pause();
    else {
      if (!video.getAttribute("src")) video.src = src;
      void video.play().catch(() => setPlaying(false));
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        width={960}
        height={540}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onPlaying={() => { setReady(true); setPlaying(true); }}
        onPause={() => setPlaying(false)}
        onError={() => { setFailed(true); setReady(false); }}
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover motion-reduce:hidden ${active && ready ? "opacity-100" : "opacity-0"}`}
      />
      {active && !failed && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause warehouse video" : "Play warehouse video"}
          className="pointer-events-auto absolute top-4 left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-line-subtle bg-surface-page text-fg-heading shadow-e2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg-accent motion-reduce:hidden"
        >
          <span aria-hidden="true" className="text-body font-bold">{playing ? "Ⅱ" : "▶"}</span>
        </button>
      )}
    </>
  );
}
