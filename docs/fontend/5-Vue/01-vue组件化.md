# 组件化vue

[TOC]

## 组件化好处

代码重用，维护，隔离性等等。

## 组件创建方式

```js
new Vue({
	render(h){ //h=>createElement方法
		return h('div',{class:'class1'},'msg')
	}
})
```

```js
Vue.component('comp',{
  
})
```

````js
const Comp = Vue.entends({
  template:``,
  data(){
    return ..
  }
});
const comp = new Comp();
//或者
new Comp().$mount('#app')

````

## 组间通信

```js
─ Father.vue
		├─ Child1.vue
		│ 	 ├─ GrandChild1.vue
    │    └─ GrandChild2.vue
		└─ Child2.vue	
```

### 父组件=>子组件

#### props

```js
//Child1  对象是浅拷贝，异步属性最好放在计算属性里使用。
props:{title:String}
//Father
<Child1 :title="title1" ></Child1>
```

#### refs

ref通常用于访问DOM节点，放在组件上就是访问这个。特别适合做DOM操作 .

**父组件先于子组件创建,create时子组件还没有存在**

```js
//Father
<Comp ref='hw'>

mounted(){  //如果使用create,父组件早于子组件，访问不到
    this.$refs.hw.a = 'b'
}

//Child1
data(){
    return {
        a:'c'
    }
}
```

#### $children

子元素不保证顺序,子元素是只读，无法修改，但是子元素内部的属性可以修改。比如data的属性

```js
//parent

this.$children[0].xx == 'b'
```

### 子组件=>父组件：自定义事件

子组件派发事件，在父组件里对应子组件实例里进行监听

事件的派发和监听者都是子组件。

```vue
//child
<h1 @click="$emit('xx',num)">
this.$emit('xx',this.num)
    
// parent
<Cart @xx="yy($event)"></Cart>
```

### 兄弟组件传值:通过共同父辈

$parent

```js
// brother1 
this.$parent.$on('foo', ()=>{}) 
<div @click=
// brother2
this.$parent.$emit('foo')
```

### 祖孙传参：provide/inject

嵌套层数多，传递props不实际，使用provide/inject实现提供/注入

- provide/inject：祖先给后代传值

```js
//祖组件
name:'app',
provide:{bb:'xx'}

//任意子孙组件
name:'helloworld'
inject: ['bb']  //aa就是app。  

```

**注入的值不建议被修改，所以响应式没有意义**

**只能祖先传给子代。用于组件**

### 任意两个组件：事件总线/vuex

事件总线方式

```js
main.js
Vue.prototype.$bus = new Vue({})

// child1
this.$bus.$emit('foo','a')
//child2
this.$bus.$on('foo', (a)=>{this.a=a})
```

## 插槽

内容分发技术

>v-slot代替slot、slot-scope

### 匿名插槽

```html
//component
<div>
    <slot></slot>
</div>

//parent
<component>aaa</component>
```

### 具名插槽

内容分发到子组件

```html
//component
<div>
    <slot></slot>
    <slot name='content'></slot>
</div>

//父组件
<component>
    匿名插槽的内容放在这里
	<template #content>具名插槽</template>
</component>
```

### 作用域插槽

```html
//component
<div>
    <slot :foo="foo"></slot>
</div>
<script>
	data(){
    retrun {
      foo:'msg'
    }
  }
</script>

// parent 
<Comp3>
    <!-- 把v-slot的值指定为作用域上下文对象 --> 
    <template #default="ctx"> 
        来自子组件数据：{{ctx.foo}} 
    </template> 
    <!-- 解构方式 --> 
    <template #default="{foo}"> 
        来自子组件数据：{{foo}} 
    </template> 
</Comp3>
```

## .sync

```html
<Input :value.sync='model.username'>
等于
<Input :value="username" @update:value="username=$event">
this.$emit('update:value', newTitle)

绑定属性名更改，响应的属性名也变  
<Input :foo='username' @update:foo="username=$event">
  
  
```

## 弹窗组件实现

这类组件是在当前实例之外独立存在，通常挂载于body。就是实现一个函数

```js
this.$create(Notice, {
 title: 'xxx',
 message: '提示信息',
 duration: 1000
}).show();
```

```js
create.js
// 创建指定组件实例并挂载于body上
import Vue from 'vue';

export default function create(Component, props) {
    // 0. 先创建vue实例
    const vm = new Vue({
        render(h) {
            // render方法提供给我们一个h函数，它可以渲染VNode,第二个参数是可能传入的属性
            return h(Component, {props})
        }
    }).$mount(); // 更新操作
    
    // 1. 上面vm帮我们创建组件实例
    // 2. 通过$children获取该组件实例
    console.log(vm.$root);
    
    const comp = vm.$children[0];
    // 3. 追加至body
    document.body.appendChild(vm.$el);

    // 4. 清理函数
    comp.remove = () => {
        document.body.removeChild(vm.$el);
        vm.$destroy();
    }

    // 5. 返回组件实例
    return comp;
}

```

```vue
<template>
  <div v-if="isShow">
    <h3>{{title}}</h3>
    <p>{{message}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      default: ""
    },
    duration: {
      type: Number,
      default: ""
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    show() {
      this.isShow = true;
      setTimeout(() => {
          this.hide()
      }, this.duration);
    },
    hide() {
      this.isShow = false;
      this.remove();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
```

## 递归组件

- 必须有name
- 必须有结束条件

```vue
<template>
<li>
    <div @click="toggle">
        {{model.title}}
        <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
    </div>
    <ul v-show="open" v-if="isFolder">
        <item 
              class="item"
              v-for="model in model.children"
              :model="model"
              :key="model.title"></item>
    </ul>
    </li>
</template> <script>
    export default {
        name: "Item",
        props: {
            model: Object
        },
        data: function() {
            return {
                open: false
            };
        },
        computed: {
            isFolder: function() {
                return this.model.children && this.model.children.length;
            }
        },
        methods: {
            toggle: function() {
                if (this.isFolder) {
                    this.open = !this.open;
                }
            },
        }
    };
</script>
```

