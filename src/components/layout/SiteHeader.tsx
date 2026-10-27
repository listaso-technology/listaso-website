import Link from "next/link";
import { ThemedLogo } from "@/components/brand/BrandAsset";
import { Icon } from "@/components/icons/Icon";
import { Button } from "@/components/ui/Button";
import {
  externalLinks,
  headerLabels,
  mainNav,
  type NavEntry,
  type NavGroup,
  type NavLink,
} from "@/content/site/navigation";
import { cx } from "@/lib/utils/cx";
import { SamiBrandText } from "@/components/sections/product/sami/SamiBrandText";
import { Container } from "./Container";
import { NavDisclosures } from "./NavDisclosures";
import styles from "./SiteHeader.module.css";

const isGroup = (entry: NavEntry): entry is NavGroup => "links" in entry;

// Desktop navigation starts at xl (1280px), as in start-version: below that
// the full menu does not fit and the mobile disclosure is used.
// The mobile menu is a full-height sheet under the header; while it is open
// the page behind it does not scroll (CSS :has, see the module).
// <summary> keeps its native display (some engines drop its button semantics
// when it becomes flex); the flex layout lives on an inner span.
const summaryReset = "cursor-pointer list-none rounded-full [&::-webkit-details-marker]:hidden";

const summaryBase =
  "flex min-h-12 cursor-pointer items-center gap-1 whitespace-nowrap rounded-full text-body font-semibold " +
  "text-fg-heading transition-colors duration-(--listaso-duration-fast)";

function PanelLink({ link }: { link: NavLink }) {
  return (
    <a
      href={link.href}
      className={cx(styles.panelLink, "flex min-h-12 items-center gap-3 rounded-sm px-3 py-2")}
      data-analytics-event="nav_click"
      data-analytics-label={link.label}
    >
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-body font-semibold text-fg-heading"><SamiBrandText text={link.label} /></span>
        {link.description ? <span className="text-small text-fg-muted">{link.description}</span> : null}
      </span>
      <Icon name="arrow-right" size={16} className={styles.panelArrow} />
    </a>
  );
}

/** Desktop dropdown: a native disclosure, enhanced by NavDisclosures. */
function DesktopGroup({ group, align }: { group: NavGroup; align: "left" | "right" }) {
  const wide = group.links.length > 6;
  return (
    <li className="relative">
      <details name="main-nav" data-nav-disclosure className="group">
        <summary className={summaryReset}>
          <span className={cx(summaryBase, styles.navTrigger, "px-4")}>
            {group.label}
            <Icon
              name="chevron-right"
              size={16}
              className="rotate-90 transition-transform duration-(--listaso-duration-fast) group-open:-rotate-90"
            />
          </span>
        </summary>
        <div
          className={cx(
            styles.dropdownPanel,
            "absolute top-full z-10 mt-2 rounded-md p-2",
            align === "right" ? "right-0" : "left-0",
            wide ? "w-xl" : "w-xs",
          )}
          data-align={align}
        >
          <ul className={cx("grid gap-1", wide && "grid-cols-2")}>
            {group.links.map((link) => (
              <li key={link.href}>
                <PanelLink link={link} />
              </li>
            ))}
          </ul>
        </div>
      </details>
    </li>
  );
}

function MobileMenu() {
  return (
    <details data-nav-disclosure data-mobile-menu className="group/menu xl:hidden">
      <summary aria-label={headerLabels.menu} className={summaryReset}>
        <span
          className={cx(
            styles.menuButton,
            "flex size-12 items-center justify-center rounded-full border border-line-control text-fg-heading",
          )}
        >
          <Icon name="menu" className="group-open/menu:hidden" />
          <Icon name="close" className="hidden group-open/menu:block" />
        </span>
      </summary>
      <div className={cx(styles.mobilePanel, "absolute inset-x-0 top-full")}>
        <Container className={styles.mobileInner}>
          <nav aria-label={headerLabels.mainNav} className={styles.mobileNav}>
            <ul className="flex flex-col gap-1">
              {mainNav.map((entry) =>
                isGroup(entry) ? (
                  <li key={entry.label}>
                    <details name="mobile-nav" data-nav-disclosure className="group/item">
                      <summary className={summaryReset}>
                        <span className={cx(summaryBase, styles.navTrigger, "justify-between px-3")}>
                          {entry.label}
                          <Icon
                            name="chevron-right"
                            size={20}
                            className="rotate-90 transition-transform duration-(--listaso-duration-fast) group-open/item:-rotate-90"
                          />
                        </span>
                      </summary>
                      <ul className={cx(styles.mobileLinks, "flex flex-col gap-1")}>
                        {entry.links.map((link) => (
                          <li key={link.href}>
                            <PanelLink link={link} />
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ) : (
                  <li key={entry.href}>
                    <a href={entry.href} className={cx(summaryBase, styles.navTrigger, "px-3")}>
                      {entry.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <div className={cx(styles.mobileActions, "flex flex-col gap-3 border-t border-line-subtle")}>
            <a
              href={externalLinks.login}
              className={cx(summaryBase, styles.navTrigger, "px-3")}
              data-analytics-event="cta_login_click"
              data-analytics-location="mobile-menu"
            >
              {headerLabels.login}
            </a>
            <Button
              href={externalLinks.demo}
              data-analytics-event="cta_demo_click"
              data-analytics-location="mobile-menu"
            >
              {headerLabels.mobileDemo}
            </Button>
          </div>
        </Container>
      </div>
    </details>
  );
}

/** Site header for the public pages (DEC-013 navigation). */
export function SiteHeader() {
  return (
    <header className={cx(styles.header, "sticky top-0 z-50 border-b border-line-subtle")}>
      <Container width="wide" className="relative flex min-h-18 items-center justify-between gap-4">
        <Link href="/" className="inline-flex min-h-12 shrink-0 items-center">
          <ThemedLogo
            light="listaso-stacked-navy"
            dark="listaso-stacked-white"
            height={32}
            alt={headerLabels.homeLink}
            priority
          />
        </Link>

        <nav aria-label={headerLabels.mainNav} className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((entry, index) =>
              isGroup(entry) ? (
                <DesktopGroup
                  key={entry.label}
                  group={entry}
                  align={index === mainNav.length - 1 ? "right" : "left"}
                />
              ) : (
                <li key={entry.href}>
                  <a
                    href={entry.href}
                    className={cx(summaryBase, styles.navTrigger, "px-4")}
                    data-analytics-event="nav_click"
                    data-analytics-label={entry.label}
                  >
                    {entry.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          <a
            href={externalLinks.login}
            className={cx(summaryBase, styles.navTrigger, "px-4")}
            data-analytics-event="cta_login_click"
            data-analytics-location="header"
          >
            {headerLabels.login}
          </a>
          <Button href={externalLinks.demo} data-analytics-event="cta_demo_click" data-analytics-location="header">
            {headerLabels.demo}
          </Button>
        </div>

        <MobileMenu />
      </Container>
      <NavDisclosures />
    </header>
  );
}
