'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { m, LazyMotion, domAnimation } from 'framer-motion'

// Lerp helper
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

// Cubic ease-in-out
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export default function PinnedProduct() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const readyRef = useRef(false)

  // Lerp targets — updated from anchor rects
  const target = useRef({ x: 0, y: 0, w: 0, h: 0 })
  // Current interpolated values
  const current = useRef({ x: 0, y: 0, w: 0, h: 0 })

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    // Base size — set once on first valid read, used for scale calculation
    const baseSize = { w: 0, h: 0 }

    const readAnchors = () => {
      const heroA   = document.querySelector<HTMLElement>('[data-product-anchor="hero"]')
      const detailA = document.querySelector<HTMLElement>('[data-product-anchor="detail"]')
      const orangeA = document.querySelector<HTMLElement>('[data-product-anchor="orange"]')
      const diffSection = document.getElementById('product-differences')

      if (!detailA && !orangeA) {
        wrap.style.opacity = '0'
        return
      }

      const vh = window.innerHeight

      let tx: number, ty: number, tw: number, th: number

      if (heroA && detailA && orangeA) {
        const hr = heroA.getBoundingClientRect()
        const dr = detailA.getBoundingClientRect()
        const or = orangeA.getBoundingClientRect()

        // Phase 1: hero → detail
        const p1 = Math.max(0, Math.min(1, (vh * 0.8 - dr.top) / (vh * 0.5)))
        const e1 = easeInOut(p1)

        // Phase 2: detail → orange (only starts when p1 is complete)
        const p2 = p1 >= 1
          ? Math.max(0, Math.min(1, (vh * 1.0 - or.top) / (vh * 0.5)))
          : 0
        const e2 = easeInOut(p2)

        if (p2 > 0) {
          tx = dr.left + (or.left - dr.left) * e2
          ty = dr.top  + (or.top  - dr.top)  * e2
          tw = dr.width  + (or.width  - dr.width)  * e2
          th = dr.height + (or.height - dr.height) * e2
        } else {
          tx = hr.left + (dr.left - hr.left) * e1
          ty = hr.top  + (dr.top  - hr.top)  * e1
          tw = hr.width  + (dr.width  - hr.width)  * e1
          th = hr.height + (dr.height - hr.height) * e1
        }
      } else if (detailA && orangeA) {
        const dr = detailA.getBoundingClientRect()
        const or = orangeA.getBoundingClientRect()
        const e = easeInOut(Math.max(0, Math.min(1, (vh * 1.0 - or.top) / (vh * 0.5))))
        tx = dr.left + (or.left - dr.left) * e
        ty = dr.top  + (or.top  - dr.top)  * e
        tw = dr.width  + (or.width  - dr.width)  * e
        th = dr.height + (or.height - dr.height) * e
      } else if (detailA) {
        const dr = detailA.getBoundingClientRect()
        tx = dr.left; ty = dr.top; tw = dr.width; th = dr.height
      } else {
        const or = orangeA!.getBoundingClientRect()
        tx = or.left; ty = or.top; tw = or.width; th = or.height
      }

      target.current = { x: tx, y: ty, w: tw, h: th }

      // Set base size once
      if (!baseSize.w && tw > 0) { baseSize.w = tw; baseSize.h = th }

      // Visibility: hide when scrolled past differences section
      if (diffSection) {
        const past = diffSection.getBoundingClientRect().bottom <= 0
        wrap.style.opacity = past ? '0' : '1'
        wrap.style.pointerEvents = past ? 'none' : 'none'
      }
    }

    const tick = () => {
      readAnchors()

      const t = target.current
      const c = current.current
      const LERP = 0.12  // smoothing factor — lower = more lag/spring feel

      c.x = lerp(c.x, t.x, LERP)
      c.y = lerp(c.y, t.y, LERP)
      c.w = lerp(c.w, t.w, LERP)
      c.h = lerp(c.h, t.h, LERP)

      if (c.w > 1) {
        // Use transform-only: translate for position, scale for size
        // This keeps everything on the compositor thread
        if (!baseSize.w) { baseSize.w = c.w; baseSize.h = c.h }
        const sx = c.w / baseSize.w
        const sy = c.h / baseSize.h
        wrap.style.transform = `translate3d(${c.x}px, ${c.y}px, 0) scale(${sx}, ${sy})`
        wrap.style.width  = `${baseSize.w}px`
        wrap.style.height = `${baseSize.h}px`

        if (!readyRef.current) {
          readyRef.current = true
          wrap.style.opacity = '1'
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    // Kick off the loop
    rafRef.current = requestAnimationFrame(tick)

    // Also re-read on resize (anchor positions change)
    const onResize = () => {
      // Reset base size so scale recalculates
      baseSize.w = 0; baseSize.h = 0
      readyRef.current = false
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <div
        ref={wrapRef}
        aria-hidden="true"
        className="hidden md:block"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 0, height: 0,
          zIndex: 20,
          pointerEvents: 'none',
          opacity: 0,
          transformOrigin: 'top left',
          transition: 'opacity 0.4s ease',
          willChange: 'transform, opacity',
        }}
      >
        <m.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 0.84, 0.44, 1] }}
          style={{ width: '100%', height: '100%' }}
        >
          <div
            style={{
              width: '100%', height: '100%',
              animation: 'heroFloat 8s 2s ease-in-out infinite',
              filter: 'drop-shadow(0 40px 60px rgba(60,40,20,.3)) drop-shadow(0 15px 25px rgba(60,40,20,.18))',
              willChange: 'transform',
              position: 'relative',
            }}
          >
            <Image
              src="/product-reel.png"
              alt="Extngo 50ft retractable CAT6 cable reel"
              fill
              priority
              sizes="(max-width: 768px) 0vw, 40vw"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </m.div>
      </div>
    </LazyMotion>
  )
}
