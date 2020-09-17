# html5

## xhtml xml和html5的关系是什么？

- html4.0之前非常混乱。
- xml比较松散，用于存储数据结构。可以自定义类型。
- xhtml属于xml,是严格模式的xml。他更加的严格。元素必须被正确地嵌套，闭合，区分大小写，文档必须拥有根元素
- html5不属于SGML或者XML,比xhtml更宽松

## html5有哪些新的变化

主要是相对于之前的html4或者xhtml而言

- 不再基于SGML解析。
- 文档声明只有`<!DOCTYPE html>`

- 新的语义化元素，比如section artical header footer nav aside，之前的语义化不强的i或者b都不推荐使用
- 表单增强
  - date,email,url等类型
- 新的API
  - 离线(application cache,servace worker) 
  - 音视频，之前只能借助flash
  - 图形 canvas和svg,之前只能借助flash
  - 实时通信:web socket
  - 本地存储: indexDB webstorage
  - 设备能力(定位，获取陀螺仪状态)
  - 分类和嵌套规则变更，比较明显的就是a里面嵌套元素取决于他外部的元素

## HTML5的离线储存怎么使用，工作原理能不能解释一下？

- 在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件
- 原理：`HTML5`的离线存储是基于一个新建的`.appcache`文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像`cookie`一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示
- 如何使用：
  - 页面头部像下面一样加入一个`manifest`的属性；
  - 在`cache.manifest`文件的编写离线存储的资源
  - 在离线状态时，操作`window.applicationCache`进行需求实现

```json
CACHE MANIFEST
#v0.11
CACHE:
js/app.js
css/style.css
NETWORK:
resourse/logo.png
FALLBACK:
/offline.html
```

## 浏览器是怎么对`HTML5`的离线储存资源进行管理和加载的呢

- 在线的情况下，浏览器发现`html`头部有`manifest`属性，它会请求`manifest`文件，如果是第一次访问`app`，那么浏览器就会根据manifest文件的内容下载相应的资源并且进行离线存储。如果已经访问过`app`并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的`manifest`文件与旧的`manifest`文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。
- 离线的情况下，浏览器就直接使用离线存储的资源。

## 请描述一下 cookies，sessionStorage 和 localStorage的区别？

共同点：

都是本地存储，保存在浏览器端，并且同源。

区别

- `cookie`是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）
- cookie数据始终在同源的http请求中携带（即使不需要），记会在浏览器和服务器间来回传递。可以做登录校验
- `sessionStorage`和`localStorage`不会自动把数据发给服务器，仅在本地保存

存储大小

- `cookie`数据大小不能超过4k
- `sessionStorage`和`localStorage`虽然也有存储大小的限制，但比`cookie`大得多，可以达到5M或更大

有效时间

- `localStorage` 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据
- `sessionStorage` 数据在当前浏览器窗口关闭后自动删除
- `cookie` 设置的`cookie`过期时间之前一直有效，即使窗口或浏览器关闭

