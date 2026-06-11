import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'

mkdirSync('/tmp/xtra-ratio', { recursive: true })
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
})
for (const w of [390, 768, 1024, 1180, 1326, 1512, 1920]) {
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' })
  // force all reveals visible before the full-page shot
  await page.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 60))
    }
    window.scrollTo(0, 0)
  })
  await new Promise((r) => setTimeout(r, 1200))
  await page.screenshot({ path: `/tmp/xtra-ratio/full-${w}.png`, fullPage: true })
  await page.close()
}
await browser.close()
console.log('done')
