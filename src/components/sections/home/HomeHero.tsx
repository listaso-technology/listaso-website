import Image from "next/image";
import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { hero } from "@/content/home/en";
import { homeMedia } from "@/content/media/placeholders";
import backdrops from "../backdrops.module.css";
import { Signature } from "../Signature";
import { SamiBrandText } from "../product/sami/SamiBrandText";
import { Stars } from "./Stars";

/**
 * Illustrative product example (approved start-version content). It is one
 * image to assistive technology: the label describes it and the sample data
 * inside is decorative. Two glass surfaces, the maximum per viewport.
 */
function HeroExample() {
  const { example } = hero;
  const photo = homeMedia.heroWarehouse;

  return (
    <div data-reveal="media" className="relative mx-auto w-full max-w-xl lg:mr-0">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-soft shadow-e3">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority
          sizes="(max-width: 1023px) 92vw, 44vw"
          className="object-cover"
        />
        <div aria-hidden="true" className={`${backdrops.photoScrim} absolute inset-0`} />
      </div>

      <GlassPanel
        role="img"
        aria-label={example.label}
        className="absolute -bottom-8 left-4 flex w-[min(88%,24rem)] flex-col gap-3 p-4 sm:left-8 lg:-left-16 lg:bottom-12"
      >
        <div aria-hidden="true" className="flex flex-col gap-1">
          <span className="text-caption font-semibold uppercase text-fg-muted">{example.order.title}</span>
          <span className="text-h4 font-semibold text-fg-heading">{example.order.customer}</span>
        </div>
        <ul aria-hidden="true" className="flex flex-col divide-y divide-line-subtle text-small">
          {example.order.lines.slice(0, 2).map((line) => (
            <li key={line.product} className="grid grid-cols-[1fr_auto] gap-x-4 py-2">
              <span className="font-semibold">{line.product}</span>
              <span className="font-semibold">{line.total}</span>
              <span className="text-fg-muted">{line.detail}</span>
            </li>
          ))}
        </ul>
        <div aria-hidden="true" className="flex items-center justify-between border-t border-line-subtle pt-4">
          <span className="text-body font-semibold">{example.order.totalLabel}</span>
          <span className="text-h4 font-bold text-fg-heading">{example.order.total}</span>
        </div>
        <span aria-hidden="true" className="flex items-center gap-2 text-small font-semibold text-fg-muted">
          <Icon name="check" size={16} className="text-icon-accent" />
          {example.order.sync}
        </span>
      </GlassPanel>

      <GlassPanel
        tone="sami"
        className="absolute top-8 right-4 flex w-64 flex-col gap-2 p-4 sm:right-8 lg:-right-8"
      >
        <span aria-hidden="true" className="flex items-center gap-2 text-small font-semibold">
          <Image src="/brand/sami/sami-logo.webp" alt="" width={24} height={24} />
          <SamiBrandText text={example.sami.name} />
        </span>
        <span aria-hidden="true" className="w-fit rounded-md bg-surface-soft px-3 py-2 text-small">
          {example.sami.question}
        </span>
        <span aria-hidden="true" className="text-small text-fg-muted">
          {example.sami.answer}
        </span>
      </GlassPanel>
    </div>
  );
}

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-title"
      data-surface="band"
      data-story-section
      className={`${backdrops.brandMesh} overflow-hidden`}
    >
      <Container width="wide" className="grid items-center gap-16 py-20 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[0.92fr_1.08fr] lg:py-24">
        <div data-reveal="group" className="relative z-10 flex flex-col gap-6">
          <p data-reveal-item className="text-eyebrow font-bold uppercase text-fg-accent">
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" data-reveal="mask" className="overflow-hidden text-display text-balance text-fg-heading">
            <span data-reveal-content className="block">
              <Signature text={hero.title} />
            </span>
          </h1>
          <p data-reveal-item className="max-w-2xl text-lead text-fg-muted">
            {hero.lead}
          </p>
          <div data-reveal-item className="flex flex-wrap gap-4">
            <Button
              href={hero.primaryCta.href}
              size="lg"
              data-analytics-event="cta_demo_click"
              data-analytics-location="hero"
            >
              {hero.primaryCta.label}
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="secondary"
              size="lg"
              data-analytics-event="cta_secondary_click"
              data-analytics-location="hero"
            >
              {hero.secondaryCta.label}
            </Button>
          </div>
          <ul data-reveal-item className="flex flex-wrap gap-x-8 gap-y-2 text-small text-fg-default">
            {hero.ratings.map((rating) => (
              <li key={rating.label} className="flex items-center gap-2">
                <Stars />
                <strong className="font-bold">{rating.score}</strong>
                <span>{rating.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="pb-8 lg:pb-0">
          <HeroExample />
        </div>
      </Container>
    </section>
  );
}
