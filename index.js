const canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

const width = canvas.width
const height = canvas.height
const domWidth = canvas.getBoundingClientRect().width
const dowHeight = canvas.getBoundingClientRect().height
const v = [1.1, 1.2, 1.3, 1.4]

const length = 2

function randomFrom (lowerValue, upperValue) {
  return Math.floor(
    Math.random() * (upperValue - lowerValue + 1) + lowerValue
  )
}

const colors = [
  '#f44336',
  '#e91e63',
  '#4caf50',
  '#f5f5f5',
  '#8bc34a',
  '#ffeb3b',
  '#673ab7',
  '#ffc107',
  '#ff5722',
  '#81c784',
  '#29b6f6',
  '#03a9f4',
  '#1e88e5',
  '#e91e63',
  '#d81b60',
  '#26a69a'
]

let paopaos = []

class PaoPao {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.color = colors[randomFrom(0, colors.length - 1)]
    // 缩放比例
    this.rate = Math.random()
    this.r = 40
    this.angle = ( Math.PI / 180 ) * 180 * Math.random()
    this.vx = 5 * Math.cos(this.angle) * this.rate 
    this.vy = -Math.abs(5 * Math.sin(this.angle) * this.rate)
    this.v = v[randomFrom(0, v.length - 1)]
  }

  render () {
    ctx.save()
    ctx.fillStyle = this.color
    ctx.globalAlpha = 0.8
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.restore()
    this.r -= this.v
    this.x += this.vx
    this.y += this.vy
    if (this.r <= 0) {
      this.r = 0
      return false
    } else {
      return true
    }
  }
}


canvas.addEventListener('mousemove', function (event) {
  for (let i = 0; i < length; i++) {
    let paoPao = new PaoPao(
      event.pageX * (width / domWidth),
      event.pageY * (height / dowHeight),
    )
    paopaos.push(paoPao)
  }
})

function draw () {
  ctx.save()
  ctx.clearRect(0, 0, width, height)
  ctx.fillRect(0, 0, width, height)
  for (let i = 0; i < paopaos.length; i++) {
    let result = paopaos[i].render()
    if (!result) {
      paopaos.splice(i, 1)
      i--
    }
  }
  ctx.restore()
  window.requestAnimationFrame(draw)
}

window.requestAnimationFrame(draw)
