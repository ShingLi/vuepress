# bind

> 创建一个新函数，在调用时设置```this```关键字为提供的值。并在调用新函数时，将给定的参数列表作为原函数的参数序列的前若干项。

```js
    var module = {
        val: 1
    }
    var f = function (name, age) {
        console.log(this.val)
        console.log(name)
        console.log(age)
        return '返回值'
    }
    bound_f = f.bind(module, 'kevin')
    console.log(bound_f(18))
```

## 模拟实现

+ 返回一个函数，调用的时候设置```this```关键字为提供的值

```js
    Function.prototype.bind2 = function (context) {
        var self = this
        return function () {
            return self.apply(context)
        }
    }
    console.log(f.bind2(module)())
```

+ 调用新函数将给定的参数列表作为原函数参数序列的前若干项

```js
    Function.prototype.bind2 = function (context) {
        var self = this
        var args = [].slice.call(arguments, 1)
        return function () {
            var _args = [].slice.call(arguments)
            return self.apply(context, args.concat(_args))
        }
    }
    console.log(f.bind2(module, 'jane')(18))
```