// Test Shopify API to see what articles are returned
require('dotenv').config({ path: '.env' })

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN
const SHOPIFY_STOREFRONT_PRIVATE_TOKEN = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN

const query = `
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
                id
                title
                handle
                publishedAt
                excerpt
                tags
                author {
                  name
                }
                blog {
                  handle
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`

async function testAPI() {
  console.log('Testing Shopify API...')
  console.log('Domain:', SHOPIFY_STORE_DOMAIN)
  console.log('Token:', SHOPIFY_STOREFRONT_PRIVATE_TOKEN ? 'Present' : 'Missing')
  
  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/2026-04/graphql.json`
  console.log('Endpoint:', endpoint)
  
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Shopify-Storefront-Private-Token': SHOPIFY_STOREFRONT_PRIVATE_TOKEN,
      },
      body: JSON.stringify({ query, variables: { first: 50 } }),
    })
    
    console.log('Response status:', res.status)
    
    const json = await res.json()
    
    if (json.errors) {
      console.error('GraphQL Errors:', JSON.stringify(json.errors, null, 2))
      return
    }
    
    console.log('\n=== API Response ===')
    console.log(JSON.stringify(json, null, 2))
    
    // Count articles
    let totalArticles = 0
    if (json.data?.blogs?.edges) {
      json.data.blogs.edges.forEach(blogEdge => {
        const blog = blogEdge.node
        const articleCount = blog.articles.edges.length
        totalArticles += articleCount
        console.log(`\nBlog: ${blog.title} (${blog.handle})`)
        console.log(`Articles: ${articleCount}`)
        blog.articles.edges.forEach(articleEdge => {
          console.log(`  - ${articleEdge.node.title} (${articleEdge.node.handle})`)
        })
      })
    }
    
    console.log(`\nTotal articles found: ${totalArticles}`)
    
  } catch (err) {
    console.error('Fetch error:', err)
  }
}

testAPI()
