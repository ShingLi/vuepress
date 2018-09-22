# 函数的扩展

## 1.函数参数的默认值

</br>

### 1.1 基本用法

ES6 之前，不能直接为函数制定默认值，只能采用变通的方法。

```js
    function log (x, y) {
        y = y || 'world'
        console.log(x, y)
    }
    log('hello') // hello world
    log('hello', '珍') // hello 珍
    log('hello', '') // hello world
```

上面代码检查函数log() 的形参 y 如果没有赋值，则使用指定的默认值。但是这种写法缺点在于，如果参数y 复制了，但是赋值类型是布尔值 false， 则该赋值不起作用。 如 空字符

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

</br>

### 1.2 与解构赋值默认值结合使用

参数默认值可以与任何解构赋值的默认值结合起来使用

```js
    function foo ({x, y = 5}) {
        console.log(x, y)
    }
    foo () // TypeError: Cannot destructure property 'x' of undefined of 'null'
    foo ({}) // undefined 5
    foo({x: 1}) // 1 5
```

上面这段代码，{x, y = 5} 这个是对象解构的默认值 因此是从对象里面解构出来的 只有当foo的参数是一个对象时，变量x 和 y 才会通过解构赋值生成，如果函数foo 没有提供参数，变量x 和 y 就不会生成，从而报错。默认值生效的条件是对象的属性严格等于undefined