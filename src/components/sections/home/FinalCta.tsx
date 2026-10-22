import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { finalCta } from "@/content/home/en";
import backdrops from "../backdrops.module.css";
import { Signature } from "../Signature";
import styles from "./FinalCta.module.css";

/**
 * Closing demo band (start-version cta_band), shared by every page that ends
 * with a demo invitation. Brand mesh + 72px grid; the contact card is a
 * solid dark surface (not light glass) so the on-band roles keep AA over the
 * aqua hotspot. Copy, links and analytics attributes are unchanged.
 */
export function FinalCta() {
  return (
    <section
      aria-labelledby="final-title"
      data-surface="band"
      data-story-section
      className={`${backdrops.brandMesh} ${styles.band}`}
    >
      <span aria-hidden="true" className={styles.grid} />
      <Container className={styles.layout}>
        <div data-reveal="group" className={styles.copy}>
          <span aria-hidden="true" className={styles.accent} />
          <h2 id="final-title" data-reveal="mask" className={styles.title}>
            <span data-reveal-content className="block">
              <Signature text={finalCta.title} />
            </span>
          </h2>
          <p data-reveal-item className={styles.lead}>
            {finalCta.lead}
          </p>
        </div>

        <div data-reveal="media" className={styles.card}>
          <Button
            href={finalCta.cta.href}
            size="lg"
            className={styles.primary}
            data-analytics-event="cta_demo_click"
            data-analytics-location="final"
          >
            {finalCta.cta.label}
            <Icon name="arrow-right" size={20} className={styles.primaryArrow} />
          </Button>

          <ul className={styles.contacts}>
            <li className={styles.contact}>
              <span aria-hidden="true" className={styles.contactIcon}>
                <Icon name="phone" size={20} />
              </span>
              <p className={styles.contactText}>
                <span className={styles.contactLabel}>{finalCta.call.prefix}</span>{" "}
                <a
                  href={finalCta.call.phone.href}
                  className={styles.contactLink}
                  data-analytics-event="contact_click"
                  data-analytics-channel="phone"
                >
                  {finalCta.call.phone.label}
                </a>
                <span className={styles.contactNote}>, {finalCta.call.suffix}</span>
              </p>
            </li>
            <li className={styles.contact}>
              <span aria-hidden="true" className={styles.contactIcon}>
                <Icon name="email" size={20} />
              </span>
              <p className={styles.contactText}>
                <span className={styles.contactLabel}>{finalCta.email.label}</span>{" "}
                <a
                  href={`mailto:${finalCta.email.address}`}
                  className={styles.contactLink}
                  data-analytics-event="contact_click"
                  data-analytics-channel="email"
                >
                  {finalCta.email.address}
                </a>
              </p>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
