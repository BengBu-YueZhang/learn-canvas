let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let width = parseInt(canvas.getAttribute('width').replace(/px/, ''), 10)
let height = parseInt(canvas.getAttribute('height').replace(/px/, ''), 10)

console.log(width)
console.log(height)


class Hourhand {
  constructor (ctx) {
    this.ctx = ctx
    this.date = new Date()
  }

  draw () {
    this.date = new Date()
    ctx.clearRect(0, 0, width, height)
    this.drawDial()
    this.drawScale()
    this.drawSecond()
    this.drawMinute()
    this.drawHour()
    window.requestAnimationFrame(this.draw.bind(this))
  }

  drawDial () {
    ctx.save()
    ctx.beginPath()
    ctx.translate(150, 150)
    ctx.lineWidth = 5
    ctx.strokeStyle = '#304ffe'
    ctx.arc(0, 0, 100, 0, (Math.PI/180) * 360, true)
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
  }

  drawScale () {
    const drawSecondPoint = (i) => {
      ctx.save()
      ctx.beginPath()
      ctx.translate(150, 150)
      ctx.lineWidth = 2
      if (i % 5 === 0) ctx.lineWidth = 6
      ctx.strokeStyle = '#009688'
      ctx.rotate((Math.PI/180) * i * 6)
      if (i % 5 === 0) {
        ctx.moveTo(0, -85)
      } else {
        ctx.moveTo(0, -90)
      }
      ctx.lineTo(0, -98)
      ctx.closePath()
      ctx.stroke()
      ctx.restore()
    }
    for (let i = 0; i < 60; i++) {
      drawSecondPoint(i)
    }
  }

  drawSecond () {
    let second = this.date.getSeconds()
    ctx.save()
    ctx.beginPath()
    ctx.translate(150, 150)
    ctx.lineWidth = 2
    ctx.strokeStyle = '#e65100'
    ctx.rotate((Math.PI/180) * second * 6)
    ctx.moveTo(0, 0)
    ctx.lineTo(0, -80)
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
  }

  drawMinute () {
    let minute = this.date.getMinutes()
    ctx.save()
    ctx.beginPath()
    ctx.translate(150, 150)
    ctx.lineWidth = 8
    ctx.strokeStyle = '#1b5e20'
    ctx.rotate((Math.PI/180) * minute * 6)
    ctx.moveTo(0, 0)
    ctx.lineTo(0, -50)
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
  }

  drawHour () {
    let hour = this.date.getHours()
    hour = hour < hour ? hour : hour - 12
    ctx.save()
    ctx.beginPath()
    ctx.translate(150, 150)
    ctx.lineWidth = 8
    ctx.strokeStyle = '#0091ea'
    ctx.rotate((Math.PI/180) * hour * 30)
    ctx.moveTo(0, 0)
    ctx.lineTo(0, -25)
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
  }
}

let hourhand = new Hourhand(ctx, 0, 0)

window.requestAnimationFrame(hourhand.draw.bind(hourhand))
