# react-router

react-router包含3个库，react-router、react-router-dom和react-router-native。react-router提供最 基本的路由功能，实际使⽤的时候我们不会直接安装react-router，⽽是根据应⽤运⾏的环境选择安装 react-router-dom（在浏览器中使⽤）或react-router-native（在rn中使⽤）。react-router-dom和 react-router-native都依赖react-router，所以在安装时，react-router也会⾃动安装，创建web应⽤， 使⽤：

```
cnpm install --save react-router-dom
```

## 基础用法

⼀切皆组件。路由器-Router、链接-Link、路由-Route、独占-Switch、重 定向-Redirect都以组件形式存在

创建RouterPage.js

```js
//imrr 简写引入 react-router
```

```jsx
import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

// 父组件
class ReactRouter extends Component {
    render() {
        return (
            <div>
                <h1>路由页</h1>
                <Router>
                    <Link to="/">首页</Link>||
                    <Link to="/user">用户中心</Link>
                    {/* exact精确匹配 /user不会匹配/ */}
                    {/* 渲染方式和优先级:component<children<render */}
                    <Route
                        exact
                        path="/"
                        component={HomePages}
                        //children={() => <div>children</div>}
                        //render={() => <div>render</div>}
                        ></Route>
                    <Route path="/user" component={UserPage}></Route>
                </Router>
            </div>
        );
    }
}

class HomePages extends Component {
    render() {
        return (
            <div>
                <h3>HomePage</h3>
            </div>
        );
    }
}

class UserPage extends Component {
    render() {
        return (
            <div>
                <h3>UserPage</h3>
            </div>
        );
    }
}

export default ReactRouter;

```

## render渲染的三种方式

Route渲染优先级：children>component>render

**children：func**

有时候，不管location是否匹配，你都需要渲染⼀些内容，这时候你可以⽤children。除了不管location是否匹配都会被渲染之外，其它⼯作⽅法与render完全⼀样。

**render：func**

但是当你⽤render的时候，你调⽤的只是个函数。 只在当location匹配的时候渲染。

**component: component**

只在当location匹配的时候渲染。

## 404

设定⼀个没有path的路由在路由列表最后⾯，表示⼀定匹配