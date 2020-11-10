# class

## JS类

```js
/*
- 类:定义了一切事物
- OOP:封装 继承 多态 多态:对同一方法不同的响应. 比如toString
 */



class Animal {
  readonly name: string;
  constructor(name) {
    this.name = name
  }
  run() {
    return `${this.name} is running`
  }
}
const snake = new Animal('lily')
console.log(snake.run())

class Dog extends Animal {
  bark() {
    return `${this.name} is barking`
  }
}

const xiaobao = new Dog('xiaobao')
console.log(xiaobao.run())
console.log(xiaobao.bark())

class Cat extends Animal {
  static categories = ['mammal']
  constructor(name) {
    super(name)
    console.log(this.name)
  }
  run() {
    return 'Meow, ' + super.run()
  }
}
const maomao = new Cat('maomao')
console.log(maomao.run())
console.log(Cat.categories)

```

## TS类

```js
/* TS的类
Public:修饰的属性或方法是公用的
Private:  //只能在内部访问不能子类访问
Protected:修饰的属性或者方法
 */
class Animal {
  //只读 不能修改
  readonly name: string;
  constructor(name) {
    this.name = name
  }
  //只能在自己类里使用,不能子类使用
  private Animalrun() {
    return 1
  }

  //只能在子类和自己内部能访问
  protected run() {
    return `${this.name} is running`
  }
}
const snake = new Animal('lily')

//出错,只能在子类中进行访问.

console.log(snake.run())

class Dog extends Animal {
  bark() {
    return `${this.name} is barking`
  }
}

const xiaobao = new Dog('xiaobao')
console.log(xiaobao.run())
console.log(xiaobao.bark())

class Cat extends Animal {
  static categories = ['mammal']
  constructor(name) {
    super(name)
    console.log(this.name)
  }
  run() {
    return 'Meow, ' + super.run()
  }
}
const maomao = new Cat('maomao')
console.log(maomao.run())
console.log(Cat.categories)

```

