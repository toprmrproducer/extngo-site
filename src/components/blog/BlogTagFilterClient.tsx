'use client'

import { useRouter, usePathname } from 'next/navigation'
import BlogTagFilter from './BlogTagFilter'

interface Props {
  tags: string[]
  activeTag: string
}

export default function BlogTagFilterClient({ tags, activeTag }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  const handleTagChange = (tag: string) => {
    const params = new URLSearchParams()
    if (tag) params.set('tag', tag)
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  return <BlogTagFilter tags={tags} activeTag={activeTag} onTagChange={handleTagChange} />
}
