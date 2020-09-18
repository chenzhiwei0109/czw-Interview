## vue深度监听data

```html
<script>
  const data = {
    name: 'zs',
    age: 18
  }
  observer(data)
  function observer(data) {
    if (typeof data !== 'object' || data === null) {
      return data
    }
    for (let k in data) {
      defineReactive(data, k, data[key])
    }

  }
  function defineReactive(data, key, value) {
    Object.defineProperty(data, key, {
      get() {
        //dep.addSub(Dep.target) 添加观察者
        return value
      },
      set(newVal) {
        if (newVal !== value) {
          value = newValue;
          //触发更新
          dep.notify()
        }
      }
    })
  }
</script>
```

