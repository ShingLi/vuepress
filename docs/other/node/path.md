<!--
 * @Author: shingli
 * @Date: 2020-02-01 19:41:47
 * @LastEditTime : 2020-02-01 20:10:05
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vuepress\docs\other\node\path.md
 -->

# path

Node.js 中的[path](http://nodejs.cn/api/path.html#path_path_join_paths)模块

## path.join([...paths])

```js
    // 测试环境为win mac下应该不同
    const path = require('path')
    console.log(path.join('foo', 'bar'))
    // 返回 'foo/bar'
    console.log(path.join('baz', '..'))
    // 返回 '.' 表示当前目录
    console.log(path.join('Jane', 'Stephen', '..'))
    // 返回 'Jane'
```

### 返回值

使用平台特定的分隔符`win`和`OS`不同，将给定的`path`片段连接在一起

## path.resolve([...paths])

```js
    const path = require('path')
    console.log(path.resolve('/bar'))
    // 返回 '/bar'
    console.log(path.resolve('/bar', 'Jane'))
    // 返回 /bar/Jane
    console.log(path.resolve('..', '/Jane'))
    // 返回 /Jane
    console.log(path.resolve(''))
    // 当前工作目录/...

```
