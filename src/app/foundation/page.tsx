import type { Metadata } from "next";
import { BrandAsset, ThemedLogo } from "@/components/brand/BrandAsset";
import { Icon, iconSizes } from "@/components/icons/Icon";
import { iconData, type IconName } from "@/components/icons/icon-data";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FormField } from "@/components/ui/FormField";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { TextLink } from "@/components/ui/TextLink";
import { brandAssets, unresolvedBrandAssets } from "@/content/brand/assets";
import { cx } from "@/lib/utils/cx";
import { AssetTile, Section, StatusBadge, ThemeSample } from "./_components";
import {
  elevations,
  motionTokens,
  primitives,
  radii,
  semanticTokens,
  typeScale,
} from "./_data";
import styles from "./foundation.module.css";

export const metadata: Metadata = {
  title: "Visual Foundation",
  description: "Internal review of the Listaso visual foundation.",
};

const contents = [
  ["paleta", "Paleta primitiva"],
  ["tokens", "Tokens semánticos"],
  ["tipografia", "Tipografía"],
  ["escalas", "Radios y elevación"],
  ["botones", "Botones"],
  ["enlaces", "Enlaces"],
  ["tarjetas", "Tarjetas"],
  ["formularios", "Formularios"],
  ["estados", "Estados"],
  ["temas", "Tema claro y oscuro"],
  ["vidrio", "Vidrio"],
  ["logos", "Logos oficiales"],
  ["productos", "Logos de producto"],
  ["iconos", "Iconos"],
  ["movimiento", "Movimiento"],
  ["preferencias", "Preferencias del sistema"],
  ["inventario", "Activos temporales e históricos"],
] as const;

const masterLogos = brandAssets.filter((asset) => asset.product === "Listaso");
const productLogos = brandAssets.filter(
  (asset) => asset.product !== "Listaso" && asset.product !== "SAMI" && asset.status !== "discontinued",
);
const reviewAssets = brandAssets.filter((asset) => asset.status !== "active");

function logoHeight(width: number, height: number) {
  const ratio = width / height;
  if (ratio > 4) return 40;
  if (ratio > 2) return 56;
  return 64;
}

export default function FoundationPage() {
  return (
    <main lang="es" className="mx-auto flex max-w-content flex-col gap-12 px-4 py-12 md:px-6 lg:px-8 lg:py-16">
      <header className="flex flex-col gap-6">
        <ThemedLogo
          light="listaso-horizontal-navy"
          dark="listaso-horizontal-white"
          height={40}
          alt="Listaso"
          priority
        />
        <p className="text-eyebrow font-bold uppercase text-fg-accent">Revisión interna · Chat 5</p>
        <h1 className="text-h1 text-fg-heading">
          <span className="font-bold italic">Listaso</span> Visual Foundation
        </h1>
        <p className="max-w-prose text-lead text-fg-muted">
          Muestra interna de los tokens, primitivas y activos aprobados para la foundation visual. No
          es una página comercial y el sitio continúa con noindex.
        </p>
        <nav aria-label="Secciones de la foundation">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-small">
            {contents.map(([id, label]) => (
              <li key={id}>
                <TextLink href={`#${id}`}>{label}</TextLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <Section
        id="paleta"
        title="Paleta primitiva"
        intro="Paleta de la guía de marca (p. 17). Los componentes no usan estos valores directamente; consumen roles semánticos."
      >
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {primitives.map((color) => (
            <li key={color.name} className="flex flex-col gap-2">
              <span
                aria-hidden="true"
                className="h-16 rounded-sm border border-line-subtle"
                style={{ background: `var(${color.variable})` }}
              />
              <span className="text-small font-semibold text-fg-default">{color.name}</span>
              <code className="text-caption text-fg-muted">{color.hex}</code>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="tokens"
        title="Tokens semánticos"
        intro="Valores aprobados con ajustes AA. Los componentes usan la utilidad indicada; el valor cambia según el tema."
      >
        <ul className="flex flex-col divide-y divide-line-subtle rounded-md border border-line-subtle">
          {semanticTokens.map((token) => (
            <li key={token.token} className="grid gap-2 p-4 md:grid-cols-[1fr_1fr_auto] md:items-center md:gap-6">
              <div className="flex flex-col">
                <span className="text-small font-semibold text-fg-default">{token.token}</span>
                <code className="text-caption text-fg-muted">{token.utility}</code>
              </div>
              <div className="flex flex-wrap gap-4 md:col-span-2">
                {(["light", "dark"] as const).map((theme) => (
                  <span key={theme} className="flex items-center gap-2 text-caption text-fg-muted">
                    <span
                      aria-hidden="true"
                      className="size-6 rounded-xs border border-line-subtle"
                      style={{ background: token[theme] }}
                    />
                    {theme === "light" ? "Claro" : "Oscuro"} {token[theme]}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="tipografia"
        title="Tipografía"
        intro={
          <>
            Montserrat 400, 600, 700 y 700 italic. Los archivos de fuente todavía no están
            autohospedados: mientras tanto se usa la pila de respaldo{" "}
            <code>&quot;Montserrat&quot;, &quot;Avenir Next&quot;, &quot;Segoe UI&quot;, Arial</code>.
          </>
        }
      >
        <ul className="flex flex-col gap-6">
          {typeScale.map((style) => (
            <li key={style.role} className="flex flex-col gap-1">
              <code className="text-caption text-fg-muted">
                {style.role} · {style.spec}
              </code>
              <p className={cx(style.className, "text-fg-heading")}>{style.role}</p>
            </li>
          ))}
        </ul>
        <Card>
          <p className="text-small text-fg-muted">Firma tipográfica (sólo H1 o H2, una vez por heading)</p>
          <p className="mt-2 text-h2 text-fg-heading">
            <span className="font-bold italic">Firma</span> tipográfica de Listaso
          </p>
        </Card>
      </Section>

      <Section id="escalas" title="Radios y elevación" intro="Escalas cerradas de DEC-008. En oscuro, la profundidad se apoya en superficies y bordes.">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {radii.map((radius) => (
            <li key={radius.name} className="flex flex-col gap-2">
              <span aria-hidden="true" className={cx("h-16 border border-line-control bg-surface-soft", radius.className)} />
              <span className="text-small text-fg-default">
                {radius.name} · {radius.px === 9999 ? "píldora" : `${radius.px}px`}
              </span>
            </li>
          ))}
        </ul>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {elevations.map((level) => (
            <li key={level.name} className={cx("rounded-md bg-surface-raised p-6", level.className)}>
              <p className="text-body font-semibold text-fg-default">{level.name}</p>
              <p className="text-small text-fg-muted">{level.spec}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="botones"
        title="Botones"
        intro="Píldoras de al menos 48px de alto. Hover y focus-visible se revisan con el puntero y con Tab; active baja 1px salvo con movimiento reducido."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button>Acción principal</Button>
          <Button variant="secondary">Acción secundaria</Button>
          <Button variant="tertiary">Acción terciaria</Button>
          <Button icon="arrow-right">Con icono</Button>
          <Button size="lg">Tamaño grande</Button>
          <Button disabled>Deshabilitado</Button>
        </div>
        <div data-surface="band" className="flex flex-wrap items-center gap-4 rounded-lg p-6">
          <Button>Principal en banda</Button>
          <Button variant="secondary">Secundaria en banda</Button>
        </div>
      </Section>

      <Section id="enlaces" title="Enlaces">
        <p className="max-w-prose text-body text-fg-default">
          Los enlaces siempre van subrayados, como este{" "}
          <TextLink href="#tipografia">enlace a Tipografía</TextLink>. Un enlace externo abre otra pestaña
          y lo anuncia:{" "}
          <TextLink href="https://fonts.google.com/icons" external newTabLabel="(se abre en una pestaña nueva)">
            Material Symbols
          </TextLink>
          .
        </p>
        <p data-surface="band" className="max-w-prose rounded-md p-6 text-body">
          Sobre banda navy el enlace usa link.on-band: <TextLink href="#paleta">volver a la paleta</TextLink>.
        </p>
      </Section>

      <Section id="tarjetas" title="Tarjetas">
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card as="li">
            <p className="text-h4 font-semibold text-fg-heading">Tarjeta plana (e0)</p>
            <p className="mt-2 text-body text-fg-muted">Separación con borde, sin sombra.</p>
          </Card>
          <Card as="li" elevation="raised">
            <p className="text-h4 font-semibold text-fg-heading">Tarjeta elevada (e1)</p>
            <p className="mt-2 text-body text-fg-muted">
              Sube un nivel con hover o foco: <TextLink href="#movimiento">ver movimiento</TextLink>.
            </p>
          </Card>
        </ul>
      </Section>

      <Section id="formularios" title="Formularios" intro="Labels reales, ayuda y error asociados con aria-describedby. El error no depende sólo del color.">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField id="demo-name" label="Nombre" autoComplete="name" />
          <FormField
            id="demo-email"
            type="email"
            label="Correo electrónico"
            hint="Ejemplo de texto de ayuda."
            autoComplete="email"
            required
            requiredLabel="(obligatorio)"
          />
          <FormField
            id="demo-company"
            label="Empresa"
            defaultValue="Valor inválido"
            error="Mensaje de error de ejemplo."
          />
          <FormField id="demo-disabled" label="Campo deshabilitado" disabled defaultValue="No editable" />
        </div>
      </Section>

      <Section id="estados" title="Estados de éxito, advertencia y error">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <StatusMessage status="success" title="Éxito">Icono de verificación y título visible.</StatusMessage>
          <StatusMessage status="warning" title="Advertencia">Triángulo y título visible.</StatusMessage>
          <StatusMessage status="error" title="Error">Octágono y título visible.</StatusMessage>
        </div>
      </Section>

      <Section
        id="temas"
        title="Tema claro y oscuro"
        intro="La página sigue el tema del sistema y, sin preferencia, usa claro. Estos paneles fuerzan cada tema con data-theme para revisarlos lado a lado; no hay selector público."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ThemeSample theme="light" />
          <ThemeSample theme="dark" />
        </div>
      </Section>

      <Section
        id="vidrio"
        title="Vidrio"
        intro="Uso moderado: máximo dos superficies por viewport, sin anidar, sin formularios ni texto largo y sin animar el filtro. Con transparencia reducida o sin soporte se vuelve sólido."
      >
        <div data-surface="band" className={cx(styles.brandMesh, "rounded-lg p-6 sm:p-12")}>
          <GlassPanel className="max-w-md">
            <p className="text-eyebrow font-bold uppercase text-fg-heading">Vidrio claro</p>
            <p className="mt-2 text-body">Panel decorativo sobre el degradado de marca.</p>
          </GlassPanel>
        </div>
        <div data-surface="sami" className={cx(styles.samiCanvas, "rounded-lg p-6 sm:p-12")}>
          <GlassPanel tone="sami" className="flex max-w-md items-center gap-4">
            <BrandAsset id="sami" height={56} alt="SAMI" />
            <p className="text-body">Vidrio SAMI: sólo en espacios de SAMI e IA.</p>
          </GlassPanel>
        </div>
      </Section>

      <Section
        id="logos"
        title="Logos oficiales"
        intro="Archivos sin modificar, mostrados sobre el fondo permitido. Por debajo de 160px de ancho se usa el símbolo."
      >
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {masterLogos.map((asset) => (
            <AssetTile key={asset.id} {...asset} logoHeight={logoHeight(asset.width, asset.height)} />
          ))}
        </ul>
      </Section>

      <Section id="productos" title="Logos de producto">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productLogos.map((asset) => (
            <AssetTile key={asset.id} {...asset} logoHeight={logoHeight(asset.width, asset.height)} />
          ))}
        </ul>
      </Section>

      <Section
        id="iconos"
        title="Iconos"
        intro="Nombres semánticos. Fuente preferente: Listaso (listaso-icons.json); Material Symbols sólo como fallback. Sólo se generan los iconos mapeados."
      >
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {(Object.keys(iconData) as IconName[]).map((name) => (
            <li key={name} className="flex flex-col items-center gap-2 rounded-md border border-line-subtle p-4 text-center">
              <Icon name={name} size={32} className="text-fg-heading" />
              <span className="text-small font-semibold text-fg-default">{name}</span>
              <span className="text-caption text-fg-muted">
                {iconData[name].source === "listaso" ? "Listaso" : "Material (fallback)"} · {iconData[name].origin}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-end gap-6">
          {iconSizes.map((size) => (
            <span key={size} className="flex flex-col items-center gap-2 text-caption text-fg-muted">
              <Icon name="delivery" size={size} className="text-icon-accent" />
              {size}px
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            aria-label="Buscar"
            className="inline-flex size-12 items-center justify-center rounded-full border border-line-control text-fg-heading transition-colors duration-(--listaso-duration-fast) hover:bg-surface-soft"
          >
            <Icon name="search" />
          </button>
          <p className="text-small text-fg-muted">Botón de icono: nombre accesible y área de 48px.</p>
        </div>
      </Section>

      <Section
        id="movimiento"
        title="Movimiento"
        intro="Sólo para jerarquía, feedback o continuidad. Sin animaciones continuas, sin scroll hijacking y sin GSAP en esta etapa."
      >
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {motionTokens.map((token) => (
            <li key={token.name} className="rounded-md border border-line-subtle p-4">
              <p className="text-small font-semibold text-fg-default">{token.name}</p>
              <code className="text-caption text-fg-muted">{token.value}</code>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <label className="inline-flex min-h-12 cursor-pointer items-center gap-4 text-body text-fg-default">
            <input type="checkbox" className="peer sr-only" />
            <span
              aria-hidden="true"
              className={cx(
                "relative h-8 w-14 shrink-0 rounded-full border border-line-control bg-surface-soft",
                "transition-colors duration-(--listaso-duration-standard) ease-(--listaso-ease-standard)",
                "peer-checked:border-action-primary peer-checked:bg-action-primary",
                "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus",
                "after:absolute after:top-1 after:left-1 after:size-6 after:rounded-full after:bg-fg-default",
                "after:transition-[translate,background-color] after:duration-(--listaso-duration-standard)",
                "after:ease-(--listaso-ease-standard) peer-checked:after:translate-x-6 peer-checked:after:bg-fg-on-action",
              )}
            />
            Interruptor de ejemplo (feedback de estado)
          </label>
          <details className="group rounded-md border border-line-subtle p-4 md:flex-1">
            <summary className="flex min-h-12 cursor-pointer items-center gap-2 text-body font-semibold text-fg-default">
              <Icon
                name="chevron-right"
                size={20}
                className="transition-transform duration-(--listaso-duration-standard) ease-(--listaso-ease-standard) group-open:rotate-90"
              />
              Disclosure nativo
            </summary>
            <p className="mt-2 text-body text-fg-muted">
              El contenido existe en el HTML desde el inicio; la animación nunca lo oculta.
            </p>
          </details>
        </div>
      </Section>

      <Section id="preferencias" title="Preferencias del sistema" intro="Estado detectado sólo con CSS, sin JavaScript.">
        <ul className="flex flex-col gap-2 text-body text-fg-default">
          <li className="flex flex-wrap gap-2">
            <span className="font-semibold">prefers-reduced-motion:</span>
            <span className="motion-reduce:hidden">sin preferencia (movimiento completo)</span>
            <span className="hidden motion-reduce:inline">reduce (sin desplazamientos)</span>
          </li>
          <li className="flex flex-wrap gap-2">
            <span className="font-semibold">prefers-reduced-transparency:</span>
            <span className="reduced-transparency:hidden">sin preferencia (vidrio activo)</span>
            <span className="hidden reduced-transparency:inline">reduce (vidrio sólido)</span>
          </li>
          <li className="flex flex-wrap gap-2">
            <span className="font-semibold">Tema activo:</span>
            <span className="theme-light-only">claro</span>
            <span className="theme-dark-only">oscuro</span>
          </li>
          <li className="flex flex-wrap gap-2">
            <span className="font-semibold">forced-colors:</span>
            <span className="forced-colors:hidden">inactivo</span>
            <span className="hidden forced-colors:inline">activo</span>
          </li>
        </ul>
      </Section>

      <Section
        id="inventario"
        title="Activos temporales, históricos y descontinuados"
        intro="Customer Order Catalog se conserva sólo como registro histórico. Los activos sin confirmar no se publican."
      >
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviewAssets.map((asset) => (
            <AssetTile key={asset.id} {...asset} logoHeight={logoHeight(asset.width, asset.height)} />
          ))}
        </ul>
        <h3 className="text-h4 font-semibold text-fg-heading">Pendientes de confirmación</h3>
        <ul className="flex flex-col gap-4">
          {unresolvedBrandAssets.map((item) => (
            <li key={item.source + item.product} className="flex flex-col gap-2 rounded-md border border-dashed border-line-control p-4">
              <p className="text-body font-semibold text-fg-default">
                {item.product === "unknown" ? "Producto desconocido" : item.product}
              </p>
              <StatusBadge status={item.status} />
              <code className="text-caption break-all text-fg-muted">{item.source}</code>
              <p lang="en" className="text-small text-fg-muted">
                {item.notes}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
