### 渲染上下文

目前canvas只支持2d的上下文

```js

canvas.getContext('2d')
```

### 栅格

![CANVAS坐标](https://mdn.mozillademos.org/files/224/Canvas_default_grid.png)

### 绘制矩形

- fillRect(x, y, w, h) 绘制填充矩形
- strokeRect(x, y, w, h) 矩形边框
- clearRect(x, y, w, h) 清除矩形区域

```js

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

ctx.fillStyle = "rgb(200,0,0)"
ctx.fillRect(10, 10, 55, 50)

ctx.fillStyle = "rgba(0, 0, 200, 0.5)"
ctx.strokeRect(30, 30, 55, 50)

ctx.clearRect(20, 20, 10, 10)
```

### 绘制路径

图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。

通过路径绘制图形的步骤:

1. 首先，你需要创建路径起始点。
2. 然后你使用画图命令去画出路径。
3. 之后你把路径封闭。
4. 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。

#### 绘制路径的api

1. beginPath, 开始绘制路径
2. closePath, 闭合路径(当前点到起始点的直线)(fill会自动闭合, stroke不会自动闭合)
3. fill, 填充
4. stroke, 绘制图形轮廓

```js

/**
 * 绘制一个三角形
 */

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

// 自动闭合
ctx.beginPath()
ctx.moveTo(10, 10)
ctx.lineTo(50, 50)
ctx.lineTo(5, 30)
ctx.fill()

// 需要闭合
ctx.beginPath()
ctx.moveTo(60, 60)
ctx.lineTo(100, 20)
ctx.lineTo(50, 50)
ctx.closePath()
ctx.stroke()
```

#### 移动笔触

moveTo(x, y) 改变绘制的起始点

#### 线

lineTo(x, y) 绘制当前点到(x, y)坐标的直线

#### 圆弧

arc(x, y, 半径, 开始弧度, 结束弧度, true(逆时针)/false(顺时针))

弧度=(Math.PI/180) * 角度

```js

// 画一个圆
ctx.beginPath()
ctx.arc(
  30,
  30,
  20,
  0,
  (Math.PI/180) * 360,
  true
)
ctx.fill()

// 画一些圆
for (let i = 0; i < 5; i++) {
  ctx.beginPath()
  ctx.arc(
    (i + 1) * 20,
    20,
    10,
    0,
    (Math.PI/180) * 360,
    true
  )
  if (i % 2 > 0) {
    ctx.fill()
  } else {
    ctx.stroke()
    ctx.closePath()
  }
}
```

#### 二次贝塞尔曲线及三次贝塞尔曲线

![image](https://mdn.mozillademos.org/files/223/Canvas_curves.png)

##### 二次贝塞尔 quadraticCurveTo

[二次生成器](http://blogs.sitepointstatic.com/examples/tech/canvas-curves/quadratic-curve.html)

quadraticCurveTo(控制点x, 控制点y, 结束x, 结束y)

```js

// 确定开始点和结束点后, 通过控制点进行控制

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')


ctx.beginPath()
ctx.moveTo(100, 250);
ctx.quadraticCurveTo(101, 308, 200, 250);
ctx.stroke();
```

##### 三次贝塞尔 bezierCurveTo

[三次生成器](http://www.victoriakirst.com/beziertool/)

bezierCurveTo(控制点x1, 控制点y1, 控制点x2, 控制点y2, 结束x, 结束y)

```js

// 绘制红心
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

ctx.fillStyle = '#d32f2f'
ctx.beginPath();
ctx.moveTo(240, 150);
ctx.bezierCurveTo(190, 120, 170, 190, 240, 230)
ctx.bezierCurveTo(310, 190, 290, 120, 240, 150)
ctx.fill()

```

#### Path2D 对象

可以用来创建缓存Canvas对象

```js

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let rectangle = new Path2D()
rectangle.rect(10, 10, 50, 50)

let circle = new Path2D()
circle.moveTo(125, 35)
circle.arc(100, 35, 25, 0, 2 * Math.PI)

// 之后再绘制Path2D对象
ctx.stroke(rectangle)
ctx.fill(circle)
```

#### 绘制吃豆人


### 颜色

1. fillStyle, 填充色
2. strokeStyle, 填充边框色

#### fillStyle

```js

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 6; j++) {
    ctx.fillStyle = `rgb(${ Math.floor(255 - 40 * i) }, ${ Math.floor(255 - 40 * j) }, 0)`
    ctx.fillRect(j * 30, i * 30, 30, 30)
  }
}
```

#### strokeStyle

```js

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    ctx.strokeStyle = `rgb(${ Math.floor(255 - 40 * i) }, ${ Math.floor(255 - 40 * j) }, 0)`
    ctx.beginPath()
    ctx.arc(
      30 + j * 30,
      30 + i * 30,
      10,
      0,
      Math.PI*2,
      true
    )
    ctx.stroke()
  }
}
```

#### 透明度

fillStyle, strokeStyle可以接受rgba的值用来设置透明度。

globalAlpha, 可以用来设置接下来绘制图形的全局透明度

```js

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

ctx.fillStyle = '#039be5'
ctx.fillRect(0, 0, 200, 200)

ctx.fillStyle = '#eeff41'
ctx.globalAlpha = 0.2

for (let i = 0; i < 8; i++) {
  ctx.beginPath()
  ctx.arc(100, 100, 10 + 10 * i, 0, Math.PI*2,true)
  ctx.fill()
}
```

### lineStyles

设置线条的样式属性, 这里不会纠结具体的细节。用到的时候在过来查询。

1. lineWidth 线的宽度
2. lineCap 线的末端样式
3. lineJop 线条结合处的样式

#### lineWidth

宽度为奇数的线并不能精确呈现, 如下图所示。如果需要宽度为1的线, 我们需要对坐标进行更精准的控制。比如设置3.5的x坐标

![image](https://developer.mozilla.org/@api/deki/files/601/=Canvas-grid.png)

```js

// lineWidth 示例

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

for (let i = 0; i < 10; i++) {
  ctx.beginPath()
  ctx.lineWidth = i + 1
  ctx.moveTo(i * 10 + 10, 10)
  ctx.lineTo(i * 10 + 10, 50)
  ctx.closePath()
  ctx.stroke()
}
```

#### lineCap

默认为butt类型

1. butt
2. round
3. square

![image](https://developer.mozilla.org/@api/deki/files/88/=Canvas_linecap.png)

#### lineJoin

1. round 圆角
2. bevel 延长
3. miter 截断

![image](https://developer.mozilla.org/@api/deki/files/89/=Canvas_linejoin.png)

### 渐变

#### createLinearGradient 线性渐变

createLinearGradient(x1, y1, x2, y2), 设置渐变的起点终点的坐标

addColorStop(pos, color), pos是0-1表示位置的百分比，color表示pos百分比位置的颜色

```js

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let linecolor = ctx.createLinearGradient(0, 0, 0, 200)
linecolor.addColorStop(0, '#e3f2fd')
linecolor.addColorStop(1, '#0d47a1')

ctx.fillStyle = linecolor
ctx.fillRect(0, 0, 200, 200)
```

#### createRadialGradient 径向渐变

不同与经典的径向渐变, 只有一个中心点。canvas中可以设置两个不同的中心点。颜色从两个中心点进行扩散

### Patterns

使用图片进行填充，但是必须将图片加载onload完成后才可以, createPattern的第二个参数可以设置背景图片是否重复

```js

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

const src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png'

let img = new Image()

img.src = src

img.onload = function () {
  let path = ctx.createPattern(img, 'repeat')
  ctx.fillStyle = path
  ctx.fillRect(0, 0, 150, 150)
}
```

### Shadows

shadowOffsetX x方向的偏移量

shadowOffsetY y方向的偏移量

shadowBlur 模糊

shadowColor 阴影的颜色

```js

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;
ctx.shadowBlur = 2;
ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

ctx.fillStyle = "Yellow";

ctx.fillRect(0, 0, 100, 100)
```

### 文本

fillText(text, x, y) 绘制文本

strokeText(text, x, y) 绘制文本边框

#### 获取文本宽度

```js
var text = ctx.measureText("foo");
text.width;
```

### 使用图片

#### drawImage

drawImage(image, x, y, w, h)

```js

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let img = new Image()

img.onload = function () {
  for (let i = 0; i < 5; i++) {
    ctx.drawImage(img, i * 50, 0, 50, 50)
  }
}

img.src = 'http://p1.music.126.net/YjF2lCo6S3cKq11HjpoCGA==/3297435381883556.jpg?param=180y180'
```

#### Slicing

drawImage的后四个参数是切片参数, drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

sx, sy, sWidth, sHeight 是对原图切片位置和大小

dx, dy, dWidth, dHeight 是切片后的图片的位置和大小

具体见下图

![image](https://developer.mozilla.org/@api/deki/files/79/=Canvas_drawimage.jpg)

```js

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

```

```js

// 圆形的头像
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let avatar = new Image()

avatar.onload = function () {
  ctx.arc(100, 100, 50, 0, (Math.PI/180) * 360, true)
  ctx.clip()
  ctx.drawImage(avatar, 50, 50, 100, 100);
}

avatar.src = 'http://p1.music.126.net/YjF2lCo6S3cKq11HjpoCGA==/3297435381883556.jpg?param=180y180'
```

### Transformations 变形

在作变形操作前保存状态是一个良好的习惯

#### save

save方法将当前上下文的状态推送到栈中保存

#### restore

restore则是将上一个保存的状态取出, 恢复到上下文中

```js

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

// 第一次保存状态
// fillStyle是黑色
ctx.save()

// 第二次保存状态
// fillStyle是0d47a1
ctx.fillStyle = '#0d47a1'
ctx.save()

ctx.fillStyle = '#0097a7'

ctx.fillRect(0, 0, 100, 100)
// 取回上一次保存的颜色
ctx.restore()
ctx.fillRect(100, 0, 100, 100)
```

#### translate

translate可以改变canvas的原点的位置， translate(x, y)为原点的坐标

#### Rotating

旋转canvas, 接受的是弧度的值, 除非使用translate，原点依旧是0，0

![image](https://developer.mozilla.org/@api/deki/files/84/=Canvas_grid_rotate.png)

```js
// 旋转45度的正方形
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

ctx.save()

ctx.fillRect(0, 0, 100, 100)

ctx.fillStyle = '#e1f5fe'

ctx.translate(100, 100)
ctx.rotate((Math.PI/180) * 45)

ctx.fillRect(0, 0, 100, 100)

ctx.restore()
```

```js

// 一圈圆圈

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

ctx.save()

ctx.translate(100, 100)
ctx.fillStyle = '#e1f5fe'

for (let i = 0; i < 12; i++) {
  ctx.save()
  ctx.beginPath()
  ctx.rotate((Math.PI/180) * (i * 30))
  ctx.arc(
    30,
    30,
    10,
    0,
    (Math.PI/180) * 360,
    true
  )
  ctx.fill()
  ctx.restore()
}

ctx.restore()

```

#### scale

scale(x, y), x和y为x和y方向的缩放比例，1保持图像大小不变

```js
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

ctx.save()

ctx.scale(0.5, 1)
ctx.font = "48px serif"
ctx.fillText("Hello", 50, 100);

ctx.restore()

```

### 裁剪与合成

#### clip

clip，将当前正在构建的路径转换为当前的裁剪路径

```js

// 这个园就是clip的裁剪路径
ctx.arc(0, 0, 80, 0, Math.PI*2, true)

ctx.clip()
```

```js

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

/**
 * 画爱心
 */
function drawLove (ctx) {
  const coloes = [
    '#00bcd4',
    '#039be5',
    '#cddc39',
    '#5c6bc0',
    '#ec407a'
  ]
  ctx.save()
  ctx.beginPath()
  ctx.globalAlpha = 0.3
  ctx.fillStyle = coloes[Math.floor(Math.random() * 5)]
  ctx.moveTo(0, 0)
  ctx.bezierCurveTo(-30, -10, -20, 30, 0, 30)
  ctx.bezierCurveTo(20, 30, 30, -10, 0, 0)
  ctx.fill()
  ctx.restore()
}

ctx.save()

ctx.fillRect(0, 0, 200, 200)

ctx.beginPath()

ctx.translate(100, 100)

// 裁切的路径
ctx.arc(
  0,
  0,
  80,
  0,
  (Math.PI/180) * 360,
  true
)
ctx.clip()

let lingrad = ctx.createLinearGradient(0, -100 ,0, 100)
lingrad.addColorStop(0, '#232256')
lingrad.addColorStop(1, '#143778')
ctx.fillStyle = lingrad
ctx.fillRect(-100, -100, 200, 200)

for (let i = 0; i < 80; i++) {
  ctx.save()
  // 随机开始绘画的点
  ctx.translate(
    75-Math.floor(Math.random()*150),
    75-Math.floor(Math.random()*150)
  );
  drawLove(ctx)
  ctx.restore()
}
```

### 基本动画

Canvas中的动画靠每一帧进行拼接

1. 清空Canvas, 为下一帧做准备
2. 保存Canvas的状态（动画过程中可能需要对样式修改，所以修改之前需要保存, 动画完成后需要还原）
3. 绘制下一帧
4. 恢复状态

#### 操控动画

可以使用setTimeout或者setInterval，更推荐使用window.requestAnimationFrame，window.requestAnimationFrame实现的动画更加平滑。

#### 太阳系动画

```js

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')


const sun = new Image()
const moon = new Image()
const earth = new Image()

sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png'
moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png'
earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png'

function draw () {
  let time = new Date()

  // 清空画布
  ctx.clearRect(0, 0, 300, 300)

  ctx.drawImage(sun,0,0,300,300);

  ctx.strokeStyle = 'rgba(224,247,250, 0.3)'

  ctx.save()
  
  ctx.translate(150, 150)
  

  // 画地球
  // 地球旋转
  ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
  ctx.translate(100, 0)
  ctx.drawImage(earth, -12, -12)

  // 画月球
  ctx.save()
  ctx.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );
  // 以地球为中心点进行偏移
  ctx.translate(20, 0)
  ctx.drawImage(moon,-3.5,-3.5);
  ctx.restore()

  ctx.restore()

  ctx.beginPath()
  ctx.arc(150, 150, 100, 0, (Math.PI/180) * 360, true)
  ctx.closePath()
  ctx.stroke()

  window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

```

#### 时针动画

```js

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

```

#### 爱心闪烁

```js

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let hearts = []
const colors = [
  '#80d8ff',
  '#c5e1a5',
  '#303f9f',
  '#ff4081',
  '#d50000',
  '#8bc34a',
  '#66bb6a',
  '#ff9800',
  '#ffeb3b',
  '#29b6f6',
  '#80deea',
  '#8bc34a',
  '#eeff41',
  '#f9a825',
  '#f4511e',
  '#ff80ab',
  '#ad1457',
  '#ff4081',
  '#f50057'
]

class Heart {
  constructor (color, alpha, x, y) {
    this.x = x
    this.y = y
    this.color = color
    this.alpha = alpha
    this.status = 'positive'
  }

  draw () {
    if (this.status === 'positive') {
      this.alpha += 0.006
      if (this.alpha >= 0.9) {
        this.alpha = 0.9
        this.status = 'negative'
      }
    } else {
      this.alpha -= 0.006
      if (this.alpha <= 0) {
        this.alpha = 0.01
        this.status = 'positive'
      }
    }
    ctx.save()
    ctx.translate(
      this.x,
      this.y
    )
    ctx.globalAlpha = this.alpha
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(-30, -10, -20, 30, 0, 30)
    ctx.bezierCurveTo(20, 30, 30, -10, 0, 0)
    ctx.fill()
    ctx.restore()
  }
}

for (let i = 0; i < 100; i++) {
  let color = colors[
    Math.floor(Math.random() * colors.length)
  ]
  let heart = new Heart(
    color,
    Math.random(),
    Math.floor(Math.random() * 500),
    Math.floor(Math.random() * 500)
  )
  hearts.push(heart)
}

function animation () {
  ctx.clearRect(0, 0, 500, 500)
  ctx.save()
  ctx.fillRect(0, 0, 500, 500)
  for (let i = 0; i < 100; i++) {
    hearts[i].draw()
  }
  ctx.restore()
  window.requestAnimationFrame(animation)
}


window.requestAnimationFrame(animation)


```

### 高级动画

#### 常用的动画技巧

1. 速度乘与一个小数, 可以实现逐渐减速的效果

2. 速度乘与一个小数, 其中一个方向比如Y方向同时加上一个速度可以实现类似抛物线的运动轨迹

```js

this.vy *= .99
this.vy += .25
```

3. 长尾效果，不使用clearRect清除前一祯的动画，使用半透明fillRect替代可以实现长尾效果

4. canvas可以使用addEventListener添加事件

#### 绘制小球

```js

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
const length = 50
const width = canvas.width
const height = canvas.height
// 小球的集合
let balls = []

class Ball {
  constructor (x, y, vx, vy, index, size = 2, color = '#757575') {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.size = size
    this.color = color
    this.index = index
  }

  draw () {
    ctx.save()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true)
    this.drawIine()
    if (this.x >= width - this.size || this.x <= 0 + this.size) {
      this.vx = -this.vx
    }
    if (this.y >= height - this.size || this.y <= 0 + this.size) {
      this.vy = -this.vy
    }
    this.x += this.vx
    this.y += this.vy
    ctx.fill()
    ctx.beginPath()
    ctx.restore()
  }

  drawIine () {
    for (let i = 0; i < balls.length; i++) {
      if (i === this.index) {
        continue
      } else {
        let diffx = Math.abs(this.x - balls[i].x)
        let diffy = Math.abs(this.y - balls[i].y)
        let diffs = Math.sqrt((diffx * diffx) + (diffy * diffy))
        if (diffs <= 200 ) {
          ctx.strokeStyle = `rgba(189, 189, 189, ${diffs / 200})`
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(balls[i].x, balls[i].y)
          ctx.stroke()
        }
      }
    }
  }
}

function init () {
  for (let i = 0; i < length; i++) {
    let xDirection = Math.floor(Math.random() * 2)
    let yDirection = Math.floor(Math.random() * 2)
    let x = Math.floor(Math.random() * width)
    let y = Math.floor(Math.random() * height)
    // -20 ~ -10 10 ~ 20的随机值
    let vx = Math.floor(Math.random() * 2 + 1)
    let vy = Math.floor(Math.random() * 2 + 1)
    vx = xDirection === 1 ? vx : -vx
    vy = yDirection === 1 ? vy : -vy
    let ball = new Ball(x, y, vx, vy, i)
    balls.push(ball)
  }
}

function draw () {
  ctx.save()
  ctx.clearRect(0, 0, width, height)
  for (let i = 0; i < balls.length; i++) {
    balls[i].draw()
  }
  ctx.restore()
  window.requestAnimationFrame(draw)
}

init()

window.requestAnimationFrame(draw)
```

### 像素操作

#### ImageData

ImageData存储着Canvas的像素信息

1. width 宽度
2. height 高度
3. data 每一个像素的数组, Uint8ClampedArray, (每个像素用4个1bytes值, 一个像素占用4比特的内存)。**索引值的范围0到(高度×宽度×4)-1**。(以下是读取的公式)

```js

// 读取像素点的红色信息
imageData.data[((行数-1)*imageData.width + (列数-1))*4 - 1 + 1]
// 读取像素点的绿色信息
imageData.data[((行数-1)*imageData.width + (列数-1))*4 - 1 + 2]
// 读取像素点的蓝色信息
imageData.data[((行数-1)*imageData.width + (列数-1))*4 - 1 + 3]
// 读取像素点的透明信息
imageData.data[((行数-1)*imageData.width + (列数-1))*4 - 1 + 4]

// 读取图片中位于第50行，第200列的像素的蓝色部份
blueComponent = imageData.data[((50-1)*imageData.width + (200-1))*4 - 1 + 3]
```

#### 创建一个ImageData对象

```js

// 获取画布的像素信息
// left, top 起始点的坐标
// width 宽 height 高
var myImageData = ctx.getImageData(left, top, width, height)
```

#### 颜色选择器

> 使用mdn的图片，遇到跨域问题

![image](https://i.loli.net/2019/01/27/5c4da4f295ede.png)

```js

// 使用图片的crossOrigin属性
img.crossOrigin = "Anonymous"

// 使用这个方法的前提是服务器端设置cors
Access-Control-Allow-Origin "*"
```

#### putImageData

putImageData 可以将像素信息填充到画布中

putImageData(Array<T>, x, y)

Array<T>是像素信息，x, y为填充的偏移量

##### 马赛克处理

```
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


```






