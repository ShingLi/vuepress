# 使用

```js
	import PullRefresh from 'path/pull-refresh/src/index.js'
	
	<pull-refresh v-model='loading' @refresh='onRefresh/>
	
	export default {
		data () {
			return {
				loading: false
			}
		},
		methods: {
			onRefresh () {
				setTimeout ( () => {
					this.loading = true
					// 刷新成功
				})
			}
		}
	}
```