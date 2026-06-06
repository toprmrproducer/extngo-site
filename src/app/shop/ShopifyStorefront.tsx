'use client'

import { openProductDetail, type BuyKey } from '@/lib/shopify-buy'
import { PRODUCT_HANDLES } from '@/lib/shopify-buy'

type ShopCard = {
  key: BuyKey
  badge: string
  tagline: string
}

const HERO_PRODUCTS: ShopCard[] = [
  {
    key: 'cable50ft',
    badge: '50 ft / 15 m',
    tagline: 'For full office runs, conference setups, and IT fieldwork.',
  },
  {
    key: 'cable33ft',
    badge: '33 ft / 10 m',
    tagline: 'For hotel rooms, home labs, and travel kits.',
  },
]

const BLUE_HANDLE_PLACEHOLDER = 'extngo-usb-c-to-ethernet-15-meter-retractable-cable'

const openModal = `
  (function(e){
    var ctx = document.getElementById('product-detail-context');
    var dlg = document.getElementById('product-detail-modal');
    if (ctx && dlg) { ctx.update(e); dlg.showModal(); }
  })(event)
`.replace(/\s+/g, ' ')

export default function ShopifyStorefront() {
  return (
    <>
      {/* Two hero SKUs — each card is its own shopify-context. Clicking View
          details dispatches into the global product-detail modal. */}
      <section className="shop-grid">
        {HERO_PRODUCTS.map((p) => (
          <article key={p.key} className="shop-card">
            <shopify-context type="product" handle={PRODUCT_HANDLES[p.key]}>
              <template
                dangerouslySetInnerHTML={{
                  __html: `
                    <div class="shop-card__media">
                      <shopify-media width="420" height="420" query="product.selectedOrFirstAvailableVariant.image"></shopify-media>
                    </div>
                    <div class="shop-card__body">
                      <span class="shop-card__badge">${p.badge}</span>
                      <h2 class="shop-card__title"><shopify-data query="product.title"></shopify-data></h2>
                      <p class="shop-card__tagline">${p.tagline}</p>
                      <div class="shop-card__price">
                        <shopify-money query="product.selectedOrFirstAvailableVariant.price"></shopify-money>
                      </div>
                      <button type="button" class="shop-card__cta"
                        onclick="${openModal}"
                        shopify-attr--disabled="!product.selectedOrFirstAvailableVariant.availableForSale">
                        View details
                      </button>
                    </div>
                  `,
                }}
              />
            </shopify-context>
          </article>
        ))}

        {/* Blue Edition — not on Shopify yet, render as static Out of Stock card */}
        <article className="shop-card shop-card--oos">
          <div className="shop-card__media shop-card__media--blue">
            {/* Use existing brand image if available, else fallback to gradient */}
            <picture>
              <img src="/product-blue.png" alt="EXTNGO USB-C to Ethernet Blue Edition" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
            </picture>
          </div>
          <div className="shop-card__body">
            <span className="shop-card__badge shop-card__badge--blue">USB-C / 15 m</span>
            <h2 className="shop-card__title">EXTNGO USB-C to Ethernet, 15 m</h2>
            <p className="shop-card__tagline">Built for USB-C laptops, iPads, and phones. Same retractable flat CAT6 cable, no dongle needed.</p>
            <div className="shop-card__price shop-card__price--muted">$70.02</div>
            <button type="button" className="shop-card__cta shop-card__cta--oos" disabled aria-disabled="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <line x1="4.9" y1="4.9" x2="19.1" y2="19.1"/>
              </svg>
              Out of Stock
            </button>
          </div>
        </article>
      </section>

      {/* You may also like — frontpage collection */}
      <section className="shop-collection">
        <h2 className="shop-collection__title">More from EXTNGO</h2>
        <shopify-context type="collection" handle="frontpage">
          <template
            dangerouslySetInnerHTML={{
              __html: `
                <div class="shop-collection__grid">
                  <shopify-list-context type="product" query="collection.products" first="8">
                    <template>
                      <button type="button" class="shop-collection__card"
                        onclick="${openModal}"
                        shopify-attr--disabled="!product.availableForSale">
                        <div class="shop-collection__media">
                          <shopify-media width="320" height="320" query="product.selectedOrFirstAvailableVariant.image"></shopify-media>
                        </div>
                        <div class="shop-collection__info">
                          <h3 class="shop-collection__name"><shopify-data query="product.title"></shopify-data></h3>
                          <span class="shop-collection__price"><shopify-money query="product.selectedOrFirstAvailableVariant.price"></shopify-money></span>
                        </div>
                      </button>
                    </template>
                  </shopify-list-context>
                </div>
              `,
            }}
          />
        </shopify-context>
      </section>

      <style jsx global>{`
        .shop-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(20px, 3vw, 28px);
        }
        @media (min-width: 760px) {
          .shop-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (min-width: 1100px) {
          .shop-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        .shop-card {
          background: #fff;
          border-radius: 24px;
          border: 1px solid rgba(26,26,26,.06);
          box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 12px 36px -16px rgba(26,26,26,0.12);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .shop-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 20px 48px -16px rgba(26,26,26,0.18);
        }
        .shop-card--oos { opacity: 0.92; }
        .shop-card__media {
          background: radial-gradient(circle at 35% 30%, #FFF9F2, #F5ECDC 55%, #E6D7BD 100%);
          padding: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 1/1;
        }
        .shop-card__media--blue {
          background: radial-gradient(circle at 35% 30%, #E6F3FF, #B9DBF7 55%, #6FA8D6 100%);
        }
        .shop-card__media img {
          max-width: 100%;
          height: auto;
          mix-blend-mode: multiply;
        }
        .shop-card__body {
          padding: clamp(20px, 2.5vw, 28px);
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }
        .shop-card__badge {
          display: inline-flex;
          align-self: flex-start;
          padding: 6px 12px;
          background: rgba(26,26,26,.04);
          border: 1px solid rgba(26,26,26,.08);
          color: #1A1A1A;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          border-radius: 999px;
        }
        .shop-card__badge--blue {
          background: rgba(33,150,243,.08);
          border-color: rgba(33,150,243,.22);
          color: #1565C0;
        }
        .shop-card__title {
          margin: 0;
          font-family: var(--font-bricolage);
          font-size: clamp(18px, 1.6vw, 22px);
          font-weight: 800;
          color: #1A1A1A;
          letter-spacing: -0.02em;
          line-height: 1.18;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .shop-card__tagline {
          margin: 0;
          color: #6D6D6D;
          font-size: 13.5px;
          line-height: 1.55;
        }
        .shop-card__price {
          font-family: var(--font-geist);
          font-size: 22px;
          font-weight: 700;
          color: #1A1A1A;
          letter-spacing: -0.02em;
          margin-top: 4px;
        }
        .shop-card__price--muted { opacity: 0.7; }
        .shop-card__cta {
          margin-top: 8px;
          font-family: var(--font-geist);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.3px;
          padding: 13px 22px;
          border-radius: 999px;
          cursor: pointer;
          border: 0;
          background: #E8431A;
          color: #fff;
          box-shadow: 0 10px 24px rgba(232,67,26,.28);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .shop-card__cta:hover { transform: translateY(-1px); box-shadow: 0 16px 32px rgba(232,67,26,.4); }
        .shop-card__cta[disabled] { opacity: 0.4; cursor: not-allowed; transform: none; }
        .shop-card__cta--oos {
          background: rgba(33,150,243,.18);
          color: #1565C0;
          border: 1px dashed rgba(33,150,243,.55);
          box-shadow: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          opacity: 1;
        }
        .shop-card__cta--oos:hover { transform: none; box-shadow: none; }

        /* Collection */
        .shop-collection { margin-top: clamp(56px, 8vh, 96px); }
        .shop-collection__title {
          margin: 0 0 24px;
          font-family: var(--font-bricolage);
          font-size: clamp(22px, 2.5vw, 30px);
          font-weight: 800;
          color: #1A1A1A;
          letter-spacing: -0.02em;
        }
        .shop-collection__grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0,1fr));
          gap: clamp(12px, 2vw, 20px);
        }
        @media (min-width: 700px) { .shop-collection__grid { grid-template-columns: repeat(3, minmax(0,1fr)); } }
        @media (min-width: 1000px) { .shop-collection__grid { grid-template-columns: repeat(4, minmax(0,1fr)); } }
        .shop-collection__card {
          background: #fff;
          border: 1px solid rgba(26,26,26,.06);
          border-radius: 18px;
          padding: 16px;
          text-align: left;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-family: var(--font-geist);
        }
        .shop-collection__card:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 32px -16px rgba(26,26,26,0.18);
        }
        .shop-collection__card[disabled] { opacity: 0.4; cursor: not-allowed; }
        .shop-collection__media {
          aspect-ratio: 1/1;
          border-radius: 12px;
          background: radial-gradient(circle at 35% 30%, #FFF9F2, #F5ECDC 55%, #E6D7BD 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
        }
        .shop-collection__media img {
          max-width: 100%;
          height: auto;
          mix-blend-mode: multiply;
        }
        .shop-collection__info { display: flex; flex-direction: column; gap: 4px; }
        .shop-collection__name {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          color: #1A1A1A;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .shop-collection__price {
          font-size: 14px;
          color: #6D6D6D;
          font-weight: 500;
        }
      `}</style>
    </>
  )
}
