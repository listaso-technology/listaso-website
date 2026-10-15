import { Container } from "@/components/layout/Container";
import { sectionMedia } from "@/content/media/sections";
import { channels, offices } from "@/content/company/contact";
import { cx } from "@/lib/utils/cx";
import { ProductSection } from "../product/ProductSection";
import { DossierHeader } from "../variants/DossierHeader";
import { DossierPhoto } from "../variants/DossierPhoto";
import { TextRoll } from "../variants/TextRoll";
import dossier from "../variants/dossier.module.css";

/**
 * Contact channels in three ruled columns (ddark.dev's "Channels"): the role
 * in brackets, a title, and each email or phone as a large link.
 */
export function ContactChannels() {
  return (
    <div data-story-section className="py-16 lg:py-24">
      <Container width="wide">
        <div data-reveal="group" className="grid border-t-2 border-fg-heading lg:grid-cols-3">
          {channels.map((group, index) => (
            <div
              data-reveal-item
              key={group.role}
              className={cx(
                "flex flex-col gap-6 border-b border-line-subtle py-8 lg:border-b-0",
                index > 0 && "lg:border-l lg:pl-8",
                index < channels.length - 1 && "lg:pr-8",
              )}
            >
              <p className={cx(dossier.bracket, "text-small font-bold tracking-widest text-fg-accent uppercase")}>{group.role}</p>
              <h2 className="text-h3 font-bold text-fg-heading uppercase">{group.title}</h2>
              <ul className="flex flex-col border-t border-line-subtle">
                {group.lines.map((line) => (
                  <li key={line.label} className="border-b border-line-subtle">
                    {line.href ? (
                      <a
                        href={line.href}
                        className="flex min-h-14 items-center py-3 text-body-lg font-semibold break-words text-fg-heading underline-offset-4 hover:underline"
                        data-analytics-event="contact_click"
                        data-analytics-channel={line.href.startsWith("tel:") ? "phone" : "email"}
                      >
                        <TextRoll>{line.label}</TextRoll>
                      </a>
                    ) : (
                      <span className="flex min-h-14 items-center py-3 text-body-lg text-fg-default">{line.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

/** Offices: halftone context photo, city and address. */
export function ContactOffices() {
  return (
    <ProductSection labelledBy="offices-title" tone="alt">
      <Container width="wide" className="flex flex-col gap-12">
        <DossierHeader id="offices-title" eyebrow={offices.eyebrow} title={offices.title} />
        <ul className="grid gap-10 md:grid-cols-2">
          {offices.items.map((office) => (
            <li key={office.city} className="flex flex-col gap-6">
              <DossierPhoto photo={sectionMedia[office.photo]} />
              <div data-reveal="group" className="flex flex-col gap-3 border-t-2 border-fg-heading pt-6">
                <h3 data-reveal-item className="text-h3 font-bold text-fg-heading uppercase">
                  {office.city}
                </h3>
                <address data-reveal-item className="text-body-lg text-fg-muted not-italic">
                  {office.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </ProductSection>
  );
}
