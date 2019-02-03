import './tween.js'
import './animation.js'

/**
 * 参考了小寒的效果
 * https://www.dodoblog.cn/more
 */

const canvas = document.getElementById('canvas')

const pers = 100

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

let ctx = canvas.getContext('2d')

/**
 * 小球构造类
 */
class Ball {
  constructor (x, y, z, r = 4, color = '#757575') {
    this.toX = x
    this.toY = y
    this.toZ = z
    this.r = r
    this.color = color
    this.formX = randomNumber(-width, width)
    this.formY = randomNumber(-height, height)
    // z坐标随机-100到100
    this.formZ = randomNumber(-100, 100)
  }

  render () {
    // let scale = pers / (pers + this.z)
    // let x = parseInt(Math.abs(w/2+(this.x-w/2)*scale));
    // let y = parseInt(Math.abs(h/2+(this.y-h/2)*scale));
    // let r = this.r*scale;
    // ctx.save()
    // ctx.fillStyle = this.color
    // ctx.beginPath()
    // ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true)
    // ctx.closePath()
    // ctx.fill()
    // ctx.restore()
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
    let ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, width, height)
    ctx.save()
    ctx.fillRect(0, 0, width, height, '#fffff')
    ctx.font = "120px 微软雅黑"
    ctx.textAlign = 'center'
    ctx.fillText(this.text, width / 2, height / 2)
    ctx.restore()
    this.imageData = ctx.getImageData(0, 0, width, height)
  }

  addBall () {
    for (let i = 4; i < this.imageData.width; i += 8) {
      for (let j = 4; j < this.imageData.height; j += 8) {
        // 判断当前点的是否有颜色，判断当前点是否渲染文字
        let Rcolor = this.imageData.data[((i-1)*this.imageData.width + (j-1))*4 - 1 + 1]
        if (Rcolor !== 0) {
        }
      }
    }
  }
}

function init () {
  let text = new Text(DrawText)
  text.getImageData()
  text.addBall()
  console.log('???')
}

init()
