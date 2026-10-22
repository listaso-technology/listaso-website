import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { customers } from "@/content/home/en";
import { SectionHeader } from "../SectionHeader";
import { TestimonialSpotlight } from "./TestimonialSpotlight";
import styles from "./CustomerProof.module.css";

type Logo = (typeof customers.logos)[number];

function LogoImage({ logo }: { logo: Logo }) {
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={Math.round((logo.width / logo.height) * 56)}
      height={56}
      className={styles.logoImage}
      style={{ width: "auto", height: "auto" }}
    />
  );
}

/**
 * Approved testimonials and customer logos (DEC-013), copy unchanged.
 * TestimonialSpotlight features one review at a time with a reviewer
 * selector; the logos form a rail of light plates that loops continuously
 * (user instruction), pausing on hover or focus, and
 * becomes a static grid with reduced motion.
 */
export function CustomerProof() {
  return (
    <section aria-labelledby="customers-title" data-story-section className={styles.section}>
      <Container className={styles.layout}>
        <SectionHeader
          id="customers-title"
          eyebrow={customers.eyebrow}
          title={customers.title}
          lead={customers.lead}
        />

        <div data-reveal="fade">
          <TestimonialSpotlight
            testimonials={customers.testimonials}
            label={customers.reviewsLabel}
            starsLabel={customers.starsLabel}
          />
        </div>

        {/* Each logo sits on a light plate in both themes: not every logo has a dark variant. */}
        <div className={styles.ribbon}>
          <div className={styles.ribbonSide}>
            <p aria-hidden="true" className={styles.ribbonLabel}>
              {customers.logosLabel}
            </p>
          </div>
          <div data-theme="light" className={styles.ribbonViewport}>
            <div className={styles.ribbonTrack}>
              <ul aria-label={customers.logosLabel} className={styles.logoList}>
                {customers.logos.map((logo) => (
                  <li key={logo.src} className={styles.logoItem}>
                    {"href" in logo ? (
                      <a href={logo.href} target="_blank" rel="nofollow noopener noreferrer" className={styles.logoLink}>
                        <LogoImage logo={logo} />
                      </a>
                    ) : (
                      <span className={styles.logoLink}>
                        <LogoImage logo={logo} />
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              {/* Decorative second half that makes the loop seamless. */}
              <div aria-hidden="true" className={styles.logoCopy}>
                {customers.logos.map((logo) => (
                  <span key={logo.src} className={styles.logoItem}>
                    <span className={styles.logoLink}>
                      <Image
                        src={logo.src}
                        alt=""
                        width={Math.round((logo.width / logo.height) * 56)}
                        height={56}
                        className={styles.logoImage}
                        style={{ width: "auto", height: "auto" }}
                      />
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
