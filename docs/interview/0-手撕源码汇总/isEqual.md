# isEqual
```js


function isEqual(obj1, obj2) {
    function isObject(obj) {
        //({}).toString.call([])
        return typeof obj === 'object'
    }
    // 如果两者有一个不是引用类型
    if (!isObject(obj1) || !isObject(obj2)) {
        // 
        return obj1 === obj2
    }
    // 如果是一个
    if (obj1 === obj2) {
        return true
    }
    // 两个都是对象或者数组
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
    if (obj1Keys.length !== obj2Keys.length) {
        return false
    }
    for (let key in obj1) {
        const res = isEqual(obj1[key], obj2[key]);
        if(!res){
            return false
        }
    }

    // 3.全相等
    return true
}
```

