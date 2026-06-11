import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Reveal from '../Reveal'
import CtaButton from '../CtaButton'
import ProductCard from './ProductCard'
import ProductDrawer from './ProductDrawer'
import { ATTRIBUTE_TAGS, collectCategories, usePartnerMap } from '../../lib/catalog'
import type { CatalogPartner, CatalogProduct, CatalogState } from '../../lib/catalog'

/** Collapsible filter group for the sidebar. */
function FilterGroup({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-black/8 py-[16px]">
      <button onClick={() => setOpen(!open)} className="flex w-full cursor-pointer items-center justify-between text-right">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[16px] font-bold leading-[1.3] text-text-main">{title}</span>
      </button>
      {open && <div className="mt-[12px] flex flex-col gap-[8px]">{children}</div>}
    </div>
  )
}

function FilterOption({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-[8px] px-[12px] py-[8px] text-right text-[14px] leading-[1.3] transition-colors ${
        active ? 'bg-primary/10 font-bold text-primary' : 'text-sub-black hover:bg-black/4'
      }`}
      dir="auto"
    >
      {label}
    </button>
  )
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-[20px] min-[520px]:grid-cols-2 lg:grid-cols-4 lg:gap-[28px]">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex animate-pulse flex-col gap-[14px] rounded-[16px] bg-white p-[12px] pb-[20px] shadow-[0_8px_40px_rgba(80,89,255,0.10)]">
          <div className="aspect-[3/2] w-full rounded-[12px] bg-primary/8" />
          <div className="h-[20px] w-3/4 rounded-full bg-primary/8" />
          <div className="h-[14px] w-1/2 rounded-full bg-black/8" />
        </div>
      ))}
    </div>
  )
}

function ErrorState() {
  return (
    <div className="flex flex-col items-center gap-[16px] rounded-[24px] bg-primary/8 px-[24px] py-[60px] text-center lg:py-[80px]">
      <p className="text-[22px] font-bold leading-[1.167] text-sub-black lg:text-[28px]" dir="auto">
        הקטלוג מתרענן ממש עכשיו
      </p>
      <p className="max-w-[480px] text-[16px] leading-[1.4] text-sub-black lg:text-[18px]" dir="auto">
        לא הצלחנו להציג את המוצרים כרגע. נסו לרענן בעוד רגע — או שפשוט נדבר, ונשמח להציג לכם הכל אישית.
      </p>
      <CtaButton className="cursor-pointer rounded-full bg-primary px-[24px] py-[10px] text-[16px] font-bold leading-[1.4] text-white transition-transform hover:scale-105">
        דברו איתנו
      </CtaButton>
    </div>
  )
}

/** The live catalog: partner marquee, category chips, search and the product grid. */
export default function CatalogContent({ state }: { state: CatalogState }) {
  const data = state.status === 'ready' ? state.data : undefined
  const partnerMap = usePartnerMap(data)

  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeAttrs, setActiveAttrs] = useState<string[]>([])
  const [search, setSearch] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const products = useMemo(() => data?.products ?? [], [data])
  const categories = useMemo(() => collectCategories(products), [products])
  const availableAttrs = useMemo(() => ATTRIBUTE_TAGS.filter((attr) => products.some((p) => p.tags.includes(attr))), [products])

  const visible = useMemo(() => {
    const query = search.trim()
    const matchesQuery = (p: CatalogProduct) =>
      !query ||
      p.title.includes(query) ||
      (p.subtitle?.includes(query) ?? false) ||
      p.categories.some((c) => c.includes(query)) ||
      p.tags.some((t) => t.includes(query))
    return products.filter(
      (p) =>
        (!activeCategory || p.categories.includes(activeCategory)) &&
        activeAttrs.every((attr) => p.tags.includes(attr)) &&
        matchesQuery(p),
    )
  }, [products, activeCategory, activeAttrs, search])

  const toggleAttr = (attr: string) =>
    setActiveAttrs((prev) => (prev.includes(attr) ? prev.filter((a) => a !== attr) : [...prev, attr]))

  const partnersOf = (product: CatalogProduct): CatalogPartner[] =>
    product.partnerIds.map((id) => partnerMap.get(id)).filter((p): p is CatalogPartner => Boolean(p))

  // modal state lives in the URL (?product=handle) so products are deep-linkable
  const openHandle = searchParams.get('product')
  const openProduct = openHandle ? products.find((p) => p.handle === openHandle) : undefined

  const openModal = (handle: string) =>
    setSearchParams((prev) => {
      prev.set('product', handle)
      return prev
    })

  const closeModal = () =>
    setSearchParams((prev) => {
      prev.delete('product')
      return prev
    })

  const clearFilters = () => {
    setActiveCategory(null)
    setActiveAttrs([])
    setSearch('')
  }

  return (
    <>
      <section id="catalog-grid" className="relative scroll-mt-[68px] px-[16px] py-[60px] lg:px-[60px] lg:py-[80px]">
        <div className="mx-auto flex w-full max-w-[1520px] flex-col gap-[24px]">
          {/* search bar — top, clean and minimal */}
          {state.status === 'ready' && products.length > 0 && (
            <div className="relative mx-auto w-full max-w-[480px]">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="חיפוש בקטלוג..."
                className="h-[44px] w-full rounded-full border border-black/10 bg-white pe-[48px] ps-[20px] text-[14px] text-text-main placeholder:text-text-main/50 focus:border-black/25 focus:outline-none"
              />
              <span className="pointer-events-none absolute left-[6px] top-1/2 flex size-[32px] -translate-y-1/2 items-center justify-center rounded-full text-sub-black/50">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          )}

          {state.status === 'loading' && <SkeletonGrid />}
          {state.status === 'error' && <ErrorState />}

          {state.status === 'ready' && products.length === 0 && (
            <div className="flex flex-col items-center gap-[16px] rounded-[24px] bg-primary/8 px-[24px] py-[60px] text-center lg:py-[80px]">
              <p className="text-[22px] font-bold leading-[1.167] text-sub-black lg:text-[28px]" dir="auto">
                הקטלוג בעדכון — חוזרים ממש בקרוב
              </p>
              <p className="max-w-[480px] text-[16px] leading-[1.4] text-sub-black lg:text-[18px]" dir="auto">
                בינתיים נשמח לספר לכם הכל אישית ולהתאים לכם פתרון.
              </p>
              <CtaButton className="cursor-pointer rounded-full bg-primary px-[24px] py-[10px] text-[16px] font-bold leading-[1.4] text-white transition-transform hover:scale-105">
                דברו איתנו
              </CtaButton>
            </div>
          )}

          {state.status === 'ready' && products.length > 0 && (
            <div className="flex flex-col gap-[32px] lg:flex-row lg:items-start lg:gap-[48px]">
              {/* sidebar filters — desktop only */}
              <aside className="hidden w-[220px] shrink-0 lg:sticky lg:top-[88px] lg:block" dir="rtl">
                <p className="mb-[8px] text-[18px] font-bold text-text-main">סינון לפי</p>
                <div className="border-t-2 border-text-main">
                  <FilterGroup title="קטגוריה">
                    <FilterOption label="הכל" active={activeCategory === null} onClick={() => setActiveCategory(null)} />
                    {categories.map((cat) => (
                      <FilterOption
                        key={cat}
                        label={cat}
                        active={activeCategory === cat}
                        onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                      />
                    ))}
                  </FilterGroup>

                  {availableAttrs.length > 0 && (
                    <FilterGroup title="אזור">
                      {availableAttrs.map((attr) => (
                        <FilterOption
                          key={attr}
                          label={attr}
                          active={activeAttrs.includes(attr)}
                          onClick={() => toggleAttr(attr)}
                        />
                      ))}
                    </FilterGroup>
                  )}
                </div>
              </aside>

              {/* product grid */}
              <div className="min-w-0 flex-1">
                {/* mobile filter button */}
                <div className="mb-[16px] flex items-center justify-between lg:hidden">
                  <button
                    onClick={() => setFilterOpen(true)}
                    className="flex cursor-pointer items-center gap-[6px] rounded-full border border-black/10 bg-white px-[14px] py-[8px] text-[14px] text-text-main shadow-sm"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M3 6h18M7 12h10M10 18h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    סינון
                    {(activeCategory || activeAttrs.length > 0) && (
                      <span className="flex size-[18px] items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                        {(activeCategory ? 1 : 0) + activeAttrs.length}
                      </span>
                    )}
                  </button>
                </div>

                {visible.length > 0 ? (
                  <div className="grid grid-cols-2 gap-[14px] lg:grid-cols-3 lg:gap-[24px]">
                    {visible.map((product, i) => (
                      <Reveal key={product.id} delay={(i % 3) * 60} className="flex">
                        <ProductCard product={product} onOpen={() => openModal(product.handle)} />
                      </Reveal>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-[12px] rounded-[24px] bg-primary/8 px-[24px] py-[48px] text-center">
                    <p className="text-[20px] font-bold leading-[1.2] text-sub-black lg:text-[24px]" dir="auto">
                      לא מצאנו מוצר שמתאים לחיפוש הזה
                    </p>
                    <button onClick={clearFilters} className="cursor-pointer text-[16px] font-bold text-primary underline-offset-4 hover:underline">
                      נקו את הסינון והתחילו מחדש
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {openProduct && <ProductDrawer product={openProduct} partners={partnersOf(openProduct)} onClose={closeModal} />}

      {/* mobile filter drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div onClick={() => setFilterOpen(false)} className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[24px] bg-white px-[28px] pb-[40px] pt-[24px] shadow-[0_-10px_40px_rgba(0,0,0,0.12)]" dir="rtl">
            <div className="mb-[16px] flex items-center justify-between">
              <p className="text-[18px] font-bold text-text-main">סינון לפי</p>
              <button onClick={() => setFilterOpen(false)} className="cursor-pointer text-[14px] font-bold text-primary">סגור</button>
            </div>
            <FilterGroup title="קטגוריה">
              <FilterOption label="הכל" active={activeCategory === null} onClick={() => { setActiveCategory(null); setFilterOpen(false) }} />
              {categories.map((cat) => (
                <FilterOption
                  key={cat}
                  label={cat}
                  active={activeCategory === cat}
                  onClick={() => { setActiveCategory(activeCategory === cat ? null : cat); setFilterOpen(false) }}
                />
              ))}
            </FilterGroup>
            {availableAttrs.length > 0 && (
              <FilterGroup title="אזור">
                {availableAttrs.map((attr) => (
                  <FilterOption
                    key={attr}
                    label={attr}
                    active={activeAttrs.includes(attr)}
                    onClick={() => { toggleAttr(attr); setFilterOpen(false) }}
                  />
                ))}
              </FilterGroup>
            )}
          </div>
        </div>
      )}
    </>
  )
}
