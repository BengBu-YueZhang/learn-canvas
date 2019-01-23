let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

ctx.save()

ctx.translate(100, 100)
ctx.fillStyle = '#e1f5fe'

for (let i = 0; i < 12; i++) {
  ctx.save()
  ctx.beginPath()
  ctx.rotate((Math.PI/180) * (i * 30))
  ctx.arc(
    30,
    30,
    10,
    0,
    (Math.PI/180) * 360,
    true
  )
  ctx.fill()
  ctx.restore()
}

ctx.restore()
