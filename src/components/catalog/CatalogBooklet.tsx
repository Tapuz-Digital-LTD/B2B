import { useEffect, useMemo, useState } from 'react'
import type { CatalogProduct } from '../../lib/catalog'

const FLIP_MS = 900
const PAGE_INTERVAL_MS = 3400
const MAX_PAGES = 6

type Page = { image: string; title: string; category: string | null }

// shown while the live catalog is still loading (or empty)
const fallbackPages: Page[] = [
  { image: '/figma/br-giftcard.png', title: 'XTRA TASTY', category: null },
  { image: '/figma/gift-fashion.png', title: 'XTRA FASHION', category: null },
  { image: '/figma/gift-shopping.png', title: 'XTRA SHOPPING', category: null },
]

function PageFace({ page }: { page: Page }) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-clip rounded-[18px] border border-black/8 bg-white shadow-[0_30px_60px_rgba(80,89,255,0.18)]">
      <div className="relative min-h-px flex-1 bg-primary/8">
        <img src={page.image} alt="" className="absolute inset-0 size-full object-cover" />
      </div>
      <div className="flex h-[64px] shrink-0 items-center justify-between gap-[10px] bg-white px-[16px]" dir="rtl">
        <p className="min-w-px flex-1 truncate text-[16px] font-bold leading-[1.25] text-text-main" dir="rtl">
          {page.title}
        </p>
        {page.category && (
          <span className="shrink-0 rounded-full bg-primary/8 px-[10px] py-[3px] text-[13px] font-bold leading-[1.4] text-primary" dir="auto">
            {page.category}
          </span>
        )}
      </div>
    </div>
  )
}

/**
 * "חוברת הקטלוג" — a live booklet that leafs through real catalog products:
 * stacked page edges, an auto page-flip around the spine (right, like a Hebrew
 * booklet), divider tabs and a brand bookmark ribbon.
 */
export default function CatalogBooklet({ products }: { products: CatalogProduct[] }) {
  const pages = useMemo<Page[]>(() => {
    const live = products
      .filter((p) => p.image)
      .slice(0, MAX_PAGES)
      .map((p) => ({ image: p.image!, title: p.title, category: p.categories[0] ?? null }))
    return live.length >= 2 ? live : fallbackPages
  }, [products])

  const [current, setCurrent] = useState(0)
  const [flipping, setFlipping] = useState(false)

  useEffect(() => setCurrent(0), [pages])

  useEffect(() => {
    const cycle = setInterval(() => {
      setFlipping(true)
      const swap = setTimeout(() => {
        setCurrent((c) => (c + 1) % pages.length)
        setFlipping(false)
      }, FLIP_MS)
      return () => clearTimeout(swap)
    }, PAGE_INTERVAL_MS)
    return () => clearInterval(cycle)
  }, [pages.length])

  const next = (current + 1) % pages.length

  return (
    <div className="relative aspect-[4/3] w-full [perspective:1600px]" dir="rtl">
      {/* divider tabs peeking out of the page edge (away from the spine) */}
      <div className="absolute -left-[11px] top-[22%] h-[34px] w-[16px] rounded-s-[8px] bg-primary shadow-[0_4px_10px_rgba(33,37,41,0.15)]" />
      <div className="absolute -left-[11px] top-[44%] h-[34px] w-[16px] rounded-s-[8px] bg-blue shadow-[0_4px_10px_rgba(33,37,41,0.15)]" />
      <div className="absolute -left-[11px] top-[66%] h-[34px] w-[16px] rounded-s-[8px] bg-[#ffd446] shadow-[0_4px_10px_rgba(33,37,41,0.15)]" />

      {/* stacked page edges */}
      <div className="absolute inset-0 -translate-x-[7px] translate-y-[7px] rounded-[18px] border border-black/8 bg-white" />
      <div className="absolute inset-0 -translate-x-[3.5px] translate-y-[3.5px] rounded-[18px] border border-black/8 bg-white" />

      {/* the page underneath — revealed as the top page turns */}
      <PageFace page={pages[next]} />

      {/* the top page — flips around the spine */}
      <div className={flipping ? 'animate-page-flip absolute inset-0' : 'absolute inset-0'}>
        <PageFace page={pages[current]} />
      </div>

      {/* brand bookmark ribbon over the top edge */}
      <div className="absolute -top-[8px] right-[40px] z-10 h-[54px] w-[28px] bg-primary drop-shadow-[0_6px_8px_rgba(33,37,41,0.18)] [clip-path:polygon(0_0,100%_0,100%_100%,50%_82%,0_100%)] lg:h-[66px] lg:w-[34px]" />
    </div>
  )
}
