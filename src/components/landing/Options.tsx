import Reveal from '../Reveal'
import CtaButton from '../CtaButton'

const cards = [
  {
    img: '/figma/lp-option-wallet.png',
    imgHover: '/figma/lp-option-wallet-hover.png',
    title: 'ארנק XTRA',
    subtitle: 'לינק אחד שצובר את כל האירועים',
    cta: 'בואו נתחיל!',
  },
  {
    img: '/figma/lp-option-site.png',
    imgHover: '/figma/lp-option-site-hover.png',
    title: 'אתר בחירה',
    subtitle: 'קובעים תקציב והשאר עלינו',
    cta: 'בואו נתחיל!',
  },
]

/** "בוחרים את הדרך שמתאימה לכם" — the two product options. */
export default function Options() {
  return (
    <section className="relative px-[16px] py-[60px] lg:px-[200px] lg:py-[120px]">
      <div className="bg-blob-blue pointer-events-none absolute -top-[200px] left-[50%] -z-10 h-[1180px] w-[1530px] max-w-none" />

      <div className="mx-auto flex w-full max-w-[1520px] flex-col items-center gap-[40px] rounded-[24px] bg-white px-[16px] py-[60px] shadow-[0_30px_80px_rgba(80,89,255,0.08)] lg:gap-[80px] lg:rounded-[40px] lg:px-[120px] lg:py-[120px]">
        <Reveal>
          <div className="flex flex-col items-center gap-[16px] text-center">
            <p className="text-[18px] font-bold leading-[1.167] text-primary lg:text-[20px]" dir="auto">
              אז, איך עושים את זה?
            </p>
            <h2 className="text-[28px] font-bold leading-[1.167] text-sub-black lg:text-[40px]" dir="auto">
              בוחרים את הדרך שמתאימה לכם
            </h2>
          </div>
        </Reveal>

        {/* flex-row-reverse: wallet card sits on the left on desktop (like Figma), first on mobile */}
        <div className="relative flex w-full flex-col items-center gap-[24px] lg:flex-row-reverse lg:items-stretch lg:justify-center lg:gap-[64px]">
          {/* handwritten "-או-" between the cards (desktop) */}
          <img
            src="/figma/lp-separator.png"
            alt="-או-"
            className="pointer-events-none absolute left-1/2 top-[42%] z-10 hidden h-[30px] w-auto -translate-x-1/2 lg:block"
          />
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 150} className="flex w-full max-w-[584px] min-w-px flex-1 flex-col">
              <div className="group flex h-full flex-col items-center gap-[20px] rounded-[16px] bg-white p-[16px] pb-[28px] shadow-[0_8px_40px_rgba(80,89,255,0.10)] transition-transform duration-300 hover:-translate-y-[6px]">
                <div className="relative aspect-[552/382] w-full overflow-clip rounded-[12px]">
                  <img src={card.img} alt="" className="absolute inset-0 size-full object-cover" />
                  <img
                    src={card.imgHover}
                    alt=""
                    className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
                <div className="flex flex-col items-center gap-[8px] text-center">
                  <p className="text-[24px] font-bold leading-[1.167] text-text-main lg:text-[28px]" dir="auto">
                    {card.title}
                  </p>
                  <p className="text-[17px] leading-[1.2] text-sub-black lg:text-[20px]" dir="auto">
                    {card.subtitle}
                  </p>
                </div>
                <CtaButton className="cursor-pointer rounded-full bg-primary px-[24px] py-[8px] text-[16px] font-bold leading-[1.4] text-white transition-transform hover:scale-105">
                  {card.cta}
                </CtaButton>
              </div>
              {i === 0 && <img src="/figma/lp-separator.png" alt="-או-" className="mx-auto h-[30px] w-auto py-0 lg:hidden" style={{ margin: '16px auto' }} />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
