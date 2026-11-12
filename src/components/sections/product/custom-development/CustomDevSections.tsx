import { magnificMedia } from "@/content/media/magnific";
import { process } from "@/content/products/custom-development";
import { StoryPhoto } from "../../variants/ImageBand";
import { StickyStory, type StoryStep } from "../../variants/StickyStory";

const STEP_PHOTOS = [
  magnificMedia.warehouseTeamB,
  magnificMedia.supervisorWorker,
  magnificMedia.warehouseColleagues,
  magnificMedia.warehouseStairs,
] as const;

/** "From idea to working tool": sticky story with one visual per step. */
export function CustomDevProcess() {
  const steps: StoryStep[] = process.steps.map((step, index) => ({
    ...step,
    media: <StoryPhoto photo={STEP_PHOTOS[index]} />,
  }));

  return <StickyStory id="process-title" copy={process} steps={steps} tone="alt" mediaFirst />;
}
