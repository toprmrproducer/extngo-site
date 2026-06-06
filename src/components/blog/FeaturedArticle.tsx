import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '@/lib/shopify/types'

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  }).format(new Date(iso))
}

export default function FeaturedArticle({ article }: { article: Article }) {
  const href = `/blog/${article.blog.handle}/${article.handle}`

  return (
    <div style={{
      background: '#fff',
      border: '1px solid rgba(26,26,26,0.08)',
      borderRadius: 24,
      overflow: 'hidden',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
    }}>
      {/* Image */}
      <div style={{ position: 'relative', minHeight: 280, background: '#F0EDE8' }}>
        {article.image ? (
          <Image
            src={article.image.url}
            alt={article.image.altText || article.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, #F6F3EE 0%, #ECE7DE 100%)',
          }} />
        )}
        {/* Featured badge */}
        <div style={{
          position: 'absolute', top: 16, left: 16,
          padding: '5px 12px', borderRadius: 999,
          background: 'rgba(10,10,10,0.7)',
          backdropFilter: 'blur(8px)',
          color: '#fff', fontSize: 10, fontWeight: 700,
          letterSpacing: '1.5px', textTransform: 'uppercase',
          border: '1px solid rgba(255,255,255,0.15)',
        }}>
          Featured
        </div>
      </div>

      {/* Content */}
      <div style={{
        padding: 'clamp(28px,4vw,48px)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
      }}>
        {/* Tags */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {article.tags.slice(0, 2).map(tag => (
            <span key={tag} style={{
              padding: '4px 10px', borderRadius: 999,
              background: 'rgba(232,67,26,0.08)',
              border: '1px solid rgba(232,67,26,0.2)',
              color: 'var(--accent)', fontSize: 10, fontWeight: 700,
              letterSpacing: '1.5px', textTransform: 'uppercase',
            }}>
              {tag}
            </span>
          ))}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-bricolage)',
          fontSize: 'clamp(22px,2.8vw,34px)',
          fontWeight: 800, lineHeight: 1.15,
          letterSpacing: '-0.025em',
          color: 'var(--ink)',
          margin: '0 0 14px',
        }}>
          {article.title}
        </h2>

        {article.excerpt && (
          <p style={{
            fontSize: 15, lineHeight: 1.65,
            color: 'var(--muted)',
            margin: '0 0 24px',
          }}>
            {article.excerpt}
          </p>
        )}

        {/* Meta */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          marginBottom: 28,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(232,67,26,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, color: 'var(--accent)',
            flexShrink: 0,
          }}>
            {article.author.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', margin: 0 }}>
              {article.author.name}
            </p>
            <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>
              {formatDate(article.publishedAt)}
            </p>
          </div>
        </div>

        <Link
          href={href}
          className="btn btn-primary"
          style={{
            alignSelf: 'flex-start',
            fontSize: 14, padding: '13px 28px',
            textDecoration: 'none',
          }}
        >
          Read Article
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </div>
  )
}
