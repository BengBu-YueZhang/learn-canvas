const canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

ctx.lineCap = 'round'

function randomFrom (lowerValue, upperValue) {
  return Math.floor(
    Math.random() * (upperValue - lowerValue + 1) + lowerValue
  )
}

const width = canvas.width
const height = canvas.height
const domWidth = canvas.getBoundingClientRect().width
const dowHeight = canvas.getBoundingClientRect().height

function throttle (fn, time = 150) {
  let self = fn
  let timer = null
  let isFirst = true
  return function (...rest) {
      if (isFirst) {
          self.apply(this, rest)
          isFirst = false
          return
      }

      if (timer) {
          return false
      }

      timer = setTimeout(() => {
          clearTimeout(timer)
          timer = null
          self.apply(this, rest)
      }, time)
  }
}

// 颜色
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

// 激光的加速系数
const AccelerationFactor = 1.07

// 一次产生的火花的数量
const sparksLength = 50

// target的最大半径
const TargetR = 12

// 全局的激光数组
let biuBiuBius = []
// 全局的靶子数组
let targets = []
// 全局火花数组
let sparks = []

/**
 * 火花类
 */
class Spark {
  constructor (x, y, radius = 3) {
    this.x = x
    this.y = y
    this.prevX = this.x
    this.prevY = this.y
    this.rate = Math.random()
    this.angle = Math.PI * 2 * Math.random()
    this.vx = radius * Math.cos(this.angle) * this.rate 
    this.vy = radius * Math.sin(this.angle) * this.rate
    this.opcity = 1
  }

  initVxVy () {
    this.x += this.vx
    this.y += this.vy 
    this.vy += 0.1
    // this.vx *= 0.99
    this.vy *= 0.99
    this.opcity -= 0.01
  }

  render () {
    this.initVxVy()
    if (this.opcity <= 0) {
      this.opcity = 0
      return false
    } else {
      ctx.save()
      ctx.beginPath()
      ctx.globalAlpha = this.opcity
      ctx.lineWidth = 5
      ctx.strokeStyle = colors[randomFrom(0, colors.length - 1)]
      ctx.moveTo(this.prevX, this.prevY)
      ctx.lineTo(this.x, this.y)
      ctx.stroke()
      ctx.restore()
      this.prevX = this.x
      this.prevY = this.y
      return true
    }
  }
}

/**
 * 激光类
 */
class BiuBiuBiu {
  constructor (targetX, targetY) {
    // 当前点的x, y坐标
    this.x = width / 2
    this.y = height
    // 前一帧的x, y坐标
    this.prevX = this.x
    this.prevY = this.y
    // 目标点的x, y坐标
    this.targetX = targetX
    this.targetY = targetY
    this.vx = 0
    this.vy = 0
    // 开始的速度
    this.v = 3
    // x, y的方向
    this.directionX = this.targetX > this.x ? 1 : 0
    this.directionY = 0
  }

  initVxVy () {
    let diffX = Math.abs(this.x - this.targetX)
    let diffY = Math.abs(this.y - this.targetY)
    let diffS = Math.sqrt((diffX * diffX) + (diffY * diffY))
    this.vy = (diffY / diffS) * this.v
    this.vx = (diffX / diffS) * this.v
    this.vx = this.directionX === 1 ? this.vx : -this.vx
    this.vy = this.directionY === 1 ? this.vy : -this.vy
    // 加速运动
    this.v *= AccelerationFactor
  }

  /**
   * 爆炸
   */
  boom () {
    for (let i = 0; i < sparksLength; i++) {
      let spark = new Spark(this.targetX, this.targetY)
      sparks.push(spark)
    }
  }

  render () {
    this.initVxVy()
    ctx.save()
    ctx.beginPath()
    ctx.lineWidth = 6
    ctx.strokeStyle = colors[randomFrom(0, colors.length - 1)]
    ctx.moveTo(this.prevX, this.prevY)
    ctx.lineTo(this.x, this.y)
    ctx.stroke()
    this.prevX = this.x
    this.prevY = this.y
    this.x += this.vx
    this.y += this.vy
    
    ctx.restore()
    if (
      (
        this.directionX === 1 &&
        this.y <= this.targetY &&
        this.x >= this.targetX
      ) ||
      (
        this.directionX === 0 &&
        this.y <= this.targetY &&
        this.x <= this.targetX
      )
    ) {
      this.boom()
      // 爆炸
      return false
    }
    return true
  }
}

/**
 * 靶子类
 */
class Target {
  constructor (x, y, r = 0) {
    this.x = x
    this.y = y
    this.r = 0
    this.status = 'plus'
  }

  render () {
    let color = colors[randomFrom(0, colors.length - 1)]
    ctx.save()
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.arc(
      this.x,
      this.y,
      this.r,
      0,
      ( Math.PI / 180 ) * 360,
      true
    )
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
    if (this.status === 'plus') {
      if (this.r < TargetR) {
        this.r += 1
      } else {
        this.r = TargetR
        this.status = 'less'
      }
    } else {
      if (this.r > 0) {
        this.r -= 1
      } else {
        this.r = 0
        this.status = 'plus'
      }
    }
  }
}

function onMousemove (event) {
  let x = event.pageX * (width / domWidth)
  let y = event.pageY * (height / dowHeight)
  let target = new Target(x, y)
  let biuBiuBiu = new BiuBiuBiu(x, y)
  targets.push(target)
  biuBiuBius.push(biuBiuBiu)
}

const throttleOnMousemove = throttle(onMousemove)

canvas.addEventListener('mousemove', (event) => {
  throttleOnMousemove(event)
})

function draw () {
  ctx.save()
  ctx.clearRect(0, 0, width, height)
  ctx.fillRect(0, 0, width, height)
  for (let i = 0; i < targets.length; i++) {
    targets[i].render()
  }
  for (let i = 0; i < biuBiuBius.length; i++) {
    let result = biuBiuBius[i].render()
    if (!result) {
      // 释放内存
      targets.splice(0, 1)
      biuBiuBius.splice(0, 1)
      i--
    }
  }
  for (let i = 0; i < sparks.length; i++) {
    let result = sparks[i].render()
    if (!result) {
      // 释放内存
      sparks.splice(0, 1)
      i--
    }
  }
  ctx.restore()
  window.requestAnimationFrame(draw)
}

window.requestAnimationFrame(draw)