import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
})
for (const [name, width, height] of [['desktop', 1920, 1080], ['mobile', 375, 812]]) {
  const page = await browser.newPage()
  await page.setViewport({ width, height, deviceScaleFactor: 1 })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' })
  // scroll through the page to trigger the scroll-reveal animations
  await page.evaluate(async () => {
    const h = document.body.scrollHeight
    for (let y = 0; y < h; y += 400) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await new Promise((r) => setTimeout(r, 60))
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
  await new Promise((r) => setTimeout(r, 1200))
  await page.screenshot({ path: `/tmp/xtra-shots/final-${name}.png`, fullPage: true })
  await page.close()
}
await browser.close()
console.log('done')
