# vue-cli 模板相关配置

- [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)

安装 
```js
    npm install --save-dev webpack-bundle-analyzer
```

使用 
```js
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    module.exports = [
        plugin: [
            new BundleAnalyzerPlugin()
        ] 
    ]
```
支持一些选项
```js
    new BundleAnalyzerPlugin(options?: object) 
```

### Vue-cli 中使用

1.先安装 同上npm
----------

2.目录
----------
```
    
    ├── build      # webpack配置编译配置
        ├── webpack.prod.conf.js # 在这个目录
```

其实vue-cli 早就帮我们把代码写好了
```js
    if (config.build.bundleAnalyzerReport) {
          const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
          webpackConfig.plugins.push(new BundleAnalyzerPlugin())
    }
```
上面代码我自己做了一些配置

```js
    if (config.build.bundleAnalyzerReport) {
          const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
          webpackConfig.plugins.push(new BundleAnalyzerPlugin(
                {
                    analyzerMode: 'server',
                    analyzerHost: '127.0.0.1',
                    analyzerPort: 8888,
                    reportFilename: 'report.html',
                    defaultSizes: 'parsed',
                    openAnalyzer: true,
                    generateStatsFile: false,
                    statsFilename: 'stats.json',
                    statsOptions: null,
                    logLevel: 'info'
                }
          ))
    }
```

运行

```js
    npm run build --report
```

总结：webpack-bundle-analyzer这个插件还是很有用的，对后期的代码优化什么的，最重要的是它够装逼~ :smirk: