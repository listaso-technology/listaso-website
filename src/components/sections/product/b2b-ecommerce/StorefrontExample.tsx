import { Icon } from "@/components/icons/Icon";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { storefrontExample } from "@/content/products/b2b-ecommerce";

/**
 * Illustrative storefront in a browser frame. It renders as product UI in
 * light (data-theme) over the brand band, with one glass notice. The whole
 * composition is a single image to assistive technology.
 */
export function StorefrontExample() {
  const example = storefrontExample;

  return (
    <div data-reveal="media" className="relative mx-auto w-full max-w-xl pb-12 lg:mr-0">
      <div
        role="img"
        aria-label={example.label}
        data-theme="light"
        className="overflow-hidden rounded-lg border border-line-subtle bg-surface-page shadow-e3"
      >
        <div aria-hidden="true">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-line-subtle bg-surface-alt px-4 py-3">
            <span className="size-3 rounded-full bg-line-control" />
            <span className="size-3 rounded-full bg-line-control" />
            <span className="size-3 rounded-full bg-line-control" />
            <span className="ml-4 h-6 flex-1 rounded-full bg-surface-page" />
          </div>
          {/* Store header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-subtle px-4 py-4 sm:px-6">
            <span className="flex flex-col">
              <span className="text-caption font-semibold uppercase text-fg-muted">{example.store}</span>
              <span className="text-body font-bold text-fg-heading">{example.customer}</span>
            </span>
            <span className="flex items-center gap-2 rounded-full bg-fg-heading px-4 py-2 text-small font-semibold text-fg-on-action">
              <Icon name="cart" size={16} />
              {example.cart.label} · {example.cart.total}
            </span>
          </div>
          <div className="flex flex-col gap-4 p-4 sm:p-6">
            <span className="flex items-center gap-2 rounded-full border border-line-control px-4 py-2 text-small text-fg-muted">
              <Icon name="search" size={16} />
              {example.search}
            </span>
            <span className="flex w-fit items-center gap-2 rounded-full bg-surface-soft px-4 py-2 text-small font-semibold text-fg-heading">
              <Icon name="reorder" size={16} className="text-icon-accent" />
              {example.reorder}
            </span>
            <span className="flex flex-col divide-y divide-line-subtle rounded-md border border-line-subtle">
              {example.products.map((product) => (
                <span key={product.name} className="flex items-center gap-3 p-3">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-sm bg-surface-alt text-icon-accent">
                    <Icon name="box" size={24} />
                  </span>
                  <span className="flex flex-1 flex-col">
                    <span className="text-small font-semibold text-fg-default">{product.name}</span>
                    <span className="text-caption text-fg-muted">{example.priceLabel}</span>
                  </span>
                  <span className="text-body font-bold text-fg-heading">{product.price}</span>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-action-primary text-fg-on-action">
                    <Icon name="plus" size={16} />
                  </span>
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>

      <GlassPanel
        aria-hidden="true"
        className="absolute bottom-0 left-4 flex items-center gap-3 rounded-full px-5 py-3 sm:left-8 lg:-left-12"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-fg-heading text-fg-on-action">
          <Icon name="check" size={16} />
        </span>
        <span className="flex flex-col">
          <span className="text-small font-semibold text-fg-heading">{example.placed}</span>
          <span className="text-caption text-fg-default">{example.customer}</span>
        </span>
      </GlassPanel>
    </div>
  );
}
