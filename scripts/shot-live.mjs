import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' })
const page = await browser.newPage()
const fails = []
page.on('requestfailed', (r) => fails.push(r.url().split('/').slice(-2).join('/')))
page.on('response', (r) => { if (r.status() >= 400) fails.push(`${r.status()} ${r.url().split('/').slice(-2).join('/')}`) })
await page.setViewport({ width: 1440, height: 900 })
await page.goto('https://alexandrematencio.github.io/chicken-ember-v1/', { waitUntil: 'networkidle0' })
await new Promise((r) => setTimeout(r, 1800))
await page.screenshot({ path: '/tmp/shots/live-home.png' })
console.log('failed requests:', fails.length ? fails : 'none')
await browser.close()
