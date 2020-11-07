# ts基础入门

## 动态类型和静态类型的区别

动态类型(弱类型)语言：运行时进行数据类型检查，不需要给变量指定数据类型。js,python,ruby

静态类型语言：编译阶段进行数据类型检查,写程序必须进行类型声明.

## TypeScript安装

```
npm install -g typescript
tsc -v
```

```
tsc test.ts
```



## 静态类型

- 静态类型可以有很好的语法提示。
- 当你使用interface,定义时他可以有属性提升。
- 静态类型可以直观帮我们判断变量的属性和类型

```ts
const count:number = 2901;
//count会具备number类型的所有方法，编辑器有很好的提示
```

自定义类型interface

Point是一个自定义静态类型并且他有x和y两个属性。所有编译器会提示给我们他的属性

```ts
interface Point{
  x:number,
  y:number
}
//会有point.x的提升
const point:Point={
  x:3,
  y:4
}
```

## 基础类型和引用类型

基础类型

```ts
//基础类型null,undefined,symbol,boolean,void,
let count:number;
let cName:string ='ss';//name是一个关键字不能用
```

引用类型:对象，函数，数组，等等

```ts
//引用类型
//对象类型
const teacher:{
  name:string,
  age:number
}={
  name:'czw',
  age:18
}
//数组
const numbers:number[]=[1,2,3];


//类
class Person
const dell:Person= new Person()
//函数
const getTotal:()=>number=()=>{
  return 123
}




```

## 类型推断，类型注解

类型注解type annotation :我们告诉ts，变量是什么类型

```ts
let count:number;
count = 123;
let temp : number | string = 123;
temp = '456'
```

类型推断type inference 

我们没有告诉ts,ts会自动尝试分析变量类型

```ts
let countInference = 123
```

如果ts能够自动分析变量类型，我们就不需要做了，但是有些情况TS无法分析变量类型，我们就需要使用类型注解

```ts
const firstNumber =1; 
const secondNumber =1; 
const total = firstNumber + secondNumber;//这种时候不需要类型注解
const obj = {
  name:'czw',
  age:12
}
```

```ts
//此时应该使用类型注解
function getTotal(firstNumber,secondNumber){
  return firstNumber+secondNumber
}
const total = getTotal(1,2)
===>
function getTotal(firstNumber:number,secondNumber:number){
  return firstNumber+secondNumber
}
const total = getTotal(1,2)      
```

函数的返回值可以通过类型推断，函数的变量需要类型注解

## ts函数类型

```ts
function fn(){}
const fn1 = () =>{}

//函数类型注解 返回值要是number类型
function add(first:number,second:number):number{
  return first+second;
}
const total = add(1,2);
```

```ts
//返回值为空，如果写return,就报错
function fn1():void{
  console.log('ss')
}
```

```ts
//never:函数永远不会执行完毕
function errEmit():never{
  //throw new Error();
	//while(true)
}
```

解构语法提示类型:

```ts
function add(
	{first,second}:{first:number,second:number}
  ):number{
  return first + second
}
const total = add({first:1,second:2})
```

## 额外补充

基础类型：boolean number string void undefined symbol null

```ts
let a:number;//这种情况需要注解
a = 123;
```

引用类型: {} Class function []

```ts
//函数写法1
const func = (str:string):number =>{
  return parseInt(str,10);
}
```

```ts
//函数写法2   :(str:string)=> number的意思是函数接收一个string类型的变量，返回一个number值
const func:(str:string)=> number=(str)={//这种形式
    return parseInt(str,10);
}
```

```ts
//推断写法 通过你的返回值，ts推断出。
cunst function = (str:string){
    return parseInt(str,10); 
}
```

```ts
const date = new Date();

//JSON.parse不能判断类型
interface Person{
  name:'string'
}
const rawData = '{"name":"czw"}';
const newData:Person = JSON.parse(pawData);
```

## 类型数组和元组

数组存储特定基础类型

```ts
//必须存储number
const numberArr:number[] = [1,2,3];
const strArr:string[] = ['a','b','c'];
//自定义参数
const arr:(number | string)[] = [1,'2',3]
```

类型别名:type alias

数组存储引用类型

```ts
type User = {name:string,age:number}
//每一项必须是User类型
const objectArr:User[]={
  {name:'czw',age:23}
}
```

对象类型

```ts
class Teacher{
  name:string,
  age:number;
}
//第二项符合Teacher类型
const objectArr:Teacher[]={
  new Teacher(),
	{
    name:'czw',
    age:18
  }
}
```

### 元组tuple

元组用来约束每一项

```ts
//只能固定3项，每项类型也要固定
const teacherInfo:[string,string,number] = ['czw','aa',18]
```

csv文件对应的格式一般是

```ts
//csv转js
czw,male,11
cc,female,23
trump.male,23
==>
[
	['czw','male',11],
	['cc','female',23]
]

const teacherList :[string,string,number][] = [
  ['czw','male',11],
  ['cc','female',23],
  ['trump','male',23],
]
```

## interface接口

interface和type有区别的，能用接口表示就用interface.interface不能是基本类型

```ts
interface Person{
  name:string;
}
type Person{
	name:string
}
type Person = string
```

字面量形式传入是强校验

```ts
getA({x:1,y:2})//错
const a = {x:1,y:2};
getA(a) //对 ；这样就不是强校验，y可以传入
```

```ts
interface Person{
  name:string;
  age?:number; //age可有可无
  readonly sex:string;  //只读
  [propName:string]:any //多出其他属性时，也可以
  say():string; //方法返回string
}

//类使用接口
class User implements Person { //User类应用这个Person接口
  name = 'ss'
  say(){
    return 'sss'
  }
}
```

```ts
interface SS {
  
}
```

## 类的定义和继承

```ts
class Person {
  name = 'dell';
  getName() {
    return this.name;
  }
}
//继承
class Teacher extends Person {
  getTeacherName() {
    return 'Teacher';
  }
  getName() {
    return super.getName() + 'lee';
  }
}

const teacher = new Teacher();
console.log(teacher.getName());
console.log(teacher.getTeacherName());

```

## 类的访问器构造器

```ts

```







