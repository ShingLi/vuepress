# ES6.Promise 对象

## Promise的含义

promise 是异步编程的一种解决方法，区别与传统的回调函数，Promise 是一个容器，里面保存着一个异步操作的结果。

### 特点

1. 状态不受外界的影响  
2. 状态发生改变就不会在变,什么时间监听都会得到这个结果

### 优点

Promise 对象可以将异步操作以同步操作的流程表达出来，避免层层嵌套，使代码更具有可读性

### 缺点

Promise 对象一旦新建就会立刻执行，无法取消Promise，如果不设置回调函数，内部的错误是不会反应到外部（容器）
,并且在完成之前始终处于pending 状态，无法确定是刚开始还是即将要完成

### 基本用法

```js
    const promise = new Promise((resolve, reject) => {
        ...some code
        if (/*异步操作成功*/) {
            resolve()
        } else {
            reject()
        }
    })
```

#### 简单的Promise例子

```js
    const timeout = ms => {
        return new Promise((resolve, reject) => {
            setTime(resolve(), ms, 'done')
        })
    }
    timeout(3000).then(val => {
        console.log(val) // 'done'
    })
```

上面的代码中 timeout 返回一个Promise 实例，表示一段时间后才会发生的结果，调用这个函数 3S后这个Promise
实例变成 resolved, 触发then() 绑定的回调函数 输出结果 done

#### 复杂的Promise例子

```js
    //Promise 实现Ajax 操作
    const getJson = function (url) {
        return new Promise(function (resolve, reject){
            let client = new XMLHttpRequest()
                client.open('GET', url)
                client.onreadystatechange = handler
                client.responseType = 'json'
                client.setRequestHeader('Accept', 'application/json')
                client.send()
            function handler () {
                if (readyState != 4) return
                if (status === 200) {
                    resolve(this.response)
                } else {
                    reject(new Error(this.statusText))
                }
            }
        })
    }

    getJson('/posts.json').then(json => {
        console.log(`Content: ${json}`)
    },err => {
        console.log(`Content: ${err}`)
    })
```