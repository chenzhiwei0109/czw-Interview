---
sidebarDepth: 2
---

# 组件化

## 组件注册

```js
Vue.component('xxx',{
    data(){
        return {
            
        }
    },
    template:`<div></div>`
})
```

## 插槽

```html
//Vslot.vue
<template>
  <div>
    <slot>默认插槽</slot>
    <slot name='header' :u='user'>
        {{user.age}}
    </slot>
  </div>
</template>
<script>
export default {
    data(){
        return {
            user:{
                name:'zs',
                age:18
            }
        }
    }
};
</script>
```

```html
//parent
<Vslot>
    <template #header="{u}">
        <div>{{u.name}}</div> 
    </template>
</Vslot>
```

![image-20200922131718408](../../.vuepress/public/assets/img/image-20200922131718408.png)

### 解构插槽

作用域插槽的内部工作原理是将你的插槽内容包括在一个传入单个参数的函数里,所以可以使用解构

```html
<current-user v-slot="{ user }">
  {{ user.firstName }}
</current-user>
```

```html
<current-user v-slot="{ user: person }">
  {{ person.firstName }}
</current-user>
```

你甚至可以定义后备内容，用于插槽 prop 是 undefined 的情形：

```html
<current-user v-slot="{ user = { firstName: 'Guest' } }">
  {{ user.firstName }}
</current-user>
```

### 动态插槽

从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数。

```html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

## 组件vmodel

- 需要在子组件处理@input事件

父组件

```html
<Vmodel v-model="data"></Vmodel>
<!-- 相当于
<Vmodel :value='data' @input='data=$event'></Vmodel>
-->
```

子组件

```html
<input type="text" :value="value" @input="$emit('input',$event.target.value)" />
<script>
    export default {
        props: ["value"],
    };
</script>
```

## sync修饰符

```html
<Input :value.sync='model.username'>
等于
<Input :value="username" @update:value="username=$event">
this.$emit('update:value', newTitle)

绑定属性名更改，响应的属性名也变  
<Input :foo='username' @update:foo="username=$event">
```



>.sync修饰符主要用来子组件改变父组件传的props用的，通过`$emt('@update:propName',arg) `的形式把接受的prop属性改变
>
>父组件通过`.sync:propName='stateName'`来进行修改。

当一个子组件通过$emit('@update:xx')改变了一个 prop 的值时，这个变化也会同步到父组件中所绑定。如果我们不用.sync，我们想弹窗功能，我们也可以props传初始值，然后事件监听，实现起来也不算复杂。

```html
this.$emit('update:show', false);

<myComponent :show.sync='valueChild'></myComponent>
相当于
<comp :show="valueChild" @update:show="e => bar = e"></comp>
```

例子：

```html
<div v-if="show">
    <p>默认初始值是{{show}}，所以是显示的</p>
    <button @click.stop="closeDiv">关闭</button>
</div>
<script>
    export default{
        props:['show'],
        closeDiv() {
            this.$emit('update:show', false); //触发 input 事件，并传入新值
        }
    }
</script>
```

```html
<comp :show="valueChild" @update:show="val => bar = val"></comp>
<myComponent :show.sync='valueChild'></myComponent>
<button @click="changeValue">toggle</button>
<script>
    export default{
        data(){
            return	{valueChild:true,}
        },
        methods:{
            changeValue(){
                this.valueChild = !this.valueChild
            }
        }
    }
</script>

```



## 组件化的理解

定义：组件化是VUE的重要组成部分，是VueComponent的实例，他extend于vue。

优点：使得程序的阅读性更好，把一些复杂的逻辑抽取分离出来，更加易于维护，并且可以进行复用，提高开发效率。

使用场景：

- 通用的一些组件，比如按钮，input,无法再次进行抽离。
- 业务组件：具有一定的复用性，为特定的业务提供的组件，比如轮播图组件，日期组件
- 区域组件：一个页面分为不同区域，防止单页面文件代码过多
- 页面组件：详情页，列表页

如何使用组件

- 使用Vue.component进行局部定义组件
- 组件通信:`prop` `$emit/$on` `provide/inject` `$children/$parent/$root(会有强耦合,不适合开发)`，`$attrs/$listener`
- 有状态组件(data) 和无状态组件(自身无状态,函数式组件 functional),抽象组件abstract比如transition,keep-alive.
- 内容分发：slot template 传送门
- 使用和优化：is keep-alive 异步组件

## 组件的本质

- 组件模板=>vue-template-loader=>ast=>render函数=>Virtual DOM=>DOM

**组件的本质是虚拟DOM**