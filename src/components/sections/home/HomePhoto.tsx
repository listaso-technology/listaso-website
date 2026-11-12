import Image from "next/image";
import type { HomePhoto as Photo } from "@/content/media/home";

/** Pre-generated sizes for the static export; all Home background photos are decorative. */
export function HomePhoto({ photo, sizes, className }: { photo: Photo; sizes: string; className?: string }) {
  return (
    <picture className="absolute inset-0">
      <source
        type="image/webp"
        srcSet={[640, 960, 1440].map((width) => `${photo.base}-${width}.webp ${width}w`).join(", ")}
        sizes={sizes}
      />
      <Image src={`${photo.base}-960.webp`} fill alt="" sizes={sizes} loading="lazy" className={`object-cover ${className ?? ""}`} />
    </picture>
  );
}
