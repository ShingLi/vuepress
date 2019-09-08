<!--
 * @Description: Jsx
 * @Author: shingli
 * @Date: 2019-06-06 23:28:04
 * @LastEditTime: 2019-09-08 09:25:55
 * @LastEditors: Please set LastEditors
 -->
# Jsx

>Vue中使用jsx

vue-cli (2.0) vue init webpack jsx，默认是安装了jsx的插件,.babellrc文件默认会配置好，
唯一做的就是更改webpack的配置，支持 jsx

```js
    {
        test: '/\.(js|jsx)$/',
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
    }
```

.babelrc 中需要如下配置

```js
    "plugins": ['transform-vue-jsx']
```

</br>

<!-- ------ -->

> vuecli3.0 不需要配置，默认是支持