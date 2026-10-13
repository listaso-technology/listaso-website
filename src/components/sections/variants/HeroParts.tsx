import Image from "next/image";
import { Icon, type IconName } from "@/components/icons/Icon";
import { ResponsivePhoto } from "@/components/media/ResponsivePhoto";
import { Button } from "@/components/ui/Button";
import type { PhotoSlot } from "@/content/media/products";
import type { SectionPhoto } from "@/content/media/sections";
import { productCtas } from "@/content/products/shared";
import { cx } from "@/lib/utils/cx";

export type AnyPhoto = PhotoSlot | SectionPhoto;

/** Demo and pricing CTAs (start-version `phero`). */
export function HeroCtas({ location, className }: { location: string; className?: string }) {
  return (
    <div data-reveal-item className={cx("flex flex-wrap gap-4", className)}>
      <Button
        href={productCtas.demo.href}
        size="lg"
        data-analytics-event="cta_demo_click"
        data-analytics-location={location}
      >
        {productCtas.demo.label}
      </Button>
      <Button
        href={productCtas.pricing.href}
        variant="secondary"
        size="lg"
        data-analytics-event="cta_secondary_click"
        data-analytics-location={location}
      >
        {productCtas.pricing.label}
      </Button>
    </div>
  );
}

/** Eyebrow with the product icon in a ring. */
export function HeroEyebrow({ icon, children }: { icon: IconName; children: string }) {
  return (
    <p data-reveal-item className="flex items-center gap-3 text-eyebrow font-bold uppercase text-fg-accent">
      <span className="flex size-10 items-center justify-center rounded-full border border-line-subtle text-icon-accent">
        <Icon name={icon} size={20} />
      </span>
      {children}
    </p>
  );
}

/** Plan availability line. */
export function HeroPlan({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <p
      data-reveal-item
      className="flex w-fit max-w-full items-start gap-2 rounded-md border border-line-subtle px-4 py-3 text-left text-small text-fg-default"
    >
      <Icon name="check" size={20} className="shrink-0 text-icon-accent" />
      {children}
    </p>
  );
}

type FillPhotoProps = {
  photo: AnyPhoto;
  sizes: string;
  eager?: boolean;
  className?: string;
};

/** Fills a positioned frame with either a product photo or a responsive section photo. */
export function FillPhoto({ photo, sizes, eager = false, className }: FillPhotoProps) {
  if ("base" in photo) {
    return <ResponsivePhoto photo={photo} sizes={sizes} eager={eager} fill className={className} />;
  }
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      className={cx("object-cover", className)}
      {...(eager ? ({ loading: "eager", fetchPriority: "high" } as const) : ({ loading: "lazy" } as const))}
    />
  );
}
