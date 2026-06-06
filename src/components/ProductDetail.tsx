'use client'

import { m, LazyMotion, domAnimation } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, fadeIn, staggerContainer } from '@/lib/motion'
import { openProductDetail } from '@/lib/shopify-buy'

function MicroSpec({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const labels: Record<string, string> = { tl: '50 FT / 15 M', tr: '1 GBPS', bl: '1.8 LBS', br: 'CAT6 FLAT' }
  const positions: Record<string, object> = {
    tl: { top: '12%', left: '8%' },
    tr: { top: '14%', right: '6%' },
    bl: { bottom: '16%', left: '6%' },
    br: { bottom: '12%', right: '10%' },
  }
  const delays: Record<string, number> = { tl: 0.3, tr: 0.45, bl: 0.6, br: 0.75 }

  return (
    <m.span
      variants={fadeIn}
      transition={{ delay: delays[pos] }}
      style={{
        position: 'absolute',
        ...positions[pos],
        fontSize: 10,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        fontWeight: 700,
        color: '#8A8A8A',
        padding: '6px 10px',
        background: 'rgba(255,255,255,.75)',
        border: '1px solid rgba(26,26,26,.08)',
        borderRadius: 999,
        backdropFilter: 'blur(6px)',
        animation: `floatSpec 5s ${delays[pos] + 0.5}s ease-in-out infinite`,
      }}
    >
      {labels[pos]}
    </m.span>
  )
}

const SPECS = [
  ['Speed', '1 Gbps'],
  ['Length', '50 ft / 15 m'],
  ['Weight', '1.8 lbs / 800 g'],
  ['Dimensions', '7.5 × 13 × 16.5 cm'],
  ['Connectors', 'RJ45 Male–Female'],
]

export default function ProductDetail() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={ref}
        id="product-detail"
        className="detail-section"
        style={{
          position: 'relative',
          background: '#FFFFFF',
          width: '100%',
          minHeight: '100vh',
          padding: 'clamp(80px,8vh,100px) clamp(28px,6vw,96px)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
          gap: 'clamp(32px,5vw,72px)',
          alignItems: 'center',
        }}
      >
        {/* Left — product image area */}
        <m.div
          variants={fadeIn}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'clamp(260px,45vh,620px)',
          }}
        >
          {/* Radial glow */}
          <m.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 0.55, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, ease: [0.0, 0.0, 0.2, 1] }}
            style={{
              position: 'absolute',
              width: 'min(560px,90%)',
              aspectRatio: '1/1',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 30%, #FFF9F2, #F5ECDC 55%, #E6D7BD 100%)',
            }}
          />
          <div aria-hidden="true" style={{
            position: 'absolute',
            width: 'min(500px,85%)',
            aspectRatio: '1/1',
            borderRadius: '50%',
            border: '1px dashed rgba(26,26,26,.15)',
          }} />

          {/* Arc text */}
          <svg aria-hidden="true" viewBox="0 0 500 500" style={{
            position: 'absolute',
            width: 'min(500px,85%)',
            aspectRatio: '1/1',
            overflow: 'visible',
            opacity: 0.55,
            animation: 'heroRing 30s linear infinite',
          }}>
            <defs>
              <path id="arcTop" d="M 60 250 A 190 190 0 0 1 440 250" />
            </defs>
            <text fontFamily="var(--font-bricolage)" fontSize="12" fontWeight="600" letterSpacing="4" fill="#6D6D6D">
              <textPath href="#arcTop" startOffset="8%">
                CAT6 · 1 GBPS · 50 FT · RETRACTABLE · MADE BY IT PROS
              </textPath>
            </text>
          </svg>

          {/* Anchor for PinnedProduct (desktop) */}
          <div
            data-product-anchor="detail"
            className="hidden md:block"
            style={{
              position: 'relative',
              width: 'clamp(260px,38vw,460px)',
              aspectRatio: '1/1',
              pointerEvents: 'none',
            }}
          />

          {/* Static product image (mobile) */}
          <m.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 0.84, 0.44, 1] }}
            className="md:hidden"
            style={{
              position: 'relative',
              width: 'clamp(260px,70vw,460px)',
              aspectRatio: '1/1',
              filter: 'drop-shadow(0 40px 60px rgba(60,40,20,.3)) drop-shadow(0 15px 25px rgba(60,40,20,.18))',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/product-reel.png"
              alt="Extngo 50ft retractable CAT6 cable reel"
              width="460"
              height="460"
              loading="eager"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </m.div>

          {/* Floating micro-specs */}
          <m.div
            variants={staggerContainer(0.15, 0.2)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ position: 'absolute', inset: 0 }}
          >
            <MicroSpec pos="tl" />
            <MicroSpec pos="tr" />
            <MicroSpec pos="bl" />
            <MicroSpec pos="br" />
          </m.div>
        </m.div>

        {/* Right — copy */}
        <div style={{ maxWidth: 560 }}>

          {/* Badge */}
          <m.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0,0,0.2,1] }}
            className="inline-flex items-center gap-2.5 rounded-full"
            style={{
              padding: '7px 13px', marginBottom: 20,
              background: 'rgba(232,67,26,.08)',
              border: '1px solid rgba(232,67,26,.22)',
              color: 'var(--accent)',
              fontSize: 11, fontWeight: 600,
              letterSpacing: '2px', textTransform: 'uppercase',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
            Retractable · CAT6 Flat
          </m.div>

          {/* Headline */}
          <m.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0,0,0.2,1] }}
            className="font-display"
            style={{
              margin: 0,
              fontSize: 'clamp(32px,4vw,56px)',
              lineHeight: 1.02, fontWeight: 800,
              color: 'var(--ink)', letterSpacing: '-0.035em',
            }}
          >
            More cable than you
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 400 }}>think you have.</span>
          </m.h2>

          {/* Body */}
          <m.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0,0,0.2,1] }}
            style={{ marginTop: 20, marginBottom: 0, color: '#3A3A3A', fontSize: 16, lineHeight: 1.65, maxWidth: 480 }}
          >
            EXTNGO is a flat CAT6 reel built by IT pros for the road. 50 feet of gigabit cable that tucks under carpet
            without bulging, deploys only the length you need, and rolls back to a palm-sized case when the job is done.
          </m.p>

          {/* Price + CTA */}
          <m.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0,0,0.2,1] }}
            style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 20, marginTop: 32 }}
          >
            <div>
              <div style={{ fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: '#8A8A8A', fontWeight: 600, marginBottom: 4 }}>Price</div>
              <div style={{ fontSize: 'clamp(26px,4vw,36px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                $79.<span style={{ fontSize: 'clamp(16px,2.5vw,22px)' }}>99</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <m.button
                type="button"
                onClick={() => openProductDetail('cable50ft')}
                style={{
                  background: 'var(--accent)', color: '#fff', border: 0,
                  padding: '14px 22px', borderRadius: 999, fontWeight: 600,
                  fontSize: 14, letterSpacing: '.3px', cursor: 'pointer',
                  boxShadow: '0 10px 24px rgba(232,67,26,.28)',
                  display: 'inline-flex', alignItems: 'center', textDecoration: 'none',
                }}
                whileHover={{ y: -2, boxShadow: '0 16px 32px rgba(232,67,26,.4)' }}
                whileTap={{ scale: 0.97 }}
              >
                Buy Now →
              </m.button>
              <m.a
                href="#product-differences"
                style={{
                  background: 'transparent', color: 'var(--ink)',
                  border: '1.5px solid rgba(26,26,26,.18)',
                  padding: '13px 20px', borderRadius: 999,
                  fontWeight: 600, fontSize: 14, cursor: 'pointer',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
                }}
                whileHover={{ y: -2, borderColor: 'rgba(26,26,26,.35)' }}
                whileTap={{ scale: 0.97 }}
              >
                See full specs
              </m.a>
            </div>
          </m.div>

          {/* Spec pills */}
          <m.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: [0,0,0.2,1] }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 28 }}
          >
            {SPECS.map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: 'flex', alignItems: 'baseline', gap: 8,
                  padding: '9px 14px', borderRadius: 12,
                  background: 'rgba(26,26,26,.03)',
                  border: '1px solid rgba(26,26,26,.08)',
                  fontSize: 13,
                }}
              >
                <span style={{ color: '#8A8A8A', fontSize: 10, letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>{k}</span>
                <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </m.div>

          {/* Bonus banner */}
          <m.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6, ease: [0,0,0.2,1] }}
            style={{
              display: 'flex', alignItems: 'center', gap: 14, marginTop: 24,
              padding: '14px 16px', borderRadius: 14,
              background: 'linear-gradient(180deg, rgba(232,67,26,.05), rgba(232,67,26,.02))',
              border: '1px solid rgba(232,67,26,.15)',
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: '#1A1A1A',
              flexShrink: 0, display: 'grid', placeItems: 'center',
              color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '.5px',
            }}>+1</div>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, marginBottom: 4 }}>Free in every box</div>
              <div style={{ fontSize: 14, color: 'var(--ink)', fontWeight: 500 }}>Male–Male retractable patch cable. One less thing to buy.</div>
            </div>
          </m.div>

        </div>
      </section>
    </LazyMotion>
  )
}
