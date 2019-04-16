<!--
 * @Description: 数组扁平化的模拟
 * @Author: shingli
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-16 22:42:19
 * @LastEditTime: 2019-04-16 23:35:26
 -->

# 数组扁平化模拟实现

```js
    var a = ['1',2, [true, undefined, [null, Symbol()]]]
```

## 原生API

```js
    a.flat() // 不改变原来的数据 接受一个参数 即需要扁平化的层数 默认是1
```

## 模拟实现

```js
    // 实现扁平化
    Array.prototype._flat = function () {
        var ret = []
        this.forEach((item) => {
            if (Array.isArray(item)) {
                ret = ret.concat(item._flat())
            } else ret.push(item)
        })
        return ret
    }
    // 实现层数扁平化
    Array.prototype._flat = function (n = 1) {
        if (Number(n) <= 0) return this
        var ret = []
        this.forEach((item) => {
            if (Array.isArray(item)) {
                ret = ret.concat(item._flat(--n))
            } else ret.push(item)
        })
        return ret
    }
    // 数组元素全是数字的扁平化 只适合全是数字的 非数字不合适
    var num = [1,2,[3,4,[5,6,[7]]]]
    (num + '').split(',').map( item => + item)
```