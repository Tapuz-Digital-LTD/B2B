import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import ScaleStage from './ScaleStage'

const STEP_DURATION_MS = 3500

const steps = [
  {
    title: 'טוענים כסף לארנק',
    desc: 'תיאור השלב',
    icon: '/figma/sys-icon-gift-white.svg',
    iconActive: '/figma/sys-icon-gift.svg',
  },
  {
    title: 'בוחרים מתנה ממגוון האפשרויות',
    desc: 'תיאור השלב',
    icon: '/figma/sys-icon-heart.svg',
    iconActive: '/figma/sys-icon-heart-red.svg',
  },
  {
    title: 'מממשים ונהנים!',
    desc: 'תיאור השלב',
    icon: '/figma/sys-icon-party.svg',
    iconActive: '/figma/sys-icon-party-red.svg',
  },
]

function Step({ step, active, mobile }: { step: (typeof steps)[number]; active: boolean; mobile?: boolean }) {
  return (
    <div
      className={`relative flex w-full items-center justify-end overflow-visible rounded-[16px] transition-all duration-500 ${
        active
          ? 'gap-[24px] border border-[rgba(80,89,255,0.08)] bg-white py-[12px] pe-[12px] ps-[24px] drop-shadow-[0_4px_12px_rgba(6,64,171,0.04)]'
          : 'gap-[16px] bg-white/24 py-[8px] pe-[8px] ps-[24px]'
      }`}
    >
      <div
        className={`flex min-w-px flex-1 flex-col items-end justify-center gap-[8px] self-stretch text-right transition-colors duration-500 ${
          active ? 'py-[6px] text-text-main' : 'text-white'
        }`}
      >
        {/* font size stays constant on mobile so the stack height never changes */}
        <p
          className={`w-full text-[20px] font-bold leading-[1.167] transition-all duration-500 ${active && !mobile ? 'text-[24px]' : ''}`}
          dir="rtl"
        >
          {step.title}
        </p>
        <p
          className={`w-full overflow-hidden text-[16px] leading-[1.24] transition-all duration-500 ${
            active ? 'max-h-[24px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          dir="rtl"
        >
          {step.desc}
        </p>
      </div>
      <div
        className={`flex shrink-0 items-center justify-center overflow-clip transition-all duration-500 ${
          active ? `${mobile ? 'size-[56px]' : 'size-[80px]'} rounded-[12px] bg-primary/8` : 'size-[40px] rounded-[6px] bg-white/24'
        }`}
      >
        <img
          src={active ? step.iconActive : step.icon}
          alt=""
          className={`transition-all duration-500 ${active ? (mobile ? 'size-[30px]' : 'size-[40px]') : 'size-[24px]'}`}
        />
      </div>
      {/* progress rail next to the active step */}
      {active && (
        <div className="absolute -bottom-px -right-[21px] -top-px flex items-center py-[8px]">
          <div className="relative h-full w-[8px] overflow-clip rounded-full bg-white/24">
            <div
              className="absolute inset-0 origin-top rounded-full bg-white"
              style={{ animation: `xtra-rail-grow ${STEP_DURATION_MS}ms linear both` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

/** hand holding the phone with the app demo video clipped to the bezel */
function PhoneInHand() {
  return (
    <>
      <img
        src="/figma/sys-hand.png"
        alt=""
        className="absolute -left-[80px] top-[calc(50%+74px)] w-[840px] max-w-none -translate-y-1/2"
      />
      <div className="absolute left-[347px] top-[calc(50%-93px)] h-[664px] w-[356px] -translate-y-1/2">
        <img src="/figma/sys-iphone.png" alt="" className="absolute inset-0 size-full" />
        {/* app demo — drop the real clip at public/videos/app-demo.mp4; falls back to the poster frame.
            Clipped with the exact screen mask exported from Figma so it sits inside the bezel. */}
        <div
          className="absolute left-[7.1px] top-[5.9px] h-[647.7px] w-[337.7px]"
          style={{
            WebkitMaskImage: 'url(/figma/sys-screen-mask.svg)',
            maskImage: 'url(/figma/sys-screen-mask.svg)',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: '333.675px 643.987px',
            maskSize: '333.675px 643.987px',
            WebkitMaskPosition: '3.537px 1.422px',
            maskPosition: '3.537px 1.422px',
          }}
        >
          {/* the mockup photo is tilted ~2° clockwise — rotate the video to match the bezel */}
          <video className="size-full rotate-[2deg] scale-[1.07] object-cover" autoPlay muted loop playsInline poster="/figma/sys-screen.png">
            <source src="/videos/app-demo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  )
}

function TitleBlock() {
  return (
    <div className="flex flex-col items-center gap-[16px] text-center text-white lg:items-start lg:text-right">
      <p className="text-[20px] font-bold leading-[1.167]" dir="auto">
        3 קליקים ונתת אקסטרה
      </p>
      <h2 className="text-[32px] font-bold leading-[1.167] lg:text-[46px]" dir="auto">
        איך זה עובד?
      </h2>
    </div>
  )
}

export default function HowItWorks() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), STEP_DURATION_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative flex flex-col items-center px-[12px] lg:px-[200px]">
      <div className="bg-blob-pink pointer-events-none absolute left-[55%] top-[400px] -z-10 h-[1200px] w-[1470px] max-w-none" />
      <div className="bg-blob-blue pointer-events-none absolute -bottom-[500px] -left-[600px] -z-10 h-[1600px] w-[1990px] max-w-none" />

      {/* ===== mobile ===== */}
      <div className="relative w-full overflow-clip rounded-[24px] border-[8px] border-white/80 bg-primary lg:hidden">
        <div className="relative z-10 flex flex-col gap-[40px] px-[24px] py-[40px]">
          <Reveal>
            <TitleBlock />
          </Reveal>
          <Reveal delay={150}>
            {/* min-height reserves the tallest state so the section never jumps */}
            <div className="flex min-h-[280px] w-full flex-col items-end gap-[12px] ps-[8px]">
              {steps.map((step, i) => (
                <Step key={step.title} step={step} active={i === active} mobile />
              ))}
            </div>
          </Reveal>
        </div>
        <div dir="ltr" className="relative h-[440px] w-full overflow-clip">
          <div className="absolute left-1/2 top-0 h-[850px] w-[760px] origin-top -translate-x-1/2 scale-[0.55]">
            <PhoneInHand />
          </div>
        </div>
      </div>

      {/* ===== desktop — fixed 1496x676 composition, scaled to any width ===== */}
      <div className="relative hidden w-full rounded-[40px] border-[12px] border-white/80 bg-primary lg:block">
        <ScaleStage designWidth={1496} designHeight={676} className="w-full">
          <div className="relative h-[676px] w-[1496px]">
            <div className="absolute right-[96px] top-1/2 z-10 flex w-[560px] -translate-y-1/2 flex-col gap-[40px]">
              <Reveal>
                <TitleBlock />
              </Reveal>
              <Reveal delay={150}>
                <div className="flex w-full flex-col items-end gap-[12px] ps-[8px]">
                  {steps.map((step, i) => (
                    <Step key={step.title} step={step} active={i === active} />
                  ))}
                </div>
              </Reveal>
            </div>
            <div dir="ltr" className="absolute -top-[162px] left-0 h-[850px] w-[760px] overflow-clip rounded-bl-[28px]">
              <div className="relative h-[850px] w-[760px]">
                <PhoneInHand />
              </div>
            </div>
          </div>
        </ScaleStage>
      </div>
    </section>
  )
}
