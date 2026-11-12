import { Container } from "@/components/layout/Container";
import { legalBlocks, legalDocuments, legalInline, loadLegalDocument, type LegalDocumentKey } from "@/lib/legal-documents";

export function LegalPage({ documentKey }: { documentKey: LegalDocumentKey }) {
  const document = loadLegalDocument(documentKey);

  return (
    <div className="bg-surface-page pb-24 text-fg-default">
      <header className="border-b border-line-subtle bg-surface-alt py-12 md:py-20">
        <Container>
          <p className="mb-4 text-eyebrow font-bold uppercase tracking-widest text-fg-accent">Legal preview · Vista previa legal</p>
          <h1 className="max-w-4xl text-h1 font-bold tracking-tight text-fg-heading">{document.title}</h1>
          <p className="mt-6 max-w-3xl text-body-lg leading-8 text-fg-muted">
            Draft for legal review. This page does not replace an executed agreement or represent final published terms.
            <span lang="es" className="mt-2 block">Borrador para revisión jurídica. Esta página no reemplaza un acuerdo firmado ni constituye un texto legal definitivo.</span>
          </p>
        </Container>
      </header>

      <Container className="pt-8 md:pt-12">
        <nav aria-label="Related legal pages / Páginas legales relacionadas" className="mb-8 border-b border-line-subtle pb-8">
          <ul className="flex flex-wrap gap-3">
            {(Object.keys(legalDocuments) as LegalDocumentKey[]).map((key) => {
              const item = legalDocuments[key];
              return (
                <li key={key}>
                  <a href={item.path} aria-current={key === documentKey ? "page" : undefined} className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-small font-semibold transition-colors ${key === documentKey ? "border-fg-heading bg-surface-soft text-fg-heading" : "border-line-subtle text-fg-default hover:border-link hover:text-link"}`}>
                    {item.label}<span aria-hidden="true" className="mx-2 text-fg-muted">/</span><span lang="es">{item.labelEs}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
          <div className="min-w-0 max-w-3xl">
            <aside aria-label="Draft status / Estado del borrador" className="mb-12 rounded-md border-l-4 border-status-warning bg-surface-soft p-5 text-small leading-7 text-fg-default">
              {legalInline(document.intro)}
            </aside>

            {document.languages.map((language) => (
              <article key={language.lang} id={language.id} lang={language.lang} aria-labelledby={`${language.id}-title`} className="mb-20 scroll-mt-8 last:mb-0">
                <h2 id={`${language.id}-title`} className="mb-4 border-b border-line-subtle pb-4 text-h2-compact font-bold text-fg-heading">{language.title}</h2>
                <nav aria-label={language.lang === "en" ? "Sections in English" : "Secciones en español"} className="mb-10 rounded-md bg-surface-alt p-5">
                  <p className="mb-3 text-small font-bold text-fg-heading">{language.lang === "en" ? "On this page" : "En esta página"}</p>
                  <ol className="grid gap-2 text-small sm:grid-cols-2">
                    {language.sections.map((section) => (
                      <li key={section.id}><a href={`#${section.id}`} className="text-link underline-offset-4 hover:underline">{section.title}</a></li>
                    ))}
                  </ol>
                </nav>
                {language.sections.map((section) => (
                  <section key={section.id} aria-labelledby={section.id} className="mb-12 scroll-mt-8 last:mb-0">
                    <h3 id={section.id} className="mb-5 text-h3 font-bold text-fg-heading">{section.title}</h3>
                    {section.blocks.map((block, index) => <div key={index}>{legalBlocks(block)}</div>)}
                  </section>
                ))}
              </article>
            ))}
          </div>

          <nav aria-label="Language navigation / Navegación por idioma" className="order-first lg:order-last">
            <div className="lg:sticky lg:top-8">
              <p className="mb-3 text-small font-bold text-fg-heading">Read in / Leer en</p>
              <ul className="flex flex-wrap gap-3 lg:flex-col">
                <li><a href="#english" lang="en" className="inline-block rounded-sm text-link underline underline-offset-4 hover:text-link-hover">English</a></li>
                <li><a href="#espanol" lang="es" className="inline-block rounded-sm text-link underline underline-offset-4 hover:text-link-hover">Español</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </Container>
    </div>
  );
}
