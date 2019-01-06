# new

构造函数和普通函数的区别就是调用不同，构造函数是通过```new```调用 普通函数是直接方法名调用

```js
    function Otaku (name, age) {
        this.name = name
        this.age  = age
        this.habit = 'LOL Games'
    }
    Otaku.prototype.sayName = function () {
        console.log("I am" + this.name)
    }
    let person = new Otaku ('夏龙浩', 18)
    person.name // 夏龙浩
    person.age  // 18
    person.habit = 'LOL Games'
    person.sayName() // 夏龙浩
```

```new```操作符做 4件事

+ 创建一个对象
+ 将构造函数的作用域指向新的对象(将函数内部的this指向新的对象)
+ 调用构造函数
+ 返回新的对象

额，最近看了冴羽大佬的 JavaScript 深入之new的实现，也来cv下代码，哈哈哈 :smile:

其实就是上面4步

```js
    function createObject () {
        var obj = {}
        Constructor = [].shift.call(arguments)
        var F = function () {}
            F.prototype = Constructor.prototype
        obj = new F()
        var ret = Constructor.apply(obj, arguments)
        // 判断构造函数是否返回对象并且判断对象是不是为null
        // 返回this对象
        return typeof ret === 'object' ? ret || obj : obj
    }
    createObject(Otaku, "曹珍", 18)
```
