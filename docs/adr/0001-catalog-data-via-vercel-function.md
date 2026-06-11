# קטלוג המוצרים נטען דרך Vercel Function בריפו הזה, לא דרך ה-backend הקיים

עמוד הקטלוג (`/catalog`) צריך דאטה חי מ-Shopify — שינוי בקולקציית הקטלוג חייב להופיע באתר בלי דיפלוי, כי צוות השיווק שולט בתוכן דרך Shopify. החלטנו: serverless function בתיקיית `api/` של הריפו הזה קוראת ל-Shopify Admin GraphQL עם טוקן ייעודי מצומצם (הרשאת `read_products` בלבד, **לא** הטוקן הראשי של XtraGiftCard-NestApp), ומחזירה קטלוג מנורמל עם כותרות cache (`s-maxage` + `stale-while-revalidate`) כך שטראפיק האתר נבלם ב-CDN ולא מגיע ל-Shopify.

## Considered Options

- **Endpoint ציבורי חדש ב-XtraGiftCard-NestApp** (יש שם כבר תבנית `/api/mobile/catalog/*`) — נדחה: כורך דיפלוי של מערכת פרודקשן קריטית בפיצ'ר שיווקי, מצריך CORS, וקושר את זמינות האתר השיווקי לזמינות ה-backend.
- **Storefront API ישירות מהדפדפן** — נדחה: דורש פרסום המוצרים לערוץ מכירה וחשיפת metafields ל-Storefront, וחושף את דומיין החנות בקוד הציבורי.
- **JSON סטטי בזמן build** — נדחה: שינוי תוכן היה דורש דיפלוי, בסתירה ישירה להחלטה ששיווק שולט בתוכן בלי מפתחים.

## Consequences

- לריפו של אתר שעד כה היה סטטי לחלוטין יש עכשיו תיקיית `api/` ושני סודות ב-Vercel env (`SHOPIFY_STORE_DOMAIN`, `SHOPIFY_ADMIN_TOKEN`).
- שינוי בקולקציה מופיע באתר בתוך חלון הקאש (~5 דקות), לא מיידית.
- פיתוח לוקאלי של העמוד עם דאטה אמיתי דורש `vercel dev` (או הרצת ה-function בנפרד) — `vite dev` לבדו יציג את ה-fallback.
