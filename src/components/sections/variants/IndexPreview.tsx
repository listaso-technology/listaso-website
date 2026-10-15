import { Container } from "@/components/layout/Container";
import type { SectionCopy } from "@/content/products/types";
import { cx } from "@/lib/utils/cx";
import { ProductSection } from "../product/ProductSection";
import { DossierHeader } from "./DossierHeader";
import dossier from "./dossier.module.css";
import { FillPhoto, type AnyPhoto } from "./HeroParts";

export type IndexPreviewItem = { title: string; text: string; photo: AnyPhoto };

type IndexPreviewProps = {
  id: string;
  /** Visible header. Without it, `label` becomes a visually hidden h2. */
  copy?: SectionCopy;
  label?: string;
  items: readonly IndexPreviewItem[];
  tone?: "page" | "alt";
};

/**
 * Index with hover preview (ddark.dev's "Selected work"): large uppercase
 * rows; on desktop a sticky preview shows the photo of the hovered row (the
 * first one by default). The photos are decorative illustrations; each row
 * carries its own text. On small screens each row shows its photo inline.
 */
export function IndexPreview({ id, copy, label, items, tone }: IndexPreviewProps) {
  return (
    <ProductSection labelledBy={id} tone={tone}>
      <Container width="wide" className="flex flex-col gap-12">
        {copy ? (
          <DossierHeader id={id} eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} />
        ) : (
          <h2 id={id} className="sr-only">
            {label}
          </h2>
        )}
        <div className={cx(dossier.index, "grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16")}>
          <ol className="border-t-2 border-fg-heading">
            {items.map((item, index) => (
              <li
                key={item.title}
                className={cx(dossier.row, "grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 gap-y-3 border-b border-line-subtle py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)]")}
              >
                <span aria-hidden="true" className="pt-2 text-small font-bold text-fg-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-h3 font-bold break-words text-fg-heading uppercase sm:text-h2">{item.title}</h3>
                  <p className="max-w-xl text-body text-fg-muted">{item.text}</p>
                  <div className="relative mt-2 aspect-[16/9] overflow-hidden rounded-md bg-surface-soft lg:hidden">
                    <FillPhoto photo={item.photo} sizes="92vw" />
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <div aria-hidden="true" className="hidden lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-lg bg-surface-soft shadow-e2">
              {items.map((item) => (
                <div key={item.title} className={cx(dossier.previewLayer, "absolute inset-0")}>
                  <FillPhoto photo={item.photo} sizes="36vw" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-surface-page px-3 py-1 text-caption font-bold tracking-widest text-fg-heading uppercase shadow-e1">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </ProductSection>
  );
}
