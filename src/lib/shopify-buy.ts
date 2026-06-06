// Client-only helper that opens the global Shopify product-detail modal.
//
// Pattern: <ShopifyRoot /> mounts a hidden <shopify-context> per SKU. Each
// context holds a screen-reader-only button whose inline onclick copies the
// product handle into the global <shopify-context id="product-detail-context">
// and shows the <dialog id="product-detail-modal">. Visible Buy Now CTAs
// across the site programmatically click that hidden trigger so the modal
// opens with the matching product. The user then chooses Add to cart or
// Buy now from inside the modal. Nothing is added to the cart until they do.

export type BuyKey = 'cable50ft' | 'cable33ft'

export const PRODUCT_HANDLES: Record<BuyKey, string> = {
  cable50ft:
    'extngo-retractable-ethernet-cable-50-feet-15-meter-cat6-flat-internet-extension-cord-reel-portable-1-gbps-data-speed-swiftly-setup-extend-networks-male-female-rj-45-connector-utp-extender',
  cable33ft:
    'retractable-network-cable-extender-33-feet-10-meter-cat-6-ethernet-cable-flat-portable-1-gbps-data-speed-swiftly-setup-temp-networks-cascadable-male-female-rj45-connector-utp-cable-reel',
}

export function openProductDetail(key: BuyKey): void {
  if (typeof window === 'undefined') return
  const trigger = document.querySelector<HTMLButtonElement>(
    `[data-shopify-detail="${key}"]`,
  )
  if (!trigger) {
    // Web components script may still be loading, gracefully bail to /shop.
    window.location.href = '/shop'
    return
  }
  trigger.click()
}
