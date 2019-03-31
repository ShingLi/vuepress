/*
 * @Description: 下拉刷新
 * @Author: shingli
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-30 21:39:49
 * @LastEditTime: 2019-03-31 21:33:31
 */

;(function () {
    const root = (typeof self == 'object' && self.self == self && self) ||
            (typeof global == 'object' && global.global == global && global) || this
    const utils = {
        extends (target) {
            var i = 1, length = arguments.length, k;
            for (; i < length; i++) {
                let currentValue = arguments[i]
                for (k in currentValue) {
                    if (currentValue.hasOwnProperty(k)) {
                        target[k] = currentValue[k]
                    }
                }
            }
            return target
        },
        addEvent (element, type, f) {
            if (window.addEventListener) {
                element.addEventListener(type, f, supportPassive ? { passive: false } : false)
            }
        },
        removeEvent (element, type, f) {
            if (window.addEventListener) {
                element.removeEventListener(type, f)
            } else {
                // attachEvent
            }
        }
    }
    class PullRefresh {
        constructor (options) {
            this.options  = utils.extends({}, this.constructor.defaultOptions, options)
            this.init()
        }
        init () {
            this.createRefreshElement ()
            this.createRefreshStyle ()
            this.supportPassive ()
            this.bindEvent ()
        }
        createRefreshElement () {
            let div = this.dom = document.createElement('div')
            div.className = 'refresh-element'
            div.innerHTML = `
                <div class= 'refresh-content'>
                    <span class = 'refresh-icon'></span>
                    <p class ='refresh-text'></p>
                </div>
            `
            if (this.options.target != 'body') {
                let target = this.options.nodeType == 1 && document.querySelector(this.options.target)
                try {
                    target.parentNode.insertBefore(target, target.parentNode.firstChild)
                } catch (error) {
                    console.log(error)
                }
            } else {
                document.body.insertBefore(this.dom, document.body.firstChild)
            }
        }
        createRefreshStyle () {
            let style = document.createElement('style')
            style.textContent = `
                .refresh-element {
                    height:0 ;
                    color: #fff;
                    text-align: center;
                    background-color: #1abc9c;
                    pointer-events: none;
                    overflow: hidden;
                    transition: height .3s;
                }
                .refresh-content {
                    display: flex;
                    justify-content: center;
                    line-height:50px;
                }
                .refresh-icon {
                    margin-right: 10px;
                    transition: all .3s;
                }
                .pull {
                    transition: none;
                }
                .release .refresh-icon{
                    transform: rotate(180deg)
                }
            `
            document.head.appendChild(style)
        }
        supportPassive () {
            try {
                var opts = Object.defineProperty({}, 'passive', {
                    get () {
                        supportPassive = true
                    }
                })
                window.addEventListener('test', null, opts)
            } catch (error) {}
        }
        bindEvent () {
            utils.addEvent(window, 'touchstart', this)
            utils.addEvent(window, 'touchmove', this)
            utils.addEvent(window, 'touchend', this)
        }
        handleEvent (event) {
            let methods = `on${event.type}`
            if (methods) {
                this[methods] (event)
            }
        }
        ontouchstart (e) {
            if (this.shouldPullRefresh()) {
                pullStartY = e.touches[0].screenY
                state = 'pending'
                this.update ()
            }
        }
        ontouchmove (e) {
            pullMoveY = e.touches[0].screenY

            if (state === 'pending') {
                this.dom.classList.add('pull')
                state = 'pulling'
                this.update ()
            }
            if (pullStartY && pullMoveY) {
                dist  = pullMoveY - pullStartY
            }
            if (dist > 0) {
                e.preventDefault()
                this.dom.style.height = distResisted + "px";

                distResisted = this.getResistance(dist / this.options.threshold) *
                    Math.min(this.options.max, dist);

                if (state === 'pulling' && distResisted > this.options.threshold) {
                    this.dom.classList.add('release')
                    state = 'releaseing';
                    this.update();
                }
                if (state === 'releaseing' && distResisted < this.options.threshold) {
                    this.dom.classList.remove('release')
                    state = 'pending'
                    this.update ()
                }
            }
        }
        ontouchend (e) {
            if  (state === 'releaseing') {
                state = 'refreshing'
                this.dom.style.height = this.options.reloadHeight + 'px'
                this.update ()
            } else {
                this.dom.style.height = 0 + 'px'
            }
            this.update ()
            pullMoveY = pullStartY = null
            dist = distResisted = 0
            this.dom.classList.remove('pull')   
            this.dom.classList.remove('release')
        }
        shouldPullRefresh () {
            return !scrollY
        }
        update () {
            let icon = document.querySelector('.refresh-icon')
            let text = document.querySelector('.refresh-text')

            if (state == 'refreshing') {
                icon.innerHTML = this.options.refreshIcon
            } else {
                icon.innerHTML = this.options.pullIcon
            }
            if (state == 'releaseing') {
                text.innerHTML = this.options.releaseText
            }
            if (state == 'pending' || state == 'pulling') {
                text.innerHTML = this.options.pullText
            }
        }
        getResistance (t) {
            return Math.min(1, t /2.5)
        }
    }
    PullRefresh.defaultOptions = {
        target: 'body',
        pullText: '下拉刷新',
        pullIcon: '&darr;',
        refreshIcon: '&hellip;',
        releaseText: '释放刷新',
        max: 80,
        threshold: 60,
        reloadHeight: 50
    }
    var state = 'pending',
        pullStartY = null,
        pullMoveY = null,
        dist = 0,
        distResisted = 0,
        supportPassive = false;


    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = PullRefresh
        }
        exports.PullRefresh = PullRefresh
    } else {
        root.PullRefresh = PullRefresh
    }
} ())