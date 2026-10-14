import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import type { SectionCopy } from "@/content/products/types";
import { cx } from "@/lib/utils/cx";
import backdrops from "../backdrops.module.css";
import { SectionHeader } from "../SectionHeader";

type ColorBandProps = {
  id: string;
  copy: SectionCopy;
  /** Copy-side extras under the header (checks, links). */
  aside?: ReactNode;
  /** Two framed pieces shown side by side (Thorstensson's paired mocks). */
  pair: readonly [ReactNode, ReactNode];
};

/**
 * Full-bleed brand band with two framed pieces side by side (Thomas
 * Thorstensson's colored showcase bands). Same navy band and mesh as the
 * Homepage, so it reads the same in light and dark themes.
 */
export function ColorBand({ id, copy, aside, pair }: ColorBandProps) {
  return (
    <section aria-labelledby={id} data-surface="band" data-story-section className={cx(backdrops.brandMesh, "py-16 lg:py-24")}>
      <Container width="wide" className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col gap-8 lg:col-span-4">
          <SectionHeader id={id} eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} />
          {aside}
        </div>
        <div className="grid items-center gap-6 sm:grid-cols-2 lg:col-span-8">
          {pair.map((piece, index) => (
            <div key={index} data-reveal="media" className={cx("flex justify-center", index === 1 && "sm:translate-y-12")}>
              {piece}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
