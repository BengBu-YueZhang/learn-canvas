let canvas = document.getElementById('canvas')
canvas.style.filter = `blur(0.3px)`
canvas.style.overflow = `hidden`
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
  '#f50057',
  '#dce775',
  '#c0ca33',
  '#2e7d32',
  '#ff4081',
  '#e53935',
  '#9c27b0',
  '#80d8ff',
  '#81d4fa',
  '#ff9100'
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
      this.alpha += 0.005
      if (this.alpha >= 0.9) {
        this.alpha = 0.9
        this.status = 'negative'
      }
    } else {
      this.alpha -= 0.005
      if (this.alpha <= 0) {
        this.alpha = 0
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

for (let i = 0; i < 330; i++) {
  let color = colors[
    Math.floor(Math.random() * colors.length)
  ]
  let heart = new Heart(
    color,
    Math.random(),
    Math.floor(Math.random() * 2560),
    Math.floor(Math.random() * 1440)
  )
  hearts.push(heart)
}

function animation () {
  ctx.clearRect(0, 0, 2560, 1440)
  ctx.save()
  ctx.fillRect(0, 0, 2560, 1440)
  for (let i = 0; i < hearts.length; i++) {
    hearts[i].draw()
  }
  ctx.restore()
  window.requestAnimationFrame(animation)
}


window.requestAnimationFrame(animation)
