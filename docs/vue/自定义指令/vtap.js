/*
 * @Description: v-tap
 * @Author: shingli
 * @LastEditors: Please set LastEditors
 * @Date: 2019-02-23 23:25:48
 * @LastEditTime: 2019-02-25 22:10:03
 */

const Tap = (function () {
    const handler = {
        touchStart (e) {
            // 表单元素的disabled
            
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
            return slef.tapObj.timeStamp < 300 && Math.abs(slef.tapObj.pageX) < 10 && Math.abs(slef.tapObj.pageY) < 10
        },
    }
    const tap = {
        inserted (el, { value, modifiers }) {
            el.tapObj = {}
            el.handler = e => {
                
                if (modifiers.stop) e.stopPropagation()
                if (modifiers.prevent)  e.preventDefault()
                
                if (value && typeof value === 'object') {
                    let { fn, args } = value
                    args && Array.isArray(args) ? args.unshift(e) : (args = [],args.unshift(e))
                    if (typeof fn === 'function') {
                        fn(args)
                    }
                }
            }
            el.addEventListener ('touchstart', handler.touchStart)
            el.addEventListener ('touchend', handler.touchEnd)
        },
        updated (el, { value, modifiers }, vnode) {

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