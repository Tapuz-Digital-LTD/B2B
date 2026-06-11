import { useEffect, useState } from 'react'
import Reveal from './Reveal'

const CARD_DURATION_MS = 3500

/** Rotating gift-card designs inside the floating card (crossfade). */
function GiftCardRotator() {
  const [card, setCard] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCard((c) => (c + 1) % 3), CARD_DURATION_MS)
    return () => clearInterval(id)
  }, [])

  // real card designs exported from Figma
  const cards = [
    { src: '/figma/br-giftcard.png', alt: 'XTRA TASTY giftcard' },
    { src: '/figma/gift-fashion.png', alt: 'XTRA FASHION giftcard' },
    { src: '/figma/gift-shopping.png', alt: 'XTRA SHOPPING giftcard' },
  ]

  return (
    <div className="absolute inset-0 overflow-clip rounded-[9px] bg-[#040404] lg:rounded-[18px]">
      {cards.map((c, i) => (
        <img
          key={c.src}
          src={c.src}
          alt={c.alt}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
            card === i ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  )
}

/** 3x3 brand tile mosaic with floating popcorn / plane / gift-card (physical coords → dir ltr). */
function TileGrid() {
  return (
    <div dir="ltr" className="relative mx-auto grid w-full max-w-[760px] grid-cols-2 gap-[12px] lg:grid-cols-3 lg:gap-[16px]">
      <div className="relative order-2 aspect-[242/163] lg:order-1">
        <img src="/figma/br-tile-cafe.svg" alt="Cafe Cafe" className="absolute inset-0 size-full" />
      </div>
      <div className="relative order-3 aspect-[242/163] rounded-[12px] bg-[rgba(80,89,255,0.12)] lg:order-2">
        <img
          src="/figma/br-urbanica.svg"
          alt="Urbanica"
          className="absolute left-1/2 top-1/2 w-[74%] -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute -left-[45%] -top-[35%] w-[90%]">
          <div className="animate-float [animation-delay:-1.5s]">
            <img src="/figma/br-plane.png" alt="" className="w-full rotate-[3.58deg] object-contain" />
          </div>
        </div>
      </div>
      <div className="relative order-1 aspect-[242/163] rounded-[12px] bg-[rgba(80,89,255,0.12)] lg:order-3">
        <img src="/figma/br-popcorn-shadow.svg" alt="" className="absolute bottom-[6%] left-1/2 w-[51%] -translate-x-1/2" />
        <div className="absolute -bottom-[2%] left-1/2 w-[98%] -translate-x-1/2">
          <div className="animate-float">
            <img src="/figma/br-popcorn.png" alt="" className="w-full max-w-none object-contain" />
          </div>
        </div>
      </div>
      <div className="relative order-4 aspect-[242/163] overflow-visible rounded-[12px] bg-[rgba(80,89,255,0.12)]">
        <img
          src="/figma/br-steak.png"
          alt=""
          className="absolute left-[calc(50%-38px)] top-[calc(50%-58px)] w-[107%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_5px_8px_rgba(80,89,255,0.24)]"
        />
      </div>
      <div className="relative order-5 aspect-[242/163]">
        <img src="/figma/br-tile-movieland.svg" alt="Movieland" className="absolute inset-0 size-full" />
      </div>
      <div className="relative hidden aspect-[242/163] lg:order-6 lg:block">
        <img src="/figma/br-tile-island.svg" alt="Island" className="absolute inset-0 size-full" />
      </div>
      <div className="relative hidden aspect-[242/163] lg:order-7 lg:block">
        <img src="/figma/br-tile-rami.svg" alt="רמי לוי" className="absolute inset-0 size-full" />
      </div>
      <div className="relative hidden aspect-[242/163] rounded-[12px] bg-[rgba(80,89,255,0.12)] lg:order-8 lg:block">
        <img src="/figma/br-arkia.svg" alt="Arkia" className="absolute inset-0 m-auto w-[66%]" />
      </div>
      <div className="relative order-6 aspect-[242/163] lg:order-9">
        {/* gift card, overlapping toward the center */}
        <div className="absolute -left-[41%] top-[calc(50%-6px)] z-10 h-[133%] w-[147%] -translate-y-1/2 rounded-[12px] border-[3px] border-[#dfe2fa] shadow-[0_14px_22px_0_rgba(80,89,255,0.08)] transition-transform duration-500 hover:rotate-[-2deg] hover:scale-105 lg:-left-[59%] lg:top-[calc(50%-11px)] lg:h-[173%] lg:w-[190%] lg:rounded-[24px] lg:border-[5.6px] lg:shadow-[0_28px_42px_0_rgba(80,89,255,0.08)]">
          <GiftCardRotator />
        </div>
      </div>
    </div>
  )
}

export default function Brands() {
  return (
    <section className="relative flex flex-col items-center gap-[60px] px-[24px] py-[40px] lg:flex-row lg:justify-between lg:gap-[100px] lg:px-[200px] lg:py-[140px]">
      <div className="bg-blob-pink pointer-events-none absolute -top-[350px] left-[53%] -z-10 h-[1030px] w-[1415px] max-w-none" />
      <div className="bg-blob-blue pointer-events-none absolute -bottom-[150px] -left-[750px] -z-10 h-[1600px] w-[1950px] max-w-none" />

      <Reveal className="flex flex-col items-center gap-[24px] text-center lg:items-start lg:gap-[32px] lg:text-right">
        <div className="flex flex-col items-center gap-[16px] lg:items-start">
          <p className="text-[20px] font-bold leading-[1.167] text-primary" dir="auto">
            עולם של אפשרויות
          </p>
          <h2 className="text-[32px] font-bold leading-[1.167] text-sub-black lg:text-[46px]" dir="rtl">
            כל המותגים הכי
            <br />
            {'אהובים, '}
            <span className="text-primary">בארנק אחד.</span>
          </h2>
        </div>
        <p className="text-[20px] leading-[1.15] text-sub-black lg:text-[28px]" dir="auto">
          ממוצרי חשמל ועד חופשות בחו"ל, הארנק
          <br />
          של XTRA פותח דלת ל־3,500+ אפשרויות
        </p>
        <button className="cursor-pointer rounded-full bg-primary px-[28px] py-[14px] text-[18px] font-bold leading-[1.167] text-white transition-transform hover:scale-105">
          לכל בתי העסק
        </button>
      </Reveal>

      <Reveal delay={150} className="w-full min-w-px lg:flex-1">
        <TileGrid />
      </Reveal>
    </section>
  )
}
