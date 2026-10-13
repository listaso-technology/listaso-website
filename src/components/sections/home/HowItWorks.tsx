import Image from "next/image";
import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { TextLink } from "@/components/ui/TextLink";
import { howItWorks } from "@/content/home/en";
import { homeMedia } from "@/content/media/placeholders";
import { SectionHeader } from "../SectionHeader";
import styles from "./HowItWorks.module.css";

/** Order-to-payment flow: four connected steps plus related capabilities. */
export function HowItWorks() {
  const photo = homeMedia.operationsShelving;

  return (
    <section aria-labelledby="how-title" data-story-section className={`${styles.section} py-16 lg:py-24`}>
      <Container className="flex flex-col gap-12">
        <SectionHeader
          id="how-title"
          eyebrow={howItWorks.eyebrow}
          title={howItWorks.title}
          lead={howItWorks.lead}
        />

        <div data-flow-root data-active-step="0" className={styles.storyGrid}>
          <div className={styles.visualColumn}>
            <figure data-reveal="media" className={styles.visualFrame}>
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 1023px) 92vw, 42vw"
                className={styles.visualImage}
              />
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
                <div className={styles.chapterHeading}>
                  <span aria-hidden="true" className={styles.chapterNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.chapterIcon}>
                    <Icon name={step.icon} size={20} />
                  </span>
                </div>
                <div className={styles.chapterBody}>
                  <h3 className="text-h3 font-semibold text-balance text-fg-heading">{step.title}</h3>
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

        <ul data-reveal="group" className={styles.capabilityGrid}>
          {howItWorks.more.map((item) => (
            <li data-reveal-item key={item.link.href} className={styles.capabilityItem}>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-soft text-icon-accent">
                <Icon name={item.icon} size={20} />
              </span>
              <div className="flex flex-col gap-2">
                <p className="text-body text-fg-muted">
                  <strong className="font-semibold text-fg-default">{item.lead}</strong> {item.text}
                </p>
                <TextLink href={item.link.href} className="w-fit">
                  {item.link.label}
                  <Icon name="arrow-right" size={16} className="self-center" />
                </TextLink>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
