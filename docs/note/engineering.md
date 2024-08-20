> 前端工程化

## webpack配置

entry：入口文件

output：输出文件配置，其中包括path输出目录，filename输出文件名等

resolve：配置模块的解析方法

module：配置不同的Loader来处理不同的模块

plugins：配置不同的插件来加强webpack功能

devServer：开发服务器配置

target：配置编译的目标环境

 

## 常见的Loader和Plugin

Loader

css-loader：加载CSS，支持模块化、压缩、文件导入等特性。

style-loader：将CSS代码注入到JavaScript中，通过DOM操作去加载CSS。

babel-loader：将ES6转换成ES5。

less-loader：把Less编译成CSS。

sass-loader：把Sass编译成CSS。

ts-loader：把TypeScript编译成JavaScript。

eslint-loader：通过eslint检查JavaScript代码。

Plugin

HtmlWebpackPlugin：生成HTML文件，并自动引入打包后的文件。

CleanWebpackPlugin：每次构建前清理输出目录。

DefinePlugin：定义环境变量。

MinCssExtractPlugin：将CSS提取为独立的文件。

WebpackBundleAnalyzerPlugin：可视化分析打包之后的文件大小和依赖关系。

 

## Loader和Plugin区别

功能不同：Loader本质是一个函数，是一个转换器。webpack只能解析原生js文件，Loader可以将其他类型文件转换成原生js；Plugin是插件，用于增强webpack功能。webpack运行的各个生命周期中会广播事件，Plugin可以监听这些事件，在合适时间通过webpack提供API改变输出结果。

用法不同：Loader在modules.rules下配置，类型是数组，每一项是一个Object，描述了对于什么类型的文件使用什么加载器和参数；Plugin配置在Plugins下，类型是数组，每一项是一个Plugin实例，参数通过构造函数传递。

 

## webpack构建流程

1、初始化参数：从配置文件或shell语句中合并参数。

2、开始编译：用参数初始化Compiler对象，加载所有插件。

3、确认入口：根据entry找到入口文件开始解析。

4、编译模块：使用Loader对模块进行编译，找出模块依赖的模块，递归执行此操作直到入口文件依赖的所有模块都被编译。

5、输出资源：根据入口文件和模块之间的依赖关系，组装成一个个包含多个模块的Chunk，再把Chunk转换成单独的文件加入输入列表。

6、输出完成：确认好输出内容后，根据配置的输出路径和文件名，把文件内容写入文件系统。

 

## webpack热更新（Hot Module Replacement）

就是在不更新页面的前提下，将新代码替换旧代码。原理实际上是webpack-dev-server（WDS）和浏览器之间维护了一个websocket服务。当本地资源发生变化后，webpack会先将打包生成的模块代码放入内存中，然后WDS向浏览器推送更新，附带上构建生成的hash，让客户端和上一次资源进行对比。

 

## code splitting

code splitting是代码分割优化技术，可以将一个大的chunk拆分成多个小的chunk，从而实现按需加载，减少加载时间，提高程序性能。在webpack中通过optimization: splitChunks来配置。

 

## webpack的source map

source map是一种文件，建立了构建后的代码与原始代码之间的映射关系。通常在开发阶段开启来调试代码。在webpack配置文件中devtools选项中指定devtool: ‘source-map’开启。

## webpack的tree shaking

tree shaking是一个利用ES6模块化静态结构特性来去除生产环境下不必要的代码的优化过程。原理如下：ES6模块系统具有静态特性，意味着模块的导入导出在编译时就已经确定了。在构建过程中，webpack会通过分析依赖图，逐级追踪模块的依赖关系以及模块之间的导入导出关系。分析依赖时，会标记每个变量、函数、类和导出，以确定他们是否被实际使用。如果一个模块只是被导入而没有被实际使用，webpack会在最终的代码生成阶段删除该模块。

 

## 提高webpack打包速度

1、利用缓存：利用webpack的持久性缓存功能，避免重复构建相同的代码。

2、使用多线程/多进程：使用thread-loader、happypack等插件将构建过程分为多个进程或线程。

3、使用DllPlugin和HardSourceWebpackPlugin：DllPlugin可以将第三方库预先打包成单独文件减少构建时间，HardSourceWebpackPlugin可以缓存中间文件加快后续构建过程。

4、使用Tree Shaking：去除没使用的代码，减小文件体积。

5、移除不必要的插件：避免不必要的性能开销。

 

## 如何减少打包之后的代码体积

1、代码分割：将应用程序的代码分割成多个代码段按需加载。这样可以减少初始的加载体积，使页面更快加载。

2、Tree Shaking：去除未使用的代码。

3、压缩代码：使用UglifyJS或Terser压缩JavaScript代码。

4、使用生产模式：通过配置mode: ‘production’启动。

5、使用压缩工具：使用Brotil或Gzip对静态资源进行压缩。

6、利用CDN加速：将项目中引用的静态资源路径修改为CDN上的路径，减少静态资源的打包。

 

## vite比webpack快在哪

开发模式：webpack是先打包再启动服务器；vite是直接启动服务器，然后按需加载依赖文件，而不是将整个项目打包。

热处理更新：vite使用浏览器内置的ES模块功能，当某个模块的内容改变时，浏览器只需要重新加载该模块；webpack中，一个模块内容改变时，需要重新编译这个模块和其依赖的模块。

预编译：vite不需要预编译或生成中间文件，减少了临时文件的IO操作，提升速度。

缓存：vite会利用浏览器的缓存机制，避免重复加载，使得页面切换更加迅速。

 

## Monorepo

Monorepo是一种项目代码管理方式，是在单个仓库中管理多个项目。

优点：

1、更好的实现代码复用，方便管理。

2、可以复用项目基础设施，不需要将每个项目都建立一遍。

3、方便管理依赖，可以统一处理依赖的版本更新。

缺点：

1、权限管理复杂。

2、仓库体积过大，仓库操作会变得很慢。

3、一个项目出问题可能会导致其他正常的项目。

 

## 为什么pnpm比npm快

1、pnpm使用基于内容寻址的文件系统来存储磁盘上的文件，这样就会保证如果要加载的依赖已经在磁盘中存在就不会重复下载了，而是通过软连接添加依赖，减少了下载所需要的时间。

2、pnpm在下载和安装时采用了并行下载，提高了安装速度。

 

 

 
