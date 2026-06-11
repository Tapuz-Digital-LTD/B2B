import { useEffect, useMemo, useState } from 'react'

/* Response contract of GET /api/catalog — keep in sync with api/catalog.ts */

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

export type CatalogState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; data: CatalogPayload }

export function useCatalog(): CatalogState {
  const [state, setState] = useState<CatalogState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/catalog', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`catalog responded ${res.status}`)
        return res.json() as Promise<CatalogPayload>
      })
      .then((data) => setState({ status: 'ready', data }))
      .catch((err) => {
        if (controller.signal.aborted) return
        console.error('catalog load failed:', err)
        setState({ status: 'error' })
      })
    return () => controller.abort()
  }, [])

  return state
}

/** Partner lookup map, so products can resolve partnerIds in O(1). */
export function usePartnerMap(data: CatalogPayload | undefined) {
  return useMemo(() => {
    const map = new Map<string, CatalogPartner>()
    data?.partners.forEach((p) => map.set(p.id, p))
    return map
  }, [data])
}

/**
 * Attribute tags — the few curated tags that live inside the SEO tag dump and
 * mark real product traits. They power the quick filters and the card badges.
 */
export const ATTRIBUTE_TAGS = ['מימוש אונליין', 'כשר', 'כשר למהדרין'] as const

export function productAttributes(product: CatalogProduct): string[] {
  return ATTRIBUTE_TAGS.filter((attr) => product.tags.includes(attr))
}

/**
 * Unique categories across the catalog, most-used first — these become the chips.
 * Categories come from the product's custom.category metafield (the tags field
 * is an SEO keyword dump, so it only feeds free-text search and attribute badges).
 */
export function collectCategories(products: CatalogProduct[]): string[] {
  const counts = new Map<string, number>()
  for (const product of products) {
    for (const category of product.categories) {
      counts.set(category, (counts.get(category) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'he'))
    .map(([category]) => category)
}
