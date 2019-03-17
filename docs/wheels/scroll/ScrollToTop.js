;(function (window, options) {
    var utils = {
        extend (target) {
            // shallow jQuery 源码中一个方法
            var i = 1,k,
                length = arguments.length;
            for (; i < length; i++) {
                var currentVal = arguments[i]
                for (k in currentVal) {
                    if (currentVal[k] && currentVal.hasOwnProperty(k)) {
                        target[k] = currentVal[k]
                    }
                }
            }
            return target
        },
        setOpacity (element, opacity) {
            if (element.style.opacity != null) {
                element.style.opacity = opacity / 100
            } else {
                element.style.filter = 'alpha(opacity=' + opacity + ')'
            }
        },
        addEvent (element, type, fn) {
            var w = window
            if (w.addEventListener) {
                element.addEventListener (type, fn)
            } else if (w.attachEvent) {
                element.attachEvent('on'+type, fn)
            }
        },
        scroll () {
            if (window.pageXOffset) {
                // 标准现在浏览器 ie9+
                return {
                    x: window.pageXOffset,
                    y: window.pageYOffset
                }
            } else if (document.compatMode === 'CSS1Compat') {
                return {
                    x: document.documentElement.scrollLeft,
                    y: document.documentElement.scrollTop
                }
            }
            return {
                x: document.body.scrollLeft,
                y: document.body.scrollTop
            }
        }
    }
    function ScrollToTop (element, options) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element
        this.options = utils.extend( {}, this.constructor.defaultOptions, options )
        this.init ()
    }
    ScrollToTop.defaultOptions = {
        showWhen: 300,
        fadeSpeed: 10
    }
    var proto = ScrollToTop.prototype
    proto.init = function () {
        this.hideElement ()
        this.bindScrollEvent ()
    }
    proto.hideElement = function () {
        utils.setOpacity (this.element, 0)
        this.status = 'hide'
    }
    proto.bindScrollEvent = function () {
        var slef = this
        utils.addEvent (window, 'scroll', function () {
            if (utils.scroll().y > slef.options.showWhen) {
                
            }
        })
    }
    if (!window.ScrollToTop) window.ScrollToTop = ScrollToTop 
}(window))