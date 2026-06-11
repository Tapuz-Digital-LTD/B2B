import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'

mkdirSync('/tmp/xtra-ratio', { recursive: true })
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
})
for (const w of [1024, 1180, 1326, 1512, 1920]) {
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 1500))
  for (const [sel, label] of [['#about', 'about'], ['section.relative.overflow-hidden', 'brandswall']]) {
    const el = await page.$(sel === '#about' ? sel : 'img[src="/figma/lp-brands-wall.png"]')
    if (!el) { console.log(`missing ${label} at ${w}`); continue }
    const target = sel === '#about' ? el : (await el.evaluateHandle((n) => n.closest('section'))).asElement()
    await target.evaluate((n) => n.scrollIntoView({ block: 'center', behavior: 'instant' }))
    await new Promise((r) => setTimeout(r, 900))
    await target.screenshot({ path: `/tmp/xtra-ratio/${label}-${w}.png` })
  }
  await page.close()
}
await browser.close()
console.log('done')
