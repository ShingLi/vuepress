# 介绍

在一般网页中，stick footer设计是常见的效果之一， 大多人都经历过。如果页面的内容不够长，页脚粘贴在视窗底部；
如果页面足够长，页脚会被内容向下推送。

## 解决

### 方法一 固定高度

一个很简单的HTML结构如下:

```html
    <header>
        <h1>header</h1>
    </header>
    <main>
        <p>主内容区域</p>
    </main>
    <footer>
        <p>这里是页脚</p>
    </footer>
```

这里不写其他的 css 样式，那么脑补一下，页脚 footer 离底部很远，这个显然不是想要的结果，那么用stylus(less/scss 都是css预编译语言) 去控制下

```stylus
    header, footer
        height: 3.6rem
    main
        min-height: calc(100vh - 7.2rem)
        box-sizing: border-box
```

这里使用css3 的 calc() 和视窗相对单位vh 就可以解决问题，是页脚粘贴在底部，但是这个有一个缺点，页脚高度固
定，不考虑文本溢出！

### 方法二 flexbox

解决这类问题，flexbox 是最完美的解决方法，当然缺点就是兼容性问题。这样的好处就是很灵活，不需要额外的计算
，首先给 body 设置为 display:flex 这样的话子元素会并排一行显示，在加上 flex-flow:column 这样就可以上下
显示了。不过还有一个问题，就是页脚没有粘贴到底部，给body 设置 min-height:100vh ,还是不行。因为高度是
随着内容撑开，我们的内容不够 那只有让main 自适应高度了

``` stylus
    body
        display: flex
        flex-flow: column
        min-height: 100vh
    main
        flex: 1
```

这样就完美了 :relaxed: :blush: