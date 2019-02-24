/*
 * @Description: v-tap
 * @Author: shingli
 * @LastEditors: Please set LastEditors
 * @Date: 2019-02-23 23:25:48
 * @LastEditTime: 2019-02-24 15:34:49
 */

const Tap = (function () {
    const handler = {
        touchStart (e) {
            let touches = e.touches[0]
            // es6 编程风格推荐对象最后一个加逗号 对象静态化
            const tapObj = {
                timeStamp: + new Date (),
                pageX: touches.pageX,
                pageY: touches.pageY,
            }
            Object.assign( this.tapObj, tapObj )
        },
        touchEnd (e) {
            let touches = e.changedTouches[0]
            const tapObj = {
                timeStamp: +new Date() - this.tapObj.timeStamp,
                distanceX: touches.pageX - this.tapObj.pageX,
                distanceY: touches.pageY - this.tapObj.pageY,
            }
            this.tapObj = { ...this.tapObj, ...tapObj }
            // 判断是否是tap
            if (!handler.isTap(this)) return
            // 处理指令的事件
            this.handler ()
        },
        isTap (slef) {
            return slef.tapObj.timeStamp < 300 && slef.tapObj.pageX < 10 && slef.tapObj.pageY < 10
        },
    }
    const tap = {
        inserted (el, binding) {
            el.tapObj = {}
            el.handler = () => {
                let { value, modifiers } = binding
                
            }
            el.addEventListener ('touchstart', handler.touchStart)
            el.addEventListener ('touchend', handler.touchEnd)
        },
        updated () {

        },
        unbind () {
            
            el.removeEventListener ('touchstart', handler.touchStart)
            el.removeEventListener ('touchend', handler.touchEnd)
        },
        install (Vue) {
            Vue.directive('tap', tap)
        },

    }
    return tap
})()

export { Tap }