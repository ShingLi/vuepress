# sort()

数组继承自数组原型对象上的方法, ***对数组的引用，修改原来数组，不生成副本***

## 语法

> arr.sort([compareFunction])

```js
    var arr = [1,2,3,20,40,10]
    arr.sort() // 1,10,2,20,3,40
```

因为没有指定`compareFunction` 是调用数组每一项的toString() 变成字符串比较`unicode`大小的

***数组中的成员不能是Symbol，因为Symbol 不能隐式(implicit conversion)转换成字符串类似***

### 冒泡排序

```js
    function bubbling (arr = ['1', '4', '3', '2']) {
        for (var j = 0; j< arr.length-1 ; j++) {
            for (var i =0; i < arr.length-1-i; i++) {
                if (arr[i] > arr[i+1]) {
                    let current = arr[i]
                    arr[i] = arr[i+1]
                    arr[i+1] = current
                }
            }
        }
    }
```