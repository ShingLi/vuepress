import './pull-refresh.scss'

const pullRefresh = {
	name: 'pull-refresh',
	data () {
		return {
			supportPassive: false,
			mv: 0,
			threshould: 60,
			maxOffset: 80,
			status: 'pending'
		}
	},
	created () {
		try {
			const options = Object.defineProperty({}, 'passive', {
				get: () => this.supportPassive = true
			})
			window.addEventListener('test', null , options)
		}catch (e) {console.log(e)}

		this.init ()
	},
	mounted () {
		setTimeout(() => {
			this.dom = document.querySelector('.refresh-wrapper')
		},20)
	},
	methods: {
		init () {
			this.bindEvent(window, 'touchstart', this.touchStart)
			this.bindEvent(window, 'touchmove', this.touchMove)
			this.bindEvent(window, 'touchend', this.touchEnd)
		},
		bindEvent (el, type, f) {
			if (addEventListener) {
				el.addEventListener(type, f, this.supportPassive ? { passive:false }: false)
			}
		},
		touchStart (e) {
			if (this.shouldRefresh()) {
				this.pullStartY = e.touches[0].screenY
			}
		},
		touchMove (e) {
			let pullMoveY = e.touches[0].screenY, dist
			if (this.pullStartY && pullMoveY) {
				dist = pullMoveY - this.pullStartY
			}
			if (dist && dist > 0) {
				e.cancelable && e.preventDefault()
				this.dom.style.minHeight = this.mv + 'px'
			}
		},
		touchEnd (e) {

		},
		shouldRefresh () {
			return !scrollY
		}

	},
	render () {

		return (
			<div>
				<div class='refresh-wrapper'>
					<svg xmlns='http://www.w3.org/2000/svg' version='1.1' class ='svg' viewBox='0 0 24 24'>
						<circle cy='12' cx= '12' r='10'></circle>
					</svg>
					<p class='status-desc'>下拉刷新</p>
				</div>
				{ this.$slots.default }
			</div>
		)
	}
}

export default pullRefresh
