# vue源码

[TOC]

读源码的感受：读源码之前一定要去查看一下一些相关的的视频，或者一些源码笔记，不然根本无从下手,我第一次看，找了半天都没找到入口文件，读了源码确实对我的提升有很大很大，比如一些js的高级写法，算法的实际应用。。。

## 准备工作

### flow

- vue源码使用flow做静态类型检查

  ```text
  flow
  ├── compiler.js        # 编译相关
  ├── component.js       # 组件数据结构
  ├── global-api.js      # Global API 结构
  ├── modules.js         # 第三方库定义
  ├── options.js         # 选项相关
  ├── ssr.js             # 服务端渲染相关
  ├── vnode.js           # 虚拟 node 相关
  ```

### vue目录设计

- Vue.js 的源码都在 src 目录下，其目录结构如下。

  ```text
  src
  ├── compiler        # 编译相关 
  ├── core            # 核心代码 
  ├── platforms       # 不同平台的支持
  ├── server          # 服务端渲染
  ├── sfc             # .vue 文件解析
  ├── shared          # 共享代码
  ```

  - **compiler**包含 Vue.js 所有编译相关的代码。它包括把模板解析成 ast 语法树，ast 语法树优化，代码生成等功能。编译分为运行时(runtime)和运行时+编译器(runtime+compiler)   
  - **core**包含了vue的核心代码，包括内置组件、全局 API 封装，Vue 实例化、观察者、虚拟 DOM、工具函数等等。是vue的心脏部分，也是源码重心
  - **platforms**是 Vue.js 的入口，web和weex2 个目录代表 2 个主要入口，分别打包成运行在 web 上和 weex 上的 Vue.js。
  - **server**:所有服务端渲染相关的逻辑都在这个目录,：这部分代码是跑在服务端的 Node.js，不要和跑在浏览器端的 Vue.js 混为一谈。**服务端渲染主要的工作是把组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器，最后将静态标记"混合"为客户端上完全交互的应用程序。**
  - **sfc**：通常我们开发 Vue.js 都会借助 webpack 构建， 然后通过 .vue 单文件来编写组件。这个目录下的代码逻辑会把 .vue 文件内容解析成一个 JavaScript 的对象。
  - **shared**：Vue.js 会定义一些工具方法，这里定义的工具方法都是会被浏览器端的 Vue.js 和服务端的 Vue.js 所共享的

## 

