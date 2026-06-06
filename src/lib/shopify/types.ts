// ── Shopify Types ────────────────────────────────────────────────────────────

export interface Article {
  id: string
  title: string
  handle: string
  publishedAt: string
  excerpt: string
  contentHtml: string
  image?: { url: string; altText: string }
  author: { name: string }
  blog: { handle: string; title: string }
  tags: string[]
}

export interface Blog {
  id: string
  handle: string
  title: string
  articles: Article[]
}
