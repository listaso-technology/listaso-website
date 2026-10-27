import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons/Icon";
import { cx } from "@/lib/utils/cx";

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonSize = "md" | "lg";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Decorative icon placed after the label. */
  icon?: IconName;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full " +
  "transition-[background-color,border-color,color,filter,translate] " +
  "duration-(--listaso-duration-fast) ease-(--listaso-ease-standard) " +
  "motion-safe:active:translate-y-px " +
  "disabled:cursor-not-allowed disabled:opacity-50 " +
  "forced-colors:border forced-colors:border-[ButtonText]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-2 border-[var(--listaso-cta-border)] bg-[linear-gradient(90deg,var(--listaso-cta-start),var(--listaso-cta-end))] " +
    "font-extrabold italic text-[var(--listaso-cta-text)] shadow-[var(--listaso-cta-shadow)] " +
    "hover:brightness-95 disabled:hover:brightness-100 " +
    "forced-colors:border-[ButtonText] forced-colors:bg-[ButtonFace] forced-colors:text-[ButtonText] forced-colors:shadow-none",
  secondary:
    "border border-fg-heading font-semibold text-fg-heading hover:bg-surface-soft " +
    "disabled:hover:bg-transparent",
  tertiary:
    "font-semibold text-fg-heading underline-offset-4 hover:underline disabled:hover:no-underline",
};

// Both sizes keep a hit area of at least 44px (min-h-12 = 48px).
const sizes: Record<ButtonSize, string> = {
  md: "min-h-12 px-6 text-body",
  lg: "min-h-14 px-8 text-body-lg",
};

/**
 * Pill button (DEC-008). Renders <a> when `href` is set, otherwise <button>.
 * Links cannot be disabled; use a <button> for unavailable actions.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", icon, children, className, ...rest } = props;
  const classes = cx(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {icon ? <Icon name={icon} size={20} /> : null}
    </>
  );

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
