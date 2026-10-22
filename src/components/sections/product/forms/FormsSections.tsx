import { Container } from "@/components/layout/Container";
import { productMedia } from "@/content/media/products";
import { sectionMedia } from "@/content/media/sections";
import { howItWorks, ideas, questionTypes } from "@/content/products/forms";
import { SectionHeader } from "../../SectionHeader";
import { StoryPhoto } from "../../variants/ImageBand";
import { Marquee } from "../../variants/Marquee";
import { StickyStory, type StoryStep } from "../../variants/StickyStory";
import { ProductSection } from "../ProductSection";
import { IdeasShowcase } from "./IdeasShowcase";
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

/**
 * "What distributors use forms for": the three ideas as options beside the
 * shelf photo, which carries a form card previewing the selected idea.
 */
export function FormsIdeas() {
  return (
    <ProductSection labelledBy="ideas-title">
      <Container>
        <IdeasShowcase
          items={ideas.items}
          photo={productMedia.formsShelf}
          header={<SectionHeader id="ideas-title" eyebrow={ideas.eyebrow} title={ideas.title} />}
        />
      </Container>
    </ProductSection>
  );
}
