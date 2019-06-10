import control from 'src/control'

control.install = function (Vue) {
	Vue.component(control.name, control)
}

export default control