import Image from "next/image";
import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { TextLink } from "@/components/ui/TextLink";
import { howItWorks, solutionsAnchor } from "@/content/home/en";
import { productMedia } from "@/content/media/products";
import { SectionHeader } from "../SectionHeader";
import styles from "./HowItWorks.module.css";

/**
 * Sales-to-delivery workflow: four steps read as one connected flow. A rail
 * links the step numbers; HomeMotion fills it and syncs the sticky photo and
 * caption on wide screens. Without JavaScript or with reduced motion every
 * step stays fully visible and the rail is drawn complete.
 */
export function HowItWorks() {
  const stepPhotos = [
    productMedia.preSalesTablet,
    productMedia.inventoryFloor,
    productMedia.deliveryHandTruck,
    productMedia.backOfficeDashboards,
  ];

  return (
    <section
      id={solutionsAnchor}
      aria-labelledby="how-title"
      data-story-section
      className={`${styles.section} scroll-mt-20 py-16 lg:py-20`}
    >
      <Container className="flex flex-col gap-10 lg:gap-12">
        <SectionHeader
          id="how-title"
          eyebrow={howItWorks.eyebrow}
          title={howItWorks.title}
          lead={howItWorks.lead}
        />

        <div data-flow-root data-active-step="0" className={styles.storyGrid}>
          <div className={styles.visualColumn}>
            <figure data-reveal="media" className={styles.visualFrame}>
              {stepPhotos.map((photo, index) => (
                <span
                  key={photo.src}
                  aria-hidden="true"
                  data-flow-image={index}
                  className={styles.visualImageLayer}
                >
                  <Image
                    src={photo.src}
                    alt=""
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 1023px) 92vw, 40vw"
                    className={styles.visualImage}
                  />
                </span>
              ))}
              <div aria-hidden="true" className={styles.visualScrim} />

              <figcaption className={styles.visualCaption}>
                <span className={styles.visualLabel}>{howItWorks.eyebrow}</span>
                <span className={styles.captionStage} aria-hidden="true">
                  {howItWorks.steps.map((step, index) => (
                    <span key={step.title} data-flow-caption={index} className={styles.captionItem}>
                      <span className={styles.captionNumber}>{String(index + 1).padStart(2, "0")}</span>
                      <span>{step.title}</span>
                    </span>
                  ))}
                </span>
              </figcaption>

              <span aria-hidden="true" className={styles.progressRail}>
                {howItWorks.steps.map((step, index) => (
                  <span key={step.title} data-flow-marker={index} className={styles.progressMarker} />
                ))}
              </span>
            </figure>
          </div>

          <ol className={styles.chapterList}>
            {howItWorks.steps.map((step, index) => (
              <li data-flow-step={index} data-reveal="fade" key={step.title} className={styles.chapter}>
                <span aria-hidden="true" className={styles.chapterNode}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={styles.chapterBody}>
                  <div className="flex items-start gap-3">
                    <span className={styles.chapterIcon}>
                      <Icon name={step.icon} size={24} />
                    </span>
                    <h3 className="pt-1 text-h4 font-semibold text-balance text-fg-heading lg:text-h3">
                      {step.title}
                    </h3>
                  </div>
                  <p className="max-w-xl text-body text-fg-muted">{step.text}</p>
                  <TextLink
                    href={step.link.href}
                    className="w-fit"
                    data-analytics-event="product_card_click"
                    data-analytics-label={step.link.label}
                  >
                    {step.link.label}
                    <Icon name="arrow-right" size={16} className="self-center" />
                  </TextLink>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
