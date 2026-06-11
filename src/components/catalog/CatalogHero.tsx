import CtaButton from '../CtaButton'
import { TileGrid } from '../Brands'


/** Hero for the product catalog — landing-hero language, with the live catalog booklet. */
export default function CatalogHero() {
  const scrollToGrid = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('catalog-grid')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="flex flex-col items-center px-[12px] pt-[68px] lg:px-[24px]">
      <div className="relative w-full overflow-clip rounded-[24px] border border-[#fcb67f]/15" style={{ backgroundColor: 'color-mix(in oklab, #fcb67f 12%, transparent)' }}>

        <div className="relative flex flex-col items-center gap-[72px] px-[24px] pb-[60px] pt-[40px] lg:flex-row lg:justify-between lg:gap-[100px] lg:px-[120px] lg:py-[100px]">
          {/* text — right side on desktop */}
          <div className="flex max-w-[640px] flex-col items-center gap-[24px] text-center lg:items-start lg:gap-[32px] lg:text-right">
            <h1
              className="animate-fade-up text-[30px] font-bold leading-[1.15] text-text-main [animation-delay:120ms] lg:text-[54px] lg:leading-[1.167] lg:tracking-[-1px]"
              dir="rtl"
            >
              עולם שלם של מתנות,
              <br />
              <span className="text-primary">פתוח בפניכם.</span>
            </h1>
            <p
              className="animate-fade-up text-[17px] leading-[1.3] text-black [animation-delay:240ms] lg:text-[26px] lg:leading-[1.25]"
              dir="auto"
            >
              גיפטקארדים, חוויות ומותגים מובילים, דפדפו חופשי,
              <br className="hidden lg:block" />
              סמנו מה אהבתם, ואנחנו כבר נדאג לכל השאר.
            </p>


            <div className="animate-fade-up flex flex-wrap items-center justify-center gap-[12px] [animation-delay:480ms] lg:justify-start lg:gap-[16px]">
              <CtaButton className="cursor-pointer rounded-full bg-primary px-[28px] py-[10px] text-[16px] font-bold leading-[1.4] text-white transition-transform hover:scale-105 lg:px-[32px] lg:py-[12px] lg:text-[18px]">
                דברו איתנו
              </CtaButton>
              <a
                href="#catalog-grid"
                onClick={scrollToGrid}
                className="cursor-pointer rounded-full border-2 border-primary bg-white/70 px-[26px] py-[8px] text-[16px] font-bold leading-[1.4] text-primary backdrop-blur-sm transition-transform hover:scale-105 lg:px-[30px] lg:py-[10px] lg:text-[18px]"
              >
                לדפדוף בקטלוג
              </a>
            </div>
          </div>

          {/* brand tile mosaic */}
          <div className="relative w-full max-w-[420px] shrink-0 lg:max-w-[520px]">
            <div className="animate-pop-in" style={{ animationDelay: '0.2s' }}>
              <TileGrid />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
