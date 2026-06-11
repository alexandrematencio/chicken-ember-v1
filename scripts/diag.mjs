import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' })
await page.evaluate(async () => { window.scrollTo(0, document.body.scrollHeight); await new Promise(r => setTimeout(r, 1200)) })
const data = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll('img')].map((i) => ({
    src: (i.currentSrc || i.src).split('/').pop(),
    complete: i.complete,
    nw: i.naturalWidth,
    rect: { w: Math.round(i.getBoundingClientRect().width), h: Math.round(i.getBoundingClientRect().height) },
    vis: getComputedStyle(i).visibility,
    op: getComputedStyle(i).opacity,
  }))
  const sauce = document.querySelector('.sauce__title')
  const cs = sauce ? getComputedStyle(sauce) : null
  return {
    imgs,
    sauce: sauce && {
      text: sauce.textContent.slice(0, 50),
      color: cs.color,
      bgImage: cs.backgroundImage.slice(0, 60),
      clip: cs.webkitBackgroundClip || cs.backgroundClip,
      rectH: Math.round(sauce.getBoundingClientRect().height),
      childCount: sauce.querySelectorAll('.split-inner').length,
    },
  }
})
console.log(JSON.stringify(data, null, 1))
await browser.close()
