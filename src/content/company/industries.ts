/**
 * Industries (/industries/). Source: start-version/source/build/pages.py
 * (industries_body) and the industries block in home_extras.html. New route
 * approved in DEC-013.
 */
import type { ProductHeroContent } from "@/content/products/types";

export const metadata = {
  path: "/industries/",
  title: "Industries: Food & Beverage, Health & Beauty and More | Listaso",
  description:
    "Listaso specializes in food and beverage distribution and also serves distributors of health and beauty, housewares, paper and packaging, wine and spirits and more.",
} as const;

export const hero: ProductHeroContent = {
  breadcrumb: "Industries",
  eyebrow: "Industries",
  title: { emphasis: "Specialists", rest: "in food & beverage. Ready for any distributor." },
  lead: "If you sell to stores, restaurants or other businesses, Listaso is for you. We grew up in food distribution, and today we also work with distributors in many other industries.",
};

export const specialty = {
  tag: "Our specialty",
  title: "Food & beverage",
  text: "Groceries, Hispanic and specialty foods, dairy, meat, bakery, beverages and more. The features this business needs come built in.",
  checks: [
    "Catch-weight products, billed by weight",
    "Lots and expiration dates, shipping the oldest first",
    "Route sales with the invoice printed at the store",
    "Customer pricing and trade promotions",
  ],
} as const;

export type IndustryId = "food" | "beauty" | "housewares" | "packaging" | "wine" | "flowers" | "auto";

export const industries: readonly { id: IndustryId; title: string; text: string }[] = [
  { id: "food", title: specialty.title, text: specialty.text },
  { id: "beauty", title: "Health & beauty", text: "Cosmetics, personal care, vitamins and pharmacy products." },
  { id: "housewares", title: "Housewares & home", text: "Cookware, home goods and seasonal products." },
  { id: "packaging", title: "Paper, packaging & janitorial", text: "Disposables, packaging and cleaning supplies for businesses." },
  { id: "wine", title: "Wine, beer & spirits", text: "Photo catalog, customer pricing and inventory control." },
  { id: "flowers", title: "Flowers & plants", text: "Fast orders and on-time delivery for products that can't wait." },
  { id: "auto", title: "Tires, auto parts & more", text: "Any business that sells wholesale and delivers to its customers." },
];

export const related = ["pre-sales", "direct-sales", "inventory"] as const;
