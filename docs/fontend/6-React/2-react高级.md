# react高级内容

[TOC]

## 使用 PropTypes 进行类型检查

<https://react.docschina.org/docs/typechecking-with-proptypes.html>

- defaultProps默认值，父组件未传时.

```js
import PropTypes from 'prop-types'
//child
class TodoItem extends React.Component {    
}
TodoItem.PropTypes = {
  content:ProTypes.string.isRequired，//必须
  deleteItem:PropTypes.func, //函数类型
  index:PropTypes.number //数字类型
}
TodoItem.defaultProps = {
  test:'hello world',
}
```

## props，state和render函数关系

state里的inputVal发生变化，输入框的value值就会跟着变

```
val = {this.state.inputVal}
```

监听自身的onChange,在change时(失去焦点时触发。)改变时修改state的inputVal。

- **当数据(state、props)发生变化,render函数重新执行，所以页面会变化。**

- **当父组件render函数运行时，子组件的render也会被重新运行**

## 虚拟DOM

1. 定义一个state数据

2. 有一个JSX模板

3. 数据和模板相结合，生成真实DOM
4. state发生改变时，重复3。

缺陷:

第一次生成完整DOM,第二次又生成完整DOM,替换第一次，耗费性能

**方案2**

1. 定义一个state数据

2. 有一个JSX模板

3. 数据和模板相结合，生成真实DOM
4. state发生改变
5. 数据+模板结合，生成真实DOM,并不替换原始DOM，新DOM和原始DOM对比，找差异
6. 找出input框的变化，只用新的DOM（DocumentFragment）的input元素替换老的DOM的input元素。

缺陷：

对比也会额外消耗性能

**方案3**

- 创建state 数据

- 创建jsx模板

- 生成虚拟DOM

  虚拟DOM是个js对象，用来描述真实DOM （js生成js对象，代价很小，但是创建DOM会调用webaccliction级别的API,性能消耗很大）

  ```
  ['div',{id:'abc'},['span',{},['div'...........]]]
  ```

- 虚拟DOM生成真实DOM

- state变化时，数据+模板生成新的虚拟DOM

  ```
  ['div',{id:'abc'},['span',{'aaa'},['div'...........]]]
  ```

- 比较原始虚拟DOM和新的虚拟DOM区别

- 直接操作DOM改变span的内容。

## 深入了解虚拟DOM

jsx+数据->createElement方法->js对象->真实DOM

**生成过程**

- 数据+模板生成虚拟DOM(虚拟DOM是一个JS对象，描述真实DOM)损耗性能

```
['div',{id:'abc'},['span',{},'helloword']]
```

- react底层使用creatElement方法转换成真实DOM。

```jsx
<div> item </div>
```

```js
return React.createElement('div',{}，React.createElement('span',{},'item'))
```

- state发生变化
- 数据+模板生成新的虚拟DOM
- 比较old节点和new节点的区别，找到区别
- 直接操作DOM，改变span内容

**优点：**

1. 性能提升
2. 实现跨端， react native，因为js对象在原生应用可以被识别。

## diff算法

### **什么时候虚拟dom比对?** 

- state变化，改变setState, props改变归根到底也是state变化。

### **setState为什么是异步**

为了提升底层性能，连续调用三次setState，出于性能考虑，setState设为异步，把三次setState合并成一次，只做一次比对和渲染。

### **如何比较两者区别？**

两个虚拟DOM同层对比，如果第一层DOM不一致，就不会往下比，就直接把重新生成的完全替换。这样会造成DOM节点的浪费，但是好处是比对算法简单，速度更快。

### **key**

- 提高对比性能，不用两次for循环。

在虚拟DOM对比时更快更准确的拿到对应的旧节点。

如果节点没有Key值，两个节点的关系无法确立，需要做循环遍历对比。但是如果循环时给他们起个名字，这样中间插入节点时，不会使用替换而是移动和添加。

## ref使用

ref不推荐使用，不要操作DOM。

**我想获取div的长度**

- reference,引用，使用他操作DOM

  ```
  render() {
    return (
      <ul ref={(ul)=>{this.ul = ul}}  />  //this.ul指向的就是这个ul；
    )
  }
  }
  ```

- 比如点击时往input添加数据，list变化，执行完毕我们获取ul，然后获取ul下面所有元素的div长度。但是这样取不到。因为数据更新是异步的

  ```js
  this.setState(()=>{
  	...
  }) 
  this.ul.querySelectorAll(..)  //在setState之前执行。所以取不到。
  ```

  ```js
  this.setState(()=>{
  	...
  },()=>{
      this.ul.querySelectorAll(..)  //需要这样写。
  }) 
  ```

## 生命周期

render必须有。因为React.Component组件内部默认内置其他生命周期，但是没有内置render所以必须定义他。

### **Initialization**

**Mounting**

- componentWillMount:组件挂载到页面前

- render函数:渲染之前被执行

- componentDidMount():组件挂载后执行

### **Updation**

props变化

- componentWilReceiveProps: 子组件接收prop后，父组件的render函数重新执行后，才会执行，如果这个组件第一次存在于父组件中，他不执行。如果之前他存在于父组件中才会执行。
- 。。。。。执行states下面的

states变化

- shouldComponentUpdate() :组件更新之前执行，返回布尔类型。 false就是不更新。true是更新
- componentWillUpdate(): 组件更新之前执行，如果should返回true他才执行
- render():渲染执行
- componentDidUpdate():组件更新之后执行

### unMounting

- componentWillUnmount():组件即将删除时执行

## 生命周期使用场景

**shouldComponentUpdate**：如果props内容不变，就returnfalse

```
shouldComponentUpdate(nextProps,nextState){
	if(nextProps.content !== this.props.content){
		return true
	}else{
		return false
	}
}
```

ajax请求远程数据，不能放在render里，不然死循环。

**componentWillMount**不适合，因为会在reactive等一些东西冲突，

```
componentDidMount(){
	axios.get('/api/todoList')
	.then().catch()
}
```

## 性能优化

- 缓存，bind作用域绑定
- setState异步，减少虚拟DOM匹配频率。
- 虚拟DOM同层比对,key值，AST语法树

## css动画

动画结束后效果无法保存，我们需要在最后添加**forwards**，保存最后一帧的样式。

```
.hide{
	animation:hide-item 2s ease-in forwards;
}
@keyframes hide-item{
	0%{
		opacity:1;
		color:red
	}
	50%{
		opacity:0.5
		color:green
	}
	100%{
		opacity:0;
		color:blue
	}
}
```

## react-transition-group

```jsx
import {SCCTransition} from 'react-transition-group'

render(){
	reuturn (
		<CSSTransition in={this.state.show}>
            <div></div>
	)
}
```

```css
.fade-enter .fade-appear //入场动画第一个时刻  appear是当第一次进入，页面刷新时进入
.fade-enter-active
.fade-enter-done

.fade-exit
.fade-enit-active
.fade-exit-done
```

```
onEntering
onExit
onExiting
```

多组件切换

```
import {TransitionGroup,CSSTransition} from 'react-transition-group'
<TransitionGroup>
	list.map.....
		return
		 <CSSTransition>
		 	<li>xxxxx<>
```









- 