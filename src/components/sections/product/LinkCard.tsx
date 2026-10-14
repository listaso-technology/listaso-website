import { Icon, type IconName } from "@/components/icons/Icon";
import { Card } from "@/components/ui/Card";
import { cx } from "@/lib/utils/cx";

type LinkCardProps = {
  href: string;
  title: string;
  text: string;
  /** Visual cue only; the link is named by `title`. */
  linkLabel: string;
  icon?: IconName;
  analyticsEvent?: string;
  className?: string;
};

/**
 * Card with one link stretched over it. The title is the accessible name;
 * the "Learn more" cue is hidden from assistive technology.
 */
export function LinkCard({ href, title, text, linkLabel, icon, analyticsEvent, className }: LinkCardProps) {
  return (
    <Card
      elevation="raised"
      className={cx(
        "relative flex w-full flex-col gap-4",
        "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-focus",
        className,
      )}
    >
      {icon ? (
        <span className="flex size-12 items-center justify-center rounded-md bg-surface-soft text-icon-accent">
          <Icon name={icon} size={24} />
        </span>
      ) : null}
      <h3 className="text-h4 font-semibold text-fg-heading">
        <a
          href={href}
          className="after:absolute after:inset-0 after:rounded-md focus-visible:outline-none"
          {...(analyticsEvent ? { "data-analytics-event": analyticsEvent, "data-analytics-label": title } : null)}
        >
          {title}
        </a>
      </h3>
      <p className="text-body text-fg-muted">{text}</p>
      <span aria-hidden="true" className="mt-auto flex items-center gap-1 text-body font-semibold text-link">
        {linkLabel}
        <Icon name="arrow-right" size={16} />
      </span>
    </Card>
  );
}
