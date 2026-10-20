import Image from "next/image";
import { SECTION_WIDTHS, type SectionPhoto } from "@/content/media/sections";
import { cx } from "@/lib/utils/cx";

type ResponsivePhotoProps = {
  photo: SectionPhoto;
  /** Rendered width hint for the browser, e.g. "100vw" or "(min-width: 1024px) 50vw, 100vw". */
  sizes: string;
  /** Above-the-fold image: eager and high fetch priority (no preload, so no double download). */
  eager?: boolean;
  /** Fill the positioned parent (object-cover) instead of keeping intrinsic size. */
  fill?: boolean;
  /** Decorative repeat: empty alt. */
  decorative?: boolean;
  className?: string;
};

/**
 * Static-export friendly responsive image. The `<source>` gives the browser
 * three widths; `next/image` stays as the fallback `<img>` with explicit
 * dimensions (no layout shift). Next's optimizer is off (DEC-006), so the
 * widths are pre-generated files.
 */
export function ResponsivePhoto({
  photo,
  sizes,
  eager = false,
  fill = false,
  decorative = false,
  className,
}: ResponsivePhotoProps) {
  const srcSet = SECTION_WIDTHS.map((width) => `${photo.base}-${width}.webp ${width}w`).join(", ");
  const loading = eager ? ({ loading: "eager", fetchPriority: "high" } as const) : ({ loading: "lazy" } as const);

  return (
    // With `fill`, the <picture> covers the positioned frame so the <img> has a positioned parent.
    <picture className={fill ? "absolute inset-0" : undefined}>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      {fill ? (
        <Image
          src={`${photo.base}-1280.webp`}
          alt={decorative ? "" : photo.alt}
          fill
          sizes={sizes}
          className={cx("object-cover", className)}
          {...loading}
        />
      ) : (
        <Image
          src={`${photo.base}-1280.webp`}
          alt={decorative ? "" : photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={sizes}
          className={className}
          {...loading}
        />
      )}
    </picture>
  );
}
