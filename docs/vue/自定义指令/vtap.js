/*
 * @Description: v-tap
 * @Author: shingli
 * @LastEditors: Please set LastEditors
 * @Date: 2019-02-23 23:25:48
 * @LastEditTime: 2019-02-26 22:11:25
 */

const Tap = (function () {
    const handler = {
        touchStart (e) {
            handler.modifiersAction.call(this, e, Symbol.for('start'))
            
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
            handler.modifiersAction.call(this, e, Symbol.for('end'))
            // 处理指令的事件
            this.handler (e)
        },
        isTap (slef) {
            return slef.tapObj.timeStamp < 300 && Math.abs(slef.tapObj.pageX) < 10 && Math.abs(slef.tapObj.pageY) < 10
        },
        modifiersAction (e, sign) {
            const status = {
                start: Symbol.for('start'),
                end: Symbol.for('end')
            }
            switch (sign) {
                case status.start:
                    if (this.modifiers.stop) e.stopPropagation ()
                    if (this.prevent) e.preventDefault ()
                break
                case status.end:
                    if (this.modifiers.fastClick) {
                        // 防抖
                        if (!this.fastClick || this.fastClick + 1000 <= +new Date()) this.fastClick = + new Date()
                        else return false
                    }
                    // 点击颜色变化
                break
            }
        },
        getBackgroundColor (dom) {
            let declaration = window.getComputedStyle(dom), bgcolor;
            while (dom.tagName.toLowerCase() !== 'html') {
                if (declaration.backgroundColor !== 'rgba(0,0,0,0)' && declaration.backgroundColor !== 'transparent') {
                    bgcolor = declaration.backgroundColor
                    break
                }
                dom = dom.parentElement
            }
            return bgcolor
        },
        subColor () {},
    }
    const tap = {
        inserted (el, { value, modifiers }) {
            el.tapObj = {}
            el.modifiers = modifiers
            el.handler = e => {

                if (value && typeof value === 'object') {
                    let { fn, args } = value
                    args && Array.isArray(args) ? args.unshift(e) : (args = [],args.unshift(e))
                    if (typeof fn === 'function') fn(args)
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