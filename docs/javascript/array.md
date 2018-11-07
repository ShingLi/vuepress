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
    [].push.apply(arr1, arr2)
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
但是可以用提到的 Array.from() 方法将其转为真正的数组。 ***类数组对象，本质就是有length 属性的对象***

#### 6. Map 和 Set结构 ,Generator

扩张运算符内部调用的是数据结构的 Iterator 接口，Map结构

```js
    let map = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three']
    ])
    console.log(map)
    //  暂时不理解Map 和Set 结构
```

## 2.Array.from()

Array.form 方法可以将2类对象转为真正的数组: 类似数组的对象(Array-like Object) 和可遍历的对象(Iterator) 包括ES6 的Map和Set

```js
    const ArrayLike = {
        '0': 'one',
        '1': 'two',
        '2': 'three',
        '3': 'four',
        length: 4
    }
    // 转为真正的数组
    // es5
    Array.prototype.slice.call(ArrayLike)

    [].slice.call(ArrayLike)
    [].concat.call(ArrayLike)
    // es6
    Array.from(ArrayLike)
```

上面的代码ES5有3种写法，但是后面2种是前面代码的缩写。劫持数组原型上方法clone
出一个数组的副本

之前的那个扩展运算符也可以将对象转为数组不过只能将部署了Iterator 接口的对象
转为数组 比如字符串 map set

```js
    let arr = Array.from({length:3})
    arr // [undefined, undefined, undefined]
```

Array.form() 还接受第二个参数，作用类似于数组的 map()，用来对每个元素进行处理，然后将返回值
放入返回的数组中

```js
    Array.from(ArrayLike).map(x => x * x )
    Array.from(ArrayLike, x => x * x)
```

## 3.Array.of()

***将一组值转为数组***

```js
    Array.of() // []
    Array.of(3) // [3]
    Array.of(1, 2, 3) // [1, 2, 3]
    Array.of(3).length // 1
    // es5
    Array() // []
    Array(3) // [, , ,]
    Array(1, 2, 3) // [1, 2, 3]
    Array(3).length // 3
```

Array() 构造函数在一个参数的时候行为表现不一致，一个是一个数组一个参数一个是指定数组的长度

可以用下面的方法代替

```js
    function ArrayOf () {
        return [].slice.call(arguments)
    }
```

可以用下面的代码模拟实现

```js
    function ArrayOf () {
        return [].slice.call(arguments)
    }
```

## 4.数组实例的 copyWithin()

## 5.数组实例的 find() 和findIndex()

数组实例的find()，用于找出第一个符合条件的数组成员，它的参数是一个回调函数,所有的成员依次执行该函数
直到找到第一个返回值为true 的成员，找不到返回undefined

```js
    [1, 2, 3, 4, 5].find(n => n > 4)
    // 5
```

数组实例的findindex() 返回第一个符合条件的数组成员的位置

## 6.数组实例的 fill()

## 7.数组实例的 entries(), keys(), values()

上面的三个方法都是对数组进行遍历的, entries() 是对键值对的遍历，keys() 是对数组键名的遍历，values() 是对键值的遍历，
他们都返回一个遍历器对象 (Iterator)

## 8.数组实例的includes()

`Array.prototype.includes` 返回一个布尔值，表示某一个数组是否包含给定的值

这个方法接受2个参数，第一个参数是包含的值，第二个参数表示搜索起始位置，默认是0，如果第二个参数是负数表示倒数的位置，如果它的
绝对值大于数组的长度，从会重置为0

```js
    [1,3,4,5].includes(4) // true
    [1,2,3,4].includes(4,-5) // true
```

```js
    Array.indexOf(el) !== -1
```

indexOf() 有二个缺点，第一个是不够语义化，第二个是 NAN === NAN ? false

```js
    [NaN].indexOf(NaN) // -1
    [NaN].includes(NaN) // true
```

```js
    const containes = !() => {
        Array.prototype.includes ? (arr, value) => arr.includes(value)
                                 : (arr, value) => arr.some(el => el === value)
    }()
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
