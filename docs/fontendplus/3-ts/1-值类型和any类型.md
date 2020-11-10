# 值类型和any类型

```typescript
let isShow:boolean= false
isShow = 'a'//这里会报错，因为isShow是布尔类型
```

```typescript
let age:number=10
let u:undefined = undefined;
let num:number = undefined;//undefined类型的变量可以赋值其他类型
let n:null = null

// any：任意类型
let anyVal:any =4;
anyVal = 'str'
//可以被允许调用任意方法!!!
// 避免使用any,这个类型比js害NB
anyVal.name = 'a'

```

