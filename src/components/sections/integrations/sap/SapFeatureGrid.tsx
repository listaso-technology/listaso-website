import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import type { FeatureSection } from "@/content/products/types";
import { cx } from "@/lib/utils/cx";
import { ProductSection } from "../../product/ProductSection";
import { DossierHeader } from "../../variants/DossierHeader";
import { DossierPhoto } from "../../variants/DossierPhoto";
import dossier from "../../variants/dossier.module.css";
import type { AnyPhoto } from "../../variants/HeroParts";
import styles from "./SapFeatureGrid.module.css";

/**
 * SAP features in the dossier language: bracketed index, uppercase titles in
 * a ruled grid framed by a thick border. Hovering (or focusing within) a
 * cell inverts it; the halftone photo beside the header turns to colour on
 * hover.
 */
export function SapFeatureGrid({ id, section, photo }: { id: string; section: FeatureSection; photo: AnyPhoto }) {
  return (
    <ProductSection labelledBy={id} tone="alt">
      <Container width="wide" className={styles.layout}>
        <div className={styles.head}>
          <DossierHeader id={id} eyebrow={section.eyebrow} title={section.title} lead={section.lead} />
          <DossierPhoto photo={photo} className={styles.photo} />
        </div>
        <ul data-reveal="group" className={styles.grid}>
          {section.items.map((item, index) => (
            <li key={item.title} data-reveal-item className={styles.cellItem}>
              <div className={styles.cell}>
                <span aria-hidden="true" className={styles.top}>
                  <span className={cx(dossier.bracket, styles.index)}>{String(index + 1).padStart(2, "0")}</span>
                  <Icon name={item.icon} size={24} />
                </span>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.text}>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </ProductSection>
  );
}
