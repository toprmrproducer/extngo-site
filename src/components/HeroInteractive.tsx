'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, m, LazyMotion, domAnimation } from 'framer-motion'
import HeroSafe from './HeroSafe'

export default function HeroInteractive() {
  const [heroVisible, setHeroVisible] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Delay mounting to allow static hero to paint first
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const onScroll = () => setHeroVisible(window.scrollY < window.innerHeight * 1.1)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [mounted])

  // Don't render anything on server or before mounted
  if (!mounted) return <div style={{ display: 'none' }} />

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {heroVisible && (
          <m.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.5, ease: [0.4, 0, 1, 1] } }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0,
              width: '100%',
              height: '100dvh',
              overflow: 'hidden',
              zIndex: 1,
            }}
          >
            <HeroSafe animKey={0} showWordmark={true} />
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}
