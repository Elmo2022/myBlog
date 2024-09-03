>常见的CSS盒模型布局

### 品字布局

品字布局通常指的是三列布局，中间列宽度固定，两边列宽度自适应，并且中间列宽度大于两侧列。

```html
<style>
    .container {
  display: table;
  width: 100%;
}

.left, .right, .center {
  display: table-cell;
}

.left, .right {
  width: 200px; /* 固定宽度 */
}

.center {
  width: auto;
  background: #eee; /* 中间列背景色 */
}
</style>
<body>
    <div class="container">
        <div class="left">左侧栏</div>
        <div class="center">中间内容</div>
        <div class="right">右侧栏</div>
      </div>
</body>
```

![image-20240903211108038](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202409032111148.png)

### 圣杯布局

圣杯布局是一种三列布局，中间列在左边列和右边列之前，但是视觉上中间列在中间。

```html
		<style type="text/css">
			body {
				min-width: 550px;
			}

			#header {
				background-color: #999999;
			}
			
			#middle{
				/* 2.把中间部分留出左右元素的宽度 */
				padding-left: 200px;
				padding-right: 150px;
			}
			
			#middle .column{
				float: left;
				height: 200px;
			}
			
			#left{
				width: 200px;
				background-color: #FFFF00;
				/* 4. 向左移动center的宽度 */
				margin-left: -100%;
				/* 5. 再向左移动自身宽度，露出被覆盖的center块 */
				position: relative;
				right: 200px;
			}
			
			#center{
				width: 100%;
				background-color: pink;
			}
			
			#right{
				/* 3.margin-right让右方元素覆盖自身，达到消除自身宽度的目的，浮动到center上面去 */
				margin-right: -150px;
				width: 150px;
				background-color: #CCCCCC;
			}
			
			#footer {
				background-color: #999999;
			}
			
			.clearfix:after{
				display: table;
				content: '';
				clear: both;
			}
		</style>
	</head>
	<body>
		<div id="header">header</div>
		<div id="middle" class="clearfix">
			<div id="center" class="column">
				center
			</div>
			<div id="left" class="column">
				left
			</div>
			<div id="right" class="column">
				right
			</div>
		</div>
		<div id="footer">footer</div>
	</body>
```

![image-20240903211655115](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202409032116200.png)

### 双飞翼布局

- `left` 和 `right` 固定宽度
- 中间 `main` 会随着整体布局宽度的变化而伸缩

```html
    <style type="text/css">
        body {
            min-width: 550px;
        }
        .col {
			/* 1.设置浮动 */
			float: left;
        }

        #main {
            width: 100%;
            height: 200px;
            background-color: #FFC0CB;
        }
        #main-wrap {
			/* 2.将 main 左右内边距留出 left 和 right 的宽度 */
			margin: 0 200px 0 150px;
        }

        #left {
            width: 150px;
            height: 200px;
            background-color: #FFFF00;
			/* 3.left 向左偏移 main 的宽度 */
			margin-left: -100%;
        }
        #right {
            width: 200px;
            height: 200px;
            background-color: #cccccc;
			/* 4.right 向左偏移自身宽度 */
			margin-left: -200px;
        }
    </style>
</head>
<body>
    <div id="main" class="col">
        <div id="main-wrap">
            main
        </div>
    </div>
    <div id="left" class="col">
        left
    </div>
    <div id="right" class="col">
        right
    </div>
</body>
```

![image-20240903212015020](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202409032120102.png)







### BFC（块级格式化上下文）

BFC是CSS中的一种布局概念，它是一个独立的布局区域，内部元素的布局不会影响外部元素。创建BFC的方法包括：

- 设置`float`属性为`left`或`right`。
- 设置`position`属性为`absolute`或`fixed`。
- 设置`display`属性为`inline-block`、`table-cell`、`table-caption`或`flex`、`grid`、`flow-root`。





### Flex布局

Flex布局是一种更加高效和强大的布局模式，用于一维布局（即横向或纵向）。它能够轻松地分配空间、对齐和排序元素，即使它们的大小是未知或者动态变化的。

#### Flex容器属性：

- `display: flex;` 或 `inline-flex;`：将容器设为Flex布局。
- `flex-direction`：定义主轴的方向（row | row-reverse | column | column-reverse）。
- `flex-wrap`：定义是否允许折行（nowrap | wrap | wrap-reverse）。
- `justify-content`：定义主轴上的对齐方式（flex-start | flex-end | center | space-between | space-around | space-evenly）。
- `align-items`：定义交叉轴上的对齐方式（flex-start | flex-end | center | baseline | stretch）。
- `align-content`：定义多根轴线的对齐方式（flex-start | flex-end | center | space-between | space-around | stretch）。

#### Flex项属性：

- `flex-grow`：定义项目的放大比例。
- `flex-shrink`：定义项目的缩小比例。
- `flex-basis`：定义在分配多余空间之前的项目大小。
- `flex`：是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写。
- `align-self`：允许单个项目有与其他项目不一样的交叉轴对齐方式。

#### 示例：

```html
<div style="display: flex; justify-content: space-between; align-items: center;">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

![image-20240903212439772](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202409032124850.png)

这个例子创建了一个Flex容器，其中有三个项目。`justify-content: space-between;` 会在主轴上平均分布项目，而`align-items: center;` 会在交叉轴上将它们居中对齐。

### Grid布局

Grid布局是一种二维布局系统，可以同时在行和列上进行布局。它非常适合用来创建复杂的页面布局。

#### Grid容器属性：

- `display: grid;` 或 `inline-grid;`：将容器设为Grid布局。
- `grid-template-columns`：定义列的大小和数量。
- `grid-template-rows`：定义行的大小和数量。
- `grid-gap`：定义行和列之间的间隙（grid-row-gap 和 grid-column-gap 分别定义行和列的间隙）。
- `grid-template-areas`：定义网格区域的名字，以便在布局中引用。
- `grid-auto-columns` 和 `grid-auto-rows`：定义自动创建的行和列的大小。

#### Grid项属性：

- `grid-column`：定义项目所在的列。
- `grid-row`：定义项目所在的行。
- `grid-area`：定义项目应该占据的网格区域。
- `justify-self`：定义项目在网格单元内的对齐方式（主轴）。
- `align-self`：定义项目在网格单元内的对齐方式（交叉轴）。

#### 示例：

```html
<div style="display: grid; grid-template-columns: repeat(3, 1fr); grid-gap: 10px;">
  <div>Header</div>
  <div>Sidebar</div>
  <div>Main</div>
  <div>Footer</div>
</div>
```

![image-20240903212320284](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202409032123396.png)

这个例子创建了一个3列的网格布局，每列的大小都是1份比例（`1fr`），并且列与列之间有10像素的间隙。四个项目分别占据了网格的四个单元。

### 综合示例

```html
<div style="display: grid; grid-template-columns: 1fr 2fr; grid-template-rows: auto 1fr; height: 300px;">
  <div style="grid-column: 1 / 3;">Header</div>
  <div style="grid-column: 1; grid-row: 2;">Sidebar</div>
  <div style="grid-column: 2; grid-row: 2;">Content</div>
  <div style="grid-column: 1 / 3; grid-row: 3;">Footer</div>
</div>
```

![image-20240903212419011](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202409032124084.png)







这个例子创建了一个具有头部、侧边栏、主要内容和页脚的网格布局。头部和页脚跨越了两列，而侧边栏和内容区域则分别占据一列。

