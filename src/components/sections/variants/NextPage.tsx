import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { mainNav, type NavGroup, type NavLink } from "@/content/site/navigation";
import { TextRoll } from "./TextRoll";

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
 * Link to the next page of the same menu group (Thomas Thorstensson's
 * "Explore archive"). Labels and descriptions come from the site navigation.
 * Wraps around at the end of the group.
 */
export function NextPage({ group, current }: NextPageProps) {
  const links = (mainNav.find((entry): entry is NavGroup => "links" in entry && entry.label === group)?.links ?? []).filter(
    (link: NavLink) => link.href.startsWith("/") && (group !== "Company" || companyPages.includes(link.href)),
  );
  const index = links.findIndex((link) => link.href === current);
  if (index < 0 || links.length < 2) return null;

  const next = links[(index + 1) % links.length];
  const position = `${String(((index + 1) % links.length) + 1).padStart(2, "0")} / ${String(links.length).padStart(2, "0")}`;

  return (
    <nav aria-label={group} data-story-section className="border-t border-line-subtle py-16 lg:py-20">
      <Container width="wide">
        <a href={next.href} className="group flex flex-col gap-6" data-analytics-event="next_page_click" data-analytics-label={next.label}>
          <span className="flex items-center justify-between text-eyebrow font-bold uppercase text-fg-accent">
            <span>{group}</span>
            <span aria-hidden="true">{position}</span>
          </span>
          <span className="flex items-end justify-between gap-6 border-b border-line-subtle pb-8">
            <span className="flex min-w-0 flex-col gap-3">
              <span className="text-h1 font-bold text-balance break-words text-fg-heading sm:text-display">
                <TextRoll>{next.label}</TextRoll>
              </span>
              {next.description ? <span className="text-lead text-fg-muted">{next.description}</span> : null}
            </span>
            <span
              aria-hidden="true"
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-action-primary sm:size-16 text-fg-on-action transition-transform duration-(--listaso-duration-standard) motion-safe:group-hover:translate-x-2"
            >
              <Icon name="arrow-right" size={24} />
            </span>
          </span>
        </a>
      </Container>
    </nav>
  );
}
