
import './pull-refresh.scss'

const RELEASEHEIGHT = 60, MAXHEIGHT=80, THRESHOLD = 70

const pullRefresh = {
    name: 'pull-refresh',
    props: {
        value: {
            type: [Boolean, Number],
            required: true
        }
    },
    data () {
        return {
            status_tips: '',
            supportPassive: false,
            status: 'pending',
            mv: 0
        }
    },
    watch: {
        value: function (newVal) {
            this.dom.style.height = 0
            this.status = 'pending'
            this.$emit('input', false)
        }
    },
    created () {
        this.$nextTick(() => {
            this.initPassive ()
            this.initEvents ()
            this.dom = document.getElementById('refresh-box')
        })
    },
    methods: {
        initEvents () {
            this.bindEvents(window, 'touchstart', this.touchStart)
            this.bindEvents(window, 'touchmove', this.touchMove)
            this.bindEvents(window, 'touchend', this.touchEnd)
        },
        bindEvents (el, type, callback) {
            // 不考虑任何兼容 纯ES6
            el.addEventListener(type, callback, this.supportPassive ? { passive: false }: false)
        },
        removeEvents (el, type, callback) {
            el.removeEventListener (type, callback)
        },
        initPassive () {
            const options = Object.defineProperty({}, 'passive', {
                get: () => this.supportPassive = true
            })
            if (window.addEventListener) {
                window.addEventListener('test', null, options)
            }
            // IE attachEvent
        },
        shouldRefresh () {
            return !(pageYOffset || scrollY)
        },
        resistance (R) {
            return Math.min(1, R / 2.5)
        },
        touchStart (e) {
            // if (this.status != 'pending' || this.shouldRefresh()) {
            //     return
            // }
            if (this.shouldRefresh ()) {
                if (this.status != 'pending') {
                    // 正在刷新状态 =再次触发默滚动页面
                    e.preventDefault ()
                } else {
                    this.pullStartY = e.touches[0].screenY
                }
            }
        },
        touchMove (e) {
            if (this.pullStartY && this.status == 'pending') {
                this.status = 'pulling'
                this.status_tips = '下拉刷新'
            }
            // if (this.status == 'release') {
            //     e.preventDefault ()
            //     // 本意是防止在刷新状态，用户再次滑动触发默认行为滚动页面，但是会造成这样，在用户手动向上滑动
            //    失效
            //     return
            // }
            let dist

            this.pullMoveY = e.touches[0].screenY

            // debugger
            if (this.pullMoveY && this.pullStartY) {
                dist = this.pullMoveY - this.pullStartY
            }
            if (dist > 0) {
                e.preventDefault ()
                this.dom.style.height = `${this.mv}px`
                if (!this.dom.classList.contains('pull')) this.dom.classList.add('pull')

                if (this.status == 'pulling' && dist > THRESHOLD) {
                    this.status  = 'release'
                    this.status_tips = '释放刷新'
                }
                if(this.status == 'release' && this.mv < THRESHOLD) {
                    this.status = 'pulling'
                    this.status_tips = '下拉刷新'
                }
                this.mv =  this.resistance( dist / THRESHOLD ) * Math.min(MAXHEIGHT, dist)

            }
        },
        touchEnd () {
            this.dom.classList.remove('pull')
            if (this.status == 'release' && this.mv > THRESHOLD) {
                this.dom.style.height = `${RELEASEHEIGHT}px`
                this.status_tips = '正在刷新'
                this.$emit('refresh')

            } else {
                if (this.status == 'release') return // 防止刷新状态点击返回初始位置
                this.dom.style.height = 0
                this.status = 'pending'
            }

            this.pullStartY = this.pullMoveY = this.mv = 0

        }
    },
    render () {
        return (
            <div>
                <div id='refresh-box'  class='refresh-box'>
                    <div class='refresh-content'>
                        <span class='pattern'>
                            <svg class='svg' xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 44 44'>
                                <circle cx='22' cy='22' r='20'></circle>
                            </svg>
                        </span>
                        <span class='status-tips'> { this.status_tips } </span>
                    </div>
                </div>
                { this.$slots.default }
            </div>
        )
    }

}

export default pullRefresh
