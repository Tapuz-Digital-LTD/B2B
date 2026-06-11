import Reveal from './Reveal'

const inputClass =
  'h-[52px] w-full rounded-full border border-black/12 bg-white px-[16px] text-[14px] tracking-[0.17px] text-text-main placeholder:text-text-main/70 focus:border-primary focus:outline-none'

export default function ContactForm() {
  return (
    <section className="bg-primary/8 px-[24px] py-[80px] lg:py-[120px]">
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-center gap-[40px] lg:gap-[60px]">
        <Reveal className="flex flex-col items-center gap-[16px]">
          <div className="flex flex-wrap items-center justify-center gap-x-[12px] gap-y-[8px] lg:gap-[16px]">
            <p className="text-[30px] font-bold leading-[1.167] text-sub-black lg:text-[46px]" dir="auto">
              רוצים לתת
            </p>
            <img src="/figma/s4-xtra-red.svg" alt="XTRA" className="h-[20px] w-auto lg:h-[27px]" />
            <p className="text-[30px] font-bold leading-[1.167] text-sub-black lg:text-[46px]" dir="auto">
              בארגון?
            </p>
          </div>
          <p className="text-center text-[19px] leading-[1.1] text-black lg:text-[26px]" dir="auto">
            השאירו פרטים ונחזור עם פתרון מותאם לכם
          </p>
        </Reveal>

        <form className="flex w-full flex-col gap-[24px]" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-[8px] lg:gap-[14px]">
            <input className={inputClass} type="text" name="fullName" placeholder="שם מלא*" required />
            <div className="flex flex-col gap-[8px] lg:flex-row lg:gap-[14px]">
              <input className={inputClass} type="tel" name="phone" placeholder="טלפון נייד*" required />
              <input className={inputClass} type="email" name="email" placeholder="כתובת מייל בעבודה*" required />
            </div>
            <input className={inputClass} type="text" name="company" placeholder="שם החברה" />
            <div className="flex flex-col gap-[8px] lg:flex-row lg:gap-[14px]">
              <input className={inputClass} type="text" name="role" placeholder="תפקיד בחברה" />
              <input className={inputClass} type="text" name="employees" placeholder="מספר עובדים" />
            </div>
          </div>

          <div className="flex flex-col-reverse items-center gap-[16px] lg:flex-row lg:justify-between">
            <label className="flex cursor-pointer items-center gap-[8px]">
              <span className="text-[16px] leading-[1.24] text-text-main" dir="auto">
                אני מאשר קבלת תוכן שיווקי במייל
              </span>
              <input type="checkbox" defaultChecked className="peer sr-only" />
              <span className="flex size-[24px] items-center justify-center rounded-full border border-black/20 bg-white peer-checked:border-0 peer-checked:[&>img]:opacity-100">
                <img src="/figma/s4-check.svg" alt="" className="size-[24px] opacity-0 transition-opacity" />
              </span>
            </label>
            <button
              type="submit"
              className="w-full cursor-pointer rounded-full bg-primary px-[22px] py-[8px] text-[15px] font-bold uppercase leading-[26px] tracking-[0.46px] text-white transition-transform hover:scale-105 lg:w-[200px]"
            >
              חזרו אליי
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
