'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { m, LazyMotion, domAnimation, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'
import B2BContactModal from './B2BContactModal'
import { openProductDetail } from '@/lib/shopify-buy'

const STATS = [
  { value: '2,400+', label: 'Happy Pros' },
  { value: '4.8★',   label: 'Average Rating' },
  { value: '30-day', label: 'Return Policy' },
]

export default function Cta() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={ref}
        id="contact"
        style={{
          position: 'relative',
          background: '#0F0F0F',
          color: '#fff',
          padding: 'clamp(72px,10vh,120px) clamp(28px,6vw,96px)',
          overflow: 'hidden',
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        {/* Accent glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '50%',
            right: '-8%',
            transform: 'translateY(-50%)',
            width: 640,
            height: 640,
            background: 'radial-gradient(circle, rgba(232,67,26,0.28) 0%, rgba(232,67,26,0) 70%)',
            pointerEvents: 'none',
            filter: 'blur(40px)',
            zIndex: 0,
          }}
        />

        {/* Dot grid */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Content grid */}
        <div
          className="cta-grid-responsive"
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 'clamp(40px,6vw,80px)',
            alignItems: 'center',
            maxWidth: 1280,
            margin: '0 auto',
            zIndex: 1,
          }}
        >
          {/* Copy */}
          <m.div
            variants={staggerContainer(0.12, 0)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <m.div
              variants={fadeUp}
              className="inline-flex items-center gap-2.5 rounded-full"
              style={{
                padding: '7px 13px',
                marginBottom: 22,
                background: 'rgba(232,67,26,0.12)',
                border: '1px solid rgba(232,67,26,0.35)',
                color: '#FF8F6E',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E8431A' }} />
              Get Started
            </m.div>

            <m.h2
              variants={fadeUp}
              className="font-display"
              style={{
                fontSize: 'clamp(38px,4.8vw,68px)',
                lineHeight: 1.02,
                fontWeight: 800,
                letterSpacing: '-0.035em',
                margin: '0 0 20px',
                color: '#fff',
              }}
            >
              Stop fighting cables.<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#E8431A' }}>
                Pull. Plug. Done.
              </span>
            </m.h2>

            <m.p
              variants={fadeUp}
              style={{
                fontSize: 16,
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.62)',
                margin: '0 0 32px',
                maxWidth: 480,
              }}
            >
              Deploy a stable wired connection in seconds. EXTNGO keeps your setup clean, portable, and ready anywhere work takes you.
            </m.p>

            <m.div
              variants={fadeUp}
              className="cta-btn-row"
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
            >
              <m.button
                type="button"
                onClick={() => openProductDetail('cable50ft')}
                className="btn btn-primary"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{ fontSize: 15, padding: '15px 30px', textDecoration: 'none' }}
              >
                Buy Now
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </m.button>
              <m.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '15px 28px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  color: '#fff',
                  fontWeight: 500,
                  fontSize: 15,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-geist)',
                }}
              >
                Talk to Sales
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </m.button>
            </m.div>

            {/* Trust stats */}
            <m.div
              variants={fadeUp}
              className="cta-stats-responsive"
              style={{
                marginTop: 40,
                display: 'flex',
                gap: 'clamp(20px,3vw,40px)',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              {STATS.map((s, i) => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(20px,3vw,40px)' }}>
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-bricolage)',
                      fontSize: 26,
                      fontWeight: 800,
                      color: '#fff',
                      margin: 0,
                      lineHeight: 1,
                    }}>{s.value}</p>
                    <p style={{
                      fontSize: 10.5,
                      letterSpacing: '1.4px',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.45)',
                      margin: '6px 0 0',
                      fontWeight: 600,
                    }}>{s.label}</p>
                  </div>
                  {i < STATS.length - 1 && (
                    <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.12)' }} />
                  )}
                </div>
              ))}
            </m.div>
          </m.div>

          {/* Product image */}
          <m.div
            initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: -6 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0, 0, 0.2, 1] }}
            className="cta-image-responsive"
            style={{
              position: 'relative',
              aspectRatio: '1/1',
              maxWidth: 460,
              margin: '0 auto',
              width: '100%',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                filter: 'drop-shadow(0 40px 60px rgba(232,67,26,0.4)) drop-shadow(0 20px 30px rgba(0,0,0,0.45))',
                animation: 'heroFloat 10s ease-in-out infinite',
                willChange: 'transform',
              }}
            >
              <Image
                src="/product-reel.png"
                alt="Extngo retractable cable reel"
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 480px) 90vw, (max-width: 860px) 80vw, 40vw"
              />
            </div>

            {/* Orbit ring — clipped on mobile to prevent overflow */}
            <div
              aria-hidden
              className="cta-orbit-ring"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '115%',
                height: '115%',
                transform: 'translate(-50%, -50%)',
                border: '1px dashed rgba(232,67,26,0.25)',
                borderRadius: '50%',
                pointerEvents: 'none',
                animation: 'heroRing 40s linear infinite',
              }}
            />
          </m.div>
        </div>

        {/* B2B Contact Modal */}
        <B2BContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </section>
    </LazyMotion>
  )
}
