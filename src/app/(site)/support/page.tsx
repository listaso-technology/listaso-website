import { SupportTimes, SupportUrgent, SupportVoices } from "@/components/sections/company/SupportSections";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import { ChannelList } from "@/components/sections/variants/ChannelList";
import { HeroDossier } from "@/components/sections/variants/HeroDossier";
import { NextPage } from "@/components/sections/variants/NextPage";
import { hero, metadata as content, reach } from "@/content/company/support";
import { pageMetadata } from "@/lib/page-metadata";

// Content: docs/COMPANY_PRICING_CONTENT_CONTRACT.md. Layout variants: docs/SECTION_VARIANTS.md.
export const metadata = pageMetadata(content);

export default function SupportPage() {
  return (
    <>
      <HeroDossier content={hero} aside={<ChannelList label={reach.title} channels={reach.channels} />} />
      <SupportTimes />
      <SupportUrgent />
      <SupportVoices />
      <NextPage group="Company" current={content.path} />
      <FinalCta />
      <HomeMotion />
    </>
  );
}
