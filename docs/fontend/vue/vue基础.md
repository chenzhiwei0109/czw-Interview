# vue笔记

## 基础

### 介绍

Vue是一个数据驱动的渐进式框架，他的核心只关注视图层，内部帮我们封装了DOM操作，我们可以只关注视图层。

**声明式渲染**

Vue.js 的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进 DOM 的系统：

**attribute 指令**:v-

**组件本质上是一个拥有预定义选项的一个 Vue 实例**

### vue实例

每个 Vue 应用都是通过用 `Vue` 函数创建一个新的 **Vue 实例**开始。

Vue的设计受到MVVM模型的启发。vm ==viewmodel;

一个 Vue 应用由一个通过 `new Vue` 创建的**根 Vue 实例**，以及可选的嵌套的、可复用的组件树组成。

**数据和方法**

当一个 Vue 实例被创建时，它将 `data` 对象中的所有的属性加入到 Vue 的**响应式系统**中。当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。

只有当实例被创建时就已经存在于 `data` 中的属性才是**响应式**的

使用 `Object.freeze()`，这会阻止修改现有的属性，也意味着响应系统无法再*追踪*变化。

除了数据属性，Vue 实例还暴露了一些有用的实例属性与方法。它们都有前缀 `$`，以便与用户定义的属性区分开来

```js
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch 是一个实例方法
vm.$watch('a', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
})
```

### 生命周期

> Vue实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模板、挂载Dom、渲染→更新→渲染、卸载等一系列过程，我们称这是Vue的生命周期。通俗说就是Vue实例从创建到销毁的过程，就是生命周期。

beforeCreate

> 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。

created

> 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。

beforeMount

> 在挂载开始之前被调用：相关的 render Function首次被调用。

mounted

> el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。

beforeUpdate

> 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。

updated

> 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。

![Vue 实例生命周期](../../.vuepress/public/assets/img/lifecycle.png)

![img](https://cn.vuejs.org/images/lifecycle.png)