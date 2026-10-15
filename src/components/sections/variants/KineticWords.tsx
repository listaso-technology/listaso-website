import { cx } from "@/lib/utils/cx";
import dossier from "./dossier.module.css";

type KineticWordsProps = {
  items: readonly { title: string; text?: string }[];
};

/**
 * Pillar rows (ddark.dev's "Core pillars"): an index, the word once in solid
 * type and twice outlined; the outlined copies drift sideways with the
 * scroll (alternating direction per row). Only the solid word is exposed to
 * assistive technology and it never moves; the repeats are decorative and
 * only appear on wide screens. On small screens the word wraps.
 */
export function KineticWords({ items }: KineticWordsProps) {
  return (
    <ol className="border-t border-line-subtle">
      {items.map((item, index) => (
        <li key={item.title} className="grid gap-4 overflow-hidden border-b border-line-subtle py-8 lg:grid-cols-[5rem_1fr_18rem] lg:items-center lg:gap-8">
          <span aria-hidden="true" className="text-small font-bold text-fg-accent">
            /{String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 overflow-hidden">
            <div className={cx(dossier.displaySmall, "flex gap-8 font-bold lg:whitespace-nowrap")}>
              <h3 className="break-words text-fg-heading">{item.title}</h3>
              {/* Outlined repeats only on wide screens; they drift, the word does not. */}
              <span
                aria-hidden="true"
                className={cx(dossier.kinetic, index % 2 === 1 && dossier.kineticReverse, "hidden gap-8 lg:flex")}
              >
                <span className={dossier.outline}>{item.title}</span>
                <span className={dossier.outline}>{item.title}</span>
              </span>
            </div>
          </div>
          {item.text ? <p className="text-body text-fg-muted">{item.text}</p> : null}
        </li>
      ))}
    </ol>
  );
}
