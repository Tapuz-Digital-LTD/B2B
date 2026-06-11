import Reveal from '../Reveal'
import type { CatalogPartner } from '../../lib/catalog'

const MAX_LOGOS = 36
const SECONDS_PER_LOGO = 2.5 // keeps the scroll speed constant no matter how many partners exist

/** "שיתופי הפעולה שלנו" — infinite marquee of partner-business logos, fed from the catalog. */
export default function PartnersMarquee({ partners }: { partners: CatalogPartner[] }) {
  const withLogo = partners.filter((p) => p.logo).slice(0, MAX_LOGOS)
  if (withLogo.length < 4) return null

  return (
    <section className="flex flex-col items-center gap-[32px] overflow-hidden bg-white pt-[60px] lg:gap-[48px] lg:pt-[100px]">
      <Reveal>
        <div className="flex flex-col items-center gap-[12px] px-[24px] text-center lg:gap-[16px]">
          <p className="text-[18px] font-bold leading-[1.167] text-primary lg:text-[20px]" dir="auto">
            שיתופי הפעולה שלנו
          </p>
          <h2 className="text-[26px] font-bold leading-[1.167] text-sub-black lg:text-[40px]" dir="auto">
            המותגים שמחכים בתוך המתנות
          </h2>
        </div>
      </Reveal>

      <div dir="ltr" className="group relative h-[88px] w-full overflow-hidden lg:h-[110px]">
        <div
          className="animate-marquee flex w-max items-center group-hover:[animation-play-state:paused]"
          style={{ animationDuration: `${Math.max(40, Math.round(withLogo.length * SECONDS_PER_LOGO))}s` }}
        >
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-[16px] px-[8px] lg:gap-[24px] lg:px-[12px]">
              {withLogo.map((partner) => (
                <div
                  key={`${dup}-${partner.id}`}
                  title={partner.name}
                  className="flex h-[72px] w-[124px] shrink-0 items-center justify-center rounded-[16px] border border-[rgba(80,89,255,0.10)] bg-[rgba(80,89,255,0.06)] px-[16px] shadow-[0_8px_24px_rgba(80,89,255,0.08)] lg:h-[88px] lg:w-[170px] lg:px-[24px]"
                >
                  <img
                    src={partner.logo!}
                    alt={partner.name}
                    loading="lazy"
                    onError={(e) => {
                      const tile = e.currentTarget.parentElement
                      if (tile) tile.style.display = 'none'
                    }}
                    className="max-h-[48px] max-w-full object-contain drop-shadow-[0_1px_2px_rgba(33,37,41,0.25)] lg:max-h-[60px]"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[60px] bg-gradient-to-r from-white to-transparent lg:w-[260px]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[60px] bg-gradient-to-l from-white to-transparent lg:w-[260px]" />
      </div>
    </section>
  )
}
