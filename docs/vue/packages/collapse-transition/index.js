/*
 * @Description: collapse
 * @Author: shingli
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-02 23:19:05
 * @LastEditTime: 2019-04-14 14:54:56
 */

let transition = 'height .3s ease-in-out, paddingTop .3s ease-in-out, paddingBottom .3s ease-in-out'
const Transition = {
    
    beforeEnter (el) {
        el.style.transition = transition
        
        if (!el.dataset) el.dataset = {}

        el.dataset.paddingTop = el.style.paddingTop
        el.dataset.paddingBottom = el.style.paddingBottom
        
        el.style.height = 0
        el.style.paddingTop = 0
        el.style.paddingBottom = 0
    },

    enter (el) {
        el.dataset.overflow = el.style.overflow
        if (el.scrollHeight != 0) {
            el.style.height = el.scrollHeight + 'px'
            el.style.paddingTop = el.dataset.paddingTop
            el.style.paddingBottom = el.dataset.paddingBottom
        }
        el.style.overflow = 'hidden'
    },

    afterEnter (el) {
        el.style.transition = ''
        el.style.height = ''
        el.style.overflow = el.dataset.overflow
    },

    beforeLeave (el) {
        el.style.transition = transition
        if (!el.dataset) el.dataset = {}
        el.dataset.paddingTop = el.style.paddingTop
        el.dataset.paddingBottom = el.style.paddingBottom

        el.style.height = el.scrollHeight + 'px'
    },

    leave (el) {
        el.dataset.overflow = el.style.overflow
        if (el.scrollHeight != 0) {
            el.style.height = 0
            el.style.paddingTop = 0
            el.style.paddingBottom = 0
        }
        el.style.overflow = 'hidden'
    },
    
    afterLeave (el) {
        el.style.transition = ''
        el.style.paddingTop = el.dataset.paddingTop
        el.style.paddingBottom = el.dataset.paddingBottom
        el.style.height = ''
    }
}
export default {
    render (h) {
        const data = {
            on: Transition
        }
        return h (
            'transition',
            data,
            this.$slots.default
        )
    }
}
