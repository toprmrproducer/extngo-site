import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getAllArticles } from '@/lib/shopify/blog'
import BlogHero from '@/components/blog/BlogHero'
import BlogGrid from '@/components/blog/BlogGrid'
import FeaturedArticle from '@/components/blog/FeaturedArticle'
import BlogTagFilterClient from '@/components/blog/BlogTagFilterClient'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog | Extngo',
  description: 'Wiring guides and field stories from Extngo.',
  openGraph: {
    title: 'Blog | Extngo',
    description: 'Wiring guides and field stories from Extngo.',
    type: 'website',
    url: 'https://extngo-eight.vercel.app/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Extngo',
    description: 'Wiring guides and field stories from Extngo.',
  },
  alternates: {
    canonical: 'https://extngo-eight.vercel.app/blog',
  },
}

interface PageProps {
  searchParams: Promise<{ tag?: string }>
}

export default async function BlogPage({ searchParams }: PageProps) {
  const { tag } = await searchParams
  const articles = await getAllArticles(20)

  const filtered = tag
    ? articles.filter(a => a.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase()))
    : articles

  // Collect unique tags across all articles
  const allTags = Array.from(new Set(articles.flatMap(a => a.tags))).filter(Boolean)

  const featured = filtered[0] ?? null
  const rest = filtered.slice(1)

  return (
    <>
      <NavBar />
      <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <BlogHero />

        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(40px,6vh,64px) clamp(24px,6vw,64px)',
        }}>
          {/* Tag filter */}
          <div style={{ marginBottom: 40 }}>
            <Suspense>
              <BlogTagFilterClient tags={allTags} activeTag={tag ?? ''} />
            </Suspense>
          </div>

          {/* Featured article */}
          {featured && (
            <div style={{ marginBottom: 48 }}>
              <FeaturedArticle article={featured} />
            </div>
          )}

          {/* Grid */}
          {rest.length > 0 && (
            <>
              <div style={{ marginBottom: 24 }}>
                <h2 style={{
                  fontFamily: 'var(--font-bricolage)',
                  fontSize: 'clamp(20px,2.5vw,28px)',
                  fontWeight: 800, letterSpacing: '-0.02em',
                  color: 'var(--ink)', margin: 0,
                }}>
                  All Articles
                </h2>
              </div>
              <BlogGrid articles={rest} />
            </>
          )}

          {!featured && !rest.length && (
            <div style={{
              textAlign: 'center', padding: '80px 24px',
              color: 'var(--muted)', fontSize: 16,
            }}>
              No articles found{tag ? ` for tag "${tag}"` : ''}.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
