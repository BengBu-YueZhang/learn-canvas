let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let list = []
const colors = [
  '#ff8a65', '#ff7043', '#a1887f', '#8d6e63', '#90a4ae', '#78909c', '#ffff00', '#ffd740', '#ffab40',
  '#81c784', '#aed581', '#dce775', '#0288d1', '#0097a7', '#039be5', '#4fc3f7', '#1e88e5', '#e91e63'
]
const width = canvas.width
const height = canvas.height
// 同时释放的个数
const length = 2
// 释放的时间间隔, 30, 60次的requestAnimationFrame循环
let time = randomFrom(40, 70)

function randomFrom (lowerValue, upperValue) {
 return Math.floor(
   Math.random() * (upperValue - lowerValue + 1) + lowerValue
  )
}


class Fireworks { 
  constructor (x, targetY, color, particleCount = 200) {
    this.x = x
    this.y = height - 100
    this.prevY = this.y
    this.color = color
    this.speed = -randomFrom(55, 70)
    this.status = 'flight'
    this.opcity = 1
    this.particles = []
    this.sparks = []
    this.particleCount = particleCount
  }

  createdParticle () {
    this.opcity = 1
    for (let i = 0; i < this.particleCount; i++) {
      let particle = new Particle(this.x, this.y, this.color)
      this.particles.push(particle)
    }
  } 

  flight () {
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.bezierCurveTo(this.x - 7, this.y, this.x - 5, this.y + 16, this.x, this.y + 20)
    ctx.bezierCurveTo(this.x + 5, this.y + 16, this.x + 7, this.y, this.x, this.y)
    // 飞行过程中产生火花
    if (Math.abs(this.prevY - this.y) > 15) {
      this.prevY = this.y
      for (let i = 0; i < 2; i++) {
        let spark = new Spark(this.x, randomFrom(this.y + 8, this.y + 20), this.color)
        this.sparks.push(spark)
      }
    }
    ctx.globalAlpha = this.opcity
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
    ctx.restore()
    this.speed *= .93;
    this.y += this.speed
    this.opcity -= 0.015
    if (this.opcity <= 0.2) {
      this.createdParticle()
      this.opcity = 0
      this.status = 'boom'
    }
    return true
  }

  boom () {
    let opcity = 0
    ctx.save()
    for (let i = 0; i < this.particles.length; i++) {
      let result = this.particles[i].render()
      if (!result) {
        this.particles.splice(i, 1)
        i--
      } else {
        if (result.opcity) {
          opcity = result.opcity
        }
      }
    }
    ctx.restore()
    if (this.particles.length === 0) {
      this.status = 'finish'
    }
    return {
      opcity: opcity,
      color: this.color
    }
  }

  render () {
    if (this.sparks.length > 0) {
      for (let i = 0; i < this.sparks.length; i++) {
        let result = this.sparks[i].render()
        if (!result) {
          this.sparks.splice(i, 1)
        }
      }
    }
    switch (this.status) {
      case 'flight':
        return this.flight()
      case 'boom':
        return this.boom()
      case 'finish':
      default:
        return false
    }
  }
}

class Particle {
  constructor (x, y, color, radius = 3) {
    this.x = x
    this.y = y
    this.color = color
    this.rate = Math.random()
    this.angle = Math.PI * 2 * Math.random()
    this.vx = radius * Math.cos(this.angle) * this.rate 
    this.vy = radius * Math.sin(this.angle) * this.rate
    this.opcity = 1
  }

  render () {
    this.x += this.vx
    this.y += this.vy 
    this.vy += 0.02
    this.vx *= 0.99
    this.vy *= 0.99
    this.opcity -= 0.0080
    if (this.opcity <= 0) {
      this.opcity = 0
      return false
    } else {
      ctx.save()
      ctx.beginPath()
      ctx.globalAlpha = this.opcity
      ctx.fillStyle = this.color
      ctx.arc(this.x, this.y, 4, 0, Math.PI * 2, false)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
      return {
        opcity: this.opcity
      }
    }
  }
}

class Spark {
  constructor (x, y) {
    let xDirection = Math.floor(Math.random() * 2)
    this.x = x
    this.y = y
    this.speedY = 0.5
    this.speedX = xDirection === 1 ? Math.random() - 0.5 : -(Math.random() - 0.5)
    this.opcity = 1
  }

  render () {
    this.speedY *= .98
    this.speedX *= .98
    this.y += this.speedY
    this.x += this.speedX
    this.opcity -= 0.0155
    if (this.opcity <= 0) {
      this.opcity = 0
      return false
    } else {
      ctx.save()
      ctx.beginPath()
      ctx.fillStyle = '#ffeb3b'
      ctx.globalAlpha = this.opcity
      ctx.arc(this.x, this.y, 0.5, 0, (Math.PI/180) * 360, true)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
      return true
    }
  }
}

function draw () {
  let maxOpcity = 0
  let color = ''
  ctx.save()
  if (--time < 0) {
    for (let i = 0; i < length; i++) {
      let fireworks = new Fireworks(
        randomFrom(100, width - 100),
        randomFrom(100, 200),
        colors[Math.floor(Math.random() * colors.length)]
      )
      list.push(fireworks)
    }
    time = randomFrom(40, 70)
  }
  for (let i = 0; i < list.length; i++) {
    let result = list[i].render()
    if (!result) {
      list.splice(i, 1)
      i--
    } else {
      if (result.color && result.opcity > maxOpcity) {
        maxOpcity = result.opcity
        color = result.color
      }
    }
  }
  
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
  ctx.fillRect(0, 0, width, height)
  ctx.globalAlpha = 0.04
  ctx.fillStyle = color
  ctx.fillRect(0, 0, width, height)
  ctx.restore()
  window.requestAnimationFrame(draw)
}

window.requestAnimationFrame(draw)