# 数组和元组

## 数组

只能是纯数字类型的子项:

```typescript
let arrOfNumbers: number[] = [1, 2, 3]
//可以执行弹出数组方法
arrOfNumbers.push('123')//报错
```

类数组

```typescript
let htmlCollection: HTMLCollection;
function test() {
  //arguments对象是类数组， arraylike
  console.log(arguments)
}
```

## 元组tuple

元组是特殊的数组，会提前指定每一项的类型，添加时只能添加指定类型。

```typescript
let user :[string,number] =['你好',1]
// push只能是这两种类型的一种
user.push('name')
user.push(true)//报错

// 元组定义时不能多加一个,少加一个
let user2 :[string,number] =['你好',1,2]
```

