import Reveal from '../Reveal'

const logos = [
  'lp-logo1.png',
  'lp-logo2.png',
  'lp-logo3.png',
  'lp-logo4.png',
  'lp-logo5.png',
  'ts-cell-color-isracard.png',
  'lp-logo7.png',
  'lp-logo8.png',
  'lp-logo9.png',
  'lp-logo10.png',
  'lp-logo11.png',
]

/** "הצטרפו לחברות שכבר נותנות XTRA" — infinite logos marquee. */
export default function LogosBanner() {
  return (
    <section className="flex flex-col items-center gap-[40px] overflow-hidden bg-white py-[60px] lg:gap-[60px] lg:py-[100px]">
      <Reveal>
        {/* items-baseline: the logo bottom sits on the text baseline */}
        <div className="flex items-baseline justify-center gap-[10px] lg:gap-[16px]">
          <h2 className="whitespace-nowrap text-[22px] font-bold leading-[1.167] text-sub-black lg:text-[46px]" dir="auto">
            הצטרפו לחברות שכבר נותנות
          </h2>
          <img src="/figma/s4-xtra-red.svg" alt="XTRA" className="h-[20px] w-auto lg:h-[30px]" />
        </div>
      </Reveal>

      <div dir="ltr" className="relative h-[80px] w-full overflow-hidden lg:h-[120px]">
        <div className="animate-marquee flex w-max items-center">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {logos.map((logo) => (
                <div key={`${dup}-${logo}`} className="flex h-[80px] w-[130px] shrink-0 items-center justify-center px-[14px] lg:h-[120px] lg:w-[220px] lg:px-[24px]">
                  <img src={`/figma/${logo}`} alt="" className="max-h-[56px] max-w-full object-contain lg:max-h-[80px]" />
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[80px] bg-gradient-to-r from-white to-transparent lg:w-[300px]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[80px] bg-gradient-to-l from-white to-transparent lg:w-[300px]" />
      </div>
    </section>
  )
}
