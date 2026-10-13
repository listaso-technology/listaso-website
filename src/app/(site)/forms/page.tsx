import { FinalCta } from "@/components/sections/home/FinalCta";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import { FormsHowItWorks, FormsIdeas, QuestionTypes } from "@/components/sections/product/forms/FormsSections";
import { SurveyScreen } from "@/components/sections/product/forms/SurveyExample";
import { RelatedProducts } from "@/components/sections/product/RelatedProducts";
import { HeroStatement } from "@/components/sections/variants/HeroStatement";
import { NextPage } from "@/components/sections/variants/NextPage";
import { sectionMedia } from "@/content/media/sections";
import { hero, metadata as content, related } from "@/content/products/forms";
import { pageMetadata } from "@/lib/page-metadata";

// Content: docs/PRODUCT_CONTENT_CONTRACT.md. Layout variants: docs/SECTION_VARIANTS.md.
export const metadata = pageMetadata(content);

export default function FormsPage() {
  return (
    <>
      <HeroStatement
        content={hero}
        icon="forms"
        location="forms-hero"
        photo={sectionMedia.tabletWarehouse}
        overlay={<SurveyScreen compact className="w-[min(100%,22rem)] shadow-e3" />}
      />
      <FormsHowItWorks />
      <QuestionTypes />
      <FormsIdeas />
      <RelatedProducts products={related} tone="alt" />
      <NextPage group="Products" current={content.path} />
      <FinalCta />
      <HomeMotion />
    </>
  );
}
