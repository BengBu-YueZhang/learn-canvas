let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
const length = 50
const width = canvas.width
const height = canvas.height
// 小球的集合
let balls = []

class Ball {
  constructor (x, y, vx, vy, index, size = 2, color = '#757575') {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.size = size
    this.color = color
    this.index = index
  }

  draw () {
    ctx.save()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true)
    this.drawIine()
    if (this.x >= width - this.size || this.x <= 0 + this.size) {
      this.vx = -this.vx
    }
    if (this.y >= height - this.size || this.y <= 0 + this.size) {
      this.vy = -this.vy
    }
    this.x += this.vx
    this.y += this.vy
    ctx.fill()
    ctx.beginPath()
    ctx.restore()
  }

  drawIine () {
    for (let i = 0; i < balls.length; i++) {
      if (i === this.index) {
        continue
      } else {
        let diffx = Math.abs(this.x - balls[i].x)
        let diffy = Math.abs(this.y - balls[i].y)
        let diffs = Math.sqrt((diffx * diffx) + (diffy * diffy))
        if (diffs <= 200 ) {
          ctx.strokeStyle = `rgba(189, 189, 189, ${diffs / 200})`
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(balls[i].x, balls[i].y)
          ctx.stroke()
        }
      }
    }
  }
}

function init () {
  for (let i = 0; i < length; i++) {
    let xDirection = Math.floor(Math.random() * 2)
    let yDirection = Math.floor(Math.random() * 2)
    let x = Math.floor(Math.random() * width)
    let y = Math.floor(Math.random() * height)
    // -20 ~ -10 10 ~ 20的随机值
    let vx = Math.floor(Math.random() * 2 + 1)
    let vy = Math.floor(Math.random() * 2 + 1)
    vx = xDirection === 1 ? vx : -vx
    vy = yDirection === 1 ? vy : -vy
    let ball = new Ball(x, y, vx, vy, i)
    balls.push(ball)
  }
}

function draw () {
  ctx.save()
  ctx.clearRect(0, 0, width, height)
  for (let i = 0; i < balls.length; i++) {
    balls[i].draw()
  }
  ctx.restore()
  window.requestAnimationFrame(draw)
}

init()

window.requestAnimationFrame(draw)