let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let linecolor = ctx.createLinearGradient(0, 0, 0, 200)
linecolor.addColorStop(0, '#e3f2fd')
linecolor.addColorStop(1, '#0d47a1')

ctx.fillStyle = linecolor
ctx.fillRect(0, 0, 200, 200)