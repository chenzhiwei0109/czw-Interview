---
sidebarDepth: 2
---

# DOM

## 获取DOM元素九种方式

- `document.getElementById()`
- `[context].getElementsByTagName()`
- `[context].getElementsByClassName()`,获取类名集合(不兼容ie678)
- `document.getElementByName()`, 通过标签name属性获取一组元素集合(ie只支持表单的name)
- `document.head/document.body/document.documentElement` 获取head,body,html元素。
- `[context].querySelector(sel)`不兼容ie6-8
- `[context].querySelectorall(sel)`不兼容ie6-8

```js
getElementsByTagName和getElementsByClassName获取的是HTMLCollection
getElementByName和querySelectorall获取的都是节点集合
```

## 获取节点间关系属性

>节点:Node
>
>节点集合:NodeList。

| 节点类型 | nodeType | nodeName    | nodeValue |
| -------- | -------- | ----------- | --------- |
| 元素节点 | 1        | 大写标签名  | null      |
| 属性节点 | 2        | name        | 属性值    |
| 文本节点 | 3        | '#text'     | 文本内容  |
| 注释节点 | 8        | '#commen'   | 注释内容  |
| 文档节点 | 9        | '#document' |           |

描述节点关系的属性

- `childNodes`:获取所有子节点。
- `children`:获取所有的元素子节点。
- `firstChild/lastChild`:获取第一个子节点/最后一个子节点
- `firstElementChild/lastElementChild`:获取第一个元素子节点,不兼容IE6-8
- `previousSibling/nextSibling`:获取上一个节点/获取下一个节点
- `previousElementSibling/nextElementSibling`:获取上一个元素节点(不兼容ie678)
- `parentNode`：父节点

## 封装获取节点关系方法

**封装获取元素子节点的方法**

```js
function children(ele){
  var res = []
  nodeList = ele.childNodes;
  for(var i=0;i<nodeList.length;i++){
    var item = nodeList[i];
    if(item.nodeType===1){
      res.push(item)
    }
  }
  return res; 
}
```

获取上一节点

```js
function prev(elem) {
  do {
    elem = elem.previousSibling;
  } while (elem && elem.nodeType != 1);
  return elem;
}

```

获取下一节点

```js
function next(elem) {
    do {
        elem = elem.nextSibling;
    } while (elem && elem.nodeType != 1); //(elem!=null && elem.nodeType != 1 ); 非0数字 非空字符串 
    return elem;
}
```

获取第一个

```js
// function first(elem){
//     elem = elem.firstChild;
//     if(elem.nodeType == 1){
//         return elem;
//     }else{
//         return next(elem);
//     }
// }
```

## JS动态增删元素

创建

`createElement`创建元素对象

`createTextNode`创建文本对象



`appendChild`把元素添加到容器末尾/从一个元素向另一个元素中移动元素。

`insertBefore(指定元素，新增元素)`把元素添加指定容器的指定元素的前面



`cloneNode(true/false)`克隆元素或者节点。true为深克隆



`parent.removeChild(child)`从容器移除元素

```js
ul.insertBefore(li1,newli2)
```

## 自定义属性设置

`setAttribute/getAttribute/removeAttribute`会在html标签上展示出来。

```js
div1.setAttribute('data-x','xx');//这种方式会加到标签上，是attr
div1.indexa = 'a' //这种方式是props。
```

## 获取元素属性方法13个盒子模型

- client
  - width
  - height
  - top
  - left
- offset
  - width/height
  - top/left
  - parent
- scroll
  - width/height
  - top/left

`getBoundingClientRect`

```JS
rectObject.top：元素上边到视窗上边的距离;
rectObject.right：元素右边到视窗左边的距离;
rectObject.bottom：元素下边到视窗上边的距离;
rectObject.left：元素左边到视窗左边的距离;
rectObject.width：是元素自身的宽
rectObject.height是元素自身的高
```

方法：`getComputedStyle/currentStyle `

```js
window.getComputedStyle(element,伪类) /element.currentStyle()
```

**client**

```js
//获取可视区域宽高(内容宽度+左右padding)
box.clientWidth
```



