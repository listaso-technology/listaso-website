import type { CSSProperties } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { accountingSystems, integrationsSection } from "@/content/products/shared";
import type { SectionCopy } from "@/content/products/types";
import { SectionHeader } from "../SectionHeader";
import styles from "./IntegrationsBand.module.css";
import { ProductSection } from "./ProductSection";

type IntegrationsBandProps = {
  tone?: "page" | "alt";
  /** Heading copy; defaults to the product-page integrations section. */
  copy?: SectionCopy;
  cta?: { href: string; label: string };
  /** Path of a system to leave out, e.g. the current integration page. */
  exclude?: string;
};

/** Ellipse radii of the hub, in % of its (square) box. */
const RX = 40;
const RY = 36;

/**
 * Spoke geometry for system `index` of `count`: length (% of the box width)
 * and angle, with nodes spread around an ellipse (none straight up or down).
 * Rounded strings so server and client render identical styles.
 */
function spoke(index: number, count: number) {
  const theta = ((-90 + 180 / count + (360 * index) / count) * Math.PI) / 180;
  const x = RX * Math.cos(theta);
  const y = RY * Math.sin(theta);
  return {
    "--length": `${Math.hypot(x, y).toFixed(3)}%`,
    "--angle": `${((Math.atan2(y, x) * 180) / Math.PI).toFixed(3)}deg`,
  } as CSSProperties;
}

/**
 * Accounting integrations (start-version `int_section` + `erp_strip`), shared
 * by product and integration pages. From 768px the systems sit around the
 * Listaso symbol as a hub; hovering or focusing a system lights its spoke and
 * sends a pulse from Listaso to it. Below 768px the systems form a grid.
 * Every system stays a plain link; copy and destinations are unchanged.
 */
export function IntegrationsBand({
  tone,
  copy = integrationsSection,
  cta = integrationsSection.cta,
  exclude,
}: IntegrationsBandProps) {
  const systems = accountingSystems.filter((system) => system.href !== exclude);

  return (
    <ProductSection labelledBy="integrations-title" tone={tone} className={styles.section}>
      <Container className={styles.layout}>
        <div className={styles.copy}>
          <SectionHeader id="integrations-title" eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} />
          <Button href={cta.href} variant="secondary" icon="arrow-right" className="w-fit">
            {cta.label}
          </Button>
        </div>

        <div className={styles.hubWrap}>
          <div className={styles.hub}>
            <span aria-hidden="true" className={styles.rings} />
            <ul data-reveal="group" aria-label={integrationsSection.listLabel} className={styles.systems}>
              {systems.map((system, index) => (
                <li key={system.href} className={styles.system} style={spoke(index, systems.length)}>
                  <span aria-hidden="true" className={styles.spoke}>
                    <span className={styles.pulse} />
                  </span>
                  <span className={styles.nodeWrap}>
                    {/* Reveal on the link: the wrapper's transform positions the node. */}
                    <a href={system.href} data-reveal-item className={styles.node}>
                      <span aria-hidden="true" className={styles.nodeDot} />
                      {system.label}
                    </a>
                  </span>
                </li>
              ))}
            </ul>
            <span aria-hidden="true" className={styles.core}>
              <Image
                src="/brand/listaso/symbol/listaso-symbol-multicolor-white-main.svg"
                alt=""
                width={141}
                height={141}
                className={styles.coreLogo}
              />
            </span>
          </div>
        </div>
      </Container>
    </ProductSection>
  );
}
