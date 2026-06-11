import Reveal from '../Reveal'
import CtaButton from '../CtaButton'

/** "המערכת המתקדמת שלנו" — dashboard showcase. */
export default function SystemShowcase() {
  return (
    <section className="relative flex flex-col items-center gap-[40px] px-[16px] py-[60px] lg:px-[200px] lg:py-[80px]">
      <div className="bg-blob-pink pointer-events-none absolute -bottom-[300px] left-[55%] -z-10 h-[1230px] w-[1480px] max-w-none" />
      <div className="bg-blob-blue pointer-events-none absolute -left-[700px] top-[200px] -z-10 h-[1800px] w-[1990px] max-w-none" />

      <Reveal>
        <div className="flex flex-col items-center gap-[24px] text-center">
          <div className="flex flex-col items-center gap-[16px]">
            <p className="text-[18px] font-bold leading-[1.167] text-primary lg:text-[20px]" dir="auto">
              הכול במקום אחד
            </p>
            <h2 className="text-[28px] font-bold leading-[1.167] text-sub-black lg:text-[46px]" dir="auto">
              המערכת המתקדמת שלנו
            </h2>
          </div>
          <CtaButton className="cursor-pointer rounded-full bg-primary px-[28px] py-[12px] text-[18px] font-bold leading-[1.167] text-white transition-transform hover:scale-105">
            ספרו לי עוד
          </CtaButton>
        </div>
      </Reveal>

      <Reveal delay={150} className="w-full">
        {/* prototype behavior: the dashboard switches to its hovered state on mouse-over */}
        <div className="group relative mx-auto aspect-[1520/820] w-full max-w-[1520px]">
          <img src="/figma/lp-system.png" alt="המערכת של XTRA" className="absolute inset-0 size-full object-contain" />
          <img
            src="/figma/lp-system-hover.png"
            alt=""
            className="absolute inset-0 size-full object-contain opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>
      </Reveal>
    </section>
  )
}
