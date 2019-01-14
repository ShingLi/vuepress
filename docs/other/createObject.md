# 创建对象的方法

## 1.工厂模式

```js
    function factory (name, age) {
        var o = new Object()
            o.name = name
            o.age  = age
            0.sayName = function () {
                console.log(this.name)
            }
        return o
    }
    // 缺点对象的原型对象都是一样的
```

## 2.构造函数模式

```js
    function Person () {
        this.name = name
        this.gender = gender
        this.sayName = function () {
            console.log(this.name)
        }
    }
    var person1 = new Person('kevin', 18)
    var person2 = new Person('kevin', 18)
    //缺点 每次实例都会创建一样函数，比如上面的sayName其实这个函数做的事是一样的，代码冗余
```

## 2.1 构造函数模式的优化

```js
    function Person () {
        this.name = name
        this.gender = gender
        this.sayName = sayName
    }
    function sayName () {
        console.log(this.name)
    }
    var person1 = new Person('kevin', 18)
    var person2 = new Person('kevin', 18)
    //缺点 封装不好
```

## 3.原型模式

## 4.组合模式

## 4.1 动态原型模式

```js
    function Person (name) {
        this.name = name 
        if (typeof this.getName !== 'function') {
            Person.prototype = {
                getName: function () {
                    console.log(this.name)
                }
            }
        }
    }
    var person1 = new Person('lilei')
    var person2 = new Person('hmm')

    // 报错 并没有该方法
    person1.getName();

    // 注释掉上面的代码，这句是可以执行的。
    person2.getName();

```