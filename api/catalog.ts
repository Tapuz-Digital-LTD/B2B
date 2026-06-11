/*
 * GET /api/catalog — the public product-catalog feed for /catalog.
 *
 * Reads the Catalog Collection from Shopify Admin GraphQL and returns a
 * normalized payload. Responses are CDN-cached (s-maxage) so site traffic
 * never reaches Shopify directly. See docs/adr/0001 for why this lives here
 * and not in XtraGiftCard-NestApp.
 *
 * Required Vercel env vars:
 *   SHOPIFY_STORE_DOMAIN      e.g. xtra-gift-card.myshopify.com
 *   SHOPIFY_ADMIN_TOKEN       custom-app token with read_products ONLY
 *   CATALOG_COLLECTION_HANDLE defaults to "website-catalog"
 */

type ApiRequest = { method?: string }
type ApiResponse = {
  setHeader(name: string, value: string): void
  status(code: number): ApiResponse
  json(body: unknown): void
}

const API_VERSION = '2025-07'
const PRODUCTS_PER_PAGE = 100 // keeps each query well under Shopify's cost limit
const MAX_PAGES = 7

export type CatalogPartner = {
  id: string
  name: string
  logo: string | null
}

export type CatalogProduct = {
  id: string
  handle: string
  title: string
  subtitle: string | null
  descriptionHtml: string
  image: string | null
  imageAlt: string | null
  categories: string[]
  tags: string[]
  partnerIds: string[]
}

export type CatalogPayload = {
  collectionTitle: string
  products: CatalogProduct[]
  partners: CatalogPartner[]
  truncated: boolean
  fetchedAt: string
}

const PRODUCTS_QUERY = /* GraphQL */ `
  query CatalogProducts($queryFilter: String!, $first: Int!, $cursor: String) {
    collections(first: 1, query: $queryFilter) {
      nodes {
        title
        products(first: $first, after: $cursor, sortKey: COLLECTION_DEFAULT) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            handle
            title
            descriptionHtml
            tags
            featuredImage {
              url(transform: { maxWidth: 900, maxHeight: 900 })
              altText
            }
            subtitle: metafield(namespace: "custom", key: "subtitle") {
              value
            }
            category: metafield(namespace: "custom", key: "category") {
              value
            }
            businesses: metafield(namespace: "custom", key: "businessess") {
              value
            }
          }
        }
      }
    }
  }
`

const PARTNERS_QUERY = /* GraphQL */ `
  query CatalogPartners($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Metaobject {
        id
        fields {
          key
          value
          reference {
            ... on MediaImage {
              image {
                url(transform: { maxWidth: 300 })
              }
            }
          }
        }
      }
    }
  }
`

type GqlProduct = {
  id: string
  handle: string
  title: string
  descriptionHtml: string
  tags: string[]
  featuredImage: { url: string; altText: string | null } | null
  subtitle: { value: string } | null
  category: { value: string } | null
  businesses: { value: string } | null
}

type GqlMetaobject = {
  id: string
  fields: Array<{
    key: string
    value: string | null
    reference: { image: { url: string } | null } | null
  }>
} | null

type GqlProductsPage = {
  collections: {
    nodes: Array<{
      title: string
      products: {
        pageInfo: { hasNextPage: boolean; endCursor: string | null }
        nodes: GqlProduct[]
      }
    }>
  }
}

async function shopifyGql<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN
  const token = process.env.SHOPIFY_ADMIN_TOKEN
  if (!domain || !token) {
    throw new Error('Missing SHOPIFY_STORE_DOMAIN / SHOPIFY_ADMIN_TOKEN env vars')
  }

  const res = await fetch(`https://${domain}/admin/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!res.ok) {
    throw new Error(`Shopify responded ${res.status}`)
  }

  const body = (await res.json()) as { data?: T; errors?: Array<{ message: string }> }
  if (body.errors?.length) {
    throw new Error(`Shopify GraphQL: ${body.errors.map((e) => e.message).join('; ')}`)
  }
  if (!body.data) {
    throw new Error('Shopify GraphQL: empty response')
  }
  return body.data
}

/** Parses a list metafield value — a JSON array of strings (businessess GIDs, category names). */
function parseStringList(raw: string | undefined | null): string[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : []
  } catch {
    return []
  }
}

/** Field keys mirror XtraGiftCard-NestApp's resolveBusinessMetaobjects: name + icon_image/image. */
function normalizePartner(node: GqlMetaobject): CatalogPartner | null {
  if (!node?.fields) return null
  const field = (key: string) => node.fields.find((f) => f.key === key)
  const name = field('name')?.value
  if (!name) return null
  const logo = field('icon_image')?.reference?.image?.url ?? field('image')?.reference?.image?.url ?? null
  return { id: node.id, name, logo }
}

async function fetchCatalog(): Promise<CatalogPayload> {
  const handle = process.env.CATALOG_COLLECTION_HANDLE || 'website-catalog'

  // Phase 1 — page through the collection's products (metafield value only,
  // so each page stays cheap; partner metaobjects are resolved once, deduped).
  let collectionTitle = ''
  let cursor: string | null = null
  let truncated = false
  const gqlProducts: GqlProduct[] = []

  for (let page = 0; page < MAX_PAGES; page++) {
    // explicit annotation breaks the cursor → data control-flow circularity (TS7022)
    const data: GqlProductsPage = await shopifyGql<GqlProductsPage>(PRODUCTS_QUERY, {
      queryFilter: `handle:${handle}`,
      first: PRODUCTS_PER_PAGE,
      cursor,
    })

    const collection = data.collections.nodes[0]
    if (!collection) {
      throw new Error(`Catalog collection "${handle}" not found in Shopify`)
    }

    collectionTitle = collection.title
    gqlProducts.push(...collection.products.nodes)

    if (!collection.products.pageInfo.hasNextPage) break
    cursor = collection.products.pageInfo.endCursor
    truncated = page === MAX_PAGES - 1
  }

  // Phase 2 — resolve the deduped set of partner metaobjects in batches.
  const partnerIdsByProduct = gqlProducts.map((p) => parseStringList(p.businesses?.value))
  const uniquePartnerIds = [...new Set(partnerIdsByProduct.flat())]

  const partners = new Map<string, CatalogPartner>()
  for (let i = 0; i < uniquePartnerIds.length; i += 100) {
    const batch = uniquePartnerIds.slice(i, i + 100)
    const data = await shopifyGql<{ nodes: GqlMetaobject[] }>(PARTNERS_QUERY, { ids: batch })
    for (const node of data.nodes) {
      const partner = normalizePartner(node)
      if (partner) partners.set(partner.id, partner)
    }
  }

  const products: CatalogProduct[] = gqlProducts.map((p, i) => ({
    id: p.id,
    handle: p.handle,
    title: p.title,
    subtitle: p.subtitle?.value ?? null,
    descriptionHtml: p.descriptionHtml,
    image: p.featuredImage?.url ?? null,
    imageAlt: p.featuredImage?.altText ?? null,
    categories: parseStringList(p.category?.value),
    tags: p.tags ?? [],
    partnerIds: partnerIdsByProduct[i].filter((id) => partners.has(id)),
  }))

  return {
    collectionTitle,
    products,
    partners: [...partners.values()],
    truncated,
    fetchedAt: new Date().toISOString(),
  }
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method && req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const payload = await fetchCatalog()
    // CDN-cached: content edits in Shopify show up within ~5 minutes.
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400')
    res.status(200).json(payload)
  } catch (error) {
    console.error('catalog fetch failed:', error)
    res.setHeader('Cache-Control', 'no-store')
    res.status(502).json({ error: 'Failed to load catalog' })
  }
}
