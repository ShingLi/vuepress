/*
 * @Description: 增加vant
 * @Author: shingli
 * @Date: 2019-10-03 15:30:43
 * @LastEditTime: 2019-10-04 10:28:43
 * @LastEditors: shinhli
 */
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Vant from 'vant'
import 'vant/lib/index.css'

export default({
    Vue,
    options,
    router
}) => {
    Vue.use(ElementUI).use(Vant)
}
