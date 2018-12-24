# css前缀的问题

昨天周日的时候测试提给了我几个Bug 单，其中有一个就是兼容的问题，
总结下：

+ 开发环境下flex布局有-webkit-box- 前缀上线就没有了
+ flex 在行内元素上不生效
+ 可以用css禁止点击等事件
+ position:sticky

------

上面的2个问题是在Ios8 下出现的,因为用的是配置好的vue-cli 初始化的项目，所以写的时候没怎么注意线上.
Baidu过后有2中解决方法，以下代码来自网上，这里记录下:

</br>

+ 注释webpack下build/prod.conf.js里面的这个(这个去掉后不会压缩CSS)，然后build/utils.js里加入 minimize: true，压缩css

```js
    /* new OptimizeCSSPlugin({
    cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }), */
```

+ 这个方法更暴力更直接那就是修改packjson 里面的 browserslist

-[browserslist](https://github.com/browserslist/browserslist#queries)

第二个问题行内元素不生效那直接来块级元素呗，不过IOS8真的坑有前缀都不生效元素必须是DIV flex:1 才可以、、

第三个问题

```css
    cursor:default;
    pointer-events: none;
```

第四个问题，这个玩意IOS 上可以完美使用效果类似与自动吸顶，但是实际的时候出现sticky 元素不动，去掉height：100%