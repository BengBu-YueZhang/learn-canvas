import Tween from './tween.js'

/**
 * 参考了小寒的效果
 * https://www.dodoblog.cn/more
 */

const canvas = document.getElementById('canvas')

const pers = 100

// 50不是毫秒数，requestAnimationFrame的执行的次数
let toTime = 50
let formTime = 0

const width = canvas.width

const height = canvas.height

const DrawText = '新年快乐'

let balls = []

/**
 * 随机数字
 */
function randomNumber (lowerValue, upperValue) {
  return Math.floor(
    Math.random() * (upperValue - lowerValue + 1) + lowerValue
  )
}

/**
 * 随机色
 */
function randomColor (opacity = 1) {
  return `rgba(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${opacity})`
}

let CanvasCtx = canvas.getContext('2d')

/**
 * 小球构造类
 */
class Ball {
  constructor (x, y, z, r = 4, color = '#757575') {
    // 最初的坐标
    this.formX = randomNumber(-width, width)
    this.formY = randomNumber(-height, height)
    this.formZ = randomNumber(-100, 100)
    // 当前的坐标
    this.currentX = this.formX
    this.currentY = this.formY
    this.currentZ = this.formZ
    // 最终的坐标
    this.toX = x
    this.toY = y
    this.toZ = z
    this.r = r
    this.color = color
  }

  render (ctx) {
    // 透视原理的3d效果
    let scale = pers / (pers + this.currentZ)
    let x = parseInt(Math.abs( width / 2+ (this.currentX - width / 2) * scale))
    let y = parseInt(Math.abs( height / 2 + (this.currentY - height / 2) *scale))
    let r = this.r * scale
    ctx.save()
    ctx.fillStyle = this.color
    ctx.beginPath()
    // ctx.arc(this.toX, this.toY, this.r, 0, Math.PI * 2, true)
    ctx.arc(x, y, r, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
}

class Text {
  constructor (text) {
    this.text = text
    this.imageData = null
  }

  /**
   * 使用离屏渲染获取文字数据
   */
  getImageData () {
    // 离屏canvas
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    let CanvasCtx = canvas.getContext('2d')
    CanvasCtx.clearRect(0, 0, width, height)
    CanvasCtx.save()
    CanvasCtx.fillStyle = 'rgb(255, 255, 255)'
    CanvasCtx.fillRect(0, 0, width, height)
    CanvasCtx.fillStyle = 'rgb(0, 0, 0)'
    CanvasCtx.font = "240px 微软雅黑"
    CanvasCtx.textAlign = 'center'
    CanvasCtx.fillText(this.text, width / 2, height / 2)
    CanvasCtx.restore()
    this.imageData = CanvasCtx.getImageData(0, 0, width, height)
  }

  addBall () {
    for (let i = 4; i < this.imageData.width; i += 8) {
      for (let j = 4; j < this.imageData.height; j += 8) {
        let Rcolor = this.imageData.data[((j-1)*this.imageData.width + (i-1))*4 - 1 + 1]
        let Gcolor = this.imageData.data[((j-1)*this.imageData.width + (i-1))*4 - 1 + 2]
        let Bcolor = this.imageData.data[((j-1)*this.imageData.width + (i-1))*4 - 1 + 3]
        if (Rcolor < 180 && Gcolor < 180 && Bcolor < 180) {
          let ball = new Ball(i, j, 0)
          ball.render(CanvasCtx)
          balls.push(ball)
        }
      }
    }
  }
}

function init () {
  let text = new Text(DrawText)
  text.getImageData()
  text.addBall()
}

// 初始化小球
init()

function draw () {
  if (formTime <= toTime) {
    CanvasCtx.clearRect(0, 0, width, height)
    CanvasCtx.save()
    for (let i = 0; i < balls.length; i++) {
      balls[i].currentX = Tween.Quad.easeOut(formTime, balls[i].formX, balls[i].toX - balls[i].formX, toTime)
      balls[i].currentY = Tween.Quad.easeOut(formTime, balls[i].formY, balls[i].toY - balls[i].formY, toTime)
      balls[i].currentZ = Tween.Quad.easeOut(formTime, balls[i].formZ, balls[i].toZ - balls[i].formZ, toTime)
      balls[i].render(CanvasCtx)
    }
    CanvasCtx.restore()
    formTime++
    window.requestAnimationFrame(draw)
  }
}


window.requestAnimationFrame(draw)
