import type { ReactNode } from "react";
import { cx } from "@/lib/utils/cx";
import effects from "./effects.module.css";
import { FillPhoto, type AnyPhoto } from "./HeroParts";

type ImageBandProps = {
  photo: AnyPhoto;
  /** Optional panel pinned to the lower left corner. */
  overlay?: ReactNode;
  className?: string;
};

/**
 * Full-bleed photograph between sections with a gentle scroll parallax
 * (Symboolic's image breaks). Static without scroll-driven animation support
 * or with reduced motion.
 */
export function ImageBand({ photo, overlay, className }: ImageBandProps) {
  return (
    <div data-story-section className={cx("px-4 py-8 md:px-6 lg:px-8", className)}>
      <div data-reveal="media" className="relative mx-auto max-w-wide">
        <div className={cx(effects.parallaxFrame, "relative aspect-[4/3] rounded-xl bg-surface-soft sm:aspect-[16/9] lg:aspect-[21/9]")}>
          <div className={cx(effects.parallaxMedia, "absolute inset-0")}>
            <FillPhoto photo={photo} sizes="(min-width: 1440px) 1440px, 100vw" />
          </div>
        </div>
        {overlay ? (
          <div className="relative z-10 -mt-16 flex justify-center px-4 lg:absolute lg:bottom-10 lg:left-10 lg:mt-0 lg:block lg:px-0">
            {overlay}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** Photo filling a sticky-story media layer. */
export function StoryPhoto({ photo }: { photo: AnyPhoto }) {
  return <FillPhoto photo={photo} sizes="(min-width: 1024px) 46vw, 92vw" />;
}
