
# bind

几天前在看宇哥代码的时候的，发现其中有一段代码是这样的`fn.apply(this, args)`.这段代码中fn 是定义在`methods`里面的但是很奇怪的是，方法里面的`this`不是他`apply`的`this`。后来宇哥翻阅`Vue`和我说源代码里面给所有的方法bind 了一遍.重点我没懂他说的~~~~~（看不懂源代码的彩笔）

下面代码有借阅大神冴羽文章

## 正常代码

```js
    var value = 'global',
        local = {
        value: 'local'
    }
    function example () {
        console.log(this.value)
    }
    var ret = example.bind(local)
```

bind 方法会返回一个函数

## 模拟bind

```js
    // 解决   this, 参数， 返回值
    Function.prototype.bind2 = function (context) {
        context = context || window
        let { slice } = []
        let args = slice.call(arguments, 1)
        return () => {
            let bindArgs = Array.from(arguments)
            return ret = this.apply(context, [ ...args, ...bindArgs ])
        }
    }
```

this和参数很容易想到，感觉最难的部分就是构造函数了，因为根本想不到，`bind`的返回的函数也可以做构造函数用啊(想不到想不到)

```js
    Function.prototype.bind2 = function (context) {
        context = context || window
        let { slice } = []
        let slef = this
        let args = slice.call(arguments, 1)
        var f = function () {
            let bindArgs = Array.from(arguments)
            return ret = slef.apply(this instanceof f ? this : context, [ ...args, ...bindArgs ])
        }
        f.prototype = this.prototype
        return f
    }
```