"use client";

import Image from "next/image";
import { type CSSProperties, type ReactNode, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import type { PhotoSlot } from "@/content/media/products";
import type { Feature } from "@/content/products/types";
import { cx } from "@/lib/utils/cx";
import styles from "./IdeasShowcase.module.css";

/**
 * "What distributors use forms for": the shelf photo as a stage with a form
 * card over it that previews the selected idea's fields (wordless: photo
 * slots and a counter, rating stars, checks and a signature; aria-hidden),
 * and the ideas as options beside it (buttons with aria-pressed; hover,
 * focus or click selects). Every idea's title and text stay visible.
 */
export function IdeasShowcase({ items, photo, header }: { items: readonly Feature[]; photo: PhotoSlot; header: ReactNode }) {
  const [active, setActive] = useState(0);
  const item = items[active];

  return (
    <div className={styles.layout}>
      <div data-reveal="media" className={styles.stage}>
        <div className={styles.photo}>
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(max-width: 1023px) 92vw, 40vw"
            className={styles.photoImage}
          />
          <span aria-hidden="true" className={styles.photoShade} />
        </div>

        <div aria-hidden="true" data-theme="light" className={styles.form}>
          <span className={styles.formHead}>
            <span className={styles.formIcon}>
              <Icon name={item.icon} size={20} />
            </span>
            <span className={styles.formTitle}>{item.title}</span>
            <span className={styles.formStep}>
              {String(active + 1).padStart(2, "0")}/{String(items.length).padStart(2, "0")}
            </span>
          </span>
          <span key={active} className={styles.fields}>
            <FormFields index={active} photo={photo.src} />
          </span>
          <span className={styles.formFoot}>
            <span className={styles.submit}>
              <Icon name="check" size={16} />
            </span>
          </span>
        </div>
      </div>

      <div className={styles.side}>
        {header}
      <ul className={styles.options}>
        {items.map((feature, index) => (
          <li key={feature.title}>
            <button
              type="button"
              aria-pressed={index === active}
              className={cx(styles.option, index === active && styles.optionActive)}
              onClick={() => setActive(index)}
              onFocus={() => setActive(index)}
              onPointerEnter={(event) => event.pointerType === "mouse" && setActive(index)}
            >
              <span aria-hidden="true" className={styles.optionIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true" className={styles.optionIcon}>
                <Icon name={feature.icon} size={24} />
              </span>
              <span className={styles.optionCopy}>
                <span className={styles.optionTitle}>{feature.title}</span>
                <span className={styles.optionText}>{feature.text}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

const delay = (step: number) => ({ "--d": step }) as CSSProperties;

/** Wordless fields for each idea, in the order of the content. */
function FormFields({ index, photo }: { index: number; photo: string }) {
  if (index === 0) {
    return (
      <>
        <span className={styles.thumbs} style={delay(0)}>
          {[18, 50, 82].map((x) => (
            <span key={x} className={styles.thumb} style={{ backgroundImage: `url(${photo})`, backgroundPosition: `${x}% 40%` }} />
          ))}
          <span className={styles.thumbAdd}>
            <Icon name="photo" size={16} />
          </span>
        </span>
        <span className={styles.row} style={delay(1)}>
          <span className={styles.line} />
          <span className={styles.stepper}>
            <Icon name="plus" size={16} />
          </span>
        </span>
        <span className={styles.lineShort} style={delay(2)} />
      </>
    );
  }

  if (index === 1) {
    return (
      <>
        <span className={styles.stars} style={delay(0)}>
          {[0, 1, 2, 3, 4].map((star) => (
            <span key={star} className={cx(styles.star, star < 4 && styles.starOn)} style={delay(star)}>
              <Icon name="rating" size={20} />
            </span>
          ))}
        </span>
        <span className={styles.input} style={delay(1)}>
          <span className={styles.line} />
        </span>
        <span className={styles.input} style={delay(2)}>
          <Icon name="calendar" size={16} />
          <span className={styles.lineShort} />
        </span>
      </>
    );
  }

  return (
    <>
      {[0, 1].map((check) => (
        <span key={check} className={styles.row} style={delay(check)}>
          <span className={styles.check}>
            <Icon name="check" size={16} />
          </span>
          <span className={styles.line} />
        </span>
      ))}
      <span className={styles.row} style={delay(2)}>
        <span className={styles.thumb} style={{ backgroundImage: `url(${photo})`, backgroundPosition: "60% 30%" }} />
        <span className={styles.signature}>
          <svg viewBox="0 0 120 36" preserveAspectRatio="none">
            <path d="M4 26 C 14 6, 22 6, 26 22 S 38 34, 46 16 S 60 4, 66 20 S 80 32, 92 14 S 108 10, 116 18" pathLength={1} />
          </svg>
        </span>
      </span>
    </>
  );
}
