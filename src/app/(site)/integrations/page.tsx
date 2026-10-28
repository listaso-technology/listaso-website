import { FinalCta } from "@/components/sections/home/FinalCta";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import { AlsoSection, SyncDirections, SystemIndex } from "@/components/sections/integrations/HubSections";
import { HeroStatement } from "@/components/sections/variants/HeroStatement";
import { Marquee } from "@/components/sections/variants/Marquee";
import { sectionMedia } from "@/content/media/sections";
import { hero, metadata as content, systemsSection } from "@/content/integrations/hub";
import { accountingSystems } from "@/content/products/shared";
import { productsBridge } from "@/content/integrations/hub";
import { Container } from "@/components/layout/Container";
import { Signature } from "@/components/sections/Signature";
import { pageMetadata } from "@/lib/page-metadata";

// Content, sources and viability notes: docs/INTEGRATIONS_CONTENT_CONTRACT.md.
export const metadata = pageMetadata(content);

export default function IntegrationsPage() {
  return (
    <>
      <HeroStatement content={hero} icon="sync" location="integrations-hero" photo={sectionMedia.accountingDesk} />
      <SyncDirections />
      <Marquee
        items={accountingSystems.map((system) => ({ label: system.label }))}
        label={systemsSection.eyebrow}
        variant="display"
      />
      <SystemIndex />
      <AlsoSection />
      <section aria-labelledby="integrations-products-title" className="bg-surface-alt py-16 lg:py-24">
        <Container className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-small font-extrabold uppercase tracking-[0.14em] text-fg-accent">{productsBridge.eyebrow}</p>
            <h2 id="integrations-products-title" className="mt-3 text-h2 text-fg-heading"><Signature text={productsBridge.title} /></h2>
            <p className="mt-4 text-lead text-fg-muted">{productsBridge.lead}</p>
          </div>
          <a href="/products/" className="inline-flex min-h-12 items-center font-bold text-link underline-offset-4 hover:underline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-focus-ring" data-analytics-event="cta_secondary_click" data-analytics-location="integrations-products">
            {productsBridge.cta} <span aria-hidden="true" className="ml-2">↗</span>
          </a>
        </Container>
      </section>
      <FinalCta />
      <HomeMotion />
    </>
  );
}
