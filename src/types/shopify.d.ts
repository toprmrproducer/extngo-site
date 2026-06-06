import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type ShopifyElement<E = Record<string, unknown>> = DetailedHTMLProps<
  HTMLAttributes<HTMLElement> & E,
  HTMLElement
>

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'shopify-store': ShopifyElement<{
        'store-domain'?: string
        'public-access-token'?: string
        country?: string
        language?: string
      }>
      'shopify-context': ShopifyElement<{
        type?: string
        handle?: string
        gid?: string
        query?: string
        'wait-for-update'?: boolean | string
      }>
      'shopify-list-context': ShopifyElement<{
        type?: string
        query?: string
        first?: number | string
      }>
      'shopify-data': ShopifyElement<{ query?: string }>
      'shopify-media': ShopifyElement<{
        query?: string
        width?: number | string
        height?: number | string
        layout?: 'fixed' | 'constrained' | 'fullWidth'
        priority?: boolean | string
        'aspect-ratio'?: number | string
      }>
      'shopify-money': ShopifyElement<{
        query?: string
        format?: 'money' | 'money_without_currency' | 'money_with_currency'
      }>
      'shopify-cart': ShopifyElement<{ id?: string; target?: string }>
      'shopify-variant-selector': ShopifyElement<{ 'visible-option'?: string }>
    }
  }
}

export {}
