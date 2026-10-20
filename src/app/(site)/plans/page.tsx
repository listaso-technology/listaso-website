import { FinalCta } from "@/components/sections/home/FinalCta";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import { CompareTable } from "@/components/sections/pricing/CompareTable";
import { PlanBoard } from "@/components/sections/pricing/PlanBoard";
import { FaqList } from "@/components/sections/variants/FaqList";
import { faq, metadata as content } from "@/content/pricing/plans";
import { pageMetadata } from "@/lib/page-metadata";

// Content and open questions: docs/COMPANY_PRICING_CONTENT_CONTRACT.md.
export const metadata = pageMetadata(content);

export default function PlansPage() {
  return (
    <>
      <PlanBoard />
      <CompareTable />
      <FaqList id="plans-faq-title" copy={faq} items={faq.items} />
      <FinalCta />
      <HomeMotion />
    </>
  );
}
