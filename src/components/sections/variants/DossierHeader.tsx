import type { SignatureText } from "@/content/products/types";
import { cx } from "@/lib/utils/cx";
import { Signature } from "../Signature";
import dossier from "./dossier.module.css";

type DossierHeaderProps = {
  id: string;
  eyebrow?: string;
  title: SignatureText;
  lead?: string;
  size?: "large" | "small";
  className?: string;
};

/**
 * Section header in the dossier style (ddark.dev): bracketed eyebrow and an
 * uppercase display H2 with the Listaso signature.
 */
export function DossierHeader({ id, eyebrow, title, lead, size = "small", className }: DossierHeaderProps) {
  return (
    <div data-reveal="group" className={cx("flex flex-col gap-4", className)}>
      {eyebrow ? (
        <p data-reveal-item className={cx(dossier.bracket, "text-eyebrow font-bold uppercase text-fg-accent")}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        data-reveal="mask"
        className={cx(
          size === "large" ? dossier.display : dossier.displaySmall,
          "overflow-hidden font-bold text-balance text-fg-heading",
        )}
      >
        <span data-reveal-content className="block">
          <Signature text={title} />
        </span>
      </h2>
      {lead ? (
        <p data-reveal-item className="max-w-2xl text-lead text-fg-muted">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
