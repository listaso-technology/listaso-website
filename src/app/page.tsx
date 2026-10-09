import { TextLink } from "@/components/ui/TextLink";

export default function HomePage() {
  return (
    <main lang="es" className="mx-auto flex min-h-screen max-w-content items-center px-4 py-16 md:px-6 lg:px-8">
      <div className="flex flex-col gap-4">
        <p className="text-eyebrow font-bold uppercase text-fg-accent">Foundation</p>
        <h1 className="text-display text-fg-heading">Listaso Website</h1>
        <p className="max-w-prose text-lead text-fg-muted">
          Base técnica preparada. El contenido y las páginas se incorporarán desde
          el mapa de migración aprobado.
        </p>
        <p className="text-body">
          <TextLink href="/foundation/">Revisión interna de la foundation visual</TextLink>
        </p>
      </div>
    </main>
  );
}
