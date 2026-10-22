import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { mainNav, type NavGroup, type NavLink } from "@/content/site/navigation";
import { cx } from "@/lib/utils/cx";
import styles from "./NextPage.module.css";
import { NextPageSteps } from "./NextPageSteps";
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
 * Wraps around at the end of the group. Above the main link, a stepper lists
 * every page of the group with its number and name (visited, current, next);
 * each step is a link. Hovering the main link highlights the next step, rolls
 * the title and moves the arrow.
 */
export function NextPage({ group, current }: NextPageProps) {
  const links = (mainNav.find((entry): entry is NavGroup => "links" in entry && entry.label === group)?.links ?? []).filter(
    (link: NavLink) => link.href.startsWith("/") && (group !== "Company" || companyPages.includes(link.href)),
  );
  const index = links.findIndex((link) => link.href === current);
  if (index < 0 || links.length < 2) return null;

  const nextIndex = (index + 1) % links.length;
  const next = links[nextIndex];
  const position = `${String(nextIndex + 1).padStart(2, "0")} / ${String(links.length).padStart(2, "0")}`;

  return (
    <nav aria-label={group} data-story-section className={styles.section}>
      <Container width="wide">
        <div className={styles.card}>
          <span className={styles.meta}>
            <span>{group}</span>
            <span aria-hidden="true" className={styles.position}>
              {position}
            </span>
          </span>

          {/* Group index as a stepper: every step links to its page, names always visible. */}
          <NextPageSteps className={styles.steps}>
            {links.map((link, linkIndex) => (
              <li
                key={link.href}
                className={cx(
                  styles.step,
                  linkIndex < index && nextIndex !== 0 && styles.visited,
                  linkIndex === index && styles.current,
                  linkIndex === nextIndex && styles.next,
                )}
              >
                <a
                  href={link.href}
                  aria-current={linkIndex === index ? "page" : undefined}
                  className={styles.stepLink}
                >
                  <span aria-hidden="true" className={styles.dot}>
                    {String(linkIndex + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.stepLabel}>{link.label}</span>
                </a>
              </li>
            ))}
          </NextPageSteps>

          <a
            href={next.href}
            className={styles.mainLink}
            data-analytics-event="next_page_click"
            data-analytics-label={next.label}
          >
            <span className={styles.copy}>
              <span className={styles.title}>
                <TextRoll>{next.label}</TextRoll>
              </span>
              {next.description ? <span className={styles.description}>{next.description}</span> : null}
            </span>
            <span aria-hidden="true" className={styles.arrow}>
              <Icon name="arrow-right" size={24} />
            </span>
          </a>
        </div>
      </Container>
    </nav>
  );
}
