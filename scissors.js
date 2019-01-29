export default {
  /**
   * 创建裁剪框
   */
  created () {
    const scissors = `
      <div
        class="crop"
        style="
          left: 20px;
          top: 20px;
          width: 50px;
          height: 50px;
          padding-right: 50px;
          padding-bottom: 50px;
        "
      >
        <div class="crop-top-left"></div>
        <div class="crop-top-center"></div>
        <div class="crop-top-right"></div>
        <div class="crop-center-left"></div>
        <div class="crop-centet-right"></div>
        <div class="crop-bottom-left"></div>
        <div class="crop-bottom-center"></div>
        <div class="crop-bottom-right"></div>
      </div>
    `

    document.getElementsByClassName('canvas')[0].innerHTML += scissors
    
    let cropTopLeft = document.getElementsByClassName('crop-top-left')[0]
    let cropTopCenter = document.getElementsByClassName('crop-top-center')[0]
    let cropTopRight = document.getElementsByClassName('crop-top-right')[0]
    let cropCenterLeft = document.getElementsByClassName('crop-center-left')[0]
    let cropCentetRight = document.getElementsByClassName('crop-centet-right')[0]
    let cropBottomLeft = document.getElementsByClassName('crop-bottom-left')[0]
    let cropBottomCenter = document.getElementsByClassName('crop-bottom-center')[0]
    let cropBottomRight = document.getElementsByClassName('crop-bottom-right')[0]
    let crop = document.getElementsByClassName('crop')[0]

    let x = null
    let y = null
    let l = null
    let t = null

    function getPx (str) {
      return parseInt(str.replace(/px/, ''), 10)
    }
    
    function changeSize ({left, top, initX, initY, x, y, type}) {
      switch (type) {
        case 'bottom-center':
        case 'bottom-right':
        case 'center-right':
          if (x !== undefined) {
            crop.style.paddingRight = initX + x + 'px'
          }
          if (y !== undefined) {
            crop.style.paddingBottom = initY + y + 'px'
          }
          break
        case 'center-left':
        case 'bottom-left':
          if (x !== undefined) {
            crop.style.width = initX + x + 'px'
            crop.style.left = left - x + 'px'
          }
          if (y !== undefined) {
            crop.style.paddingBottom = initY + y + 'px'
          }
          break
        case 'top-right':
        case 'top-center':
          console.log(y)
          if (x !== undefined) {
            crop.style.paddingRight = initX + x + 'px'
          }
          if (y !== undefined) {
            crop.style.height = initY + y + 'px'
            crop.style.top = top - y + 'px'
          }
          break
        case 'top-left':
          break
      }
      
    }

    crop.onmousedown = function (e) {
      e.stopPropagation()
      e.preventDefault()
      x = e.clientX
      y = e.clientY
      l = getPx(crop.style.left)
      t = getPx(crop.style.top)
      crop.onmousemove = function (e) {
        e.stopPropagation()
        e.preventDefault()
        crop.style.left = `${e.clientX - (x - l)}px`
        crop.style.top = `${e.clientY - (y - t)}px`
      }
      document.onmouseup = function (e) {
        e.stopPropagation()
        e.preventDefault()
        crop.onmousemove = null
        crop.onmouseup = null
      } 
    }

    cropBottomRight.onmousedown = function (e) {
      e.stopPropagation()
      e.preventDefault()
      x = e.clientX
      y = e.clientY
      let initX = getPx(crop.style.paddingRight)
      let initY = getPx(crop.style.paddingBottom)
      document.onmousemove = function (e) {
        e.stopPropagation()
        e.preventDefault()
        changeSize({ initX, initY, x: e.clientX - x, y: e.clientY - y, type: 'bottom-right' })
      }
      document.onmouseup = function (e) {
        e.stopPropagation()
        e.preventDefault()
        document.onmousemove = null
        document.onmouseup = null
      } 
    }

    cropBottomCenter.onmousedown = function (e) {
      e.stopPropagation()
      e.preventDefault()
      y = e.clientY
      let initY = getPx(crop.style.paddingBottom)
      document.onmousemove = function (e) {
        e.stopPropagation()
        e.preventDefault()
        changeSize({ initY, y: e.clientY - y, type: 'bottom-center' })
      }
      document.onmouseup = function (e) {
        e.stopPropagation()
        e.preventDefault()
        document.onmousemove = null
        document.onmouseup = null
      } 
    }

    cropBottomLeft.onmousedown = function (e) {
      e.stopPropagation()
      e.preventDefault()
      x = e.clientX
      y = e.clientY
      let initX = getPx(crop.style.width)
      let initY = getPx(crop.style.paddingBottom)
      let left = getPx(crop.style.left)
      document.onmousemove = function (e) {
        e.stopPropagation()
        e.preventDefault()
        changeSize({ left, initX, initY, x: -(e.clientX - x), y: e.clientY - y, type: 'bottom-left' })
      }
      document.onmouseup = function (e) {
        e.stopPropagation()
        e.preventDefault()
        document.onmousemove = null
        document.onmouseup = null
      } 
    }

    cropCenterLeft.onmousedown = function (e) {
      e.stopPropagation()
      e.preventDefault()
      x = e.clientX
      let initX = getPx(crop.style.width)
      let left = getPx(crop.style.left)
      document.onmousemove = function (e) {
        e.stopPropagation()
        e.preventDefault()
        changeSize({ left, initX, x: -(e.clientX - x), type: 'center-left' })
      }
      document.onmouseup = function (e) {
        e.stopPropagation()
        e.preventDefault()
        document.onmousemove = null
        document.onmouseup = null
      } 
    }

    cropCentetRight.onmousedown = function (e) {
      e.stopPropagation()
      e.preventDefault()
      x = e.clientX
      let initX = getPx(crop.style.width)
      document.onmousemove = function (e) {
        e.stopPropagation()
        e.preventDefault()
        changeSize({ initX, x: e.clientX - x, type: 'center-right' })
      }
      document.onmouseup = function (e) {
        e.stopPropagation()
        e.preventDefault()
        document.onmousemove = null
        document.onmouseup = null
      } 
    }

    cropTopRight.onmousedown = function (e) {
      e.stopPropagation()
      e.preventDefault()
      x = e.clientX
      y = e.clientY
      let initX = getPx(crop.style.paddingRight)
      let initY = getPx(crop.style.height)
      let top = getPx(crop.style.top)
      document.onmousemove = function (e) {
        changeSize({ initX, initY, top, x: e.clientX - x, y: -(e.clientY - y), type: 'top-right' })
        e.stopPropagation()
        e.preventDefault()
      }
      document.onmouseup = function (e) {
        e.stopPropagation()
        e.preventDefault()
        document.onmousemove = null
        document.onmouseup = null
      } 
    }
  },

  /**
   * 移除裁剪框
   */
  remove () {
    const crop = document.getElementsByClassName('crop')[0]
    document.getElementsByClassName('canvas')[0].removeChild(crop)
  },

  /**
   * 生成图片
   */
  load () {
  }
}