<!--
 * @Description: 路由动态传参总结
 * @Author: shingli
 * @Date: 2019-08-18 22:03:10
 * @LastEditTime: 2019-08-18 22:24:21
 * @LastEditors: Please set LastEditors
 -->
> react-router 路由动态传参学习

`NavLink` 组件必须要在Router 组件内部

组件在被渲染的时候`Props`里面会有3个属性，分别是 `match, location, history`

### match

    + params
    + url
    + path
    + isExact

> Vue 中路由参数从当前路由中取，即 Router.currentRoute, 组件内部通过 this.$route 访问