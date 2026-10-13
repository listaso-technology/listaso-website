import type { IconName } from "@/components/icons/Icon";
import type { Link, SignatureText } from "@/content/home/en";

export type { Link, SignatureText };

export type ProductSlug =
  | "pre-sales"
  | "direct-sales"
  | "inventory"
  | "delivery"
  | "back-office"
  | "b2b-ecommerce"
  | "forms"
  | "sami"
  | "custom-development";

export type ProductMetadata = {
  title: string;
  description: string;
  path: `/${ProductSlug}/`;
};

export type ProductHeroContent = {
  /** Current page label in the breadcrumb trail. */
  breadcrumb: string;
  eyebrow: string;
  title: SignatureText;
  lead: string;
  /** Plan availability line shown under the lead. */
  plan?: string;
};

export type Feature = { icon: IconName; title: string; text: string };

export type SectionCopy = {
  eyebrow: string;
  title: SignatureText;
  lead?: string;
};

export type FeatureSection = SectionCopy & { items: readonly Feature[] };

export type Step = { title: string; text: string };
