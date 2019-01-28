export default {
  /**
   * 创建裁剪框
   */
  created () {
    const scissors = `
      <div class="crop">
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
    // 添加dom
    document.getElementsByClassName('canvas')[0].innerHTML += scissors
    let cropTopLeft = document.getElementsByClassName('crop-top-left')[0]
    let cropTopCenter = document.getElementsByClassName('crop-top-center')[0]
    let cropTopRight = document.getElementsByClassName('crop-top-right')[0]
    let cropCenterLeft = document.getElementsByClassName('crop-center-left')[0]
    let cropCentetRight = document.getElementsByClassName('crop-centet-right')[0]
    let cropBottomLeft = document.getElementsByClassName('crop-bottom-left')[0]
    let cropBottomCenter = document.getElementsByClassName('crop-bottom-center')[0]
    let cropBottomRight = document.getElementsByClassName('crop-bottom-right')[0]
    console.log(cropTopLeft)
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