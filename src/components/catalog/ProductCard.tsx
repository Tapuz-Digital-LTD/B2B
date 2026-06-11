import type { CatalogProduct } from '../../lib/catalog'

type ProductCardProps = {
  product: CatalogProduct
  onOpen: () => void
}

/** One catalog tile — image + title, opens the product drawer. */
export default function ProductCard({ product, onOpen }: ProductCardProps) {
  return (
    <button
      onClick={onOpen}
      className="group flex w-full cursor-pointer flex-col gap-[10px] transition-transform duration-300 hover:-translate-y-[3px]"
    >
      <div className="relative aspect-[16/10] w-full overflow-clip rounded-[12px] border border-black/5 bg-[#e8f4fa]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.imageAlt ?? product.title}
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <img src="/figma/lp-x-big.svg" alt="" className="absolute left-1/2 top-1/2 w-[40%] -translate-x-1/2 -translate-y-1/2 opacity-20" />
        )}
      </div>
      <div className="flex w-full items-center justify-between px-[4px]">
        <p className="text-[15px] leading-[1.3] text-text-main lg:text-[16px]" dir="auto">
          {product.title}
        </p>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-sub-black/50 transition-transform duration-300 group-hover:-translate-x-[2px]">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  )
}
