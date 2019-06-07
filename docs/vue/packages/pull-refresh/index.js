import pullRefresh from './src/pull-refresh.jsx'

pullRefresh.install = function (Vue) {
	Vue.component(pullRefresh.name, pullRefresh)
}

export default pullRefresh