import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import CtaButton from './CtaButton'

const menuItems = [
  { label: 'בית', to: '/' },
  { label: 'אתר בחירה', to: '#' },
  { label: 'ארנק אקסטרה', to: '/digital-wallet' },
  { label: 'אודותנו', to: '#' },
]

function MenuLink({ item, className, onClick }: { item: (typeof menuItems)[number]; className: string; onClick?: () => void }) {
  if (item.to === '#') {
    return (
      <a href="#" onClick={onClick} className={`${className} text-text-main`}>
        {item.label}
      </a>
    )
  }
  const { pathname } = useLocation()
  const active = pathname === item.to
  return (
    <NavLink to={item.to} onClick={onClick} className={`${className} ${active ? 'font-bold text-primary' : 'text-text-main'}`}>
      {item.label}
    </NavLink>
  )
}

export default function TopBar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="relative z-10 flex h-[68px] items-center justify-between bg-white/60 py-[12px] pe-[16px] ps-[16px] backdrop-blur-md lg:pe-[60px] lg:ps-[24px]">
        {/* nav — right side on desktop, hidden on mobile */}
        <nav className="hidden items-center gap-[8px] lg:flex">
          {menuItems.map((item) => (
            <MenuLink
              key={item.label}
              item={item}
              className="rounded-full px-[16px] py-[8px] text-[16px] leading-[1.24] transition-colors hover:bg-primary/8"
            />
          ))}
        </nav>

        {/* hamburger — mobile only, right side */}
        <button
          aria-label="תפריט"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="relative flex size-[32px] cursor-pointer flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span className={`h-[2px] w-[20px] rounded bg-text-main transition-transform duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`h-[2px] w-[20px] rounded bg-text-main transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`h-[2px] w-[20px] rounded bg-text-main transition-transform duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>

        {/* logo — left on mobile, centered on desktop */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex flex-col items-center gap-[2.7px] lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
        >
          <img src="/figma/topbar-xtra-red.svg" alt="XTRA" className="h-[24px] w-auto lg:h-[32px]" />
          <img src="/figma/topbar-giftcard.svg" alt="GIFTCARD" className="hidden h-[11px] w-auto lg:block" />
        </Link>

        {/* contact button — left side on desktop */}
        <CtaButton className="hidden cursor-pointer items-center justify-center rounded-full bg-primary px-[18px] py-[8px] text-[15px] font-bold uppercase leading-[26px] tracking-[0.46px] text-white transition-transform hover:scale-105 lg:flex">
          צרו איתנו קשר
        </CtaButton>
      </div>

      {/* mobile drawer */}
      <div
        className={`absolute inset-x-0 top-full origin-top overflow-hidden bg-white/95 shadow-[0_20px_40px_rgba(33,37,41,0.12)] backdrop-blur-md transition-all duration-300 lg:hidden ${
          open ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col items-stretch gap-[4px] px-[24px] py-[16px]">
          {menuItems.map((item) => (
            <MenuLink
              key={item.label}
              item={item}
              onClick={() => setOpen(false)}
              className="rounded-[12px] px-[12px] py-[12px] text-right text-[18px] leading-[1.24] transition-colors hover:bg-primary/8"
            />
          ))}
          <CtaButton
            onClick={() => setOpen(false)}
            className="mt-[8px] block rounded-full bg-primary px-[18px] py-[10px] text-center text-[15px] font-bold uppercase leading-[26px] tracking-[0.46px] text-white"
          >
            צרו איתנו קשר
          </CtaButton>
        </nav>
      </div>
      {/* backdrop */}
      {open && <div className="fixed inset-0 -z-10 bg-black/20 lg:hidden" onClick={() => setOpen(false)} />}
    </header>
  )
}
