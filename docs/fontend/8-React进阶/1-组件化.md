# 组件化

```
npx create-react-app myComponents
```

- 复用性
- 代码逻辑解耦，提高项目可维护性

## 高阶组件HOC

- 函数接收一个组件返回一个组件。
- 例子：比如说我们有个菜单组件，然后我们使用高阶组件接受这个组件，然后在高阶组件内进行是否显示这个菜单组件的逻辑判断，可以在这个组件外部一层一层的套外壳。
- 组件是将props转换为UI，而高阶组件是将组件转换为另⼀个组件。HOC 在 React 的第三⽅库中很常见，例如 React-Redux 的 connect，

```jsx
import React, {Component} from "react";

function Child(props) {
  return <div>Child</div>;
}
//HOC: 是个函数，接收一个组件A，然后把组件A进行修饰，返回一个新的组件B,
// Cmp这里是function或者class组件
const foo = Cmp => props => {
  return (
    <div className="border">
      <Cmp {...props} />
    </div>
  );
};
const Foo = foo(child)

export default class HocPage extends Component {
  render() {
    return (
      <div>
        <h3>HocPage</h3>
        <Foo />
      </div>
    );
  }
}

```

### 链式调用

```jsx
import React, {Component} from "react";

function Child(props) {
    return <div>Child</div>;
}
//HOC: 是个函数，接收一个组件A，然后把组件A进行修饰，返回一个新的组件B,
// Cmp这里是function或者class组件
const foo = Cmp => props => {
    return (
        <div className="border">
            <Cmp {...props} />
        </div>
    );
};
const foo2 = Cmp => props => {
    return (
        <div className="greenBorder">
            <Cmp {...props} />
        </div>
    );
};
const Foo = foo(Child)
const Foo2 = foo(foo(Child))

// 链式调用，比如我们有个input,
const Foo3 = foo2(foo(Child))
export default class HocPage extends Component {
    render() {
        return (
            <div>
                <h3>HocPage</h3>
                <Foo />
                <Foo2></Foo2>
                <Foo3></Foo3>
            </div>
        );
    }
}

```

### 装饰器写法

链式一层套一层写法很麻烦，我们可以用装饰器来写

```
npm install -D @babel/plugin-proposal-decorators
```

更新config-overrides.js

```jsx
//配置完成后记得重启下
const { addDecoratorsLegacy } = require("customizecra");
module.exports = override(
 ...,
 addDecoratorsLegacy()//配置装饰器
);
```

如果vscode对装饰器有warning，vscode设置⾥加上

`javascript.implicitProjectConfig.experimentalDecorators": true`

```jsx
//...
// !装饰器只能⽤在class上
// 执⾏顺序从下往上  相当于foo2(foo(foo(Child)))
@foo2
@foo
@foo
class Child extends Component {
  render() {
    return <div> Child {this.props.name}</div>;
  }
}
// const Foo = foo2(foo(foo(Child)));
export default class HocPage extends Component {
  render() {
    return (
      <div>
        <h3>HocPage</h3>
        <Child />
      </div>
    );
  }
}

```

### HOC注意事项

高阶组件是React复用组件逻辑的一种高级技巧。HOC自身不是React API的一部分，而是一种设计模式

- 不要在render方法使用HOC

  ```
  React 的 diff 算法（称为协调）使⽤组件标识来确定它是应该更新现有⼦树还是将其丢弃并挂载新⼦树。 如果从 render返回的组件与前⼀个渲染中的组件相同（===），则 React 通过将⼦树与新⼦树进⾏区分来递归更新⼦树。 如果它们不相等，则完全卸载前⼀个⼦树。
  ```

  ```jsx
  render() {
      // 每次调⽤ render 函数都会创建⼀个新的
      EnhancedComponent
      // EnhancedComponent1 !== EnhancedComponent2
      const EnhancedComponent = enhance(MyComponent);
      // 这将导致⼦树每次渲染都会进⾏卸载，和重新挂载的操作！
      return <EnhancedComponent />;
  }
  ```

  这不仅仅是性能问题 - 重新挂载组件会导致该组件及其所有⼦组 件的状态丢失。

- 

## 表单组件

### 双绑实现

```jsx
import React, { Component } from 'react';
import {Form, Input, Icon, Button} from "antd";

class FormPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            form:{
                username:'',
                password:''
            }
        }
    }
    render() {
        const {username,password} = this.state.form
        return (
            <div>
                <h3>组件表单</h3>
                <Form>
                    <Form.Item>
                        <Input value={username}
                            onInput={e=>this.setState({name:e.target.value})} />
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default FormPage;

```

### Form.create实现

getFieldDecorator： ⽤于和表单进⾏双向绑定

getFieldsValue：获取⼀组输⼊控件的值，如不传⼊参数，则获 取全部组件的值 

getFieldValue： 获取⼀个输⼊控件的值 

validateFields：校验并获取⼀组输⼊域的值与 Error，若 fieldNames 参数为空，则校验全部组件

```jsx
import React, {Component} from "react";
import {Form, Input, Icon, Button} from "antd";

const nameRules = {required: true, message: "please input ur name"};
const passwordRules = {required: true, message: "please input ur password"};

@Form.create({})
class FormPage2 extends Component {
    submit = () => {
        const {getFieldsValue, getFieldValue, validateFields} = this.props.form;
        validateFields((err, values) => {
            if (err) {
                console.log("err", err); //sy-log
            } else {
                console.log("success", values); //sy-log
            }
        });
        // console.log("submit", getFieldsValue(), getFieldValue("name")); //sy-log
    };
render() {
    console.log("props", this.props); //sy-log
    const {getFieldDecorator} = this.props.form;
    return (
        <div>
            <h3>FormPage2</h3>
            <Form>
                <Form.Item>
                    {getFieldDecorator("name", {rules: [nameRules]})(
                        <Input placeholder="please input ur name" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator("password", {rules: [passwordRules]})(
                        <Input type="password" placeholder="please input ur password" />
                    )}
                </Form.Item>
                <Button type="primary" onClick={this.submit}>
                    提交
                </Button>
            </Form>
        </div>
    );
}
}

export default FormPage2;

```





