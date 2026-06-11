import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
})
const page = await browser.newPage()
await page.setViewport({ width: 390, height: 844 })
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' })
const data = await page.evaluate(() => {
  const m = (sel) => {
    const el = document.querySelector(sel)
    if (!el) return null
    const r = el.getBoundingClientRect()
    const cs = getComputedStyle(el)
    return { sel, w: Math.round(r.width), x: Math.round(r.x), maxW: cs.maxWidth, display: cs.display, gtc: cs.gridTemplateColumns }
  }
  return {
    scrollW: document.scrollingElement.scrollWidth,
    innerW: window.innerWidth,
    els: ['.hero__in', '.hero__lead', '.hero__rating', '.hero__title', '.hero__actions'].map(m),
  }
})
console.log(JSON.stringify(data, null, 1))
await browser.close()
