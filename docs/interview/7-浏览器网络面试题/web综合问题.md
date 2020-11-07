# web综合问题

## 前端需要注意哪些SEO？

- 合理的`title`、`description`、`keywords`
- 语义化的`HTML`代码，符合W3C规范：语义化代码让搜索引擎容易理解网页。
- 关键的，重要内容`HTML`代码放在最前：搜索引擎抓取`HTML`顺序是从上到下，有的搜索引擎对抓取长度有限制，保证重要内容一定会被抓取
- 少用`iframe`,不用iframe：搜索引擎不会抓取`iframe`中的内容。
- 提高网站速度：网站速度是搜索引擎排序的一个重要指标

## 网站性能优化

文件方面：

- 减少HTTP请求数，合并文件，雪碧图，小图片使用图标或者base64;
- 减少DNS查询：DNS缓存、资源分布到恰当熟练
- 减少DOM元素数量，少用table布局

Server:

- 使用CDN
- 配置ETag
- 使用gzip压缩
- 服务端渲染

Cookie：

- 减少cookie大小

CSS:

- 不使用CSS表达式
- 使用link引入外部资源
- 适当使用transform

Javascript

- 将`javascript`和`css`从外部引入
- 压缩`javascript`和`css`
- 删除不需要的脚本
- 减少`DOM`访问
- 减少回流重绘

## 介绍一下你对浏览器内核的理解？

浏览器内核指的是浏览器渲染进程。

- **GUI渲染线程**：负责解析html、css，构建DOM树和RenderObject树、布局和绘制等；
- **JS引擎线程**：处理js脚本；
- **事件触发线程**：控制事件循环；
- **定时触发器线程**：settimeout和setInterval所在线程；
- **异步Http请求线程**

## restful API是什么

- 就是rest风格的应用接口
- 客户端-服务端
- 无状态可缓存
- 统一接口