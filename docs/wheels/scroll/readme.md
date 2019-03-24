# 返回到页面顶部

## 引入

```js
    <script src="path/ScrollToTop.js"></script>
```

或者

```js
    import ScrollToTop from 'path/ScrollToTop.js'
```

## API

```js
    new ScrollToTop (el, options)
```

### el

+ 类型：string || express

### options

+ 类型：{ Object } options
+ 默认值： showWhen: 300, fadeSpeed: 5, speed: 200(可自定义)

## 使用

```js
    new ScollToTop ('#app', {
        showWhen: 200,
        fadeSpeed: 10,
        speed: 300
    })
```
