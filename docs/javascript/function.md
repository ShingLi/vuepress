# 函数的扩展

## 1.函数参数的默认值

</br>

### 1.1 基本用法

ES6 之前，不能直接为函数指定默认值，只能采用变通的方法。

```js
    function log (x, y) {
        y = y || 'world'
        console.log(x, y)
    }
    log('hello') // hello world
    log('hello', '珍') // hello 珍
    log('hello', '') // hello world
```

上面代码函数log() 的形参 y 如果没有赋值，则使用指定的默认值。但是这种写法缺点在于，如果参数y 赋值了,
但是赋值类型是布尔值 false， 则该赋值不起作用。 如 空字符

为了避免这个问题，通常需要判断下参数y是否有被赋值，没有在等于默认值

```js
    function log (x, y) {
        if (y === undefined) y = 'world'
        console.log(x, y)
    }
```

ES6 允许为函数添加默认值，即直接写在参数定义后面

```js
    function log (x, y='world') {
        console.log(x, y)
    }
    log('hello') // hello world
    log('hello', '珍') // hello 珍
    log('hello', '') // hello
```

构造函数的例子

```js
    function Point (x = 0, y = 0) {
        this.x = x
        this.y = y
    }
    const p = new Point() // { x: 0, y: 0 }
```

参数变量是默认声明的，因此不能用let 或者const 再次声明(因为形参就是局部变量，let不允许在相同作用域内，重复声明同一个变量。)

```js
    function zhen (x = 5) {
        let x = 6 // error
    }
```

使用参数默认值时，不能有同名参数

```js
    function zhen (x, x, y = '珍') {
        // error
    }
```

### 1.2 与解构赋值默认值结合使用

参数默认值可以与任何解构赋值的默认值结合起来使用

```js
    function foo ({x, y = 5}) {
        console.log(x, y)
    }
    foo() // TypeError: Cannot destructure property 'x' of undefined of 'null'
    foo ({}) // undefined 5
    foo({x: 1}) // 1 5
```

上面这段代码，{x, y = 5} 这个是对象解构的默认值 因此是从对象里面解构出来的 只有当foo的参数是一个对象时，变量x 和 y 才会通过解构赋值生成
，如果函数foo 没有提供参数，变量x 和 y 就不会生成，从而报错。
默认值生效的条件是对象的属性严格等于undefined

</br>

下面是一个和数组解构使用的例子

```js
    function add ([x, y]) {
        return x + y
    }
    add() // TypeError
    add([3,4]) // 7
```

上面的代码中，函数add() 的形参表面上是一个数组，但在传入参数的那一刻，数组参数就被结构成变量x,y。 对于函数内部来说，它们能感受到的参数就
是x, y

上面例子变化下

```js
    function add ([x, y] = []) {
        return x +y
    }
    add() // NAN
    add([1, 2]) // 3
```

上面的代码中，add() 调用函数并不会报错，因为函数的参数有默认值 默认值是[] 。接着解构，数组解构是按照对应的位置对变量进行赋值，解构不成功
变量值就等于undefined，所以 x = y = undefined  undefined + undefined = NaN (not a number)。第二次调用 函数默认值失效，接着解构 
x = 1, y = 2。 1 + 2 = 3

</br>

#### 笔记

undefined 表示’缺少值‘，此处应该有一个值，但是没有定义。典型用法是：

```
    1.变量被声明，但没有赋值 let a  // a undefined

    2.调用函数时，应该提供的参数没有提供，该参数等于undefined 
    
    3.对象没有赋值的属性，该属性的值为undefined
    
    4.函数没有返回值时，默认的返回值是undefined
```
null 表示’没有对象‘，即此处不应该有值

```js
    1.作为函数的参数,表示该函数的参数不是对象
    2.作为对象原型链的终点
```

### 1.3 参数默认值的位置

通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了那些参数。如果非尾参数设置默认值，实际上这个参数是
不能省略的。

```js
    // 例1 
    function cz (x = 1, y) {
        console.log(x, y)
    }
    cz() // 1 undefined 
    cz(2,3) // 2 3
    cz(,1) // 报错 
    cz(undefined, 2) // 1 2
```

上面的代码，有默认值的参数都不是尾参数，这时，无法只省略该参数而不省略其后的参数,除非显性的输入undefined，
因为传入undefined 会触发函数的默认值，null 则没有这个效果

### 1.4 函数的length属性

length 是函数对象的一个属性值，指该函数有多少个必须要传入的参数。即形参的个数。形参的数量不包括
剩余参数个数，仅包括第一个具有默认值之前的参数个数
</br>
与之相比的是，arguments.length 书函数被调用时实际传参的个数

```js
    function f (x, y, z) {}
    f.length // 3
    function f (x, y, z=1) {}
    f.length // 2
    function f (x=1, y, z) {}
    f.length // 0
```

### 1.5 作用域

