<!--
 * @Description: 基于vue.js 官网动画改造
 * @Author: shingli
 * @Date: 2019-06-06 23:28:04
 * @LastEditTime: 2019-09-01 14:44:13
 * @LastEditors: Please set LastEditors
 -->

# Vue 页面之间的切换动画

```html
    <template>
        <transition :name ='transitionName'>
            <router-view/>
        </transition>
    </template>
```

```js
    <script>
        export default {
            data () {
                return {
                    transitionName: ''
                }
            },
            watch: {
                $route (to, from) {
                    if (from.meta.index != undefined) {
                        if (to.meta.index > from.meta.index) {
                            this.transitionName = 'left'
                        } else {
                            this.transitionName = 'right'
                        }
                    }
                }
            }
        }
    </script>
```

```css
    .right-enter-active,
    .right-leave-active,
    .left-enter-active,
    .left-leave-active {
        will-change: transform;
        transition: all 15s;
        position: absolute;
    }
    .right-enter {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
    .right-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }
    .left-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }
    .left-leave-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
```

> 使用第三方组件例如 ant-design 或者element 组件时 类名尽量不要使用 slide-left 这些，容易冲突，2019/9/1 号踩坑，类名重复动画失效
