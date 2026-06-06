'use client'

import { CSSProperties, useEffect } from 'react'
import Image from 'next/image'
import { m, useMotionValue, useTransform, useSpring } from 'framer-motion'

interface HeroSceneProps {
  style?: CSSProperties
  kenBurns?: boolean
}

export default function HeroScene({ style = {}, kenBurns = true }: HeroSceneProps) {
  // Scroll-driven parallax — image moves up slower than scroll (depth effect)
  // Range is halved on mobile to avoid excessive movement
  const scrollY = useMotionValue(0)
  const rawY = useTransform(scrollY, [0, 600], [0, typeof window !== 'undefined' && window.innerWidth < 768 ? 40 : 80])
  const y = useSpring(rawY, { stiffness: 80, damping: 20, restDelta: 0.001 })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const update = () => scrollY.set(window.scrollY)
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [scrollY])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', ...style }}>
      <m.div
        style={{
          position: 'absolute',
          inset: '-10% 0',   // extra height so parallax doesn't show gaps
          y,
          animation: kenBurns ? 'heroKen 18s linear forwards' : 'none',
          transformOrigin: '60% 55%',
          willChange: 'transform',
        }}
      >
        <Image
          src="/hero.png"
          alt="Hero background"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
        />
      </m.div>

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,.3) 0%, rgba(0,0,0,.1) 30%, rgba(0,0,0,.1) 70%, rgba(0,0,0,.25) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
