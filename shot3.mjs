import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
})
const page = await browser.newPage()
await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 })
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' })
await new Promise((r) => setTimeout(r, 2500))
await page.screenshot({ path: '/tmp/xtra-shots/vp-mob-hero.png' })
await page.evaluate(() => window.scrollTo({ top: 2100, behavior: 'instant' }))
await new Promise((r) => setTimeout(r, 1500))
await page.screenshot({ path: '/tmp/xtra-shots/vp-mob-system.png' })
await browser.close()
console.log('done')
