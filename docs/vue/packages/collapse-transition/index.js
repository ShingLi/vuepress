/*
 * @Description: 基于Vue的手风琴，背景：css动画需要知道高度，但是很多情况下是不知道元素高度的
 * @Author: shingli
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-02 23:19:05
 * @LastEditTime: 2019-04-02 23:42:25
 */

const Transition = {
    beforeEnter (el) {

    },
    enter (el) {

    },
    afterEnter (el) {

    },
    beforeLeave (el) {

    },
    leave (el) {

    },
    afterLeave (el) {

    }
}
export default {
    functional: true,
    render (h, { children }) {
        const data = {
            on: Transition
        }
        return h ('transition', data, children)
    }
}
