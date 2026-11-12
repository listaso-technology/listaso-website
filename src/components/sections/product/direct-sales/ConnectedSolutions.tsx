import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { connectedSolutions } from "@/content/products/direct-sales";
import { SectionHeader } from "../../SectionHeader";
import { ProductSection } from "../ProductSection";

export function ConnectedSolutions() {
  return (
    <ProductSection labelledBy="connected-solutions-title">
      <Container className="flex flex-col gap-10">
        <SectionHeader id="connected-solutions-title" eyebrow={connectedSolutions.eyebrow} title={connectedSolutions.title} lead={connectedSolutions.lead} />
        <ul className="grid gap-6 md:grid-cols-3">
          {connectedSolutions.items.map((item) => (
            <li key={item.href}>
              <a href={item.href} data-analytics-event="product_card_click" data-analytics-label={item.title} className="flex h-full flex-col gap-4 rounded-xl border border-line-subtle bg-surface-alt p-6 transition-colors hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg-accent">
                <Icon name={item.icon} size={24} className="text-icon-accent" />
                <h3 className="text-h4 font-semibold text-fg-heading">{item.title}</h3>
                <p className="text-body text-fg-muted">{item.text}</p>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </ProductSection>
  );
}
