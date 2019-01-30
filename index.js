
import FileSaver from 'file-saver'
import Scissors from './scissors'
import './scissors.css'
const aiyanami = require('./aiyanami.jpg')
const bg = require('./bg.jpg')

Scissors.created()

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let image = new Image()
let bgImage = new Image()

bgImage.onload = function () {
  image.onload = function () {
    canvas.width = image.width
    canvas.height = image.height
  
    // 加载图片
    ctx.drawImage(image, 0, 0)
  
    setTimeout(() => {
      // ctx.clearRect(0, 0, canvas.width, canvas.height)
      const wrapper = document.getElementsByClassName('canvas-wrapper')[0]
      const wt = wrapper.getBoundingClientRect().top
      const wl = wrapper.getBoundingClientRect().left
      const { t, l, w, h } = Scissors.load()
      
      // 宽度是固定的
      // 
      const proportion = canvas.width / 375
      let myImageData = ctx.getImageData(
        (l - wl) * proportion,
        (t - wt) * proportion,
        w * proportion,
        h * proportion
      )
       canvas.width = w * ( canvas.width / 375 )
       canvas.height = canvas.width * ( h / w )
       ctx.putImageData(myImageData, 0, 0)
       canvas.toBlob((blob) => {
          FileSaver.saveAs(blob, "hello.jpg");
       }, 'image/png', 1)
    }, 6000)
  }
  image.src = aiyanami
}

bgImage.src = bg



