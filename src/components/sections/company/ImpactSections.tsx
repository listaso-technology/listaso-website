import { Container } from "@/components/layout/Container";
import { areas, partners, posts } from "@/content/company/impact";
import { ProductSection } from "../product/ProductSection";
import { Chronology } from "../variants/Chronology";
import { DossierHeader } from "../variants/DossierHeader";
import { KineticWords } from "../variants/KineticWords";

/** Impact areas as kinetic pillar rows. */
export function ImpactAreas() {
  return (
    <ProductSection labelledBy="areas-title">
      <Container width="wide" className="flex flex-col gap-12">
        <DossierHeader id="areas-title" eyebrow={areas.eyebrow} title={areas.title} />
        <KineticWords items={areas.items.map((title) => ({ title }))} />
      </Container>
    </ProductSection>
  );
}

/** Community posts as a chronology; each entry links to its LinkedIn post. */
export function ImpactPosts() {
  return (
    <ProductSection labelledBy="posts-title" tone="alt">
      <Container width="wide" className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <DossierHeader id="posts-title" eyebrow={posts.eyebrow} title={posts.title} className="lg:sticky lg:top-28 lg:col-span-5 lg:h-fit" />
        <div className="lg:col-span-7">
          <Chronology
            items={posts.items.map((post) => ({ ...post, linkLabel: posts.linkLabel }))}
            highlight={1}
          />
        </div>
      </Container>
    </ProductSection>
  );
}

/** Partner names as a ruled typographic grid (names only, no logos). */
export function ImpactPartners() {
  return (
    <ProductSection labelledBy="partners-title">
      <Container width="wide" className="flex flex-col gap-12">
        <DossierHeader id="partners-title" eyebrow={partners.eyebrow} title={partners.title} />
        <ul data-reveal="group" className="grid border-t-2 border-fg-heading sm:grid-cols-2 lg:grid-cols-3">
          {partners.names.map((name, index) => (
            <li
              data-reveal-item
              key={name}
              className="flex min-h-32 items-end justify-between gap-4 border-b border-line-subtle py-6 sm:pr-8"
            >
              <span className="min-w-0 text-h3 font-bold break-words text-fg-heading uppercase xl:text-h2">{name}</span>
              <span aria-hidden="true" className="text-small font-bold text-fg-accent">
                /{String(index + 1).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </ProductSection>
  );
}
