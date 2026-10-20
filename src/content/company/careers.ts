/**
 * Careers (/join-us/). Source: start-version/source/build/pages_company.py,
 * careers_body(). The URL is the existing WordPress route. No stock photo
 * represents Listaso employees.
 */
import type { ProductHeroContent, SectionCopy } from "@/content/products/types";

export const metadata = {
  path: "/join-us/",
  title: "Careers at Listaso",
  description:
    "Work at Listaso: a collaborative culture, professional growth and benefits like health, dental and life insurance, bonuses and a monthly food basket.",
} as const;

export const trail = [{ href: "/about/", label: "About Listaso" }] as const;

export const hero: ProductHeroContent = {
  breadcrumb: "Careers",
  eyebrow: "Careers",
  title: { emphasis: "Be part", rest: "of something big" },
  lead: "We're looking for people who want to push technology forward and help distributors grow.",
};

export const culture: readonly (SectionCopy & { text: string })[] = [
  {
    eyebrow: "Our culture",
    title: { emphasis: "Forward-thinking", rest: "and collaborative" },
    text: "We rely on forward-thinking processes and a collaborative team culture to build solutions that help our partners reach their goals. As we grow, the principles we hold dear stay the same: customers first, excellence, and welcoming new challenges.",
  },
  {
    eyebrow: "Professional growth",
    title: { emphasis: "Keep learning,", rest: "as a person and as a team" },
    text: "We invest in our skills so our customers get the best results and a smooth experience in their sales and inventory operations.",
  },
];

export const benefits: SectionCopy & { items: readonly string[] } = {
  eyebrow: "Benefits",
  title: { emphasis: "We take care", rest: "of our team" },
  lead: "Balancing work and life makes a better workplace for everyone.",
  items: [
    "Anniversary bonus",
    "Health insurance",
    "Dental insurance",
    "Life insurance",
    "Graduation bonus",
    "Monthly food basket",
    "Free snacks and drinks",
    "Breakfast station",
  ],
};

export const openings = {
  title: { emphasis: "Open positions", rest: "" },
  lead: "We post our openings on LinkedIn. Follow us there to see new roles first.",
  cta: { href: "https://www.linkedin.com/company/listaso/jobs/", label: "See Openings on LinkedIn" },
} as const;
