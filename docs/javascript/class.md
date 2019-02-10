# Class 的基本语法

看到了一段很有意思的代码，决定好好了解下ES6的class(类)

</br>

代码如下

``` js
    class Clock extends React.Component {
        constructor (props) {
            super(props)
            this.state = { date: new Date()}
        }
        componentDidMount () {
            this.timer = setInterVal(() => this.tick(), 1000)
        }
        componentWillUnmount () {
            clearInterval(this.timer)
        }
        tick () {
            this.setState({
                date: new Date()
            })
        }
        render () {
            return (
                <div>
                    <h1>hello Vue</h1>
                    <h2>现在的时间 {this.state.data.toLocaleTimeString()}</h2>
                </div>
            )
        }
        ReactDOM.render(
            <Clock />,
            document.getElementById('app')
        )
    }
```

上面代码引用 -[React](https://reactjs.org/) 官网的解释

```js
    1. 当<Clock/> 被传入ReactDOM.render() 时, React 会调用Clock 组件的构造函数。
       因为Clock 要显示的是当前的时间，所以它将使用包含当前时间对象来初始化 this.state
    2. React 调用 render() ,React 从该方法返回内容中要得到的显示在屏幕上的内容，
       然后，React更新DOM 已匹配Clock 的渲染输出
    3. 当Clock 输出被插入到DOM 中时， React 调用 ComponentMount() 生命钩子函数，在该钩
       子函数中设置定时器
       // Ps => Vue 中对应的生命钩子是 mounted()
    4. 浏览器会每隔一秒调用下 tick() 方法，在该方法中通过 setState() 方法并传递一个对象
       安排UI更新，通过 setState() React得知组件 state(状态)的变化 随机调用 render()
       方法获取当前的显示内容,这次 render() 方法中的 this.state.date 的值已经发生改变
       React 对DOM进行更新
    5. 如果通过其他操作将Clock 组件从DOM中移除， React会调用 componentWillUnmount()
       生命钩子移除定时器
    // PS => Vue 中对应的生命钩子是 destroyed() Vue中改变 State 需要显性提交 mutation
    // 这里React 的语法有点类似微信小程序 this.setData({}) 小程序啊小程序 抄完VUE抄React
```

## 1.简介

JavaScript 的传统方法是通过构造函数定义并生成新对象

```js
    // ES5 原生构造函数 (见红宝书 P145)
    const person = new Object()
    const colors = new Array()
```

取得对象的原型对象

```js
    Object.getPrototypeOf() // ES6 class的继承第二章节
```

检测对象的属性存在与实例还是原型中

```js
    Object.hasOwnProperty()
```

想要准确判断属性存在与实例中还是原型，同时使用 in 操作符 和 Object.hasOwnProperty()

ES5 写法

```js
    function Person (name, gender) {
        this.name = name
        this.gender = gender
    }
    Person.prototype.toString = function () {
        return `${this.name} - ${this.gender}`
    }
    const zhen = new Person('zhen', 'lady')
```

------

->

------

ES6 写法

```js
    class Person {
        // 构造方法，类相当于实例的原型
        constructor (name, gender) {
            this.name = name
            this.gender = gender
        }
        toString () {
            return `${this.name} - ${this.gender}`
        }
    }
    new Person ('zhen', 'lady')  // 女神
```

:kissing_heart: 女神 哦！忘了我是个单身狗······· :sweat_smile:

Note 定义类的时候前面不能加上function 保留字，并且类内部不能用逗号

```js
    class Person {
      // ....
    }
    typeof Person // function
    Person  === Person.prototype.constructor  // true
```

上面的代码中，类的数据类型是函数

类的所有方法都定义在类的prototype属性上,其实prototye  是一个指针指向prototype原型对象
类的方法除了construct() 全部都在这个对象上

```js
    const methodsNames = 'getNames'
    class Person {
        constructor (name, gender) {
            this.name = name
            this.gender = gender
        }
        toString () {
            return `${this.name} - ${this.gender}`
        }
        [methodsNames] () {
            // z
        }
    }
    Person === Person.prototype.constructor // true
    Object.keys(Person.prototype) // []
```

上面的代码: 类的原型对象上的constructor 指回类本身。 ES6类 内部定义的方法是不可以被枚举的(ES5的构造函数定义在原型对象上的方法是可以被枚举的)。可以使用对象表达式

## 2.严格模式

类默认使用的是严格模式，所以不需要在类的内部使用 'use strict' 类中的代码默认是严格模式

## 3.constructor()

constructor方法是类的默认方法，通过new命令生成对象实例时自动调用该方法，一个类必须有一个constructor()
方法，如果没有显性的定义，一个空的constructor 方法会被默认添加

```js
    class Person {
        //
    }
    class Person {
        // 2019/2/10注   之前es6书中这里没有super()
        constructor (...args) {
            super(...args)
        }
    }
```

## 4.类的实例对象

生成实例对象是 new命令，如果不加 new 命令像普通函数一样调用是会报错的

```js
    class Person {
        constructor (name, gender) {
            this.name = name
            this.gender = gender
        }
    }
    Person ('icheng', 'man')
    // TypeError: Class constructor Person cannot be invoked without 'new'
    const cheng = new Person ('licheng', 'man')
    // right
```

实例的属性除非显性定义在其本身(this) 否则都是定义在原型上(Class)

```js
    class Person {
        constructor (name, gender) {
            this.name = name
            this.gender = gender
        }
        toString () {
            return `${this.name},${this.gender}`
        }
    }
    const z = new Person ('zhen', 'lady')
    z.toString() // zhen, lady
    z.hasOwnProperty('name') // true
    z.hasOwnProperty('gender) // true
    z.hasOwnProperty('toString') // false
    z.__proto__.hasOwnProperty('toString') //  true
```

上面的代码 name 和gender 是实例对象z自身的属性 而toString 是原型对象(class)的属性

## 5.Class表达式

与函数一样class也可以使用表达式的形式定义

```js
    const myClass = class Me {
        getClassName () {
            return Me.name
        }
    }
    new myClass()
```

上面的代码 使用表达式定义了一个类，这个类的名字是myClass 而不是Me(当前的类) 如果类的内部没有用到这个Me 可以省略

```js
    const MyClass = class {
        getClassName () {
            return this.name
        }
    }
    new MyClass() // MyClass
```

采用Class 表达式可以写出立即执行类的实例

```js
    const person = new class {
        constructor (gender) {
            this.gender = gender
        }
        sayGender () {
            return this.gender
        }
    } ('lady')
    person.sayGender() // lady
```

## 6.不存在变量提升

类不存在变量提升(hoist),ES5的构造函数是有变量提升的

```js
    new Person ()
    class Person {}
    // ReferenceError: Foo is not defined
```

```js
    const Person = class {}
    class cheng extends Person {}
```

## 7.私有方法和私有属性

ES6 不提供私有方法。

1.命名加以区别

```js
    class Widget {
        // 公有方法
        foo (baz) {
            this._bar(baz)
        }
        // 私有方法
        _bar (baz) {
            return this.snaf = baz
        }
    }
```

上面的代码中，_bar 方法前面的下划线，表示这是一个只限于内部使用的私有方法。但是，在类的外部，还是可以调用到
这个方法

2.将私有方法移除模块通过call()借用this

```js
    class Widget {
        foo (baz) {
            bar.call(this,baz)
        }
    }
    function bar (baz) {
        return this.snaf = baz
    }
    let z = new Widget ()
    z.foo()
```

3.Symbol 值的唯一性，将私有方法命名为一个Symbol值

## 8.this 的指向

类的方法内部如果含有this,它默认指向类的实例
<!-- 2019/2/10 注 -->
<!-- 但是静态方法中的this 指向的是类并不是实例对象 -->

## 9.super 关键字

***super 关键字当方法用是指父类的构造函数，当对象用指父类的原型对象***