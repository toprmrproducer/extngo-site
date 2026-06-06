'use client'

import { useRef } from 'react'
import { openProductDetail } from '@/lib/shopify-buy'
import Image from 'next/image'
import { m, LazyMotion, domAnimation, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

// Footer product entries open the on-page Shopify cart via the global hidden triggers,
// so they stay on the marketing site and use the storefront web components.
type LinkEntry = { label: string; href?: string; buyKey?: import('@/lib/shopify-buy').BuyKey }
const COLUMNS: { title: string; links: LinkEntry[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Extngo Orange (50ft)', buyKey: 'cable50ft' },
      { label: 'Extngo Green (33ft)', buyKey: 'cable33ft' },
      { label: 'Specs & Compare', href: '#' },
      { label: 'B2B Inquiry', href: '#' },
      { label: 'Bulk Orders', href: '#' },
    ],
  },
  {
    title: 'Use Cases',
    links: [
      { label: 'IT & Server Rooms', href: '#' },
      { label: 'Conference Rooms', href: '#' },
      { label: 'Trade Shows', href: '#' },
      { label: 'Hotels & Hospitality', href: '#' },
      { label: 'Home Office', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Reviews', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press Kit', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Warranty', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'Shipping', href: '#' },
      { label: 'Track Order', href: '#' },
    ],
  },
]

const SOCIAL = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: '#',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <LazyMotion features={domAnimation}>
      <footer
        ref={ref}
        style={{
          background: '#0F0F0F',
          color: '#FFFFFF',
          padding: 'clamp(64px,8vh,96px) clamp(28px,6vw,96px) 32px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <m.div
          variants={staggerContainer(0.08, 0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            maxWidth: 1280,
            margin: '0 auto',
          }}
        >
          {/* Top grid — brand + link columns */}
          <div
            className="footer-grid-responsive"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.6fr repeat(4, 1fr)',
              gap: 'clamp(32px,4vw,56px)',
              marginBottom: 'clamp(48px,6vh,72px)',
            }}
          >
            {/* Brand column */}
            <m.div variants={fadeUp} className="footer-brand-col">
              <div style={{ marginBottom: 18 }}>
                <Image
                  src="/logo.png"
                  alt="Extngo"
                  width={120}
                  height={38}
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 480px) 100px, 120px"
                />
              </div>
              <p style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: '#888888',
                margin: '0 0 20px',
                maxWidth: 300,
              }}>
                Retractable CAT6 cable reels for pros who can&apos;t afford downtime or trip hazards.
              </p>

              {/* Social */}
              <div style={{ display: 'flex', gap: 8 }}>
                {SOCIAL.map(s => (
                  <m.a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    whileHover={{ y: -2, background: '#FFFFFF', color: '#0F0F0F', borderColor: '#FFFFFF' }}
                    transition={{ duration: 0.2 }}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(255,255,255,0.06)',
                      color: '#CCCCCC',
                      border: '1px solid rgba(255,255,255,0.12)',
                      textDecoration: 'none',
                    }}
                  >
                    {s.icon}
                  </m.a>
                ))}
              </div>
            </m.div>

            {/* Link columns */}
            {COLUMNS.map(col => (
              <m.div key={col.title} variants={fadeUp} className="footer-link-col">
                <h4
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: '#555555',
                    margin: '0 0 18px',
                  }}
                >
                  {col.title}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.links.map(l => {
                    const sharedStyle = {
                      fontSize: 'clamp(12px,3.5vw,14px)',
                      color: '#AAAAAA',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      background: 'none',
                      border: 0,
                      padding: 0,
                      cursor: 'pointer',
                      textAlign: 'left' as const,
                      fontFamily: 'inherit',
                    }
                    return (
                      <li key={l.label}>
                        {l.buyKey ? (
                          <button
                            type="button"
                            onClick={() => openProductDetail(l.buyKey!)}
                            style={sharedStyle}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)' }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#AAAAAA' }}
                          >
                            {l.label}
                          </button>
                        ) : (
                          <a
                            href={l.href}
                            style={sharedStyle}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)' }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#AAAAAA' }}
                          >
                            {l.label}
                          </a>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </m.div>
            ))}
          </div>

          {/* Giant wordmark */}
          <m.div
            variants={fadeUp}
            aria-hidden
            style={{
              fontFamily: 'var(--font-bricolage)',
              fontSize: 'clamp(64px,16vw,220px)',
              fontWeight: 800,
              letterSpacing: '-0.05em',
              lineHeight: 0.9,
              color: '#FFFFFF',
              margin: '0 0 clamp(32px,5vh,56px)',
              textAlign: 'center',
              userSelect: 'none',
              position: 'relative',
            }}
          >
            EXT<span style={{ color: 'var(--accent)', fontStyle: 'italic', fontWeight: 400 }}>ngo</span>
          </m.div>

          {/* Bottom bar */}
          <m.div
            variants={fadeUp}
            className="footer-bottom-responsive"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
              paddingTop: 24,
              borderTop: '1px solid rgba(255,255,255,0.08)',
              flexWrap: 'wrap',
            }}
          >
            <p style={{ fontSize: 12.5, color: '#555555', margin: 0 }}>
              © {new Date().getFullYear()} Extngo, Inc. All rights reserved.
            </p>

            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {['Privacy', 'Terms', 'Cookies', 'Accessibility'].map(l => (
                <a
                  key={l}
                  href="#"
                  style={{
                    fontSize: 12.5,
                    color: '#555555',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#555555' }}
                >
                  {l}
                </a>
              ))}
            </div>

            <p style={{ fontSize: 12.5, color: '#555555', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
              Built for cable pros
            </p>
          </m.div>
        </m.div>
      </footer>
    </LazyMotion>
  )
}
