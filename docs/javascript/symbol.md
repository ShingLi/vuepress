# Symbol

## 概述
ES5对象的属性名都是字符串，很容易造成属性名的冲突。但是symbol是独一无二，这点可以从根本上解决属性名冲突的问题

es6引入了新的原始数据类型```Symbol```,表示独一无二的值。它是JavaScript语言的第七种数据类型，前六种：

```undefined```,```null```,```string```,```number```,```boolean```,```Object```

Symbol值通过Symbol 函数生成，这就是说，对象的属性名现在有两种类型，一种是原来的字符串，另一种是新增的Symbol
类型。

```js
    let s = Symbol()
    typeof s // 'symbol'
```

***Symbol***是一个原始类型的值，不能用```new```操作符，但是Map可以。也就是说Symbol的值不是对象
不能添加属性。基本上它类似与字符串的数据类型类似

```symbol``` 函数可以接受一个字符串作为参数，表示对Symbol实例的描述，主要是为了在控制台显示，或者转为字符串比较容易区分。

```js
    let s = Symbol ('foo')
    let ss = Symbol('bar')
    s.toString() // 'Symbol(foo)'
```

```Symbol```可以接受一个对象作为参数，但是最终调用的是这对象的toString(),将其转为字符串然后才生成一个Symbol值

```Symbol```是不可以直接与其它类型的值进行运算，否则会报错

```js
    let sym = Symbol('my Symbol')
    'my girlfriend' + sym // 报错
```

但是Symbol 值可以显式转为字符串

```js
    Strig(sym)
    sym.toString()
    Boolean(sym)
    // 但是不能转为数值
```

## 作为属性名的Symbol

由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符

```js
    let name = Symbol()
    let person = {
        [name]: 'zhen'
    }
    person[name] = 'cao'
    Object.defineProperty(person, name , {
       value: 'cheng'
    })
```

作为属性名的时候不能用 . 运算符 因为.的东西都是字符串 (PHP中 . 可以链接字符串)

## 消除魔术字符串