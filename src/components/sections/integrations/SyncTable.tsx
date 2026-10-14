import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { systemPageCopy, type IntegrationSystem, type SyncDirection } from "@/content/integrations/systems";
import { SectionHeader } from "../SectionHeader";
import { ProductSection } from "../product/ProductSection";

/**
 * Direction as text plus an arrow: "QuickBooks → Listaso". The arrow is
 * decorative; a visually hidden "to" keeps the reading order meaningful.
 */
export function Direction({ direction, name }: { direction: SyncDirection; name: string }) {
  const { table } = systemPageCopy;

  if (direction === "both") {
    return (
      <span className="inline-flex items-center gap-2 font-semibold text-fg-heading">
        <Icon name="sync" size={16} className="text-icon-accent" />
        {table.both}
      </span>
    );
  }

  const [from, to] = direction === "in" ? [name, "Listaso"] : ["Listaso", name];
  return (
    <span className="inline-flex flex-wrap items-center gap-x-2 font-semibold text-fg-heading">
      {from}
      <Icon name="arrow-right" size={16} className="text-icon-accent" />
      <span className="sr-only">{table.to}</span>
      {to}
    </span>
  );
}

/** "How the X sync works": a real data table, never glass (DEC-008). */
export function SyncTable({ system }: { system: IntegrationSystem }) {
  const copy = systemPageCopy.sync(system.name);
  const { table } = systemPageCopy;

  return (
    <ProductSection labelledBy="sync-title" tone="alt">
      <Container className="flex flex-col gap-12">
        <SectionHeader id="sync-title" eyebrow={copy.eyebrow} title={copy.title} />
        <div data-reveal="fade" className="overflow-x-auto rounded-md border border-line-subtle bg-surface-raised">
          <table aria-labelledby="sync-title" className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-line-subtle">
                <th scope="col" className="p-4 text-small font-semibold text-fg-heading lg:px-6">
                  {table.item}
                </th>
                <th scope="col" className="p-4 text-small font-semibold text-fg-heading lg:px-6">
                  {table.direction}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-subtle">
              {system.sync.map((row) => (
                <tr key={row.item}>
                  <th scope="row" className="p-4 align-top text-body font-normal text-fg-default lg:px-6">
                    {row.item}
                  </th>
                  <td className="p-4 align-top text-body sm:whitespace-nowrap lg:px-6">
                    <Direction direction={row.direction} name={system.name} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </ProductSection>
  );
}
