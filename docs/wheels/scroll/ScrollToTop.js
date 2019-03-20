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
        addEvent (element, type, fn) {
            const w = window
            if (w.addEventListener) {
                element.addEventListener(type, fn)
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
        fadeIn ( element = this.element, speed = this.options.fadeSpeed ) {
            let opacity = 0
            function step () {
                utils.setOpacity ( element, opacity += speed )
                if (opacity < 100) {
                    timr = requestAnimationFrame(step)
                } else cancelAnimationFrame(timr)
            }
            requestAnimationFrame(step)
        },
        fadeOut (element = this.element, speed = this.options.fadeSpeed) {
            let opacity = 100
            function step () {
                utils.setOpacity ( element, opacity -= speed )
                if (opacity > 0) {
                    timr = requestAnimationFrame(step)
                } else cancelAnimationFrame(timr)
            }
            requestAnimationFrame(step)
        },
        handle () {
            utils.addClass.call(this,'backing')
        },
        addClass (className, element = this.element) {
            
            if ('classList' in document.documentElement) {
                if (!element.classList.contains(className)) element.classList.add(className)
            } else {
                // className 解决
            }
        },
        removeClass () {
            
        }
    }
    class ScrollToTop {
        constructor ( element, options ) {
            this.element  = typeof element == 'string' ? document.querySelector( element ) : element
            this.options = { ...this[defaultOptions], ...options }
            this.init ()
        }
        init () {
            this.hideElment ()
            this.bindScrollEvent ()
            this.bindClickScrollToTop ()
        }
        hideElment () {
            utils.setOpacity.apply (this)
            this.status = 'hide'
        }
        bindScrollEvent () {
            utils.addEvent (window, 'scroll', () => {
                if (utils.scroll().y > this.options.showWhen) {
                    if (this.status == 'hide') {
                        utils.fadeIn.apply(this)
                        this.status = 'show'
                    }
                } else {
                    if (this.status == 'show') {
                        utils.fadeOut.apply (this)
                        this.status = 'hide'
                    }
                }
            })
        }
        bindClickScrollToTop () {
            utils.addEvent ( this.element, 'click', utils.handle.bind(this) )
        }
        [defaultOptions] = {
            showWhen: 300,
            fadeSpeed: 10,
            redueSpeed: 100
        }
    }
    if (!self.ScrollToTop) self.ScrollToTop = ScrollToTop
}())