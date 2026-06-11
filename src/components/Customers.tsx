import Reveal from './Reveal'

const items = [
  {
    title: 'תוקף לכל החיים',
    text: 'המתנה שלא נעלמת לעולם. הכסף נשמר בארנק עד לרגע שהעובד מחליט לממש אותו.\nבלי לחץ ובלי אותיות קטנות.',
  },
  {
    title: 'צבירת כסף ואירועים',
    text: 'מקום אחד לכל הרגעים. ימי הולדת, חגים ותגמולים נצברים לארנק אחד חכם, המאפשר רכישת מתנות גדולות ומשמעותיות באמת.',
  },
  {
    title: 'החופש לבחור',
    text: 'מעל 3,500 בתי עסק, רשתות מזון, מותגי אופנה בינלאומיים, חופשות בארץ ובחו"ל וקולינריה משובחת.',
  },
  {
    title: 'XTRA עד הבית',
    text: 'מגוון עצום של מתנות פיזיות ומשלוחים שיגיעו לעובד ישירות לספה, כדי שחוויית הפינוק תהיה שלמה.',
  },
]

export default function Customers() {
  return (
    <section className="relative flex flex-col items-center gap-[60px] px-[24px] pb-[120px] pt-[60px] lg:px-[200px] lg:pb-[300px] lg:pt-[120px]">
      {/* soft background blobs */}
      <div className="bg-blob-pink pointer-events-none absolute -top-[400px] left-[45%] -z-10 h-[1100px] w-[1440px] max-w-none" />
      <div className="bg-blob-blue pointer-events-none absolute -bottom-[900px] -left-[700px] -z-10 h-[1700px] w-[2060px] max-w-none" />

      <Reveal>
        <div className="flex flex-col items-center gap-[16px] text-center">
          <p className="text-[20px] font-bold leading-[1.167] text-primary" dir="auto">
            אז, למה אקסטרה
          </p>
          <h2 className="text-[32px] font-bold leading-[1.167] text-sub-black lg:text-[46px]" dir="auto">
            היתרונות שעושים את ההבדל
          </h2>
        </div>
      </Reveal>

      <div className="flex w-full flex-col items-start justify-between gap-[32px] pb-[40px] pt-[32px] lg:flex-row lg:gap-0">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 120} className="min-w-px flex-1">
            <div className="flex flex-col items-center justify-center gap-[16px] px-[32px]">
              <img
                src="/figma/cust-x-icon.svg"
                alt=""
                className="animate-wiggle size-[36px]"
                style={{ animationDelay: `${i * -0.7}s` }}
              />
              <div className="flex w-full flex-col items-center gap-[14px] text-center text-text-main">
                <p className="text-[22px] font-bold leading-[1.167]" dir="auto">
                  {item.title}
                </p>
                <p className="whitespace-pre-line text-[17px] leading-[1.25]" dir="rtl">
                  {item.text}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
