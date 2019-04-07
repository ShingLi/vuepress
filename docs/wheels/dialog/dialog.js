;(function () {
    let root  = (typeof self === 'object' && self.self === self && self)
                || (typeof global === 'object' && global.global === global && global) || this

    const utils = {
        extend (target) {
            var i = 1, length = arguments.length, k ;
            for (; i < length; i++) {
                let currentValue = arguments[i]
                for (k in currentValue) {
                    if (currentValue.hasOwnProperty(k) && currentValue[k] != '') {
                        target[k] = currentValue[k]
                    }
                }
            }
            return target
        },
        isObject (obj) {
            if (Object.prototype.toString.call(obj) != '[object Object]') {
                throw new TypeError('要传入对象啊')
            } else return true
        },
        addEvent (element, type, f) {
            if (window.addEventListener) {
                element.addEventListener(type, f)
            }
        },
        setOpacity (element, opacity = 0) {
            if (element.style.opacity != null) {
                element.style.opacity = opacity / 100
            }
        },
        fadeIn (element, opacity) {
            var timer
            utils.setOpacity(element)
            const step = () => {
                utils.setOpacity(element, opacity+=10)
                if (opacity < 60) {
                    timer = requestAnimationFrame(step)
                } else {
                    cancelAnimationFrame(timer)
                }
            }
            requestAnimationFrame(step)
        },
        fadeOut (element, opacity, callback) {
            var timer
            const step = () => {
                utils.setOpacity(element, opacity-=10)
                if (opacity > 0) {
                    timer = requestAnimationFrame(step)
                } else {
                    cancelAnimationFrame(timer)
                    callback()
                }
            }
            requestAnimationFrame(step)
        },
        setScale (element, scale) {

            if (element.style.transform != null) {
                element.style.transform = 'translate3d(-50%, -50%, 0)' + 'scale('+ scale / 100 + ')'
                console.dir(element.style.transform)
            }
        },
        scaleIn (element, scale) {
            var timer
            utils.setScale (element, scale)
            const step = () => {
                utils.setScale(element, scale+= 20)
                if (scale < 100 ) {
                    timer = requestAnimationFrame(step)
                } else {
                    cancelAnimationFrame(timer)

                }
            }
            requestAnimationFrame(step)
        },
        scaleOut (element, scale, callback) {
            var timer
            utils.setScale (element, scale)
            const step = () => {
                utils.setScale(element, scale-= 20)
                if (scale > 0 ) {
                    timer = requestAnimationFrame(step)
                } else {
                    cancelAnimationFrame(timer)
                    callback()
                }
            }
            requestAnimationFrame(step)
        }
    }
    const dialog = {
        toast (options) {
            let instance = new Dialog (options)
            console.dir(instance)
        }
    }
    class Dialog {
        constructor (options) {
            this.config = utils.isObject ? utils.extend({}, this.constructor.defaultOptions, options) : ''
            this.init (this.config)
        }
        init () {
            this.createStyle ()
            this.createElement ()
        }
        createElement () {
            var dom = this.dom = document.createElement('div'), domObj = {} ;
            dom.className = 'sn-dialog'
            domObj = {
                overlay: this.config.overlay ? `<div class='sn-dialog-overlay' style= 'z-index: ${this.config.zIndex}'></div>` : '',
                title: this.config.title ? `<h3 class= 'sn-dialog-box_title'>${this.config.title}</h3>` : '',
            }
            dom.innerHTML = `
                ${domObj.overlay}
                <div class='sn-dialog-box'>
                    ${domObj.title}
                    <div class= 'sn-dialog-box_content'>
                        ${this.config.msg}
                    </div>
                </div>
            `
            document.body.appendChild(dom)
            if (this.config.overlay) {
                this.overlay = document.querySelector('.sn-dialog-overlay')
                utils.fadeIn(this.overlay, 0)
                utils.addEvent (this.overlay, 'click', (e) => {
                    e.preventDefault()
                    utils.fadeOut(this.overlay, 60, () => {
                        this.overlay.remove()
                        utils.scaleOut(this.box, 100, () => {
                            this.box.remove()
                        })
                    })
                })
            }
            this.box = document.querySelector('.sn-dialog-box')

            utils.scaleIn(this.box, 0)
        }
        createStyle () {
            let style = document.createElement('style')
            style.textContent = `
                .sn-dialog {
                    position: relative;
                }
                .sn-dialog-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 100%;
                    background-color: #000;
                    opacity:.6;
                }

                .sn-dialog-box {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    width: 80%;
                    max-width: 60vw;
                    text-align: center;
                    overflow: hidden;
                    border-radius: 4px;
                    background: #fff;
                    z-index: 10000;
                }
                .sn-dialog-box_title{

                }
                .sn-dialog-box_content {

                }
                .fadeIn {
                    opacity: 0;
                }
            `
            document.head.appendChild(style)
        }
    }
    Dialog.defaultOptions = {
        title: '',
        msg: '',
        overlay: false,
        zIndex: 9999

    }
    // debugger
    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = dialog
        }
        exports.dialog = dialog
    } else {
        root.dialog = dialog
    }
}())
