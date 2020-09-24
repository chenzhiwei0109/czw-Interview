

# redux进阶

## ui组件和容器组件

- 一个组件的逻辑和ui需要拆分到两个部分。ui组件处理渲染，容器组件处理逻辑

## 无状态组件

组件只有render函数，他性能高。不需要创建类执行，生命周期函数等等。

```jsx
const TodoListUI = (props)=>{
  return (
  	<div>
    	<Input> { this.props.value}</Input>
    </div>
  )
}
```

## redux获取异步数据

```jsx
//todoList.js
import axios from 'axios'

class TodoList extends React.Component{
  componentDidMount(){
    axios.get('./list.json').then((res)=>{
      const data = res.data;
      const action = initListAction(data);
      store.dispatch(action);
    })
  }
}
```

```js
export const initListAction = data =>{
  return {
    type:'',
    data
  }
}
```

```js
//reducer.js
if(action.type=''){
  newState.list = action.data
  return newState
}
```

## redux-thunk异步请求

redux-thunk中间件进行ajax发送

- 异步请求逻辑如果太复杂，不能全放到组件，所以进行统一管理。
- redux-thunk中间件会把复杂逻辑放在action处理
- 这样做自动化测试更简单。

### 安装:

```js
npm install redux-thunk
```

### 配置

store/index.js

```js
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = componseEnhamcers(
    applyMiddleware(thunk)
)
const store = createStore(
	reducer,
  enhancer
)
```

### 使用

```js
//actionCreators.js
export const initListAction =(data)=>{
  return {
    type:INIT_LIST_ACTION,
    data
  }
}

export const getTodoList =() =>{
	return (dispatch)=>{
		axios.get('/list.json').then(res=>{
			const data = res.data;
      const action = initListAction(data);
			dispatch(action);
		})
	}
}
```

```jsx
//todo.js
class Todos extends React.Component{
  //当组件挂载完成后。 使用这个中间层，即使返回的是个函数，也可以把函数发送出去。
  componentDidMount(){
    const action = getTodoList();
    //他发现是个函数，会自动执行这个
    store.dispatch(action);
  }
}
```

## 什么是redux中间件

他不是react的中间件！

redux中间件是**action和store之间**的中间件。就是对dispatch方法的封装。会在派发action时进行一些解决。

redux-thunk设计思想是把异步操作放到actions里

redux-saga单独把异步逻辑拆分放到单独文件管理。

## redux-saga中间件

我们把异步代码都放到action里，这样有助于自动化测试和管理。

## react-redux使用

```
npm install react-redux
```

- Provider API

```jsx
src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './react-redux/TodoList';
import { Provider } from 'react-redux'
import store from './store'
const App = (
  <Provider store={store}>
    <TodoList />
  </Provider>
)
ReactDOM.render(
  App,
  document.getElementById('root')
);
```

- connect是连接，把todolist和store连接，
- 怎么连接？ mapStateToProps里 的store的state数据映射到props的inputValue位置

```jsx
//todolist.js
import store from'./store'
import {connect} from 'react-redux';

class TodoList extends Component {
  render(){
    return (
    	<div>
      	<input value={this.props.inputValue}/>
        <button onClick={this.handleClick.bind(this)}>提交</button>
      </div>
    )
  }
}
//把store的数据映射到
const mapStateToProps = (state) =>{
  return{
    inputValue:state.inputValue
  }
}

//连接todoList和store
export default connect(mapStateToProps,null)(TodoList);
```







