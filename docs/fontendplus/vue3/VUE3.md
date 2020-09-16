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





