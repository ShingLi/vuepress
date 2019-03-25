/*
 * @Description: 进度条(不完全兼容ie)
 * @Author: shingli
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-25 22:16:50
 * @LastEditTime: 2019-03-25 23:27:20
 */
;(function () {
    const root = (typeof self == 'object' && self.self == self && self)
               || (typeof global == 'object' && global.global == global && global)
               || this
    const utils = {
        addEvent (target, type, f) {
            if (window.addEventListener) {
                // 现代浏览器
                target.addEventListener(type, f, { passive: false })
            } else {
                // ie 
                target.attachEvent(`on${type}`, f)
            }
        },
        getViewPortHeight () {
            if (window.innerWidth != null) return innerHeight
            else if (document.compatMode == 'CSS1Compat') {
                return document.documentElement.clientHeight
            } return document.body.clientHeight
        }
    }
    class ProgressIndicator {
        constructor (options) {
            this.options = { ...ProgressIndicator.defaultOptions, ...options }
            this.init ()
        }
        init () {
            this.createIndicator ()
            let width = this.calculateWidth ()
            this.percentWidth (width)
            this.bindScrollEvent ()
        }
        createIndicator () {
            let dom = document.createElement('div')
            dom.style.position = 'fixed'
            dom.style.top = 0
            dom.style.left = 0
            dom.style.height = '2px'
            dom.style.backgroundColor = this.options.bgColor
            this.dom = dom
            document.body.appendChild(dom)
        }
        calculateWidth () {
            let scrollHight = Math.max(document.documentElement.scrollHeight || document.body.scrollHeight, utils.getViewPortHeight ())
            let viewportHeight = utils.getViewPortHeight ()
            let diffY = scrollHight - viewportHeight
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            // debugger
            return scrollTop / diffY
        }
        percentWidth (perc) {
            this.dom.style.width = perc * 100 + '%'
        }
        bindScrollEvent () {
            utils.addEvent(window, 'scroll', () => {
                let width = this.calculateWidth ()
                this.percentWidth (width)
            })
        }
    }
    ProgressIndicator.defaultOptions = {
        bgColor: '#0A74DA'
    }
    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType &&  exports) {
            module.exports = ProgressIndicator
        }
        exports.ProgressIndicator = ProgressIndicator
    } else {
        root.ProgressIndicator = ProgressIndicator
    }
}())