// ── Shopify Storefront API Client ────────────────────────────────────────────

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN ?? ''
const SHOPIFY_STOREFRONT_PRIVATE_TOKEN = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN ?? ''

if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_PRIVATE_TOKEN) {
  // Warn at module load time in dev — won't throw so build still works
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      '[Shopify] Missing env vars: SHOPIFY_STORE_DOMAIN and/or SHOPIFY_STOREFRONT_PRIVATE_TOKEN'
    )
  }
}

interface ShopifyResponse<T> {
  data: T
  errors?: { message: string }[]
}

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/2026-04/graphql.json`

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Shopify-Storefront-Private-Token': SHOPIFY_STOREFRONT_PRIVATE_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    throw new Error(`Shopify fetch failed: ${res.status} ${res.statusText}`)
  }

  const json: ShopifyResponse<T> = await res.json()

  if (json.errors?.length) {
    throw new Error(json.errors.map(e => e.message).join(', '))
  }

  return json.data
}
