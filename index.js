let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let hearts = []
const colors = [
  '#80d8ff',
  '#c5e1a5',
  '#303f9f',
  '#ff4081',
  '#d50000',
  '#8bc34a',
  '#66bb6a',
  '#ff9800',
  '#ffeb3b',
  '#29b6f6',
  '#80deea',
  '#8bc34a',
  '#eeff41',
  '#f9a825',
  '#f4511e',
  '#ff80ab',
  '#ad1457',
  '#ff4081',
  '#f50057'
]

class Heart {
  constructor (color, alpha, x, y) {
    this.x = x
    this.y = y
    this.color = color
    this.alpha = alpha
    this.status = 'positive'
  }

  draw () {
    if (this.status === 'positive') {
      this.alpha += 0.006
      if (this.alpha >= 0.9) {
        this.alpha = 0.9
        this.status = 'negative'
      }
    } else {
      this.alpha -= 0.006
      if (this.alpha <= 0) {
        this.alpha = 0.01
        this.status = 'positive'
      }
    }
    ctx.save()
    ctx.translate(
      this.x,
      this.y
    )
    ctx.globalAlpha = this.alpha
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(-30, -10, -20, 30, 0, 30)
    ctx.bezierCurveTo(20, 30, 30, -10, 0, 0)
    ctx.fill()
    ctx.restore()
  }
}

for (let i = 0; i < 100; i++) {
  let color = colors[
    Math.floor(Math.random() * colors.length)
  ]
  let heart = new Heart(
    color,
    Math.random(),
    Math.floor(Math.random() * 500),
    Math.floor(Math.random() * 500)
  )
  hearts.push(heart)
}

function animation () {
  ctx.clearRect(0, 0, 500, 500)
  ctx.save()
  ctx.fillRect(0, 0, 500, 500)
  for (let i = 0; i < 100; i++) {
    hearts[i].draw()
  }
  ctx.restore()
  window.requestAnimationFrame(animation)
}


window.requestAnimationFrame(animation)
