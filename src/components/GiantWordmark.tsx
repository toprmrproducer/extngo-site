'use client'

import { useEffect, useRef, useState } from 'react'
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface GiantWordmarkProps {
  shown?: boolean
  tone?: 'light' | 'dark'
}

export default function GiantWordmark({ shown = true, tone = 'light' }: GiantWordmarkProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // ── Mouse parallax — MotionValues, zero React re-renders ──────────────────
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring smoothing gives the "floating on water" lag
  const springX = useSpring(mouseX, { stiffness: 60, damping: 18, restDelta: 0.001 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 18, restDelta: 0.001 })

  // Map normalised mouse pos (-0.5 → 0.5) to pixel offset — scale down on mobile
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])
  const parallaxRange = isMobile ? 12 : 28
  const tx = useTransform(springX, [-0.5, 0.5], [-parallaxRange, parallaxRange])
  const ty = useTransform(springY, [-0.5, 0.5], [-parallaxRange * 0.57, parallaxRange * 0.57])

  // ── Scroll scale — MotionValue, zero React re-renders ─────────────────────
  const scrollProgress = useMotionValue(0)
  const scale = useTransform(scrollProgress, [0, 1], [0.75, 1.5])
  const smoothScale = useSpring(scale, { stiffness: 80, damping: 22, restDelta: 0.001 })
  useEffect(() => {
    const container = containerRef.current?.offsetParent as HTMLElement | null
      || containerRef.current?.parentElement as HTMLElement | null
    if (!container) return

    // Skip mouse parallax if user prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect()
      mouseX.set((e.clientX - r.left - r.width / 2) / r.width)
      mouseY.set((e.clientY - r.top - r.height / 2) / r.height)
    }
    const onLeave = () => { mouseX.set(0); mouseY.set(0) }

    container.addEventListener('mousemove', onMove)
    container.addEventListener('mouseleave', onLeave)
    return () => {
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [mouseX, mouseY])

  useEffect(() => {
    const onScroll = () => {
      scrollProgress.set(Math.min(window.scrollY / window.innerHeight, 1))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollProgress])

  if (!shown) return null

  const color = tone === 'light' ? 'rgba(26,26,26,1)' : 'rgba(255,255,255,1)'
  const gradientStart = tone === 'light' ? 'rgba(26,26,26,0)' : 'rgba(255,255,255,0)'
  const gradientEnd   = tone === 'light' ? 'rgba(26,26,26,1)' : 'rgba(255,255,255,1)'
  const targetOpacity = tone === 'light' ? 0.09 : 0.13

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: '84px',
        left: 0, right: 0,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        fontSize: 'clamp(18vw, 22vw, 26vw)',
        fontWeight: 900,
        fontFamily: 'var(--font-bricolage)',
        color,
        pointerEvents: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        letterSpacing: '-0.07em',
        lineHeight: 0.78,
        zIndex: 1,
        willChange: 'transform',
      }}
    >
      <m.span
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: targetOpacity, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
        style={{
          display: 'inline-block',
          x: tx,
          y: ty,
          scale: smoothScale,
          background: `linear-gradient(to top, ${gradientStart} 0%, ${gradientEnd} 40%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          willChange: 'transform',
        }}
      >
        EXTNGO
      </m.span>
    </div>
  )
}
