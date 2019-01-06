# 类数组对象

------

>拥有一个length属性和若干索引属性的对象

```js
    const foo = {
        0: "name",
        1: "age",
        2: "habit",
        length: 3
    }
    const arr = ['name', 'age', 'habit']
```

## 读写 (set/get)

```js
    foo[0] // name
    foo[0] = "jane"
    foo[0] // Jane  对象的本质就是关联数组
```

## 长度（length)

```js
    foo.length // 3
    arr.length // 3
```

## 枚举(enumerable)

```js
    for (var i=0,len = arr.length; i < len; i++) {
        console.log(arr[i])
    }
    for (var i=0,len = foo.length; i < len; i++) {
        console.log(foo[i])
    }
```

## 数组的方法

```js
    arr.push(3) // ["name", "age", "habit", 3]
    foo.push(3) // TypeError: foo.push is not a function
    // 因为push 是定义在数组原型对象上的方法，但是foo 是类数组对象 她的__proto__ 是Object而Object 上没有push 方法
    // 但是js 中任何函数都有2个非继承的方法 apply() 和 call()
    [].push.call(foo, 3) // {0: "name", 1: "age", 2: "habit", 3: 3, length: 4}
```

## 转为数组

归根到底一个是对象一个是数组，那把这类对象转为数组就可以了

```js
    [].slice.call(foo)
    [].splice.call(foo, 3, 1)
    [].concat.apply([], foo)
    Arrar.from(foo)
```

## arguments对象

```js
    function foo (name, age, gender) {
        console.log(arguments.length)
    }
    foo(1).length // 1 实参的长度
    foo() // 3 形参长度
```