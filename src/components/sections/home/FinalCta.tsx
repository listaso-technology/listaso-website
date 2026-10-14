import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { TextLink } from "@/components/ui/TextLink";
import { finalCta } from "@/content/home/en";
import backdrops from "../backdrops.module.css";
import { Signature } from "../Signature";

/**
 * Closing demo band (start-version cta_band). The contact box is light glass:
 * it sits over the aqua hotspot, where on-band link colors would drop below
 * AA, and glass keeps its own light tokens.
 */
export function FinalCta() {
  return (
    <section aria-labelledby="final-title" data-surface="band" data-story-section className={backdrops.brandMesh}>
      <Container className="grid items-center gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
        <div data-reveal="group" className="flex flex-col gap-4">
          <h2 id="final-title" data-reveal="mask" className="overflow-hidden text-h2 text-balance text-fg-heading">
            <span data-reveal-content className="block"><Signature text={finalCta.title} /></span>
          </h2>
          <p data-reveal-item className="max-w-2xl text-lead text-fg-muted">{finalCta.lead}</p>
        </div>
        <GlassPanel data-reveal="media" className="flex flex-col gap-4">
          <Button
            href={finalCta.cta.href}
            size="lg"
            className="w-full"
            data-analytics-event="cta_demo_click"
            data-analytics-location="final"
          >
            {finalCta.cta.label}
          </Button>
          <p className="text-body">
            {finalCta.call.prefix}{" "}
            <TextLink
              href={finalCta.call.phone.href}
              className="font-semibold"
              data-analytics-event="contact_click"
              data-analytics-channel="phone"
            >
              {finalCta.call.phone.label}
            </TextLink>
            , {finalCta.call.suffix}
          </p>
          <p className="text-body">
            {finalCta.email.label}{" "}
            <TextLink
              href={`mailto:${finalCta.email.address}`}
              data-analytics-event="contact_click"
              data-analytics-channel="email"
            >
              {finalCta.email.address}
            </TextLink>
          </p>
        </GlassPanel>
      </Container>
    </section>
  );
}
