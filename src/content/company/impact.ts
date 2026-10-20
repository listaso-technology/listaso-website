/**
 * Listaso Impact (/listaso-impact/). Source: start-version/source/build/
 * pages_company.py, impact_body(). Partner names and LinkedIn posts come from
 * the source and must be confirmed before cutover
 * (docs/COMPANY_PRICING_CONTENT_CONTRACT.md). No stock photo represents the
 * team or these events.
 */
import type { ProductHeroContent, SectionCopy } from "@/content/products/types";

export const metadata = {
  path: "/listaso-impact/",
  title: "Listaso Impact | Giving Back to Our Community",
  description:
    "Employability, education, social work, green action and entrepreneurship: how the Listaso team gives back in El Salvador and beyond. #ListasoImpact",
} as const;

export const trail = [{ href: "/about/", label: "About Listaso" }] as const;

export const hero: ProductHeroContent = {
  breadcrumb: "Listaso Impact",
  eyebrow: "Listaso Impact",
  title: { emphasis: "Every action", rest: "can shape our community" },
  lead: "We believe every action, big or small, can change society, so we're committed to giving back. Our values keep us moving, and our team and partners make it possible. Together, we're creating #ListasoImpact.",
};

export const areas: SectionCopy & { items: readonly string[] } = {
  eyebrow: "Impact areas",
  title: { emphasis: "The pillars", rest: "that guide us" },
  items: ["Employability", "Education support", "Social work", "Green action", "Entrepreneurship"],
};

export const posts: SectionCopy & {
  linkLabel: string;
  items: readonly { title: string; text: string; href: string }[];
} = {
  eyebrow: "In the community",
  title: { emphasis: "Technology", rest: "that makes a difference" },
  linkLabel: "See the Post on LinkedIn",
  items: [
    {
      title: "Earth Day",
      text: "We hit the streets with boxes full of trees and plants so more people could join the green movement.",
      href: "https://www.linkedin.com/posts/listaso_listasogreen-earthday-plantthefuture-activity-7320557756451631104-ihLw/",
    },
    {
      title: "Senior Citizens Month",
      text: "Our team visited the San Vicente de Paul Home in El Salvador.",
      href: "https://www.linkedin.com/feed/update/urn:li:activity:7379928571089432577/",
    },
    {
      title: "Riomar community visit",
      text: "We brought soccer balls, shirts and piñatas to share with families in La Libertad, El Salvador.",
      href: "https://www.linkedin.com/posts/listaso_solidarity-communitysupport-specialmoments-activity-7311810378433216512-Xjjf/",
    },
    {
      title: "Sports Day in Zacatecoluca",
      text: "We were proud to be part of a sports day with Asociación Pro Hogar Zacatecoluca.",
      href: "https://www.linkedin.com/posts/listaso_listasoteam-listasoimpact-sports-activity-7279852718217691136-HXmv/",
    },
    {
      title: "World Environment Day",
      text: "Our team cleaned up the beach at La Bocana de San Diego in El Salvador.",
      href: "https://www.linkedin.com/posts/listaso_worldenvironmentday-listasoimpact-protectourplanet-activity-7336436710051880961-QVD0/",
    },
  ],
};

export const partners: SectionCopy & { names: readonly string[] } = {
  eyebrow: "Partners for change",
  title: { emphasis: "Working together", rest: "with" },
  names: ["USAID", "FUSALMO", "UCA", "Albergue Misericordia", "UDB", "Manos Amigas"],
};
