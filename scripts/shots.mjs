import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
})
const page = await browser.newPage()
const autoScroll = async () => {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0
      const t = setInterval(() => {
        y += 600
        window.scrollTo(0, y)
        if (y >= document.body.scrollHeight) { clearInterval(t); resolve() }
      }, 120)
    })
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 900))
  })
}
const shot = async (url, w, h, name, full = false) => {
  await page.setViewport({ width: w, height: h })
  await page.goto(`http://localhost:4173${url}`, { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 1600))
  if (full) await autoScroll()
  await page.screenshot({ path: `/tmp/shots/${name}.png`, fullPage: full })
  console.log(name, 'ok')
}
await shot('/', 1440, 900, 'pp-home-desktop')
await shot('/', 1440, 900, 'pp-home-full', true)
await shot('/', 390, 844, 'pp-home-mobile')
await shot('/menu', 1440, 900, 'pp-menu-full', true)
await shot('/commander', 390, 844, 'pp-commander-mobile')
await shot('/contact', 1440, 900, 'pp-contact-desktop')
await browser.close()
