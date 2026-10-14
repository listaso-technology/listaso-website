import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { decisions, pipelineExample } from "@/content/products/back-office";
import { SectionHeader } from "../../SectionHeader";
import { CheckList } from "../CheckList";
import { ProductSection } from "../ProductSection";

/** Illustrative order pipeline: from the rep to the delivery truck. */
function OrderPipeline() {
  const example = pipelineExample;

  return (
    <div
      role="img"
      aria-label={example.label}
      data-reveal="media"
      className="rounded-lg border border-line-subtle bg-surface-raised p-4 shadow-e2 sm:p-6"
    >
      <span aria-hidden="true" className="grid gap-4 sm:grid-cols-3">
        {example.columns.map((column, index) => (
          <span key={column.title} className="flex flex-col gap-3 rounded-md bg-surface-alt p-3">
            <span className="flex items-center justify-between gap-2 text-small font-semibold text-fg-heading">
              {column.title}
              {index < example.columns.length - 1 ? (
                <Icon name="arrow-right" size={16} className="hidden text-fg-muted sm:block" />
              ) : (
                <Icon name="truck" size={16} className="text-icon-accent" />
              )}
            </span>
            {column.orders.map((order) => (
              <span
                key={order}
                className="flex flex-col gap-1 rounded-sm border border-line-subtle bg-surface-raised p-3 text-small"
              >
                <span className="font-semibold text-fg-default">{order}</span>
                <span className="flex items-center gap-1 text-fg-muted">
                  <Icon name="orders" size={16} />
                  <span className="h-2 w-12 rounded-full bg-surface-soft" />
                </span>
              </span>
            ))}
          </span>
        ))}
      </span>
    </div>
  );
}

/** "Your numbers, when you need them": reports, Sami and order control. */
export function BetterDecisions() {
  return (
    <ProductSection labelledBy="decisions-title" tone="alt">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeader
            id="decisions-title"
            eyebrow={decisions.eyebrow}
            title={decisions.title}
            lead={decisions.lead}
          />
          <CheckList items={decisions.checks} />
          <Button
            href={decisions.cta.href}
            variant="secondary"
            className="w-fit"
            data-analytics-event="sami_cta_click"
            data-analytics-location="back-office"
          >
            {decisions.cta.label}
          </Button>
        </div>
        <OrderPipeline />
      </Container>
    </ProductSection>
  );
}
