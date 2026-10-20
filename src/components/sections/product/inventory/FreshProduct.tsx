import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { productMedia } from "@/content/media/products";
import { freshProduct, lotExample, plans } from "@/content/products/inventory";
import { cx } from "@/lib/utils/cx";
import { SectionHeader } from "../../SectionHeader";
import { CheckList } from "../CheckList";
import { ProductSection } from "../ProductSection";

/**
 * Lot rotation illustration. It is a picture of the app, not a data table,
 * so it is exposed as one image with a description.
 */
function LotRotation() {
  const example = lotExample;

  return (
    <div
      role="img"
      aria-label={example.label}
      data-reveal="media"
      className="flex flex-col gap-4 rounded-lg border border-line-subtle bg-surface-raised p-6 shadow-e2"
    >
      <span aria-hidden="true" className="text-h4 font-semibold text-fg-heading">
        {example.product}
      </span>
      <span aria-hidden="true" className="flex flex-col text-small">
        <span className="grid grid-cols-[1fr_1fr_1fr_auto] gap-x-4 border-b border-line-subtle pb-2 font-semibold text-fg-muted">
          {example.columns.map((column) => (
            <span key={column}>{column}</span>
          ))}
        </span>
        {example.rows.map((row) => (
          <span
            key={row.lot}
            className={cx(
              "grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-x-4 border-b border-line-subtle py-3 last:border-b-0",
              row.first && "font-semibold text-fg-heading",
            )}
          >
            <span className="flex flex-col gap-1">
              {row.lot}
              {row.first ? (
                <span className="w-fit rounded-full bg-surface-soft px-2 text-caption font-bold uppercase text-fg-accent">
                  {example.firstLabel}
                </span>
              ) : null}
            </span>
            <span>{row.expires}</span>
            <span>{row.location}</span>
            <span className="text-right">{row.qty}</span>
          </span>
        ))}
      </span>
    </div>
  );
}

/** "Fresh product, under control": lots and FIFO, plus plan availability. */
export function FreshProduct() {
  const photo = productMedia.inventoryForklift;

  return (
    <ProductSection labelledBy="fresh-title" tone="alt">
      <Container className="flex flex-col gap-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <SectionHeader
              id="fresh-title"
              eyebrow={freshProduct.eyebrow}
              title={freshProduct.title}
              lead={freshProduct.lead}
            />
            <CheckList items={freshProduct.checks} columns={2} />
          </div>
          <LotRotation />
        </div>

        <div className="grid items-stretch gap-8 md:grid-cols-[0.8fr_1.2fr]">
          {/* The photo fills the row; its height follows the plans panel. */}
          <figure
            data-reveal="media"
            className="relative aspect-[4/3] overflow-hidden rounded-lg bg-surface-soft md:aspect-auto md:min-h-80"
          >
            <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 767px) 92vw, 36vw" className="object-cover" />
          </figure>
          <div data-reveal="fade" className="flex flex-col gap-6 rounded-lg border border-line-subtle bg-surface-raised p-6 lg:p-8">
            <p className="text-eyebrow font-bold uppercase text-fg-accent">{plans.tagline}</p>
            <dl className="flex flex-col divide-y divide-line-subtle">
              {plans.rows.map((row) => (
                <div key={row.plan} className="grid gap-2 py-4 first:pt-0 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="text-body font-bold text-fg-heading">{row.plan}</dt>
                  <dd className="text-body text-fg-muted">{row.text}</dd>
                </div>
              ))}
            </dl>
            <Button href={plans.cta.href} variant="secondary" className="mt-auto w-fit">
              {plans.cta.label}
            </Button>
          </div>
        </div>
      </Container>
    </ProductSection>
  );
}
