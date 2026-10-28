"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { productCatalog } from "@/content/products/shared";
import { explorer, productGroups, productStoreLinks } from "@/content/products/hub";
import type { ProductSlug } from "@/content/products/types";
import styles from "./ProductsHub.module.css";

const initialProduct: ProductSlug = "pre-sales";
const productNumbers = Object.fromEntries(productGroups.flatMap((group) => group.products).map((slug, index) => [slug, String(index + 1).padStart(2, "0")])) as Record<ProductSlug, string>;

function ProductVisual({ product }: { product: ProductSlug }) {
  const name = productCatalog[product].name;
  return (
    <div className={styles.productVisual} role="img" aria-label={`Illustration representing ${name}`} data-media-slot={product}>
      <svg viewBox="0 0 640 420" className={styles.visualLines} fill="none" aria-hidden="true" focusable="false">
        <path d="M20 329 C113 253 187 388 282 276 S468 152 620 70" />
        <path d="M20 390 C131 311 211 420 315 317 S486 235 620 139" />
        <circle cx="490" cy="125" r="98" />
        <circle cx="490" cy="125" r="145" />
      </svg>
      <div className={styles.visualTile} aria-hidden="true">
        <span className={styles.visualTileTop}>LISTASO / {product.toUpperCase().replaceAll("-", " ")}</span>
        <span className={styles.visualGlyph}>{productNumbers[product]}</span>
        <span className={styles.visualTileBottom}>{name}</span>
      </div>
    </div>
  );
}

function ProductPreview({ selected }: { selected: ProductSlug }) {
  const current = productCatalog[selected];
  const storeLinks = productStoreLinks[selected] ?? [];

  return (
    <div className={styles.productPreview}>
      <ProductVisual product={selected} />
      <div className={styles.previewBody}>
        <div aria-live="polite" aria-atomic="true">
          <p className={styles.previewKicker}>LISTASO PRODUCT</p>
          <h3 className={styles.previewTitle}>{current.name}</h3>
          <p className={styles.previewSummary}>{current.summary}</p>
        </div>
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
export function ProductExplorer() {
  const [selected, setSelected] = useState<ProductSlug>(initialProduct);

  return (
    <section id="product-explorer" aria-labelledby="products-explorer-title" className={styles.explorerSection}>
      <Container width="wide">
        <div className={styles.sectionIntro}>
          <p className={styles.sectionEyebrow}>{explorer.eyebrow}</p>
          <h2 id="products-explorer-title" className={styles.sectionTitle}><strong><em>{explorer.title.emphasis}</em></strong> {explorer.title.rest}</h2>
          <p className={styles.sectionLead}>{explorer.lead}</p>
        </div>
        <div className={styles.explorerLayout}>
          <div className={styles.productList} aria-label="Listaso products">
            {productGroups.map((group) => (
              <div key={group.id} className={styles.productGroup}>
                <h3 className={styles.groupTitle}>{group.label}</h3>
                <ul>
                  {group.products.map((slug) => {
                    const product = productCatalog[slug];
                    return (
                      <li key={slug} className={styles.productRow} data-selected={selected === slug}>
                        <button type="button" aria-pressed={selected === slug} onClick={() => setSelected(slug)} className={styles.selectProduct}>
                          {product.name}
                        </button>
                        <a href={product.href} aria-label={`Open ${product.name} page`} className={styles.productDirectLink} data-analytics-event="product_card_click" data-analytics-label={product.name}>↗</a>
                        {selected === slug ? <div className={styles.mobilePreview}><ProductPreview selected={selected} /></div> : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.desktopPreview}>
            <ProductPreview selected={selected} />
          </div>
        </div>
      </Container>
    </section>
  );
}
