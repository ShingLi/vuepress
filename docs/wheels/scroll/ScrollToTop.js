;(function () {
    let defaultOptions = Symbol()
    const utils = {
        setOpacity (element = this.element, opacity = 0) {
            if (element.style.opacity != null) {
                element.style.opacity = opacity / 100
            } else {
                element.style.filter = `alpha(opacity=${opacity})`
            }
        },
        addEvent (type, fn) {
            const w = window
            if (w.addEventListener) {
                w.addEventListener(type, fn)
            } else {
                w.attachEvent (`on${type}`, fn)
            }
        },
        scroll () {
            if (window.pageXOffset) {
                return {
                    x: window.pageXOffset,
                    y: window.pageYOffset,
                }
            } else if (document.compatMode == 'CSS1Compat') {
                return {
                    x: document.documentElement.scrollLeft,
                    y: document.documentElement.scrollTop
                }
            } else {
                return {
                    x: document.body.scrollLeft,
                    y: document.body.scrollTop
                }
            }
        },
        fadeIn () {
            
        }
    }
    class ScrollToTop {
        constructor (element, options) {
            this.element  = typeof element == 'string' ? document.querySelector(element) : element
            this.options = { ...this[defaultOptions], ...options }
            this.init ()
        }
        init () {
            this.hideElment ()
            this.bindScrollEvent ()
        }
        hideElment () {
            utils.setOpacity.apply(this)
            this.status = 'hide'
        }
        bindScrollEvent () {
            utils.addEvent ('scroll', () => {
                if (utils.scroll().y > this.options.showWhen) {
                    if (this.status == 'hide') {
                        utils.fadeIn ()
                        this.status = 'show'
                    }
                } else {
                    if (this.status == 'show') {
                        utils.fadeOut ()
                        this.status = 'hide'
                    }
                }
            })
        }
        [defaultOptions] = {
            showWhen: 300
        }
    }
    if (!self.ScrollToTop) self.ScrollToTop = ScrollToTop
}())