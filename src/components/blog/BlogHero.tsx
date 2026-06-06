export default function BlogHero() {
  return (
    <section style={{
      background: 'linear-gradient(160deg, #0A0A0A 0%, #111 60%, #1A0A05 100%)',
      padding: 'clamp(100px,14vh,160px) clamp(24px,6vw,96px) clamp(64px,8vh,96px)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 400,
        background: 'radial-gradient(ellipse, rgba(232,67,26,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto' }}>
        {/* Label */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 14px', borderRadius: 999, marginBottom: 24,
          background: 'rgba(232,67,26,0.12)',
          border: '1px solid rgba(232,67,26,0.28)',
          color: 'var(--accent)',
          fontSize: 11, fontWeight: 700,
          letterSpacing: '2px', textTransform: 'uppercase',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
          Extngo Blog
        </div>

        <h1 style={{
          fontFamily: 'var(--font-bricolage)',
          fontSize: 'clamp(36px,5.5vw,72px)',
          fontWeight: 800, lineHeight: 1.05,
          letterSpacing: '-0.035em',
          color: '#fff',
          margin: '0 0 20px',
        }}>
          Insights from{' '}
          <span style={{ color: 'var(--accent)', fontStyle: 'italic', fontWeight: 400 }}>
            the Field
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(15px,1.8vw,18px)',
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.55)',
          margin: 0,
          maxWidth: 520,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Wiring guides, setup tips, and stories from IT pros who run cable for a living.
        </p>
      </div>
    </section>
  )
}
