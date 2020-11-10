---
sidebarDepth: 2
---
# html5
[[toc]]
[TOC]
## 什么是DOCTYPE?

- doctype就是文档声明，必须声明在html文档第一行，告诉浏览器使用的文档标准是什么。	

- 如果没有声明doctype，页面就会开启怪异模式。此时盒模型的宽度是内容+padding+border。

- 如果声明了`<!DOCTYPE html>`就是标准模式了，此时宽度是内容的宽度。

- 如果你想手动调整的话，可以使用box-sizing:border-box或者content-box来切换标准模式和怪异模式

## 语义化的理解？

我从两个角度理解，一方面是对于人，另一方面是对于机器。

首先对于人来说，增强了代码可读性，有利于代码维护，减少开发人员沟通成本，就像现在的组件化里的组件，也是尽可能遵循语义化的标准的。

对于机器来说，更好的语义化更适合机器理解你文章的结构，更适合爬虫获取你的有效信息，有助于SEO,并且可以通过一些符合html5大纲算法的插件自动生成目录结构。也可以支持读屏软件。并且有些语义化标签自带css样式，这样在没有css样式情况下也便于阅读

## 有哪些常用meta标签？

meta标签由name和content两个属性定义，用于描述一个html文档的属性，比如作者，网页描述，关键词等等

- **charset**

  用于描述HTML文档编码形式。我只见过utf-8,好像还有一些国标什么什么的就是GB开头的

  ```HTML
  <meta charset='UTF-8'>
  ```

- **http-equiv**

  相当于http的⽂件头作⽤,⽐如下⾯的代码就可以设置http的缓存过期⽇期 

  ```html
  ＜meta http-equiv="expires" content="Wed, 20 Jun 2019 22:33:00 GMT"＞
  ```

- viewprot 

  控制视口大小比例

  ```html
  <meta name='viewport' content='width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no',minimum=1>
  ```

- apple-mobile-web-app-status-bar-style

  开发过PWA应⽤的开发者应该很熟悉，为了⾃定义评估⼯具栏的颜⾊。 

  ```html
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  ```

## html全局属性有哪些？

- `class`:为元素设置类标识
- `data-*`: 为元素增加自定义属性
- `draggable`: 设置元素是否可拖拽
- `id`: 元素`id`，文档内唯一
- `lang`: 元素内容的的语言
- `style`: 行内`css`样式
- `title`: 元素相关的建议信息

## 什么是data-属性?

html的数据属性，用来把数据存储在html元素里作为额外信息,可以使用js操作。

<https://blog.csdn.net/w1418899532/article/details/90515969>

```html
<img data-src='1.jpg' src='loading.jpg'
```

```js
// onload是等所有的资源文件加载完毕以后再绑定事件
window.onload = function(){
	// 获取图片列表，即img标签列表
	var imgs = document.querySelectorAll('img');

	// 获取到浏览器顶部的距离
	function getTop(e){
		return e.offsetTop;
	}

	// 懒加载实现
	function lazyload(imgs){
		// 可视区域高度
		var h = window.innerHeight;
		//滚动区域高度
		var s = document.documentElement.scrollTop || document.body.scrollTop;
		for(var i=0;i<imgs.length;i++){
			//图片距离顶部的距离大于可视区域和滚动区域之和时懒加载
			if ((h+s)>getTop(imgs[i])) {
				// 真实情况是页面开始有2秒空白，所以使用setTimeout定时2s
				(function(i){
					setTimeout(function(){
						// 不加立即执行函数i会等于9
						// 隐形加载图片或其他资源，
						//创建一个临时图片，这个图片在内存中不会到页面上去。实现隐形加载
						var temp = new Image();
						temp.src = imgs[i].getAttribute('data-src');//只会请求一次
						// onload判断图片加载完毕，真是图片加载完毕，再赋值给dom节点
						temp.onload = function(){
							// 获取自定义属性data-src，用真图片替换假图片
							imgs[i].src = imgs[i].getAttribute('data-src')
						}
					},2000)
				})(i)
			}
		}
	}
	lazyload(imgs);

	// 滚屏函数
	window.onscroll =function(){
		lazyload(imgs);
	}
}
```

## em和I有什么区别

- em是语义化标签，表示强调,浏览器感受的到
- i是纯样式标签，表示斜体。
- h5中i代表图标，icon，其他情况不推荐。

## src和href区别？

- src指向外部资源位置，请求js脚本,img图片等等，阻碍其他资源的下载处理。所以js脚本一般放在底部
- href是超链接,建立和当前元素或者文档的关系，浏览器识别他指向时并行下载，不会停止处理当前文件。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

### 追问img**的**srcset的作用是什么？

>srcset提供了根据屏幕条件选取图⽚的能⼒ 

以设计响应式图⽚，我们可以使⽤两个新的属性srcset 和 sizes来提供更多额外的资源图像和提示，帮助浏览器选择 正确的⼀个资源。 

srcset 定义了我们允许浏览器选择的图像集，以及每个图像的⼤⼩。 

sizes 定义了⼀组媒体条件（例如屏幕宽度）并且指明当某些媒体条件为真时，什么样的图⽚尺⼨是最佳选择

```html
<img 
	src="clock-demo-thumb-200.png" 
  alt="Clock" 
  srcset="clock-demo-thumb-200.png 200w, clock-demo-thumb-400.png 400w" 
  sizes="(min-width: 600px) 200px, 50vw">
```

### 追问还有哪个标签能起到跟srcset相似作用？

>picture同样可以通过不同设备来匹配不同的图像资源 

><pricture>元素元素通过包含零或多个 <source> 元素和⼀个 <img> 元素来为不同的显示/设备场景提供图像版本。浏览器 会选择最匹配的⼦ <source> 元素，如果没有匹配的，就选择 <img> 元素的 src 属性中的URL。然后，所选图像呈现 在 <img> 元素占据的空间中 

```html
<pricture>
	<source srcset='.......jpg' media='(min-width:800px)'>
  <img src='../xx.jpg'>
</pricture>
```



## srciprt标签的defer和async区别

- defer：脚本在文档解析后执行，script加载后不会立刻执行。而是等文档解析完才执行
- async：脚本加载完毕立刻执行，async的脚本是乱序的，不适合有依赖关系的js文件

![1588728364047](../../../../../../../陈志伟/Desktop/fontend/learningblog/docs/.vuepress/public/assets/img/1588728364047.png)

>蓝⾊线代表⽹络读取，红⾊线代表执⾏时间，这俩都是针对脚本的；绿⾊线代表 HTML 解析



## 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

- 行内元素有：`a b span img input select strong`
- 块级元素有：`div ul ol li dl dt dd h1 h2 h3 h4… p`
- 空元素：`<br> <hr> <img> <input> <link> <meta>`
- 行内元素不可以设置宽高，不独占一行
- 块级元素可以设置宽高，独占一行

## 行内元素和块级元素有什么区别？

​	

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

## iframe有那些缺点？

- `iframe`会阻塞主页面的`Onload`事件
- 搜索引擎的检索程序无法解读这种页面，不利于`SEO`
- `iframe`和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载
- 使用`iframe`之前需要考虑这两个缺点。如果需要使用`iframe`，最好是通过`javascript`动态给`iframe`添加`src`属性值，这样可以绕开以上两个问题

## WEB标准以及W3C标准是什么?

- 标签闭合、标签小写、不乱嵌套、使用外链`css`和`js`、结构行为表现的分离

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

