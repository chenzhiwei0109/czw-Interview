# redux

唉呀妈呀和vue差不多呀。学了一小会基础掌握差不多了

Action Creators---> dispatch(action) -> Store

Store---> previousState,action -->Reducers

Reducers-->newState-->Store

state变化，重新渲染组件。

创建store时必须同时把state传递给她



## redux安装

```
npm install --save redux
yarn add redux
```

## store的创建

1. 创建str/store/reducer.js文件,在里面定义state以及默认值

```js
/str/store/reducer.js
const defaultState = {
  inputValue:'',
  list:[1,2]
}
export default (state=defaultState,action)=>{
  return state
}
```

2. src下创建store文件夹,下面创建index.js。引入reducer

```js
//src/store/index.js
import reducer from './reducer.js'
import { createStore } from 'redux';

const store = createStore(
  reducer,
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store
```

3. store连接components。

```jsx
// TodoList.js
import React, { Component } from 'react'
import { Input, Button, List } from 'antd';
import 'antd/dist/antd.css'
import store from './store'   //引入store

class Todo extends Component {
  constructor(props) {
    super(props);
		this.state = store.getState();  // 获取store的数据;
  }

  render() {
    return (
      <div>
        <Input
          value={this.state.inputValue}
          onChange={this.inputChange}
        />
        <Button type="primary">添加</Button>
        <List
          style={{ marginTop: '10px', width: '300px', marginRight: '10px' }}
          size="large"
          bordered
          dataSource={this.state.list}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </div>
    )
  }
}
export default Todo;
```

## action和reducer编写

**监听输入框变化，并改变state的值。**

创建一个action,里面传入事件告诉redux要做什么。

调用dispatch方法传递给store

```jsx
//todo.js
handleInputChange(e){
  const action = {  //告诉redux要干什么
    type: 'change_input_value',
    value:e.target.value
  }
  store.dispatch(action)
}

<Input
  value={this.state.inputValue}
  onChange={this.handleInputChange}
  />
```

store自动把dispatch传入的action和当前存的state转发给reducers。

reducer拿到之前的数据和用户想做的操作，然后对之前的数据进行处理，返回一个新的数据给store。

因为reducer可以接受state但是不能修改state。所以只能拷贝然后返回

```js
// src/store/reducer.js
const defaultState = {
  inputValue:'',
  list:[1,2]
}

//state就是上一次传入的state集合,action就是传入的change_input_value和值
export default (state=defaultState,action)=>{ 
  //如果传递的type是这个，我就定义一个newState,然后把newState的内容修改。
  if(action.type==='change_input_value'){
		const newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState
  }
  return state
}
```

更新时需要订阅store.

- store.subscribe(this.handleStoreChange);
- this.setState(store.getState());

```js
//todo.js
class TodoList extends Component {
	constructor(){
    super(props);
		this.state = store.getState();
    //需要监听store变化 subscribe 定期订购(或订阅等)
    this.handleStoreChange = this.handleStoreChange.bind(this)
   	store.subscribe(this.handleStoreChange);
  }
  handleStoreChange(){
    this.setState(store.getState());
  }
}
```

**监听input点击并改变item的内容**

```jsx
<Button type="primary" onClick={this.handleBtnClick}>添加</Button>
handleBtnClick() {
  if (this.state.inputValue) {
    const action = {
      type: 'add_todo_item',
    }
    store.dispatch(action)
  }
}
```



```js
export default (state = defaultState, action) => {
  if (action.type === 'change_input_value') {
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState;
  } else if (action.type === 'add_todo_item') {
    const newState = JSON.parse(JSON.stringify(state));
    newState.data.push(newState.inputValue);
    newState.inputValue = ''
    return newState
  }
  return state
}
```

**TodoList删除**

- 监听删除按钮

```jsx
<List
  style={{ marginTop: '10px', width: '300px', marginRight: '10px' }}
  size="large"
  bordered
  dataSource={this.state.data}
  renderItem={(item, index) => 
  <List.Item>
    {item}
    <Button type="primary" onClick={this.handleDelClick.bind(this, index)}>删除</Button>
  </List.Item>
  }
  />
```

```js
handleDelClick(index) {
  const action = {
    type: 'delete_todo_item',
    index
  }
  store.dispatch(action)
}
```

- 传入操作

  ```js
  const defaultState = {
    inputValue: '',
    data: [1, 2]
  }
  export default (state = defaultState, action) => {
    if (action.type === 'delete_todo_item') {
      const newState = JSON.parse(JSON.stringify(state));
      newState.data.splice(action.index,1);
      return newState
    }
  }
  ```

## 拆分actionTypes

```js
export const CHANGE_INPUT_VALUE = 'change_input_value'
export const ADD_TODO_ITEM = 'add_todo_item'
export const DELETE_TODO_ITEM = 'delete_todo_item'
```

```js
import {CHANGE_INPUT_VALUE,ADD_TODO_ITEM,DELETE_TODO_ITEM} from './actionTypes'
export default (state = defaultState, action) => {
  if (action.type === CHANGE_INPUT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState;
  }
  if (action.type === ADD_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.data.push(newState.inputValue);
    newState.inputValue = ''
    return newState
  }

  if (action.type === DELETE_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.data.splice(action.index,1);
    return newState
  }
  return state
}
```

## 使用actionCreator统一创建action

不建议这样:

```js
handleInputChange(e) {
  const action = {
    type: CHANGE_INPUT_VALUE,
    value: e.target.value
  }
  store.dispatch(action)
}
```

创建src/store/actionCreators.js

```js
import {CHANGE_INPUT_VALUE} from './actionTypes'
export const getInputChangeAction = (value) => ({
	type:CHANGE_INPUT_VALUE,
	value
})
```

```js
import {getInputChangeAction} from './store/actionCreators'
handleInputChange(e) {
	const action = getInputChangeAction(e.taret.value)
}
```

## 总结

**store的创建和引入**

- 创建store/index.js并引入并抛出 createStore方法
- createStore传递一个参数为reducer
- reducer是一个回调函数`reducer(state,action)`,他返回一个state给store,用来更新数据。
- 组件使用 `this.state = store.getState()`把store的state数据挂载到组件的state里

- 组件使用`store.subscribe(this.handleStoreChange);`方法监听改变

  ```js
  handleStoreChange() {
    this.setState(store.getState())
  }
  ```

**触发action改变store数据**

- 使用dispatch派发数据

  ```js
  handleInputChange(e) {
    const action = {
      type: CHANGE_INPUT_VALUE,
      value: e.target.value
    }
    store.dispatch(action)
  }
  ```

- 在reducer里接收，因为无法修改原有state,所以要深克隆一个

  ```js
  export default (state = defaultState, action) => {
    if (action.type === CHANGE_INPUT_VALUE) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.inputValue = action.value;
      return newState;
    }
    return state
  }
  ```

## redux设计使用原则

- store必须是唯一的,index下只有一个store
- 只有store能够改变自己的内容。这也是为什么reducer为什么不能直接改变state的原因。
- reducer必须是纯函数：给定固定输入，
  - 一定有固定输出，state和action一定，返回的函数是一定的，但是如果里面是一个new Date，就不是纯函数了。或者ajax请求也不行。
  - 并且没有副作用。不会修改原参数。

## API

- createStore:创建
- store.dispatch:派发action传递给store
- store.getState:获取store的数据
- store.subscribe:订阅store改变