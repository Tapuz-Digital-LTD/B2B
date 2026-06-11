import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
})
for (const [name, width, height] of [['lp-desktop', 1920, 1000], ['lp-mobile', 375, 812]]) {
  const page = await browser.newPage()
  await page.setViewport({ width, height, deviceScaleFactor: 1 })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' })
  await page.evaluate(async () => {
    const h = document.body.scrollHeight
    for (let y = 0; y < h; y += 500) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await new Promise((r) => setTimeout(r, 80))
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
  await new Promise((r) => setTimeout(r, 1500))
  await page.screenshot({ path: `/tmp/xtra-shots/${name}.png`, fullPage: true })
  await page.close()
}
await browser.close()
console.log('done')
