# vue笔记

[TOC]

## 基础





















































































### vue实例

一个 Vue 应用由一个通过 `new Vue` 创建的**根 Vue 实例**，以及可选的嵌套的、可复用的组件树组成。

每个组件都是一个vue实例。

凡是以$开头的都是vue的实例属性或者方法。

比如vm.$destory()

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

> Vue实例从创建到销毁的过程，就是vue的生命周期。

**生命周期过程:**

>新建vue实例

> 初始化生命周期和事件

**beforeCreate**

> 在实例初始化之后，数据观测(data observer) 和  双向绑定配置之前被调用。

**created**

> 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。

>判断是否指定了el,如果指定了el就判断是否指定了template选项，指定后就是要template代替el。、、
>
>如果没有指定el，就

**beforeMount**

> 页面并没有被渲染：相关的 render Function首次被调用。此时页面内部并没有任何内容。

**mounted**

> el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。此时才会获取到真正的dom。dom操作在这一步进行

**beforeUpdate**

> 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。

**beforeupdated**

>调用vm.destory()销毁组件时或者router切换时。

**updated**

> 由于数据更改导致的虚拟 DOM 重新渲染和patch打补丁，在这之后会调用该钩子。

![Vue 实例生命周期](../../.vuepress/public/assets/img/lifecycle.png)

![img](https://cn.vuejs.org/images/lifecycle.png)

### 模板语法

{{}}

v-text

v-html 更新元素的 `innerHTML`会有xss攻击风险 **内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译**

这些语法都可以写js表达式

### 计算属性

计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。

计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。注意，如果某个依赖 (比如非响应式属性) 在该实例范畴之外，则计算属性是**不会**被更新的。

```js
var vm = new Vue({
  data: { a: 1 },
  computed: {
    // 仅读取
    aDouble: function () {
      return this.a * 2
    },
    // 读取和设置
    aPlus: {
      get: function () {
        return this.a + 1
      },
      set: function (v) {
        this.a = v - 1
      }
    }
  }
})
vm.aPlus   // => 2
vm.aPlus = 3
vm.a       // => 2
vm.aDouble // => 4	
```

### 侦听器

```js
var vm = new Vue({
  data: {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: {
      f: {
        g: 5
      }
    }
  },
  watch: {
    a: function (val, oldVal) {
      console.log(val, oldVal)
    },
    // 方法名
    b: 'someMethod',
    // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
    c: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true
    },
    // 该回调将会在侦听开始之后被立即调用
    d: {
      handler: 'someMethod',
      immediate: true
    },
    // 你可以传入回调数组，它们会被逐一调用
    e: [
      'handle1',
      function handle2 (val, oldVal) { /* ... */ },
      {
        handler: function handle3 (val, oldVal) { /* ... */ },
        /* ... */
      }
    ],
    // watch vm.e.f's value: {g: 5}
    'e.f': function (val, oldVal) { /* ... */ }
  }
})
vm.a = 2 // => new: 2, old: 1
```

### 样式绑定

**class绑定**

对象绑定

```js
:class="{activated: isActived}"
```

数组绑定

```js
:class="[activeClass]"
data:{
	  activeClass: 'active',

}
```

数组配合对象

```js
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

当在一个自定义组件上使用 `class` 属性时，这些 class 将被添加到该组件的根元素上面。这个元素上已经存在的 class 不会被覆盖。

**style绑定**

对象绑定

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
data:{
	
}
```

```html
<div v-bind:style="styleOjb"></div>
data:{
	styleOjb:{
		color:"red",
	}
	click(){
		this.styleobj.color = this.styleobj.color==="black"? "red":"black"
	}
}
```

数组绑定

```html
<div v-bind:style="[baseStyles, overridingStyles,{fontSize:'20px'}]"></div>

```

### v-for

无法动态添加对象的属性，

### Vue.set

Vue.set( target, propertyName/index, value )	

向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性 (比如 `this.myObject.newProperty = 'hi'`)

```
Vue.set(vm.userInfo,"address","aa")
vm.$set(vm.userInfo,"address","aa")
```

```
vm.userInfo[1]=5;
Vue.set(vm.userInfo,1,5)//下标为1的改成5
```

- 注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象。

### 事件绑定

**监听原生DOM**

在监听原生 DOM 事件时，方法以事件为唯一的参数。如果使用内联语句，语句可以访问一个 `$event` 属性：`v-on:click="handle('ok', $event)"`。

**事件修饰符**

- `.stop` - 调用 `event.stopPropagation()`。

- `.prevent` - 调用 `event.preventDefault()`。

- `.capture` - 使用捕获模式。

- `.self` - 只有点击自己本身才会，防止子元素冒泡到自己。

- `.{keyCode | keyAlias}` - 只当事件是从特定键触发时才触发回调。

- `.native` - 监听组件根元素的原生事件。

- `.once` - 只触发一次回调。 **可以用于组件事件**

- `.left` - (2.2.0) 只当点击鼠标左键时触发。

- `.right` - (2.2.0) 只当点击鼠标右键时触发。

- `.middle` - (2.2.0) 只当点击鼠标中键时触发。

- `.passive` - (2.3.0) 以 `{ passive: true }` 模式添加侦听器 ,提升移动端的性能。

  ```
  <div v-on:scroll.passive="onScroll">...</div>
  ```

  >不要把 `.passive` 和 `.prevent` 一起使用，因为 `.prevent` 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，`.passive` 会告诉浏览器你*不*想阻止事件的默认行为。

用在普通元素上时，只能监听[**原生 DOM 事件**](https://developer.mozilla.org/zh-CN/docs/Web/Events)。用在自定义元素组件上时，也可以监听子组件触发的**自定义事件**。

**事件之间可以进行组合**

`v-on:click.prevent.self` 会阻止**所有的点击**，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。

## 深入理解组件

### is-DOM模板解析注意

用于[动态组件](https://cn.vuejs.org/v2/guide/components.html#动态组件)且基于 [DOM 内模板的限制](https://cn.vuejs.org/v2/guide/components.html#解析-DOM-模板时的注意事项)来工作。

tbody里只能写tr,我们如果在里面写了一个组件，这个组件里有tr,那样解析时就会出错。解决方法：

```html
<table>
    <tbody>
    	<tr is="row"></tr>  //tr即是一个组件又是一个标签
    </tbody>
</table>
```

### 组件内data必须是函数

组件内的必须是函数并且返回一个对象。

因为子组件不会像根组件一样被调用一次，每次在dom里创建一个子组件标签就相当于创建一个子组件实例，为了让这些标签内容不冲突，让他们应该有自己的数据。通过函数返回一个对象，这样每次创建新子组件时就

### ref

**获取DOM**

```html
<div ref="xx" @click="handleclick">
    XXX
</div>


methods:{
	handleclick(){
		this.$refs.xx.innerHTML  //XXX
	}
}
```

**跨组件-获取组件的引用**

```html
<div id="root">
    <counter @change='handleChange' ref='one'></counter>
    <counter @change='handleChange' ref='two'></counter>
</div>
```

```js
const Counter = {
    template:'<div @click='handleClick'>{{number}}</div>',
    data(){
        return {
            number:0
        }
    },
    methods:{
        handleClick(){
            this.number++;
            this.$emit('change')
        }
    }
}
root = new Vue({
    data:{
        total:0
    },
    methods:{
        handleChange(){
            this.total = this.$refs.one.number+this.$refs.two.number
        }
    }
})
```

### 父子组件传值

#### **父->子通过属性**

```html
<div id="root">
    <counter :count="0" @click='handleClikc'></counter>
</div>
```

```js
var counter = {
	template:'<>{{count}}<>'，
    data(){
        return{
      		number:this.count      
        }
    },
	props:{
		count:{
			type:Number,
			default:0
		}
	},
	methods:{
		handleClikc(){
			this.number++;
		}
	},
        computed: {
            normalizedSize: function () {
                return this.count.trim().toLowerCase()
            }
        }
}
```

单向数据流：子组件不能改变父组件的数据;

解决方法：使用data或者computed

#### 子传父trim

```
this.$emit('xx',2);

<chindren @xx="handlexx">

new Vue({
	methods:{
		handlexx(x){
			console.log(x)
		}
	}
})
```

### 组件参数校验

组件参数校验

- required，布尔值，必传
- default默认,对象数组需要使用工厂函数获取
- validator自定义验证函数，return是布尔值

```js
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```

### 非props特性

特点1：非 prop 特性是指父组件向子组件传递属性，但是子组件没有声明props接收。

特点2：非props特性attribute 会显示在子组件根元素的html属性上面。

```html
<child content='hell'>
```

### 组件绑定原生事件

当我们给一个组件绑定事件，这个事件实际绑定的是自定义事件，而不是原生事件。

```html
<div id='root'>
    <child @click='handleClick'></child>
</div>
```

```js
const child = {
	template:'<div @click="handleChildClick">child</div>',
	methods:{
        handleChildClick(){
            alert('childClick')
        }
    }
}
new Vue({
	methods:{
		handleClick(){
            alert('click')
        }
	}
})
```

如果我们想给组件绑定点击，需要在子组件内部绑定点击事件，然后通过$emit发射到父组件。

```html
<div id='root'>
    <child @click='handleClick'></child>
</div>
```

```js
const child = {
	template:'<div @click="handleChildClick">child</div>',
	methods:{
        handleChildClick(){
            this.$emit('click')
        }
    }
}
new Vue({
	methods:{
		handleClick(){
            alert('click')
        }
	}
})
```

解决方法：

.native修饰符。

```html
<div id='root'>
    <child @click.native='handleClick'></child>
</div>
```

### 总线-非父子组件传值

方法1：Vuex

方法2：发布订阅模式(观察者模式)-总线机制

**给Vue的原型绑定一个新的vue实例，然后通过$emit发送事件，通过$on监听事件**

bus是vue的实例，他里面的$emit方法可以向外触发事件,

在mounted阶段通过this.bus.$on('change',function(msg){})获取;

```html
<child content='www'></child>
<child content='ccc'></child>
```

```js

Vue.prototype.bus = new Vue();

const child = {
    template:'<div @click='handleClick'>{{content}}</div>',
    props:{
        content:String
    },
    data(){
        return{
            text:this.content
        }
    }
    methods:{
        handleClick(){
            this.bus.$emit('change',this.text)
        }
    },
    mounted(){
        var self = this
        this.bus.$on('change',function(msg){
            self.content=msg
        })
    }
}
```

### 动态组件

```html
<component :is="type"></component>
<component :is="ss"></component>
```

```js
data(){
	return {
		type:'one',
        ss:'two'
	}
}
```

```js
Vue.component('one',{
})
Vue.component('two',{
})
```

### 组件配合v-once

这样第一次渲染时会被放到内存。可以提高静态内容展示效率

```
Vue.component('one',{
    template:'<div v-once></div>'
    
})
Vue.component('two',{
        template:'<div v-once></div>'
})
```

组件配合

