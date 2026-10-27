import type { SignatureText } from "@/content/home/en";
import { SamiBrandText } from "./product/sami/SamiBrandText";

/**
 * Listaso typographic signature: the opening words in 700 italic and the rest
 * in regular weight. Use it once per H1 or H2 (brand-foundations.md).
 */
export function Signature({ text, lineBreak = false }: { text: SignatureText; lineBreak?: boolean }) {
  return (
    <>
      <span className="font-bold italic"><SamiBrandText text={text.emphasis} /></span>
      {text.rest ? (
        <>
          {lineBreak ? <br /> : " "}
          <SamiBrandText text={text.rest} />
        </>
      ) : null}
    </>
  );
}
