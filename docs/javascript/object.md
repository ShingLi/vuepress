# 面向对象的程序设计

## 构造函数模式

</br>

ECMAScript 中的构造函数可用来创建特定类型的对象, 像 Object 和 Array 这样的原生构造函数，在运行时会自动出现
在执行环境栈。 此外，也可以创建自定义的构造函数

```js
    function Person (name, gender) {
        this.name = name
        this.gender = gender
        this.sayName = function () {
            alert(this.name)
        }
    }
    const person1 = new Person ('z', 'lady')
    const person2 = new Person ('cheng', 'man')
```

上面代码直接将属性和方法赋值给了this 对象，并且这里函数名Person 首字母需要大写已区别 ECMAScript
的其他函数，并且分别保存了一个 Person 的实例，这两个对象都有一个 constructor 属性指向Person (原型对象上的constructor)

创建一个新实例 需要 new 操作符

```sh
    1. 创建一个新对象
    2. 将this 指向新的实例 （将构造函数的作用域赋给新对象）
    3. 执行构造函数中的代码 （为这个新对象添加属性和方法）
    4. 返回新对象
```

```js
    person1.constructor == Person // true
    person2.constructor == Person // true
```

检测对象类型 instanceof 操作符

```js
    person1 instanceof Person // true
    person2 instanceof Person // true
    person1 instanceof Object // true 所有对象均继承自Object
    person2 instanceof Object // true
```

### 将构造函数作为普通的函数

构造函数与其他函数的区别在于调用函数的方式不同。如果不使用new 操作符调用那么就是普通的函数

### 构造函数的问题

