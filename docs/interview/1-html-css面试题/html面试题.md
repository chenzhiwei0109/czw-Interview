# html面试题

## 什么是DOCTYPE

ie有他自己的渲染模式，最典型的就是盒子模型，如果一个元素设置width,他的实际宽度并不是设置的宽度

早期ie的宽度就是实际的宽度。

- 让浏览器按照标准模式渲染(盒子模型)
- 让浏览器知道元素的合法性，是否满足h5还是其他的语法

## html xhtml和html5的关系是什么？

- html属于sgml,SGML是一个通用的标记语言，包括xml也是他的应用
- xhtml属于xml,是严格模式的xml
- html5不属于SGML或者XML,比xhtml更宽松

## html5有哪些新的变化

主要是相对于之前的html4或者xhtml而言

- 新的语义化元素，比如section artical header footer nav aside，之前的语义化不强的i或者b都不推荐使用
- 表单增强
- 新的API
  - 离线(application cache,servace worker) 
  - 音视频，之前只能借助flash
  - 图形 canvas和svg,之前只能借助flash
  - 实时通信:web socket
  - 本地存储: indexDB webstorage 
  - 设备能力(定位，获取陀螺仪状态)
  - 分类和嵌套规则变更，比较明显的就是a里面嵌套元素取决于他外部的元素

## 语义化的理解

我从两个角度理解，一方面是对于人，另一方面是对于机器。

首先对于人来说，有利于代码维护，减少开发人员沟通成本，并且可以通过安装H5大纲算法的插件**html5outline**来快速检索网页的规范性。

对于机器来说，

- 机器容易理解结构(html5大纲算法、搜索爬虫更好理解、残障人士读屏软件)。
- 语音合成工具正确识别网页用途
- 有助于SEO
- 可以通过semantic microdata 在html里添加新的标记，标注这个东西是什么。

## em和I有什么区别

- em是语义化标签，表示强调
- i是纯样式标签，表示斜体
- h5中i代表图标，icon，其他情况不推荐

## 自闭合的元素有哪些？

在html不要求加斜杠，但是xml要求

- 表单元素input
- 图片img
- br换行 hr水平线
- meta link等等

## HTML和DOM什么关系？

- HTML是'死的'
- DOM由HTML解析而来，浏览器把html解析成DOM树，然后解析成渲染树才会被浏览器识别。
- JS实际维护的是DOM而不是HTML
- innerHTML属性其实是在DOM上添加而不是在实际HTML上添加。

## property和attribute的区别？

attribute就是存在于标签上的那些属性，被保存在html文件内

property在程序执行时产生，保存在内存中，会随着运行结束被释放掉。

DOM对象同时继承了HTML文档和JavaScript的Object,Object是内存对象，所以使用property,但是html本身是标记语言，所以使用attribute。

当这两个东西被继承到同一个对象上的时候经常会让人混淆起来。由于一些Attribute是很常用的，比如id、class等，所以DOM把它们映射到了Property上以方便使用。这样我们就会遇到一个对象同时具有id这个Attribute和Property（由于class是保留字，所以它被映射到Property上时变成了className）。

在DOM里表示不同的东西

- attribute是HTML标签上的特性，它的值只能够是字符串；因为html标签里的值都是字符串。
- property是DOM中的属性，是JavaScript里的对象；

```html
<input type="text" value="1" />
```

```js
value是属性pro
$0.value ==>1 //property
$.value = 2  ; //此时取到的是property特性，但是elements上的
$0.getAttribute('value') // 1  
```

两者的改变不会影响对方

## form有什么作用？

- 直接提交表单，使用submit/reset按钮
- 便于浏览器保存（浏览器可以检测form然后保存里面的用户名等信息）
- 第三方库可以整体提取表单的值
- 有些第三方库可以进行表单验证，比如angular

所以涉及到表单都要加一个form;