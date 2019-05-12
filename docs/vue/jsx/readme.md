# JSX

Vue中使用jsx, vue-cli (2.0) vue init webpack jsx，默认是安装了jsx的插件,.babellrc文件默认会配置好，
唯一做的就是更改webpack的配置，支持 jsx

```js
    {
        test: '/\.(js|jsx)$/',
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
    }
```