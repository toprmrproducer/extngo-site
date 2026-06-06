'use client'

import { m } from 'framer-motion'
import { wordReveal } from '@/lib/motion'
import { ReactNode, CSSProperties } from 'react'

interface WordProps {
  children: ReactNode
  delay?: number
  className?: string
  style?: CSSProperties
}

export default function Word({ children, delay = 0, className = '', style = {} }: WordProps) {
  return (
    <span className={`word ${className}`} style={style}>
      <m.span
        variants={wordReveal}
        initial="hidden"
        animate="visible"
        custom={delay}
        style={{ display: 'inline-block' }}
      >
        {children}
      </m.span>
    </span>
  )
}
