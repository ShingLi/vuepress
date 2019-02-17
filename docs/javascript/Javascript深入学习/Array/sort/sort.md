# sort()

数组继承自数组原型对象上的方法, ***对数组的引用，修改原来数组，不生成副本***

## 语法

> arr.sort([compareFunction])

```js
    var arr = [1,2,3,20,40,10]
    arr.sort() // 1,10,2,20,3,40
```

因为没有指定`compareFunction` 是调用数组每一项的toString() 变成字符串比较`unicode`大小的