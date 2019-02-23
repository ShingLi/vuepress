# 数组去重

## 公共部分

```js
    var arr = [1, '2', false, Symbol(), undefined, null, '2', '1', 1]
```

## 兼容性最好 双循环

```js
    // 内层循环是与外层循环值对比，没有就说明添加有就进行下次循环
    const unique = arr => {
        const ret = []
        for (var i = 0, len = arr.length; i < len; i++) {
            for (var j = 0, retLen = ret.length; j < retLen; j++) {
                if (arr[i] === ret[j]) {
                    break
                }
            }
            if (j === retLen) {
                ret.push(arr[i])
            }
        }
        return ret
    }
```

## 数组API

```js
    // indexOf() || includes() 判断数组是否含有当前值，有就不操作没有就添加进去
    const unique = arr => {
        var ret = []
        for (var i = 0, len = arr.length; i < len; i++) {
            !ret.includes(arr[i]) ? ret.push(arr[i]) : ''
        }
        return ret
    }
    //filter 简化循环
```

## 排序后去重

```js
    // 数组排序 想同的值在一起比较前后值是否相等
    // 这里有个问题就是数组元素不能含有Symbol() 类型的值 否则会报错 说Symbol() 不能转为字符串，可是奇怪的是Symbol()
    // 是可以转成字符串的只是不能转数字 而sort内部确实将数组元素toString() 变成字符串的
    const unique = arr => {
        let ret = [],
            sorted = arr.concat().sort()
            seen;
        for (var i = 0, len = sorted.length; i < len; i++) {
            if (!i || seen !== arr[i]) {
                ret.push(arr[i])
            }
            seen = arr[i]
        }
        return ret
    }
```