import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import type { SectionCopy } from "@/content/products/types";
import { SectionHeader } from "../../SectionHeader";
import { ProductSection } from "../ProductSection";
import { SamiBrandText } from "./SamiBrandText";
import { SamiZohoEmbed } from "./SamiZohoEmbed";

export type SamiSalesContactContent = SectionCopy & {
  id: string;
  audienceTitle: string;
  audiences: readonly {
    id: "existing_customer" | "new_customer";
    title: string;
    description: string;
  }[];
  integrationTitle: string;
  integrationDescription: string;
  formUrl: string;
};

type SamiSalesContactProps = {
  section: SamiSalesContactContent;
};

/**
 * Hosts the Zoho iframe embed. Submissions, rules and emails stay inside Zoho.
 * The native alternative (SamiTrialForm) is parked: Zoho rejects its htmlRecords POST.
 */
export function SamiSalesContact({ section }: SamiSalesContactProps) {
  return (
    <ProductSection
      id={section.id}
      labelledBy="sami-sales-contact-title"
      tone="alt"
      className="scroll-mt-24"
    >
      <Container className="flex flex-col gap-12">
        <SectionHeader
          id="sami-sales-contact-title"
          eyebrow={section.eyebrow}
          title={section.title}
          lead={section.lead}
        />

        <div className="grid min-w-0 items-stretch gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
          <div className="lg:relative">
            {/* Stays pinned below the header while the long form scrolls. */}
            <div className="flex flex-col gap-6 lg:sticky lg:top-28 motion-reduce:lg:static">
              <h3 className="text-h4 font-semibold text-fg-heading">
                {section.audienceTitle}
              </h3>
              <ul className="divide-y divide-line-subtle border-y border-line-subtle">
                {section.audiences.map((audience) => (
                  <li key={audience.id} className="flex gap-4 py-6">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-soft text-icon-accent">
                      <Icon
                        name={
                          audience.id === "existing_customer"
                            ? "customers"
                            : "new"
                        }
                      />
                    </span>
                    <div className="flex min-w-0 flex-col gap-2">
                      <h4 className="text-body font-bold text-fg-heading">
                        {audience.title}
                      </h4>
                      <p className="text-body text-fg-muted">
                        <SamiBrandText text={audience.description} />
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            role="region"
            aria-labelledby="sami-sales-integration-title"
            aria-describedby="sami-sales-integration-description"
            className="flex min-w-0 flex-col gap-6 rounded-lg border border-line-subtle bg-surface-raised p-4 sm:p-8 lg:p-10"
          >
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-surface-soft text-icon-accent">
                <Icon name="forms" size={32} />
              </span>
              <p className="rounded-full border border-line-subtle px-4 py-2 text-small font-semibold text-fg-muted">
                14-day free trial
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h3
                id="sami-sales-integration-title"
                className="text-h3 font-semibold text-fg-heading"
              >
                <SamiBrandText text={section.integrationTitle} />
              </h3>
              <p
                id="sami-sales-integration-description"
                className="text-body text-fg-muted"
              >
                <SamiBrandText text={section.integrationDescription} />
              </p>
            </div>
            <SamiZohoEmbed formUrl={section.formUrl} />
          </div>
        </div>
      </Container>
    </ProductSection>
  );
}
