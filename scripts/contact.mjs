import sharp from 'sharp'
import { readdirSync } from 'fs'
const dir = '/tmp/ember-candidates'
const files = readdirSync(dir).filter(f => f.startsWith('p') && f.endsWith('.jpg') && f !== 'p2322426.jpg')
const TILE_W = 480, TILE_H = 360, COLS = 3
const groups = []
for (let i = 0; i < files.length; i += 9) groups.push(files.slice(i, i + 9))
let sheet = 0
for (const g of groups) {
  const tiles = []
  for (let i = 0; i < g.length; i++) {
    const img = await sharp(`${dir}/${g[i]}`).resize(TILE_W, TILE_H - 28, { fit: 'cover' }).toBuffer()
    const label = Buffer.from(`<svg width="${TILE_W}" height="28"><rect width="100%" height="100%" fill="black"/><text x="8" y="20" font-size="18" fill="white" font-family="monospace">${g[i]}</text></svg>`)
    const tile = await sharp({ create: { width: TILE_W, height: TILE_H, channels: 3, background: '#222' } })
      .composite([{ input: img, top: 0, left: 0 }, { input: label, top: TILE_H - 28, left: 0 }]).jpeg().toBuffer()
    tiles.push(tile)
  }
  const rows = Math.ceil(g.length / COLS)
  await sharp({ create: { width: TILE_W * COLS, height: TILE_H * rows, channels: 3, background: '#000' } })
    .composite(tiles.map((t, i) => ({ input: t, left: (i % COLS) * TILE_W, top: Math.floor(i / COLS) * TILE_H })))
    .jpeg({ quality: 80 }).toFile(`${dir}/sheet${sheet++}.jpg`)
}
console.log('sheets:', sheet)
