import type { SignatureText } from "@/content/home/en";
import { cx } from "@/lib/utils/cx";
import { Signature } from "./Signature";

type SectionHeaderProps = {
  /** id of the h2, referenced by the section's aria-labelledby. */
  id: string;
  eyebrow?: string;
  title: SignatureText;
  lead?: string;
  className?: string;
};

/** Eyebrow, signature H2 and lead used at the top of a page section. */
export function SectionHeader({ id, eyebrow, title, lead, className }: SectionHeaderProps) {
  return (
    <div data-reveal="group" className={cx("flex max-w-3xl flex-col gap-4", className)}>
      {eyebrow ? (
        <p data-reveal-item className="text-eyebrow font-bold uppercase text-fg-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} data-reveal="mask" className="overflow-hidden text-h2 text-balance text-fg-heading">
        <span data-reveal-content className="block">
          <Signature text={title} />
        </span>
      </h2>
      {lead ? (
        <p data-reveal-item className="text-lead text-fg-muted">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
