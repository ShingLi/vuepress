# Promise 对象

***很遗憾之前理解的promise有点问题，从新做下笔记***

为什么会有Promise？ promise 解决了什么问题。

promise解决了5                                        回调地域，之前这里理解的也有问题，我肤浅的将缩进等理解为回调地域了。

> 回调函数

```js
    // 经典的Jquery 代码
    <button class='btn'>click me</button>
    $(".btn").click( function () {
        // 回调函数
    })
```

回调函数就是给另一个宿主函数做参数的函数，回调函数在宿主内执行，将结果但会给宿主函数(就是函数的引用作为参数传给另一个函数)