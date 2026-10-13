import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { customers } from "@/content/home/en";
import { SectionHeader } from "../SectionHeader";
import { Stars } from "./Stars";

/**
 * Approved testimonials and customer logos (DEC-013). Reviews render as a
 * static grid: all content stays visible without a carousel or JavaScript.
 */
export function CustomerProof() {
  return (
    <section aria-labelledby="customers-title" data-story-section className="py-16 lg:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeader
          id="customers-title"
          eyebrow={customers.eyebrow}
          title={customers.title}
          lead={customers.lead}
        />

        <ul data-reveal="group" aria-label={customers.reviewsLabel} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {customers.testimonials.map((item) => (
            <Card data-reveal-item key={item.name} as="li">
              <figure className="flex h-full flex-col gap-4">
                <Stars label={customers.starsLabel} />
                <blockquote className="text-body text-fg-default">
                  <p>{item.quote}</p>
                </blockquote>
                <figcaption className="mt-auto flex flex-col text-small">
                  <span className="font-semibold text-fg-heading">{item.name}</span>
                  <span className="text-fg-muted">{item.source}</span>
                </figcaption>
              </figure>
            </Card>
          ))}
        </ul>

        {/* Logos sit on light plates in both themes: not every logo has a dark variant. */}
        <ul data-reveal="group" aria-label={customers.logosLabel} data-theme="light" className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {customers.logos.map((logo) => (
            <li
              data-reveal-item
              key={logo.type === "image" ? logo.src : logo.name}
              className="flex min-h-24 items-center justify-center rounded-md border border-line-subtle bg-surface-page p-4 text-center"
            >
              {logo.type === "image" ? (
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={Math.round((logo.width / logo.height) * 48)}
                  height={48}
                  className="max-h-12 w-auto max-w-full"
                />
              ) : (
                <span className="text-body font-semibold text-fg-heading">{logo.name}</span>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
