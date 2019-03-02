# 笔记-深浅拷贝

## 浅拷贝

> 数组(成员是基本类型的值)

```js
    // slice concat
    const example_Arr = [ '李成', 1, true, undefined, null, Symbol() ]
    const shallow_clone = example_Arr.slice()
    shallow_clone[0] = '李大锤'
    console.log(example_Arr) // [ '李成', 1, true, undefined, null, Symbol() ]
    console.log(shallow_clone) // [ '李大锤', 1, true, undefined, null, Symbol() ]
```

```js
    const exampleArr = [ { name: 'licheng' }, 'hanmeimei' ]
    const shallowClone = exampleArr.slice()
    shallowClone[0].name = 'jack'
    shallowClone[1] = 'lilei'
    console.log(exampleArr) // [ { name: 'jack' }, 'hanmeimei']
    console.log(shallowClone) // [ { name: 'jack' }, 'lilei']
```

数组成员含有对象的时候 `slice` 或 `concat` 方法clone的并不彻底，只能拷贝基本类型的值

## 深拷贝

> 数组成员是引用类型

```js
    const exampleArr = [ { name: 'licheng' }, 'hanmeimei' ]
    const shallowClone = JSON.parse(JSON.stringify(exampleArr))
    shallowClone[0].name = 'jack'
    // shallowClone[1] = 'lilei'
```

很简单粗暴的一种深拷贝，缺点成员是函数会丢失，正则等会变成空{}
