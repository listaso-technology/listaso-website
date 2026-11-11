import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { TextLink } from "@/components/ui/TextLink";
import type { hardware } from "@/content/products/direct-sales";
import { ProductSection } from "../ProductSection";

export function HardwareSection({ content }: { content: typeof hardware }) {
  return (
    <ProductSection labelledBy="hardware-title" tone="alt">
      <Container className="grid gap-6 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center">
        <Icon name="print" size={40} className="text-icon-accent" />
        <div>
          <h2 id="hardware-title" className="text-h2 font-semibold text-fg-heading">{content.title}</h2>
          <p className="mt-3 max-w-3xl text-body-lg text-fg-muted">{content.text}</p>
        </div>
        <TextLink href={content.link.href} className="w-fit font-semibold">
          {content.link.label}<Icon name="arrow-right" size={16} />
        </TextLink>
      </Container>
    </ProductSection>
  );
}
