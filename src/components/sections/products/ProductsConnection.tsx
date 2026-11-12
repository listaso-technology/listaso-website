import { BrandAsset } from "@/components/brand/BrandAsset";
import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { Signature } from "@/components/sections/Signature";
import { howSync } from "@/content/integrations/hub";
import { additionalApp, connection } from "@/content/products/hub";
import { accountingSystems } from "@/content/products/shared";
import styles from "./ProductsConnection.module.css";

/**
 * "Your products and your accounting system": a sync diagram built from the
 * Integrations hub content (both directions and the per-system note) and the
 * eight supported systems as text links (DEC-015: names as text, no logos).
 * The rails carry one light pulse each when the panel reveals (finite);
 * static with reduced motion.
 */
export function ProductsConnection() {
  return (
    <section aria-labelledby="products-connection-title" className={styles.section}>
      <span aria-hidden="true" className={styles.grid} />
      <Container width="wide" className={styles.layout}>
        <div data-reveal="group" className={styles.copy}>
          <p data-reveal-item className={styles.eyebrow}>{connection.eyebrow}</p>
          <h2 data-reveal-item id="products-connection-title" className={styles.title}><Signature text={connection.title} /></h2>
          <p data-reveal-item className={styles.lead}>{connection.lead}</p>
          <a data-reveal-item href="/integrations/" className={styles.link} data-analytics-event="cta_secondary_click" data-analytics-location="products-integrations">
            {connection.cta} <span aria-hidden="true">↗</span>
          </a>
        </div>

        <figure data-reveal="media" className={styles.diagram} aria-label="How Listaso syncs with your accounting system">
          <div className={styles.node}>
            <span className={styles.nodeMark}>
              <BrandAsset id="listaso-symbol-multicolor" height={40} alt="" />
            </span>
            <span className={styles.nodeName}>Listaso</span>
          </div>

          <div className={styles.lanes}>
            <div className={styles.lane} data-direction="up">
              <span aria-hidden="true" className={styles.rail}><span className={styles.pulse} /></span>
              <p className={styles.laneTitle}>
                <Icon name="arrow-right" size={16} className={styles.laneArrow} />
                {howSync.toListaso.title}
              </p>
              <ul data-reveal="group" className={styles.items}>
                {howSync.toListaso.items.map((item) => (
                  <li data-reveal-item key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.lane} data-direction="down">
              <span aria-hidden="true" className={styles.rail}><span className={styles.pulse} /></span>
              <p className={styles.laneTitle}>
                <Icon name="arrow-right" size={16} className={styles.laneArrow} />
                {howSync.fromListaso.title}
              </p>
              <ul data-reveal="group" className={styles.items}>
                {howSync.fromListaso.items.map((item) => (
                  <li data-reveal-item key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <ul className={styles.systems} aria-label="Supported accounting systems">
            {accountingSystems.map((system) => (
              <li key={system.href}>
                <a href={system.href} className={styles.system}>{system.label}</a>
              </li>
            ))}
          </ul>
          <figcaption className={styles.note}>{howSync.note}</figcaption>
        </figure>
      </Container>

      <Container width="wide">
        <div data-reveal="fade" className={styles.app}>
          <span aria-hidden="true" className={styles.appIcon}><Icon name="phone" size={24} /></span>
          <div className={styles.appCopy}>
            <h3>{additionalApp.name}</h3>
            <p>{additionalApp.description}</p>
          </div>
          <a href={additionalApp.href} target="_blank" rel="noopener noreferrer" className={styles.appLink} data-analytics-event="external_appstore_click" data-analytics-label={additionalApp.name}>
            View on App Store <span aria-hidden="true">↗</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
