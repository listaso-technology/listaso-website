import type { CSSProperties } from "react";
import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import type { Feature, FeatureSection } from "@/content/products/types";
import { cx } from "@/lib/utils/cx";
import { ProofGrid } from "../home/ProofGrid";
import { ProductSection } from "../product/ProductSection";
import { proofTone } from "../proofTones";
import { SectionHeader } from "../SectionHeader";
import styles from "./BentoFeatures.module.css";
import { FillPhoto, type AnyPhoto } from "./HeroParts";

/*
 * Cell spans on a 6-column desktop grid, per item count, so every row is
 * full. Photo cells take the large spans so the copy over them has room.
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
  /** Photos placed behind the first photo cells, in order. */
  photos?: readonly AnyPhoto[];
  tone?: "page" | "alt";
};

type CellProps = { item: Feature; photo?: AnyPhoto; span: string; index: number };

function Cell({ item, photo, span, index }: CellProps) {
  const number = String(index + 1).padStart(2, "0");
  const style = { "--i": index } as CSSProperties;

  if (photo) {
    return (
      <li data-reveal-item className={cx(styles.item, "sm:col-span-2", span)} style={style}>
        <article data-glow-card data-surface="band" className={cx(styles.card, styles.photoCard)}>
          <div aria-hidden="true" className={styles.photoLayer}>
            <FillPhoto photo={photo} sizes="(min-width: 1024px) 60vw, 92vw" />
          </div>
          <span aria-hidden="true" className={styles.photoScrim} />
          <span aria-hidden="true" className={styles.spotlight} />
          <span aria-hidden="true" className={styles.numberPill}>
            {number}
          </span>
          <div className={styles.photoCopy}>
            <span className={styles.photoChip}>
              <Icon name={item.icon} size={24} />
            </span>
            <h3 className={styles.photoTitle}>{item.title}</h3>
            <p className={styles.photoText}>{item.text}</p>
          </div>
        </article>
      </li>
    );
  }

  return (
    <li data-reveal-item className={cx(styles.item, span)} style={style}>
      <article data-glow-card data-tone={proofTone(index)} className={styles.card}>
        <span aria-hidden="true" className={styles.spotlight} />
        <span aria-hidden="true" className={styles.watermark}>
          <Icon name={item.icon} size={48} />
        </span>
        <span className={styles.cardTop}>
          <span className={styles.chip}>
            <Icon name={item.icon} size={24} />
          </span>
          <span aria-hidden="true" className={styles.number}>
            {number}
          </span>
        </span>
        <span className={styles.cardCopy}>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.text}>{item.text}</p>
        </span>
      </article>
    </li>
  );
}

/**
 * Feature bento shared by Products, Integrations and SAMI pages; each page
 * passes its own copy and photos. Mixed cell sizes with photos in the large
 * cells. With a mouse, cards tilt slightly toward the pointer, a spotlight and
 * border glow follow it, the icon watermark drifts (parallax) and photos zoom.
 * Touch, keyboard and reduced motion get the static layout.
 */
export function BentoFeatures({ id, section, photos = [], tone }: BentoFeaturesProps) {
  const count = section.items.length;

  return (
    <ProductSection labelledBy={id} tone={tone} className={styles.section}>
      <span aria-hidden="true" className={styles.pattern} />
      <Container width="wide" className="relative flex flex-col gap-12">
        <SectionHeader id={id} eyebrow={section.eyebrow} title={section.title} lead={section.lead} />
        <ProofGrid
          data-reveal="group"
          cardSelector="[data-glow-card]"
          className={cx(styles.grid, "grid auto-rows-auto gap-4 sm:grid-cols-2 lg:grid-cols-6")}
        >
          {section.items.map((item, index) => {
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
        </ProofGrid>
      </Container>
    </ProductSection>
  );
}
