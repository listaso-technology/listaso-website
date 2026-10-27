import { Container } from "@/components/layout/Container";
import { purpose, story, values } from "@/content/company/about";
import { ProductSection } from "../product/ProductSection";
import { SamiBrandText } from "../product/sami/SamiBrandText";
import { DossierBox } from "../variants/DossierBox";
import { DossierHeader } from "../variants/DossierHeader";
import { KineticWords } from "../variants/KineticWords";

/** Our story (sticky header, the first paragraph as a statement) with Mission and Vision boxes. */
export function AboutStory() {
  return (
    <ProductSection labelledBy="story-title">
      <Container width="wide" className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <DossierHeader
          id="story-title"
          eyebrow={story.eyebrow}
          title={story.title}
          className="lg:sticky lg:top-28 lg:col-span-5 lg:h-fit"
        />
        <div className="flex flex-col gap-12 lg:col-span-7">
          <div data-reveal="group" className="flex flex-col gap-6">
            {story.paragraphs.map((paragraph, index) => (
              <p
                data-reveal-item
                key={paragraph}
                className={index === 0 ? "text-h4 font-semibold text-fg-heading" : "text-body-lg text-fg-muted"}
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {purpose.map((item) => (
              <DossierBox key={item.label} title={item.label}>
                <p className="py-5 text-body-lg font-medium text-fg-heading"><SamiBrandText text={item.text} /></p>
              </DossierBox>
            ))}
          </div>
        </div>
      </Container>
    </ProductSection>
  );
}

/** Values as kinetic pillar rows. */
export function AboutValues() {
  return (
    <ProductSection labelledBy="values-title" tone="alt">
      <Container width="wide" className="flex flex-col gap-12">
        <DossierHeader id="values-title" eyebrow={values.eyebrow} title={values.title} />
        <KineticWords items={values.items} />
      </Container>
    </ProductSection>
  );
}
