import type { SignatureText } from "@/content/home/en";

/**
 * Listaso typographic signature: the opening words in 700 italic and the rest
 * in regular weight. Use it once per H1 or H2 (brand-foundations.md).
 */
export function Signature({ text }: { text: SignatureText }) {
  return (
    <>
      <span className="font-bold italic">{text.emphasis}</span>
      {text.rest ? ` ${text.rest}` : null}
    </>
  );
}
