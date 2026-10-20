/**
 * Rate Listaso (/rating/). Source: the public WordPress page captured on
 * 15 October 2026. Content, metadata, rating totals and published reviews are
 * preserved verbatim; layout is an approved visual evolution (DEC-007/008).
 */
import type { ProductHeroContent } from "@/content/products/types";

export const metadata = {
  path: "/rating/",
  title: "Listaso Technology - Rate Listaso",
  description:
    "Read opinions and reviews about Listaso Technology. Discover how our POS software and B2B tools help optimize businesses and sales.",
} as const;

export const hero: ProductHeroContent = {
  breadcrumb: "Rate Listaso",
  eyebrow: "Rate Listaso",
  title: { emphasis: "Rate", rest: "Listaso" },
  lead:
    "We rely on our forward-thinking processes and collaborative team culture to provide top-notch solutions that empower our partners to meet their objectives.",
};

export const introduction = {
  title: { emphasis: "Rate", rest: "Listaso Technology" },
  text:
    "Our core values define our identity. As we evolve and expand, the principles we hold dear remain constant: prioritizing our customers, striving for excellence, and welcoming new challenges with open arms.",
} as const;

export const reviewForm = {
  ratingLabel: "Your overall rating",
  ratingPlaceholder: "Select a Rating",
  reviewLabel: "Your review",
  reviewPlaceholder: "Tell people your review",
  nameLabel: "Your name",
  namePlaceholder: "Tell us your name",
  submitLabel: "Submit Review",
  submittingLabel: "Submitting, please wait...",
  errorMessage: "Please fix the submission errors.",
} as const;

export const ratingSummary = {
  score: "5.0",
  accessibleLabel: "5.0 out of 5 stars (based on 2 reviews)",
  total: 2,
  distribution: [
    { label: "Excellent", percentage: 100 },
    { label: "Very good", percentage: 0 },
    { label: "Average", percentage: 0 },
    { label: "Poor", percentage: 0 },
    { label: "Terrible", percentage: 0 },
  ],
} as const;

export const reviews = [
  {
    name: "Ismael Alonso",
    initials: "IA",
    date: "July 23, 2026",
    rating: 5,
    text: "Great POS app, we do b2b, invoice at the moment and syncronize everything to our PC at de office",
  },
  {
    name: "Rosalva Rodriguez",
    initials: "RR",
    date: "July 14, 2026",
    rating: 5,
    text:
      "Excellent tool to grow your business. Listaso services definitely make my daily administrative functions easier and more accurate. The knowledgeable staff are always willing to help providing solutions to improve my overall performance towards my own clients. Certainly, a great investment.",
  },
] as const;

export const submissionEndpoint = "https://listaso.com/wp-json/site-reviews/v1/submissions";
