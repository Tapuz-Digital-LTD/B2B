import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
})
const page = await browser.newPage()
await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 })
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' })
await page.evaluate(() => {
  const el = [...document.querySelectorAll('img')].find((i) => i.src.includes('br-popcorn.png'))
  el?.closest('section')?.scrollIntoView()
})
await new Promise((r) => setTimeout(r, 2000))
await page.screenshot({ path: '/tmp/xtra-shots/mob-brands.png' })
await page.evaluate(() => document.querySelector('blockquote')?.closest('section')?.scrollIntoView())
await new Promise((r) => setTimeout(r, 2000))
await page.screenshot({ path: '/tmp/xtra-shots/mob-testimonials.png' })
await browser.close()
console.log('done')
