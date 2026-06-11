import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
})
const page = await browser.newPage()
await page.setViewport({ width: 1669, height: 773, deviceScaleFactor: 1 })
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' })
await page.evaluate(() => document.querySelector('blockquote')?.closest('section')?.scrollIntoView())
await new Promise((r) => setTimeout(r, 6500)) // wait past one slide transition
await page.screenshot({ path: '/tmp/xtra-shots/vp-testimonials.png' })
await browser.close()
console.log('done')
