# vue3

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

## setup

```js
 import { reactive, toRefs, watch, computed } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useStore } from "vuex";
  export default {
    setup(props, context) {
      const route = useRoute();
      const store = useStore();
      //props就是父组件传递的值，
      //context.attrs context.slots context.emit 可以进行父子传值
      // 没有this

      // reactive就是Vue.observable(),为了避免命名冲突
      const state = reactive({
        // 方法2计算属性响应路由变化
        selectedKeys: computed(() => [route.path]),
        totalTime: store.getters.totalTime,
      });

      //方法1 watch响应属性变化
      // watch(
      //   () => route.path,
      //   (newVal) => {
      //     state.selectedKeys = [newVal];
      //   },
      //   { immediate: true }
      // );

      setTimeout(() => {
        state.a = "2";
      }, 2000);

      return {
        ...toRefs(state),
      };
    },
  };
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



provide和inject。

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

## 

