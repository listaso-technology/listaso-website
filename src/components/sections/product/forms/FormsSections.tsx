import Image from "next/image";
import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { productMedia } from "@/content/media/products";
import { sectionMedia } from "@/content/media/sections";
import { howItWorks, ideas, questionTypes } from "@/content/products/forms";
import { SectionHeader } from "../../SectionHeader";
import { StoryPhoto } from "../../variants/ImageBand";
import { Marquee } from "../../variants/Marquee";
import { StickyStory, type StoryStep } from "../../variants/StickyStory";
import { ProductSection } from "../ProductSection";
import { ResultsPanel } from "./ResultsPanel";
import { SurveyScreen } from "./SurveyExample";

/** "From the office to the store and back": sticky story, one visual per step. */
export function FormsHowItWorks() {
  const media = [
    <StoryPhoto key="build" photo={sectionMedia.officeCharts} />,
    <StoryPhoto key="assign" photo={sectionMedia.storeCounter} />,
    <div key="fill" className="absolute inset-0 flex items-center justify-center bg-surface-band p-6 pt-14">
      <SurveyScreen compact className="w-full max-w-sm shadow-e3" />
    </div>,
    <ResultsPanel key="results" />,
  ];
  const steps: StoryStep[] = howItWorks.steps.map((step, index) => ({ ...step, media: media[index] }));

  return <StickyStory id="how-title" copy={howItWorks} steps={steps} />;
}

/** "12 ways to ask": the question types as large scroll-linked rows. */
export function QuestionTypes() {
  return (
    <ProductSection labelledBy="types-title" tone="alt" className="overflow-hidden">
      <Container>
        <SectionHeader id="types-title" eyebrow={questionTypes.eyebrow} title={questionTypes.title} />
      </Container>
      <Marquee
        items={questionTypes.types.map((type) => ({ label: type }))}
        label={questionTypes.eyebrow}
        variant="display"
        rows={2}
        className="pb-0 lg:pb-0"
      />
    </ProductSection>
  );
}

/** "What distributors use forms for": three ideas beside a shelf photo. */
export function FormsIdeas() {
  const photo = productMedia.formsShelf;

  return (
    <ProductSection labelledBy="ideas-title">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <figure data-reveal="media" className="overflow-hidden rounded-xl bg-surface-soft shadow-e2">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(max-width: 1023px) 92vw, 38vw"
            className="aspect-[4/5] w-full object-cover"
          />
        </figure>
        <div className="flex flex-col gap-10">
          <SectionHeader id="ideas-title" eyebrow={ideas.eyebrow} title={ideas.title} />
          <ul data-reveal="group" className="flex flex-col">
            {ideas.items.map((item) => (
              <li
                data-reveal-item
                key={item.title}
                className="grid grid-cols-[3rem_1fr] gap-x-6 gap-y-2 border-t border-line-subtle py-6 last:border-b"
              >
                <span className="row-span-2 flex size-12 items-center justify-center rounded-md bg-surface-soft text-icon-accent">
                  <Icon name={item.icon} size={24} />
                </span>
                <h3 className="text-h4 font-semibold text-fg-heading">{item.title}</h3>
                <p className="text-body text-fg-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </ProductSection>
  );
}
