/**
 * Contact us (/contact-us/). Source: start-version/source/build/
 * pages_company.py, contact_body(). The "Send us a message" link points to
 * the existing Zoho Forms page from the source (REQUIERE VALIDACIÓN DEV;
 * Zoho API integration stays out of scope, DEC-011).
 */
import { contact, externalLinks } from "@/content/site/navigation";
import type { ProductHeroContent, SectionCopy } from "@/content/products/types";

export const metadata = {
  path: "/contact-us/",
  title: "Contact Listaso | Sales & Support in Miami and El Salvador",
  description:
    "Call +1 305-912-7770 or email sales@listaso.com to book a demo. Customer support at cs@listaso.com. Offices in South Miami, FL and Antiguo Cuscatlán, El Salvador.",
} as const;

export const hero: ProductHeroContent = {
  breadcrumb: "Contact us",
  eyebrow: "Contact",
  title: { emphasis: "Talk to us,", rest: "in English or Spanish" },
  lead: "Book a demo, ask a question or get help with your account. We're in Miami and El Salvador.",
};

export const ctas = {
  demo: { href: externalLinks.demo, label: "Book a Demo" },
  message: { href: "https://zfrmz.com/h6RkbByHQKx7RtjV0sUn", label: "Send Us a Message" },
} as const;

export type ChannelGroup = {
  role: string;
  title: string;
  lines: readonly { label: string; href?: string }[];
};

export const channels: readonly ChannelGroup[] = [
  {
    role: "Sales and demos",
    title: "Talk to sales",
    lines: [
      { label: contact.emails.sales, href: `mailto:${contact.emails.sales}` },
      { label: `${contact.phone.label}, option 2`, href: "tel:+13059127770,2" },
    ],
  },
  {
    role: "Customer service and support",
    title: "Get help",
    lines: [
      { label: contact.emails.support, href: `mailto:${contact.emails.support}` },
      { label: `${contact.phone.label}, option 1`, href: "tel:+13059127770,1" },
      { label: `Urgent, after hours: ${contact.emails.urgent}`, href: `mailto:${contact.emails.urgent}` },
    ],
  },
  {
    role: "General information",
    title: "Listaso",
    lines: [
      { label: "info@listaso.com", href: "mailto:info@listaso.com" },
      { label: contact.phone.label, href: contact.phone.href },
    ],
  },
];

export const offices: SectionCopy & {
  items: readonly { city: string; lines: readonly string[]; photo: "officeMiami" | "officeElSalvador" }[];
} = {
  eyebrow: "Offices",
  title: { emphasis: "Where", rest: "to find us" },
  items: [
    {
      city: "Miami, Florida",
      lines: ["5966 S Dixie Hwy, Ste 300", "South Miami, FL 33143"],
      photo: "officeMiami",
    },
    {
      city: "El Salvador",
      lines: [
        "Boulevard Orden de Malta, Plaza Madre Tierra",
        "Edificio 11, Local 10-A, 1er nivel",
        "Santa Elena, Antiguo Cuscatlán, La Libertad",
      ],
      photo: "officeElSalvador",
    },
  ],
};
