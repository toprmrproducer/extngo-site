/**
 * Shared Framer Motion variants + spring configs.
 * Import from here instead of defining inline per-component.
 */

// ── Easing curves ────────────────────────────────────────────────────────────
export const ease = {
  out:     [0.0, 0.0, 0.2, 1]  as const,  // decelerate — elements entering
  in:      [0.4, 0.0, 1.0, 1]  as const,  // accelerate — elements leaving
  inOut:   [0.4, 0.0, 0.2, 1]  as const,  // standard interactive
  expo:    [0.22, 1, 0.36, 1]  as const,  // expo-out — menus, overlays
  spring:  [0.34, 1.56, 0.64, 1] as const, // back-out — buttons, cards
} as const

// ── Spring configs ───────────────────────────────────────────────────────────
export const spring = {
  gentle:  { type: 'spring', stiffness: 80,  damping: 20, mass: 1 },
  snappy:  { type: 'spring', stiffness: 200, damping: 28, mass: 1 },
  bouncy:  { type: 'spring', stiffness: 300, damping: 20, mass: 0.8 },
  slow:    { type: 'spring', stiffness: 50,  damping: 18, mass: 1.2 },
  // For scroll-driven values (no bounce)
  smooth:  { type: 'spring', stiffness: 100, damping: 30, restDelta: 0.001 },
} as const

// ── Fade up (standard entrance) ──────────────────────────────────────────────
export const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.out },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.35, ease: ease.in },
  },
}

// ── Fade down (nav items) ────────────────────────────────────────────────────
export const fadeDown = {
  hidden:  { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: ease.out },
  },
}

// ── Fade in (opacity only) ───────────────────────────────────────────────────
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: ease.out } },
  exit:    { opacity: 0, transition: { duration: 0.3, ease: ease.in } },
}

// ── Scale in ─────────────────────────────────────────────────────────────────
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: ease.out },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.4, ease: ease.in },
  },
}

// ── Stagger container ────────────────────────────────────────────────────────
export const staggerContainer = (stagger = 0.1, delayChildren = 0) => ({
  hidden:  {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

// ── Word reveal (clips up from overflow:hidden parent) ───────────────────────
export const wordReveal = {
  hidden:  { y: '110%', opacity: 0 },
  visible: (delay: number = 0) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: ease.out,
      delay,
    },
  }),
}

// ── Slide in from right (mobile menu items) ──────────────────────────────────
export const slideInRight = {
  hidden:  { opacity: 0, x: 24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: ease.expo, delay: i * 0.06 },
  }),
  exit: {
    opacity: 0,
    x: 16,
    transition: { duration: 0.2, ease: ease.in },
  },
}

// ── Mobile menu panel ────────────────────────────────────────────────────────
export const menuPanel = {
  hidden:  { y: '-110%' },
  visible: { y: 0, transition: { duration: 0.45, ease: ease.expo } },
  exit:    { y: '-110%', transition: { duration: 0.3, ease: ease.in } },
}

// ── Hero exit (when scrolled past) ──────────────────────────────────────────
export const heroExit = {
  visible: { opacity: 1, scale: 1 },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.5, ease: ease.in },
  },
}

// ── Card hover ───────────────────────────────────────────────────────────────
export const cardHover = {
  rest:  { y: 0,  boxShadow: '0 4px 16px rgba(0,0,0,0.08)' },
  hover: { y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.14)',
    transition: { duration: 0.3, ease: ease.out } },
}

// ── Button micro-interaction ─────────────────────────────────────────────────
export const buttonTap = { scale: 0.97 }
export const buttonHover = { y: -2, transition: { duration: 0.2, ease: ease.out } }
