let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

ctx.fillStyle = '#039be5'
ctx.fillRect(0, 0, 200, 200)

ctx.fillStyle = '#eeff41'
ctx.globalAlpha = 0.2

for (let i = 0; i < 8; i++) {
  ctx.beginPath()
  ctx.arc(100, 100, 10 + 10 * i, 0, Math.PI*2,true)
  ctx.fill()
}

ctx.globalAlpha = 1