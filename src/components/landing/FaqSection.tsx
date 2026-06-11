import { useState } from 'react'
import Reveal from '../Reveal'

// the answers are editable placeholders — pending business review
const faqs = [
  {
    q: 'חלק מהעובדים מעדיפים מתנות פיזיות וחלקם גיפטקארד דיגיטלי. אפשר לשלב בין האפשרויות?',
    a: 'בהחלט. אפשר לשלב בין מתנות פיזיות עם משלוח עד הבית לבין גיפטקארד דיגיטלי — כל עובד בוחר את מה שמתאים לו.',
  },
  {
    q: 'מהו הזמן האידיאלי לשליחת מתנות חג לעובדים?',
    a: 'מומלץ לתזמן את השליחה כשבוע-שבועיים לפני החג. במערכת שלנו אפשר לקבוע תזמון שליחה מראש לכל הארגון.',
  },
  {
    q: 'מה ההבדל בין אתר בחירה ובין ארנק צובר לעובדים?',
    a: 'אתר בחירה מאפשר לבחור מתנה אחת מתוך מבחר שהגדרתם, ואילו ארנק XTRA צובר את כל האירועים והתקציבים למקום אחד שניתן לממש מתי שרוצים.',
  },
  {
    q: 'איך שומרים על יחס אישי וחיבור לארגון כששולחים מתנות לאלפי עובדים במקביל?',
    a: 'אפשר לצרף ברכה אישית ממותגת לכל עובד, לתזמן שליחה לאירועים אישיים ולמתג את חוויית המתנה בצבעי הארגון.',
  },
  {
    q: 'חלק מהעובדים משתייכים למגזר החרדי. האם גם הם יהיו מרוצים מהמתנה?',
    a: 'כן. המגוון כולל אלפי בתי עסק ומותגים מותאמים, כולל רשתות מזון וחנויות עם תעודות כשרות מהדרין.',
  },
]

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="relative flex flex-col items-center gap-[40px] overflow-hidden bg-white px-[24px] py-[60px] lg:gap-[60px] lg:py-[100px]">
      <div className="bg-blob-pink pointer-events-none absolute -right-[500px] top-[230px] h-[1120px] w-[1190px] max-w-none" />
      <div className="bg-blob-blue pointer-events-none absolute -left-[410px] top-[26px] h-[1170px] w-[1040px] max-w-none" />

      <Reveal>
        <div className="relative flex flex-col items-center gap-[16px] text-center lg:gap-[24px]">
          <p className="text-[18px] font-bold leading-[1.167] text-primary lg:text-[20px]" dir="auto">
            סליחה, אני רק שאלה
          </p>
          <h2 className="text-[26px] font-bold leading-[1.167] text-sub-black lg:text-[40px]" dir="auto">
            שאלות שמנהלי רווחה
            <br />
            שואלים אותנו
          </h2>
        </div>
      </Reveal>

      <Reveal delay={100} className="relative w-full max-w-[1080px]">
        <div className="flex w-full flex-col gap-[8px]">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={i} className="border-b border-black/12">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-[8px] py-[16px] pe-[8px] ps-[16px] text-right lg:ps-[40px]"
                >
                  <p className="min-w-px flex-1 text-[17px] font-bold leading-[1.25] text-black/87 lg:text-[20px]" dir="auto">
                    {faq.q}
                  </p>
                  <span className="flex size-[48px] shrink-0 items-center justify-center rounded-full transition-colors hover:bg-primary/8">
                    <img
                      src="/figma/lp-faq-plus.svg"
                      alt=""
                      className={`size-[16px] transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                    />
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-[20px] pe-[16px] text-[16px] leading-[1.5] text-sub-black lg:pe-[40px] lg:text-[18px]" dir="auto">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}
