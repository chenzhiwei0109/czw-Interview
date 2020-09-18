# vue基础

## vue的设计思想

- 数据驱动
- MVVM框架

MVVM三要素:响应式、模板引擎、渲染

响应式：vue如何监听数据变化？ - defineproperty

模版：vue的模版如何编写和解析？-  vue-loader  vue-template

渲染：vue如何将模板转换为html？ - vdom

vue就是vm,连接model层的data数据和view层的DOM页面。

MVVM理解：VM把数据通过响应式的方式绑定到视图，将来数据发生变化会更新页面数据，页面里的一些输入或者点击事件又会通过vue修改data的数据。

## 基本语法

### v-model

用 v-model 指令在表单 \<input> 、 \<textarea> 及 \<select> 元素上创建双向数据绑定。**它**

**会根据控件类型自动选取正确的方法来更新元素**。

```html
<input type="text" :value='value' @input='value = $event.target.value'>

```

### 事件处理

```
 按下回车键
<input type="text" v-model='value' @keydown.enter='addArr'>

```

- 事件修饰符
  - 阻止冒泡
  - 阻止捕获
  - 阻止默认行为
  - 只执行一次
  - 只处于当前元素
  - 是否使用原生事件监听
- 按键修饰符
- 系统修饰符

### class和style绑定

class绑定

```html
<div :class='{active:currentIndex===index}'
     v-for="(item, index) in arr"
     :key="index" 
     @click='currentIndex = index'>
    {{item}}
</div>
```

style绑定可读性比较差。

```html
<div :style='{backgroundColor:currentIndex===index?  "#fff":"#000"}'
     v-for="(item, index) in arr"
     :key="index" 
     @click='currentIndex = index'>
    {{item}}
</div>
```

### 条件渲染

v-if:惰性渲染元素，如果一开始条件为falsy,元素不会被放到DOM里，组件对应的生命周期过渡动画等钩子也不会执行

v-show:通过display控制元素显示，会完整触发组件标签的生命周期。

### 模板和渲染函数

>Vue通过它的**编译器**将模板编译成**渲染函数**，在数据发生变化的时候再次执行**渲染函数**，通过对
>
>比两次执行结果得出要做的dom操作，模板中的神奇魔法得以实现。

```js
// 输出vue替我们生成的渲染函数
console.log(app.$options.render)
```

```js
(function anonymous(
) {
with(this){return _c('div',{attrs:{"id":"app"}},[_c('input',{attrs:{"type":"text"},domProps:{"value":value},on:{"input":function($event){value = $event.target.value}}}),_v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(value),expression:"value"}],attrs:{"type":"text"},domProps:{"value":(value)},on:{"input":function($event){if($event.target.composing)return;value=$event.target.value}}}),_v("\n    "+_s(value)+"\n  ")])}
})
```

- return 一个虚拟DOM

渲染函数

```html
<div id="app">
</div>
<script src="./vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            value: 1
        },
        render() {
            with (this) { return _c('div', { attrs: { "id": "app" } }, [_c('input', { attrs: { "type": "text" }, domProps: { "value": value }, on: { "input": function ($event) { value = $event.target.value } } }), _v(" "), _c('input', { directives: [{ name: "model", rawName: "v-model", value: (value), expression: "value" }], attrs: { "type": "text" }, domProps: { "value": (value) }, on: { "input": function ($event) { if ($event.target.composing) return; value = $event.target.value } } }), _v("\n    " + _s(value) + "\n  ")]) }
        },
    })
</script>
```

### 计算属性和侦听器

使用方法:

```js
computed: {
    len(){
        console.log(1)//只会执行一次
        return this.arr.length
    }
},
```

```js
new Vue({
    watch: {
        //watch表示数据变化后才会执行，首次渲染并不会执行
        value(newV, oldV) {
            this.watcher = newV
        },
        value2:{
            immediate:true,//立即执行
            deep:true,//监控的如果是对象类型，深层次嵌套情况下需要deep:true。
            handler(newV,oldV){
                this.
            }
        }
    },
})
```

### 计算属性vs侦听器

- **监听器更通用**，理论上计算属性能实现的侦听器也能实现

- 监听器适合**一个数据影响多个数据**，计算属性适合**一个数据受多个数据影响**
- 计算属性有缓存，计算的值没有太大变化不会重复执行
- 监听器适合**执行异步操作或较大开销操作**的情况。比如官网的例子，监听输入内容进行ajax查询

## 生命周期

每个实例创建都会经历一系列过程

```js
{ 
    beforeCreate(){} // 执行时组件实例还未创建，通常用于插件开发中执行一些初始化任务。
    created(){} // 组件初始化完毕，各种数据可以使用，常用于异步数据获取。
    beforeMounted(){} // 未执行渲染、更新，dom未创建。
    mounted(){} // 初始化结束，$el显示出来，dom已创建，可用于获取访问数据和dom元素,echarts图这样的需要进行DOM操作的插件需要在mounted执行，或者子组件的refs 
    beforeUpdate(){} // 更新前，可用于获取更新前各种状态 
    updated(){} // 更新后，所有状态已是最新 
    beforeDestroy(){} // 销毁前，可用于一些定时器或订阅的取消 
    destroyed(){} // 组件已销毁，作用同上 
    activated(){} //被 keep-alive 缓存的组件激活时调用。
	deactivated(){} // 被 keep-alive 缓存的组件停用时调用。不可用于SSR
    errorCaptured(){}// 可以做一些容易出错的子组件，比如一些echart图等性能消耗很大的容易出错，捕获一个来自子孙组件的错误时被调用。
}
```

- new Vue 创建根实例

- 初始化事件和生命周期

- beforeCreate

- 初始化注入和校验(是否和当前data冲突)

- created

- 执行挂载逻辑

- 是否有el选项

- 是否有template选项

- beforeMount

- 创建vm.$el并替换el

- mounted

- 挂载完毕

- data修改时虚拟DOM重新渲染并更新

- 调用vm.$destory

- beforeDestory

- 解除绑定，销毁子组件和事件监听

- destoryed组件全部销毁完毕

  

![Vue 实例生命周期](../../.vuepress/public/assets/img/lifecycle.png)

### 





