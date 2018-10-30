# ES6.Array 的扩展

## 1.扩展运算符

扩展运算符 (spread) 是三个点(...) 将一个数组转为用逗号分隔的参数序列

```js
    console.log(...[1, 2, 3]) // 1,2,3
    console.log(1, 2, ...[3, 4, 5]) // 1,2,3,4,5
```

这个运算符主要用于函数函数的调用

```js
    function push(array, ...items) {
        array.push(items)
    }
    function add (x, y) {
        return x + y
    }
    const items = [4, 6]
    add (...items) // 10
```

### 1.1 代替函数的 apply() 方法

```js
    // ES5
    function f (x, y, z) {
        return x + y + z
    }
    const args = [1, 2, 3]
    f.apply(null, args) // 6

    // ES6
    function f (x, y, z) {
        return x + y +z
    }
    f(...args) // 6

```

上面的代码 第一种写法是借用apply() 方法的 参数可以是arguments 而第二种写法直接采用数组的扩展运算符

还可以用求数组元素中 最大值

```js
    const arr = [15, 30, 80]
    Math.max(...arr) // 80
    const arr = ['100', 99, 1]
    Math.max(...arr) // 100
```

将数组添加到数组的尾部

```js
    // ES5
    const arr1 = [1, 2, 3]
    const arr2 = [3, 4, 5]
    Array.prototype.push.apply(arr1, arr2)
    // ES6
    arr1.push(...arr2)
```

上面的代码第一种方法是 arr1调用数组的原型对象上的push 方法，然后借用 apply
方法将 arr2 数组变成一个 参数序列，因为push 方法是不能接受数组 || 方法二直接使用扩展运算符

------

### 扩展运算符的应用

#### 1. 复制数组

***数组是引用类型的数据，所以直接复制数组只是复制数组的指针并不是真正的副本***

```js
    const arr1 = [1]
    const arr2 = arr1
    arrr2.push(2)
    arr1 // 1,2
    arr2 // 1.2
```

```js
    // ES5
    const arr1 = [1]
    const arr2 = arr1.concat()
    arr2.push(2)
    arr1 // 1
    arr2 // 1,2
```

其实不仅仅可以用concat() 也可以使用slice() 方法 只要返回一个新的数组

```js
    // es6
    const arr1 = [1,2]
    const arr2 = [...arr1]
    arr2.push(3)
    arr2 // [1,2,3]
    arr1 // [1,2]
```

上面的代码是用es6 的扩展运算符复制的数组

#### 2. 合并数组

***ES5 合并数组使用的是concat () 方法 而es6合并数组直接在数组中使用扩展运算符***

```js
    const arr1 = [1, 2, 3]
    const arr2 = [4, 5, 6]
    const arr3 = [7]

    // es5
    arr1.concat(arr2,arr3)
    // es6  
    [...arr1, ...arr2, ...arr3]
````

不过这2种 方法在都是浅拷贝 在数组成员是对象的时候。 修改原数组的成员会反映到新数组

#### 3. 和解构赋值结合

***扩展运算符可以和解构赋值一起使用，用来生成新的数组***

```js
    [a, ...reset] = list

    const [first, ...reset] = [1, 2, 3, 4, 5]
    first // 1
    reset // [ 2, 3, ,4 ,5 ] 新的数组

    const [first, ...reset] = []
    first // undefined
    reset // []

    const [first, ...reset] = ['f']
    first // 'f'
    reset // []
```

***如果扩展运算符用于数组赋值 如第一个列子只能放到参数最后一位，否则会报错***

#### 4.字符串

***扩展运算符可以将字符串转为真正的数组***

```js
    const arr = [...'love']
    arr // ['l', 'o', 'v', 'e']
    arr.length // 4
    [...arr].length // 4

```

上面es6 这种写法有一个好处，那就是可以正确识别字符串的长度！ES6标准入门这本书上这样描述
这种写法的好处 ***Javascript 会将4个字节的unicodez字符，识别为2个字符，而使用扩展运算符则可以避免这种情况*** 防止一些莫名其妙的Bug 还是建议和书上的写法一致。

#### 5.实现迭代器 (Iterator) 接口的对象

任何Iterator 接口对象都可用扩展运算费转为真正的数组(PS:前面的字符串意味着也部署Iteratorj接口)

```js
    const nodelist = document.querySelectorAll('div')
    let array = [...node]
    array.push()
```

上面的代码 nodelist 是一个类数组对象 。类数组对象是不能使用数组原型上的
方法的。但是nodelist 部署了Iterator 可以使用扩展运算符转成正在的数组
(PS:上面的nodelist 也可以使用Array.from() 方法将类数组对象转成真正的数组)

```js
    const arryLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        '3': 'd',
        length: 4
    }
    let array = [...arrayLike] // // TypeError: Cannot spread non-iterable object.
```

上面的代码使我们自定义的 类数组对象，因为没有部署 Iterator 接口所以无法使用扩张运算符，
但是可以用提到的 Array.from() 方法将其转为真正的数组。 ***类数组对象，简单的说就是有length 的json 对象***

#### 6. Map 和 Set结构 ,Generator

扩张运算符内部调用的是数据结构的 Iterator 接口，Map结构

```js
    let map = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three']
    ])
    console.log(map)
```

## 9.数组实例的 flat()

</br>

注意:这里有很严重的兼容性问题 我在测试的时候当时用的360(极速浏览器 内核是chrome 63) 和谷歌(chrome 67)都扑街了，
后来查了下MDN 这里谷歌浏览器version 要69 69 69！
IE 和 safari 都不行。（不行的升级浏览器，否则会flat 函数无定义）当前测试环境 chrome 69

</br>

数组成员有时候还是一个数组，Array.prototype.flat() 用于将嵌套的的数组'拉平'，变成一维数组。该方法返回一个新的数组，不影响原数组！

```js
    [1, 2, 3, [4, 5]].flat()  // [1, 2, 3, 4, 5]
```

上面代码中，原数组的成员里面有一个数组，flat()方法将字数组的成员取出来，添加到原来的位置。
</br>

flat() 方法默认只会'拉平'一层(其实我理解就是扁平化)。flat() 方法接受一个参数，该参数可以指定扁平化几层数组，默认值是 1，第一个列子就是默认值1 的情况。</br>
来看下第二个例子
</br>

```js
    [1, 2, 3, [4, [5, 6]]].flat() // [1, 2, 3, 4, [5, 6]]

    [1, 2, 3, [4, [5, 6]]].flat(2) // [1, 2, 3, 4, 5, 6]
```

上面这段代码中,flat() 的参数是2，表示要扁平化两层数组。

</br>

如果无论嵌套多少层，都要变成一维数组的话，可以用Infinity关键字作为参数，
如果原数组里面有空位 那么flat() 方法直接跳过空位

</br>

## 数组实例的 flatMap()

</br>

flatMap() 方法会对数组成员的每一项执行一个函数(相当于Array.prototype.map),然后对返回值组成的数组执行flat()方法,该方法返回一个新的数组不影响原数组。注意： flatMap() 方法只能展开一层

</br>

下面一个列子

```js
    [1,2,3].flatMap(item => [item,item*2] ) // (6) [1, 2, 2, 4, 3, 6]
```

flatMap() 方法只能展开一层数组

```js
    [1, 2, 3, 4].flatMap(item => {
        return [[item*2]] // [[2], [4], [6], [8]]
    })
```

上面这段代码中，flatMap()的执行流程是这样的 先执行数组的map() 方法在执行flat() 方法
所以第一步应该是这样的: [[[2]],  [[4]], [[6]], [[6]]] 然后执行flat() 方法, [[[2]],  [[4]], [[6]], [[6]]].flat()
因为这个方法只能默认张开一层数组 即得到: [[2], [4], [6], [8]]
