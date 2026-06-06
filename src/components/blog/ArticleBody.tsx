export default function ArticleBody({ contentHtml }: { contentHtml: string }) {
  return (
    <div
      style={{ maxWidth: 720, margin: '0 auto', padding: '0 clamp(20px,4vw,0px)' }}
      className="article-body"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  )
}
