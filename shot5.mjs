import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
})
const page = await browser.newPage()
await page.setViewport({ width: 1669, height: 773, deviceScaleFactor: 1 })
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' })
await page.evaluate(() => window.scrollTo({ top: 2500, behavior: 'instant' }))
await new Promise((r) => setTimeout(r, 4200)) // catch the second card
await page.screenshot({ path: '/tmp/xtra-shots/vp-giftcard2.png' })
await new Promise((r) => setTimeout(r, 3500)) // third card
await page.screenshot({ path: '/tmp/xtra-shots/vp-giftcard3.png' })
await browser.close()
console.log('done')
