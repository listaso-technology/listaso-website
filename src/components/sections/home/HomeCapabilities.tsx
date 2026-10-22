import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { ResponsivePhoto } from "@/components/media/ResponsivePhoto";
import { TextLink } from "@/components/ui/TextLink";
import { capabilities } from "@/content/home/en";
import { sectionMedia } from "@/content/media/sections";
import { CapabilityRail } from "./CapabilityRail";
import styles from "./HomeCapabilities.module.css";

/** Temporary photography per capability (DEC-009), in content order. */
const photos = [
  sectionMedia.storeCounter,
  sectionMedia.tabletWarehouse,
  sectionMedia.accountingDesk,
  sectionMedia.industryWine,
];

/**
 * Four additional capabilities as photo cards. Every card keeps its full copy
 * in the DOM. Below 1024px they form a swipeable row with all copy visible;
 * from 1024px CapabilityRail turns them into an expanding row where one card
 * is open (pointer, focus, click or a paced autoplay with progress controls).
 * The open copy has a fixed width, so it never re-wraps while cards resize.
 */
export function HomeCapabilities() {
  const count = capabilities.items.length;

  return (
    <section aria-labelledby="capabilities-title" data-story-section className="py-16 lg:py-20">
      <Container>
        <h2 id="capabilities-title" className="sr-only">
          {capabilities.label}
        </h2>
        <CapabilityRail
          id="home-capabilities"
          titles={capabilities.items.map((item) => item.title)}
          className={styles.rail}
        >
          {capabilities.items.map((item, index) => {
            const position = `${String(index + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;

            return (
              <li key={item.link.href} className={styles.item}>
                {/* Reveal on a wrapper: the motion rules would replace the item's resize transition. */}
                <div data-reveal-item className={styles.reveal}>
                  <article data-surface="band" className={styles.card}>
                    <div aria-hidden="true" className={styles.media}>
                      <ResponsivePhoto
                        photo={photos[index % photos.length]}
                        sizes="(min-width: 1024px) 60vw, 85vw"
                        fill
                        decorative
                        className={styles.photo}
                      />
                    </div>
                    <div aria-hidden="true" className={styles.scrim} />

                    {/* Collapsed label (desktop only); the open copy below names the card. */}
                    <div aria-hidden="true" className={styles.collapsed}>
                      <span className={styles.chip}>
                        <Icon name={item.icon} size={24} />
                      </span>
                      <span className={styles.verticalTitle}>{item.title}</span>
                    </div>

                    <div className={styles.content}>
                      <span aria-hidden="true" className={styles.position}>
                        {position}
                      </span>
                      <div className={styles.heading}>
                        <span className={styles.chip}>
                          <Icon name={item.icon} size={24} />
                        </span>
                        <h3 className={styles.title}>{item.title}</h3>
                      </div>
                      <p className={styles.lead}>{item.lead}</p>
                      <p className={styles.text}>{item.text}</p>
                      <TextLink href={item.link.href} className={styles.link}>
                        {item.link.label}
                        <Icon name="arrow-right" size={16} className={styles.arrow} />
                      </TextLink>
                    </div>
                  </article>
                </div>
              </li>
            );
          })}
        </CapabilityRail>
      </Container>
    </section>
  );
}
