/*
 * @Description: 图片懒加载
 * @Author: shingli
 * @Date: 2019-06-15 16:03:52
 * @LastEditTime: 2019-06-16 10:17:36
 * @LastEditors: Please set LastEditors
 */

;(function () {
    var root = (typeof self == 'object' && self.self == self && self) || (typeof global == 'object' && global.global && global) || this || {}
    
    var util = {
        extend: function (target) {
            for (var i = 1, len = arguments.length; i < len; i++) {
                var current= arguments[i]
                for (var k in current) {
                    if (current.hasOwnProperty(k) && current[k] != 'undefined' && current[k] != null)
                }
            }
            return target
        }
    }

    function Lazy (opts) {
        this.opts = util.extend({}, this.constructor.defaultOpts, opts)
        this.init ()
    }

    Lazy.versition = '1.0'
    
    Lazy.defaultOpts = {
        delay: 250,
        useDebounce: false
    }

    var proto = Lazy.prototype
    
    proto.init = function () {
        this.calculateView ()
        // this.bindScrollEvent ()
    }

    proto.calculateView = function () {
        console.log(this.opts)
        this.view = {
            top: 0 - (parseInt(this.opts.top, 10) || 0)
            
        }
    }
    
    root.Lazy = Lazy
    
})();