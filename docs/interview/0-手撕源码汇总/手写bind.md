# 手写bind
```js
Function.prototype.$bind = function () {
  //参数拆解为数组
  const args = Array.prototype.slice.call(arguements)
  //获取this 
  const t = args.shift();
  //  this就是xx.bind里的 xx
  const self = this;
  return function () {
    return self.apply(t, args)
  }
}
```

```js
Function.prototype._bind = function (...rest) {
  const obj = rest.shift();
  const that = this
  return function () {
    return that.apply(obj, rest)
  }
}
```

