# **vuex**

vuex是vue提供的一个**状态管理模式。**

我们如果有异步操作，放到异步里，

state存储的是共用的数据，改变数据时组件先去调用actions,actions然后去调用mutations,通过mutations才能改变公用数据的值，我们调用actions时是dispatch方法操作action,组件去调用mutation或者action调用mutations时。

不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地**提交 (commit) mutation**。这样使得我们可以方便地跟踪每一个状态的变化

![vuex](../../.vuepress/public/assets/img/vuex-1587880140682.png)

## 开始

异步方式:

```js
export default new Vuex.Store({
  state: {
    city: '济南'
  },
  mutations: { 
    changeCity(state, city) {  //可以直接修改
      state.city = city
    }
  },
  actions: {  //异步操作
    changeCity({ commit }, city) {  //actions里第一个参数是上下文，可以解构出commit函数
        							//commit函数用于提交actions的代码city到mutations的												changeCity
      commit('changeCity', city)
    }
  },
  modules: {
  }
})

```

state展示

```
this.$store.state.city
```

state改变 

```
this.$store.dispatch('changeCity',city)  //发送到actions里
```



## vuex引入



![1585017329724](C:/Users/陈志伟/AppData/Roaming/Typora/typora-user-images/1585017329724.png)

**第一步，下载**

```
vue add vuex 自动配置
或者
npm install vuex
```

**第二步，加载，配置vuex**

src/store/index.js

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  getters:{
	douubleCity(state){
        return state.city + ' ' + state.city
    }
  }
})
```

**第三步,在main.js挂载vuex**

**main.js**

```js
import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
```

## 普通使用

```
 this.$store.commit("changeCity", city);
 this.$store.dispatch("changeCity", city);
 this.$store.state.city
 {{$store.state.city}}
 {{$store.getters.doneTodosCount}}
```

## map映射

```js
import {mapState,mapMutations} from 'vuex';
computed:{
	...mapState(['city'])
	...mapState({
        currentCity:'city'
        
    })
	...mapMutations(['changeCity'])
}
methods:{
    xx(ss){
        this.changeCity(ss)
    }
}
```

