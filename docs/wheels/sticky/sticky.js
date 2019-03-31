/*
 * @Description: sticky定位 兼容ie7 8 9 10 11
 * @Author: shingli
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-26 22:19:14
 * @LastEditTime: 2019-03-31 11:05:02
 */
;(function () {
    var root = ( typeof self === 'object' && self.self === self && self) ||
               ( typeof global === 'object' && global.global === global && global) || (this)

    var utils = {
        extend: function (target) {
            var i = 1, length = arguments.length,k;
            for (; i < length; i++) {
                var currentValue = arguments[i]
                for (k in currentValue) {
                    if (currentValue.hasOwnProperty(k)) {
                        target[k] = currentValue[k]
                    }
                }
            }
            return target
        },
        addEvent:function (target, type, f) {
            if (window.addEventListener) {
                target.addEventListener(type, f, { passive: false })
            } else {
                target.attachEvent('on'+ type, f)
            }
        },
        getScroll: function () {
            if (window.pageXOffset != null) {
                return {
                    x: pageXOffset,
                    y: pageYOffset
                }
            } else if (document.compatMode == 'CSS1Compat') {
                return {
                    x: document.documentElement.scrollLeft,
                    y: document.documentElement.scrollTop
                }
            } 
            return {
                x: document.body.scrollLeft,
                y: document.body.scrollTop
            }
        },
        setSticky: function () {
            this.el.style.position = 'fixed'
            this.el.style.top = 0
            this.el.style.left = this.left + 'px'
        },
        setNormal: function () {
            utils.removeProperty(this.el, 'position')
            utils.removeProperty(this.el, 'top')
            utils.removeProperty(this.el, 'left')
        },
        removeProperty: function (element, name) {
            if (element.style.removeProperty) {
                element.style.removeProperty(name)
            } else {
                element.style.removeAttribute(name)
            }
        }
    }
    function Sticky (el, options) {
        this.el = typeof el === 'string' ? document.querySelector(el) : el
        this.options = utils.extend({}, this.constructor.defaultOptions, options)
        this.init ()
    }
    Sticky.version = '1.0'
    Sticky.defaultOptions = {
        offset: 0
    }
    var proto = {
        constructor: Sticky,
        init: function () {
            this.calculateRect()
            this.bindScrollEvent ()
        },
        calculateRect: function () {
            var DOMRect = this.el.getBoundingClientRect()
            this.top = DOMRect.top  + utils.getScroll().y
            this.left = DOMRect.left + utils.getScroll().x
        },
        bindScrollEvent: function () {
            var that = this
            utils.addEvent(window, 'scroll', function () {
                if (utils.getScroll().y > that.top) {
                    utils.setSticky.apply(that)
                } else {
                    utils.setNormal.apply(that)
                }
            })
        }
    }
    Sticky.prototype = proto
    
    if ( typeof exports != 'undefined' && !exports.nodeType) {
        if ( typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = Sticky
        }
        exports.Sticky = Sticky
    } else {
        root.Sticky = Sticky
    }
}())