import type { CSSProperties } from "react";
import { Icon } from "@/components/icons/Icon";
import { productMedia } from "@/content/media/products";
import { sectionMedia } from "@/content/media/sections";
import { features, process } from "@/content/products/custom-development";
import { StoryPhoto } from "../../variants/ImageBand";
import { StickyStory, type StoryStep } from "../../variants/StickyStory";
import styles from "./CustomDevSections.module.css";

/** Call-to-plan line that opens the project sheet below the hero. */
export function ProcessIntro() {
  return (
    <>
      <span aria-hidden="true" className={styles.introIcon}>
        <Icon name="phone" size={24} />
      </span>
      <p className={styles.introText}>{process.lead}</p>
    </>
  );
}

/** "What we build": the three kinds of work, with their icons. */
export function BuildList() {
  return (
    <ul className={styles.builds}>
      {features.items.map((item) => (
        <li key={item.title} className={styles.build}>
          <span aria-hidden="true" className={styles.buildIcon}>
            <Icon name={item.icon} size={20} />
          </span>
          {item.title}
        </li>
      ))}
    </ul>
  );
}

/**
 * "How it works": the four steps as a stepper. When the sheet is revealed
 * the line draws and each marker fills in turn (CSS only; final state with
 * reduced motion or without JS).
 */
export function ProcessSteps() {
  return (
    <ol className={styles.steps}>
      {process.steps.map((step, index) => (
        <li key={step.title} className={styles.step} style={{ "--i": index } as CSSProperties}>
          <span aria-hidden="true" className={styles.stepMarker}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={styles.stepCopy}>
            <span className={styles.stepTitle}>{step.title}</span>
            <span className={styles.stepText}>{step.text}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

const STEP_PHOTOS = [
  sectionMedia.storeCounter,
  productMedia.customWhiteboard,
  sectionMedia.codeLaptop,
  sectionMedia.officeCharts,
] as const;

/** "From idea to working tool": sticky story with one visual per step. */
export function CustomDevProcess() {
  const steps: StoryStep[] = process.steps.map((step, index) => ({
    ...step,
    media: <StoryPhoto photo={STEP_PHOTOS[index]} />,
  }));

  return <StickyStory id="process-title" copy={process} steps={steps} tone="alt" mediaFirst />;
}
