import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Icon } from "@/components/icons/Icon";
import { cx } from "@/lib/utils/cx";

type TextLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
  href: string;
  children: ReactNode;
  /**
   * Opens in a new tab and adds the external-link icon. `newTabLabel` is the
   * visually hidden notice for screen readers, in the page language.
   */
  external?: boolean;
  newTabLabel?: string;
};

/** Inline text link: always underlined so it never depends on color alone. */
export function TextLink({
  external = false,
  newTabLabel = "(opens in a new tab)",
  className,
  children,
  ...rest
}: TextLinkProps) {
  return (
    <a
      className={cx(
        "inline-flex items-baseline gap-1 text-link underline decoration-1 underline-offset-4",
        "transition-colors duration-(--listaso-duration-fast) ease-(--listaso-ease-standard)",
        "hover:text-link-hover hover:decoration-2",
        className,
      )}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
      {...rest}
    >
      {children}
      {external ? (
        <>
          <Icon name="external-link" size={16} className="self-center" />
          <span className="sr-only">{newTabLabel}</span>
        </>
      ) : null}
    </a>
  );
}
