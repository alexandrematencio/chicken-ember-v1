import sharp from 'sharp'
const dir='/tmp/ember-candidates'
const files=['p21938179.jpg','p13458086.jpg','p6163330.jpg','p23876845.jpg','p4162492.jpg']
const TW=480,TH=360
const tiles=[]
for(let i=0;i<files.length;i++){
  const img=await sharp(`${dir}/${files[i]}`).resize(TW,TH-28,{fit:'cover'}).toBuffer()
  const label=Buffer.from(`<svg width="${TW}" height="28"><rect width="100%" height="100%" fill="black"/><text x="8" y="20" font-size="18" fill="white" font-family="monospace">${files[i]}</text></svg>`)
  tiles.push(await sharp({create:{width:TW,height:TH,channels:3,background:'#222'}}).composite([{input:img,top:0,left:0},{input:label,top:TH-28,left:0}]).jpeg().toBuffer())
}
await sharp({create:{width:TW*3,height:TH*2,channels:3,background:'#000'}}).composite(tiles.map((t,i)=>({input:t,left:(i%3)*TW,top:Math.floor(i/3)*TH}))).jpeg({quality:80}).toFile(`${dir}/sheet5.jpg`)
console.log('ok')
