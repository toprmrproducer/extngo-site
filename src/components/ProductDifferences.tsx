'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { m, LazyMotion, domAnimation, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { openProductDetail, type BuyKey } from '@/lib/shopify-buy'

type ProductSpec = [string, string]

type Product = {
  id: string
  label: string
  badge: { bg: string; border: string; color: string; dot: string }
  card: { bg: string; border: string }
  bestFor: string
  highlight: { text: string; bg: string; border: string; color: string }
  image?: { src: string; alt: string }
  hasAnchor?: true
  floatAnim: string
  shadow: string
  specs: ProductSpec[]
  price: string
  buyKey?: BuyKey
  comingSoon?: true
  pageHref?: string
  accentRgb: string
  accentColor: string
  popular?: true
}

const PRODUCTS: Product[] = [
  {
    id: 'blue',
    label: 'BUILT FOR USB-C DEVICES',
    badge: { bg: 'rgba(33,150,243,0.10)', border: 'rgba(33,150,243,0.28)', color: '#1565C0', dot: '#2196F3' },
    card: { bg: 'linear-gradient(160deg,rgba(33,150,243,0.05) 0%,rgba(33,150,243,0.01) 100%)', border: 'rgba(33,150,243,0.16)' },
    bestFor: 'USB-C devices, events, offices & field setups',
    highlight: { text: 'Tough-Flat™ — Survives Foot & Vehicle Traffic', bg: 'rgba(33,150,243,0.08)', border: 'rgba(33,150,243,0.18)', color: '#1565C0' },
    image: { src: '/product-blue.png', alt: 'Extngo Blue retractable USB-C to Ethernet reel' },
    floatAnim: 'heroFloat 8s 1.0s ease-in-out infinite',
    shadow: 'drop-shadow(0 40px 60px rgba(20,60,120,0.28)) drop-shadow(0 15px 25px rgba(20,60,120,0.18))',
    specs: [
      ['Interface', 'USB-C to RJ45'],
      ['Speed', '1 Gbps'],
      ['Length', '15 Metres (49.2 ft)'],
      ['Weight', '1.8 lbs / 0.8 kg'],
      ['Dimensions', '3 × 5.1 × 6.5 in'],
      ['Cascadable', 'Up to 100ft'],
      ['Design', 'Retractable Reel'],
      ['Drivers', 'Plug & Play'],
    ],
    price: '$70.02',
    comingSoon: true as const,
    pageHref: '/products/blue',
    accentRgb: '33,150,243',
    accentColor: '#2196F3',
  },
  {
    id: 'orange',
    label: 'EXTNGO Orange',
    badge: { bg: 'rgba(232,67,26,0.08)', border: 'rgba(232,67,26,0.22)', color: '#C84316', dot: '#E8431A' },
    card: { bg: 'linear-gradient(160deg,rgba(232,67,26,0.07) 0%,rgba(232,67,26,0.02) 100%)', border: 'rgba(232,67,26,0.24)' },
    bestFor: 'Large rooms, conference setups & IT fieldwork',
    highlight: { text: '50ft Reach — Cascadable to 100ft', bg: 'rgba(232,67,26,0.08)', border: 'rgba(232,67,26,0.18)', color: '#C84316' },
    hasAnchor: true,
    floatAnim: 'heroFloat 8s 2.0s ease-in-out infinite',
    shadow: 'drop-shadow(0 40px 60px rgba(120,40,20,0.30)) drop-shadow(0 15px 25px rgba(120,40,20,0.20))',
    specs: [
      ['Interface', 'RJ45 to RJ45'],
      ['Speed', '1 Gbps'],
      ['Length', '50 Feet (15 Meter)'],
      ['Weight', '1.8 lbs / 0.8 kg'],
      ['Dimensions', '3 × 5.1 × 6.5 in'],
      ['Cascadable', 'Up to 100ft'],
      ['Design', 'Retractable Reel'],
      ['Drivers', 'Plug & Play'],
    ],
    price: '$79.99',
    buyKey: 'cable50ft' as const,
    accentRgb: '232,67,26',
    accentColor: '#E8431A',
    popular: true,
  },
  {
    id: 'green',
    label: 'EXTNGO Green',
    badge: { bg: 'rgba(76,175,80,0.12)', border: 'rgba(76,175,80,0.25)', color: '#2E7D32', dot: '#4CAF50' },
    card: { bg: 'linear-gradient(160deg,rgba(76,175,80,0.05) 0%,rgba(76,175,80,0.01) 100%)', border: 'rgba(76,175,80,0.18)' },
    bestFor: 'Home office & everyday travel',
    highlight: { text: 'Lightest Model — $10 Less Than Orange', bg: 'rgba(76,175,80,0.08)', border: 'rgba(76,175,80,0.18)', color: '#2E7D32' },
    image: { src: '/product-green.png', alt: 'Extngo Green 33ft retractable CAT6 cable reel' },
    floatAnim: 'heroFloat 8s 1.4s ease-in-out infinite',
    shadow: 'drop-shadow(0 40px 60px rgba(40,80,40,0.28)) drop-shadow(0 15px 25px rgba(40,80,40,0.18))',
    specs: [
      ['Interface', 'RJ45 to RJ45'],
      ['Speed', '1 Gbps'],
      ['Length', '33 Feet (10 Meter)'],
      ['Weight', '1.6 lbs / 0.7 kg'],
      ['Dimensions', '3 × 5.1 × 6.5 in'],
      ['Cascadable', 'Up to 100ft'],
      ['Design', 'Retractable Reel'],
      ['Drivers', 'Plug & Play'],
    ],
    price: '$69.99',
    buyKey: 'cable33ft' as const,
    accentRgb: '76,175,80',
    accentColor: '#4CAF50',
  },
]

export default function ProductDifferences() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={ref}
        id="product-differences"
        style={{
          position: 'relative',
          background: 'var(--bg)',
          width: '100%',
          padding: 'clamp(72px,10vh,120px) clamp(20px,4vw,60px) clamp(80px,12vh,140px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Section header */}
        <m.div
          style={{ textAlign: 'center', marginBottom: 'clamp(48px,7vh,80px)' }}
          variants={staggerContainer(0.12, 0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <m.h2
            variants={fadeUp}
            className="font-display"
            style={{
              margin: 0,
              fontSize: 'clamp(36px,5vw,64px)',
              lineHeight: 1.02,
              fontWeight: 800,
              color: 'var(--ink)',
              letterSpacing: '-0.035em',
            }}
          >
            Product <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Differences</span>
          </m.h2>
          <m.p
            variants={fadeUp}
            style={{ margin: '16px auto 0', color: '#3A3A3A', fontSize: 17, lineHeight: 1.55, maxWidth: 520 }}
          >
            Each model is built for a different setup. Find yours below.
          </m.p>
        </m.div>

        {/* Product cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 360px))',
            justifyContent: 'center',
            gap: 'clamp(16px,2.5vw,28px)',
            width: '100%',
            maxWidth: 1200,
            alignItems: 'start',
          }}
        >
          {PRODUCTS.map((product, i) => (
            <m.div
              key={product.id}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ delay: 0.1 + i * 0.1 }}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: product.popular ? '36px 24px 32px' : '28px 24px 32px',
                borderRadius: 24,
                background: product.card.bg,
                border: `1px solid ${product.card.border}`,
                boxShadow: product.popular
                  ? `0 0 0 2px rgba(${product.accentRgb},0.22), 0 24px 64px rgba(${product.accentRgb},0.10), 0 4px 16px rgba(0,0,0,0.04)`
                  : '0 4px 20px rgba(0,0,0,0.04)',
              }}
            >
              {/* Most Popular ribbon */}
              {product.popular && (
                <div style={{
                  position: 'absolute', top: -15, left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '4px 16px',
                  borderRadius: 999,
                  background: `rgba(${product.accentRgb},1)`,
                  color: '#fff',
                  fontSize: 10, fontWeight: 800,
                  letterSpacing: '1.8px', textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  boxShadow: `0 4px 12px rgba(${product.accentRgb},0.35)`,
                }}>
                  Most Popular
                </div>
              )}

              {/* Product name badge */}
              {product.pageHref ? (
                <Link
                  href={product.pageHref}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '6px 12px', borderRadius: 999,
                    background: product.badge.bg,
                    border: `1px solid ${product.badge.border}`,
                    color: product.badge.color,
                    fontSize: 10, fontWeight: 700,
                    letterSpacing: '1.8px', textTransform: 'uppercase',
                    textDecoration: 'none', marginBottom: 10,
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: product.badge.dot, flexShrink: 0 }} />
                  {product.label}
                </Link>
              ) : (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '6px 12px', borderRadius: 999,
                  background: product.badge.bg,
                  border: `1px solid ${product.badge.border}`,
                  color: product.badge.color,
                  fontSize: 10, fontWeight: 700,
                  letterSpacing: '1.8px', textTransform: 'uppercase',
                  marginBottom: 10,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: product.badge.dot, flexShrink: 0 }} />
                  {product.label}
                </div>
              )}

              {/* Best for */}
              <p style={{ margin: '0 0 10px', fontSize: 13, color: '#5A5A5A', lineHeight: 1.5, textAlign: 'center' }}>
                <span style={{ fontWeight: 700, color: '#1A1A1A' }}>Best for:</span>{' '}{product.bestFor}
              </p>

              {/* Feature highlight tag */}
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                marginBottom: 20,
                padding: '4px 10px', borderRadius: 6,
                background: product.highlight.bg,
                border: `1px solid ${product.highlight.border}`,
                fontSize: 10, fontWeight: 700,
                color: product.highlight.color, letterSpacing: '0.3px',
                textAlign: 'center',
              }}>
                {product.highlight.text}
              </span>

              {/* Product image */}
              <div style={{
                position: 'relative',
                width: '100%', aspectRatio: '1/1',
                maxWidth: 260,
                marginBottom: 20,
                overflow: 'visible',
              }}>
                {product.hasAnchor ? (
                  <>
                    {/* Desktop: anchor for floating product */}
                    <div className="hidden md:block">
                      <div style={{
                        position: 'absolute', inset: 0, borderRadius: 16,
                        background: `rgba(${product.accentRgb},0.04)`,
                        border: `1.5px dashed rgba(${product.accentRgb},0.18)`,
                      }} />
                      <div data-product-anchor="orange" style={{ position: 'absolute', inset: 0 }} />
                    </div>
                    {/* Mobile: static image */}
                    <div className="md:hidden" style={{
                      position: 'relative', width: '100%', height: '100%',
                      animation: product.floatAnim,
                      filter: product.shadow,
                      willChange: 'transform',
                    }}>
                      <Image
                        src="/product-reel.png"
                        alt="Extngo 50ft retractable CAT6 cable reel"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  </>
                ) : (
                  <div style={{
                    position: 'relative', width: '100%', height: '100%',
                    animation: product.floatAnim,
                    filter: product.shadow,
                    willChange: 'transform',
                  }}>
                    <Image
                      src={product.image!.src}
                      alt={product.image!.alt}
                      fill
                      sizes="(max-width: 768px) 260px, 260px"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                )}
              </div>

              {/* Spec rows */}
              <div style={{ width: '100%', marginBottom: 24 }}>
                {product.specs.map(([label, value], j) => (
                  <div
                    key={j}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '8px 0',
                      borderBottom: j < product.specs.length - 1
                        ? `1px solid rgba(${product.accentRgb},0.10)`
                        : 'none',
                    }}
                  >
                    <span style={{
                      fontSize: 10, fontWeight: 600, color: '#8A8A8A',
                      letterSpacing: '0.6px', textTransform: 'uppercase',
                    }}>
                      {label}
                    </span>
                    <span style={{
                      fontSize: 13, fontWeight: 700, color: '#1A1A1A',
                      textAlign: 'right',
                    }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price + CTA */}
              <div style={{ textAlign: 'center', marginTop: 'auto', width: '100%' }}>
                <div style={{ marginBottom: 12 }}>
                  <span style={{ fontSize: 24, fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.5px' }}>
                    {product.price}
                  </span>
                  {!product.comingSoon && (
                    <span style={{ fontSize: 12, color: '#8A8A8A', marginLeft: 6, fontWeight: 500 }}>on Shopify</span>
                  )}
                </div>
                {product.comingSoon ? (
                  <button
                    type="button"
                    disabled
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 7,
                      padding: '10px 20px', borderRadius: 999,
                      background: `rgba(${product.accentRgb},0.06)`,
                      border: `1px dashed rgba(${product.accentRgb},0.35)`,
                      color: product.badge.color,
                      fontSize: 13, fontWeight: 600,
                      cursor: 'not-allowed',
                      letterSpacing: '0.3px',
                      opacity: 0.85,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    Out of Stock
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => product.buyKey && openProductDetail(product.buyKey)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 7,
                      padding: '10px 20px', borderRadius: 999,
                      background: `rgba(${product.accentRgb},0.06)`,
                      border: `1px solid rgba(${product.accentRgb},0.2)`,
                      color: product.badge.color,
                      fontSize: 13, fontWeight: 600,
                      cursor: 'pointer',
                      letterSpacing: '0.3px',
                      transition: 'background 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.background = `rgba(${product.accentRgb},0.13)`
                      el.style.borderColor = `rgba(${product.accentRgb},0.42)`
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.background = `rgba(${product.accentRgb},0.06)`
                      el.style.borderColor = `rgba(${product.accentRgb},0.2)`
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                      <path d="M3 6h18" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    Buy Now
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7" /><path d="M7 7h10v10" />
                    </svg>
                  </button>
                )}
              </div>
            </m.div>
          ))}
        </div>
      </section>
    </LazyMotion>
  )
}
