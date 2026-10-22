import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { productMedia } from "@/content/media/products";
import { routeExample, whyItMatters } from "@/content/products/delivery";
import backdrops from "../../backdrops.module.css";
import { SectionHeader } from "../../SectionHeader";
import { RouteStory } from "./RouteStory";
import styles from "./WhyItMatters.module.css";

/**
 * Benefit index → route stop it illustrates: signed proof → "Signed",
 * returns → "1 return logged", routes → "Next stop", payments → "Paid at the
 * door". Presentation only; copy comes from content/products/delivery.ts.
 */
const benefitStops = [0, 1, 3, 2] as const;

/** "Why it matters" on the brand band: benefits linked to an animated day's route over the driver photo. */
export function WhyItMatters() {
  const photo = productMedia.deliveryDriver;

  return (
    <section aria-labelledby="why-title" data-surface="band" data-story-section className={`${backdrops.brandMesh} ${styles.section}`}>
      <span aria-hidden="true" className={styles.grid} />
      <Container width="wide" className={styles.layout}>
        <SectionHeader id="why-title" eyebrow={whyItMatters.eyebrow} title={whyItMatters.title} lead={whyItMatters.lead} />
        <RouteStory
          checks={whyItMatters.checks}
          route={routeExample}
          links={benefitStops}
          photo={
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1024px) 34vw, 92vw"
              className={styles.photoImage}
            />
          }
        />
      </Container>
    </section>
  );
}
