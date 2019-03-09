# debounce存在的问题

this的问题 event对象 立即执行 返回值 取消

> 事件触发的n秒后才执行

```js
    let ele = document.querySelector('#container'), count = 0;
    const debound = function (count = 1) {
        var timer
        return function (e) {
            clearTimeout(timer)
            timer =  setTimeout(() => {
                this.innerText = count++
            },1000)
        }
    }
    ele.onmousemove  = debound()
```

复习后第一反应写的代码，但是这样总是不好，没有封装可言

```js
    let ele = document.querySelector('#container'), count = 0;

    const func = function (e) {
        this.innerText = count++
        console.log(e)
    }
    const debound = function (func, wait = 1000) {
        var timer, count = 1

        return function () {
            clearTimeout(timer)
            timer =  setTimeout(() => {
                func.apply(this, arguments)
            },wait)
        }
    }
    ele.onmousemove  = debound(func)
```

> 需求， 立即执行
