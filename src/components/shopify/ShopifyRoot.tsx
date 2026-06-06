import { PRODUCT_HANDLES } from '@/lib/shopify-buy'

// ShopifyRoot mounts:
//   1. <shopify-store> with the Storefront API token, country, language
//   2. <shopify-cart id="main-cart"> shared globally
//   3. Hidden <shopify-context> triggers per SKU. Each trigger's template holds
//      a sr-only button whose onclick copies the product handle into the global
//      product-detail modal and shows it. Visible Buy Now CTAs across the site
//      dispatch a click into the matching hidden trigger so the modal opens
//      with that product already wired up. Nothing is added to the cart until
//      the user clicks Add to Cart from inside the modal.
//   4. A global <dialog id="product-detail-modal"> with a context that
//      renders the embedded Shopify product detail UI (image, title, price,
//      variant selector, description, Add to Cart, Buy Now).

const detailTriggerTemplate = (key: string) =>
  `<button type="button"
    data-shopify-detail="${key}"
    tabindex="-1"
    aria-hidden="true"
    style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;"
    onclick="document.getElementById('product-detail-context').update(event); document.getElementById('product-detail-modal').showModal();"
  ></button>`

const modalTemplate = `
  <div class="ext-modal__inner">
    <button type="button" class="ext-modal__close" aria-label="Close" onclick="document.getElementById('product-detail-modal').close()">&times;</button>
    <div class="ext-modal__grid">
      <div class="ext-modal__media">
        <shopify-media width="560" height="560" query="product.selectedOrFirstAvailableVariant.image"></shopify-media>
      </div>
      <div class="ext-modal__body">
        <span class="ext-modal__vendor"><shopify-data query="product.vendor"></shopify-data></span>
        <h2 class="ext-modal__title"><shopify-data query="product.title"></shopify-data></h2>
        <div class="ext-modal__price">
          <shopify-money query="product.selectedOrFirstAvailableVariant.price"></shopify-money>
          <shopify-money class="ext-modal__compare" query="product.selectedOrFirstAvailableVariant.compareAtPrice"></shopify-money>
        </div>
        <shopify-variant-selector></shopify-variant-selector>
        <div class="ext-modal__buttons">
          <button type="button" class="ext-btn ext-btn--primary"
            onclick="document.getElementById('main-cart').addLine(event).showModal(); document.getElementById('product-detail-modal').close();"
            shopify-attr--disabled="!product.selectedOrFirstAvailableVariant.availableForSale">
            Add to cart
          </button>
          <button type="button" class="ext-btn ext-btn--secondary"
            onclick="document.querySelector('shopify-store').buyNow(event)"
            shopify-attr--disabled="!product.selectedOrFirstAvailableVariant.availableForSale">
            Buy now
          </button>
        </div>
        <div class="ext-modal__desc">
          <shopify-data query="product.descriptionHtml"></shopify-data>
        </div>
      </div>
    </div>
  </div>
`

export default function ShopifyRoot() {
  return (
    <>
      <shopify-store
        store-domain="extngo.myshopify.com"
        public-access-token="169ddb8b4b740e71e1e32e7ba9910aea"
        country="US"
        language="en"
      />
      <shopify-cart id="main-cart" />

      {/* Hidden detail triggers, one per SKU */}
      <div aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <shopify-context type="product" handle={PRODUCT_HANDLES.cable50ft}>
          <template dangerouslySetInnerHTML={{ __html: detailTriggerTemplate('cable50ft') }} />
        </shopify-context>
        <shopify-context type="product" handle={PRODUCT_HANDLES.cable33ft}>
          <template dangerouslySetInnerHTML={{ __html: detailTriggerTemplate('cable33ft') }} />
        </shopify-context>
      </div>

      {/* Global product-detail modal */}
      <dialog id="product-detail-modal" className="ext-modal">
        <shopify-context id="product-detail-context" type="product" wait-for-update>
          <template dangerouslySetInnerHTML={{ __html: modalTemplate }} />
        </shopify-context>
      </dialog>

      <style dangerouslySetInnerHTML={{ __html: `
        shopify-store { display: none; }

        /* Cart styling */
        shopify-cart::part(dialog) { border-radius: 16px; }
        shopify-cart::part(primary-button) {
          background-color: #E8431A;
          border: 0;
          border-radius: 999px;
          color: #ffffff;
          font-family: var(--font-geist);
          font-size: 14px;
          font-weight: 600;
          padding: 14px 22px;
          letter-spacing: 0.3px;
          box-shadow: 0 10px 24px rgba(232,67,26,.28);
        }
        shopify-cart::part(primary-button):hover { transform: translateY(-1px); box-shadow: 0 16px 32px rgba(232,67,26,.4); }
        shopify-cart::part(secondary-button) {
          background: #ffffff;
          color: #1A1A1A;
          fill: #1A1A1A;
          border: 1.5px solid rgba(26,26,26,.18);
          border-radius: 999px;
        }
        shopify-cart::part(line-heading) { font-family: var(--font-geist); font-weight: 600; }
        shopify-cart::part(line-price) { font-family: var(--font-geist); font-weight: 600; color: #1A1A1A; }

        /* Product detail modal: full-screen overlay */
        .ext-modal {
          padding: 0;
          border: 0;
          border-radius: 0;
          width: 100vw;
          height: 100vh;
          max-width: 100vw;
          max-height: 100vh;
          margin: 0;
          inset: 0;
          background: #FAFAFA;
          overflow: hidden;
          font-family: var(--font-geist);
        }
        .ext-modal::backdrop { background: rgba(26,26,26,.6); backdrop-filter: blur(8px); }
        .ext-modal__inner {
          position: relative;
          height: 100%;
          padding: clamp(48px, 6vw, 80px) clamp(24px, 5vw, 96px);
          box-sizing: border-box;
          overflow-y: auto;
        }
        .ext-modal__close {
          position: fixed;
          top: clamp(18px, 2.5vw, 32px);
          right: clamp(18px, 2.5vw, 32px);
          width: 44px;
          height: 44px;
          border-radius: 999px;
          background: rgba(26,26,26,.06);
          border: 0;
          font-size: 26px;
          line-height: 1;
          color: #1A1A1A;
          cursor: pointer;
          z-index: 5;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .ext-modal__close:hover { background: rgba(26,26,26,.14); transform: scale(1.06); }
        .ext-modal__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(28px, 4vw, 64px);
          max-width: 1400px;
          margin: 0 auto;
          align-items: center;
          min-height: 100%;
        }
        @media (min-width: 900px) {
          .ext-modal__grid {
            grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
          }
        }
        .ext-modal__media {
          background: radial-gradient(circle at 35% 30%, #FFF9F2, #F5ECDC 55%, #E6D7BD 100%);
          border-radius: 24px;
          padding: clamp(28px, 4vw, 56px);
          aspect-ratio: 1/1;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 720px;
          width: 100%;
          margin: 0 auto;
        }
        .ext-modal__media img { max-width: 100%; height: auto; mix-blend-mode: multiply; }
        .ext-modal__body {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 1.6vw, 22px);
          min-width: 0;
          max-width: 560px;
        }
        .ext-modal__vendor {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2.4px;
          text-transform: uppercase;
          color: #6D6D6D;
        }
        .ext-modal__title {
          margin: 0;
          font-family: var(--font-bricolage);
          font-size: clamp(22px, 2.4vw, 36px);
          font-weight: 800;
          color: #1A1A1A;
          letter-spacing: -0.025em;
          line-height: 1.15;
          word-break: normal;
          overflow-wrap: anywhere;
        }
        .ext-modal__price {
          display: flex;
          align-items: baseline;
          gap: 12px;
          font-size: clamp(24px, 2.4vw, 32px);
          font-weight: 700;
          color: #1A1A1A;
          letter-spacing: -0.02em;
        }
        .ext-modal__compare {
          text-decoration: line-through;
          opacity: 0.45;
          font-size: 18px;
          font-weight: 500;
        }
        .ext-modal__buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ext-modal__desc {
          font-size: 14.5px;
          color: #4A4A4A;
          line-height: 1.65;
          padding-top: 18px;
          border-top: 1px solid rgba(26,26,26,.08);
          max-height: 280px;
          overflow-y: auto;
        }
        .ext-modal__desc p { margin: 0 0 12px; }
        .ext-btn {
          font-family: var(--font-geist);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.3px;
          padding: 14px 22px;
          border-radius: 999px;
          cursor: pointer;
          border: 0;
          transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
        }
        .ext-btn--primary {
          background: #E8431A;
          color: #fff;
          box-shadow: 0 10px 24px rgba(232,67,26,.28);
        }
        .ext-btn--primary:hover { transform: translateY(-1px); box-shadow: 0 16px 32px rgba(232,67,26,.4); }
        .ext-btn--secondary {
          background: transparent;
          color: #1A1A1A;
          border: 1.5px solid rgba(26,26,26,.18);
        }
        .ext-btn--secondary:hover { border-color: rgba(26,26,26,.35); transform: translateY(-1px); }
        .ext-btn[disabled] { opacity: 0.4; cursor: not-allowed; transform: none; }

        /* Variant selector skinning (shared with /shop page) */
        shopify-variant-selector::part(form) {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 12px 0;
          border-top: 1px solid rgba(26,26,26,.08);
        }
        shopify-variant-selector::part(label) {
          font-family: var(--font-geist);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #6D6D6D;
        }
        shopify-variant-selector::part(radio) {
          background: transparent;
          border: 1.5px solid rgba(26,26,26,.18);
          color: #1A1A1A;
          border-radius: 999px;
          padding: 10px 18px;
          font-family: var(--font-geist);
          font-size: 13px;
          font-weight: 500;
        }
        shopify-variant-selector::part(radio):hover {
          background: rgba(232,67,26,.06);
          border-color: rgba(232,67,26,.35);
          color: #E8431A;
        }
        shopify-variant-selector::part(radio-selected) {
          background: #1A1A1A;
          color: #fff;
          border-color: #1A1A1A;
        }
      `}} />
    </>
  )
}
