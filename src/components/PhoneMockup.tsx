/**
 * The XTRA app "Home" screen shown inside an iPhone-style frame.
 * Authored at the desktop design size (460x1000) and scaled down with
 * a CSS transform where a smaller phone is needed (e.g. mobile hero).
 * Positions are physical (Figma coordinates), hence dir="ltr".
 */

function StatusBar() {
  return (
    <div className="flex h-[50px] w-full items-end justify-between px-[30px] pb-[8px]">
      <span className="text-[16px] font-bold tracking-[0.2px] text-text-main">9:41</span>
      <svg width="62" height="14" viewBox="0 0 62 14" fill="none" aria-hidden>
        <rect x="0" y="6" width="3" height="8" rx="1" fill="#212529" />
        <rect x="5" y="4" width="3" height="10" rx="1" fill="#212529" />
        <rect x="10" y="2" width="3" height="12" rx="1" fill="#212529" />
        <rect x="15" y="0" width="3" height="14" rx="1" fill="#212529" />
        <path
          d="M30 4.5C32.8 2.2 36.7 2.2 39.5 4.5M31.8 7.3C33.6 5.9 35.9 5.9 37.7 7.3M33.6 10C34.4 9.4 35.1 9.4 35.9 10L34.75 11.5L33.6 10Z"
          stroke="#212529"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <rect x="46" y="1.5" width="13" height="11" rx="3" stroke="#212529" strokeWidth="1.2" />
        <rect x="47.5" y="3" width="8" height="8" rx="1.6" fill="#212529" />
        <rect x="60" y="5" width="2" height="4" rx="1" fill="#212529" />
      </svg>
    </div>
  )
}

type CategoryCardProps = {
  label: string
  bg: string
  children: React.ReactNode
}

function CategoryCard({ label, bg, children }: CategoryCardProps) {
  return (
    <div className="flex h-[245px] flex-col items-center overflow-clip rounded-[11.4px] border-[1.15px] border-[rgba(80,89,255,0.08)] bg-white px-[4.6px] pt-[4.6px]">
      <div className="relative min-h-px w-full flex-1 overflow-clip rounded-[8px]">
        <div className={`absolute inset-0 overflow-clip rounded-[3px] ${bg}`}>{children}</div>
      </div>
      <div className="flex h-[43.5px] w-full shrink-0 items-center justify-between px-[9.2px]">
        <img src="/figma/hero-icon-tag.svg" alt="" className="size-[11px]" />
        <p className="text-[19px] tracking-[0.17px] text-text-main" dir="auto">
          {label}
        </p>
      </div>
    </div>
  )
}

export default function PhoneMockup() {
  return (
    <div
      dir="ltr"
      className="flex h-[1000px] w-[460px] flex-col gap-[27px] overflow-clip rounded-[23px] border-[10px] border-[#eaebff] bg-[linear-gradient(90deg,rgba(80,89,255,0.04),rgba(80,89,255,0.04)),linear-gradient(90deg,#fff,#fff)] shadow-[100px_87px_100px_0px_rgba(215,25,33,0.12)]"
    >
      <div className="flex w-full flex-col">
        <StatusBar />
        {/* toolbar */}
        <div className="flex h-[64px] w-full items-center justify-between border-b-[1.15px] border-[rgba(80,89,255,0.08)] bg-white px-[18px] py-[11px]">
          <div className="relative size-[37px] overflow-clip rounded-full bg-[#ffdddf]">
            <img src="/figma/hero-avatar.png" alt="" className="absolute inset-0 size-full rounded-full object-cover" />
          </div>
          <img src="/figma/hero-xtra-toolbar.svg" alt="XTRA" className="h-[27px] w-auto" />
          <img src="/figma/hero-menu-icon.svg" alt="" className="w-[15px]" />
        </div>
      </div>

      {/* account balance */}
      <div className="flex w-full flex-col items-center px-[18px] pt-[10px]">
        <div className="relative flex w-full flex-col items-center justify-end gap-[27px] rounded-b-[37px] rounded-t-[27px] border-x-[1.15px] border-t-[1.15px] border-[rgba(80,89,255,0.14)] bg-white px-[27px] pb-[18px] pt-[60px]">
          {/* coins peeking above the card */}
          <div className="absolute -top-[54px] left-1/2 h-[110px] w-[172px] -translate-x-1/2">
            <img src="/figma/hero-coins.png" alt="" className="size-full object-contain object-bottom" />
          </div>
          <div className="absolute -bottom-[36px] left-1/2 h-[163px] w-[326px] -translate-x-1/2">
            <img src="/figma/hero-balance-glow.svg" alt="" className="size-full" />
          </div>
          <div className="relative flex w-full flex-col items-center text-center text-text-main">
            <p className="w-full text-[27px] font-bold leading-[1.334]" dir="auto">
              היי שחר,
            </p>
            <p className="w-full text-[18px] leading-[1.5] tracking-[0.17px]" dir="auto">
              הארנק הדיגיטלי שלך מונה:
            </p>
          </div>
        </div>
        <div className="h-[2.3px] w-[362px] bg-[rgba(80,89,255,0.14)]" />
        <div className="flex w-full flex-col items-end justify-center overflow-clip rounded-b-[27px] rounded-t-[37px] border-x-[1.15px] border-b-[1.15px] border-[rgba(80,89,255,0.14)] bg-white px-[27px] pb-[18px] pt-[27px]">
          <div className="flex w-full flex-col items-center justify-center gap-[9px]">
            <p className="w-full text-center text-[39px] font-bold leading-[1.167] text-blue" dir="auto">
              ₪128.09
            </p>
            <div className="flex w-full items-center justify-center gap-[11px]">
              <img src="/figma/hero-arrow-link.svg" alt="" className="w-[11px]" />
              <p className="text-center text-[16px] uppercase leading-[27px] tracking-[0.46px] text-blue" dir="auto">
                הצגת החשבון שלי
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* categories */}
      <div className="flex w-full flex-col items-end gap-[9px] px-[18px]">
        <p className="w-full text-right text-[18px] font-bold leading-[1.22] tracking-[0.17px] text-text-main" dir="auto">
          קטגוריות
        </p>
        <div className="grid w-full grid-cols-2 gap-[18px]">
          <CategoryCard label="אופנה ורשתות" bg="bg-[rgba(255,115,45,0.12)]">
            <img
              src="/figma/hero-card-fashion.png"
              alt=""
              className="absolute -bottom-[33%] -right-[10%] -top-[3%] left-1/4 -scale-x-100 object-contain"
            />
          </CategoryCard>
          <CategoryCard label="אקסטרים" bg="bg-[rgba(80,89,255,0.12)]">
            <img
              src="/figma/hero-card-extreme.png"
              alt=""
              className="absolute left-1/2 top-1/2 h-[120%] w-auto -translate-x-1/2 -translate-y-1/2 object-contain"
            />
          </CategoryCard>
          <CategoryCard label="פנאי ובילוי" bg="bg-[rgba(247,65,75,0.12)]">
            <img
              src="/figma/hero-card-balloon.png"
              alt=""
              className="absolute left-[27%] top-[6%] h-[88%] w-[46%] object-contain"
            />
          </CategoryCard>
          <CategoryCard label="חופשה" bg="bg-[rgba(255,115,45,0.12)]">
            <img
              src="/figma/hero-card-vacation.png"
              alt=""
              className="absolute left-[6%] top-[11%] h-[91%] w-[88%] object-contain"
            />
          </CategoryCard>
          <CategoryCard label="בריאות וספורט" bg="bg-[rgba(80,89,255,0.12)]">
            <img
              src="/figma/hero-card-health.png"
              alt=""
              className="absolute bottom-0 left-1/2 h-[80%] w-auto -translate-x-1/2 rotate-180 -scale-y-100 object-contain"
            />
          </CategoryCard>
          <CategoryCard label="מסעדות" bg="bg-[rgba(247,65,75,0.12)]">
            <img
              src="/figma/hero-card-steak.png"
              alt=""
              className="absolute left-1/2 top-1/2 h-[110%] w-auto -translate-x-1/2 -translate-y-1/2 object-cover"
            />
          </CategoryCard>
        </div>
      </div>
    </div>
  )
}
