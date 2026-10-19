/**
 * About Listaso (/about/). Source: start-version/source/build/pages_company.py,
 * about_body(). New route approved in DEC-013. The brand figures section is
 * reused from the Homepage (Homepage and About us only, DEC-016 update).
 */
import type { ProductHeroContent, SectionCopy } from "@/content/products/types";

export const metadata = {
  path: "/about/",
  title: "About Listaso | Since 2015",
  description:
    "Sales, delivery and inventory software for distributors, specialists in food and beverage. Since 2015, 400+ customers, bilingual team in Miami and El Salvador.",
} as const;

export const hero: ProductHeroContent = {
  breadcrumb: "About Listaso",
  eyebrow: "About us",
  title: { emphasis: "Technology", rest: "for the people who keep stores stocked" },
  lead: "Listaso builds the sales, delivery and inventory tools that distributors, wholesalers and manufacturers use every day, with deep roots in food and beverage and a bilingual team in Miami and El Salvador.",
};

export const story: SectionCopy & { paragraphs: readonly string[] } = {
  eyebrow: "Our story",
  title: { emphasis: "Since 2015,", rest: "growing with our customers" },
  paragraphs: [
    "Listaso was founded in October 2015, but our work with distributors started earlier. Some of our customers have been with our team since before Listaso existed.",
    "Today more than 400 distributors use Listaso to take orders, run their warehouses, deliver and get paid. Nearly one in three has been with us for more than five years.",
    "Most of our customers are Hispanic businesses, and our team speaks their language, in English and in Spanish.",
  ],
};

export const purpose = [
  {
    label: "Mission",
    text: "To connect every order, delivery and payment in one simple platform, so distributors, wholesalers and manufacturers can sell more, waste less and grow on their own terms.",
  },
  {
    label: "Vision",
    text: "To be the platform distributors across the Americas trust to run their business, from the first order to the last payment, with AI that makes every decision easier.",
  },
] as const;

export const values: SectionCopy & { items: readonly { title: string; text: string }[] } = {
  eyebrow: "Our values",
  title: { emphasis: "What stays the same", rest: "as we grow" },
  items: [
    { title: "Customers first", text: "Every decision starts with what helps our customers sell and deliver." },
    { title: "Excellence", text: "We keep improving our skills so our customers get the best results." },
    { title: "New challenges", text: "We welcome hard problems and keep building new tools, like SAMI AI and Forms." },
  ],
};

export const links = [
  { href: "/listaso-impact/", title: "Listaso Impact", text: "How our team gives back in our communities." },
  { href: "/join-us/", title: "Careers", text: "Culture, growth and benefits at Listaso." },
  { href: "/contact-us/", title: "Contact us", text: "Offices, phones and emails." },
] as const;
