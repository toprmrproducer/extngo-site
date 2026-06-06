'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { m, LazyMotion, domAnimation, useInView } from 'framer-motion'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

// Blue Edition is not on Shopify yet. CTAs render as disabled Out of Stock buttons until the SKU goes live.
const LAUNCH_DATE = new Date('2026-04-26T00:00:00')

// ── Countdown ────────────────────────────────────────────────────────────────
function useCountdown(target: Date) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    const calc = () => {
      const diff = Math.max(0, target.getTime() - Date.now())
      setT({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [target])
  return t
}

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ textAlign: 'center', minWidth: 64 }}>
      <div style={{
        fontFamily: 'var(--font-bricolage)',
        fontSize: 'clamp(28px,4vw,52px)',
        fontWeight: 800,
        color: '#fff',
        lineHeight: 1,
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 12,
        padding: '12px 18px',
        minWidth: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {String(value).padStart(2, '0')}
      </div>
      <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '1.8px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '8px 0 0' }}>{label}</p>
    </div>
  )
}

// ── Section fade-in ───────────────────────────────────────────────────────────
function FadeSection({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
      style={style}
    >
      {children}
    </m.div>
  )
}

// ── Shared label ─────────────────────────────────────────────────────────────
function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 7,
      padding: '6px 13px', borderRadius: 999, marginBottom: 16,
      background: light ? 'rgba(255,255,255,0.1)' : 'rgba(33,150,243,0.10)',
      border: `1px solid ${light ? 'rgba(255,255,255,0.2)' : 'rgba(33,150,243,0.28)'}`,
      color: light ? 'rgba(255,255,255,0.85)' : '#1565C0',
      fontSize: 10.5, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: light ? '#fff' : '#2196F3', flexShrink: 0 }} />
      {children}
    </div>
  )
}

// ── Problem card ─────────────────────────────────────────────────────────────
function ProblemCard({ title, body }: { title: string; body: string }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid rgba(26,26,26,0.07)',
      borderRadius: 16,
      padding: '24px 22px',
      boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(232,67,26,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8431A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', margin: 0 }}>{title}</h3>
      <p style={{ fontSize: 13.5, lineHeight: 1.6, color: '#5A5A5A', margin: 0 }}>{body}</p>
    </div>
  )
}

// ── Solution card ─────────────────────────────────────────────────────────────
function SolutionCard({ title, body }: { title: string; body: string }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 16,
      padding: '24px 22px',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(33,150,243,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: 0 }}>{title}</h3>
      <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', margin: 0 }}>{body}</p>
    </div>
  )
}

// ── Benefit card ─────────────────────────────────────────────────────────────
function BenefitCard({ title, body }: { title: string; body: string }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid rgba(26,26,26,0.06)',
      borderRadius: 16,
      padding: '26px 22px',
      boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(33,150,243,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', margin: 0 }}>{title}</h3>
      <p style={{ fontSize: 13.5, lineHeight: 1.6, color: '#5A5A5A', margin: 0 }}>{body}</p>
    </div>
  )
}

// ── Who card ──────────────────────────────────────────────────────────────────
function WhoCard({ title, body }: { title: string; body: string }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 14,
      padding: '20px 18px',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <h4 style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: 0 }}>{title}</h4>
      <p style={{ fontSize: 13, lineHeight: 1.55, color: 'rgba(255,255,255,0.55)', margin: 0 }}>{body}</p>
    </div>
  )
}

const sectionPad: React.CSSProperties = {
  padding: 'clamp(72px,10vh,120px) clamp(24px,6vw,96px)',
}

export default function BluePage() {
  const countdown = useCountdown(LAUNCH_DATE)
  const launched = LAUNCH_DATE.getTime() <= Date.now()

  const productStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'EXTNGO USB-C to Ethernet Retractable Cable',
    description: 'Go beyond USB-C limits. Get real wired connectivity — 15 metres of gigabit ethernet in a flat retractable reel. Built-in adapter, plug and play.',
    image: 'https://extngo-eight.vercel.app/product-blue.png',
    brand: {
      '@type': 'Brand',
      name: 'Extngo',
    },
    offers: {
      '@type': 'Offer',
      url: '/shop',
      priceCurrency: 'USD',
      availability: launched ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
      seller: {
        '@type': 'Organization',
        name: 'EXTNGO',
      },
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Cable Length',
        value: '15 Metres',
      },
      {
        '@type': 'PropertyValue',
        name: 'Interface',
        value: 'USB-C to Ethernet (RJ45)',
      },
      {
        '@type': 'PropertyValue',
        name: 'Speed',
        value: 'Gigabit Ethernet (1000 Mbps)',
      },
    ],
  }

  return (
    <LazyMotion features={domAnimation}>
      <Script
        id="product-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }}
      />
      <div style={{ fontFamily: 'var(--font-geist)', color: '#1A1A1A' }}>
        <NavBar />

        {/* ── HERO ── */}
        <section style={{
          background: 'linear-gradient(135deg, #0A0F1E 0%, #0D1B3E 50%, #0A1628 100%)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(100px,14vh,140px) clamp(24px,6vw,96px) clamp(72px,10vh,100px)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}>
          {/* Blue glow */}
          <div aria-hidden style={{
            position: 'absolute', top: '30%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 700, height: 700,
            background: 'radial-gradient(circle, rgba(33,150,243,0.22) 0%, transparent 70%)',
            pointerEvents: 'none', filter: 'blur(40px)',
          }} />

          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] }}
            style={{ maxWidth: 780, position: 'relative', zIndex: 1 }}
          >
            <Label light>USB-C to Ethernet · 15 Meter Retractable</Label>

            <h1 style={{
              fontFamily: 'var(--font-bricolage)',
              fontSize: 'clamp(36px,5.5vw,76px)',
              fontWeight: 800, lineHeight: 1.04,
              letterSpacing: '-0.04em',
              color: '#fff', margin: '0 0 20px',
            }}>
              EXTNGO{' '}
              <span style={{ color: '#2196F3', fontStyle: 'italic', fontWeight: 400 }}>USB-C</span>
              {' '}to Ethernet
            </h1>

            <p style={{
              fontSize: 'clamp(15px,1.2vw,18px)',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.65)',
              maxWidth: 540, margin: '0 auto 36px',
            }}>
              Go beyond USB-C limits. Get real wired connectivity — 15 metres of gigabit ethernet in a flat retractable reel.
            </p>

            {/* Countdown */}
            {!launched && (
              <div style={{ marginBottom: 36 }}>
                <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
                  Launching April 26, 2026
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <CountdownBlock value={countdown.days}    label="Days" />
                  <CountdownBlock value={countdown.hours}   label="Hours" />
                  <CountdownBlock value={countdown.minutes} label="Minutes" />
                  <CountdownBlock value={countdown.seconds} label="Seconds" />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                disabled
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  padding: '14px 28px', borderRadius: 999,
                  background: 'rgba(33,150,243,0.18)',
                  color: '#fff',
                  border: '1px dashed rgba(33,150,243,0.55)',
                  fontWeight: 700, fontSize: 15, cursor: 'not-allowed',
                  fontFamily: 'inherit',
                  opacity: 0.95,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                Out of Stock
              </button>
              <Link
                href="/"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  padding: '13px 26px', borderRadius: 999,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  color: '#fff', fontWeight: 600, fontSize: 15,
                  textDecoration: 'none',
                }}
              >
                ← Back to Home
              </Link>
            </div>

            <p style={{ marginTop: 24, fontSize: 12.5, color: 'rgba(255,255,255,0.35)' }}>
              Join 2,000+ others waiting for launch. No spam, ever.
            </p>
          </m.div>

          {/* Product image */}
          <m.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0, 0, 0.2, 1] }}
            style={{
              position: 'relative',
              width: 'clamp(220px,30vw,360px)',
              aspectRatio: '1/1',
              marginTop: 40,
              filter: 'drop-shadow(0 40px 80px rgba(33,150,243,0.35))',
              animation: 'heroFloat 8s ease-in-out infinite',
            }}
          >
            <Image src="/product-blue.png" alt="EXTNGO USB-C to Ethernet retractable cable" fill style={{ objectFit: 'contain' }} />
          </m.div>
        </section>

        {/* ── THE USB-C PROBLEM ── */}
        <section style={{ ...sectionPad, background: '#F8F9FA' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <FadeSection style={{ textAlign: 'center', marginBottom: 56 }}>
              <Label>The Problem</Label>
              <h2 style={{
                fontFamily: 'var(--font-bricolage)',
                fontSize: 'clamp(28px,3.5vw,52px)',
                fontWeight: 800, letterSpacing: '-0.035em',
                lineHeight: 1.05, margin: '0 0 14px',
              }}>
                The USB-C <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Problem</span>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: '#5A5A5A', maxWidth: 520, margin: '0 auto' }}>
                Modern devices come with USB-C, but that doesn&apos;t mean they&apos;re ready for professional networking needs.
              </p>
            </FadeSection>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: 16,
            }}>
              {[
                { title: 'No Native Ethernet', body: "USB-C ports don't have built-in ethernet connectivity, forcing you to rely on unreliable wireless connections." },
                { title: 'Limited Reach', body: 'Standard USB-C cables max out at a few metres, leaving you tethered to your desk without freedom of movement.' },
                { title: 'Requires Multiple Adapters', body: 'Need separate adapters, dongles, and extension cables that create a messy, unreliable setup prone to failure.' },
                { title: 'Compatibility Issues', body: "Different adapters and cables often don't work together, creating frustration and wasted money on incompatible gear." },
              ].map(p => (
                <FadeSection key={p.title}>
                  <ProblemCard {...p} />
                </FadeSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── THE EXTNGO SOLUTION ── */}
        <section style={{ ...sectionPad, background: '#0D1B3E' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <FadeSection style={{ textAlign: 'center', marginBottom: 56 }}>
              <Label light>The Solution</Label>
              <h2 style={{
                fontFamily: 'var(--font-bricolage)',
                fontSize: 'clamp(28px,3.5vw,52px)',
                fontWeight: 800, letterSpacing: '-0.035em',
                lineHeight: 1.05, color: '#fff', margin: '0 0 14px',
              }}>
                The EXTNGO <span style={{ color: '#2196F3', fontStyle: 'italic', fontWeight: 400 }}>Solution</span>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', maxWidth: 520, margin: '0 auto' }}>
                A revolutionary all-in-one cable that solves every USB-C networking challenge.
              </p>
            </FadeSection>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: 16,
            }}>
              {[
                { title: 'Integrated Design', body: 'Built-in USB-C to Ethernet adapter eliminates the need for separate dongles or converters.' },
                { title: 'No Adapters Needed', body: 'Plug and play directly from your USB-C device to ethernet — no extra hardware required.' },
                { title: 'Retractable Design', body: '15-metre cable retracts smoothly into the compact reel for tangle-free storage and transport.' },
                { title: 'Professional Grade', body: 'Built with premium materials for reliable performance in demanding professional environments.' },
                { title: 'All-in-One Solution', body: 'Everything you need in one elegant package — no more hunting for compatible adapters.' },
              ].map(s => (
                <FadeSection key={s.title}>
                  <SolutionCard {...s} />
                </FadeSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE ── */}
        <section style={{ ...sectionPad, background: '#fff' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <FadeSection style={{ textAlign: 'center', marginBottom: 56 }}>
              <Label>Why EXTNGO</Label>
              <h2 style={{
                fontFamily: 'var(--font-bricolage)',
                fontSize: 'clamp(28px,3.5vw,52px)',
                fontWeight: 800, letterSpacing: '-0.035em',
                lineHeight: 1.05, margin: '0 0 14px',
              }}>
                Why Choose <span style={{ fontStyle: 'italic', fontWeight: 400 }}>EXTNGO?</span>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: '#5A5A5A', maxWidth: 520, margin: '0 auto' }}>
                Five game-changing benefits that make EXTNGO the ultimate networking solution for modern professionals.
              </p>
            </FadeSection>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16,
            }}>
              {[
                { title: '15-Metre Reach', body: 'Work from anywhere in your space. No more being stuck next to your router.' },
                { title: 'Integrated USB-C to Ethernet', body: 'Built-in adapter means no hunting for dongles or separate converters. Pure plug-and-play.' },
                { title: 'All-in-One Design', body: 'Everything you need in one elegant package. One purchase, one solution, zero hassle.' },
                { title: 'Flat Cable Profile', body: 'Sleek flat design prevents tangling and sits flush under doors or carpets.' },
                { title: 'Retractable & Easy Storage', body: 'Spring-loaded reel mechanism keeps your cable organized and protected. Perfect for travel.' },
              ].map(b => (
                <FadeSection key={b.title}>
                  <BenefitCard {...b} />
                </FadeSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section style={{ ...sectionPad, background: '#F8F9FA' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <FadeSection style={{ textAlign: 'center', marginBottom: 48 }}>
              <Label>Comparison</Label>
              <h2 style={{
                fontFamily: 'var(--font-bricolage)',
                fontSize: 'clamp(28px,3.5vw,52px)',
                fontWeight: 800, letterSpacing: '-0.035em',
                lineHeight: 1.05, margin: '0 0 14px',
              }}>
                EXTNGO vs.{' '}
                <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Standard USB-C Cable</span>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: '#5A5A5A', maxWidth: 460, margin: '0 auto' }}>
                See how EXTNGO outperforms traditional passive cables in every category.
              </p>
            </FadeSection>

            <FadeSection>
              <div style={{
                background: '#fff',
                borderRadius: 20,
                overflow: 'hidden',
                border: '1px solid rgba(26,26,26,0.08)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              }}>
                {[
                  { feature: 'Maximum Length',    extngo: '15 Metres',       other: '2–3 Metres' },
                  { feature: 'Ethernet Connection', extngo: '✓ Built-in',    other: '✗ Not included' },
                  { feature: 'Components',         extngo: 'All-in-One',     other: 'Cable + Adapters' },
                  { feature: 'Floor Use',          extngo: 'Flat, Safe Profile', other: 'Round, Trip Hazard' },
                  { feature: 'Storage',            extngo: 'Retractable Reel', other: 'Manual Coiling' },
                  { feature: 'Setup Time',         extngo: 'Plug & Play',    other: 'Multiple Steps' },
                ].map((row, i) => (
                  <div
                    key={row.feature}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr',
                      borderBottom: i < 5 ? '1px solid rgba(26,26,26,0.06)' : 'none',
                      background: i === 0 ? '#0D1B3E' : i % 2 === 0 ? '#FAFAFA' : '#fff',
                    }}
                  >
                    <div style={{
                      padding: '16px 20px',
                      fontSize: i === 0 ? 11 : 14,
                      fontWeight: i === 0 ? 700 : 500,
                      color: i === 0 ? 'rgba(255,255,255,0.6)' : '#5A5A5A',
                      letterSpacing: i === 0 ? '1.4px' : 0,
                      textTransform: i === 0 ? 'uppercase' : 'none',
                    }}>
                      {i === 0 ? 'Feature' : row.feature}
                    </div>
                    <div style={{
                      padding: '16px 20px',
                      fontSize: i === 0 ? 11 : 14,
                      fontWeight: i === 0 ? 700 : 600,
                      color: i === 0 ? '#2196F3' : '#1565C0',
                      letterSpacing: i === 0 ? '1.4px' : 0,
                      textTransform: i === 0 ? 'uppercase' : 'none',
                      borderLeft: `2px solid ${i === 0 ? 'rgba(33,150,243,0.3)' : 'rgba(33,150,243,0.15)'}`,
                      background: i === 0 ? 'rgba(33,150,243,0.08)' : 'rgba(33,150,243,0.03)',
                    }}>
                      {i === 0 ? 'EXTNGO' : row.extngo}
                    </div>
                    <div style={{
                      padding: '16px 20px',
                      fontSize: i === 0 ? 11 : 14,
                      fontWeight: i === 0 ? 700 : 400,
                      color: i === 0 ? 'rgba(255,255,255,0.6)' : '#9A9A9A',
                      letterSpacing: i === 0 ? '1.4px' : 0,
                      textTransform: i === 0 ? 'uppercase' : 'none',
                    }}>
                      {i === 0 ? 'Passive USB-C Cable' : row.other}
                    </div>
                  </div>
                ))}
              </div>
            </FadeSection>
          </div>
        </section>

        {/* ── WHO IT'S FOR ── */}
        <section style={{ ...sectionPad, background: '#0A0F1E' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <FadeSection style={{ textAlign: 'center', marginBottom: 56 }}>
              <Label light>Who It&apos;s For</Label>
              <h2 style={{
                fontFamily: 'var(--font-bricolage)',
                fontSize: 'clamp(28px,3.5vw,52px)',
                fontWeight: 800, letterSpacing: '-0.035em',
                lineHeight: 1.05, color: '#fff', margin: '0 0 14px',
              }}>
                Designed for <span style={{ color: '#2196F3', fontStyle: 'italic', fontWeight: 400 }}>Everyone</span>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(255,255,255,0.55)', maxWidth: 480, margin: '0 auto' }}>
                EXTNGO is designed for anyone who demands reliable wired connectivity without limitations.
              </p>
            </FadeSection>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 14,
            }}>
              {[
                { title: 'Remote Workers',      body: 'Reliable wired connection for video calls and file transfers from anywhere in your home office.' },
                { title: 'Gamers',              body: 'Low latency wired ethernet for competitive gaming without Wi-Fi interference or lag spikes.' },
                { title: 'Content Creators',    body: 'Fast, stable uploads for large video files and live streaming without buffering or dropouts.' },
                { title: 'IT Professionals',    body: 'Professional-grade networking tool for field work, installations, and troubleshooting.' },
                { title: 'Travelers',           body: 'Compact retractable design perfect for hotel rooms and temporary workspaces on the go.' },
                { title: 'Office Workers',      body: 'Extend your workstation reach without messy cables or unreliable wireless connections.' },
                { title: 'Event Planners',      body: 'Quick setup for presentations, booths, and temporary networking needs at any venue.' },
                { title: 'Smart Home Enthusiasts', body: 'Connect devices throughout your home with long-reach ethernet for stable smart home networks.' },
              ].map(w => (
                <FadeSection key={w.title}>
                  <WhoCard {...w} />
                </FadeSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── BUILT FOR REAL-WORLD USE ── */}
        <section style={{ ...sectionPad, background: '#fff' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <FadeSection style={{ textAlign: 'center', marginBottom: 56 }}>
              <Label>Durability</Label>
              <h2 style={{
                fontFamily: 'var(--font-bricolage)',
                fontSize: 'clamp(28px,3.5vw,52px)',
                fontWeight: 800, letterSpacing: '-0.035em',
                lineHeight: 1.05, margin: '0 0 14px',
              }}>
                Built for <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Real-World Use</span>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: '#5A5A5A', maxWidth: 480, margin: '0 auto' }}>
                Engineered to withstand the demands of professional environments and daily use.
              </p>
            </FadeSection>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              {[
                { title: 'Built to Last', body: 'Premium materials and reinforced connectors ensure years of reliable daily use. The retractable mechanism is rated for thousands of extend-retract cycles.' },
                { title: 'Practical Applications', body: 'Perfect for home offices, conference rooms, hotel stays, or any situation where you need reliable wired connectivity beyond standard cable reach.' },
                { title: 'Professional Reliability', body: 'Gigabit ethernet speeds with stable connections for mission-critical work. No more worrying about Wi-Fi dropouts during important calls or transfers.' },
                { title: 'Professional-Grade Construction', body: 'Flat cable design resists tangling and damage. Durable housing protects internal components. Built to professional standards.' },
              ].map(b => (
                <FadeSection key={b.title}>
                  <BenefitCard {...b} />
                </FadeSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── TECHNICAL SPECS ── */}
        <section style={{ ...sectionPad, background: '#F8F9FA' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <FadeSection style={{ textAlign: 'center', marginBottom: 48 }}>
              <Label>Specifications</Label>
              <h2 style={{
                fontFamily: 'var(--font-bricolage)',
                fontSize: 'clamp(28px,3.5vw,52px)',
                fontWeight: 800, letterSpacing: '-0.035em',
                lineHeight: 1.05, margin: '0 0 14px',
              }}>
                Technical <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Snapshot</span>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: '#5A5A5A', maxWidth: 420, margin: '0 auto' }}>
                Everything you need to know about EXTNGO&apos;s technical specifications.
              </p>
            </FadeSection>

            <FadeSection>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 2,
                background: 'rgba(26,26,26,0.07)',
                borderRadius: 20,
                overflow: 'hidden',
              }}>
                {[
                  { label: 'Interface',        value: 'USB-C to Ethernet (RJ45)' },
                  { label: 'Cable Length',     value: '15 Metres (49.2 feet)' },
                  { label: 'Cable Type',       value: 'Flat, Retractable' },
                  { label: 'Speed',            value: 'Gigabit Ethernet (1000 Mbps)' },
                  { label: 'Design',           value: 'Integrated Adapter' },
                  { label: 'Use Case',         value: 'Professional / Remote Work' },
                  { label: 'Drivers Required', value: 'None — Plug & Play' },
                ].map(s => (
                  <div key={s.label} style={{
                    background: '#fff',
                    padding: '22px 20px',
                    display: 'flex', flexDirection: 'column', gap: 6,
                  }}>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.6px', textTransform: 'uppercase', color: '#9A9A9A' }}>{s.label}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.3 }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </FadeSection>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section style={{
          ...sectionPad,
          background: 'linear-gradient(135deg, #0A0F1E 0%, #0D1B3E 100%)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div aria-hidden style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 600, height: 600,
            background: 'radial-gradient(circle, rgba(33,150,243,0.2) 0%, transparent 70%)',
            pointerEvents: 'none', filter: 'blur(40px)',
          }} />

          <FadeSection style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <Label light>Available Now</Label>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-bricolage)',
              fontSize: 'clamp(32px,4.5vw,64px)',
              fontWeight: 800, letterSpacing: '-0.04em',
              lineHeight: 1.04, color: '#fff', margin: '0 0 16px',
            }}>
              One Reel. One Cable.{' '}
              <span style={{ color: '#2196F3', fontStyle: 'italic', fontWeight: 400 }}>No Limits.</span>
            </h2>

            <p style={{ fontSize: 16, lineHeight: 1.65, color: 'rgba(255,255,255,0.6)', maxWidth: 500, margin: '0 auto 36px' }}>
              Transform your USB-C device into a professional networking powerhouse. 15 metres of freedom, integrated ethernet, retractable design.
            </p>

            {/* Stats row */}
            <div style={{
              display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap',
              marginBottom: 40,
              paddingBottom: 36,
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              {[
                { value: '15m', label: 'Maximum Reach' },
                { value: '1 Gbps', label: 'Ethernet Speed' },
                { value: '0', label: 'Adapters Needed' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-bricolage)', fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 800, color: '#2196F3', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <button
              type="button"
              disabled
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                padding: '16px 34px', borderRadius: 999,
                background: 'rgba(33,150,243,0.18)',
                color: '#fff',
                border: '1px dashed rgba(33,150,243,0.55)',
                fontWeight: 700, fontSize: 16, cursor: 'not-allowed',
                fontFamily: 'inherit',
                opacity: 0.95,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              Out of Stock
            </button>

            <p style={{ marginTop: 16, fontSize: 12.5, color: 'rgba(255,255,255,0.3)' }}>
              Drop by /shop for the 50ft and 33ft cables available today.
            </p>
          </FadeSection>
        </section>

        <Footer />
      </div>
    </LazyMotion>
  )
}
