# Vue 页面之间的切换动画

```html
    <template>
        <sn-title/>
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
                    if (to.meta.index !== undefined) {
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

```scss
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
