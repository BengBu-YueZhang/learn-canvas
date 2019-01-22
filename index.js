let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')


for (let i = 0; i < 10; i++) {
  ctx.beginPath()
  ctx.lineWidth = i + 1
  ctx.moveTo(i * 10 + 10, 10)
  ctx.lineTo(i * 10 + 10, 50)
  ctx.closePath()
  ctx.stroke()
}