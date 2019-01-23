let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

/**
 * 画爱心
 */
function drawLove (ctx) {
  const coloes = [
    '#00bcd4',
    '#039be5',
    '#cddc39',
    '#5c6bc0',
    '#ec407a'
  ]
  ctx.save()
  ctx.beginPath()
  ctx.globalAlpha = 0.3
  ctx.fillStyle = coloes[Math.floor(Math.random() * 5)]
  ctx.moveTo(0, 0)
  ctx.bezierCurveTo(-30, -10, -20, 30, 0, 30)
  ctx.bezierCurveTo(20, 30, 30, -10, 0, 0)
  ctx.fill()
  ctx.restore()
}

ctx.save()

ctx.fillRect(0, 0, 200, 200)

ctx.beginPath()

ctx.translate(100, 100)

// 裁切的路径
ctx.arc(
  0,
  0,
  80,
  0,
  (Math.PI/180) * 360,
  true
)
ctx.clip()

let lingrad = ctx.createLinearGradient(0, -100 ,0, 100)
lingrad.addColorStop(0, '#232256')
lingrad.addColorStop(1, '#143778')
ctx.fillStyle = lingrad
ctx.fillRect(-100, -100, 200, 200)

for (let i = 0; i < 40; i++) {
  ctx.save()
  // 随机开始绘画的点
  ctx.translate(
    75-Math.floor(Math.random()*150),
    75-Math.floor(Math.random()*150)
  );
  drawLove(ctx)
  ctx.restore()
}