import Image from "next/image";
import { getBrandAsset, type BrandAssetId } from "@/content/brand/assets";
import { cx } from "@/lib/utils/cx";

type BrandAssetProps = {
  id: BrandAssetId;
  /** Rendered height in px; width follows the official aspect ratio. */
  height: number;
  /**
   * Accessible name. Pass "" only for decorative repeats, for example when the
   * same brand name is already written next to the logo.
   */
  alt: string;
  className?: string;
  priority?: boolean;
};

/** Official logo or product mark, rendered unchanged from public/brand/. */
export function BrandAsset({ id, height, alt, className, priority = false }: BrandAssetProps) {
  const asset = getBrandAsset(id);
  const width = Math.round((asset.width / asset.height) * height);

  return (
    <Image
      src={asset.file}
      width={width}
      height={height}
      alt={alt}
      priority={priority}
      className={cx("max-w-full", className)}
      style={{ height: "auto" }}
    />
  );
}

type ThemedLogoProps = Omit<BrandAssetProps, "id"> & {
  light: BrandAssetId;
  dark: BrandAssetId;
};

/**
 * Pair of logo variants that follows the active theme (system preference,
 * [data-theme] override, or a band/SAMI surface). The hidden variant is
 * display:none, so only one name is exposed to assistive technology.
 */
export function ThemedLogo({ light, dark, className, ...rest }: ThemedLogoProps) {
  return (
    <>
      <BrandAsset id={light} className={cx("theme-light-only", className)} {...rest} />
      <BrandAsset id={dark} className={cx("theme-dark-only", className)} {...rest} />
    </>
  );
}
