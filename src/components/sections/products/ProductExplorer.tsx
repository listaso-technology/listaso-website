"use client";

import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { Signature } from "@/components/sections/Signature";
import { productCatalog } from "@/content/products/shared";
import { explorer, productGroups, productStoreLinks } from "@/content/products/hub";
import type { ProductSlug } from "@/content/products/types";
import { FillPhoto } from "../variants/HeroParts";
import type { ProductPreview as ProductPreviewData } from "./productPreviews";
import styles from "./ProductsHub.module.css";

type Previews = Record<ProductSlug, ProductPreviewData>;

const initialProduct: ProductSlug = "pre-sales";
const orderedProducts = productGroups.flatMap((group) => group.products) as ProductSlug[];
const productNumbers = Object.fromEntries(orderedProducts.map((slug, index) => [slug, String(index + 1).padStart(2, "0")])) as Record<ProductSlug, string>;
const productGroupLabel = Object.fromEntries(productGroups.flatMap((group) => group.products.map((slug) => [slug, group.label]))) as Record<ProductSlug, string>;
const total = String(orderedProducts.length).padStart(2, "0");

/**
 * Stage for the selected product: its page's hero photo (or SAMI's example
 * question), the page headline and the position among all products. It is
 * re-keyed on change so the media and headline enter again (finite; instant
 * with reduced motion).
 */
function ProductStage({ product, preview }: { product: ProductSlug; preview: ProductPreviewData }) {
  const current = productCatalog[product];
  const position = orderedProducts.indexOf(product);

  return (
    <div className={styles.stage} role="img" aria-label={`${current.name}: ${current.summary}`} data-media-slot={product}>
      <div key={product} aria-hidden="true" className={styles.stageMedia}>
        {preview.photo ? (
          <FillPhoto photo={preview.photo} sizes="(min-width: 1024px) 40vw, 92vw" />
        ) : (
          <div data-surface="sami" className={styles.samiScene}>
            {preview.question ? <span className={styles.samiQuestion}>{preview.question}</span> : null}
            <span className={styles.samiReply}>
              <span className={styles.samiName}>SAMI</span>
              <span className={styles.samiDots}><span /><span /><span /></span>
            </span>
          </div>
        )}
      </div>
      <span aria-hidden="true" className={styles.stageScrim} />
      <div aria-hidden="true" className={styles.stageTop}>
        <span className={styles.stageChip}>
          <Icon name={current.icon} size={16} />
          {productNumbers[product]} / {total}
        </span>
        <span className={styles.stageGroup}>{productGroupLabel[product]}</span>
      </div>
      <p key={`${product}-headline`} aria-hidden="true" className={styles.stageHeadline}>
        <Signature text={preview.headline} />
      </p>
      <span aria-hidden="true" className={styles.stageProgress}>
        {orderedProducts.map((slug, index) => (
          <span key={slug} data-state={index === position ? "active" : index < position ? "done" : undefined} />
        ))}
      </span>
    </div>
  );
}

function ProductPreview({ selected, preview }: { selected: ProductSlug; preview: ProductPreviewData }) {
  const current = productCatalog[selected];
  const storeLinks = productStoreLinks[selected] ?? [];

  return (
    <div className={styles.productPreview}>
      <ProductStage product={selected} preview={preview} />
      <div className={styles.previewBody}>
        <div aria-live="polite" aria-atomic="true">
          <p className={styles.previewKicker}>LISTASO PRODUCT</p>
          <h3 className={styles.previewTitle}>{current.name}</h3>
          <p className={styles.previewSummary}>{current.summary}</p>
        </div>
        {preview.highlights.length > 0 ? (
          <ul key={selected} className={styles.previewHighlights}>
            {preview.highlights.map((item) => (
              <li key={item.title}>
                <Icon name={item.icon} size={16} />
                {item.title}
              </li>
            ))}
          </ul>
        ) : null}
        <a href={current.href} className={styles.previewLink} data-analytics-event="product_card_click" data-analytics-label={current.name}>
          {explorer.productLink} <span aria-hidden="true">↗</span>
        </a>
        {storeLinks.length > 0 ? (
          <div className={styles.storeBlock}>
            <p className={styles.storeLabel}>{explorer.storeLabel}</p>
            <ul className={styles.storeList}>
              {storeLinks.map((app) => (
                <li key={`${app.name}-${app.store}`}>
                  <a href={app.href} target="_blank" rel="noopener noreferrer" className={styles.storeLink} data-analytics-event="external_appstore_click" data-analytics-label={app.name}>
                    <span>{app.name}</span>
                    <span>{app.store === "apple" ? explorer.appStore : explorer.googlePlay} <span aria-hidden="true">↗</span></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** Choice buttons change the preview; every product also has a direct link. */
export function ProductExplorer({ previews }: { previews: Previews }) {
  const [selected, setSelected] = useState<ProductSlug>(initialProduct);

  return (
    <section id="product-explorer" aria-labelledby="products-explorer-title" className={styles.explorerSection}>
      <Container width="wide">
        <div data-reveal="group" className={styles.sectionIntro}>
          <p data-reveal-item className={styles.sectionEyebrow}>{explorer.eyebrow}</p>
          <h2 data-reveal-item id="products-explorer-title" className={styles.sectionTitle}><strong><em>{explorer.title.emphasis}</em></strong> {explorer.title.rest}</h2>
          <p data-reveal-item className={styles.sectionLead}>{explorer.lead}</p>
        </div>
        <div className={styles.explorerLayout}>
          <div data-reveal="group" className={styles.productList} aria-label="Listaso products">
            {productGroups.map((group) => (
              <div data-reveal-item key={group.id} className={styles.productGroup}>
                <h3 className={styles.groupTitle}>{group.label}</h3>
                <ul>
                  {group.products.map((slug) => {
                    const product = productCatalog[slug];
                    const isSelected = selected === slug;
                    return (
                      <li key={slug} className={styles.productRow} data-selected={isSelected}>
                        <button type="button" aria-pressed={isSelected} onClick={() => setSelected(slug)} className={styles.selectProduct}>
                          <span aria-hidden="true" className={styles.rowIcon}><Icon name={product.icon} size={20} /></span>
                          <span className={styles.rowNumber} aria-hidden="true">{productNumbers[slug]}</span>
                          <span className={styles.rowName}>{product.name}</span>
                        </button>
                        <a href={product.href} aria-label={`Open ${product.name} page`} className={styles.productDirectLink} data-analytics-event="product_card_click" data-analytics-label={product.name}>↗</a>
                        {isSelected ? <div className={styles.mobilePreview}><ProductPreview selected={selected} preview={previews[selected]} /></div> : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div data-reveal="media" className={styles.desktopPreview}>
            <ProductPreview selected={selected} preview={previews[selected]} />
          </div>
        </div>
      </Container>
    </section>
  );
}
