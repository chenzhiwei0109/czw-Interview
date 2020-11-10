# 枚举

```typescript
/* 常量不会被改变 */
/* 但是有些取值是有范围，比如周1到周日 */
/* 
只有常量值才能进行枚举
 */

// 1.数字枚举
enum Direction {
  Up,
  Down,
  Left,
  Right
}

console.log(Direction.Up) //0 输出索引

// 2.枚举的反向映射
console.log(Direction[0]) //Up

// 3.字符串枚举
const enum Direction2 {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
const value = 'UP'
if (value === Direction2.Up) {
  console.log('go up!')
}

// 4.常量枚举 
const enum Direction3 {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
const value2 = 'UP'
if (value2 === Direction3.Up) {
  console.log('go up!')
}
```

