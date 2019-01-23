let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let bg = new Image()
let avatar = new Image()

bg.onload = function () {
  ctx.drawImage(bg, 0, 0)
}

avatar.onload = function () {
  setTimeout(() => {
    ctx.drawImage(avatar, 0, 0, 100, 100, 40, 40, 100, 100)
  }, 100)
}


bg.src = 'http://p1.music.126.net/Qgoya9RIjIYSIjscc9DmQA==/6669637534197208.jpg?param=180y180'
avatar.src = 'http://p1.music.126.net/YjF2lCo6S3cKq11HjpoCGA==/3297435381883556.jpg?param=180y180'