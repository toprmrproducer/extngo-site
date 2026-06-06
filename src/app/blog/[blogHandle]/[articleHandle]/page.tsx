import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getAllArticles, getArticleByHandle } from '@/lib/shopify/blog'
import ArticleBody from '@/components/blog/ArticleBody'
import ArticleMeta from '@/components/blog/ArticleMeta'
import RelatedArticles from '@/components/blog/RelatedArticles'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export const revalidate = 3600

interface Params {
  blogHandle: string
  articleHandle: string
}

interface PageProps {
  params: Promise<Params>
}

export async function generateStaticParams(): Promise<Params[]> {
  const articles = await getAllArticles(50)
  return articles.map(a => ({
    blogHandle: a.blog.handle,
    articleHandle: a.handle,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { blogHandle, articleHandle } = await params
  const article = await getArticleByHandle(blogHandle, articleHandle)
  if (!article) return { title: 'Article | Extngo' }

  const ogImage = article.image ? article.image.url : '/hero.png'
  const description = article.excerpt || 'Read this article on Extngo Blog'

  return {
    title: `${article.title} | Extngo Blog`,
    description,
    keywords: article.tags,
    authors: [{ name: article.author?.name || 'Extngo' }],
    openGraph: {
      type: 'article',
      title: article.title,
      description,
      url: `https://extngo-eight.vercel.app/blog/${blogHandle}/${articleHandle}`,
      publishedTime: article.publishedAt,
      authors: [article.author?.name || 'Extngo'],
      tags: article.tags,
      images: [
        {
          url: ogImage,
          alt: article.image?.altText || article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `https://extngo-eight.vercel.app/blog/${blogHandle}/${articleHandle}`,
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { blogHandle, articleHandle } = await params
  const [article, allArticles] = await Promise.all([
    getArticleByHandle(blogHandle, articleHandle),
    getAllArticles(20),
  ])

  if (!article) notFound()

  // Related: same tag, excluding current article, max 3
  const related = allArticles
    .filter(a => a.id !== article.id && a.tags.some(t => article.tags.includes(t)))
    .slice(0, 3)

  // Fallback: latest articles if no tag overlap
  const relatedFallback = related.length
    ? related
    : allArticles.filter(a => a.id !== article.id).slice(0, 3)

  return (
    <>
      <NavBar />
      <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        {/* Article header */}
        <div style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: 'clamp(100px,14vh,140px) clamp(24px,6vw,48px) clamp(32px,4vh,48px)',
        }}>
          {/* Tags */}
          {article.tags.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
              {article.tags.slice(0, 3).map(tag => (
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

          <h1 style={{
            fontFamily: 'var(--font-bricolage)',
            fontSize: 'clamp(28px,4.5vw,52px)',
            fontWeight: 800, lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: 'var(--ink)',
            margin: '0 0 24px',
          }}>
            {article.title}
          </h1>

          <ArticleMeta article={article} />
        </div>

        {/* Hero image */}
        {article.image && (
          <div style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '0 clamp(24px,6vw,48px)',
            marginBottom: 'clamp(40px,5vh,64px)',
          }}>
            <div style={{
              position: 'relative',
              aspectRatio: '16/9',
              maxHeight: 480,
              borderRadius: 20,
              overflow: 'hidden',
              background: '#F0EDE8',
            }}>
              <Image
                src={article.image.url}
                alt={article.image.altText || article.title}
                fill
                sizes="(max-width: 768px) 100vw, 1100px"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
        )}

        {/* Article body */}
        <div style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: '0 clamp(24px,6vw,48px)',
          marginBottom: 'clamp(48px,6vh,80px)',
        }}>
          <ArticleBody contentHtml={article.contentHtml} />
        </div>

        {/* Related articles */}
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(24px,6vw,64px) clamp(48px,6vh,80px)',
        }}>
          <RelatedArticles articles={relatedFallback} />
        </div>
      </main>
      <Footer />
    </>
  )
}
