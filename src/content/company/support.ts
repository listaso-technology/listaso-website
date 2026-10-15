/**
 * Support (/support/). Source: start-version/source/build/pages_company.py,
 * support_body(). New route (DEC-011). Response times, hours, scores and the
 * review reuse the approved Homepage support copy (src/content/home/en.ts,
 * DEC-013) so both pages always match.
 */
import { customers, support as homeSupport } from "@/content/home/en";
import { contact } from "@/content/site/navigation";
import type { ProductHeroContent, SectionCopy, Step } from "@/content/products/types";

export const metadata = {
  path: "/support/",
  title: "Customer Support in English & Spanish | Listaso",
  description:
    "Real people on a bilingual team. Urgent issues answered in 15 minutes. Monday to Friday 8 am to 8 pm Eastern, weekend emergencies. Rated 4.7 on Google.",
} as const;

export const hero: ProductHeroContent = {
  breadcrumb: "Support",
  eyebrow: "Support",
  title: { emphasis: "Real people.", rest: "In your language. With fast answers." },
  lead: "Many of our customers came to Listaso because their last provider wouldn't answer the phone. Our bilingual team responds within times we publish right here.",
};

export const responseTimes = {
  eyebrow: "Response times",
  title: { emphasis: "How fast", rest: "we answer" },
  columns: homeSupport.table.columns,
  rows: homeSupport.table.rows,
  hours: homeSupport.hours,
} as const satisfies SectionCopy & Record<string, unknown>;

export const reach = {
  title: "How to reach us",
  channels: [
    { label: "Phone", value: `${contact.phone.label}, option 1`, href: "tel:+13059127770,1" },
    { label: "Support email", value: contact.emails.support, href: `mailto:${contact.emails.support}` },
    {
      label: "Urgent, after hours and weekends",
      value: contact.emails.urgent,
      href: `mailto:${contact.emails.urgent}`,
    },
  ],
  scores: homeSupport.scores,
} as const;

export const urgent: SectionCopy & { steps: readonly Step[] } = {
  eyebrow: "When something is urgent",
  title: { emphasis: "If you can't sell,", rest: "we drop everything" },
  lead: "Here's what happens when you report that you can't take orders, deliver or collect.",
  steps: [
    { title: "We answer within 15 minutes", text: "A real person, in English or Spanish." },
    { title: "Our developers join right away", text: "Urgent issues go straight to the team that can fix them." },
    { title: "We keep you updated", text: "You get an update every 15 minutes until it's fixed." },
    { title: "We explain what happened", text: "After the fix, we tell you the cause and what we did about it." },
  ],
};

export const voices: SectionCopy & { quotes: typeof customers.testimonials } = {
  eyebrow: "What customers say",
  title: { emphasis: "Support", rest: "people talk about" },
  quotes: customers.testimonials,
};
