## Node.js是什么?

Node.js是一个Javascript运行环境(run-time)。实际上它是对Google V8引擎进行了封装。V8引 擎执行Javascript的速度非常快，性能非常好。Node.js对一些特殊用例进行了优化，提供了替代的API，使得V8在非浏览器环境下运行得更好。

Node.js是一个基于Chrome JavaScript运行时建立的平台， 用于方便地搭建响应速度快、易于扩展的网络应用。Node.js 使用事件驱动， 非阻塞I/O 模型而得以轻量和高效，非常适合在分布式设备上运行数据密集型的实时应用。

外文名 Node.js 类   别 JavaScript工具 发布时间 2009年5月 开发者 Ryan Dah

>cpu速度远高于磁盘。阻塞I/O需要先写入磁盘再运行下一条。NodeJs先cpu写，不会去等cpu写完再写入。
>
>在一些磁盘写入等耗时或者需要等待的操作效率很高。
>
>他可以使用JS语言控制服务器。

## 发展史

- 2009年2月，Ryan Dahl在博客上宣布准备基于V8创建一个轻量级的Web服务器并提供一套库。
- 2009年5月，Ryan Dahl在GitHub上发布了最初版本的部分Node.js包，随后几个月里，有人开始使用Node.js开发应用。
- 2009年11月和2010年4月，两届JSConf大会都安排了Node.js的讲座。
- 2010年年底，Node.js获得云计算服务商Joyent资助，创始人Ryan Dahl加入Joyent全职负责Node.js的发展。
- 2011年7月，Node.js在微软的支持下发布Windows版本

## 优势和特点

Node.js 是一个开源与跨平台的 JavaScript 运行时环境。 它是一个可用于几乎任何项目的流行工具！

Node.js 在浏览器外运行 V8 JavaScript 引擎（Google Chrome 的内核）。 这使 Node.js 表现得非常出色。

Node.js 应用程序运行于单个进程中，无需为每个请求创建新的线程。 Node.js 在其标准库中提供了一组异步的 I/O 原生功能（用以防止 JavaScript 代码被阻塞），并且 Node.js 中的库通常是使用非阻塞的范式编写的（从而使阻塞行为成为例外而不是规范）。

当 Node.js 执行 I/O 操作时（例如从网络读取、访问数据库或文件系统），Node.js 会在响应返回时恢复操作，而不是阻塞线程并浪费 CPU 循环等待。

这使 Node.js 可以在一台服务器上处理数千个并发连接，而无需引入管理线程并发的负担（这可能是重大 bug 的来源）。

Node.js 具有独特的优势，因为为浏览器编写 JavaScript 的数百万前端开发者现在除了客户端代码之外还可以编写服务器端代码，而无需学习完全不同的语言。

在 Node.js 中，可以毫无问题地使用新的 ECMAScript 标准，因为不必等待所有用户更新其浏览器，你可以通过更改 Node.js 版本来决定要使用的 ECMAScript 版本，并且还可以通过运行带有标志的 Node.js 来启用特定的实验中的特性。

## 所需的JavaScript技术

建议在深入研究 Node.js 之前，对 JavaScript 的主要概念有所了解：

- 词汇结构
- 表达式
- 数据类型
- 变量
- 函数
- this
- 箭头函数
- 循环
- 作用域
- 数组
- 模板字面量
- 分号
- 严格模式
- ECMAScript 6、2016、2017

具备这些概念，无论是在浏览器还是在 Node.js 中，都会成为一名熟练的 JavaScript 开发者。

以下概念也是理解异步编程的关键，异步编程是 Node.js 的基本组成部分：

- 异步编程与回调
- 定时器
- Promise
- Async 与 Await
- 闭包
- 事件循环

## 大量的库

npm 的简单结构有助于 Node.js 生态系统的激增，现在 npm 仓库托管了超过 1,000,000 个可以自由使用的开源库包。

## Node.js 框架和工具

Node.js 是一个底层的平台。 为了使开发者做事变得容易又来劲，社区在 Node.js 上构建了数千个库。

久而久之，其中许多已成为受欢迎的选择。 以下是一些值得学习的清单：

- [**AdonisJs**](https://adonisjs.com/): 一个全栈框架，高度专注于开发者的效率、稳定和信任。 Adonis 是最快的 Node.js Web 框架之一。
- [**Express**](https://expressjs.com/): 提供了创建 Web 服务器的最简单但功能最强大的方法之一。 它的极简主义方法，专注于服务器的核心功能，是其成功的关键。
- [**Fastify**](https://fastify.io/): 一个 Web 框架，高度专注于提供最佳的开发者体验（以最少的开销和强大的插件架构）。 Fastify 是最快的 Node.js Web 框架之一。
- [**hapi**](https://hapijs.com/): 一个富框架，用于构建应用程序和服务，使开发者可以专注于编写可重用的应用程序逻辑，而不必花费时间来搭建基础架构。
- [**koa**](http://koajs.com/): 由 Express 背后的同一个团队构建，旨在变得更简单更轻巧。 新项目的诞生是为了满足创建不兼容的更改而又不破坏现有社区。
- [**Loopback.io**](https://loopback.io/): 使构建需要复杂集成的现代应用程序变得容易。
- [**Meteor**](https://meteor.com/): 一个强大的全栈框架，以同构的方式使用 JavaScript 构建应用（在客户端和服务器上共享代码）。 曾经是提供所有功能的现成工具，现在可以与前端库 [React](https://reactjs.org/)，[Vue](https://vuejs.org/) 和 [Angular](https://angular.io/) 集成。 也可以用于创建移动应用。
- [**Micro**](https://github.com/zeit/micro): 提供了一个非常轻量级的服务器，用于创建异步的 HTTP 微服务。
- [**NestJS**](https://nestjs.com/): 一个基于 TypeScript 的渐进式 Node.js 框架，用于构建企业级的高效、可靠和可扩展的服务器端应用程序。
- [**Next.js**](https://nextjs.org/): 用于渲染服务器端渲染的 [React](https://reactjs.org/) 应用程序的框架。
- [**Nx**](https://nx.dev/): 使用 NestJS、Express、[React](https://reactjs.org/)、[Angular](https://angular.io/) 等进行全栈开发的工具包！ Nx 有助于将开发工作从一个团队（构建一个应用程序）扩展到多个团队（在多个应用程序上进行协作）！
- [**Socket.io**](https://socket.io/): 一个实时通信引擎，用于构建网络应用程序。



## Node.js 与浏览器的区别

### 相同点与优势

浏览器和 Node.js 均使用 JavaScript 作为其编程语言。

从广泛使用 JavaScript 的前端开发者的角度来看，Node.js 应用程序具有巨大的优势：使用单一语言轻松编程所有一切（前端和后端）。

你会拥有巨大的机会，因为全面、深入地学习一门编程语言并通过使用同一语言完成 web（无论是在客户端还是在服务器）上的所有工作是非常困难的，你会处于独特的优势地位。

### 不同点

不同的还有生态系统。

在浏览器中，大多数时候做的是与 DOM 或其他 Web 平台 API（例如 Cookies）进行交互。 当然，那些在 Node.js 中是不存在的。 没有浏览器提供的 `document`、`window`、以及所有其他的对象。

而且在浏览器中，不存在 Node.js 通过其模块提供的所有不错的 API，例如文件系统访问功能。

另一个很大的不同是，在 Node.js 中，可以控制运行环境。 除非构建的是任何人都可以在任何地方部署的开源应用程序，否则你能知道会在哪个版本的 Node.js 上运行该应用程序。 与浏览器环境（你无法选择访客会使用的浏览器）相比起来，这非常方便。

这意味着可以编写 Node.js 版本支持的所有现代的 ES6-7-8-9 JavaScript。

由于 JavaScript 发展的速度非常快，但是浏览器发展得慢一些，并且用户的升级速度也慢一些，因此有时在 web 上，不得不使用较旧的 JavaScript / ECMAScript 版本。

可以使用 Babel 将代码转换为与 ES5 兼容的代码，再交付给浏览器，但是在 Node.js 中，则不需要这样做。

另一个区别是 Node.js 使用 CommonJS 模块系统，而在浏览器中，则还正在实现 ES 模块标准。

在实践中，这意味着在 Node.js 中使用 `require()`，而在浏览器中则使用 `import`。