import sharp from 'sharp'
import { readdirSync, mkdirSync, writeFileSync } from 'fs'
const src = '/tmp/ember-candidates/final'
const out = 'public/img'
mkdirSync(out, { recursive: true })
const meta = {}
for (const f of readdirSync(src).filter(f => f.endsWith('.jpg'))) {
  const name = f.replace('.jpg', '')
  const img = sharp(`${src}/${f}`)
  const { width, height } = await img.metadata()
  await sharp(`${src}/${f}`).avif({ quality: 55 }).toFile(`${out}/${name}.avif`)
  await sharp(`${src}/${f}`).webp({ quality: 78 }).toFile(`${out}/${name}.webp`)
  // mobile-width variants for the big ones
  if (width > 1500) {
    await sharp(`${src}/${f}`).resize(900).avif({ quality: 55 }).toFile(`${out}/${name}-900.avif`)
    await sharp(`${src}/${f}`).resize(900).webp({ quality: 78 }).toFile(`${out}/${name}-900.webp`)
  }
  const lqip = await sharp(`${src}/${f}`).resize(20).blur(1).webp({ quality: 30 }).toBuffer()
  meta[name] = { width, height, lqip: `data:image/webp;base64,${lqip.toString('base64')}` }
}
writeFileSync('app/assets/img-meta.json', JSON.stringify(meta, null, 1))
console.log(Object.keys(meta).length, 'images optimized')
