# 画中画

一直在B站看视频，觉得有一个功能比较好，就是滚动视窗的时候，视频不在当前视口内，视频会以小窗口播放。
之前这个功能最早我个人是在YouTube上看到的，后来B站也有了，不过现在这个功能浏览器也原生支持了

## Note

这个功能有兼容性问题，移动端需要`安卓系统8.0 + chrome 才可以`，我用6.0测试不支持， PC上 `chrome 70以上默认支持` 苹果有自己的一套API

### API

#### pictureInPictureEnabled (document属性)

```js
    // 当前浏览器是否支持
    document.pictureInPictureEnabled
    // 支持返回 true 不支持返回false
```

### pictureInPictureElement (document属性)

```js
    document.pictureInPictureElement
    // 返回当前页面中处于画中画模式的video 元素
```

### exitPictureInPicture() (方法，document上的)

```js
    document.exitPictureInPicture ()
    // 退出当前画中画模式
```

### requestPictureInPicture() (dom元素的方法)

```js
    <video
        controls
        src='../example.mp4'
        id= 'btn'
    >
        您的浏览器不支持video 标签，请升级浏览器
    </video>

    btn.hidden = !document.pictureInPictureEnabled
    btn.addEventListener('click', async () => {
        const pipWindow = await requestPictureInPicture()
    })
```

### enterpictureinpicture 和 leavepictureinpicture (dom元素的事件)

```js
    btn.addEventListener('enterpicinpicture', function (pipWindow) {
        // 进入了画中画模式，可以拿到 pipWindow 对象
    })
    btn.addEventListener('leavepictureinpicture', function() {
        // 退出了画中画模式
    })
```
