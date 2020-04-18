# vue路由相关面试题

## vue-router构建步骤是什么？

首先import一下Router from vue-router,

之后调用Vue.use加载他；

然后就是 定义一个 新的 Router实例，并传入routes参数配置路由参数

最后把这个router实例挂载到Vue实例的options里

## vue-router传递参数有哪些方式？

| 声明式                    | 编程式             |
| ------------------------- | ------------------ |
| `<router-link :to="...">` | `router.push(...)` |

### 编程式的导航 router.push

#### **字符串**

字符串的方式是直接将路由地址以字符串的方式来跳转，这种方式很简单但是不能传递参数：

```javascript
this.$router.push("/home");
```

#### **对象**

想要传递参数主要就是以对象的方式来写，分为两种方式：命名路由、查询参数，下面分别说明两种方式的用法和注意事项。

**命名路由**

命名路由的前提就是在注册路由的地方需要给路由命名如：

```
{
	path:'/',
	name:'HelloWorld',
	component:HelloWorld
},
{
	path:'/',
	name:'news',
	component:HelloWorld
},
```

命名路由传递参数需要使用params来传递，这里一定要注意使用params不是query。目标页面接收传递参数时使用params

> ::: danger
> 特别注意：命名路由这种方式传递的参数，如果在目标页面刷新是会出错的
> :::

使用方法如下：

```HelloWorld.js
<button @click="routerTo">click here to news page</button>
routerTo:
this.$router.push({ name: 'news', params: { userId: 123 }})
```

```news.js
{{this.$route.params.userId}}
```

**查询参数**

查询参数其实就是在路由地址后面带上参数和传统的url参数一致的，传递参数使用query而且必须配合path来传递参数而不能用name，目标页面接收传递的参数使用query。

注意：和name配对的是params，和path配对的是query

使用方法如下：

```javascript
this.$router.push({ path: '/news', query: { userId: 123 }});
```

```
this.$route.query.userId
```

### 声明式的导航\<router-link>

　　 声明式的导航和编程式的一样

#### 字符串

  ```html
<router-link to="news/:id/">click to news page</router-link>
  ```

#### 对象

**命名路由**

```
<router-link :to="{ name: 'news', params: { userId: 1111}}">page</router-link>
```

 **查询参数**

```html
<router-link :to="{ path: '/news', query: { userId: 1111}}">age</router-link>
```

## 如何解决组件复用问题？

提醒一下，当使用路由参数时，例如从 `/user/foo` 导航到 `/user/bar`，**原来的组件实例会被复用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会再被调用**。

可以简单地 watch (监测变化) `$route` 对象：

```js
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

或者使用 2.2 中引入的 `beforeRouteUpdate` [导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)：

```js
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```

## vue如何获取所有路由或者404路由？

```js
{
  // 会匹配所有路径
  path: '*'
}
{
  // 会匹配以 `/user-` 开头的任意路径
  path: '/user-*'
}
```

含有*通配符*的路由应该放在最后。路由 `{ path: '*' }` 通常用于客户端 404 错误。

使用了*History 模式*需要配置服务器

当使用一个*通配符*时，`$route.params` 内会自动添加一个名为 `pathMatch` 参数。它包含了 URL 通过*通配符*被匹配的部分：

```js
// 给出一个路由 { path: '/user-*' }
this.$router.push('/user-admin')
this.$route.params.pathMatch // 'admin'
// 给出一个路由 { path: '*' }
this.$router.push('/non-existing')
this.$route.params.pathMatch // '/non-existing'
```

## vuerouter匹配有优先级吗？

同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。

## 你知道嵌套路由吗？

```js
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

**以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。**

当你访问 `/user/foo` 时，`User` 的出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。如果你想要渲染点什么，可以提供一个 空的 子路由：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id', component: User,
      children: [
        // 当 /user/:id 匹配成功，
        // UserHome 会被渲染在 User 的 <router-view> 中
        { path: '', component: UserHome },

        // ...其他子路由
      ]
    }
  ]
})
```