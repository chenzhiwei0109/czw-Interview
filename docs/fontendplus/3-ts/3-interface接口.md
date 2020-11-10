# interface接口

接口可以帮我们定义对象类型

`interface`又称为鸭子类型`Duck Typing `，关注对象如何被使用而不是对象本身。只要会游泳，会叫的都属于鸭子类型。

```typescript
interface Person {
    readonly id: number;//只读
    name: string;
    age: number;
    title?: string //可选
}
```

```typescript
//定义的接口必须符合接口规范
let via: Person = {
  id: 1
  name: 'zs',
  age: 12
}
via.id =2;//错，只读属性不可赋值
```



