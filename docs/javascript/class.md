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

## 简介

JavaScript 的传统方法是通过构造函数定义并生成新对象

```js
    // ES5 原生构造函数 (见红宝书 P145)
    const person = new Object()
    const colors = new Array()
```

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

ES6 写法

```js
    class Person {
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

Note 定义类的时候前面不能加上function 保留字

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

## 严格模式

类默认使用的是严格模式，所以不需要在类的内部使用 'use strict' 类中的代码默认是严格模式

## constructor()

constructor方法是类的默认方法，通过new命令生成对象实例时自动调用该方法，一个类必须有一个constructor()
方法，如果没有显性的定义，一个空的constructor 方法会被默认添加

```js
    class Person {
        //
    }
    class Person {
        constructor () {}
    }
```

## 类的实例对象