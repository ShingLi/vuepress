/*
 * @Description: 图片懒加载
 * @Author: shingli
 * @Date: 2019-06-15 16:03:52
 * @LastEditTime: 2019-06-23 11:38:28
 * @LastEditors: Please set LastEditors
 */

;(function () {
    var root = (typeof self === 'object' && self.self === self && self) || (typeof global === 'object' && global.global === global && global) || this || {}
    
    var util = {
        extend: function (target) {
            for (var i= 1, len = arguments.length; i < len; i ++) {
                var current = arguments[i]
                for (var k in current) {
                    if (current.hasOwnProperty(k) && current[k]) {
                        target[k] = current[k]
                    } else {
                        typeof current[k] === 'boolean' ?  target[k] = current[k] : ''
                    }
                }
            }
            return current
        },
        addEvent: function (el, type, callback) {
            if (document.addEventListener) {
                el.addEventListener(type, callback)
            } else if (document.attachEvent) {
                el.attachEvent('on' + type, callback)
            }
        }
    }

    function Lazy (opts) {
        this.opts = util.extend({}, this.constructor.defaultOpts, opts)
        this.init ()
    }

    Lazy.defaultOpts = {
        delay: 250,
        useDebounce: false // 是否使用 防抖，默认是节流模式
    }
    
    var proto  = Lazy.prototype, timer
    
    proto.init = function () {
        util.addEvent(root, 'load', this.handlerEvent.bind(this))
        util.addEvent(root, 'scroll', this.handlerEvent.bind(this))

    }

    proto.handlerEvent = function () {
        if (!this.opts.useDebounce && !!timer) return
        
        clearTimeout(timer)
        var that = this
        timer = setTimeout(function () {
            timer = null
            that.render ()
        }, this.opts.delay)
    }
    
    proto.chenckInView = function (el) {
        var rect = el.getBoundingClientRect ().top
        return (rect > 0 && rect < window.innerHeight)
    }

    proto.render = function () {
        var nodes = document.querySelectorAll('[data-lazy-src]')
        
        for (var i = 0; i < nodes.length; i++) {
            if (this.chenckInView(nodes[i])) {
                var src = nodes[i].dataset.lazySrc
                nodes[i].src = src
                nodes[i].removeAttribute('data-lazy-src')
            }
        }
    }

    root.Lazy = Lazy
})()