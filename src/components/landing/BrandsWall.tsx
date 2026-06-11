import Reveal from '../Reveal'
import ScaleStage from '../ScaleStage'
import { GiftCardRotator } from '../Brands'
import CtaButton from '../CtaButton'

/** Text column — shared by the mobile flow and the desktop canvas. */
function WallText() {
  return (
    <Reveal className="flex flex-col items-center gap-[24px] text-center lg:items-start lg:gap-[32px] lg:text-right">
      <div className="flex flex-col items-center gap-[14px] lg:items-start">
        <div className="flex items-baseline justify-center gap-[12px] lg:gap-[16px]">
          <p className="whitespace-nowrap text-[26px] font-bold leading-[1.167] text-sub-black lg:text-[46px]" dir="auto">
            איזה
          </p>
          <img src="/figma/s4-xtra-red.svg" alt="XTRA" className="h-[20px] w-auto lg:h-[30px]" />
          <p className="whitespace-nowrap text-[26px] font-bold leading-[1.167] text-sub-black lg:text-[46px]" dir="auto">
            אתם רוצים לתת?
          </p>
        </div>
      </div>
      <p className="text-[20px] leading-[1.15] text-sub-black lg:text-[28px]" dir="auto">
        בכרטיסי המולטי שלנו יש יותר
        <br />
        מ-3,500 בתי עסק, מותגים וחוויות
      </p>
      <CtaButton className="cursor-pointer rounded-full bg-primary px-[28px] py-[12px] text-[18px] font-bold leading-[1.167] text-white transition-transform hover:scale-105">
        ספרו לי עוד
      </CtaButton>
    </Reveal>
  )
}

/** Rotating gift cards — shared by the mobile flow and the desktop canvas. */
function WallCard() {
  return (
    <Reveal delay={150} className="w-full min-w-px lg:flex-1">
      <div className="relative mx-auto aspect-[660/400] w-[300px] rounded-[16px] shadow-[0_40px_60px_rgba(80,89,255,0.18)] transition-transform duration-500 hover:rotate-[-2deg] hover:scale-105 lg:w-[660px] lg:rounded-[32px]">
        <div className="absolute inset-0 overflow-clip rounded-[16px] lg:rounded-[32px]">
          <GiftCardRotator />
        </div>
      </div>
    </Reveal>
  )
}

/** "איזה XTRA אתם רוצים לתת?" — gray brands wall + black TASTY gift card. */
export default function BrandsWall() {
  return (
    <section className="relative overflow-hidden">
      {/* mobile — stacked over a dimmed wall */}
      <div className="relative lg:hidden">
        <img
          src="/figma/lp-brands-wall.png"
          alt=""
          className="pointer-events-none absolute left-1/2 top-0 h-full w-auto max-w-none -translate-x-1/2 object-cover opacity-90"
        />
        <div className="pointer-events-none absolute inset-0 bg-white/55" />
        <div className="relative flex flex-col items-center gap-[40px] px-[24px] py-[60px]">
          <WallText />
          <WallCard />
        </div>
      </div>

      {/* desktop — fixed 1920x680 Figma composition, scaled to any width */}
      <ScaleStage designWidth={1920} designHeight={680} className="hidden w-full lg:block">
        <div className="relative h-[680px] w-[1920px]">
          <img
            src="/figma/lp-brands-wall.png"
            alt=""
            className="pointer-events-none absolute left-1/2 top-0 h-[680px] w-[1604px] max-w-none -translate-x-1/2 opacity-90"
          />
          <div className="relative flex h-full items-center justify-between gap-[100px] px-[200px]">
            <WallText />
            <WallCard />
          </div>
        </div>
      </ScaleStage>
    </section>
  )
}
