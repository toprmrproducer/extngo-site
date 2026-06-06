'use client'

interface BlogTagFilterProps {
  tags: string[]
  activeTag: string
  onTagChange: (tag: string) => void
}

export default function BlogTagFilter({ tags, activeTag, onTagChange }: BlogTagFilterProps) {
  const all = ['All', ...tags]

  return (
    <div style={{
      display: 'flex', gap: 8, flexWrap: 'wrap',
      alignItems: 'center',
    }}>
      {all.map(tag => {
        const isActive = tag === activeTag || (tag === 'All' && !activeTag)
        return (
          <button
            key={tag}
            onClick={() => onTagChange(tag === 'All' ? '' : tag)}
            style={{
              padding: '8px 16px', borderRadius: 999,
              fontSize: 13, fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.18s ease, color 0.18s ease, border-color 0.18s ease',
              border: isActive ? '1px solid var(--accent)' : '1px solid rgba(26,26,26,0.15)',
              background: isActive ? 'var(--accent)' : 'transparent',
              color: isActive ? '#fff' : 'var(--muted)',
              letterSpacing: '0.3px',
            }}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}
