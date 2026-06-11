import PhoneMockup from './PhoneMockup'

type MiniCardProps = {
  img: string
  label: string
  imgClass: string
  bg: string
  className?: string
}

/** Small floating app-card (polaroid style) like in the Figma hero. */
function MiniCard({ img, label, imgClass, bg, className = '' }: MiniCardProps) {
  return (
    <div
      className={`flex flex-col items-center overflow-clip rounded-[9px] border-[0.9px] border-[rgba(80,89,255,0.08)] bg-white px-[4px] pt-[4px] shadow-[0_24px_41px_0_rgba(80,89,255,0.16)] ${className}`}
    >
      <div className={`relative min-h-px w-full flex-1 overflow-clip rounded-[4px] ${bg}`}>
        <img src={img} alt="" className={imgClass} />
      </div>
      <div className="flex h-[34px] w-full shrink-0 items-center justify-between px-[8px]">
        <span className="text-[12px] font-bold text-primary">‹</span>
        <p className="text-[13px] tracking-[0.14px] text-text-main" dir="auto">
          {label}
        </p>
      </div>
    </div>
  )
}

type FloatProps = {
  pop: [number, number]
  delay: number
  drift?: number
  className?: string
  children: React.ReactNode
}

/** Positioned wrapper: pops out of the phone once, then floats forever. */
function Float({ pop, delay, drift = 0, className = '', children }: FloatProps) {
  return (
    <div className={`absolute ${className}`}>
      <div
        className="animate-pop-out"
        style={{ '--pop-x': `${pop[0]}px`, '--pop-y': `${pop[1]}px`, animationDelay: `${delay}s` } as React.CSSProperties}
      >
        <div className="animate-float" style={{ animationDelay: `${drift}s` }}>
          {children}
        </div>
      </div>
    </div>
  )
}

/** The goodies that fly out of the phone (physical coords → dir ltr). */
function Floats() {
  return (
    <>
      {/* matzah — top right of the phone in RTL view (physical top-left) */}
      <Float pop={[298, 240]} delay={0.15} className="left-[10px] top-[20px] w-[80px] lg:left-[140px] lg:top-[40px] lg:w-[140px]">
        <img src="/figma/hero-matzah.png" alt="" className="w-full -rotate-[10deg] drop-shadow-[0_24px_41px_rgba(80,89,255,0.16)]" />
      </Float>

      {/* pomegranate — cropped out of the wallet sprite */}
      <Float pop={[-327, 175]} delay={0.25} drift={-1.1} className="left-[268px] top-[60px] w-[70px] lg:left-[780px] lg:top-[120px] lg:w-[110px]">
        <div className="relative aspect-[86/92] w-full overflow-hidden drop-shadow-[0_24px_41px_rgba(80,89,255,0.24)]">
          <img
            src="/figma/hero-wallet3d.png"
            alt=""
            className="absolute left-[-407%] top-[-62%] w-[600%] max-w-none"
          />
        </div>
      </Float>

      {/* birthday cake */}
      <Float pop={[348, 105]} delay={0.35} drift={-2.2} className="left-[2px] top-[140px] w-[100px] lg:left-[75px] lg:top-[160px] lg:w-[170px]">
        <img src="/figma/hero-cake.png" alt="" className="w-full rotate-[8deg] drop-shadow-[0_24px_41px_rgba(80,89,255,0.4)]" />
      </Float>

      {/* red X sparkle */}
      <Float pop={[-339, -2]} delay={0.45} drift={-3.1} className="left-[278px] top-[210px] w-[55px] lg:left-[795px] lg:top-[300px] lg:w-[105px]">
        <img src="/figma/hero-x-graphic.svg" alt="" className="w-full" />
      </Float>

      {/* suitcase mini card — "פנאי ובילוי" */}
      <Float pop={[208, -60]} delay={0.55} drift={-1.7} className="hidden lg:left-[205px] lg:top-[285px] lg:block">
        <MiniCard
          img="/figma/hero-card-balloon.png"
          label="פנאי ובילוי"
          bg="bg-[rgba(247,65,75,0.12)]"
          imgClass="absolute left-[27%] top-[6%] h-[88%] w-[46%] object-contain"
          className="h-[245px] w-[190px] -rotate-[3deg]"
        />
      </Float>

      {/* vacation polaroid — "חופשה" */}
      <Float pop={[-294, -115]} delay={0.65} drift={-2.7} className="left-[238px] top-[275px] lg:left-[722px] lg:top-[355px]">
        <div className="origin-top-left scale-[0.7] lg:scale-100">
          <MiniCard
            img="/figma/hero-card-vacation.png"
            label="חופשה"
            bg="bg-[rgba(255,115,45,0.12)]"
            imgClass="absolute left-[6%] top-[11%] h-[91%] w-[88%] object-contain"
            className="h-[245px] w-[175px] rotate-[4deg]"
          />
        </div>
      </Float>
    </>
  )
}

export default function Hero() {
  return (
    <section className="flex flex-col items-center px-[12px] pt-[68px] lg:px-[24px]">
      <div className="relative h-[700px] w-full overflow-clip rounded-[24px] border border-primary/15 bg-primary/12">
        {/* plus pattern at the bottom */}
        <div className="xtra-pattern pointer-events-none absolute inset-x-0 bottom-0 h-[296px]" />

        {/* ===== mobile layout ===== */}
        <div className="flex h-full flex-col items-center lg:hidden">
          <div className="animate-fade-up flex w-full flex-col items-center gap-[16px] px-[24px] pt-[32px]">
            <div className="flex w-full flex-col items-center gap-[8px]">
              <div className="flex items-center justify-center gap-[8px]">
                <p className="whitespace-nowrap text-[29px] font-bold leading-[1.167] text-primary" dir="auto">
                  מרגישים שנתת
                </p>
                <img src="/figma/xtra-logo-full.svg" alt="XTRA." className="h-[22px] w-auto" />
              </div>
              <p className="w-full text-center text-[29px] font-bold leading-[1.1] text-text-main" dir="auto">
                הכירו את הארנק הדיגיטלי
              </p>
            </div>
            <p className="w-full text-center text-[18px] leading-[1.2] text-black" dir="auto">
              לא עוד שובר ששוכחים במייל. הארנק של XTRA הוא המקום שבו המתנות שלכם הופכות לחוויות בלתי נשכחות, עם חופש
              בחירה מוחלט ושקט נפשי למעסיק.
            </p>
            <button className="cursor-pointer rounded-full bg-primary px-[16px] py-[6px] text-[15px] font-bold uppercase leading-[26px] tracking-[0.46px] text-white">
              אני רוצה לתת XTRA
            </button>
          </div>
          <div dir="ltr" className="relative mt-[16px] min-h-px w-full flex-1">
            <div className="absolute left-1/2 top-[8px] h-[604px] w-[278px] -translate-x-1/2">
              <div className="origin-top-left scale-[0.6033]">
                <PhoneMockup />
              </div>
            </div>
            <Floats />
          </div>
        </div>

        {/* ===== desktop layout ===== */}
        <div className="hidden h-full lg:block">
          {/* text block — right half; items-start = the right edge in RTL */}
          <div className="absolute left-[calc(50%+95px)] top-1/2 flex w-[640px] -translate-y-1/2 flex-col items-start justify-center gap-[28px] pe-[40px] xl:left-auto xl:right-[85px] [&>*]:animate-fade-up [&>*:nth-child(2)]:[animation-delay:150ms] [&>*:nth-child(3)]:[animation-delay:300ms]">
            <div className="flex flex-col items-start justify-center gap-[14px]">
              <div className="flex items-center justify-center gap-[12px]">
                <p
                  className="whitespace-nowrap text-right text-[44px] font-bold leading-[1.167] tracking-[-1px] text-primary xl:text-[54px]"
                  dir="auto"
                >
                  מרגישים שנתת
                </p>
                <img src="/figma/xtra-logo-full.svg" alt="XTRA." className="h-[32px] w-auto xl:h-[38px]" />
              </div>
              <p
                className="whitespace-nowrap text-right text-[44px] font-bold leading-[1.167] tracking-[-1px] text-text-main xl:text-[54px]"
                dir="auto"
              >
                הכירו את הארנק הדיגיטלי
              </p>
            </div>
            <p className="w-[540px] text-right text-[26px] leading-[1.15] text-text-main xl:text-[30px]" dir="auto">
              לא עוד שובר ששוכחים במייל. הארנק של XTRA הוא המקום שבו המתנות שלכם הופכות לחוויות בלתי נשכחות, עם חופש
              בחירה מוחלט ושקט נפשי למעסיק.
            </p>
            <button className="cursor-pointer rounded-full bg-primary px-[28px] py-[14px] text-[18px] font-bold leading-[1.167] text-white transition-transform hover:scale-105">
              אני רוצה לתת XTRA
            </button>
          </div>

          {/* image container — left half */}
          <div dir="ltr" className="absolute -left-px -top-px h-[700px] w-[1017px] overflow-clip rounded-[22px]">
            <div className="absolute left-1/2 top-[65px] -translate-x-1/2">
              <div className="animate-fade-up">
                <PhoneMockup />
              </div>
            </div>
            <Floats />
          </div>
        </div>
      </div>
    </section>
  )
}
