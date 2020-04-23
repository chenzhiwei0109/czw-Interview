# Vuex

## vuex是什么？

他就是一个状态池子，我们把需要的东西统一放在这个池子里，需要用到时去里面拿，大部分在没有任何关系的组件之间做数据共享。

![vuex](../../.vuepress/public/assets/img/vuex.png)

- 视图里的行为通过Dispatch触发Actions,
- Actions暴露出一个context，commit到Mutations里。
- Mutations:action里提交的
- Action:异步提交

## 存储

index.js

```

```

使用dispatch派发

login.vue

```js
  login() {
        let { username, password } = this;
        this.axios
          .post("/user/login", {
            username,
            password
          })
          .then(res => {
            // 1M ===1个月
            this.$cookie.set("userId", res.id, { expires: "1M" });
            this.$store.dispatch('saveUserName',res.username)  //派发
            this.$router.push("/index");
          });
      },
```

actions.js 通过commit触发motation,把状态传入

```js
export default {
  saveUserName(context,username){
    context.commit('saveUserName',username)
  }
}
```

mutations.js读取到state

```js
export default {
  saveUserName(state,username){
    state.username = username;
  }
}
```

获取到username

```
username: this.$store.state.username,
```

## 接口延迟:

接口读取比组件渲染慢，所以使用computed获取

