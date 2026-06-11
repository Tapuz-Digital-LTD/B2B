import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
})
const page = await browser.newPage()
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' })
await new Promise((r) => setTimeout(r, 1200))

// about media (blob video)
await page.evaluate(() => document.querySelector('#about')?.scrollIntoView({ block: 'start', behavior: 'instant' }))
await new Promise((r) => setTimeout(r, 1200))
await page.evaluate(() => window.scrollBy(0, 700))
await new Promise((r) => setTimeout(r, 1200))
await page.screenshot({ path: '/tmp/xtra-ratio/mob-about-media.png' })

// brands wall card
await page.evaluate(() => {
  const img = document.querySelector('img[src="/figma/lp-brands-wall.png"]')
  img?.closest('section')?.scrollIntoView({ block: 'start', behavior: 'instant' })
})
await new Promise((r) => setTimeout(r, 1500))
await page.screenshot({ path: '/tmp/xtra-ratio/mob-brandswall.png' })
await page.evaluate(() => window.scrollBy(0, 500))
await new Promise((r) => setTimeout(r, 1200))
await page.screenshot({ path: '/tmp/xtra-ratio/mob-brandswall2.png' })

await browser.close()
console.log('done')
