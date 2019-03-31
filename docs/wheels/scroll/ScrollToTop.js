/*
 * @Description: 不兼容ie
 * @Author: shingli
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-17 21:54:41
 * @LastEditTime: 2019-03-31 11:04:42
 */

;(function () {
    // const defaultOptions = Symbol()
    const root = ( typeof self === 'object' && self.self === self && self) ||
               ( typeof global === 'object' && global.global === global && global) || (this)

    const utils = {
        setOpacity (element, opacity = 0) {
            if (element.style.opacity != null) {
                element.style.opacity  = opacity / 100
            } else {
                element.style.filter = `alpha(opacity = ${opacity})`
            }
        },
        addEvent (target, type, f) {
            if (window.addEventListener) {
                target.addEventListener(type, f, { capture: false, passive: false })
            } else {
                target.attachEvent(`on${type}`, f)
            }
        },
        removeEvent () {

        },
        getScrollInfo () {
            if (window.pageXOffset != null) {return {
                x: pageXOffset,
                y: pageYOffset,
            }} else if (document.compatMode == 'CSS1Compat') {
                return {
                    x: document.documentElement.scrollLeft,
                    y: document.documentElement.scrollTop
                }
            } else return ({
                x: document.body.scrollLeft,
                y: document.body.scrollTop
            })
        },
        fadeIn () {
            var opacity = 0, timer;
            utils.setOpacity(this.element)
            const step = () => {
                utils.setOpacity(this.element, opacity+= this.options.fadeSpeed)
                if (opacity < 100) {
                    timer = requestAnimationFrame(step)
                } else {
                    cancelAnimationFrame(timer)
                }
            }
            requestAnimationFrame(step)
        },
        fadeOut () {
            var opacity = 100, timer;
            utils.setOpacity(this.element, opacity)
            const step = () => {
                utils.setOpacity(this.element, opacity-= this.options.fadeSpeed)
                if (opacity > 0) {
                    timer = requestAnimationFrame(step)
                } else {
                    cancelAnimationFrame(timer)
                }
            }
            requestAnimationFrame(step)
        },
        supportTouch () {
            return 'ontouchstart' in window
        },
        indexOf (arr, className) {
            var index = -1, i = 0, length = arr.length;
            for (; i < length; i++) {
                if (arr[i] == className) {
                    index = i
                    break
                }
            }
            return index
        },
        addClass (element, className) {
            if ('classList' in element) {
                if (!element.classList.contains(className)) element.classList.add(className)
            } else {
                let arr_className = element.className.trim().split(/\s+/)
                if (utils.indexOf (arr_className, className) === -1) {
                    arr_className.push(className)
                }
                element.className = arr_className.join(' ')
            }
        },
        removeClass (element, className) {
            if ('classList' in element) {
                if (element.classList.contains(className)) element.classList.remove(className)
            } else {
                
            }
        },
        handle () {
            utils.addClass(this.element, 'backing')
            var scrollTop = utils.getScrollInfo().y, timer;
            requestAnimationFrame (f = () => {
                if (scrollTop > 0) {
                    // debugger
                    document.documentElement.scrollTop = scrollTop -= this.options.speed
                    timer = requestAnimationFrame(f)
                } else {
                    cancelAnimationFrame(timer)
                }
            })
        }
    }
    class ScrollToTop {
        constructor (element, options) {
            if (!element && element.nodeType !== 1) {
                throw new TypeError('目标元素不能为空')
            }
            this.element = typeof element === 'string' ? document.querySelector(element) : element
            this.options = { ...ScrollToTop.defaultOptions, ...options }
            this.init ()
        }
        init () {
            this.hideElement ()
            this.bindScrollEvent ()
            this.attachToTopEvent ()
        }
        hideElement () {
            utils.setOpacity (this.element)
            this.status = 'hide'
        }
        bindScrollEvent () {
            utils.addEvent (window, 'scroll', () => {
                if (utils.getScrollInfo ().y > this.options.showWhen) {
                   if (this.status == 'hide') {
                       utils.fadeIn.apply(this)
                       this.status = 'show'
                   }
                } else {
                    if (this.status == 'show') {
                        utils.fadeOut.apply(this)
                        this.status = 'hide'
                        utils.removeClass(this.element, 'backing')
                    }
                }
            }) 
        }
        attachToTopEvent () {
            if (utils.supportTouch ()) {
                let touch = {}
                utils.addEvent(this.element, 'touchstart', e => {
                    e.preventDefault ()
                    
                    Object.assign(touch, {
                        timeStamp: +new Date(),
                        pageX: e.touches[0].pageX,
                        pageY: e.touches[0].pageY,
                    })
                })
                utils.addEvent(this.element, 'touchend', e => {
                    e.preventDefault ()
                    let diffStamp = new Date().getTime() - touch.timeStamp,
                        diffPageX = e.changedTouches[0].pageX - touch.pageX,
                        diffPageY = e.changedTouches[0].pageY - touch.pageY;

                    if (diffStamp < 300 && Math.abs(diffPageX) < 10 && Math.abs(diffPageY) < 10) {
                        utils.handle.apply(this)
                    }
                })

            } else {
                utils.addEvent(this.element, 'click',  utils.handle.bind(this))
            }
        }
    }
    ScrollToTop.defaultOptions = {
        showWhen: 300,
        fadeSpeed: 5,
        speed: 200
    }
    
    if ( typeof exports != 'undefined' && !exports.nodeType) {
        if ( typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = ScrollToTop
        }
        exports.ScrollToTop = ScrollToTop
    } else {
        root.ScrollToTop = ScrollToTop
    }
}())