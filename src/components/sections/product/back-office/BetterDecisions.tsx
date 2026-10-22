import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { dashboardExample, decisions, pipelineExample } from "@/content/products/back-office";
import { SectionHeader } from "../../SectionHeader";
import { ProductSection } from "../ProductSection";
import { BackOfficeConsole } from "./BackOfficeConsole";
import styles from "./BetterDecisions.module.css";

/**
 * Check → part of the Back Office window it describes: sales → chart,
 * orders → pipeline, stock → inventory icon, invoices → invoice icon.
 * Presentation only; copy comes from content/products/back-office.ts.
 */
const checkZones = ["chart", "pipeline", "inventory", "invoices"] as const;

/** "Your numbers, when you need them": checks linked to an animated Back Office window, and the SAMI AI link. */
export function BetterDecisions() {
  return (
    <ProductSection labelledBy="decisions-title" tone="alt" className={styles.section}>
      <span aria-hidden="true" className={styles.glow} />
      <Container className={styles.layout}>
        <SectionHeader id="decisions-title" eyebrow={decisions.eyebrow} title={decisions.title} lead={decisions.lead} />
        <BackOfficeConsole
          checks={decisions.checks}
          zones={checkZones}
          dashboard={dashboardExample}
          pipeline={pipelineExample}
        />
        <div className={styles.cta}>
          <Button
            href={decisions.cta.href}
            variant="secondary"
            icon="arrow-right"
            className="w-fit"
            data-analytics-event="sami_cta_click"
            data-analytics-location="back-office"
          >
            {decisions.cta.label}
          </Button>
        </div>
      </Container>
    </ProductSection>
  );
}
