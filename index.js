/*** 测试代码 */
const canvas = document.getElementById('canvas')

const width = canvas.width

const height = canvas.height

function randomNumber (lowerValue, upperValue) {
  return Math.floor(
    Math.random() * (upperValue - lowerValue + 1) + lowerValue
  )
}

function randomColor (opacity = 1) {
  return `rgba(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${opacity})`
}

let ctx = canvas.getContext('2d')

class Ball {
  constructor (x, y, z, r, color = '#757575') {
    this.x = x
    this.y = y
    this.r = r
    this.color = color
  }

  render () {
    ctx.save()
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
}
