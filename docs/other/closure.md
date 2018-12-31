# 闭包

------

+ 用外层包裹受保护的变量和操作变量的内层函数
+ 外层函数将内存函数返回到外部,用外部的变量接住保存

```js
    function outer () {
        let a = 1
        return function () {
            console.log(a++)
        }
    }
    var getNum = outer()
    getNum() //1
    getNum() //2
    getNum() //3
    getNum() //4
```

```js
    function outer () {
        let a = 1
        function inter () {
            console.log(a++)
        }
        return inter
    }
    outer()() //1
    outer()() //1
    outer()() //1
    outer()() //1
```

第一个是闭包第二个不是闭包。

闭包有2种形式，一种是将函数作为返回值，一种是将函数作为参数传递 

第一种代码

+ 首先全局执行环境栈中(ECS) 有一个全局的执行环境(EC), 全局EC对象中有一个属性outer 和 一个getNum 不过这2个属性值都是一个函数对象
+ 调用函数，函数作用域压栈 outer的AO对象中有一个属性a  还返回了一个函数 这个函数的scope 指向outer  outer 是指向 window ，window上有一个属性getNum 接住了这个内层函数
+ outer 函数调用完 函数弹出栈 但是活动对象 outer 的AO留下来了 所以a 没有被销毁