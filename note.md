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

#### Scaling






