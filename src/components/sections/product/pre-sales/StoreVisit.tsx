import { productMedia } from "@/content/media/products";
import { sectionMedia } from "@/content/media/sections";
import { visit } from "@/content/products/pre-sales";
import { StoryPhoto } from "../../variants/ImageBand";
import { StickyStory, type StoryStep } from "../../variants/StickyStory";

const STEP_PHOTOS = [
  sectionMedia.storeCounter,
  productMedia.preSalesTablet,
  sectionMedia.accountingDesk,
  sectionMedia.warehouseAerial,
] as const;

/** "A store visit": the four steps with a sticky photo per step. */
export function StoreVisit() {
  const steps: StoryStep[] = visit.steps.map((step, index) => ({
    ...step,
    media: <StoryPhoto photo={STEP_PHOTOS[index]} />,
  }));

  return <StickyStory id="visit-title" copy={visit} steps={steps} tone="alt" />;
}
