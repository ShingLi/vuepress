;(function (window, options) {
    var utils = {
        extend (target) {
            // shallow
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
    }
    proto.hideElement = function () {
        utils.setOpacity (this.element, 0)
        this.status = 'hide'
    }
    if (!window.ScrollToTop) window.ScrollToTop = ScrollToTop 
}(window))