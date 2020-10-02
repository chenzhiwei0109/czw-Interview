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

## 方法

1. createStore 创建store

2. reducer 初始化、修改状态函数

3. getState 获取状态值

   ```js
   constructor(props) {
       super(props);
       this.state = store.getState();  // 获取store的数据;
   }
   ```

4. dispatch 提交更新

5. subscribe 变更订阅

```js

```



## 累加器案例

- store存放数据
- 使用dispatch传递action去更新
- 更新后需要订阅一下store的数据进行更新

```js
import { createStore } from "redux";

// 定义state初始化
function counterReducer(state = 0, action) {
    switch (action.type) {
        case "ADD":
            return state + 1;
        case "MINUS":
            return state - 1;
        default:
            return state;
    }
}

const store = createStore(counterReducer)
export default store
```

```jsx
import React, { Component } from "react";
import store from "../store/ReduxStore";
export default class ReDuxPage extends Component {
    componentDidMount() {
        store.subscribe(() => {
            console.log("subscribe");
            this.forceUpdate();
            //this.setState({});
        });
    }
    add = () => {
        store.dispatch({ type: "ADD" });
    };
minus = () => {
    store.dispatch({ type: "MINUS" });
};
render() {
    console.log("store", store);
    return (
        <div>
            <h3>ReduxPage</h3>
            <p>{store.getState()}</p>
            <button onClick={this.add}>add</button>
            <button onClick={this.minus}>minus</button>
        </div>
    );
}
}

```

还可以在src/index.js的render⾥订阅状态变更

```jsx
import store from './store/ReduxStore'
const render = ()=>{
    ReactDom.render(
        <App/>,
        document.querySelector('#root')
    )
}
render()

//重新render
store.subscribe(render)
```

## react-redux

- redux太反人类太麻烦

```
cnpm install react-redux --save
```

react-redux提供了两个api 

1. Provider 为后代组件提供store。不需要每个页面都引入store。
2. connect 为组件提供数据和变更⽅法。 

```jsx
//index.js
import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import store from './store/'
import { Provider } from 'react-redux'
ReactDom.render(
    <Provider store={store}>
    <App/>
    </Provider>,
document.querySelector('#root')
)
```

获取状态数据，ReactReduxPage.js

```jsx
import React, { Component } from "react";
import { connect } from "react-redux";

class ReactReduxPage extends Component {
  render() {
    const { num, add, minus } = this.props;
    return (
      <div>
        <h1>ReactReduxPage</h1>
        <p>{num}</p>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    num: state,
  };
};
const mapDispatch = {
  add: () => {
    return { type: "add" };
  },
  minus: () => {
    return { type: "minus" };
  },
};
export default connect(
  mapState, //状态映射 mapStateToProps
  mapDispatch //派发事件映射
)(ReactReduxPage);

```



