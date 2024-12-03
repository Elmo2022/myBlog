# 前端知识点汇总 

  前端知识点是我在准备秋招过程中，看书和经验贴中总结到的一些知识点，不仅面试中经常问到，同时对于自己未来的工作和学习也很重要，也欢迎大家一起补充～ 

# 前端知识点总结

## 一、JavaScript

1.原始值和引用值类型及区别

```
原始值： 数字（Number）字符串（String）布尔值（Boolean）空值（null）未定义（undefined）符号（Symbol，ES6 新增）
引用值： 对象（Object）数组（Array）函数（Function）
```

2.判断数据类型：typeof、instanceof、Object.prototype.toString.call()、constructor

```
Object.prototype.toString.call()最有效准确
typeof   用于返回一个值的数据类型
constructor   
   const arr = [];
   arr.constructor === Array; // true
instanceof 可以用来检测一个对象是否为某个类的实例。
```

3.类数组与数组的区别与转换

```
函数的arguements是类数组，有索引和length，但是没有数组的那些方法
Array.from()  解构赋值
Array.prototype.slice.call() 
[].contact()空数组拼接类数组
```

4.数组的常见API



5.bind、call、apply的区别

```
function greet(greeting, punctuation) {
  console.log(greeting + ', ' + this.name + punctuation);
}

const person = { name: 'Kimi' };
greet.call(person, 'Hello', '!'); // 输出: Hello, Kimi!


function greet(greeting, punctuation) {
  console.log(greeting + ', ' + this.name + punctuation);
}

const person = { name: 'Kimi' };
greet.apply(person, ['Hello', '!']); // 输出: Hello, Kimi!

function greet(greeting, punctuation) {
  console.log(greeting + ', ' + this.name + punctuation);
}

const person = { name: 'Kimi' };
const greetKimi = greet.bind(person, 'Hello');
greetKimi('!'); // 输出: Hello, Kimi!
```



6.new的原理

```
新对象的原型会被设置为构造函数的 prototype 属性所指向的对象。这意味着新对象会继承构造函数的 prototype 中定义的所有属性和方法。
```

7.如何正确判断this？

8.闭包及其作用

9.原型和原型链

10.prototype与__proto__的关系与区别

11继承的实现方式及比较

12深拷贝与浅拷贝

13防抖和节流

14作用域和作用域链、执行期上下文

15DOM常见的操作方式

16Array.sort()方法与实现机制

17Ajax的请求过程

18.JS的垃圾回收机制

```
引用计数   标记清除（新V8引擎使用）增量收集 并行处理 分代收集 懒清理等方法
```

19JS中的String、Array和Math方法

20addEventListener和onClick()的区别

21new和Object.create的区别

22.DOM的location对象

[JavaScript\] location对象的属性与方法_location对象的属性或方法-CSDN博客](https://blog.csdn.net/qq_49900295/article/details/123550239)

23浏览器从输入URL到页面渲染的整个流程

24跨域、同源策略及跨域实现方式和原理

25浏览器的回流（Reflow）和重绘（Repaints）

26JavaScript中的arguments

27.EventLoop事件循环

```
调用栈，事件队列，eventloop机制，宏任务和微任务
```

28.宏任务与微任务

```
宏任务是那些会在事件循环中等待执行的任务，它们通常在不同的执行阶段被处理。
宏任务包括：
主代码块：整个 JavaScript 脚本的执行。
setTimeout 和 setInterval：这些函数用于设置定时器，它们会在指定的时间后将回调函数放入宏任务队列。
I/O：文件读写、网络请求等。
UI 渲染：浏览器界面的更新。
postMessage：跨文档通信。
requestAnimationFrame：用于动画的定时器，它在浏览器重绘之前执行。
微任务（Micro Task）
微任务是那些在当前宏任务执行完成后立即执行的任务，它们通常用于快速处理一些需要优先级更高的任务。

微任务包括：
Promise 回调：Promise.then、Promise.catch、Promise.finally 中的回调函数。
MutationObserver：用于监听 DOM 变化。
queueMicrotask：一个用于将函数排入微任务队列的 API。
执行顺序
在 JavaScript 的事件循环中，宏任务和微任务的执行顺序如下：

执行当前宏任务：执行一个宏任务，如主代码块、定时器回调等。
执行所有微任务：当前宏任务执行完后，执行所有微任务队列中的任务。
渲染更新：浏览器进行必要的渲染更新。
检查是否有新的宏任务：如果有新的宏任务，继续执行步骤 1。
这个循环会一直进行，直到宏任务队列和微任务队列都为空。


宏任务与微任务的最大的区别就是，每一个宏任务执行完之后都会把控制权交给浏览器，浏览器就会根据情况决定是否进行渲染，而微任务执行完之后如果还存在微任务则不会把控制权交给浏览器，而是继续执行微任务，直到所有的微任务执行完毕才把控制权交给浏览器。
```

29.BOM属性对象方法

```
BOM（Browser Object Model，浏览器对象模型）提供了一组对象，允许 JavaScript 与浏览器窗口进行交互。这些对象和函数使得脚本可以操作浏览器窗口、获取浏览器信息、控制浏览器行为等。以下是一些常用的 BOM 属性、对象和方法：

1. window
最核心的 BOM 对象，代表浏览器窗口。它提供了与浏览器窗口交云的接口，同时也是全局对象。
2. document
代表整个 HTML 文档，可以通过它操作 HTML 元素、属性、样式等。
3. navigator
包含有关用户浏览器的信息，如浏览器类型、版本、操作系统、是否支持插件等。
4. screen
包含有关用户屏幕的信息，如屏幕的宽度、高度、颜色深度等。
5. location
包含有关当前页面 URL 的信息，可以用于导航和获取 URL 的各个部分。
6. history
包含浏览器的历史记录，可以用于前进、后退等操作。
常用的 BOM 方法：
window.alert()

显示一个警告对话框。
window.prompt()

显示一个对话框，要求用户输入一些文本。
window.confirm()

显示一个确认对话框，用户可以选择“确定”或“取消”。
window.open()

打开一个新的浏览器窗口或标签页。
window.close()

关闭当前窗口。注意，出于安全考虑，只能关闭由脚本打开的窗口。
window.scrollTo()

滚动到页面的特定位置。
window.setInterval()

按照指定的时间间隔周期性地执行代码。
window.setTimeout()

在指定的延迟后执行代码。
window.addEventListener()

向 window 对象添加事件监听器。
window.removeEventListener()

从 window 对象移除事件监听器。
```

30函数柯里化及其通用封装

31.JS的map()和reduce()方法

```
map(): 当你需要对数组的每个元素执行相同的操作，并生成一个新数组时，使用 map()。
reduce(): 当你需要对数组的元素进行累加或合并操作，生成一个单一的结果时，使用 reduce()。
```

32“==”和“===”的区别

33.setTimeout用作倒计时为何会产生误差？

浏览器和js引擎对 `setTimeout` 调用的最小延迟时间有限制，4毫秒。

事件循环机制和任务队列，定时器可能不会立即开始执行。

## 二、ES6

let、const和var的概念与区别

变量提升与暂时性死区

变量的结构赋值

箭头函数及其this问题

Symbol概念及其作用

Set和Map数据结构

Proxy

Reflect对象

Promise（手撕Promise A+规范、Promise.all、Promise相关API和方法）

Iterator和for...of

循环语法比较及使用场景

Generator及其异步方面的应用

async函数

几种异步方式的比较

class基本语法及继承

模块加载方案比较

ES6模块加载与CommonJS加载的原理

```
ES6模块（ECMAScript 2015）和CommonJS是两种不同的模块系统，它们在设计和加载原理上有一些关键的区别。以下是它们的一些基本原理和区别：

### ES6模块

1. **静态分析**：ES6模块在编译时就会确定模块的依赖关系，这使得静态分析成为可能，优化了加载时间和性能。

2. **动态导入**：ES6模块支持动态导入（`import()`），它返回一个Promise对象，可以在需要时异步加载模块。

3. **树摇（Tree Shaking）**：由于ES6模块的静态特性，未使用的代码可以被“摇掉”，即在最终打包时不会被包含，从而减少最终文件的大小。

4. **模块作用域**：每个ES6模块都有自己的作用域，不会污染全局作用域。

5. **导出和导入**：ES6模块使用`export`和`import`关键字来导出和导入模块。

6. **加载机制**：ES6模块通常由JavaScript运行时环境（如浏览器或Node.js）直接支持，不需要额外的加载器。

### CommonJS模块

1. **动态分析**：CommonJS模块在运行时确定依赖关系，这意味着它们不支持静态分析和树摇。

2. **同步加载**：CommonJS模块是同步加载的，这意味着在模块被加载和执行之前，代码不能继续执行。

3. **全局作用域**：CommonJS模块导出的是全局对象`module.exports`和`require`函数，这可能导致全局作用域污染。

4. **导出和导入**：CommonJS模块使用`module.exports`和`require()`函数来导出和导入模块。

5. **加载机制**：CommonJS模块通常需要一个模块加载器（如Node.js的`require`函数）来加载模块。

### 区别

- **加载时机**：ES6模块支持静态分析和动态导入，而CommonJS模块是运行时动态加载的。
- **作用域**：ES6模块提供了模块作用域，而CommonJS模块导出到全局作用域。
- **性能**：ES6模块由于支持静态分析和树摇，通常在性能上更优。
- **异步加载**：ES6模块支持异步加载，而CommonJS模块是同步加载的。
- **打包工具**：ES6模块通常与现代JavaScript打包工具（如Webpack、Rollup）一起使用，而CommonJS模块则与Node.js的`require`系统一起使用。

随着时间的推移，ES6模块逐渐成为JavaScript模块化的标准，而CommonJS模块则主要用于Node.js环境。不过，两者在某些场景下仍然共存，例如在Node.js中，你仍然可以使用CommonJS模块，也可以使用ES6模块。

```



## 三、HTML/CSS

1.CSS权重及其引入方式

```
内联>id>类>元素>通配选择器*>继承    ！important最高    同级的看最后面的样式为主
```

2.a标签全部作用

```
<a href="javascript:alert('Hello World!')">Click Me</a>  JavaScript 函数调用
导航、下载、邮箱链接    锚点
```

3.用CSS画三角形

4.未知宽高元素水平垂直居中

5.元素种类的划分

[【HTML/CSS】HTML元素种类的划分_html 要素的阶级-CSDN博客](https://blog.csdn.net/xd963625627/article/details/114282036)

6.盒子模型及其理解

[理解CSS盒子模型及其应用-CSDN博客](https://blog.csdn.net/WXLink/article/details/142103971#:~:text=理解CSS盒子模)

7.定位方式及其区别

8.margin塌陷及合并问题

[CSS中外边距（margin）塌陷和合并的问题（初学者必看） - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/337857229)

浮动模型及清除浮动的方法

CSS定位属性

display及相关属性

IFC与BFC

弹性布局

[弹性布局详解弹性布局是css的一种布局方式，可以完整响应式的实现页面的布局，这里的响应式指的是可随页面变大变小，弹性容器 - 掘金 (juejin.cn)](https://juejin.cn/post/7339085624836767754)

圣杯布局和双飞翼布局的实现

Flex布局

px、em、rem的区别

Less预处理语言

媒体查询

vh与vw

H5的语义化作用及语义化标签

Web Worker和Web Socket

CSS3及相关动画

如何实现响应式布局

SEO的概念及实现

[什么是SEO？如何进行SEO优化？ - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/210428775#:~:text=什么是SEO？.)

HTML5的新特性

```
语义标签 (有利于搜索引擎优化)
<!--header:网页的头部，作为一个网页内容快的标题-->
<header></header>
<!--nav:导航栏部分，定于整个页面的主要导航部分-->
<nav></nav>
<!--section：网页的一个内容区块-->
<section></section>
<!--aside：侧边栏，可以是相关链接或者资料-->
<aside></aside>
<!--artical：区块内的一个独立区域，定义自成一体独立的内容-->
<artical></artical>
<!--footer:网页的尾部，可以是作者，版权信息，附录等等-->
<footer></footer>


增强型表单   邮箱验证

视频和音频   video  audio
Canvas绘画
SVG画图 不容易失帧，更加稳定
地理定位
拖放API    一个元素的draggable = "true"
WebWorker  创建多个线程
WebStorage  5MB（localStorage,sessionStorage）
WebSocket  全双工通信

```

Less和Sass使用

## 四、HTTP与计算机网络

TCP/IP协议分层管理

三次握手四次挥手机制及原因

HTTP方法

GET和POST的区别

HTTP建立持久连接的意义

```
使客户端到服 务器端的连接持续有效，当出现对服务器的后继请求时，Keep-Alive功能避免了建立或者重新建立连接。
```

HTTP报文的结构

HTTP状态码

Web服务器及其组成

HTTP报文首部

HTTP通用首部字段

Cookie相关首部字段

HTTPS与HTTP区别及实现方式

Cookie与Session

基于HTTP的功能追加协议

常见的Web攻击分类

[十种常见的web攻击 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/140932186#:~:text=本篇主要简单介绍)

TCP与UDP区别

存储机制localStorage、sessionStorage与Cookie存储技术

XSS攻击及防御

CSRF攻击及防御

HTTP1.0 1.1 2 3的区别

```
说下 HTTP1.0
无状态协议：HTTP 1.0 是无状态的，每个请求之间相互独立，服务器不保存任何请求的状态信息。
非持久连接：默认情况下，每个 HTTP 请求/响应对之后，连接会被关闭，属于短连接。这意味着对于同一个网站的每个资源请求，如 HTML 页面上的图片和脚本，都需要建立一个新的 TCP 连接。可以设置Connection: keep-alive 强制开启长连接。
说下 HTTP1.1
持久连接：HTTP 1.1 引入了持久连接（也称为 HTTP keep-alive），默认情况下不会立即关闭连接，可以在一个连接上发送多个请求和响应。极大减轻了 TCP 连接的开销。
流水线处理：HTTP 1.1 支持客户端在前一个请求的响应到达之前发送下一个请求，以提高传输效率。
说下 HTTP2.0
二进制协议：HTTP 2.0 使用二进制而不是文本格式来传输数据，解析更加高效。
多路复用：一个 TCP 连接上可以同时进行多个 HTTP 请求/响应，解决了 HTTP 1.x 的队头阻塞问题。
头部压缩：HTTP 协议不带状态，所以每次请求都必须附上所有信息。HTTP 2.0 引入了头部压缩机制，可以使用 gzip 或 compress 压缩后再发送，减少了冗余头部信息的带宽消耗。
服务端推送：服务器可以主动向客户端推送资源，而不需要客户端明确请求。
16.HTTP/3 了解吗？
HTTP/2.0 基于 TCP 协议，而 HTTP/3.0 则基于 QUIC 协议，Quick UDP Connections，直译为快速 UDP 网络连接。
```



## 五、前端工程化

1.前端工程化的流程

[前端项目工程化流程--从开发到发布_前端项目部署后，继续开发-CSDN博客](https://blog.csdn.net/cindy647/article/details/113878779)

2.Webpack基本概念与配置

[概念 | webpack 中文文档 | webpack中文文档 | webpack中文网 (webpackjs.com)](https://www.webpackjs.com/concepts/#entry)

3.loader与plugin原理与实现

[webpack_麦乐乐的博客-CSDN博客](https://blog.csdn.net/qq_41831345/category_9640180.html)

4.Webpack的模块热替换及实现

5.Webpack的优化问题

6.SPA及其优缺点

[深入探讨单页面应用程序（SPA）的优势与实践-阿里云开发者社区 (aliyun.com)](https://developer.aliyun.com/article/1510892)

7.SSR实现及优缺点

[一文搞懂：什么是SSR、SSG、CSR？前端渲染技术全解析 - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000044882791)

8.设计模式

[前端开发中常用的几种设计模式_前端设计模式-CSDN博客](https://blog.csdn.net/qq_32442973/article/details/119757216)

## 六、React和Vue

React自身特点及选型时考虑

React与VUE的异同

Virtual DOM

React生命周期

Diff算法

受控组件与非受控组件

高阶组件

Flux架构模式

Redux设计概念、设计原则、方法

纯组件与shouldComponentUpdate关系

Redux中的<Provider/>组件与connect函数

React Fiber架构

React Hooks的作用及原理

1.Vue3.0 所采用的 Composition Api 与Vue2.x使用的 OptionsApi 有什么不同?

2Vue3.0的设计目标是什么? 做了哪些优化?

3.用Vue3.0 写过组件吗? 如果想实现一个 Modal你会怎么设计

4.Vue30性能提升主要是通过哪几方面体现的?

5.Vue3.0里为什么要用 Proxy API替代defineProperty API?

6.说说Vue 3.0中Treeshaking特性? 举例说明一下?

```
减少体积：通过移除未使用的代码，可以显著减少最终打包的 JavaScript 文件大小。
提高性能：减少浏览器解析和执行的代码量，从而提高页面加载和执行速度。
配置：
Webpack：确保使用 production 模式，并配置相应的插件（如 TerserPlugin）。
Vite：Vite 默认支持 Tree-shaking，无需额外配置。
```

1.请描述下对vue生命周期的理解

2.双向数据绑定是什么

3Vue组件之间的通信方式都有哪些?

4.为什么data属性是一个函数而不是一个对象?

[面试官：为什么data属性是一个函数而不是一个对象？_data的属性是一个函数而不是一个对象的区别。-CSDN博客](https://blog.csdn.net/qq_41555854/article/details/112757996#:~:text=上面讲到组件da)

5.动态给vue的data添加一个新的属性时会发生什么? 怎样解决?

6.v-if和v-for的优先级是什么?

7.v-show和v-if有什么区别? 使用场景分别是什么?

8.你知道vue中key的原理吗? 说说你对它的理解

9.说说你对vue的mixin的理解，有什么应用场景?

```
表单验证等等场景 类似于封装的工具方法  重名会覆盖
```

10.Vue常用的修饰符有哪些有什么应用场景

```
<div @click.self="handleClick">
<button @click.once="doThisOnce">Do this once</button>
<input v-model.trim="name" type="text" />
```

11.Vue中的SnextTick有什么作用?

12.Vue实例挂载的过程

13.你了解vue的diff算法吗?

14.Vue中组件和插件有什么区别?

[Vue中组件和插件有什么区别（看完秒懂）_vue插件和组件的区别-CSDN博客](https://blog.csdn.net/weixin_69422396/article/details/135476589#:~:text=[vue] 组件)

15.Vue项目中你是如何解决跨域的呢?

16有写过自定义指令吗?自定义指令的应用场景有哪些?

17.Vue中的过滤器了解吗? 过滤器的应用场景有哪些?

[Vue 中的过滤器了解吗？过滤器的应用场景有哪些？_vue中的过滤器了解吗?过滤器的应用场景有哪些?-CSDN博客](https://blog.csdn.net/Aurora9968/article/details/131115272)

18说说你对slot的理解? slot使用场景有哪些?

19.什么是虚拟DOM? 如何实现一个虚拟DOM?说说你的思路

20.Vue项目中有封装过axios吗? 主要是封装哪方面的?

21.是怎么处理vue项目中的错误的?

22.你了解axios的原理吗? 有看过它的源码吗?

23.vue要做权限管理该怎么做?

24.说说你对keep-alive的理解是什么?

```
keep-alive 是 Vue.js 中一个内置的组件，用于在组件切换过程中保留组件的状态，避免重复渲染。这在构建具有多个视图和组件的单页面应用（SPA）时非常有用，因为它可以提高性能和用户体验。

<template>
  <keep-alive>
    <component :is="currentComponent"></component>
  </keep-alive>
</template>
```

25.你对SPA单页面的理解，它的优缺点分别是什么?如何实现SPA应用呢

26.SPA首屏加载速度慢的怎么解决?

27.vue项目本地开发完成后部署到服务器后报404是什么原因呢?

28.SSR解决了什么问题? 有做过SSR吗? 你是怎么做的?

29.vue3有了解过吗? 能说说跟vue2的区别吗?



## 七、NodeJS

NodeJS基本概念与特点

CommonJS规范、核心模块

Node的异步I/O

Node的内存控制

Node构建网络服务

Node的进程

## 八、需要会手撕的代码部分

Promise（A+规范）、then、all方法

[Promise从0到手写promise是个面试热点问题，基本上百分百会被问到，并且是你每天都需要用上的方法，面试中，面试 - 掘金 (juejin.cn)](https://juejin.cn/post/7352770048513343539#heading-0)

Iterator遍历器实现

Thunk函数实现

**Thunk 函数的定义，它是"传名调用"的一种实现策略，用来替换某个表达式。**

**在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数。**

async实现原理

class的继承

防抖和节流

```
1.防抖
 function debounce(fn, delay){
            let timer
            return function(){
                    let args = arguments
                    if(timer) clearTimeout(timer);
                    timer = setTimeout(() => {
                        fn.call(this,...args)
                    },delay)
            }
        }
2.节流
 function throttle(fn, delay){

            let prevTime = Date.now();
            
            return function(){
                    if(Date.now() - prevTime > delay){
                        // 这里我的arguments没有解构，可以直接用apply，apply接收数组参数
                        fn.apply(this,arguments)
                        prevTime = Date.now()
                    }
            }
        }


```

Ajax原生实现

[详谈ajax发展历程本篇文章带你详细了解下ajax发展历程，涵盖XMLHttpRequest，Jquery-ajax，f - 掘金 (juejin.cn)](https://juejin.cn/post/7313043317722169363#heading-0)

深拷贝的几种方法与比较

继承的几种实现与比较

未知宽高的元素水平垂直居中

三栏布局的实现

两栏布局的实现

React高阶组件

数组扁平化

```js
1.array.flat(n)  n为需要降维到的维度
2.递归实现
function flatten(arr) {
    var result = []
    for(var i = 0; i < arr.length ; i++){
        if(arr[i] instanceof Array){
            // flatten(arr[i])递归得到的数组要进行合并
            // result.push(flatten(arr[i])) push会把整个第二层的数组放进去，没用
            // a.concat(b) || [].concat(a,b)
            var nextArr = flatten(arr[i])
            result = result.concat(nextArr)
            // concat返回新数组
        }else{
            result.push(arr[i])
        }
    }
    return result
}
console.log(flatten(arr)); // [ 1, 2, 3, 4, 5 ]
3.使用reduce
var arr = [1, [2, [3, [4, 5]]]]

function flatten(arr){
	return arr.reduce(function(pre, item){
		return pre.concat(Array.isArray(item) ? flatten(item) : item)
	}, [])
}

console.log(flatten(arr)) // [ 1, 2, 3, 4, 5 ]

```

数组去重

```javaScript
1.json.stringify() json.parse()
2.递归判断
let arr = [1, 1, '2', 3, 1, 2,
    { name: '张三', id: { n: 1 } },
    { name: '张三', id: { n: 1 } },
    { name: '张三', id: { n: 2 } }
]

function uniqueArr (arr) {
    let res = []
    for (let item of arr) {
        let isFind = false
        for (let resItem of res) {
            if (equal(item, resItem)) {
                isFind = true
                break
            }
        }
        if (!isFind) res.push(item)
    }
    return res
}

function equal(v1, v2) {
    if ((typeof v1 === 'object' && v1 !== null) && (typeof v2 === 'object' && v2 !== null)) { // 都是引用类型
        if (Object.keys(v1).length !== Object.keys(v2).length) return false
        for (let key in v1) {
            if (v2.hasOwnProperty(key)) { // 只要v1遍历的东西，V2显示具有就再去看value
                // 有可能value也是引用类型，那就递归下
                if (!equal(v1[key], v2[key])) {
                    return false
                }
            } else {
                return false
            }
        }
        return true // 两个对象长得完全一样
    } else { // 都不是引用类型、一方是引用类型 同样这也是递归的出口
        return v1 === v2
    }
}

console.log(uniqueArr(arr));

```

几种排序算法的实现及其复杂度比较

前序后序遍历二叉树（非递归）

二叉树深度遍历（分析时间复杂度）

跨域的实现

```
1.jsonp
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button id="btn">获取数据</button>
    
    <script>

        function jsonp (url, cb) {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script') // 可以创建h5的任意标签
                script.src = `${url}?cb=${cb}` // http://localhost:3000?cb='callback' 前端写死一个字符串传给后端 
                document.body.appendChild(script) // 把script添加到body中去，浏览器会自动发请求了

                window[cb] = (data) => { // 把callback挂到window上去，然后值是一个函数体
                    resolve(data);
                }
            })
        }

        let btn = document.getElementById('btn')
        btn.addEventListener('click', () => {
            jsonp('http://localhost:3000', 'callback')
            .then(res => {
                console.log('后端返回的结果：'+res);
            })
        })
    </script>
</body>
</html>
借助script的src属性给后端发一个请求，且携带一个参数callback；
前端在window上添加了一个callback函数；
后端接收到这个参数callback后，将要返回给前端的数据data和这个参数callback进行拼接，成callback(data)，并返回给前端；
因为window上已经有一个callback函数，后端又返回了一个形入callback(data)，浏览器会将字符串执行成callback的调用

2.cors
const http = require('http')

const server = http.createServer((req, res) => {
    res.writeHead(200, { // 对响应头
        'Access-Control-Allow-Origin': '*' // *代表所有后端所有地址，浏览器直接接收就可以
    })

    let data = {
        msg: "hello cors"
    }
    res.end(JSON.stringify(data)) // 向前端返回数据
})

server.listen(3000, () => {
    console.log('listening on port 3000');
})

3.node代理  开发环境下
4.nginx
5.domain  iframe标签
6.postMessage管道通信。
```

发布-订阅模式

```javaScript
class PubSub {
    constructor() {
        this.events = {};
    }
    on(type, callback) {
        if (!this.events[type]) {
            this.events[type] = [callback];
        }
        this.events[type].push(callback);

    }
    emit(type, ...args) {
        if (this.events[type]) {
            this.events[type].forEach(callback => callback(...args));
        }
        else {
            return;
        }
    }
    off(type, callback) {
        if (this.events[type]) {
            this.events[type] = this.events[type].filter(event => event !== callback);
        }
    }
    once(type, callback) {
        const onceCallback = (...args) => {
            callback(...args);
            this.off(type, onceCallback);
        }
        this.on(type, onceCallback);
    }
}

const run = (...args) => {
    console.log(...args, "run")
}
const say = (...args) => {
    console.log(...args, "say")
}
const pubsub = new PubSub();
pubsub.on('run', run)
pubsub.on('say', say)

pubsub.emit('run', 1, 2)
pubsub.emit('say', 0)
console.log(pubsub.events)
// // pubsub.emit('run', 1, 2)


```



## 九、数据可视化

Canvas和SVG的区别

在考虑设计可视化图表时，结合Canvas和SVG特性会怎么取舍

常见的可视化组件库

可视化组件库如Echarts的设计思路

一些偏向底层的可视化组件库和前端框架结合方面需要考虑哪些问题

可视化组件如何做到数据驱动？

## 十、计算机基础

计算机系统

线程与进程

常见的git指令

Linux相关指令

其他类型的编程语言（如Java）

数据库



###    三、面试技巧  

1. 个人自我介绍一般可以分为三个部分：自己的个人情况（姓名、学校、年级等）+特殊的经历及收获（项目、比赛、实习）+对应聘公司的理解（为什么要来，如何结合部门的业务谈谈自己的能力和业务的匹配更好）



2. 面试题会的就说，如果有准备比较充分，可以多说一点，埋一点坑，一般面试官会顺着往下问。如果完全不会，就说自己没了解过。不太确定的，可以先和面试官说自己不太确定，然后说一下自己认为的答案



3. HR面的一些比较常见的问题，可以提前找一找，准备适合自己情况的回答



4. 有的时候，提前了解一下自己投递的部门的业务，并结合自己的知识谈一谈自己的理解和认识，会有意想不到的效果 

  


5. 面试提问环节，一般前两面都是部门内的leader或者同事面试，所以我都会问一些部门的业务方面的问题，并且结合自己的理解聊一下。如果是交叉面或者部长面，我会问一下从面试和简历，他们对我的今后学习的建议（一般都会对你面试进行评价，这时你应该就能感觉出来自己能不能过了，然后面试官给出建议），因为部长面和交叉面，面试官的层次和眼界更高，单纯的问技术方面的问题，其实不如问一些对自己的职业方向建议的问题，这样可能收益更大。不建议直接询问面试结果，因为一方面面试官不会说，第二方面会显得心虚。最后HR面我只会问后续的通知时间。



###    四、复习准备  

1. 在开始准备复习前，可以根据自己的个人情况，列举一下自己需要准备哪些方面的知识，看哪些书，时间如何安排。前端方向的知识比较广，面试时不仅要有广度，深度也很重要（事实上，面试就是差异化竞争，同样一些问题你准备了，别人一定也准备了，但是对于同一个问题，理解的深度完全取决于自己的准备情况。一般在回答这个问题的基础上，再有一点点延伸，只说到概念和关键名词即可，面试官可能会顺着往下问）比如面试官问你事件循环机制，可以延伸介绍同步异步、异步的几种方法、微任务和宏任务等，一般都会接着往下问的



 
