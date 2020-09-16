# vue3

## 新特性

- 使用ts
- 底层响应式
- hooks

## vue3使用两种方式

方法1：适合需要2.x的插件

https://github.com/vuejs/composition-api

```js
npm install @vue/composition-api
# or
yarn add @vue/composition-api
```

```js
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
```

方法2：

https://github.com/vuejs/vue-next

```js
vue add vue-next
```

## vue3的state和methods

setUp：data,methods,computed都写在这里

**data数据设置和修改**

方法1：reactive

方法2：

## computed和watch

### computed

- 方法1：写在state里`tribleNum:computed(()=>state.num*3)`
- 方法2：使用computed函数 `const doubleNum = computed(() => {return state.num * 2;});`

```js

  import { reactive, ref, toRefs, computed } from "@vue/composition-api";
  export default {

    setup() {
      const state = reactive({
        num: 1,
        tribleNum:computed(()=>state.num*3)
      });

      const add = () => {
        state.num++;
      };

      //
      const doubleNum = computed(() => {
        return state.num * 2;
      });

      return {
        ...toRefs(state),
        doubleNum,
        add,
      };
    },
  };

```

### watch

## 生命周期

- **与 2.x 版本生命周期相对应的组合式 API**

  - `beforeCreate` -> 使用 `setup()`
  - `created` -> 使用 `setup()`
  - `beforeMount` -> `onBeforeMount`
  - `mounted` -> `onMounted`
  - `beforeUpdate` -> `onBeforeUpdate`
  - `updated` -> `onUpdated`
  - `beforeDestroy` -> `onBeforeUnmount`
  - `destroyed` -> `onUnmounted`
  - `errorCaptured` -> `onErrorCaptured`

- **新增的钩子函数**

  除了和 2.x 生命周期等效项之外，组合式 API 还提供了以下调试钩子函数：

  - `onRenderTracked`
  - `onRenderTriggered`

## 组件传值

方法1：

坑爹点:必须写`props: ["msg2"],`

```html
//Parent
<Child :msg2='msg2'></Child>
```

```html
<template>
  <div>1{{Mymsg}}{{Mymsg}}</div>
</template>

<script>
  import { reactive } from "@vue/composition-api";
  export default {
    props: ["msg2"],
    setup(props) {
      const state = reactive({
        Mymsg: props.msg2,
      });
      return state;
    },
  };
</script>
<style>
</style>
```

方法2 provide和inject。

这种方式可以传爷孙组件。

```js
import Child from "@/components/Child";
import {
  //.....
  provide
} from "@vue/composition-api";
export default {

  components: {Child},

  setup() {
    const state = reactive({
      msg2: "vue3",
      num: 1,
      div:'你好',
    });
    provide('num')
    provide('div','你不好')

    return {
      ...toRefs(state),
    };
  },
};
```

```html
<template>
  <div>
    1{{Mymsg}}{{Mymsg}}
    <div>inject {{msg2}}</div>
    <div>inject {{div}}</div>
  </div>
</template>

<script>
  import { reactive, inject } from "@vue/composition-api";
  export default {
    setup() {
      const state = reactive({
        msg2: inject("msg"),
        div:inject("div"),
      });
      return state;
    },
  };
</script>
<style>
</style>
```

# vue3

## 脚手架变化

- 使用函数的方式而不是使用实例化的方式

main.js

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')
//相当于
//const app = createApp(App)
//app.use(store)
//app.use(router)
//app..mount('#app')
```

store

```js
import { createStore } from 'vuex'

export default createStore({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
})

```

vuex

```js
import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
```

## vue3引入antdvue

https://2x.antdv.com/docs/vue/getting-started-cn/

```js
npm i --save ant-design-vue@next

import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';

const app = createApp();
app.config.productionTip = false;

app.use(Antd);
```

**局部导入组件**

```jsx
import { createApp } from 'vue';
import { Button, message } from 'ant-design-vue';
import App from './App';

const app = createApp();
app.config.productionTip = false;

/* Automatically register components under Button, such as Button.Group */
app.use(Button);

app.config.globalProperties.$message = message;
```

## setup

```js

```

## toRefs

>toRefs保证数据有解构功能并且能

- 因为如果使用return的形式导出每一个state选项，值类型的a就失去了被proxy，2000秒后就不会变化了。所以需要使用toRefs来对每一个对象进行重新添加响应式。

```js
setup(props, context) {
    const state = reactive({
        a: "1",
    });

    setTimeout(()=>{
        state.a = 2 
    },2000)

    return {
        a:state.a
    };
}
```

```js
setup(props, context) {
    const state = reactive({
        a: "1",
    });

    setTimeout(()=>{
        state.a = 2 
    },2000)

    return {
        ...toRefs(state),
    };
}
```

## 路由变化

## 方法1watch

```js
 import { reactive, toRefs, watch } from "vue";
  import { useRoute, useRouter } from "vue-router";
const route = useRoute();

watch(
    () => route.path,
    (newVal) => {
        state.selectedKeys = [newVal];
    },
    { immediate: true }
);

```

方法2：computed





