import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { devices, models } from "@/content/integrations/printers";
import { SectionHeader } from "../SectionHeader";
import { CheckList } from "../product/CheckList";
import { ProductSection } from "../product/ProductSection";

/** Compatible printer and scanner models (data table). */
export function PrinterModels() {
  return (
    <ProductSection labelledBy="models-title" tone="alt">
      <Container className="flex flex-col gap-12">
        <SectionHeader id="models-title" eyebrow={models.eyebrow} title={models.title} />
        <div data-reveal="fade" className="flex flex-col gap-4">
          <div className="overflow-x-auto rounded-md border border-line-subtle bg-surface-raised">
            <table aria-labelledby="models-title" className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-line-subtle">
                  {models.columns.map((column) => (
                    <th key={column} scope="col" className="p-4 text-small font-semibold text-fg-heading lg:px-6">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line-subtle">
                {models.rows.map((row) => (
                  <tr key={`${row.brand}-${row.model}`}>
                    <th scope="row" className="p-4 align-top text-body font-bold text-fg-heading lg:px-6">
                      {row.brand}
                    </th>
                    <td className="p-4 align-top text-body text-fg-default lg:px-6">{row.model}</td>
                    <td className="p-4 align-top lg:px-6">
                      <ul className="flex flex-wrap gap-2">
                        {row.apps.map((app) => (
                          <li
                            key={app}
                            className="rounded-full border border-line-subtle bg-surface-soft px-3 py-1 text-small text-fg-default"
                          >
                            {app}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-body text-fg-muted">{models.note}</p>
        </div>
      </Container>
    </ProductSection>
  );
}

/** Phones and tablets that run Listaso. */
export function SupportedDevices() {
  return (
    <ProductSection labelledBy="devices-title">
      <Container className="flex flex-col gap-12">
        <SectionHeader id="devices-title" eyebrow={devices.eyebrow} title={devices.title} />
        <div className="grid gap-6 md:grid-cols-2">
          {devices.groups.map((group) => (
            <Card key={group.title} data-reveal="fade" className="flex flex-col gap-6 p-6 lg:p-8">
              <h3 className="text-h4 font-semibold text-fg-heading">{group.title}</h3>
              <CheckList items={group.items} />
            </Card>
          ))}
        </div>
      </Container>
    </ProductSection>
  );
}
