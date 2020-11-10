---
sidebarDepth: 2
---

# 可复用性

## 自定义指令

```html
<input v-focus>
```

```js
Vue.directive('focus', {
    inserted(el) {
        el.focus()
    }
})

```

```js
directives: {
    focus: {
        // 指令的定义
        inserted: function (el) {
            el.focus()
        }
    }
}
```

钩子函数

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

- `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。
- `unbind`：只调用一次，指令与元素解绑时调用。

### 按钮权限控制

```js
const role = 'user'
Vue.directive('permission', {
    inserted(el) {
        if (role !== 'admin') {
            el.parentElement.removeChild(el)
        }
    }
})

```

```html
<div class="toolbar" v-permission="'admin'">
```

## 渲染函数

Vue推荐在绝大多数情况下使用模板来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的 完全编程的能力。这时你可以用渲染函数，它比模板更接近编译器。

![image-20200923085907177](../../.vuepress/public/assets/img/image-20200923085907177.png)

![image-20200923085855517](../../.vuepress/public/assets/img/image-20200923085855517.png)

```js
render: function (createElement) {
    // createElement函数返回结果是VNode
    return createElement(
        tag, // 标签名称
        data, // 传递数据
        children // 子节点数组
    )
}
```

### 使用

```js
//Render.vue
export default {
    props: ["level"],
    render(h) {
        // snabbdom

        return h(
            "h" + this.level, //参数1 标签名
            this.$slots.default //参数3插槽
        );
    },
};
```

```html
<button @click="level=level-1">变大</button>
<Render :level="level">a</Render>
```

### 虚拟DOM

Vue 通过建立一个虚拟 DOM 来追踪自己要如何改变真实 DOM。 范例：输出虚拟DOM观察期结构

```js
const vnode = h(
    'h' + level,
    { attrs: { title: this.title } }, // 之前省略了title的处理
    this.$slots.default
)
console.log(vnode);

```

### createElement参数

```js
// @returns {VNode}
createElement(
    // {String | Object | Function}
    // 一个 HTML 标签名、组件选项对象，或者
    // resolve 了上述任何一种的一个 async 函数。必填项。
    'div',

    // {Object}
    // 一个与模板中 attribute 对应的数据对象。可选。
    {
        // (详情见下一节)
    },

    // {String | Array}
    // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
    // 也可以使用字符串来生成“文本虚拟节点”。可选。
    [
        '先写一些文字',
        createElement('h1', '一则头条'),
        createElement(MyComponent, {
            props: {
                someProp: 'foobar'
            }
        })
    ]
)
```

### 范例-函数式组件

处理title和icon

```html
<heading :title='title' >
    <svg>
		<use xlink:href='#icon-gouwuche'></use>
    </svg>
</heading>
```

```js
Vue.component('heading', {
    functional: true, //标记函数式组件
    props: ['level', 'title', 'icon'],
    render(h) {
        let children = [];
        // 添加图标功能
        // <svg><use xlink:use="#icon-xxx"></use></svg>
        if (this.icon) {
            children.push(h(
                'svg',
                { class: 'icon' },
                [h('use', { attrs: { 'xlink:href': '#icon-' + this.icon } })]))
            children = children.concat(this.$slots.default)
        }
        vnode = h(
            'h' + level,
            { attrs: { this.title } }, // 之前省略了title的处理
            children
        )
        console.log(vnode);
        return vnode
    }
})

```

## 函数式组件

只是一个接受一些 prop 的函数，没有管理任何状态，也没有监听任何传递给它的状态，也没有生命周期方法。

没有this,没有$slots等

```js
Vue.component('my-component', {
    functional: true,
    // Props 是可选的
    props: {
        // ...
    },
    // 为了弥补缺少的实例
    // 提供第二个参数作为上下文，没this
    render: function (createElement, context) {
        // ...
    }
})
```

```js
Vue.component('heading', {
    functional: true, // 函数式组件
    props: {
        level: {
            type: String,
            required: true
        },
        title: {
            type: String,
            default: ''
        },
        icon: {
            type: String
        }
    },
    render(h, context) {
        // 子节点数组
        let children = []

        console.log(context);

        // 属性获取
        const {icon, title, level} = context.props;

        // icon属性处理逻辑
        if (icon) {
            // <svg class="icon"><use xlink:href="#icon-cart"/></svg>
            children.push(h(
                'svg',
                { class: 'icon' },
                [h('use', { attrs: { 'xlink:href': '#icon-' + icon } })]
            ))

        }

        // 拼接子节点
        children = children.concat(context.children)

        const vnode = h(
            'h' + level, // 参数1：tagname
            { attrs: { title } }, // 参数2：{。。。}
            children // 参数3：子节点VNode数组
        )
        console.log(vnode);
        // 返回createElement返回的VNode
        return vnode
    }
})

```

## 过滤器

```html
<div v-bind:id="rawId | formatId"></div>
```

```js
{{ c.price | currency('RMB') }}
filters: {
    currency(value, symbol = '￥') {
        return symbol + value;
    }
}

```

## 混入

- 组件的data和method优先级更高
- 生命周期会合并输出

混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任 意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

```js
// 定义一个混入对象
var myMixin = {
    created: function () {
        this.hello()
    },
    methods: {
        hello: function () {
            console.log('hello from mixin!')
        }
    }
}
// 定义一个使用混入对象的组件
Vue.component('comp', {
    mixins: [myMixin]
})

```

## 插件

插件通常用来为 Vue 添加全局功能。

Vue.js 的插件应该暴露一个 `install` 方法。这个方法的第一个参数是 `Vue` 构造器，第二个参数是一个可选的选项对象：

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

```js
//插件使用
// 调用 `MyPlugin.install(Vue)`
// 用 Browserify 或 webpack 提供的 CommonJS 模块环境时// 不要忘了调用此方法
Vue.use(MyPlugin)


new Vue({
  // ...组件选项
})
```

