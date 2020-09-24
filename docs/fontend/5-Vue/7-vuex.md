# vuex

## 模块化

使用modules定义多个子模块利于组件复杂状态

```js
//userModule.js
export default {
    namespaced: true, // 避免命名冲突
    // ...
}

```

```js
import user from './userModule'
export default new Vuex.Store({
    modules: {
        user,
    }
})
```

```js
// router/index.js
store.state.user.isLogin
```

```html
// Login.vue
<button @click="login" v-if="!$store.state.user.isLogin">登录</button>
<script>
    this.$store.dispatch('user/login', 'admin').then(() => {
        const redirect = this.$route.query.redirect || '/'
        this.$router.push(redirect)
    }).catch(() => {
        alert('用户名或密码错误')
    })

</script>

```

```js
import { mapState } from 'vuex'
computed: {
...mapState('user', ['isLogin'])
}

```

```js
import { mapActions } from 'vuex'
methods: {
login() {
this['user/login']('admin').then(...)
},
...mapActions(['user/login', 'user/logout'])
},

```

## 插件

Vuex 的 store 接受 plugins 选项，这个选项暴露出每次 mutation 的钩子。Vuex 插件就是一个函 数，它接收 store 作为唯一参数：

```js
const myPlugin = store => {
    // 当 store 初始化后调用
}

```

注册插件

```js
const store = new Vuex.Store({
// ...
plugins: [myPlugin]
})

```

例子：持久化

```js
export default store => {
    // 初始化时从localStorage获取数据
    if(localStorage) {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            store.commit('user/login')
            store.commit('user/setUsername', user.username)
        }
    }
    // 用户状态发生变化时缓存之
    store.subscribe((mutation, state) => {
        if (mutation.type.startsWith('user/')) {
            localStorage.setItem('user', JSON.stringify(state.user))
        } else if (mutation.type === 'user/logout') {
            localStorage.removeItem('user')
        }
    })
}

```

