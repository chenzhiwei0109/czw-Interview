# es9

## for await of

遍历异步操作

```js
functon Gen (time){
  return new Promise((resolve,reject)=>{
    setTimeout(function(){
      resolve(time)
    },time)
  })
}


async function test(){
  let arr = [Gen(2000),Gen(1000),Gen(3000)];
  for(let item of arr){
    console.log(Date.now(),await item.then(console.log))  //异步没有结果前for of被暂停
  }
}
//2000
//12321313123122
//100
//13213123123123
//3000
//123123213123124
```

解决方法：

```js

async function test(){
  let arr = [Gen(2000),Gen(1000),Gen(3000)];
  for await(let item of arr){
    console.log(Date.now(), item)  //异步没有结果前for of被暂停
  }
}
```

### 迭代器

```js
const obj = {
  count:0,
  Gen(time){
    return new Promise((resolve,reject){
                       setTimeout(function()=>{
      resolve()
    },time)
  })
}
}
```

## Promise.finally

node连接数据库时，

- 数据库能正常连接：resolve
- 数据库不能正常连接:reject,不能往下读取。
- 但是都是需要关闭连接，所以很难兜底操作

```js
new Promise((res,rej)=>{
  var a = Math.random()*1000
  setTimeout(function(){
    if(a<500){
      reject(a)
    }else{
      resolve(a)
    }
  },a)
}).then(res=>..).catch(err=>..).finally(()=>{...})
```

- 这样不需要把两套相同的逻辑写在then和catch里。
- 比如弹窗逻辑，成功失败都要弹窗

## Object的rest和spread方法

rest取出参数对象的所有可遍历属性，拷贝到当前对象之中。

```js
const input = {
  a：1，
  b:2
}
const output = {
  c:3
}
//如何？
```

```js
实现了浅拷贝。
const output = {
	...input,
  c:3
}
```

```js
let foo = { ...['a', 'b', 'c'] };
```

一个数据放到不同对象

```js
const input = {
  a:1,
  b:2,
  c:3,
  d:4
}
const {a,b,...rest} = input'
a=1;
b=2;
rest={c:3,d:4}

```



