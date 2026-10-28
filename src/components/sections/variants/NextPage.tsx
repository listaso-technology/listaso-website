import { mainNav, type NavGroup, type NavLink } from "@/content/site/navigation";
import { NextPageNavigator } from "./NextPageNavigator";

/* Company pages built in this app. The blog stays on WordPress (DEC-011/019). */
const companyPages = [
  "/about/",
  "/industries/",
  "/support/",
  "/listaso-impact/",
  "/join-us/",
  "/rating/",
  "/contact-us/",
];

type NextPageProps = {
  /** Navigation group the current page belongs to. */
  group: "Products" | "Integrations" | "Company";
  /** Path of the current page, e.g. "/pre-sales/". */
  current: string;
};

/**
 * Keep the navigation data and route filtering on the server. The small client
 * navigator owns the preview selection and horizontal stepper position.
 */
export function NextPage({ group, current }: NextPageProps) {
  const links = (mainNav.find((entry): entry is NavGroup => "links" in entry && entry.label === group)?.links ?? []).filter(
    (link: NavLink) => link.href.startsWith("/") &&
      (group !== "Company" || companyPages.includes(link.href)) &&
      (group !== "Products" || link.href !== "/products/"),
  );
  const index = links.findIndex((link) => link.href === current);
  if (index < 0 || links.length < 2) return null;

  return <NextPageNavigator key={current} group={group} links={links} currentIndex={index} />;
}
