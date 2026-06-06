import type { Article } from '@/lib/shopify/types'

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  }).format(new Date(iso))
}

function estimateReadTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export default function ArticleMeta({ article }: { article: Article }) {
  const readTime = estimateReadTime(article.contentHtml)

  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap',
      alignItems: 'center', gap: 16,
    }}>
      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'rgba(232,67,26,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15, fontWeight: 700, color: 'var(--accent)',
          flexShrink: 0,
        }}>
          {article.author.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', margin: 0 }}>
            {article.author.name}
          </p>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>
            {formatDate(article.publishedAt)} · {readTime} min read
          </p>
        </div>
      </div>

      {/* Tags */}
      {article.tags.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {article.tags.map(tag => (
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
      )}
    </div>
  )
}
