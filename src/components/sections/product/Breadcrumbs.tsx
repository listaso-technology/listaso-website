import Link from "next/link";
import { Fragment, type HTMLAttributes } from "react";
import { breadcrumbLabels } from "@/content/products/shared";
import { cx } from "@/lib/utils/cx";
import { SamiBrandText } from "./sami/SamiBrandText";

export type BreadcrumbLink = { href: string; label: string };

type BreadcrumbsProps = HTMLAttributes<HTMLElement> & {
  current: string;
  /** Intermediate levels between Home and the current page. */
  trail?: readonly BreadcrumbLink[];
};

const linkClass = cx(
  "inline-flex items-center py-2 underline decoration-1 underline-offset-4",
  "transition-colors duration-(--listaso-duration-fast) hover:text-fg-default hover:decoration-2",
);

/** Home / … / current page trail (start-version `crumbs`). */
export function Breadcrumbs({ current, trail = [], className, ...rest }: BreadcrumbsProps) {
  const links: readonly BreadcrumbLink[] = [{ href: "/", label: breadcrumbLabels.home }, ...trail];

  return (
    <nav aria-label={breadcrumbLabels.nav} className={className} {...rest}>
      <ol className="flex flex-wrap items-center gap-2 text-small text-fg-muted">
        {links.map((link) => (
          <Fragment key={link.href}>
            <li>
              <Link href={link.href} className={linkClass}>
                {link.label}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
          </Fragment>
        ))}
        <li aria-current="page" className="font-semibold text-fg-default">
          <SamiBrandText text={current} />
        </li>
      </ol>
    </nav>
  );
}
