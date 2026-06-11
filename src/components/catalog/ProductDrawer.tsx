import { useEffect, useRef, useState } from 'react'
import { useDragScroll } from '../../lib/useDragScroll'
import type { CatalogPartner, CatalogProduct } from '../../lib/catalog'

const EXIT_MS = 300

type ProductDrawerProps = {
  product: CatalogProduct
  partners: CatalogPartner[]
  onClose: () => void
}

/** Full-height product drawer, sliding in from the right (deep-linked via ?product=handle). */
export default function ProductDrawer({ product, partners, onClose }: ProductDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  // mount closed → animate in on the next frame
  useEffect(() => {
    const raf = requestAnimationFrame(() => setOpen(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const close = () => {
    setOpen(false)
    setTimeout(onClose, EXIT_MS)
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // unlock body scroll first, then glide down to the leads form
  const goToForm = () => {
    close()
    setTimeout(() => document.getElementById('leads-form')?.scrollIntoView({ behavior: 'smooth' }), EXIT_MS)
  }

  const partnersScroll = useDragScroll<HTMLDivElement>()

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={product.title}>
      {/* backdrop */}
      <div
        onClick={close}
        className={`absolute inset-0 bg-text-main/45 backdrop-blur-[2px] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* panel — slides in from the right edge */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col overflow-hidden rounded-l-[20px] bg-white shadow-[-40px_0_90px_rgba(33,37,41,0.30)] outline-none transition-transform duration-300 ease-out lg:max-w-[470px] lg:rounded-l-[24px] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* product image — a gift-card style image in normal flow, inset from the edges */}
        <div className="relative shrink-0 px-[20px] pt-[20px] lg:px-[26px] lg:pt-[24px]">
          {product.image ? (
            <img
              src={product.image}
              alt={product.imageAlt ?? product.title}
              className="aspect-[660/400] w-full rounded-[16px] border border-black/8 object-cover shadow-[0_18px_40px_rgba(80,89,255,0.18)]"
            />
          ) : (
            <div className="flex aspect-[660/400] w-full items-center justify-center rounded-[16px] border border-black/8 bg-primary/8">
              <img src="/figma/lp-x-big.svg" alt="" className="w-[22%] opacity-30" />
            </div>
          )}
          <button
            onClick={close}
            aria-label="סגירה"
            className="absolute left-[30px] top-[30px] flex size-[34px] cursor-pointer items-center justify-center rounded-full border border-black/12 bg-white/90 backdrop-blur-sm transition-transform hover:scale-110 lg:left-[36px] lg:top-[34px]"
          >
            <img src="/figma/lp-faq-plus.svg" alt="" className="size-[12px] rotate-45" />
          </button>
        </div>

        {/* scrollable details */}
        <div className="flex min-h-px flex-1 flex-col gap-[20px] overflow-y-auto px-[20px] py-[24px] lg:px-[26px] lg:py-[28px]">
          <div className="flex flex-col gap-[12px]">
            <h3 className="text-[20px] font-bold leading-[1.2] text-text-main lg:text-[23px]" dir="rtl">
              {product.title}
            </h3>
            {product.subtitle && (
              <p className="text-[14px] leading-[1.35] text-sub-black lg:text-[15px]" dir="rtl">
                {product.subtitle}
              </p>
            )}
          </div>

          {product.descriptionHtml && (
            <div
              dir="rtl"
              className="border-t border-black/8 pt-[16px] text-[13.5px] leading-[1.55] text-sub-black lg:text-[14.5px] [&_a]:text-blue [&_a]:underline [&_h3]:mb-[4px] [&_h3]:text-[15px] [&_h3]:font-bold [&_h3]:text-text-main [&_li]:mb-[3px] [&_ol]:list-decimal [&_ol]:ps-[18px] [&_p]:mb-[8px] [&_ul]:list-disc [&_ul]:ps-[18px]"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          )}

          {partners.length > 0 && (
            <div className="flex flex-col gap-[10px] rounded-[14px] bg-blue/8 p-[14px]">
              <p className="text-[14px] font-bold leading-[1.2] text-text-main lg:text-[15px]" dir="rtl">
                איפה מממשים את המתנה?
              </p>
              {/* horizontal scroll in stacked rows — drag with the mouse, keeps long partner lists compact */}
              <div
                dir="rtl"
                ref={partnersScroll.ref}
                {...partnersScroll.handlers}
                className={`grid auto-cols-max cursor-grab select-none grid-flow-col gap-[6px] overflow-x-auto pb-[8px] active:cursor-grabbing [scrollbar-color:rgba(80,89,255,0.35)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-blue/30 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-[5px] ${
                  partners.length > 18 ? 'grid-rows-3' : partners.length > 6 ? 'grid-rows-2' : 'grid-rows-1'
                }`}
              >
                {partners.map((partner) => (
                  <span key={partner.id} className="flex items-center gap-[6px] rounded-full border border-black/8 bg-white py-[3px] pe-[10px] ps-[4px]">
                    {partner.logo ? (
                      <img src={partner.logo} alt="" loading="lazy" className="size-[20px] rounded-full bg-white object-contain p-[1.5px]" />
                    ) : (
                      <span className="size-[20px] rounded-full bg-primary/12" />
                    )}
                    <span className="whitespace-nowrap text-[12px] leading-[1.2] text-text-main" dir="auto">
                      {partner.name}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* sticky CTA footer */}
        <div className="flex shrink-0 items-center justify-between gap-[10px] border-t border-black/12 bg-white/95 px-[20px] py-[12px] backdrop-blur-md lg:px-[26px]">
          <p className="text-[14px] font-bold leading-[1.25] text-text-main lg:text-[15px]" dir="rtl">
            רוצים לתת את זה בארגון?
          </p>
          <button
            onClick={goToForm}
            className="shrink-0 cursor-pointer rounded-full bg-primary px-[20px] py-[8px] text-[14px] font-bold leading-[1.4] text-white transition-transform hover:scale-105"
          >
            דברו איתנו
          </button>
        </div>
      </div>
    </div>
  )
}
