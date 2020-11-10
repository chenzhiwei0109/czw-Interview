# 泛型

## 泛型描述

```typescript
// 泛型：使用时指定类型 <Name>

function echo<T>(arg: T): T {//这个T的类型不知道
  return arg
}



const result = echo('str')


// T是一个类型 ，U是一个类型
function c<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}

const result2 = echo([1, 2, '3']) //const result2: (string | number)[]
console.log(result2)

```

## 约束泛型

```typescript
//约束泛型 只能是包含length属性的变量
function echoWithArr<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}

const arr = echoWithArr([1, 2, 3])



//使用接口约束泛型  鸭子类型 不管你是啥 只要你有Length属性就满足条件。
// <X extends Interface> 

interface Wlength {
  length: number
}
function echoWithLength<T extends Wlength>(arg: T): T {// 只要有Length属性的变量传入，就可以
  console.log(arg.length)
  return arg
}
const a = echoWithLength('str')
const b = echoWithLength(1) //错误

```

## 类和泛型

```typescript
class Queue<T> {//泛型是T
  private data = [];//私有data
  push(item: T) {//输入的是T
    return this.data.push(item)
  }
  pop(): T { //输出的是T
    return this.data.shift()
  }
}
const queue = new Queue<number>()
queue.push(1)//只有number类型才能被添加到队列
console.log(queue.pop().toFixed())




```

## 接口泛型

```typescript
interface KeyPair<T, U> {
  key: T
  value: U 
}


let kp1: KeyPair<number, string> = { key: 1, value: "string"}
let kp2: KeyPair<string, number> = { key: 'str', value: 2 }

// 数组类型
let arr: number[] = [1,2,3]
// Array接口 泛型类型
let arrTwo: Array<number> = [1,2,3]

```



