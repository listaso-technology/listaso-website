import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import type { Feature, FeatureSection } from "@/content/products/types";
import { cx } from "@/lib/utils/cx";
import backdrops from "../backdrops.module.css";
import { ProductSection } from "../product/ProductSection";
import { SectionHeader } from "../SectionHeader";
import { FillPhoto, type AnyPhoto } from "./HeroParts";

/*
 * Cell spans on a 6-column desktop grid, per item count, so every row is
 * full. Photo cells take the large spans so the copy over them has room and
 * a strong scrim.
 */
const LAYOUTS: Record<number, readonly string[]> = {
  3: ["lg:col-span-2", "lg:col-span-2", "lg:col-span-2"],
  4: ["lg:col-span-3", "lg:col-span-3", "lg:col-span-3", "lg:col-span-3"],
  6: ["lg:col-span-4 lg:row-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"],
  8: [
    "lg:col-span-4 lg:row-span-2",
    "lg:col-span-2",
    "lg:col-span-2",
    "lg:col-span-2",
    "lg:col-span-2",
    "lg:col-span-2",
    "lg:col-span-3",
    "lg:col-span-3",
  ],
  9: [
    "lg:col-span-4 lg:row-span-2",
    "lg:col-span-2",
    "lg:col-span-2",
    "lg:col-span-2",
    "lg:col-span-2",
    "lg:col-span-2",
    "lg:col-span-3",
    "lg:col-span-3",
    "lg:col-span-6",
  ],
};

/** Indexes of the cells that carry a photo, per item count. */
const PHOTO_CELLS: Record<number, readonly number[]> = { 3: [], 4: [], 6: [0], 8: [0], 9: [0, 6] };

type BentoFeaturesProps = {
  id: string;
  section: FeatureSection;
  /** Photos placed behind the first cells, in order. */
  photos?: readonly AnyPhoto[];
  tone?: "page" | "alt";
};

function Cell({ item, photo, span, index }: { item: Feature; photo?: AnyPhoto; span: string; index: number }) {
  if (photo) {
    return (
      <li
        data-reveal-item
        data-surface="band"
        className={cx(
          "relative flex min-h-80 flex-col justify-end overflow-hidden rounded-lg bg-surface-band p-6 sm:col-span-2 lg:p-8",
          span,
        )}
      >
        <FillPhoto photo={photo} sizes="(min-width: 1024px) 60vw, 92vw" />
        <div aria-hidden="true" className={`${backdrops.photoScrim} absolute inset-0`} />
        {/* Solid navy under the copy (bottom half), so text keeps AA over any photo. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-surface-band from-45% via-surface-band/80 via-65% to-transparent"
        />
        <div className="relative flex flex-col gap-3">
          <span className="flex size-12 items-center justify-center rounded-md border border-line-subtle text-icon-accent">
            <Icon name={item.icon} size={24} />
          </span>
          <h3 className="text-h3 font-semibold text-fg-heading">{item.title}</h3>
          <p className="max-w-md text-body-lg text-fg-muted">{item.text}</p>
        </div>
      </li>
    );
  }

  return (
    <li
      data-reveal-item
      className={cx(
        "group relative flex min-h-56 flex-col justify-between gap-8 overflow-hidden rounded-lg border border-line-subtle bg-surface-raised p-6",
        span,
      )}
    >
      <span className="flex items-center justify-between">
        <span className="flex size-12 items-center justify-center rounded-md bg-surface-soft text-icon-accent transition-transform duration-(--listaso-duration-standard) motion-safe:group-hover:-rotate-6">
          <Icon name={item.icon} size={24} />
        </span>
        <span aria-hidden="true" className="text-small font-bold text-fg-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
      </span>
      <span className="flex flex-col gap-2">
        <h3 className="text-h4 font-semibold text-fg-heading">{item.title}</h3>
        <p className="text-body text-fg-muted">{item.text}</p>
      </span>
    </li>
  );
}

/** Feature bento (Stavros Symeonidis): mixed cell sizes, photos in the large cells. */
export function BentoFeatures({ id, section, photos = [], tone }: BentoFeaturesProps) {
  return (
    <ProductSection labelledBy={id} tone={tone}>
      <Container width="wide" className="flex flex-col gap-12">
        <SectionHeader id={id} eyebrow={section.eyebrow} title={section.title} lead={section.lead} />
        <ul data-reveal="group" className="grid auto-rows-auto gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {section.items.map((item, index) => {
            const count = section.items.length;
            const photoSlot = (PHOTO_CELLS[count] ?? []).indexOf(index);
            return (
              <Cell
                key={item.title}
                item={item}
                index={index}
                span={LAYOUTS[count]?.[index] ?? "lg:col-span-2"}
                photo={photoSlot >= 0 ? photos[photoSlot] : undefined}
              />
            );
          })}
        </ul>
      </Container>
    </ProductSection>
  );
}
