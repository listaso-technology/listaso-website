import Image from "next/image";
import { Icon } from "@/components/icons/Icon";
import { TextLink } from "@/components/ui/TextLink";
import { productMedia } from "@/content/media/products";
import { drivers, hardware } from "@/content/products/direct-sales";
import { CheckList } from "../CheckList";
import { PrintedReceipt } from "../PrintedReceipt";
import { ColorBand } from "../../variants/ColorBand";

/**
 * "For your drivers" as a brand band (Thorstensson's paired showcase): the
 * crates being unloaded next to the invoice printed at the store, with the
 * benefits and the compatible hardware link.
 */
export function DriversSection() {
  const photo = productMedia.dsdCrates;

  return (
    <ColorBand
      id="drivers-title"
      copy={drivers}
      aside={
        <div className="flex flex-col gap-8">
          <CheckList items={drivers.checks} />
          <div data-reveal="fade" className="flex flex-col gap-2 border-t border-line-subtle pt-6">
            <p className="text-eyebrow font-bold uppercase text-fg-accent">{hardware.tagline}</p>
            <h3 className="text-h4 font-semibold text-fg-heading">{hardware.title}</h3>
            <p className="text-body text-fg-muted">{hardware.text}</p>
            <TextLink href={hardware.link.href} className="w-fit font-semibold">
              {hardware.link.label}
              <Icon name="arrow-right" size={16} className="self-center" />
            </TextLink>
          </div>
        </div>
      }
      pair={[
        <figure key="photo" className="w-full max-w-sm overflow-hidden rounded-lg shadow-e3">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 1024px) 28vw, (min-width: 640px) 44vw, 92vw"
            className="aspect-[4/5] w-full object-cover"
          />
        </figure>,
        <PrintedReceipt key="receipt" className="w-full lg:justify-center" />,
      ]}
    />
  );
}
