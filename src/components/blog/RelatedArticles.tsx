import type { Article } from '@/lib/shopify/types'
import BlogCard from './BlogCard'

export default function RelatedArticles({ articles }: { articles: Article[] }) {
  if (!articles.length) return null

  return (
    <section style={{
      padding: 'clamp(48px,6vh,80px) 0',
      borderTop: '1px solid rgba(26,26,26,0.08)',
    }}>
      {/* Heading */}
      <div style={{ marginBottom: 32 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '5px 12px', borderRadius: 999, marginBottom: 12,
          background: 'rgba(232,67,26,0.08)',
          border: '1px solid rgba(232,67,26,0.2)',
          color: 'var(--accent)',
          fontSize: 10, fontWeight: 700,
          letterSpacing: '2px', textTransform: 'uppercase',
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)' }} />
          Keep Reading
        </div>
        <h2 style={{
          fontFamily: 'var(--font-bricolage)',
          fontSize: 'clamp(24px,3vw,36px)',
          fontWeight: 800, lineHeight: 1.1,
          letterSpacing: '-0.025em',
          color: 'var(--ink)', margin: 0,
        }}>
          More from the Field
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
        gap: 20,
      }}>
        {articles.slice(0, 3).map(article => (
          <BlogCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}
