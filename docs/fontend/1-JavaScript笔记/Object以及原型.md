# 面向对象和原型

## 创建对象有几种方法?

```js
var a = {}
var a = new Object({})
```

```js
var A = function(){this.name = 2}
var a = new A();
```

```
var P = {name:'o3'};
var o = Object.create(P)
```

## instanceof 的原理

**instanceof** **运算符**用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

## new 运算符的原理

- 一个新的对象被创建，他继承自Fn.prototype

  let newObj = Object.create(Fn.prototype)

- 构造函数foo执行，执行时，传入相应参数，同时this被指向这个新实例。

  ​    let result = Fn.call(obj,...arg)

- 如果构造函数返回了一个对象，这个对象就取代new的结果，如果构造函数没有返回对象,new出的结果就是这个newObj;

```js
function _new(Fn,...arg){
    let obj = Object.create(Fn.prototype);
    let result = Fn.call(obj,...arg)  //call改变函数运行的上下文
    return typeof result  === 'object' ? result : obj;
}
```

## Object.create

**Object.create()**方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。

a = Object.create(b)  a.__proto__ = b

>```
>Object.create(proto[, propertiesObject])
>```

propertiesObject

可选。如果没有指定为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)，则是要添加到新创建对象的不可枚举（默认）属性（即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应[`Object.defineProperties()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)的第二个参数。

```js
// 思路：将传入的对象作为原型
function create(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}
```

```js
o = Object.create(Object.prototype, {
  // foo会成为所创建对象的数据属性  数据描述符	
  foo: { 
    writable:true,
    configurable:true,
    value: "hello" 
  },
  // bar会成为所创建对象的访问器属性  存取描述符	
  bar: {
    configurable: false,
    get: function() { return 10 },
    set: function(value) {
      console.log("Setting `o.bar` to", value);
    }
  }
});
```

## 借用构造函数继承

利用call调用父类并改变this指向

缺点：只能继承属性，无法继承父类原型链的方法

```js
function Parent(){
	this.name = 'a'
}
function Child(){
	Parent.call(this); //this指向了Child的实例。
}
var c = new Child();
```

## 借用原型链继承

子类的原型指向父类的实例化对象

缺点：父类声明的属性都被子类实例共享,如果是引用类型,会被某个实例改变

```js
function Parent(){
	this.name = 'a';
	this.age = [1,2,3]
}
Parent.prototype.say= function(){}
function Child(){
}
Child.prototype = new Parent();
Child.prototype.constructor =Child;
```

## 组合继承

>  *// 问题:无论什么情况下,都会调用父类构造函数两次*
>
>  *// 第一次:我们初始化子类原型对象时*
>
>  *// 第二次:子类构造函数内部调用父类构造函数*

```js
function Animal(name){
  this.name=name;
}
Animal.prototype.getName=function(){
  return this.name
}
function Dog(name){
  Animal.call(this,name)
}
Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;
var d1 = new Dog('xx')//第二次
d1.constructor;//constructor是
```

## 寄生组合继承

只调用一次。并且这种方式是最佳的方法

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.getName = function () {
  return this.name
}
function Dog(name) {
  Animal.call(this, name)
}
Dog.prototype = Object.create(Animal.prototype)//重写原型对象
Dog.prototype.constructor = Dog;
var d1 = new Dog('xx')//第二次
```

## 多重继承

```js
function MyClass() {
     SuperClass.call(this);
     OtherSuperClass.call(this);
}

// 继承一个类
MyClass.prototype = Object.create(SuperClass.prototype);
// 混合其它
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// 重新指定constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function() {
     // do a thing
};
```



