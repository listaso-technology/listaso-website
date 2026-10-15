import { cx } from "@/lib/utils/cx";
import dossier from "./dossier.module.css";
import { FillPhoto, type AnyPhoto } from "./HeroParts";

type DossierPhotoProps = {
  photo: AnyPhoto;
  /** Bracketed caption over the frame (optional). */
  caption?: string;
  eager?: boolean;
  className?: string;
};

/**
 * Framed halftone photo (ddark.dev's portrait): thick border, grayscale dot
 * screen that turns to colour on hover, optional bracketed caption.
 */
export function DossierPhoto({ photo, caption, eager = false, className }: DossierPhotoProps) {
  return (
    <figure data-reveal="media" className={cx("border-2 border-fg-heading bg-surface-page p-2", className)}>
      <div className={cx(dossier.halftone, "relative aspect-[4/5] bg-surface-soft")}>
        <FillPhoto photo={photo} sizes="(min-width: 1024px) 36vw, 92vw" eager={eager} />
      </div>
      {caption ? (
        <figcaption className={cx(dossier.bracket, "px-2 pt-3 pb-1 text-small font-semibold tracking-widest text-fg-muted uppercase")}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
