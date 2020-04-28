# vuerouter

## 路径问题汇总

- 普通的js引入使用@即可

  ```
  import Home from '@/views/home/Home.vue'
  ```

- 如果路径以 ~ 开头，其后的部分将会被看作模块依赖，既可以加载含有别名的静态资源，又可以加载node-modules中的资源

  ```
  <img src="~some-npm-package/foo.png">
  ```

  ```
  @import url(~@/assets/styles/reset.css);
  ```

  ```
  <img src="~[npm包名]/xxx/logo.png" alt="">
  ```

  

- 路径懒加载+js分离chunk

  ```
  component: () => import(/* webpackChunkName: "about" */ '@/views/list/List.vue')
  ```

## keep-alive

## router-link

- tag ='li'

## 动态路由

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

```js
<button @click="routerTo">click here to news page</button>
routerTo:
this.$router.push({ name: 'news', params: { userId: 123 }})
```

```js
{{this.$route.params.userId}}
```

**查询参数**

查询参数其实就是在路由地址后面带上参数和传统的url参数一致的，传递参数使用query而且必须配合path来传递参数而不能用name，目标页面接收传递的参数使用query。

注意：和name配对的是params，和path配对的是query

使用方法如下：

```js
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

## 