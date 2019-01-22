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

addColorStop(pos, color), pos是0-1表示位置的百分比，color表示百分比位置的颜色

#### createRadialGradient 径向渐变






