# vue3

## 项目创建

```js
import { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(router).use(store).mount('#app')

```

## 路由

```js
import { RouteConfig, createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue'

const routes: Array<RouteConfig> = [
{
  path: '/',
  name: 'Home',
  component: Home
},
{
  path: '/about',
  name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

```

## vuex

```js
import Vuex from 'vuex'

export default Vuex.createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
});

```

