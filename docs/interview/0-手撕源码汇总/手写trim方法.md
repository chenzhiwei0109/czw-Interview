# 手写trim
```js
String.prototype._trim = function(){
	return this.replace(/^\s+/,'').replace(/\s+$/,'')
}
```

