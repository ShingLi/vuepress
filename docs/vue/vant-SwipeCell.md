# Vant的坑

用vue 的一款组件库 vant时，踩了一个坑 </br>
</br>

事情是这样的！这几天在重写公司的微信公众号端，原来页面的消息删除是没有或者是点击Icon 删除，作为一个有节操的程序员当然不能让事情这样啊，
现在主流的删除都是左滑删除！
</br>
这样的功能以Vue 这样繁荣的生态圈肯定有啊，直接Google vant 找啊找，碍？找到，SwipeCell 滑动单元格
然后 CV 大法好啊，一顿操作猛如虎！刷新，ε=(´ο｀*)))唉？怎么不行？ 查下API，API 是这样的</br>

## SwipeCell API

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| left-width | 左侧滑动区域宽度 | Number | 0 |
| right-width | 左侧滑动区域宽度 | Number | 0 |
| on-close | 关闭时的回调函数 | Function | - |

### onClose 参数

|参数 | 类型 | 说明 |
| ------ | ------ | ------ |
|clickPosition | String| 关闭时的点击位置 (left right cell outside)|
instance | Object | SwipeCell | 实例

#### 代码

```vue
    <van-swipe-cell :right-width="65" :left-width="65" :on-close='onClose'>
        <span slot="left">选择</span>
        <van-cell-group>
            <van-cell title="单元格" value="内容" />
        </van-cell-group>
        <span slot="right">删除</span>
    </van-swipe-cell>
}
```

```js
    methods: {
        onClose(clickPosition, instance) {
            switch (clickPosition) {
                case 'left':
                case 'cell':
                case 'outside':
                    instance.close();
                break;
                case 'right':
                    Dialog.confirm({
                        message: '确定删除吗？'
                    }).then(() => {
                        instance.close();
                    });
                break;
            }
        }
    }
```

参数只有2个 一个是哪个位置的删除，一个是实例本身， 我们删除某一条消息 肯定需要 ID 这样唯一标识，于是尝试用 onClose(id)
方法行在用id 形参接受，发现并不可以。这里有一个知识 闭包。。。我的天 反正我是不懂。。。。
</br>

爬vant 的issues 的时候发现了这个问题其实很早就有人问了，贴出代码，因为不怎么懂闭包，哎(看了很多遍还是不懂)

``` vue
    <van-cell-swipe :right-width="65" :left-width="65" :on-close="onClose(id)">
        <span slot="left">选择</span>
        <van-cell-group>
            <van-cell title="单元格" value="内容" />
        </van-cell-group>
        <span slot="right">删除</span>
    </van-cell-swipe>
}
```

```js
    methods: {
        onClose(id) {
            return (clickPosition, instance) => {
                console.log(id);
            }
        }
    }
```

O,完美解决问题 :smile:

### Dialog 的高级使用

</br>

Dialog 是原生标签 所以文档上有2种调用方法一种是函数式调用,一种是组件式调用!

文档写的很清楚的了可以参考这里 -[vant组件](https://youzan.github.io/vant/#/zh-CN/dialog) 我踩的坑是
组件调用的形式。

组件式调用需要显式的使用

```js
    import Vue from 'vue'
    import { Dialog } from 'vant
    Vue.use(Dialog)
```

```html
    <van-dialog
        v-model="show"
        show-cancel-button
        before-close="beforeClose"
    >
        <van-field
            v-model="username"
            label="用户名"
            placeholder="请输入用户名"
        />
        <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
        />
    </van-dialog>
```

上面的代码是组件的引用，但是按照惯性来说应该需要注册组件，但是！这里不需要注册组件，我开始注册了组件会无法
正常调用! 去掉注册就好。这点我在vant 的官方issues 没有找到原因