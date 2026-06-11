import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
})
for (const [path, label] of [['/', 'home'], ['/digital-wallet', 'wallet']]) {
  for (const w of [1280, 1500]) {
    const page = await browser.newPage()
    await page.setViewport({ width: w, height: 850, deviceScaleFactor: 1 })
    await page.goto(`http://localhost:5173${path}`, { waitUntil: 'networkidle0' })
    await new Promise((r) => setTimeout(r, 1800))
    await page.screenshot({ path: `/tmp/xtra-shots/w-${label}-${w}-hero.png` })
    if (label === 'wallet') {
      await page.evaluate(() => window.scrollTo({ top: 1400, behavior: 'instant' }))
      await new Promise((r) => setTimeout(r, 1200))
      await page.screenshot({ path: `/tmp/xtra-shots/w-${label}-${w}-mid.png` })
    }
    await page.close()
  }
}
await browser.close()
console.log('done')
