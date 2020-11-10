---
sidebarDepth: 2
---

# es8

## async await

- 使用同步的形式执行异步操作。

- async await返回一个promoise对象。
- async await不需要手动返回一个promise。他代替我们做了;
- await后面跟的非promise对象，等价于 await Promise.resolve(40); 
- 他是promise的语法糖。但是使用的方式更加清晰，更利于阅读。

```js
async function fn(){
  return 27
  // 相当于return Promise.resolve(27)
}
fn().then(res=>console.log(res));  // promise
```

**async await使用场景**

```js
async function firstAsync(){
	new Promise((res)=>{
		setTimeout(()=>{res('11')})
	}).then(res=>{console.log(res)})
	console.log(2)
  return 3
}
firstAsync().then(res=>console.log(res))
// 2
// 3
// 11
```

**改变一哈：**

```js
async function firstAsync(){
	await new Promise((res)=>{
		setTimeout(()=>{res('11')})
	}).then(res=>{console.log(res)})
  
	console.log(2)
  
  return 3
}
firstAsync().then(res=>console.log(res))
// 11 
// 2
// 3
```

## Object扩展

### Object.values,entries

都是不可继承的可遍历的属性

ES5 引入了`Object.keys`方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。

ES2017 [引入](https://github.com/tc39/proposal-object-values-entries)了跟`Object.keys`配套的`Object.values`和`Object.entries`，作为遍历一个对象的补充手段，供`for...of`循环使用。

```js
let list = {
	name:'czw',
	age: 20
}
Object.keys(list).filter(item=>item==='czw'); 
for(let [k,v] of Object.entries(list)){
  console.log(k,v)
}
```

`for...in` 循环将遍历对象的所有可枚举属性。它还从构造函数的原型中查找继承的非枚举属性



![1589089079473](../../.vuepress/public/assets/img/1589089079473.png)



### Object.getOwnPropertyDescriptors

让你获取对象每个属性的属性描述符。

```js
const data = {
  PortLand::'70/50',
  AA:'20/10',
  Dublin:'80/21'
}
我希望遍历名单没有AA;
Object.defineProperty(data,'AA',{
  enumerable : false,
})
console.log(Object.keys(data))
```

```js
//我想知道哪一个被限制:
Object.getOwnPropertyDescriptors(data);
Object.getOwnPropertyDescriptors(data,'AA');//找出这一项。
```

## String扩展

### padStart()，padEnd()

处理字符串两边空白,涉及到钱和日期，顺序输出保证两位等等。。。

```js
for(var i=1;i<32;i++){
  if(i<10){
    console.log('0'+i)
  }else{
    console.log(i)
  }
}
```

这样处理很麻烦，解决方法:

- 如果省略第二个参数，默认使用空格补全长度。
- `padStart()`的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串。
- 另一个用途是提示字符串格式。

```js
for(Var i=1;i<32;i++){
  console.log((i+'').padStart(2,'0'))//如果长度小于2，就会自动补0；
}
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"

```

## 函数参数的尾逗号

ES2017 [允许](https://github.com/jeffmo/es-trailing-function-commas)函数的最后一个参数有尾逗号（trailing comma）。

此前，函数定义和调用时，都不允许最后一个参数后面出现逗号。

```js
function fn(param1,param2) {
    /* ... */
}

fn(
    'foo',
    'bar'
)
```

如果像上面这样，将参数写成多行（即每个参数占据一行），以后修改代码的时候，想为函数clownsEverywhere添加第三个参数，或者调整参数的次序，就势必要在原来最后一个参数后面添加一个逗号。这对于版本管理系统来说，就会显示添加逗号的那一行也发生了变动。这看上去有点冗余，因此新的语法允许定义和调用时，尾部直接有一个逗号。

```js
function clownsEverywhere(
    param1,
    param2,
) {
    /* ... */
}

clownsEverywhere(
    'foo',
    'bar',
)
```

这样的规定也使得，函数参数与数组和对象的尾逗号规则，保持一致了。