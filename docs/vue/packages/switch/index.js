/*
 * @Description: switch 组件
 * @Author: shingli
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-30 16:19:36
 * @LastEditTime: 2019-03-30 16:40:21
 */
import Switch from './src/switch.vue'

Switch.install = function (Vue) {
    Vue.component(Switch.name, Switch)
}

export default Switch


