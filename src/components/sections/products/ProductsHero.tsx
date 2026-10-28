import { Container } from "@/components/layout/Container";
import { BrandAsset } from "@/components/brand/BrandAsset";
import { Signature } from "@/components/sections/Signature";
import { Button } from "@/components/ui/Button";
import { hero } from "@/content/products/hub";
import styles from "./ProductsHub.module.css";

const steps = ["Sales", "Inventory", "Delivery", "Back Office"] as const;

/** The four labeled nodes remain readable even if motion or SVG is unavailable. */
export function ProductsHero() {
  return (
    <section aria-labelledby="products-title" data-surface="band" className={styles.hero}>
      <Container width="wide" className={styles.heroLayout}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 id="products-title" className={styles.heroTitle}><Signature text={hero.title} /></h1>
          <p className={styles.heroLead}>{hero.lead}</p>
          <div className={styles.heroActions}>
            <Button href="#product-explorer" size="lg">{hero.explore}</Button>
            <a href="/integrations/" className={styles.heroTextLink}>{hero.integrations} <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div className={styles.heroDiagram} role="img" aria-label="Listaso products support sales, inventory, delivery and Back Office workflows">
          <svg className={styles.diagramLines} viewBox="0 0 600 560" fill="none" aria-hidden="true" focusable="false">
            <path d="M100 145 C230 95 390 95 500 145 M500 145 C565 235 555 345 500 420 M500 420 C375 490 220 490 100 420 M100 420 C45 330 50 235 100 145" />
            <path className={styles.diagramCross} d="M100 145 C230 245 370 310 500 420 M500 145 C375 245 220 310 100 420" />
            <circle cx="300" cy="282" r="126" />
            <circle cx="300" cy="282" r="98" />
          </svg>
          <div className={styles.diagramCenter}>
            <BrandAsset id="listaso-symbol-white" height={48} alt="" className={styles.diagramMark} />
            <span>Listaso</span>
          </div>
          {steps.map((step, index) => (
            <div key={step} className={`${styles.diagramNode} ${styles[`node${index + 1}`]}`}>
              <span className={styles.nodeNumber}>0{index + 1}</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
