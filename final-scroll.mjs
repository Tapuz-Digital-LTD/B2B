import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
})
const page = await browser.newPage()
await page.setViewport({ width: 1500, height: 850, deviceScaleFactor: 1 })
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' })
for (const [name, y] of [['about', 1250], ['options', 3050], ['system', 4150]]) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y)
  await new Promise((r) => setTimeout(r, 1300))
  await page.screenshot({ path: `/tmp/xtra-shots/f-${name}.png` })
}
await browser.close()
console.log('done')
