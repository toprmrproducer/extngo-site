'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '@/lib/shopify/types'

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  }).format(new Date(iso))
}

export default function BlogCard({ article }: { article: Article }) {
  const href = `/blog/${article.blog.handle}/${article.handle}`

  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        border: '1px solid rgba(26,26,26,0.08)',
        borderRadius: 18,
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'transform 0.22s cubic-bezier(0.22,1,0.36,1), box-shadow 0.22s cubic-bezier(0.22,1,0.36,1)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.transform = 'translateY(-4px) scale(1.01)'
        el.style.boxShadow = '0 16px 40px rgba(0,0,0,0.10), 0 0 0 1.5px rgba(232,67,26,0.18)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.transform = ''
        el.style.boxShadow = ''
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '16/9', background: '#F0EDE8', flexShrink: 0 }}>
        {article.image ? (
          <Image
            src={article.image.url}
            alt={article.image.altText || article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, #F6F3EE 0%, #ECE7DE 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(26,26,26,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
        )}
        {/* Tag badge overlay */}
        {article.tags[0] && (
          <span style={{
            position: 'absolute', top: 12, left: 12,
            padding: '4px 10px', borderRadius: 999,
            background: 'var(--accent)',
            color: '#fff', fontSize: 10, fontWeight: 700,
            letterSpacing: '1.5px', textTransform: 'uppercase',
          }}>
            {article.tags[0]}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{
          fontFamily: 'var(--font-bricolage)',
          fontSize: 17, fontWeight: 700,
          color: 'var(--ink)', lineHeight: 1.3,
          margin: '0 0 10px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {article.title}
        </h3>

        {article.excerpt && (
          <p style={{
            fontSize: 14, lineHeight: 1.6,
            color: 'var(--muted)',
            margin: '0 0 16px', flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {article.excerpt}
          </p>
        )}

        {/* Footer row */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto', paddingTop: 14,
          borderTop: '1px solid rgba(26,26,26,0.07)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Author avatar */}
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'rgba(232,67,26,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, color: 'var(--accent)',
              flexShrink: 0,
            }}>
              {article.author.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)', margin: 0, lineHeight: 1.2 }}>
                {article.author.name}
              </p>
              <p style={{ fontSize: 11, color: 'var(--muted)', margin: 0, lineHeight: 1.2 }}>
                {formatDate(article.publishedAt)}
              </p>
            </div>
          </div>

          <span style={{
            fontSize: 13, fontWeight: 600,
            color: 'var(--accent)',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            Read More
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
