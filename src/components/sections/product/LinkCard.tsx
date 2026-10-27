import { Icon, type IconName } from "@/components/icons/Icon";
import { cx } from "@/lib/utils/cx";
import { SamiBrandText } from "./sami/SamiBrandText";
import styles from "./LinkCard.module.css";

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
 * Card with one link stretched over it (related products, integrations hub).
 * The title is the accessible name; the "Learn more" cue is hidden from
 * assistive technology. Quiet by design: a flat icon band, the copy and a
 * footer cue; hover and keyboard focus only shift colors and the arrow.
 */
export function LinkCard({ href, title, text, linkLabel, icon, analyticsEvent, className }: LinkCardProps) {
  return (
    <article className={cx(styles.card, className)}>
      {icon ? (
        <span aria-hidden="true" className={styles.band}>
          <Icon name={icon} size={32} className={styles.icon} />
        </span>
      ) : null}

      <span className={styles.body}>
        <h3 className={styles.title}>
          <a
            href={href}
            className={styles.link}
            {...(analyticsEvent ? { "data-analytics-event": analyticsEvent, "data-analytics-label": title } : null)}
          >
            <SamiBrandText text={title} />
          </a>
        </h3>
        <p className={styles.text}><SamiBrandText text={text} /></p>
        <span aria-hidden="true" className={styles.cue}>
          {linkLabel}
          <Icon name="arrow-right" size={16} className={styles.arrow} />
        </span>
      </span>
    </article>
  );
}
