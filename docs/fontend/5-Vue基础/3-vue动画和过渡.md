## CSS过渡动画

```html
<transition name="fade">
...
</transition>

<style>
    /* 定义过渡动画 */
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
</style>

```

![Transition Diagram](../../.vuepress/public/assets/img/transition.png)

## 过渡类名

在进入/离开的过渡中，会有 6 个 class 切换。

1. `v-enter`：定义进入**过渡的开始状态**。在元素被插入之前生效，在元素被插入之后的下一帧移除。

   ```css
   .fade-enter{opactity:0}
   ```

2. `v-enter-active`：定义进入**过渡生效时的状态**。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

   ```css
   .fade-enter-active { transition: opacity .5s; }
   ```

3. `v-enter-to`：**2.1.8 版及以上**定义**进入过渡的结束状态**。在元素被插入之后下一帧生效 (与此同时 `v-enter` 被移除)，在过渡/动画完成之后移除。

   ```css
   .fade-enter-to { opacity: 1; }
   ```

4. `v-leave`：定义**离开过渡的开始状态**。在离开过渡被触发时立刻生效，下一帧被移除。

   ```css
   .fade-leave { opacity: 1; }
   ```

5. `v-leave-active`：定义**离开过渡生效时的状态**。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

   ```css
   .fade-leave-active { transition: opacity .5s; }
   ```

6. `v-leave-to`：**2.1.8 版及以上**定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave` 被删除)，在过渡/动画完成之后移除。

   ```css
   .fade-leave-to { opacity: 0; }
   ```

## 初始渲染过度

可以通过 `appear` attribute 设置节点在初始渲染的过渡

```html
<transition 
            name="fade"
            appear
            appear-active-class="animated swing"
            enter-active-class="animated tada" 
            leave-active-class="animated swing">
    <div v-show="condition">111</div>
</transition>
```

## keyframe

```css
@keyframes xxx{
	0%{
		transform:scale(0)
	},
	50%{
		transform:scale(1.5)
	},
	100%{
		transform:scale(1)
	},
}
.fade-enter-active{
	transform-origin:left center;  //需要指定原点，否则会出问题
	animation:xxx 1s;
}
.fade-leave-active{
	transform-origin:left center;
	animation:xxx 1s reverse;
}
```

## animate

优先级高于name = 'fade'

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
<div id="app">
    <transition 
                name="fade"
                enter-active-class="animated bounceIn" 
                leave-active-class="animated bounceOut">
        <div v-show="condition">111</div>
    </transition>
    <button @click='condition=!condition'>qieh</button>
</div>
```

## 多元素过渡

vue会复用dom,解决方法就是给他们添加key值，这样就不会进行复用了。

```html
<transition>
  <button v-if="isEditing" key="save">
    Save
  </button>
  <button v-else key="edit">
    Edit
  </button>
</transition>
```

更好的方法：

```html
<transition>
  <button v-bind:key="docState">
    {{ buttonMessage }}
  </button>
</transition>
```

```css
// ...
computed: {
  buttonMessage: function () {
    switch (this.docState) {
      case 'saved': return 'Edit'
      case 'edited': return 'Save'
      case 'editing': return 'Cancel'
    }
  }
}
```

当有**相同标签名**的元素切换时，需要通过 `key` attribute 设置唯一的值来标记以让 Vue 区分它们，否则 Vue 为了效率只会替换相同标签内部的内容。即使在技术上没有必要，**给在 <transition> 组件中的多个元素设置 key 是一个更好的实践。**

## velocityjs使用

```
npm install velocity-animate
```



```
<script src="https://cdn.bootcss.com/velocity/2.0.5/velocity.js"></script>
```

```html
<transition name='fade' 
            @before-enter='handleBeforeEnter'
            @enter='handleEnter'
	        @after-enter='handleAfterEnter'

            >
    <div v-show="show">hello world</div>
</transition>
```

```js
methods: {
  handleClick() {
    this.show = !this.show
  },
  handleBeforeEnter(el) {
      el.style.opacity = 0;
  },
  handleEnter(el, done) { 
 		Velocity(el,
                 {opacity:1},
                 {
            		duration:1000,
            		conplete:done  //这时候他会结束才会进行下一个
        		 }
                )
  },
  handleAfterEnter(){
     console.log('动画结束')
  }    
},
```

## 过渡模式

同时生效的进入和离开的过渡不能满足所有要求，所以 Vue 提供了**过渡模式**

- `in-out`：新元素先进行过渡，完成之后当前元素过渡离开。
- `out-in`：当前元素先进行过渡，完成之后新元素过渡进入。

```html
<transition name="fade" mode="out-in">
  <!-- ... the buttons ... -->
</transition>
```

## 多组件过渡

多个组件的过渡简单很多 - 我们不需要使用 `key` attribute。相反，我们只需要使用[动态组件](https://cn.vuejs.org/v2/guide/components.html#动态组件)：

```html
<transition name="component-fade" mode="out-in">
  <component v-bind:is="view"></component>
</transition>
```

```js
new Vue({
  el: '#transition-components-demo',
  data: {
    view: 'v-a'
  },
  components: {
    'v-a': {
      template: '<div>Component A</div>'
    },
    'v-b': {
      template: '<div>Component B</div>'
    }
  }
})
```

```
change(){
	this.type = this.type === 'v-a'?'v-b':'v-a'
}
```

## 列表过渡

```html
<transition-group>
  <div v-for="(item, index) in items" :key="item.id">
    {{item.title}}
  </div>
</transition-group>
```

```
.v-enter,.v-leave-to{
	opacity:0;
}
.v-enter-active, .v-leave-active{
	transition:all 1s ease
}
```



