import Image from "next/image";
import { Icon } from "@/components/icons/Icon";
import { productMedia } from "@/content/media/products";
import { routeExample, whyItMatters } from "@/content/products/delivery";
import { cx } from "@/lib/utils/cx";
import { CheckList } from "../CheckList";
import { ColorBand } from "../../variants/ColorBand";

/**
 * Illustrative route: every stop keeps its own record. Product UI, so it
 * renders in light on the brand band.
 */
function RouteTimeline() {
  const example = routeExample;

  return (
    <div
      role="img"
      aria-label={example.label}
      data-theme="light"
      className="flex w-full max-w-sm flex-col gap-4 rounded-lg border border-line-subtle bg-surface-raised p-6 shadow-e3"
    >
      <span aria-hidden="true" className="flex items-center gap-2 text-caption font-semibold uppercase text-fg-muted">
        <Icon name="route" size={16} className="text-icon-accent" />
        {example.title}
      </span>
      <span aria-hidden="true" className="relative flex flex-col gap-4">
        <span className="absolute top-3 bottom-3 left-3 w-px -translate-x-1/2 bg-line-subtle" />
        {example.stops.map((stop) => (
          <span key={stop.customer} className="relative grid grid-cols-[1.5rem_1fr] items-start gap-x-4">
            <span
              className={cx(
                "relative flex size-6 items-center justify-center rounded-full",
                stop.state === "done" ? "bg-fg-heading text-fg-on-action" : "border-2 border-fg-heading bg-surface-raised",
              )}
            >
              {stop.state === "done" ? <Icon name="check" size={16} /> : null}
            </span>
            <span className="flex flex-col">
              <span className="text-body font-semibold text-fg-heading">{stop.customer}</span>
              <span className="text-small text-fg-muted">{stop.status}</span>
            </span>
          </span>
        ))}
      </span>
    </div>
  );
}

/** "Why it matters" as a brand band: benefits, a driver photo and the day's route. */
export function WhyItMatters() {
  const photo = productMedia.deliveryDriver;

  return (
    <ColorBand
      id="why-title"
      copy={whyItMatters}
      aside={<CheckList items={whyItMatters.checks} />}
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
        <RouteTimeline key="route" />,
      ]}
    />
  );
}
