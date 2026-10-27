import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { sami } from "@/content/home/en";
import backdrops from "../backdrops.module.css";
import { Signature } from "../Signature";
import { SamiBrandText } from "../product/sami/SamiBrandText";
import { SamiConversation } from "./SamiConversation";
import { SamiLogoMark } from "./SamiLogoMark";

export function SamiSpotlight() {
  return (
    <section
      aria-labelledby="sami-title"
      data-surface="sami"
      data-story-section
      data-sami-motion-scope
      className={backdrops.samiCanvas}
    >
      <Container className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div data-reveal="group" className="flex flex-col gap-6">
          <div data-reveal-item className="flex flex-wrap items-center gap-4">
            <SamiLogoMark alt={sami.logoAlt} />
            <p className="flex flex-col gap-1 text-eyebrow font-bold uppercase sm:flex-row sm:items-center sm:gap-2">
              <span className="text-fg-heading"><SamiBrandText text={sami.badge.primary} /></span>
              <span className="text-fg-accent">{sami.badge.accent}</span>
            </p>
          </div>
          <h2 id="sami-title" data-reveal="mask" className="overflow-hidden text-h2-compact text-balance text-fg-heading">
            <span data-reveal-content className="block"><Signature text={sami.title} /></span>
          </h2>
          <p data-reveal-item className="text-lead text-fg-muted"><SamiBrandText text={sami.lead} /></p>
          <ul data-reveal-item className="flex flex-wrap gap-2">
            {sami.chips.map((chip) => (
              <li key={chip} className="rounded-full border border-line-subtle px-4 py-1 text-small text-fg-default">
                {chip}
              </li>
            ))}
          </ul>
          <div data-reveal-item className="flex flex-wrap items-center gap-6">
            <Button href={sami.cta.href} size="lg" data-analytics-event="sami_cta_click" data-analytics-location="home">
              {sami.cta.label}
            </Button>
            <p className="text-body text-fg-muted">
              {sami.price.prefix} <strong className="text-h4 font-bold text-fg-heading">{sami.price.amount}</strong>{" "}
              {sami.price.suffix}
            </p>
          </div>
        </div>
        <SamiConversation />
      </Container>
    </section>
  );
}
