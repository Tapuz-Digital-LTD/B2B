/**
 * 3D icons for the catalog category chips (Microsoft Fluent Emoji 3D, MIT —
 * downloaded into /public/icons3d). Categories are free Hebrew text from
 * Shopify (custom.category), so each icon is matched by keywords and
 * everything else falls back to the wrapped gift.
 */

type IconName =
  | 'restaurant'
  | 'cafe'
  | 'pizza'
  | 'fashion'
  | 'beauty'
  | 'home'
  | 'baby'
  | 'leisure'
  | 'travel'
  | 'shopping'
  | 'flower'
  | 'gift'

const MATCHERS: Array<{ name: IconName; keywords: string[] }> = [
  { name: 'pizza', keywords: ['פיצ'] },
  { name: 'cafe', keywords: ['קפה', 'גליד', 'מאפ', 'קונדיטור'] },
  { name: 'restaurant', keywords: ['מסעד', 'שף', 'אוכל', 'בשר', 'סושי', 'המבורגר', 'גורמה', 'קולינר'] },
  { name: 'fashion', keywords: ['אופנה', 'ביגוד', 'הלבשה', 'נעל', 'אקססוריז'] },
  { name: 'beauty', keywords: ['טיפוח', 'יופי', 'ביוטי', 'ספא', 'קוסמטיק', 'פינוק'] },
  { name: 'home', keywords: ['בית', 'מטבח', 'ריהוט', 'חשמל'] },
  { name: 'baby', keywords: ['תינוק', 'ילד', 'צעצוע', 'לידה', 'יולדת'] },
  { name: 'travel', keywords: ['תיירות', 'נופש', 'חופש', 'מלון', 'טיס', 'חו"ל'] },
  { name: 'leisure', keywords: ['פנאי', 'תרבות', 'סרט', 'קולנוע', 'בילוי', 'חוויה', 'ספורט'] },
  { name: 'shopping', keywords: ['שופינג', 'קניות', 'סופר', 'רשת', 'מותג', 'כללי'] },
  { name: 'flower', keywords: ['נשים', 'אישה', 'אמא', 'פרח'] },
]

export function categoryIconName(category: string): IconName {
  for (const { name, keywords } of MATCHERS) {
    if (keywords.some((k) => category.includes(k))) return name
  }
  return 'gift'
}

export function CategoryIcon({ category, className = '' }: { category: string; className?: string }) {
  return (
    <img
      src={`/icons3d/${categoryIconName(category)}.png`}
      alt=""
      loading="lazy"
      aria-hidden="true"
      className={`object-contain drop-shadow-[0_1px_2px_rgba(33,37,41,0.18)] ${className}`}
    />
  )
}
