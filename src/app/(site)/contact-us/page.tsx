import { ContactChannels, ContactOffices } from "@/components/sections/company/ContactSections";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import { HeroDossier } from "@/components/sections/variants/HeroDossier";
import { NextPage } from "@/components/sections/variants/NextPage";
import { Button } from "@/components/ui/Button";
import { ctas, hero, metadata as content } from "@/content/company/contact";
import { pageMetadata } from "@/lib/page-metadata";

// Content and the Zoho form link to validate: docs/COMPANY_PRICING_CONTENT_CONTRACT.md.
export const metadata = pageMetadata(content);

export default function ContactPage() {
  return (
    <>
      <HeroDossier
        content={hero}
        actions={
          <>
            <Button href={ctas.demo.href} size="lg" data-analytics-event="cta_demo_click" data-analytics-location="contact-hero">
              {ctas.demo.label}
            </Button>
            <Button
              href={ctas.message.href}
              variant="secondary"
              size="lg"
              icon="external-link"
              data-analytics-event="contact_form_click"
              data-analytics-location="contact-hero"
            >
              {ctas.message.label}
            </Button>
          </>
        }
      />
      <ContactChannels />
      <ContactOffices />
      <NextPage group="Company" current={content.path} />
      <FinalCta />
      <HomeMotion />
    </>
  );
}
