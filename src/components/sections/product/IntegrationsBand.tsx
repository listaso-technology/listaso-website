import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { accountingSystems, integrationsSection } from "@/content/products/shared";
import type { SectionCopy } from "@/content/products/types";
import { cx } from "@/lib/utils/cx";
import { SectionHeader } from "../SectionHeader";
import { ProductSection } from "./ProductSection";

type IntegrationsBandProps = {
  tone?: "page" | "alt";
  /** Heading copy; defaults to the product-page integrations section. */
  copy?: SectionCopy;
  cta?: { href: string; label: string };
  /** Path of a system to leave out, e.g. the current integration page. */
  exclude?: string;
};

/** Accounting integrations strip (start-version `int_section` + `erp_strip`). */
export function IntegrationsBand({
  tone,
  copy = integrationsSection,
  cta = integrationsSection.cta,
  exclude,
}: IntegrationsBandProps) {
  const systems = accountingSystems.filter((system) => system.href !== exclude);

  return (
    <ProductSection labelledBy="integrations-title" tone={tone}>
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeader id="integrations-title" eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} />
          <Button href={cta.href} variant="secondary" className="w-fit">
            {cta.label}
          </Button>
        </div>
        <ul
          data-reveal="group"
          aria-label={integrationsSection.listLabel}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {systems.map((system) => (
            <li data-reveal-item key={system.href}>
              <a
                href={system.href}
                className={cx(
                  "flex min-h-20 items-center justify-center rounded-md border border-line-subtle bg-surface-raised px-4 text-center",
                  "text-body font-semibold text-fg-heading",
                  "transition-[border-color,box-shadow] duration-(--listaso-duration-fast) ease-(--listaso-ease-standard)",
                  "hover:border-fg-heading hover:shadow-e1",
                )}
              >
                {system.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </ProductSection>
  );
}
