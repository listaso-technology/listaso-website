import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { SnapCarousel } from "@/components/ui/SnapCarousel";
import { customers } from "@/content/home/en";
import { SectionHeader } from "../SectionHeader";
import { Stars } from "./Stars";
import styles from "./CustomerProof.module.css";

/**
 * Approved testimonials and customer logos (DEC-013). The carousel is native
 * scroll-snap, so every review remains visible and swipeable without JavaScript.
 */
export function CustomerProof() {
  return (
    <section aria-labelledby="customers-title" data-story-section className="py-16 lg:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeader
          id="customers-title"
          eyebrow={customers.eyebrow}
          title={customers.title}
          lead={customers.lead}
        />

        <div data-reveal="group">
          <SnapCarousel label={customers.reviewsLabel} variant="reviews" autoPlay>
            {customers.testimonials.map((item) => (
              <Card data-reveal-item key={item.name} as="article" className={styles.reviewCard}>
                <figure className="flex h-full flex-col gap-4">
                  <Stars label={customers.starsLabel} />
                  <blockquote className="text-body text-fg-default">
                    <p>{item.quote}</p>
                  </blockquote>
                  <figcaption className="mt-auto flex flex-col text-small">
                    <span className="font-semibold text-fg-heading">{item.name}</span>
                    <span className="text-fg-muted">{item.source}</span>
                  </figcaption>
                </figure>
              </Card>
            ))}
          </SnapCarousel>
        </div>

        {/* Logos sit on light plates in both themes: not every logo has a dark variant. */}
        <ul data-reveal="group" aria-label={customers.logosLabel} data-theme="light" className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {customers.logos.map((logo) => {
            const content = (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={Math.round((logo.width / logo.height) * 56)}
                height={56}
                className={styles.logoImage}
                style={{ width: "auto", height: "auto" }}
              />
            );

            return (
              <li data-reveal-item key={logo.src}>
                {"href" in logo ? (
                  <a
                    href={logo.href}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className={`${styles.logoPlate} ${styles.logoLink}`}
                  >
                    {content}
                  </a>
                ) : (
                  <div className={styles.logoPlate}>{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
