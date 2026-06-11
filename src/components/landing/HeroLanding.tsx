import ScaleStage from '../ScaleStage'
import CtaButton from '../CtaButton'

/** Gift notification toast floating next to the girl (physical coords → dir ltr). */
function GiftAlert({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`} dir="rtl">
      <div className="relative flex items-center gap-[16px] rounded-[8px] border border-[rgba(80,89,255,0.08)] bg-white py-[4px] pe-[24px] ps-[4px] drop-shadow-[0_8.3px_11px_rgba(0,0,0,0.08)]">
        <div className="relative size-[52px] shrink-0 overflow-visible rounded-[3px] bg-[rgba(255,212,70,0.5)]">
          <img src="/figma/lp-gift-matzah.png" alt="" className="absolute -left-[8px] -top-[10px] w-[68px] max-w-none" />
        </div>
        <div className="flex flex-col items-start justify-center gap-[2px] text-text-main">
          <p className="text-[20px] font-bold leading-[1.4]" dir="auto">
            חג פסח שמח!
          </p>
          <p className="text-[14px] leading-[1.4]" dir="auto">
            קיבלת מתנה מהמעסיק
          </p>
        </div>
        <div className="animate-ping-badge absolute -top-[14px] left-[-12px] flex size-[30px] items-center justify-center rounded-full bg-primary text-[18px] font-semibold text-white">
          1
        </div>
      </div>
    </div>
  )
}

/** pop-in entrance + endless float */
function Pop({ delay, drift = 0, className = '', children }: { delay: number; drift?: number; className?: string; children: React.ReactNode }) {
  return (
    <div className={`absolute ${className}`}>
      <div className="animate-pop-in" style={{ animationDelay: `${delay}s` }}>
        <div className="animate-float" style={{ animationDelay: `${drift}s` }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default function HeroLanding() {
  return (
    <section className="flex flex-col items-center px-[12px] pt-[68px] lg:px-[24px]">
      <div className="relative w-full overflow-clip rounded-[24px] border border-primary/15 bg-primary/12">
        <div className="xtra-pattern pointer-events-none absolute inset-x-0 bottom-0 h-[296px]" />

        {/* ===== mobile layout — exact 351x700 Figma composition, scaled to width ===== */}
        <ScaleStage designWidth={351} designHeight={700} className="w-full lg:hidden">
          <div className="relative h-[700px] w-[351px]">
            {/* image layer (physical coords) */}
            <div dir="ltr" className="absolute inset-0 overflow-clip">
              {/* hanging matzah on its string */}
              <div className="animate-sway absolute left-[-48px] top-[-85px] h-[655px] w-[232px]">
                <div className="absolute left-[114px] top-0 h-[331px] w-[2px] bg-[#d9b991]" />
                <img src="/figma/lp-matzah-big.png" alt="" className="absolute left-0 top-[304px] w-[232px]" />
              </div>
              {/* girl — centered, flipped like the design */}
              <div className="absolute bottom-[-34px] left-[calc(50%+0.5px)] h-[408px] w-[254px] -translate-x-1/2 -scale-x-100 overflow-hidden">
                <img
                  src="/figma/lp-girl.png"
                  alt=""
                  className="absolute -left-[137%] -top-[5%] h-[105%] w-[252%] max-w-none object-cover"
                />
              </div>
              {/* red X behind the girl's side */}
              <Pop delay={0.3} className="left-[227px] top-[476px] w-[140px]">
                <img src="/figma/lp-x-big.svg" alt="" className="w-full" />
              </Pop>
              {/* gifts */}
              <Pop delay={0.45} drift={-2} className="right-[29px] top-[326px] w-[47px]">
                <img src="/figma/lp-gifts.png" alt="" className="w-full" />
              </Pop>
              {/* gift alert */}
              <GiftAlert className="animate-fade-up absolute left-1/2 top-[584px] w-[293px] -translate-x-1/2 [animation-delay:600ms]" />
            </div>

            {/* text layer */}
            <div className="animate-fade-up absolute inset-x-0 top-[73px] flex flex-col items-center gap-[20px] px-[24px]">
              <div className="flex flex-col items-center gap-[14px]">
                <p className="whitespace-nowrap text-[22px] font-bold leading-[1.167] text-text-main" dir="auto">
                  בפסח הזה כולם יהיו
                </p>
                <div className="flex items-center justify-center gap-[12px]">
                  <img src="/figma/s4-xtra-red.svg" alt="XTRA" className="h-[20px] w-auto" />
                  <p className="whitespace-nowrap text-[22px] font-bold leading-[1.167] text-sub-black" dir="auto">
                    מרוצים!
                  </p>
                </div>
              </div>
              <p className="text-center text-[17px] leading-[1.2] text-black" dir="auto">
                שואב אבק, שופינג או יום פינוק?
                <br />
                עם XTRA גיפטקארד כולם מקבלים
                <br />
                בדיוק מה שהם רוצים
              </p>
              <CtaButton className="cursor-pointer rounded-full bg-primary px-[28px] py-[8px] text-[15px] font-bold leading-[1.4] text-white">
                ספרו לי עוד
              </CtaButton>
            </div>
          </div>
        </ScaleStage>

        {/* ===== desktop layout — fixed 1872x700 composition, scaled to any width ===== */}
        <ScaleStage designWidth={1872} designHeight={700} className="hidden w-full lg:block">
          <div className="relative h-[700px] w-[1872px]">
            {/* text — right side */}
            <div className="absolute right-[85px] top-1/2 flex w-[560px] -translate-y-1/2 flex-col items-start justify-center gap-[28px] [&>*]:animate-fade-up [&>*:nth-child(2)]:[animation-delay:150ms] [&>*:nth-child(3)]:[animation-delay:300ms]">
              <div className="flex flex-col items-start justify-center gap-[14px]">
                <p className="whitespace-nowrap text-right text-[54px] font-bold leading-[1.167] tracking-[-1px] text-text-main" dir="auto">
                  בפסח הזה כולם יהיו
                </p>
                <div className="flex items-center justify-center gap-[16px]">
                  <img src="/figma/s4-xtra-red.svg" alt="XTRA" className="h-[34px] w-auto" />
                  <p className="whitespace-nowrap text-right text-[54px] font-bold leading-[1.167] tracking-[-1px] text-sub-black" dir="auto">
                    מרוצים!
                  </p>
                </div>
              </div>
              <p className="text-right text-[30px] leading-[1.15] text-black" dir="auto">
                שואב אבק, שופינג או יום פינוק?
                <br />
                עם XTRA גיפטקארד כולם מקבלים
                <br />
                בדיוק מה שהם רוצים
              </p>
              <CtaButton className="cursor-pointer rounded-full bg-primary px-[28px] py-[14px] text-[18px] font-bold leading-[1.167] text-white transition-transform hover:scale-105">
                ספרו לי עוד
              </CtaButton>
            </div>

            {/* image — left side */}
            <div dir="ltr" className="absolute -left-px -top-px h-[700px] w-[1060px] overflow-clip">
              {/* hanging matzah, swaying on its string */}
              <div className="animate-sway absolute left-[42px] -top-[2px] h-[652px] w-[232px]">
                <div className="absolute left-[113px] top-0 h-[300px] w-[2.5px] bg-[#d9b991]" />
                <img src="/figma/lp-matzah-big.png" alt="" className="absolute left-0 top-[301px] w-[232px]" />
              </div>
              {/* girl with phone */}
              <div className="absolute bottom-[-57px] left-[199px] h-[691px] w-[430px] -scale-x-100 overflow-hidden">
                <img
                  src="/figma/lp-girl.png"
                  alt=""
                  className="absolute -left-[137%] -top-[5%] h-[105%] w-[252%] max-w-none object-cover"
                />
              </div>
              {/* floating goodies popping in */}
              <Pop delay={0.25} className="left-[553px] top-[436px] w-[225px]">
                <img src="/figma/lp-x-big.svg" alt="" className="w-full" />
              </Pop>
              <Pop delay={0.4} drift={-1.6} className="left-[469px] top-[196px] w-[108px]">
                <img src="/figma/lp-star.svg" alt="" className="w-full" />
              </Pop>
              <Pop delay={0.55} className="left-[813px] top-[453px] w-[18px]">
                <img src="/figma/lp-dot.svg" alt="" className="w-full" />
              </Pop>
              <Pop delay={0.5} drift={-2.8} className="right-[212px] top-[9px] w-[86px]">
                <img src="/figma/lp-gifts.png" alt="" className="w-full" />
              </Pop>
              <GiftAlert className="animate-fade-up absolute left-[652px] top-[225px] w-[277px] [animation-delay:700ms]" />
            </div>
          </div>
        </ScaleStage>
      </div>
    </section>
  )
}
