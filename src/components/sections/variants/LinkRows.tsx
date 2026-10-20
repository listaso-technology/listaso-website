import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { TextRoll } from "./TextRoll";

type LinkRowsProps = {
  /** Accessible name of the navigation, from the site menu. */
  label: string;
  links: readonly { href: string; title: string; text: string }[];
};

/**
 * Large ruled links (ddark.dev's footer index): index number, title with a
 * rolling hover, helper text and an arrow. Internal links only.
 */
export function LinkRows({ label, links }: LinkRowsProps) {
  return (
    <nav aria-label={label} data-story-section className="py-16 lg:py-24">
      <Container width="wide">
        <ul data-reveal="group" className="border-t-2 border-fg-heading">
          {links.map((link, index) => (
            <li data-reveal-item key={link.href} className="border-b border-line-subtle">
              <Link
                href={link.href}
                className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 py-8 sm:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1fr)_auto] sm:gap-x-8"
                data-analytics-event="company_link_click"
                data-analytics-label={link.title}
              >
                <span aria-hidden="true" className="text-small font-bold text-fg-accent">
                  /{String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-h3 font-bold break-words text-fg-heading uppercase sm:text-h2">
                  <TextRoll>{link.title}</TextRoll>
                </span>
                <span className="col-start-2 row-start-2 text-body text-fg-muted sm:col-start-auto sm:row-start-auto">
                  {link.text}
                </span>
                <span
                  aria-hidden="true"
                  className="col-start-3 row-span-2 row-start-1 flex size-12 items-center justify-center rounded-full border border-line-subtle text-fg-heading transition-[background-color,color,translate] duration-(--listaso-duration-standard) group-hover:bg-fg-heading group-hover:text-surface-page motion-safe:group-hover:translate-x-1 sm:col-start-auto sm:row-span-1 sm:row-start-auto"
                >
                  <Icon name="arrow-right" size={20} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
