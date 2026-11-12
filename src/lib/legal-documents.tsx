import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { ReactNode } from "react";

export type LegalDocumentKey = "privacy" | "terms" | "subscription";

export const legalDocuments = {
  privacy: {
    path: "/privacy-policy/",
    label: "Privacy Policy",
    labelEs: "Política de privacidad",
    file: "PRIVACY_POLICY.bilingual.md",
    description: "Bilingual privacy policy draft for legal review of Listaso's website and services.",
  },
  terms: {
    path: "/terms-and-conditions/",
    label: "Terms & Conditions",
    labelEs: "Términos y condiciones",
    file: "WEBSITE_TERMS.bilingual.md",
    description: "Bilingual website terms draft for legal review of the public Listaso website.",
  },
  subscription: {
    path: "/subscription-agreement/",
    label: "Subscription Agreement",
    labelEs: "Acuerdo de suscripción",
    file: "SUBSCRIPTION_AGREEMENT.bilingual.md",
    description: "Bilingual subscription agreement draft for legal review of Listaso services.",
  },
} as const;

type Paragraph = { type: "paragraph"; text: string };
type Table = { type: "table"; rows: string[][] };
type Block = Paragraph | Table;
type Section = { title: string; id: string; blocks: Block[] };
type LanguageSection = { title: string; lang: "en" | "es"; id: string; sections: Section[] };
export type ParsedLegalDocument = { title: string; intro: string; languages: LanguageSection[] };

const linkTargets: Record<string, string> = {
  "PRIVACY_POLICY.bilingual.md": legalDocuments.privacy.path,
  "WEBSITE_TERMS.bilingual.md": legalDocuments.terms.path,
  "SUBSCRIPTION_AGREEMENT.bilingual.md": legalDocuments.subscription.path,
};

function cells(line: string) {
  return line.split("|").slice(1, -1).map((cell) => cell.trim());
}

/** Reads the fixed, reviewed-in-repo drafts at build time for static export. */
export function loadLegalDocument(key: LegalDocumentKey): ParsedLegalDocument {
  const file = join(process.cwd(), "docs", "legal-review", legalDocuments[key].file);
  const lines = readFileSync(file, "utf8").trim().split(/\r?\n/);
  const title = lines[0].replace(/^# /, "");
  const intro: string[] = [];
  const languages: LanguageSection[] = [];
  let language: LanguageSection | undefined;
  let section: Section | undefined;

  for (let index = 1; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) continue;

    if (line.startsWith("## ")) {
      language = {
        title: line.slice(3),
        lang: languages.length === 0 ? "en" : "es",
        id: languages.length === 0 ? "english" : "espanol",
        sections: [],
      };
      languages.push(language);
      section = undefined;
      continue;
    }

    if (line.startsWith("### ") && language) {
      section = {
        title: line.slice(4),
        id: `${language.lang}-section-${language.sections.length + 1}`,
        blocks: [],
      };
      language.sections.push(section);
      continue;
    }

    if (!section) {
      intro.push(line);
      continue;
    }

    if (line.startsWith("|") && lines[index + 1]?.trim().match(/^\|[\s|:-]+\|$/)) {
      const rows = [cells(line)];
      index += 2; // Skip the Markdown header divider.
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(cells(lines[index].trim()));
        index += 1;
      }
      index -= 1;
      section.blocks.push({ type: "table", rows });
      continue;
    }

    const previous = section.blocks.at(-1);
    if (previous?.type === "paragraph" && lines[index - 1]?.trim()) {
      previous.text += ` ${line}`;
    } else {
      section.blocks.push({ type: "paragraph", text: line });
    }
  }

  if (languages.length !== 2 || languages.some((item) => item.sections.length === 0)) {
    throw new Error(`Incomplete bilingual legal draft: ${file}`);
  }

  return { title, intro: intro.join(" "), languages };
}

/** Only the inline syntax present in these fixed legal drafts is supported. */
export function legalInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const href = linkTargets[link[2]];
      return href ? <a key={index} href={href} className="text-link underline underline-offset-4 hover:text-link-hover">{link[1]}</a> : <span key={index}>{link[1]}</span>;
    }
    return part;
  });
}

export function legalBlocks(blocks: Block): ReactNode {
  if (blocks.type === "paragraph") {
    return <p className="mb-5 leading-8 text-fg-default">{legalInline(blocks.text)}</p>;
  }

  return (
    <div className="mb-7 max-w-full overflow-x-auto rounded-md border border-line-subtle" role="region" aria-label="Data categories table / Tabla de categorías de datos" tabIndex={0}>
      <table className="w-full min-w-[42rem] border-collapse text-left text-small leading-6">
        <thead className="bg-surface-soft text-fg-heading">
          <tr>{blocks.rows[0].map((cell, index) => <th key={index} scope="col" className="border-b border-line-subtle p-4 font-semibold">{legalInline(cell)}</th>)}</tr>
        </thead>
        <tbody>
          {blocks.rows.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-line-subtle last:border-b-0">
              {row.map((cell, index) => index === 0
                ? <th key={index} scope="row" className="p-4 align-top font-semibold text-fg-heading">{legalInline(cell)}</th>
                : <td key={index} className="p-4 align-top text-fg-default">{legalInline(cell)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
