import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { ResponsivePhoto } from "@/components/media/ResponsivePhoto";
import { sectionMedia } from "@/content/media/sections";
import { features, spotlightTitles } from "@/content/products/b2b-ecommerce";
import { SectionHeader } from "../../SectionHeader";
import { ProductSection } from "../ProductSection";
import { StoreShowcase } from "./StoreShowcase";
import styles from "./StoreFeatures.module.css";

const spotlight = features.items.filter((item) =>
  (spotlightTitles as readonly string[]).includes(item.title),
);
const rest = features.items.filter((item) => !(spotlightTitles as readonly string[]).includes(item.title));

/**
 * Store features. The three customer-facing essentials share a navy stage
 * with the store photo (formerly a separate image band); the other six follow
 * as a hairline spec grid. Same copy as the source grid.
 */
export function StoreFeatures() {
  return (
    <ProductSection labelledBy="features-title" className={styles.section}>
      <Container className={styles.layout}>
        <SectionHeader id="features-title" eyebrow={features.eyebrow} title={features.title} lead={features.lead} />
        <StoreShowcase
          spotlight={spotlight}
          photo={
            <ResponsivePhoto
              photo={sectionMedia.storeCounter}
              sizes="(min-width: 1024px) 50vw, 100vw"
              fill
              className={styles.photo}
            />
          }
        />
        <ul data-reveal="group" className={styles.specs}>
          {rest.map((item, index) => (
            <li key={item.title} data-reveal-item className={styles.specItem}>
              <div className={styles.spec}>
                <span aria-hidden="true" className={styles.specTop}>
                  <span className={styles.specIcon}>
                    <Icon name={item.icon} size={20} />
                  </span>
                  <span className={styles.specIndex}>{String(index + spotlight.length + 1).padStart(2, "0")}</span>
                </span>
                <h3 className={styles.specTitle}>{item.title}</h3>
                <p className={styles.specText}>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </ProductSection>
  );
}
