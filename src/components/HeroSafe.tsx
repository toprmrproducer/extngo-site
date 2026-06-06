'use client'

import { openProductDetail } from '@/lib/shopify-buy'

import { useState } from 'react'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import HeroScene from './HeroScene'
import GiantWordmark from './GiantWordmark'
import Word from './Word'
import B2BContactModal from './B2BContactModal'
import { fadeUp, fadeIn, staggerContainer } from '@/lib/motion'

interface HeroSafeProps {
  animKey?: number
  showWordmark?: boolean
  wordmarkTone?: 'light' | 'dark'
}

export default function HeroSafe({ animKey = 0, showWordmark = true, wordmarkTone = 'dark' }: HeroSafeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <LazyMotion features={domAnimation}>
      <div
        key={animKey}
        className="hero-root hero-live"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          background: '#0A0A0A',
        }}
      >
        <HeroScene />

        {/* Left-side gradient vignette */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, rgba(10,10,10,.96) 0%, rgba(10,10,10,.88) 28%, rgba(10,10,10,.6) 48%, rgba(10,10,10,.25) 65%, rgba(10,10,10,0) 82%)',
            zIndex: 2,
          }}
        />

        <div style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
          <GiantWordmark shown={showWordmark} tone={wordmarkTone} />
        </div>

        {/* Corner brackets */}
        <m.span className="bracket tl" variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.4 }} />
        <m.span className="bracket tr" variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.45 }} />
        <m.span className="bracket bl" variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.5 }} />
        <m.span className="bracket br" variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.55 }} />

        {/* Invisible anchor for PinnedProduct */}
        <div
          data-product-anchor="hero"
          style={{
            position: 'absolute',
            right: 'clamp(120px, 14vw, 240px)',
            bottom: 'clamp(24px, 4vw, 64px)',
            width: 'clamp(180px, 22vw, 340px)',
            aspectRatio: '1/1',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 4,
          display: 'flex',
          alignItems: 'center',
          padding: '0 clamp(20px, 6vw, 96px)',
          paddingTop: 'clamp(100px,12vh,120px)',
          paddingBottom: 'clamp(28px,5vh,48px)',
        }}>
            <div style={{ maxWidth: 640, width: '100%' }}>

              {/* Badge */}
              <m.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0,0,0.2,1] }}
                className="inline-flex items-center gap-2.5 rounded-full"
                style={{
                  padding: 'clamp(6px, 1vw, 8px) clamp(10px, 1.5vw, 14px)',
                  background: 'rgba(232,67,26,.15)',
                  border: '1px solid rgba(232,67,26,.35)',
                  color: 'var(--accent)',
                  fontSize: 'clamp(10px, 1.2vw, 12px)', fontWeight: 600,
                  letterSpacing: 'clamp(1px, 0.2vw, 2px)', textTransform: 'uppercase',
                  marginBottom: 'clamp(12px, 2vw, 20px)',
                }}
              >
                <span style={{ width: 'clamp(5px, 0.6vw, 6px)', height: 'clamp(5px, 0.6vw, 6px)', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 0 4px rgba(232,67,26,.3)' }} />
                New · 50ft CAT6 Reel
              </m.div>

              {/* Headline */}
              <h1
                className="font-display"
                style={{ margin: 0, fontSize: 'clamp(32px, 5.5vw, 76px)', lineHeight: 1.05, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em' }}
              >
                <div style={{ overflow: 'hidden' }}><Word delay={0.45}>50 Feet of</Word></div>
                <div style={{ overflow: 'hidden' }}><Word delay={0.6}>Ethernet Cable.</Word></div>
                <div style={{ overflow: 'hidden', marginTop: 'clamp(2px, 0.5vw, 4px)' }}>
                  <Word delay={0.95} className="orange-sweep">In Your Backpack.</Word>
                </div>
              </h1>

              {/* Subtext */}
              <m.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.15, ease: [0,0,0.2,1] }}
                style={{
                  marginTop: 'clamp(18px, 3vw, 28px)', marginBottom: 0,
                  maxWidth: 480,
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: 'clamp(14px, 1.1vw, 17px)',
                  lineHeight: 1.65,
                  fontWeight: 400,
                }}
              >
                Hardwire anywhere in seconds with a flat, retractable CAT6 cable. No tangles. No setup. No dependence on weak WiFi.
              </m.p>

              {/* CTA row */}
              <m.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.4, ease: [0,0,0.2,1] }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(10px,2vw,14px)', marginTop: 'clamp(24px,4vh,36px)' }}
              >
                <m.button
                  type="button"
                  onClick={() => openProductDetail('cable50ft')}
                  className="btn btn-primary"
                  style={{
                    background: 'var(--accent)', color: '#FFFFFF', border: 'none',
                    padding: 'clamp(12px,2vh,16px) clamp(18px,3vw,28px)', fontSize: 'clamp(14px,1.5vw,16px)', fontWeight: 600,
                    boxShadow: '0 10px 30px rgba(232,67,26,.4), 0 0 0 1px rgba(232,67,26,.3)',
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    textDecoration: 'none',
                  }}
                  whileHover={{ y: -2, boxShadow: '0 16px 40px rgba(232,67,26,.55)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  Buy Now
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </m.button>

                <m.button
                  onClick={() => setIsModalOpen(true)}
                  className="btn btn-ghost"
                  style={{
                    background: 'rgba(255,255,255,.1)', color: '#FFFFFF',
                    border: '1.5px solid rgba(255,255,255,.25)',
                    padding: 'clamp(11px,2vh,15px) clamp(16px,3vw,26px)', fontSize: 'clamp(14px,1.5vw,16px)', fontWeight: 600,
                    backdropFilter: 'blur(10px)',
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                  }}
                  whileHover={{ y: -2, background: 'rgba(255,255,255,.18)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  Bulk Orders / B2B Inquiry
                </m.button>
              </m.div>

              {/* Social proof */}
              <m.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.65, ease: [0,0,0.2,1] }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(12px,4vw,28px)', marginTop: 'clamp(20px,4vh,32px)', color: 'rgba(255,255,255,0.6)', fontSize: 13 }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ display: 'inline-flex', gap: 2 }}>
                    {[0,1,2,3,4].map(i => (
                      <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#E8431A">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </span>
                  <span style={{ color: '#FFFFFF', fontWeight: 600 }}>4.9 Rating</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Free Shipping
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  30-Day Returns
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Used by IT Pros
                </span>
              </m.div>

              {/* Micro copy */}
              <m.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.9, ease: [0,0,0.2,1] }}
                style={{ marginTop: 16, color: 'rgba(255,255,255,0.4)', fontSize: 12, fontStyle: 'italic' }}
              >
                Deploy a stable wired connection anywhere in under 10 seconds.
              </m.p>

            </div>
        </div>

        {/* B2B Contact Modal */}
        <B2BContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </LazyMotion>
  )
}
