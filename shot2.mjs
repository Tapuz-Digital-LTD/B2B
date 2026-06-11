import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
})
const page = await browser.newPage()
await page.setViewport({ width: 1669, height: 773, deviceScaleFactor: 1 })
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' })
await new Promise((r) => setTimeout(r, 2500))
await page.screenshot({ path: '/tmp/xtra-shots/vp-hero.png' })
// measure hero card + customers section positions
const m = await page.evaluate(() => {
  const card = document.querySelector('section > div.relative')
  const sections = [...document.querySelectorAll('section')]
  return {
    heroCard: card.getBoundingClientRect().toJSON(),
    customersTop: sections[1].getBoundingClientRect().top + window.scrollY,
    btn: [...document.querySelectorAll('button')].slice(1, 3).map((b) => {
      const r = b.getBoundingClientRect()
      return { text: b.textContent.trim().slice(0, 20), x: r.x, right: r.right }
    }),
  }
})
console.log(JSON.stringify(m, null, 1))
await page.evaluate(() => window.scrollTo({ top: 1700, behavior: 'instant' }))
await new Promise((r) => setTimeout(r, 1500))
await page.screenshot({ path: '/tmp/xtra-shots/vp-system.png' })
await page.evaluate(() => window.scrollTo({ top: 2500, behavior: 'instant' }))
await new Promise((r) => setTimeout(r, 1500))
await page.screenshot({ path: '/tmp/xtra-shots/vp-brands.png' })
await browser.close()
console.log('done')
