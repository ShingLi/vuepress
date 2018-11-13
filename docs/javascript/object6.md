# ES6.Object的扩展

## 1.属性的简洁表示法

ES6 允许直接写入变量和函数， 作为对象的属性和方法

```js
    let foo = 'lady'
    const baz = {foo}
    baz // {foo: 'lady'}
    // ==
    baz // { foo: foo }
```

上面的代码中变属性名为变量名，属性值为变量值，简洁写法的属性名总是字符串，so·····

```js
    class Person = {
        class () {}
    }
    // ===
    class Person = {
        'class': function () {} // class是字符串不是关键字
    }
```

## 2.属性名表达式

JavaScript 定义对象的属性，有二种方法

```js
    const Obj = {}
    // 方法一
    Obj.name = ''
    // 方法二
    Obj['1'+'23'] = 123
```

方法一直接用标识符作为属性名，方法二时用表达式作为属性名

如果使用字面量定义对象 es5 只能使用标识符定义属性名， es6允许定义字面量对象时使用表达式作为对象的属性名

```js
    const jane = {
        name: '',
        gender: ''
    }
    // 6
    let gender = 'gender'

    const jane = {
        [gender]: 'lady'
    }
```

```js
    let lastWord  = 'last word'
    const jane = {
        'frist word': 'cao',
        [lastWord]: 'zhen',
        name: 'cz'
    }
    jane['first word'] // cao
    jane[lastWord] // zhen (PS 这里和PDF版红宝书 85页 想吻合)
    jane.name // cz
    // 第一种不能用点 因为含有空格
```

属性名表达式和简洁表示法不能同时使用，否则会报错

***属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串`[object Object]`***

```js
    const keyA = {a: 1}
    const keyB = {a: 1}
    const Obj = {
        [keyA]: 'valueA',
        [keyB]: 'valueB'
    }
    Obj // [object Object]: 'valueB'
```

因为属性名表达式会将对象转为字符串 `Object.prototype.toString()` 得到 [object Object],后面的会将前面的覆盖，所以只有
valueB

## 3.方法的name 属性

函数的`name` 属性，返回函数名，对象方法也是函数，因此也有`name`属性

```js
    const jane = {
        sayName () {
            console.log(this.sayName.name)
        }
    }
    jane.sayName() // sayName
```

如果对象的方法使用了取值函数和存值函数，则`name` 属性不在该方法上，而是该方法的属性的描述对象的get 和set 属性上
。返回值是方法名前 + get 和 set

```js
    const jane = {
        get foo () {},
        set foo (x){}
    }
    const desc = Object.getOwnPropertyDescriptor(jane, 'foo')
    desc.get.name // 'get foo'
```

## 4.Objce.is()

ES5 比较二个值是否相等，只有两个运算符：相等运算符(`==`) 和严格相等运算符(`===`).它们都有缺点，前者会自动转换数据类型，后者
NaN 不等于自身，以及 +0 等于 -0 .

```js
    Object.is('jane', 'jane') // true
    Object.is({}, {}) // false
```

不过和 === 却刚刚相反  `+0` 不等于`-0` `NaN` 等于自身

```js
    +0 === -0 //true
    NaN === NaN // false

    Object.is(+0, -0) // false
    Object.is(NaN, NaN) // true
```

ES5的变通的方法

```js
    Object.defineProperty(Object, 'is', {
        value: function (x, y) {
            if (x === y) {
                return x !== 0 || 1 / x === 1 / y
            }
            return x !== x && y !== y
        },
        configurable: true,
        writable: true,
        enumerable: false
    })
```

## 5.Object.assign()

### 基本用法

`Object.assign`方法用于对象的合并，将源对象的所有`可枚举属性`，复制到目标对象

```js
    const target = {a: 1}
    const source1 = {a: 2}
    const source2 = {a: 3}
    Object.assign(target, source1, source2)
    target // {a:1, a:2, a:3}
```

如果目标对象与源对象有同名属性，或者多个源对象有同名属性，则后面的属性会覆盖前面的属性

如果只有一个参数，`Object.assign` 会返回一个原对象

```js
    const obj = {a: 1}
    Object.assign(obj) // {a: 1}
```

如果参数不是对象，则会先转成对象，在返回。但是 `undefined` 和 `null` 无法转为对象，如果这2个值为参数是会报错

如果非对象参数出现在源对象的位置，那么处理规则有所不同，这些参数都会转为对象，如果无法转成对象，就会跳过，
这意味着如果 `undefined` 和 `null` 不在首参数，不会报错

```js
    const Jane = { gender: 'lady' }
    Object.assign(Jane, null) // {gender: "lady"}
    Object.assign(Jane, undefined) // 同上
```

其他类型的值(number, string, boolean) 不在首参数，也不会报错，但是字符串会以数组的形式拷贝到target
中，其他的值不生效

```js
    const v1 = 'abc'
    const v2 =  true
    const v3 = 10
    Object.assign({}, v1, v2, v3) // {'0': 'a', '1': 'b', '2':'c'}
```

因为只有字符串的包装对象会产生可枚举的属性

------

#### Notice

##### 1.shallowClone

`Object.assign()` 方法实行的是shallowClone

```js
    const Jane = {
        name: 'cz',
        gender: {
            gender: 'lady'
        }
    }
    const z = Object.assign(Jane)
    Jane.gender.gender = 'man'
    z.gender.gender = 'man'
```

#### 2.同名属性的替换

```js
    const target = { a: {b:'c', d:'e'}}
    const source = { a: {b:'f'}}
    Object.assign(target, source) // {a:{b:'f'}}
```

对于这种嵌套的对象，一旦遇到同名属性， `Object.assin()` 的处理是替换而不是添加

#### 3.数组的处理

`Object.assign` 可以用来处理数组，但是会把数组当成对象。

```js
    Object.assign([1,2,3,4], ['a','b']) // ['a','b',3,4]
```

#### 4.取值函数的处理

------

### 常见用法

#### 1.为对象添加属性

```js
    class Point {
        constructor (x, y) {
            Object.assign(this,{x, y})
        }
    }
    // 将x 属性和 Y属性 添加到Point 类的对象实例
```

#### 2.为对象添加方法

```js
    Object.assign(SomeClass.prototype, {
        someMethod (arg1, arg2) {
            ...
        },
        anotherMethod (arg1, arg2) {
            ...
        }
    })
```

#### 3.克隆对象

```js
    function (origin) {
        return Object.assign({}, origin)
    }
    // 不过这种拷贝只能拷贝原始对象自身的值，它继承的值是无法拷贝的，
    //如果想保持继承连需要用 Objce.create
```

```js
    function clone (origin) {
        let originProto = Object.getPrototypeOf(origin)
        return Object.assign(Object.create(originProto), origin)
    }
```

------

## 6.super关键字

`this`关键字总是指向函数所在的当前对象，`super` 指像当前对象的原型对象

```js
    const Person = {
        foo: 'hello'
    }
    const Jane = {
        foo: 'world',
        find () {
            return super.foo
        }
    }
    Object.setPrototypeOf(Jane, Person)
    Jane.find()
```