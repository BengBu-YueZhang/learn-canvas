let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let avatar = new Image()

avatar.onload = function () {
  ctx.arc(100, 100, 50, 0, (Math.PI/180) * 360, true)
  ctx.clip()
  ctx.drawImage(avatar, 50, 50, 100, 100);
}

avatar.src = 'http://p1.music.126.net/YjF2lCo6S3cKq11HjpoCGA==/3297435381883556.jpg?param=180y180'