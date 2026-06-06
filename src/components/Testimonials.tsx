'use client'

import { useRef, useState, useEffect } from 'react'
import { m, LazyMotion, domAnimation, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

// ── Stars ────────────────────────────────────────────────────────────────────
function Stars({ count, size = 12, dim = false }: { count: number; size?: number; dim?: boolean }) {
  return (
    <div className="flex gap-0.5" style={{ marginBottom: 10 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i < count ? '#E8431A' : dim ? 'rgba(255,255,255,0.2)' : 'rgba(26,26,26,0.12)'}
          stroke="none"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

// ── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ name, size = 34 }: { name: string; size?: number }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2)
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#1A1A1A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.36,
        fontWeight: 700,
        color: '#fff',
        flexShrink: 0,
        letterSpacing: '-0.02em',
        fontFamily: 'var(--font-bricolage)',
      }}
    >
      {initials}
    </div>
  )
}

// ── Item data model ──────────────────────────────────────────────────────────
type TextItem = {
  kind: 'text'
  name: string
  role: string
  quote: string
  rating: number
}
type VideoItem = {
  kind: 'video'
  name: string
  role: string
  src: string
}
type Item = TextItem | VideoItem

const COLUMN_LEFT: Item[] = [
  { kind: 'text',  name: 'Patricia',           role: 'Verified Purchase, Mexico',    quote: 'Great, portable and does not get in the way or tangle, like normal cables. Excellent purchase.', rating: 5 },
  { kind: 'video', name: 'Customer Review',    role: 'Verified Purchase',            src: '/review.mp4' },
  { kind: 'text',  name: 'Mr R A Harrison',    role: 'Verified Purchase, UK',        quote: 'Just need a temporary CAT5 cable, this is perfect. Occasionally I need to work from home and have to connect my work phone to the router - this is an ideal solution and is easy to store.', rating: 5 },
  { kind: 'video', name: 'Customer Review',    role: 'Verified Purchase',            src: '/review3.mp4' },
  { kind: 'text',  name: 'Javier',             role: 'Verified Purchase, Spain',     quote: 'Something expensive but easy to extend and pick up.', rating: 5 },
  { kind: 'text',  name: 'HCM',                role: 'Verified Purchase, Germany',   quote: 'Since this cable has been used, there are no more dropouts when playing. Definitely a purchase recommendation.', rating: 5 },
]

const COLUMN_CENTER: Item[] = [
  { kind: 'text',  name: 'Undisclosed',    role: 'Verified Purchase, Singapore', quote: "It's a good extendable cable, eliminates all mess. I needed the cable to use AirLink, but also need to remove after use, as my computer is far away from the living room where my router is.", rating: 5 },
  { kind: 'video', name: 'Customer Review', role: 'Verified Purchase', src: '/review1.mp4' },
  { kind: 'text',  name: 'Mr. Jean Delattre',role: 'Verified Purchase, France', quote: 'A bit pricey but amazing. The cable rolls up easily and quickly. To see the outfit over time.', rating: 5 },
  { kind: 'video', name: 'Customer Review', role: 'Verified Purchase', src: '/review4.mp4' },
  { kind: 'text',  name: 'Alexander',   role: 'Verified Purchase, Netherlands',      quote: 'Better than expected, just perfect', rating: 5 },
]

const COLUMN_RIGHT: Item[] = [
  { kind: 'text',  name: 'Alberto',     role: 'Verified Purchase, Italy',          quote: 'Perfect solution for obtaining the reliability and transfer speed that only a cable connection can provide. The cable is flat, which allows it to be easily passed under the ports.', rating: 5 },
  { kind: 'video', name: 'Customer Review', role: 'Verified Purchase',       src: '/review2.mp4' },
  { kind: 'text',  name: 'Boerke', role: 'Verified Purchase, Belgium', quote: 'Handy considering the 15 meter long cable', rating: 5 },
  { kind: 'text',  name: 'Matt', role: 'Verified Purchase, Canada',        quote: 'Easy product to use that offers lots of range', rating: 5 },
  { kind: 'text',  name: 'HCM',   role: 'Verified Purchase, Germany',              quote: 'We actually have good Internet. Nevertheless, it is still the case when it comes to gaming that a LAN cable is still the best. There were always small dropouts with WLAN. But putting the LAN cable across the living room over and over again is quite annoying.', rating: 5 },
]

// ── Text card ────────────────────────────────────────────────────────────────
function TestimonialCard({ t }: { t: TextItem }) {
  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: 18,
        padding: '18px 20px 16px',
        boxShadow: '0 2px 14px rgba(0,0,0,0.05), 0 0 0 1px rgba(26,26,26,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <div>
        <Stars count={t.rating} />
        <p style={{ fontSize: 13.5, lineHeight: 1.55, color: '#2A2A2A', margin: 0 }}>
          {t.quote}
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <Avatar name={t.name} />
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', margin: 0, letterSpacing: '-0.01em' }}>
            {t.name}
          </p>
          <p style={{ fontSize: 11.5, color: '#8A8A8A', margin: '2px 0 0' }}>
            {t.role}
          </p>
        </div>
      </div>

      <div
        style={{
          height: 3,
          width: 42,
          borderRadius: 999,
          background: 'linear-gradient(to right, #E8431A, #F5C518)',
        }}
      />
    </div>
  )
}

// ── Video card ───────────────────────────────────────────────────────────────
function VideoCard({ v }: { v: VideoItem }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [muted, setMuted] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const isInView = useInView(containerRef, { margin: '100px' })

  // Play/pause based on visibility
  useEffect(() => {
    if (videoRef.current) {
      if (isInView && loaded) {
        videoRef.current.play().catch(() => {
          // Autoplay blocked, user interaction needed
        })
      } else {
        videoRef.current.pause()
      }
    }
  }, [isInView, loaded])

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const el = videoRef.current
    if (!el) return
    el.muted = !el.muted
    setMuted(el.muted)
  }

  return (
    <div
      ref={containerRef}
      style={{
        borderRadius: 18,
        overflow: 'hidden',
        position: 'relative',
        aspectRatio: '4/5',
        background: '#111',
        boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
      }}
    >
      {!error && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={() => setLoaded(true)}
          onError={() => setError(true)}
          onCanPlay={() => {
            // Ensure video plays after it's ready
            videoRef.current?.play().catch(() => {
              // Silently handle autoplay failures
            })
          }}
          style={{ 
            position: 'absolute', 
            inset: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        >
          <source src={v.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Fallback for missing videos */}
      {error && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      )}

      {/* Gradient overlay — keeps info legible */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.35) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top-left badge */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          padding: '5px 10px',
          borderRadius: 999,
          background: 'rgba(232,67,26,0.92)',
          color: '#fff',
          fontSize: 9.5,
          fontWeight: 700,
          letterSpacing: '1.6px',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          zIndex: 2,
        }}
      >
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff' }} />
        Video
      </div>

      {/* Mute toggle - only show if video loaded */}
      {loaded && !error && (
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Unmute' : 'Mute'}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.45)',
            border: '1px solid rgba(255,255,255,0.22)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
            zIndex: 2,
            padding: 0,
          }}
        >
          {muted ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      )}

      {/* Bottom info */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 16px 16px', zIndex: 2 }}>
        <Stars count={5} size={11} dim />
        <p style={{ fontSize: 13.5, fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.01em' }}>
          {v.name}
        </p>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', margin: '2px 0 0' }}>
          {v.role}
        </p>
      </div>
    </div>
  )
}

// ── Renders a single item (text or video) ────────────────────────────────────
function Card({ item }: { item: Item }) {
  return item.kind === 'video' ? <VideoCard v={item} /> : <TestimonialCard t={item} />
}

// ── Column ───────────────────────────────────────────────────────────────────
function ScrollColumn({
  items,
  direction,
}: {
  items: Item[]
  direction: 'up' | 'down' | 'down-slow'
}) {
  const trackClass =
    direction === 'up' ? 'tm-track tm-track-up' :
    direction === 'down-slow' ? 'tm-track tm-track-down-slow' :
    'tm-track tm-track-down'

  return (
    <div className={trackClass}>
      {[...items, ...items].map((item, i) => (
        <Card key={`${item.name}-${i}`} item={item} />
      ))}
    </div>
  )
}

// ── Main export ──────────────────────────────────────────────────────────────
export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-10% 0px' })

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={sectionRef}
        id="reviews"
        style={{
          background: '#F5F3EF',
          padding: 'clamp(48px,6vh,80px) clamp(28px,6vw,96px)',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Header */}
        <m.div
          className="text-center"
          variants={staggerContainer(0.1, 0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ marginBottom: 'clamp(28px,4vh,44px)' }}
        >
          <m.div
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 rounded-full"
            style={{
              padding: '6px 12px',
              marginBottom: 14,
              background: 'rgba(232,67,26,.08)',
              border: '1px solid rgba(232,67,26,.22)',
              color: 'var(--accent)',
              fontSize: 10.5,
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)' }} />
            Customer Reviews
          </m.div>

          <m.h2
            variants={fadeUp}
            className="font-display"
            style={{
              fontSize: 'clamp(28px,3vw,46px)',
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: '-0.035em',
              color: 'var(--ink)',
              margin: '0 0 10px',
            }}
          >
            Trusted by Pros <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Everywhere.</span>
          </m.h2>

          <m.p
            variants={fadeUp}
            style={{
              fontSize: 14,
              lineHeight: 1.55,
              color: '#3A3A3A',
              maxWidth: 460,
              margin: '0 auto',
            }}
          >
            From server rooms to stage floors — here&apos;s what people are saying about Extngo.
          </m.p>
        </m.div>

        {/* Scrolling columns viewport */}
        <m.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0, 0, 0.2, 1] }}
          className="tm-viewport"
          style={{
            position: 'relative',
            height: 'clamp(340px,52vh,560px)',
            maxWidth: 1200,
            width: '100%',
            margin: '0 auto',
            overflow: 'hidden',
          }}
        >
          <div
            className="tm-grid-responsive"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(10px,1.5vw,18px)',
              height: '100%',
              alignItems: 'start',
            }}
          >
            <div className="tm-col tm-col-left" style={{ overflow: 'hidden', height: '100%' }}>
              <ScrollColumn items={COLUMN_LEFT} direction="down" />
            </div>
            <div className="tm-col tm-col-center" style={{ overflow: 'hidden', height: '100%' }}>
              <ScrollColumn items={COLUMN_CENTER} direction="up" />
            </div>
            <div className="tm-col tm-col-hide" style={{ overflow: 'hidden', height: '100%' }}>
              <ScrollColumn items={COLUMN_RIGHT} direction="down-slow" />
            </div>
          </div>

          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 72,
              background: 'linear-gradient(to bottom, #F5F3EF 0%, rgba(245,243,239,0) 100%)',
              pointerEvents: 'none',
              zIndex: 3,
            }}
          />
          <div
            aria-hidden
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 72,
              background: 'linear-gradient(to top, #F5F3EF 0%, rgba(245,243,239,0) 100%)',
              pointerEvents: 'none',
              zIndex: 3,
            }}
          />
        </m.div>

        {/* Bottom summary strip */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease: [0, 0, 0.2, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(24px,4vw,56px)',
            flexWrap: 'wrap',
            marginTop: 'clamp(28px,4vh,44px)',
            paddingTop: 'clamp(20px,3vh,28px)',
            borderTop: '1px solid rgba(26,26,26,0.08)',
            maxWidth: 1200,
            margin: 'clamp(28px,4vh,44px) auto 0',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                fontFamily: 'var(--font-bricolage)',
                fontSize: 30,
                fontWeight: 800,
                lineHeight: 1,
                color: 'var(--ink)',
              }}
            >
              4.8
            </span>
            <div>
              <Stars count={5} size={13} />
              <p style={{ fontSize: 11, color: '#8A8A8A', margin: 0, letterSpacing: '0.3px' }}>
                Based on 2,400+ verified reviews
              </p>
            </div>
          </div>

          <div
            aria-hidden
            className="tm-col-hide-sm"
            style={{ width: 1, height: 36, background: 'rgba(26,26,26,0.12)' }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex' }}>
              {['JH', 'VW', 'PM', 'LS'].map((i, idx) => (
                <div
                  key={i}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: '#1A1A1A',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: 'var(--font-bricolage)',
                    border: '2px solid #F5F3EF',
                    marginLeft: idx === 0 ? 0 : -10,
                  }}
                >
                  {i}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, color: '#3A3A3A', margin: 0, lineHeight: 1.4 }}>
              <strong style={{ color: 'var(--ink)' }}>Join 2,400+ pros</strong>
              <br />
              who made the switch to Extngo
            </p>
          </div>
        </m.div>
      </section>
    </LazyMotion>
  )
}
