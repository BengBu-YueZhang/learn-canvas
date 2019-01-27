let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
// 马赛克的程度, 越大越模糊
const value = 10
const width = canvas.width
const height = canvas.height

const w = Math.ceil(width / value)
const h = Math.ceil(height / value)

// 获取像素点的颜色信息的颜色
function getColor (imageData, x, y) {
  let r = imageData.data[((y-1)*imageData.width + (x-1))*4 - 1 + 1]
  let g = imageData.data[((y-1)*imageData.width + (x-1))*4 - 1 + 2]
  let b = imageData.data[((y-1)*imageData.width + (x-1))*4 - 1 + 3]
  let a = imageData.data[((y-1)*imageData.width + (x-1))*4 - 1 + 4]
  return [r, g, b, a]
}

// 设置像素点的颜色
function setColor (imageData, x, y, color) {
  imageData.data[((y-1)*imageData.width + (x-1))*4 - 1 + 1] = color[0]
  imageData.data[((y-1)*imageData.width + (x-1))*4 - 1 + 2] = color[1]
  imageData.data[((y-1)*imageData.width + (x-1))*4 - 1 + 3] = color[2]
  imageData.data[((y-1)*imageData.width + (x-1))*4 - 1 + 4] = color[3]
}

function draw (imageData) {
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      // 取 value * value 中随机的颜色
      let color = getColor(
        imageData,
        i * value + Math.floor(Math.random() * value),
        j * value + Math.floor(Math.random() * value)
      )
      ctx.save()
      // 绘制马赛克小方块
      ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`
      ctx.fillRect(i * value, j * value, value, value)
      ctx.restore()  
    }
  }
}

let img = new Image()
img.onload = function () {
  ctx.drawImage(img, 0, 0)
  let data = ctx.getImageData(0, 0, width, height)
  draw(data)
}
img.src = 'https://i.loli.net/2019/01/27/5c4da4f295ede.png'
img.crossOrigin = "Anonymous"

