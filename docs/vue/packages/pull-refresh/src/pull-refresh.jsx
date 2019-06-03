import './pull-refresh.scss'

const pullRefresh = {
	name: 'pull-refresh',
	data () {
		return {
			supportPassive: false
		}
	},
	created () {
		try {
			const options = Object.defineProperty({}, 'passive', {
				get: () => this.supportPassive = true
			})
			window.addEventListener('test', null , options)
		}catch (e) {console.log(e)}

	},
	mounted () {
		setTimeout(() => {
			console.log(this.supportPassive)
			this.dom = document.querySelector('.refresh-wrapper')
		},20)
	},
	methods: {

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