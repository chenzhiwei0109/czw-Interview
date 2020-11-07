# 高阶指南

## 响应式

Vue 最独特的特性之一，是其非侵入性的响应性系统。数据模型是被代理的 JavaScript 对象。而当你修改它们时，视图会进行更新。这让状态管理非常简单直观

### 如何使用JS做响应式

```js
var val1 = 2
var val2 = 3
var sum = val1 + val2

// sum
// 5

val1 = 3

// sum
// 5
```

- 检测其中某一个值是否发生变化
- 用跟踪 (track) 函数修改值
- 用触发 (trigger) 函数更新为最新的值

### Vue 如何追踪变化？

Vue 在内部跟踪所有已被设置为响应式的对象，因此它始终会返回同一个对象的 Proxy 版本。

从响应式 Proxy 访问嵌套对象时，该对象在返回之前*也*被转换为 Proxy：

```js
const handler = {
  get(target, prop, receiver) {
    track(target, prop)
    const value = Reflect.get(...arguments)
    if (isObject(value)) {
      return reactive(value)
    } else {
      return value
    }
  }
  // ...
}
```