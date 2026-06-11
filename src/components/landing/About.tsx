import Reveal from '../Reveal'
import ScaleStage from '../ScaleStage'
import CtaButton from '../CtaButton'

const infoItems = ['שליחה מתוזמנת', 'תוקף לכל החיים', 'יותר מ־3,500 בתי עסק']

const blobMask = {
  WebkitMaskImage: 'url(/figma/lp-about-mask.png)',
  maskImage: 'url(/figma/lp-about-mask.png)',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskSize: '833.4px 830.3px',
  maskSize: '833.4px 830.3px',
} as const

/** Blob-masked video with a black outline that hugs the shape + red X.
 *  The stage canvas (700x831) includes the full blob, so nothing overflows onto neighbors. */
function BlobVideo() {
  return (
    <ScaleStage designWidth={700} designHeight={831} className="mx-auto w-full max-w-[700px]">
      <div dir="ltr" className="relative h-[831px] w-[700px]">
        {/* the video, clipped to the blob shape — drop the clip at public/videos/about.mp4 */}
        <div
          className="absolute left-[-120px] top-0 h-[831px] w-[896px] overflow-hidden"
          style={{ ...blobMask, WebkitMaskPosition: '36.9px 0.4px', maskPosition: '36.9px 0.4px' }}
        >
          {/* crop framing derived from the Figma video fill (videoTransform) */}
          <video
            className="absolute max-w-none"
            style={{ width: '1636px', height: '863px', left: '-370px', top: '-16px', objectFit: 'fill' }}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/about.mp4" type="video/mp4" />
          </video>
        </div>
        {/* black outline generated from the same mask — same geometry, so it always hugs the video */}
        <div className="pointer-events-none absolute left-[-120px] top-0 h-[831px] w-[896px] overflow-hidden">
          <img
            src="/figma/lp-about-outline.png"
            alt=""
            className="absolute max-w-none"
            style={{ left: '36.9px', top: '0.4px', width: '833.4px', height: '830.3px' }}
          />
        </div>
        {/* red X */}
        <img
          src="/figma/lp-about-x.svg"
          alt=""
          className="animate-float absolute left-[590px] top-[488px] w-[116px] -rotate-[39.6deg]"
        />
      </div>
    </ScaleStage>
  )
}

export default function About() {
  return (
    <section className="relative flex flex-col items-center gap-[40px] overflow-hidden bg-[rgba(80,89,255,0.16)] px-[24px] py-[60px] lg:flex-row-reverse lg:justify-between lg:gap-[100px] lg:px-[200px] lg:py-[140px]">
      <div className="bg-blob-blue pointer-events-none absolute -top-[300px] left-[45%] h-[1040px] w-[1490px] max-w-none" />

      {/* media — right side on desktop (flex-row-reverse in RTL puts the first child left, so media renders second) */}
      <Reveal className="z-10 flex w-full max-w-[600px] flex-col items-center justify-center gap-[28px] lg:gap-[32px]">
        <div className="flex w-full flex-col items-center justify-center gap-[24px] text-center text-sub-black lg:gap-[32px]">
          <h2 className="text-[30px] font-bold leading-[1.167] lg:text-[46px]" dir="rtl">
            אנחנו הופכים כל אירוע
            <br />
            בארגון <span className="text-primary">לחוויה מיוחדת</span>
          </h2>
          <p className="text-[18px] leading-[1.25] lg:text-[22px]" dir="rtl">
            <b>המטרה שלנו פשוטה: </b>
            להעניק לעובדים שלכם חופש בחירה מוחלט מתוך אלפי מותגים ומתנות בכל רחבי הארץ. ב-Xtra תוכלו לשלוח מתנות
            בלחיצת כפתור, לנהל תקציבים וליהנות מתזמון שליחה מראש. אנחנו כאן כדי לוודא שכל אחת ואחד בארגון ייהנו מהמתנה
            שנתתם, ושאתם תיהנו משקט נפשי וליווי מקצועי צמוד.
          </p>
        </div>
        <div className="flex flex-col items-center gap-[16px] py-[16px] lg:flex-row lg:gap-[24px] lg:py-[24px]">
          {infoItems.map((item, i) => (
            <span key={item} className="flex flex-col items-center gap-[16px] lg:flex-row lg:gap-[24px]">
              {i > 0 && <img src="/figma/cust-x-icon.svg" alt="" className="size-[18px]" />}
              <p className="whitespace-nowrap text-[18px] leading-[1.167] text-text-main lg:text-[20px]" dir="auto">
                {item}
              </p>
            </span>
          ))}
        </div>
        <CtaButton className="cursor-pointer rounded-full bg-primary px-[28px] py-[12px] text-[18px] font-bold leading-[1.167] text-white transition-transform hover:scale-105">
          ספרו לי עוד
        </CtaButton>
      </Reveal>

      <Reveal delay={150} className="z-10 w-full min-w-px lg:flex-1">
        <BlobVideo />
      </Reveal>
    </section>
  )
}
