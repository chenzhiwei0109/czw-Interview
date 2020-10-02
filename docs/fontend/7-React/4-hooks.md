# hooks

## 什么是hook

**让你在不编写 class 的情况下使用 state 以及其他的 React 特性。**

**Hook 使你在非 class 的情况下可以使用更多的 React 特性。**

例如， useState 是允许 你在 React 函数组件中添加 state 的 Hook。

如果你在编写函数组件并意识到需要向其添加⼀些 state，以前的做法是必须 将其它转化为 class。现在你可以在现有的函数组件中使⽤ Hook。

## useState

```jsx
import React from "react";
import { useState } from "react";

const HooksPage = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>hooks</h1>
            {count}
            <button onClick={() => setCount(count+1)}>点击</button>
        </div>
    );
};

export default HooksPage;

```

## useEffect 

如果你熟悉 React class 的生命周期函数，你可以把 `useEffect` Hook 看做 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合。

- 副作用必须要写道useEffect里。就像ajax放到didMount

### 基本用法

```jsx
import React, { useEffect, useState } from "react";

const HooksPage = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("effect");
        document.title = `点击了${count}次`
    });

    return (
        <div>
            <h1>hooks</h1>
            {count}
            <button onClick={() => setCount(count + 1)}>点击</button>
        </div>
    );
};

export default HooksPage;
```

### effect条件执行

- 需要关注第二个参数，数组的值发生变化才会执行

```jsx
import React, { useEffect, useState } from "react";

const HooksPage = () => {
  const [count, setCount] = useState(0);
  const [date, setDate] = useState(new Date());

  // count只在发生改变执行
  useEffect(() => {
    console.log("effect");
    document.title = `点击了${count}次`;
  }, [count]);

  useEffect(() => {
    //timer只在didmount执行一次
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
  }, []);

  return (
    <div>
      <h1>hooks</h1>
      {count}
      {date.toLocaleTimeString()}
      <button onClick={() => setCount(count + 1)}>点击</button>
    </div>
  );
};

export default HooksPage;

```

### effect清除

- class在willUnmount执行
- effect里返回一个函数执行清除

```js
useEffect(() => {
    const timer = setInterval(() => {
        setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
}, []);
```

## 自定义hook

状态逻辑共用

```jsx
// 1.自定义hook
// 时钟组件复用性很高
// 2.hook使用规则
/* 
1.只能在函数最外层调用hook
*/
import React, { useEffect, useState } from "react";

// 自定义hook,要以use开头
function useClock() {
  const [date, setDate] = useDate(new Date());
  useEffect(() => {
    //timer只在didmount执行一次
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return date
}

const HooksPage = () => {
  const [count, setCount] = useState(0);
  const [date, setDate] = useState(new Date());

  // count只在发生改变执行
  useEffect(() => {
    console.log("effect");
    document.title = `点击了${count}次`;
  }, [count]);
  return (
    <div>
      <h1>hooks</h1>
      {count}
      {  useClock() .toLocaleTimeString()}
      <button onClick={() => setCount(count + 1)}>点击</button>
    </div>
  );
};

export default HooksPage;

```

## 使用规则

- 只能在函数最外层使用hook，不能在循环，条件判断，或者子函数调用

  ```jsx
  const HooksPage = () => {
  
      if(count){
          const [count, setCount] = useState(0);
      }
      return (
          <div>
         
  </div>
  );
  };
  ```

  

- 只能在React的函数组件和自定义Hook中调用Hook。

  ```jsx
  //报错
  function getNum(){
       const [count, setCount] = useState(0);
      return count
  }
  ```

## useMemo

把“创建”函数和依赖项数组作为参数传⼊ useMemo ，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于**避免在每次渲染时都进⾏⾼开销的计算**。

下面这种操作很昂贵

```jsx
const useMemoPage = () => {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState(0);

    const expensive = () => {
        let sum = 0;
        return count + 1;
    };

    return (
        <div>
            <h1>useMemoPage</h1>
            <h2>expensive:{expensive()}</h2>
            <button onClick={() => setCount(count + 1)}></button>
            <input
                type="text"
                value={value}
                onInput={(e) => setValue(e.target.value)}
                />
        </div>
    );
};
```

解决方法

```jsx
const useMemoPage = () => {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState(0);

    const expensive = useMemo(() => {
        let sum = 0;
        return count + 1;
    }, [count]);
    return (
        <div>
            <h1>useMemoPage</h1>
            <h2>expensive:{expensive}</h2>
            <button onClick={() => setCount(count + 1)}></button>
            <input
                type="text"
                value={value}
                onInput={(e) => setValue(e.target.value)}
                />
        </div>
    );
};
```

## useCallback

>把内联回调函数及依赖项数组作为参数传⼊ useCallback ，它将返回该回调函数的 memoized 版本， 该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使⽤引⽤相等性去避 免⾮必要渲染（例如 shouldComponentUpdate ）的⼦组件时，它将⾮常有⽤。

只有在限制时才进行更新对应函数

- shouldComponentUpdate返回false时不执行
- PureComponent 会进行浅层次比较然后判断变化是否执行
- 但是函数式的组件里每次重赋值，他的子组件里就会当作是不一样的值，把方法传入自足间时还会重新执行，所已要使用useCallback

```jsx
import React, { useState, useCallback, PureComponent } from "react";


export default function UseCallbackPage(props) {
    const [count, setCount] = useState(0);
    // 只有在依赖项更新的时候才执行,child组件不会再次重render
    const addClick = useCallback(() => {
        let sum = 0;
        for (let i = 0; i < count; i++) {
            sum += i;
        }
        return sum;
    }, [count]);
    const [value, setValue] = useState("");
    return (
        <div>
            <h3>UseCallbackPage</h3>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>add</button>
            <input value={value} onChange={(event) => setValue(event.target.value)} />
            <Child addClick={addClick} />
        </div>
    );
}
class Child extends PureComponent {
    render() {
        console.log("child render");
        const { addClick } = this.props;
        return (
            <div>
                <h3>Child</h3>
                <button onClick={() => console.log(addClick())}>add</button>
            </div>
        );
    }
}

```

>注意 依赖项数组不会作为参数传给“创建”函数。虽然从概念上来说它表现为：所有“创建”函数中引⽤的 值都应该出现在依赖项数组中。未来编译器会更加智能，届时⾃动创建数组将成为可能。

