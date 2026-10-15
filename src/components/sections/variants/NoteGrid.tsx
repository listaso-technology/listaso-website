import { cx } from "@/lib/utils/cx";

export type Note = { title: string; subtitle?: string; text: string };

type NoteGridProps = {
  /** Small uppercase label above the grid. */
  label?: string;
  notes: readonly Note[];
  /** Render the text as a quote (blockquote + figcaption). */
  quotes?: boolean;
  className?: string;
};

/**
 * Ruled grid of short notes (ddark.dev's "Contributions"): uppercase title,
 * subtitle and text in three columns on desktop.
 */
export function NoteGrid({ label, notes, quotes = false, className }: NoteGridProps) {
  return (
    <div className={cx("flex flex-col gap-4", className)}>
      {label ? <p className="text-small font-bold tracking-widest text-fg-muted uppercase">{label}</p> : null}
      <ul data-reveal="group" className="grid border-t-2 border-fg-heading sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <li
            data-reveal-item
            key={`${note.title}-${note.subtitle ?? ""}`}
            className="flex flex-col gap-3 border-b border-line-subtle py-8 sm:pr-8"
          >
            {quotes ? (
              <figure className="flex h-full flex-col justify-between gap-6">
                <blockquote className="text-body-lg text-fg-default">{note.text}</blockquote>
                <figcaption className="flex flex-col gap-1">
                  <span className="text-body font-bold tracking-wide text-fg-heading uppercase">{note.title}</span>
                  {note.subtitle ? (
                    <span className="text-small font-semibold tracking-widest text-fg-muted uppercase">{note.subtitle}</span>
                  ) : null}
                </figcaption>
              </figure>
            ) : (
              <>
                <h3 className="text-h4 font-bold tracking-wide text-fg-heading uppercase">{note.title}</h3>
                {note.subtitle ? (
                  <p className="text-small font-semibold tracking-widest text-fg-accent uppercase">{note.subtitle}</p>
                ) : null}
                <p className="text-body text-fg-muted">{note.text}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
