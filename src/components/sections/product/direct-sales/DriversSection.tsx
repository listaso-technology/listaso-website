import Image from "next/image";
import { magnificMedia } from "@/content/media/magnific";
import { drivers } from "@/content/products/direct-sales";
import { PrintedReceipt } from "../PrintedReceipt";
import { ColorBand } from "../../variants/ColorBand";

/**
 * "For your drivers" as a brand band (Thorstensson's paired showcase): the
 * crates being unloaded next to the invoice printed at the store, with the
 * benefits and a smaller supporting image.
 */
export function DriversSection() {
  const photo = magnificMedia.vanDriver;

  return (
    <ColorBand
      id="drivers-title"
      copy={drivers}
      aside={
        <div data-reveal="fade" className="flex flex-col gap-5 border-t border-line-subtle pt-6">
          <h3 className="text-h4 font-semibold text-fg-heading">{drivers.benefitsTitle}</h3>
          <ul className="grid gap-4">
            {drivers.benefits.map((benefit) => (
              <li key={benefit.emphasis} className="text-body text-fg-default">
                <strong>{benefit.emphasis}</strong> {benefit.text}
              </li>
            ))}
          </ul>
        </div>
      }
      pair={[
        <figure key="photo" className="w-full max-w-xs overflow-hidden rounded-lg shadow-e3">
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
