import sharp from 'sharp'
const W = 1200, H = 630
const overlay = Buffer.from(`<svg width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="#0D0A08" opacity="0.45"/>
  <rect y="${H-260}" width="100%" height="260" fill="#0D0A08" opacity="0.55"/>
  <text x="70" y="${H-150}" font-family="Arial Black, Arial" font-weight="900" font-size="86" fill="#F4EDE4">CHICKEN <tspan fill="#FF4D1C">EMBER</tspan></text>
  <text x="70" y="${H-80}" font-family="Arial" font-size="34" fill="#FFB259">Poulet braisé halal · Villejuif · 4,9★</text>
</svg>`)
await sharp('/tmp/ember-candidates/final/hero-embers.jpg').resize(W, H, { fit: 'cover' }).composite([{ input: overlay }]).jpeg({ quality: 82 }).toFile('public/og.jpg')
await sharp('public/favicon.svg').resize(180, 180).png().toFile('public/apple-touch-icon.png')
console.log('og + touch icon ok')
