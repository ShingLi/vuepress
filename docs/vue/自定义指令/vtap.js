/*
 * @Description: v-tap
 * @Author: shingli
 * @LastEditors: Please set LastEditors
 * @Date: 2019-02-23 23:25:48
 * @LastEditTime: 2019-02-24 22:04:59
 */

const Tap = (function () {
    const handler = {
        touchStart (e) {
            let touches = e.touches[0]
            // es6 编程风格推荐对象最后一个加逗号 对象静态化
            const tapGather = {
                timeStamp: + new Date (),
                pageX: touches.pageX,
                pageY: touches.pageY,
            }
            Object.assign( this.tapObj, tapGather )
        },
        touchEnd (e) {
            let touches = e.changedTouches[0]
            const tapGather = {
                timeStamp: +new Date() - this.tapObj.timeStamp,
                distanceX: touches.pageX - this.tapObj.pageX,
                distanceY: touches.pageY - this.tapObj.pageY,
            }
            this.tapObj = { ...this.tapObj, ...tapGather }
            // 判断是否是tap
            if (!handler.isTap(this)) return
            // 处理指令的事件
            this.handler (e)
        },
        isTap (slef) {
            return slef.tapObj.timeStamp < 300 && slef.tapObj.pageX < 10 && slef.tapObj.pageY < 10
        },
    }
    const tap = {
        inserted (el, binding) {
            el.tapObj = {}
            el.handler = e => {
                let { value, modifiers } = binding
                if (modifiers.stop) e.stopPropagation()
                if (modifiers.prevent)  e.preventDefault()

                if (value && typeof value === 'object') {
                    let { fn, args } = value
                    args = args && Array.isArray(args) ? args.unshift(e) : [].unshift(e)
                    if (typeof fn === 'function') {
                        fn.call(this, args)
                        args.shift(e)
                    }
                }
            }
            el.addEventListener ('touchstart', handler.touchStart)
            el.addEventListener ('touchend', handler.touchEnd)
        },
        updated () {

        },
        unbind () {
            
            el.removeEventListener ('touchstart', handler.touchStart)
            el.removeEventListener ('touchend', handler.touchEnd)
            el.handler = null
        },
        install (Vue) {
            Vue.directive('tap', tap)
        },

    }
    return tap
})()

export { Tap }