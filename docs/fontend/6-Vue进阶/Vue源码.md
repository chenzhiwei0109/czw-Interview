---
sidebarDepth: 2
---

# vue源码
## 数据响应式

1. `observe()`返回Observer实例    `core/observer/index.js`

2. Observer会把传入的值遍历递归
   - 如果是数组就重写原型对象的七个方法
   - 如果是对象就调用walk方法遍历每一个属性并执行defineReactive方法
3. defineReactive方法把对象的属性转换为存取描述符getter和setter。
4. Dep管理一组Watcher,Dep关联的值更新时,notify他subs里对应的一系列Watcher更新` core/observer/dep.js`

5. Watcher会监控一个表达式或者关联一个组件更新函数，数据更新就指定对应的更新函数调用。

   render函数会触发getter。多对多关系。

   `core/observer/dep.js`

```js
export function defineReactive (
obj: Object,
 key: string,
 val: any,
 customSetter?: ?Function,
 shallow?: boolean
) {
    const dep = new Dep() // 一个key一个Dep实例

    // 递归执行子对象响应化
    let childOb = !shallow && observe(val)

    // 定义当前对象getter/setter
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            // getter负责依赖收集
            if (Dep.target) {
                dep.depend()
                // 若存在子observer，则依赖也追加到子ob
                if (childOb) {
                    childOb.dep.depend()
                    if (Array.isArray(value)) {
                        dependArray(value) // 数组需特殊处理
                    }
                }
            }
            return value
        },
        set: function reactiveSetter (newVal) {
            if (newVal === value || (newVal !== newVal && value !== value)) {
                return
            }    
            val = newVal // 更新值
            childOb = !shallow && observe(newVal) // childOb更新
            dep.notify() // 通知更新
        }
    })
}
```

### 数组响应式

```js
// 数组原型
const arrayProto = Array.prototype
// 修改后的原型
export const arrayMethods = Object.create(arrayProto)
// 七个待修改方法
const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]

/**
 * 拦截这些方法，额外发送变更通知
 */
methodsToPatch.forEach(function (method) {
    // 原始数组方法
    const original = arrayProto[method]
    // 修改这些方法的descriptor
    def(arrayMethods, method, function mutator (...args) {
        // 原始操作
        const result = original.apply(this, args)
        // 获取ob实例用于发送通知
        const ob = this.__ob__
        // 三个能新增元素的方法特殊处理
        let inserted
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break
            case 'splice':
                inserted = args.slice(2)
                break
        }
        // 若有新增则做响应处理
        if (inserted) ob.observeArray(inserted)
        // 通知更新
        ob.dep.notify()
        return result
    })
})
```



