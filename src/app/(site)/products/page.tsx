import { Container } from "@/components/layout/Container";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { ProductExplorer } from "@/components/sections/products/ProductExplorer";
import { ProductsHero } from "@/components/sections/products/ProductsHero";
import { Signature } from "@/components/sections/Signature";
import { additionalApp, connection, metadata as content } from "@/content/products/hub";
import { pageMetadata } from "@/lib/page-metadata";
import styles from "@/components/sections/products/ProductsHub.module.css";

export const metadata = pageMetadata(content);

export default function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <ProductExplorer />
      <section aria-labelledby="products-connection-title" className={styles.connectionSection}>
        <Container width="wide" className={styles.connectionLayout}>
          <div className={styles.connectionVisual} role="img" aria-label="Listaso connects with supported accounting systems">
            <svg viewBox="0 0 620 280" fill="none" aria-hidden="true" focusable="false">
              <path d="M165 140 C260 65 360 65 455 140 M165 140 C260 215 360 215 455 140" />
            </svg>
            <div className={styles.connectionNodes} aria-hidden="true"><span>Listaso</span><span>Systems</span></div>
          </div>
          <div className={styles.connectionCopy}>
            <p className={styles.sectionEyebrow}>{connection.eyebrow}</p>
            <h2 id="products-connection-title"><Signature text={connection.title} /></h2>
            <p>{connection.lead}</p>
            <a href="/integrations/" className={styles.connectionLink} data-analytics-event="cta_secondary_click" data-analytics-location="products-integrations">
              {connection.cta} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Container>
        <Container width="wide" className={styles.additionalApp}>
          <div>
            <h3>{additionalApp.name}</h3>
            <p>{additionalApp.description}</p>
          </div>
          <a href={additionalApp.href} target="_blank" rel="noopener noreferrer" className={styles.additionalAppLink} data-analytics-event="external_appstore_click" data-analytics-label={additionalApp.name}>
            View on App Store <span aria-hidden="true">↗</span>
          </a>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
