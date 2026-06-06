import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/shopify/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://extngo-eight.vercel.app'

  // Get all blog articles
  let articles: any[] = []
  try {
    articles = await getAllArticles(100)
  } catch (error) {
    console.error('Error fetching articles for sitemap:', error)
  }

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products/blue`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Blog article pages
  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.blog.handle}/${article.handle}`,
    lastModified: new Date(article.publishedAt || article.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...articlePages]
}
