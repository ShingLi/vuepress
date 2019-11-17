# GET 请求接受参数

```js
    const Koa = require('koa')
    const http = require('http')
    const app = new Koa

    app.use(async ctx => {
        // if (ctx.url == '/' && ctx.method == 'GET') {
        //     ctx.body = generateHtml ()
        // } else if (ctx.url == '/get') {
        //     ctx.body = ctx.query
        // }
        if (ctx.url == '/' && ctx.method == 'GET') {
            ctx.body = generateHtml ()
        } else if (ctx.url.indexOf('/get') != -1) {
            ctx.body = ctx.query
        }
    })

    function generateHtml () {
        return `
            <form action='/get'>
                姓名 <input name='uname'/>
                爱好 <input name='habit'/>
                <input type='submit' value="提交"/>
            </form>
        `
    }

    http.createServer(app.callback()).listen(4000, () => {
        console.log('[demo] servering at port 4000')
    })
```

## 错误

提交后的URL会包含参数 见注释

## 成功

![成功] ('./assets/get.png')
