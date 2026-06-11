import { useEffect, useMemo, useState } from 'react'
import type { CatalogProduct } from '../../lib/catalog'

const CARDS = 5
const TOGGLE_MS = 2800 // time between fan-open and fan-close
const SETTLE_MS = 900 // close transition time before the deck is swapped

type Card = { image: string; title: string }

// shown while the live catalog is still loading (or empty)
const fallbackCards: Card[] = [
  { image: '/figma/br-giftcard.png', title: 'XTRA TASTY' },
  { image: '/figma/gift-fashion.png', title: 'XTRA FASHION' },
  { image: '/figma/gift-shopping.png', title: 'XTRA SHOPPING' },
]

/**
 * "מניפת הקטלוג" — a hand of live product cards that fans open and closed,
 * swapping to the next products in the deck while it is stacked.
 */
export default function CatalogCardFan({ products }: { products: CatalogProduct[] }) {
  const deck = useMemo<Card[]>(() => {
    const live = products.filter((p) => p.image).map((p) => ({ image: p.image!, title: p.title }))
    return live.length >= CARDS ? live : fallbackCards
  }, [products])

  const [open, setOpen] = useState(false)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const toggle = setInterval(() => setOpen((o) => !o), TOGGLE_MS)
    return () => clearInterval(toggle)
  }, [])

  // swap to the next hand only while the fan is closed (the stack hides the swap)
  useEffect(() => {
    if (open) return
    const swap = setTimeout(() => setOffset((x) => x + CARDS), SETTLE_MS)
    return () => clearTimeout(swap)
  }, [open])

  const hand = Array.from({ length: Math.min(CARDS, deck.length) }, (_, i) => deck[(offset + i) % deck.length])
  const mid = (hand.length - 1) / 2

  return (
    <div className="relative aspect-[4/3] w-full" dir="ltr">
      {hand.map((card, i) => {
        const spread = i - mid
        return (
          <div
            key={`${offset}-${i}`}
            className="absolute inset-x-[7%] bottom-[10%] top-[16%] origin-bottom transition-transform duration-700 ease-[cubic-bezier(0.34,1.2,0.64,1)] motion-reduce:transition-none"
            style={{
              zIndex: i,
              transitionDelay: `${(open ? i : hand.length - 1 - i) * 70}ms`,
              transform: open
                ? `rotate(${spread * 10}deg) translateY(${Math.abs(spread) * -6}px)`
                : `rotate(${spread * 1.5}deg) translateY(0px)`,
            }}
          >
            <div className="relative size-full overflow-clip rounded-[16px] border-[3px] border-white bg-white shadow-[0_24px_50px_rgba(80,89,255,0.20)]">
              <img src={card.image} alt={card.title} className="absolute inset-0 size-full object-cover" />
            </div>
          </div>
        )
      })}
    </div>
  )
}
