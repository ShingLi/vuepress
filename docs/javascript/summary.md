# 总结

每个总结后面都有一段故事~~(就是自己菜)

## document(文档)

### # location

+ https://www.baidu.com // 例子
+ location.protocol // 协议 'https:'
+ location.host // 主域名 "www.baidu.com"

## 正则

### # match

+ 类型: String
+ 返回值: Null | Array
+ 示例

    ```js
        const Ex = 'http://www.shinglove.com'
        let ret_1 = Ex.match('shinglove')
        let ret_2 = Ex.match(/http:/)
        let ret_3 = Ex.match(/http:/g)

        // 共同点：ret_1 ret_2 ret_3 都是返回数组
        // 异同点：ret_1 ret_2 返回的数组里面还有3个属性
            // group, index, input
                // group
                // index 第一次匹配到的索引
                // input 对原字符串也就是 ret_* 引用
            // ret_3 具有g 表示的是全局检索 没有上面的3个属性 返回的是一个匹配的数据
                // ret_3  ['http:']
    ```

+ 使用场景: 可以判断域名不同引入不同的js 加载

## 运算符优先级

### # + ?

+ 示例

    ```js
        const Example = () => {
            let status = 'next show',
                istrue: true;
            return (
                <div> { status + istrue ? 'X': 'O' } </div>
            )
        }

        // 实际渲染出来只有 X 并不是想象的那样
            // 为什么 ？
                // + 运算符的优先级是高于 ? 的
                // 所以 ‘next show’ + true 返回值是 'next showtrue'
                // js 有6中情况下会是false
                    // false '' 0 null undefined NaN
    ```

+ 发生场景: React 官网的demo

### #Array

+ forEach

forEach 是没有办法中途退出的

+ 解决

    ```js
        $.each(object[, callback])
    ```

### clientLeft

元素的左边框宽度，以像素表示，如果有左边的垂直滚动条，则该属性包括滚动条的宽度 `offsetLeft = border + 滚动条的宽度（如果有）`

### JS的异步加载

背景：大前天柴林给我了一段js，让我异步加载看下为什么找不到一个变量，然后我把js用
setTimeout() 包裹起来了，他当时看到反问了一句，你这个是异步加载？当时我有点懵逼，记录下提醒自己

+ 同步加载

    ```js
        <script src='path/example.js'></script>

        // 默认情况下 浏览器是同步加载js 的，即遇到js就去下载，下载完就解析，这样的话渲染
        //  引擎就会停止渲染，，脚本体积过大会导致页面卡死，这样就会被产品YY了啊，所以一般
        // 来说把js 放到body的最后面，这只不过是hack 不完全是

    ```

+ 异步加载

    ```js
        <script src='path/example.js' defer></script>
        <script src='path/example.js' async></script>

        // 上面2个属性开启js 的异步加载，渲染引擎读取到会下载但是会直接跳过它，直接渲染
        //     后面的代码，区别是
        //                      async  是h5的， 是加载完就执行，执行无顺序，谁先加载就先执行
        //                      defer  非h5  渲染完执行(渲染是指DO渲染完) 执行有顺序
    ```
