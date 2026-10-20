import { FinalCta } from "@/components/sections/home/FinalCta";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import { AlsoSection, SyncDirections, SystemIndex } from "@/components/sections/integrations/HubSections";
import { HeroStatement } from "@/components/sections/variants/HeroStatement";
import { Marquee } from "@/components/sections/variants/Marquee";
import { PixelDivider } from "@/components/sections/variants/PixelDivider";
import { sectionMedia } from "@/content/media/sections";
import { hero, metadata as content, systemsSection } from "@/content/integrations/hub";
import { accountingSystems } from "@/content/products/shared";
import { pageMetadata } from "@/lib/page-metadata";

// Content, sources and viability notes: docs/INTEGRATIONS_CONTENT_CONTRACT.md.
export const metadata = pageMetadata(content);

export default function IntegrationsPage() {
  return (
    <>
      <HeroStatement content={hero} icon="sync" location="integrations-hero" photo={sectionMedia.accountingDesk} />
      <PixelDivider from="page" to="band" />
      <SyncDirections />
      <Marquee
        items={accountingSystems.map((system) => ({ label: system.label }))}
        label={systemsSection.eyebrow}
        variant="display"
      />
      <SystemIndex />
      <AlsoSection />
      <FinalCta />
      <HomeMotion />
    </>
  );
}
