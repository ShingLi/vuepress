/*
 * @Author: shingli
 * @Date: 2020-02-08 20:07:55
 * @LastEditTime : 2020-02-08 20:37:54
 * @LastEditors  : Please set LastEditors
 * @Description: 前后端分离 前端权限控制
 * @FilePath: \vuepress\docs\vue\utils\permission.js
 */
import router from 'router'
import store from 'store'
import NProgress from 'nprogress'

const whiteName = ['login']
router.beforeEach(async (to, from, next) => {
    NProgress.start()
    // 是否登录过
    if (store.getters.token) {
        if (to.path.includes('/login')) {
            next('/')
        } else {
            // 登录过是否请求过用户角色
            try {
                if (store.getters.roles && !store.getters.roles.length) {
                    const roles  = await store.dispatch('user/getInfo')
                    const routes = await store.dispatch('permission/generateRoutes', roles)
                    router.addRoutes(routes)
                    next({ ...to, replace: true })
                } else {
                    // 登录过有权限 说明页面没有刷新
                    next()
                }
            } catch (error) {
                
            }
        }
    } else {
        // 没有登录过
        if (whiteName.includes(to.path)) {
            next()
        } else {
            next({
                path: '/login'
            })
        }
        // 是否在登录页
    }
})

router.afterEach(() => {
    NProgress.done()
})