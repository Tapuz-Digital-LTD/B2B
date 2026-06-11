const links = ['עלינו', 'תקנון ומדיניות', 'שירות לקוחות', 'אתר Xtra']

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-[25px] bg-text-main pt-[40px]">
      <div className="flex flex-col items-center justify-between gap-[14px]">
        <img src="/figma/ft-xtra-white.svg" alt="XTRA" className="h-[31px] w-auto" />
        <img src="/figma/ft-giftcard.svg" alt="GIFTCARD" className="h-[11px] w-auto" />
      </div>
      <nav className="hidden items-center gap-[12px] lg:flex">
        {links.map((link, i) => (
          <span key={link} className="flex items-center gap-[12px]">
            {i > 0 && <span className="text-[14px] text-white">•</span>}
            <a href="#" className="text-[16px] leading-[1.24] text-white hover:underline">
              {link}
            </a>
          </span>
        ))}
      </nav>
      <div className="flex w-full flex-col items-center justify-center bg-sub-black px-[24px] py-[16px]">
        <p className="text-center text-[14px] leading-[1.24] text-white lg:text-[16px]" dir="auto">
          © כל הזכויות שמורות לתפוזנט בע"מ 2007 - 2026
        </p>
      </div>
    </footer>
  )
}
