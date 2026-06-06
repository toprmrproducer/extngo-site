import type { Article } from '@/lib/shopify/types'
import BlogCard from './BlogCard'

export default function BlogGrid({ articles }: { articles: Article[] }) {
  if (!articles.length) {
    return (
      <div style={{
        textAlign: 'center', padding: '64px 24px',
        color: 'var(--muted)', fontSize: 15,
      }}>
        No articles found.
      </div>
    )
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
      gap: 24,
    }}>
      {articles.map(article => (
        <BlogCard key={article.id} article={article} />
      ))}
    </div>
  )
}
