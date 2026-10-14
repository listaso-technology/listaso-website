import Image from "next/image";
import type { ReactNode } from "react";
import type { PhotoSlot } from "@/content/media/products";
import { cx } from "@/lib/utils/cx";
import backdrops from "../backdrops.module.css";

type PhotoStageProps = {
  photo: PhotoSlot;
  /** `portrait` 4:5 (default) or `landscape` 4:3. */
  aspect?: "portrait" | "landscape";
  priority?: boolean;
  sizes?: string;
  /** Absolutely positioned overlays (glass examples). Max two glass surfaces. */
  children?: ReactNode;
  className?: string;
};

/**
 * Large placeholder photograph with a bottom scrim, used as the stage for
 * product examples (same composition as the Homepage hero).
 */
export function PhotoStage({
  photo,
  aspect = "portrait",
  priority = false,
  sizes = "(max-width: 1023px) 92vw, 44vw",
  children,
  className,
}: PhotoStageProps) {
  return (
    <div
      data-reveal="media"
      className={cx(
        "relative mx-auto w-full lg:mr-0",
        aspect === "portrait" ? "max-w-xl" : "max-w-2xl",
        className,
      )}
    >
      <div
        className={cx(
          "relative overflow-hidden rounded-xl bg-surface-soft shadow-e3",
          aspect === "portrait" ? "aspect-[4/5]" : "aspect-[4/3]",
        )}
      >
        <Image src={photo.src} alt={photo.alt} fill priority={priority} sizes={sizes} className="object-cover" />
        <div aria-hidden="true" className={`${backdrops.photoScrim} absolute inset-0`} />
      </div>
      {children}
    </div>
  );
}
