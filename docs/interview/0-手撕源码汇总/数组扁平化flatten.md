# 数组扁平化
```js
function flatten(arr){
    while(arr.some(item=>Array.isArray(item))){
        arr = [].concat(...arr);
    }
    return arr;
}
```

```js
function arrayFlatern(arr){
    const isDeep = arr.some(item=>item instanceof Array);
    if(!isDeep){
        return arr;  //已经是平的
    }
    const res = [].concat.apply([],arr);
    return arrayFlatern(res);
}
```

