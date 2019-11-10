<!--
 * @Author: shingli
 * @Date: 2019-11-07 22:45:09
 * @LastEditTime: 2019-11-10 16:32:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vuepress\docs\mogodb\install\install.md
 -->

# 安装

安装地址: `https://docs.mongodb.com/manual/administration/install-community/`
默认安装路基`C:\Program Files\MongoDB`

> 安装完成后注意事项

+ 安装目录下新建 data/db 目录
+ 命令行  `mongod` 启动数据库 （需要配置环境变量）

## 开启Mongodb 服务

```js
    mongod
```

![命令行图片] ('./assets/1.png')

服务成功的标志是在浏览器输入 `127.0.0.1:27017`
！[成功的标志] ('./assets/success.png')

服务启动成功后等待连接
