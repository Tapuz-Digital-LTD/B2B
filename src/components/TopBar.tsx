const menuItems = [
  { label: 'בית', active: false },
  { label: 'אתר בחירה', active: false },
  { label: 'ארנק אקסטרה', active: true },
  { label: 'אודותנו', active: false },
]

export default function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[68px] items-center justify-between bg-white/60 py-[12px] pe-[16px] ps-[16px] backdrop-blur-md lg:pe-[60px] lg:ps-[24px]">
      {/* nav — right side on desktop, hidden on mobile */}
      <nav className="hidden items-center gap-[8px] lg:flex">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`rounded-full px-[16px] py-[8px] text-[16px] leading-[1.24] transition-colors hover:bg-primary/8 ${
              item.active ? 'font-bold text-primary' : 'text-text-main'
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* hamburger — mobile only, right side */}
      <button aria-label="תפריט" className="flex size-[24px] cursor-pointer items-center justify-center lg:hidden">
        <img src="/figma/hero-menu-icon.svg" alt="" className="w-[20px]" />
      </button>

      {/* logo — left on mobile, centered on desktop */}
      <a
        href="#"
        className="flex flex-col items-center gap-[2.7px] lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
      >
        <img src="/figma/topbar-xtra-red.svg" alt="XTRA" className="h-[24px] w-auto lg:h-[32px]" />
        <img src="/figma/topbar-giftcard.svg" alt="GIFTCARD" className="hidden h-[11px] w-auto lg:block" />
      </a>

      {/* contact button — left side on desktop */}
      <button className="hidden cursor-pointer items-center justify-center rounded-full bg-primary px-[18px] py-[8px] text-[15px] font-bold uppercase leading-[26px] tracking-[0.46px] text-white transition-transform hover:scale-105 lg:flex">
        צרו איתנו קשר
      </button>
    </header>
  )
}
