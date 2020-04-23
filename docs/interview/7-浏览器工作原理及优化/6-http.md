# http、网络、安全相关面试题

## http面试题

- 

## 通信跨域以及ajax

### 什么是同源策略

限制从一个源加载的文档如何和与另一个源的资源进行交互，这是一个用于隔离潜在恶意文件的关键安全机制。

源：协议域名端口号

- ajax请求无法发送
- fetch请求无法发送
- 无法获得DOM
- cookie、LocalStorage和IndexDB无法获取

### 前后端如何通信

- Ajax
- websocket 不限制同源策略
- cors 支持跨域通信，是一个新的通信标准

### 如何创建Ajax

```js
const xhr = new XMLHttpRequest();
xhr.open('GET','./data/test.json',true);  
xhr.send();
xhr.onreadtstatechange= function(){
	if(xhr.readyState===4&&xhr.status ===200){
		JSON.parse(xhr.responseText)
	}
}
```

```js
const xhr = new XMLHttpRequest();
xhr.open('POST','./login',true);  //
xhr.send(JSON.stringfy({name:'zs',age:18}));
xhr.onreadtstatechange= function(){
	if(xhr.readyState===4&&xhr.status ===200){
		JSON.parse(xhr.responseText)
	}
}
```

### 跨域通信

- jsonp

  >script标签的src属性不受跨域限制。

  返回的内容是一个script块，这个块里有一个内容

  ```
  script src = http://www.aaa.com/?callback=www&&data=name
  ```

  ```
  接收:
  jsonp({
  	data:{
  		
  	}
  })
  ```

- hash 

  > url的#后面的东西,hash变动页面不会刷新,search改变会刷新所以search不能做跨域通信

  页面A通过iframe嵌入了跨域页面B,需求：在a页面获取c页面的数据。

  - 思路:a给c传一个hash值，c收到hash值后，c把hash值传递给b，b把结果放到a的hash中

    >访问a.html会加载c.html，并把值放在c的iframe的hash中，
    >然后c载入后，会加载b.html，并把值放在b的iframe的hash中，
    >而a和b是同域的，那么也就是说b的hash可以直接复制给a的hash，这样a就得到了c的值

  ```js
  var b = getElement..ifreameB
  b.src = b.src+'#'+ 'data';
  window.onhashchange = function (){
  	var data = window.location.hash
  }
  ```

- postMessage

  > h5处理跨域通信

  ```js
        // 窗口A(http:A.com)向跨域的窗口B(http:B.com)发送信息
        Bwindow.postMessage('data', 'http://B.com');
        // 在窗口B中监听
        Awindow.addEventListener('message', function (event) {
            console.log(event.origin);//http:A.com只接受a
            console.log(event.source);//引用a窗口对象
            console.log(event.data);//接收的数据
        }, false);
  ```

- WebSocket

  >不受同源策略限制

  ```js
  var ws = new WebSocket('wss://echo.websocket.org');
  ws.onopen = function (evt) {
      console.log('Connection open ...');
      ws.send('Hello WebSockets!');
  };
  ws.onmessage = function (evt) {
      console.log('Received Message: ', evt.data);
      ws.close();
  };
  ws.onclose = function (evt) {
      console.log('Connection closed.');
  };
  ```

- Cors 跨域资源共享

  >支持跨域的ajax,在http头加一个origin允许你

  浏览器会拦截ajax请求，他觉得这个请求是跨域的会在http头加一个origin

  ```js
  fetch('/some/url/', {
      method: 'get',
  }).then(function (response) {
  
  }).catch(function (err) {
    // 出错了，等价于 then 的第二个参数，但这样更好用更直观
  });
  ```

## 前端安全

### CSRF

跨站点请求伪造。

**原理**

用户登录网站A，A把cookie发送给A,保存在浏览器

- 网站的接口存在漏洞
- A登录了这个网站

用户在登录了A时访问病毒网站B，B里有某个引诱图片或者文字，指向A连接的某个接口，网站并不知道这个cookie是否是用户的，比如新浪微博之前那个添加粉丝关注用户那个攻击。

**防御**

- token验证：访问网站会向你本地存储token,如果你访问接口没有带token,就不能通过验证，引诱链接不会自动携带token
- referer验证：判断页面来源是我的站点的页面,通过验证Referer，可以判断请求的合法性，如果Referer是其他网站的话，就有可能是CSRF攻击，则拒绝该请求。
- 隐藏令牌：类似token,把令牌隐藏在http头里，不是在链接上。

## xss

跨站脚本攻击。

**向你的页面里注入JS去运行，JS函数体里做他想做的**

他不需要登录认证，核心原理是向你页面注入脚本。 

评论区里嵌入一个srcipt标签或者img标签等等。