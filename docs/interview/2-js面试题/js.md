# js面试题

## DOM部分

### DOM事件级别是什么？

没有DOM1级的事件，DOM1标准存在。

DOM0  div.onclick = function(){}

DOM2  div.addEventListener('click',function(){},false)

DOM3  div.addEventListener('keyup',function(){},false)  多了一些鼠标和键盘事件

IE标准DOM2：div.attachEvent('')

### DOM事件模型是什么？

捕获和冒泡；

捕获：从祖先元素往当前元素

冒泡：从当前元素往祖先元素

### DOM事件流？

一个完整的事件流分三个阶段，事件通过捕获到达目标元素，然后从目标元素冒泡到window对象。

### 描述DOM事件捕获具体流程？

因为DOM是windows下的一个属性，所以说首先是从window对象开始，然后传递到他的子属性document对象，之后传递到html对象也就是 document.documentElement,然后传递到body,之后就按照body内部的结构传递最后传递到目标元素。

window>document>html(js里如何获取html? document.documentElement)>body>按照html结构来传。

### Event对象的常见应用是什么？

```js
event.preventDefault();   //.prevent
event.stopPropagation(); //阻止冒泡 vue里是.stop
event.stopImmediatePropagation();  //如果注册了两个事件a,b，在a点击不执行b,在a里加这句话,b就不被执行;  事件响应优先级
event.currentTarget === this;  
event.target  //事件委托/代理。  实际被点击的元素。 e.srcElement;
```

```
document.body.onclick = function(e){
    e = e || window.event;
    t = e.target || e.srcElement;
    var url = t.href;
    load_page(url);
};

```

### 你会自定义事件吗？

按钮不是常规click事件而不是回调

```js
//创建事件, Event是无法传递参数的
var event = new Event('build');
//创建事件, CustomEvent是可以传递参数的
var event = new CustomEvent('build', { detail: elem.dataset.time });

// 监听事件Listen for the event.
elem.addEventListener('build', function (e) { //... }, false);

// 分发/触发事件Dispatch the event.
elem.dispatchEvent(event);
```

new Event无法加数据，

CustomEvent('name',object);

```js
var eve = new Event('test');
div1.addEventListener('test', function () {
  console.log('触发')
})
setTimeout(() => {
  div1.dispatchEvent(eve);
}, 1000)
```

