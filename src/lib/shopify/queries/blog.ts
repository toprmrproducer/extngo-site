// ── Blog GraphQL Queries ─────────────────────────────────────────────────────

const ARTICLE_FIELDS = `
  id
  title
  handle
  publishedAt
  excerpt
  contentHtml
  image {
    url
    altText
  }
  author {
    name
  }
  blog {
    handle
    title
  }
  tags
`

/** Fetch all blogs with their articles (paginated) */
export const GET_BLOGS = `
  query GetBlogs($first: Int!) {
    blogs(first: $first) {
      edges {
        node {
          id
          handle
          title
          articles(first: 20) {
            edges {
              node {
                ${ARTICLE_FIELDS}
              }
            }
          }
        }
      }
    }
  }
`

/** Fetch a single article by blog handle + article handle */
export const GET_ARTICLE = `
  query GetArticle($blogHandle: String!, $articleHandle: String!) {
    blogByHandle(handle: $blogHandle) {
      id
      handle
      title
      articleByHandle(handle: $articleHandle) {
        ${ARTICLE_FIELDS}
      }
    }
  }
`

/** Fetch all articles across all blogs (for blog index listing) */
export const GET_ALL_ARTICLES = `
  query GetAllArticles($first: Int!) {
    blogs(first: 10) {
      edges {
        node {
          id
          handle
          title
          articles(first: $first) {
            edges {
              node {
                ${ARTICLE_FIELDS}
              }
            }
          }
        }
      }
    }
  }
`
