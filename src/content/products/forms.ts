/**
 * Forms and surveys (/forms/). Source: start-version/source/build/
 * pages_more.py, forms_body(), and the survey mock in home_extras.html.
 * The mock's customer name reuses the Homepage example instead of the
 * start-version sample.
 */
import { hero as homeHero } from "@/content/home/en";
import type { FeatureSection, ProductHeroContent, ProductMetadata, SectionCopy, Step } from "./types";

export const metadata: ProductMetadata = {
  path: "/forms/",
  title: "Retail Execution: Forms & Surveys for Store Visits | Listaso",
  description:
    "Build forms in the Back Office and have reps fill them on the tablet at each visit: shelf photos, competitor products, signatures. See answers on a map and in charts.",
};

export const hero: ProductHeroContent = {
  breadcrumb: "Forms and surveys",
  eyebrow: "New · Forms and surveys",
  title: { emphasis: "Know what happens", rest: "at every store visit" },
  lead: "Build your own forms in the Back Office, and your reps fill them in on the tablet during the visit: shelf photos, competitor products, customer feedback and signatures.",
  plan: "Included in Enterprise 360",
};

/** Survey as the rep sees it on the tablet (start-version mock). */
export const surveyExample = {
  label: "Example survey in the sales app: step 3 of 6, asking for a photo of the product on the shelf",
  customer: homeHero.example.order.customer,
  step: "Step 3 of 6",
  title: "Product sales and purchase survey",
  totalSteps: 6,
  currentStep: 3,
  question: "Take a photo of the product on the shelf:",
  addPhoto: "+ Add photo",
  back: "‹ Back",
  next: "Next ›",
  /** Floating chip; from "Pick from 12 question types" (how it works). */
  chip: "12 question types",
} as const;

export const howItWorks: SectionCopy & { steps: readonly Step[] } = {
  eyebrow: "How it works",
  title: { emphasis: "From the office", rest: "to the store and back" },
  lead: "Your office decides what to ask. Your reps answer at the store. You see the results the same day.",
  steps: [
    { title: "Build the form", text: "Pick from 12 question types in the Back Office and save questions to reuse." },
    { title: "Assign it", text: "Choose which customers get it, and make it required before a rep can close the visit." },
    { title: "Fill it at the visit", text: "Reps see it as one page or step by step, with photos and signature." },
    { title: "See the results", text: "Every answer appears in Entries, on a map and in charts." },
  ],
};

export const questionTypes: SectionCopy & { types: readonly string[] } = {
  eyebrow: "Question types",
  title: { emphasis: "12 ways", rest: "to ask" },
  types: [
    "Single line",
    "Multi line",
    "Whole number",
    "Decimal number",
    "Yes / No",
    "Single choice",
    "Dropdown",
    "Multiple choice",
    "Date",
    "Time",
    "Photo",
    "Signature",
  ],
};

export const ideas: FeatureSection = {
  eyebrow: "Ideas",
  title: { emphasis: "What distributors", rest: "use forms for" },
  items: [
    { icon: "photo", title: "Shelf checks", text: "Photos of how your products are displayed, and how many competitor products are next to them." },
    { icon: "rating", title: "Visit feedback", text: "How the customer rates the visit, what they want to order and when to follow up." },
    { icon: "promotion", title: "Promotion follow-up", text: "Check that promotions are in place, with a photo and the customer's signature." },
  ],
};

export const related = ["pre-sales", "back-office", "sami"] as const;
