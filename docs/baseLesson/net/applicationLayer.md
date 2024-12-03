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

>typeof看基本类型和对象类型和Function类型
>
>instanceof看继承关系
>
>Object.prototype.toString.call()全能方法
>
>constructor看继承关系

3.类数组与数组的区别与转换

> 没有数组上的push,pop等方法    转换方法：Array.from, Array.prototype.slice.call()

4.数组的常见API

[数组常用的方法（17个）_数组的方法-CSDN博客](https://blog.csdn.net/weixin_45753871/article/details/109525697)

5.bind、call、apply的区别

[彻底弄懂bind，apply，call三者的区别 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/82340026)

6.new的原理

>1.当使用`new`关键字时，JavaScript 首先会创建一个新的空对象。这个对象的原型（`__proto__`）会被设置为构造函数（也就是跟在`new`后面的函数）的`prototype`属性的值。
>
>2.新创建的对象会被绑定到构造函数内部的`this`关键字上。这样，当构造函数中的代码通过`this`来访问和修改对象的属性时，实际上是在操作刚刚创建的新对象。
>
>3.执行构造函数：构造函数中的代码会被执行。构造函数可以包含各种初始化对象属性、添加方法等操作。
>
>4.如果构造函数没有显式地返回一个非对象的值（如`return`一个基本类型的值，如数字、字符串、布尔值等），那么`new`操作会自动返回这个新创建并初始化后的对象。但如果构造函数返回了一个对象，那么`new`操作就会返回这个被返回的对象，而不是最初创建的那个新对象。

7.如何正确判断this？

> 优先级：构造器中的this指向新对象>call,apply,bind>方法调用>函数调用

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

18JS的垃圾回收机制

19JS中的String、Array和Math方法

20addEventListener和onClick()的区别

> 适用于需要动态管理事件监听器的场景，如在单页应用（SPA）中，根据用户的交互或者应用的状态动态地添加或移除事件。也适用于需要为一个元素添加多个事件处理函数，或者需要精确控制事件传播阶段的情况。
>
> 更好地处理事件机制，第三个参数默认false，冒泡阶段执行

21new和Object.create的区别

> 当使用`new`创建对象时，新对象的原型指向构造函数的`prototype`属性
>
> Object.create()直接将指定的对象作为新创建对象的原型

22.DOM的location对象

[JavaScript\] location对象的属性与方法_location对象的属性或方法-CSDN博客](https://blog.csdn.net/qq_49900295/article/details/123550239)

23浏览器从输入URL到页面渲染的整个流程

24跨域、同源策略及跨域实现方式和原理

25浏览器的回流（Reflow）和重绘（Repaints）

26JavaScript中的arguments

27EventLoop事件循环

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
```

29BOM属性对象方法

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

## 三、HTML/CSS

CSS权重及其引入方式

<a></a>标签全部作用

用CSS画三角形

未知宽高元素水平垂直居中

元素种类的划分

盒子模型及其理解

定位方式及其区别

margin塌陷及合并问题

浮动模型及清除浮动的方法

CSS定位属性

display及相关属性

IFC与BFC

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

HTML5的新特性

Less和Sass使用

## 四、HTTP与计算机网络

TCP/IP协议分层管理

三次握手四次挥手机制及原因

HTTP方法

GET和POST的区别

HTTP建立持久连接的意义

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

TCP与UDP区别

存储机制localStorage、sessionStorage与Cookie存储技术

XSS攻击及防御

CSRF攻击及防御

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

1.请描述下对vue生命周期的理解

2.双向数据绑定是什么

3Vue组件之间的通信方式都有哪些?

4.为什么data属性是一个函数而不是一个对象?

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

15.Vue项目中你是如何解决跨域的呢?

16有写过自定义指令吗?自定义指令的应用场景有哪些?

17.Vue中的过滤器了解吗? 过滤器的应用场景有哪些?

18说说你对slot的理解? slot使用场景有哪些?

19.什么是虚拟DOM? 如何实现一个虚拟DOM?说说你的思路

20.Vue项目中有封装过axios吗? 主要是封装哪方面的?

21.是怎么处理vue项目中的错误的?

22.你了解axios的原理吗? 有看过它的源码吗?

23.vue要做权限管理该怎么做?

24.说说你对keep-alive的理解是什么?

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

Iterator遍历器实现

Thunk函数实现

**Thunk 函数的定义，它是"传名调用"的一种实现策略，用来替换某个表达式。**

**在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数。**

async实现原理

class的继承

防抖和节流

Ajax原生实现

深拷贝的几种方法与比较

继承的几种实现与比较

未知宽高的元素水平垂直居中

三栏布局的实现

两栏布局的实现

React高阶组件

数组去重

几种排序算法的实现及其复杂度比较

前序后序遍历二叉树（非递归）

二叉树深度遍历（分析时间复杂度）

跨域的实现

## 九、数据可视化

Canvas和SVG的区别

在考虑设计可视化图表时，结合Canvas和SVG特性会怎么取舍

常见的可视化组件库

可视化组件库如Echarts的设计思路

一些偏向底层的可视化组件库和前端框架结合方面需要考虑哪些问题

可视化组件如何做到数据驱动？

## 十、计算机基础

计算机系统

线程、进程和协程

常见的git指令

>git

git冲突怎么解决

Linux相关指令

其他类型的编程语言（如Java）

> springboot

数据库

