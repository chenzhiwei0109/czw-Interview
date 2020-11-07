# axios教程

## 简介

Axios  是一个基于 promise  的 HTTP  库

> 本质是XMLHttpRequests请求即ajax请求

特性

- 从浏览器中创建 XMLHttpRequest
- 从 node.js  创建 http 请求
- 支持 Promise API 
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换 JSON  数据
- 浏览器端支持防止 CSRF (跨站请求伪造)

> 浏览器支持，支持 IE8 及以上的浏览器

## 安装

```
npm install axios --save
```

## 例子

### 发送一个GET请求

```js
//通过给定的ID来发送请求
axios.get('/user?ID=12345')
  .then(function(response){
    console.log(response);
  })
  .catch(function(err){
    console.log(err);
  });
//以上请求也可以通过这种方式来发送
axios.get('/user',{
  params:{
    ID:12345
  }
})
.then(function(response){
  console.log(response);
})
.catch(function(err){
  console.log(err);
});
```

### 发送一个post请求

```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

### 执行多个并发请求

```js
function getUserAccount() {
    return axios.get('/user/12345');
}

function getUserPermissions() {
    return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
    .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
}));
```

## 基本使用

Axios 提供了两种不同的形式来发送 HTTP 请求，一种是通过 axios() 方法，另一种是分别通过 axios 对象提供的与 HTTP 方法对应的方法来发起请求，如：  axios.get()  , axios.post() , axios.delete()

- axios.get(url)
- axios.post(url,data)
- axios.delete(url)
- axios.update(url)
- axios.put(url,data)

...等等

> axios.get()等方法在官方文档中被描述为请求方法的别名

### axios Api的使用

axios(config) 方法接收一个对象，这个对象包含了一些对请求的配置， axios 会根据这些配置来发送对应的 HTTP 请求

最基本的配置项应该包括：

- method   请求的方法（可选值： get , post 等）
- url         请求的地址 （必须项）
- data       请求发送的数据（post等请求需要）

> 默认的请求方法是get所以如果是get请求可以不设置method

```javaScript
// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});

```

请求响应的处理在 then 和 catch 回调中，请求正常会进入 then ，请求异常则会进 catch 

```javaScript
// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
}).then(res => {
    consloe.log(res)
}).catch(err => {
    console.log(err)
})
// 发送 GET 请求（默认的方法）
axios('/user/12345');

```

> 个人观点：对于Axios，只要掌握了axios() api 的使用基本就可以了 请求别名的使用

### 请求别名的使用

axios 还为每一个 HTTP 的方法提供与之对应的方法来发送对应的请求 发送get请求

```javaScript
// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345').then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.log(error);
});

复制代码
发送post请求
axios.post('/user', {
  firstName: 'Fred',
  lastName: 'Flintstone'
}).then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.log(error);
});

复制代码
```

其他的方法使用类似，略

> 注意：在使用别名方法时， url、method、data 这些属性都不必在配置中指定。

## 响应结构

通过 axios 发出的请求的响应结果中， axios 会加入一些字段，如下

```javaScript
{
  // `data` 由服务器提供的响应
  data: {},
  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,
  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',
  // `headers` 服务器响应的头
  headers: {},
   // `config` 是为请求提供的配置信息
  config: {},
 // 'request'
  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: {}
}
```

其中的 data 是后端返回的数据，一般我们也只需要关注 response 中的 data 字段就行

## 创建实例

可以使用自定义配置新建一个 axios 实例 axios.create([config])

```javaScript
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});


```

创建的实例中的 axios() api 改为了 request() api，使用方式是一样的，其他如请求别名等函数，都没有改变

以下是实例所拥有的方法

- request(config)
- get(url[, config])
- delete(url[, config])
- head(url[, config])
- options(url[, config])
- post(url[, data[, config]])
- put(url[, data[, config]])
- patch(url[, data[, config]])

axios会把这些 方法中的config 会和创建实例时指定的 config 合并到一起使用

## 请求配置

```javaScript
{
   // `url` 是用于请求的服务器 URL
  url: '/user',
  // `method` 是创建请求时使用的方法
  method: 'get', // default
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data, headers) {
    // 对 data 进行任意转换处理
    return data;
  }],
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],
  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },
   // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },
  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },
  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,
   // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default
  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },
 // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },
   // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default
  // `responseEncoding` indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default
   // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default
  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default
   // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },
  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },
   // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,
  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },
  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // default
  // `socketPath` defines a UNIX Socket to be used in node.js.
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // Only either `socketPath` or `proxy` can be specified.
  // If both are specified, `socketPath` is used.
  socketPath: null, // default
  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },
  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}

复制代码
```

## 配置默认值

axios 可以配置在每一个请求中生效的一些配置项的默认值

### 全局的默认值

可以使用 axios.defaults 来设置

```js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

### 自定义实例的默认值

也可以通过创建的自定义的对象设置默认值 instance.defaults 

```javaScript
// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: 'https://api.example.com'
});
// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

### 配置的优先顺序

在创建实例 axios.create() 时传入的配置会被 instance.defaults 中设置的同一个配置的值覆盖，在具体的请求方法中的配置会覆盖前两者

```javaScript
// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`
var instance = axios.create();
// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒
instance.defaults.timeout = 2500;
// 为已知需要花费很长时间的请求覆写超时设置
instance.get('/longRequest', {
  timeout: 5000
});

复制代码
```

## 拦截器

- axios.interceptors.request   请求拦截器
- axios.interceptors.response   响应拦截器

```javaScript
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.header["Token"] = "xxxx"
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.status === 200){
    return response.data
  } else {
    return Promise.reject(new Error('error'))
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
复制代码
```

如果想要取消拦截器，可以通过使用一个变量来接收设置拦截器时返回的实例，然后使用 eject 来取消拦截器

```javaScript
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
复制代码
```

## 错误处理

```
axios.get('/user/12345')
  .catch(function(error){
    if(error.response){
      //请求已经发出，但是服务器响应返回的状态吗不在2xx的范围内
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.header);
    }else {
      //一些错误是在设置请求的时候触发
      console.log('Error',error.message);
    }
    console.log(error.config);
  });
```

