import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { devices, models } from "@/content/integrations/printers";
import { SectionHeader } from "../SectionHeader";
import { ProductSection } from "../product/ProductSection";
import { DeviceSpecs } from "./DeviceSpecs";
import { ModelFinder } from "./ModelFinder";

/**
 * Compatible printer and scanner models: a styled data table grouped by
 * brand, with a "Works with" filter; the note follows.
 */
export function PrinterModels() {
  return (
    <ProductSection labelledBy="models-title" tone="alt">
      <Container className="flex flex-col gap-10">
        <SectionHeader id="models-title" eyebrow={models.eyebrow} title={models.title} />
        <div data-reveal="fade" className="flex flex-col gap-6">
          <ModelFinder rows={models.rows} columns={models.columns} labelledBy="models-title" />
          <p className="flex items-center gap-2 text-body text-fg-muted">
            <Icon name="info" size={20} className="shrink-0 text-icon-accent" />
            {models.note}
          </p>
        </div>
      </Container>
    </ProductSection>
  );
}

/** Phones and tablets that run Listaso: platform switch with a device illustration. */
export function SupportedDevices() {
  return (
    <ProductSection labelledBy="devices-title">
      <Container className="flex flex-col gap-12">
        <SectionHeader id="devices-title" eyebrow={devices.eyebrow} title={devices.title} />
        <DeviceSpecs groups={devices.groups} label={devices.eyebrow} />
      </Container>
    </ProductSection>
  );
}
