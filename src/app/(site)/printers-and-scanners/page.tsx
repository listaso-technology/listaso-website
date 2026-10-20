import { FinalCta } from "@/components/sections/home/FinalCta";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import { PrinterModels, SupportedDevices } from "@/components/sections/integrations/PrintersSections";
import { BentoFeatures } from "@/components/sections/variants/BentoFeatures";
import { HeroStatement } from "@/components/sections/variants/HeroStatement";
import { NextPage } from "@/components/sections/variants/NextPage";
import { sectionMedia } from "@/content/media/sections";
import { hero, metadata as content, printingOptions } from "@/content/integrations/printers";
import { systemPageCopy } from "@/content/integrations/systems";
import { pageMetadata } from "@/lib/page-metadata";

// Content, sources and viability notes: docs/INTEGRATIONS_CONTENT_CONTRACT.md.
export const metadata = pageMetadata(content);

export default function PrintersAndScannersPage() {
  return (
    <>
      <HeroStatement
        content={hero}
        icon="print"
        location="printers-hero"
        trail={systemPageCopy.trail}
        ctas={false}
        photo={sectionMedia.warehouseRacks}
      />
      <BentoFeatures id="options-title" section={printingOptions} />
      <PrinterModels />
      <SupportedDevices />
      <NextPage group="Integrations" current={content.path} />
      <FinalCta />
      <HomeMotion />
    </>
  );
}
