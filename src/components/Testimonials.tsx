import { useEffect, useState } from 'react'
import Reveal from './Reveal'

const SLIDE_DURATION_MS = 5000

// One slide per brand logo — order matches the logos row (first = rightmost in RTL).
const slides = [
  {
    pink: '/figma/ts-cell-pink-isracard.png',
    color: '/figma/ts-cell-color-isracard.png',
    avatar: '',
    h: 'h-[16px] lg:h-[48px]',
    company: 'ישראכרט',
    quote:
      'אנחנו מאוד מרוצים מהארנק הדיגיטלי, הממשק נוח לשימוש ונגיש מאוד עבורנו. הפלטפורמה ברורה והמעקב אחר התקציב מובן ונוח להפליא',
    person: '',
    role: '',
  },
  {
    pink: '/figma/ts-cell-pink-doar.png',
    color: '/figma/ts-cell-color-doar.png',
    avatar: '/figma/av-man2.jpg',
    h: 'h-[26px] lg:h-[64px]',
    company: 'דואר ישראל',
    quote:
      'את הארנק ומערכת Xtra השקנו יחד, במהלך ששינה לגמרי את פני הארגון שלנו ביום אחד. אנחנו מקבלים מהעובדים שלנו שבחים על ימין ועל שמאל, ואני ממליץ בחום לכל צוות או מקום עבודה ששואף גבוה להכיר את הטכנולוגיה של Xtra',
    person: 'ציון אליטוב',
    role: 'רווחה',
  },
  {
    pink: '/figma/ts-cell-pink-strauss.png',
    color: '/figma/ts-cell-color-strauss.png',
    avatar: '/figma/av-woman2.jpg',
    h: 'h-[34px] lg:h-[72px]',
    company: 'שטראוס מים',
    quote:
      'Xtra מסייעת לי לרכז את ניהול המשימות שלי במערכת אחת ומאפשרת לי בקרה תקציבית ברורה. במוקדי מכירות כמו שלנו, מאוד חשוב לנו לשמור על סדר וארגון, בדיוק כמו במערכת הזו',
    person: 'אלין כהן',
    role: 'מנהלת שירות לקוחות',
  },
  {
    pink: '/figma/ts-cell-pink-delek.png',
    color: '/figma/ts-cell-color-delek.png',
    avatar: '/figma/av-woman3.jpg',
    h: 'h-[32px] lg:h-[68px]',
    company: 'דלק',
    quote:
      'XTRA היא מערכת קלה לתפעול ומספקת חווית קנייה טובה מאוד ובהמון רשתות. הכי חשוב – המערכת נוחה לשימוש ואין לה הגבלת זמן או מקום',
    person: 'מאיה אדלר',
    role: 'יו"ר ועד',
  },
  {
    pink: '/figma/ts-cell-pink-asuta.png',
    color: '/figma/ts-cell-color-asuta.png',
    avatar: '/figma/av-woman1.jpg',
    h: 'h-[20px] lg:h-[52px]',
    company: 'אסותא',
    quote:
      'יש Xtra! אני לומדת המון מהמערכת דרכים חדשות לשמח את העובדים והלקוחות שלי ואני אוהבת את זה. הניסיון שלהם מדבר. הם תמיד חושבים קדימה על כל אירוע או חג שמתקרב ומחוברים לרוח התקופה',
    person: 'חוה כלב',
    role: 'מנהלת משאבי אנוש ורווחה',
  },
]

export default function Testimonials() {
  const [slide, setSlide] = useState(0)
  const active = slides[slide]

  useEffect(() => {
    const id = setTimeout(() => setSlide((s) => (s + 1) % slides.length), SLIDE_DURATION_MS)
    return () => clearTimeout(id)
  }, [slide])

  return (
    <section className="relative flex flex-col items-center gap-[40px] px-[24px] py-[60px] lg:gap-[80px] lg:px-[200px] lg:py-[120px]">
      <Reveal className="w-full">
        {/* keyed by slide so the quote re-enters on every carousel tick */}
        <div
          key={slide}
          className="animate-fade-up relative flex w-full flex-col items-center gap-[24px] lg:gap-[32px] lg:px-[200px]"
        >
          <img
            src="/figma/ts-quote.svg"
            alt=""
            className="pointer-events-none absolute -top-[36px] left-1/2 w-[80px] -translate-x-[15%] lg:-top-[48px] lg:w-[107px]"
          />
          {active.avatar && (
            <img src={active.avatar} alt={active.person} className="relative size-[64px] rounded-full object-cover lg:size-[80px]" />
          )}
          <blockquote className="max-w-[820px] text-center text-[20px] leading-[1.25] text-sub-black lg:text-[28px]" dir="auto">
            {active.quote}
          </blockquote>
          <p className="text-center text-[17px] leading-[1.167] text-sub-black lg:text-[21px]" dir="auto">
            {active.person ? (
              <>
                <span className="font-bold">{active.person},</span> {active.role}, {active.company}
              </>
            ) : (
              <span className="font-bold">{active.company}</span>
            )}
          </p>
        </div>
      </Reveal>

      <div className="flex w-full flex-col gap-[24px]">
        <div className="relative hidden lg:block">
          <hr className="border-black/12" />
          {/* progress indicator — travels above the active logo (first logo = rightmost) */}
          <div
            className="absolute -top-[3px] h-[8px] overflow-clip rounded-full bg-[#ebecf1] transition-[right] duration-500 ease-out"
            style={{ width: `${100 / slides.length}%`, right: `${slide * (100 / slides.length)}%` }}
          >
            <div
              key={slide}
              className="absolute inset-0 origin-right rounded-full bg-primary"
              style={{ animation: `xtra-bar-grow ${SLIDE_DURATION_MS}ms linear both` }}
            />
          </div>
        </div>
        <hr className="border-black/12 lg:hidden" />
        <div className="flex w-full items-center justify-between gap-[8px] lg:gap-[16px]">
          {slides.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <button
                onClick={() => setSlide(i)}
                aria-label={s.company}
                className="flex cursor-pointer items-center justify-center transition-transform duration-300 hover:scale-105 lg:h-[100px] lg:px-[10px]"
              >
                <div className="relative">
                  <img src={s.pink} alt="" className={`${s.h} w-auto`} />
                  <img
                    src={s.color}
                    alt={s.company}
                    className={`absolute inset-0 size-full object-contain transition-opacity duration-500 ${
                      i === slide ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
