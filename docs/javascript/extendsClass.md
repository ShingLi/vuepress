# ES6.Class 的继承

## 1. 简介

Class 通过 extends 关键字实现继承，而ES5是修改原型链实现继承

```js
    class Point {}
    class chiild extends Point {}
```

```js
    class child extends Point {
        constructor (x, y, color) {
            super (x, y) // 调用父类的 constructor (x, y)
            this.color = color
        }
        toString () {
            return this.color + '' + super.toString()
        }
    }
```

上面的代码 Super关键字表示父类的构造函数，用来新建父类的this 对象

子类必须在constructor方法内调用Super(),否则会报错，这是因为子类的this 对象必须要在父类的构造函数中完成塑造，这样才可以得到和父类同样实列属性和方法 如果不调用super() 方法，子类就得不到this对象，这也意味着this必须要在super()后才可以调用

```js
    class Point {}
    class child extends Point {
        constructor() {}
    }
    let cheng  = new child () // ReferenceError
```

如果子类没有定义 constructor() 方法，这个方法会被默认添加，也就是说不管有没有定义都有一个 constructor() 方法,
如果手动定义了就必须定义 super()方法 ，否则像上面一样报错

```js
    class Ponit {}
    class child extends Point {}
    // 上面的代码等同于是
    class child extends Point {
        constructor (...args) {
            super(...args)
        }
    }
```

***在子类的构造函数中，只有调用super 之后，才可以使用this 关键字，否则会报错，这是因为子类实例的构建是基于父类实例，只有super之后才能调用父类实例***

父类的静态方法也会被子类继承

```js
    class Point {
        static hello () {
            console.log('hello,珍')
        }
    }
    class child extends Point {}
    let cz = new child ()
    cz.hello ()
```
